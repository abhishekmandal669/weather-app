import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Sun, Cloud, CloudRain, Snowflake, Zap } from "lucide-react";

// Weather icons mapping
const weatherIcons = {
  0: { text: "Clear sky", icon: <Sun className="w-12 h-12 text-yellow-400 animate-bounce" /> },
  1: { text: "Mainly clear", icon: <Sun className="w-12 h-12 text-yellow-400 animate-bounce" /> },
  2: { text: "Partly cloudy", icon: <Cloud className="w-12 h-12 text-gray-400 animate-pulse" /> },
  3: { text: "Overcast", icon: <Cloud className="w-12 h-12 text-gray-500 animate-pulse" /> },
  61: { text: "Light rain", icon: <CloudRain className="w-12 h-12 text-blue-400 animate-bounce" /> },
  63: { text: "Moderate rain", icon: <CloudRain className="w-12 h-12 text-blue-500 animate-bounce" /> },
  65: { text: "Heavy rain", icon: <CloudRain className="w-12 h-12 text-blue-700 animate-bounce" /> },
  71: { text: "Snow", icon: <Snowflake className="w-12 h-12 text-blue-200 animate-spin" /> },
  95: { text: "Thunderstorm", icon: <Zap className="w-12 h-12 text-yellow-500 animate-ping" /> },
};

export default function WeatherNow() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [recentCities, setRecentCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState("C");
  const [bgGradient, setBgGradient] = useState("from-sky-400 via-blue-500 to-indigo-600");

  const [suggestions, setSuggestions] = useState([]); // NEW

  const convertTemp = (temp) => unit === "C" ? temp : (temp * 9/5 + 32).toFixed(1);
  const toggleUnit = () => setUnit(unit === "C" ? "F" : "C");

  useEffect(() => {
    if (city.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=5`);
        const data = await res.json();
        if (data.results) {
          setSuggestions(data.results.map(c => `${c.name}, ${c.country}`));
        }
      } catch (err) {
        console.error("Error fetching suggestions", err);
      }
    };

    const delay = setTimeout(fetchSuggestions, 400); // debounce
    return () => clearTimeout(delay);
  }, [city]);

  // Fetch weather data
  const getWeather = async (cityName = city) => {
    if (!cityName) return;
    setLoading(true);

    try {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`);
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        alert("City not found");
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, country, timezone } = geoData.results[0];

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset&timezone=${timezone}`
      );
      const data = await weatherRes.json();

      setWeather({
        location: `${name}, ${country}`,
        temperature: data.current_weather.temperature,
        windspeed: data.current_weather.windspeed,
        code: data.current_weather.weathercode,
        time: data.current_weather.time,
      });

      const daily = data.daily.time.map((day, i) => ({
        date: day,
        max: data.daily.temperature_2m_max[i],
        min: data.daily.temperature_2m_min[i],
        code: data.daily.weathercode[i],
        sunrise: data.daily.sunrise[i],
        sunset: data.daily.sunset[i],
      }));
      setForecast(daily.slice(0, 5));

      setRecentCities(prev => [name, ...prev.filter(c => c !== name)].slice(0, 5));

      const code = data.current_weather.weathercode;
      if ([0,1,2].includes(code)) setBgGradient("from-yellow-300 via-orange-300 to-red-400");
      else if ([61,63,65].includes(code)) setBgGradient("from-blue-600 via-blue-500 to-blue-400");
      else if ([71].includes(code)) setBgGradient("from-cyan-200 via-blue-200 to-indigo-300");
      else if ([95].includes(code)) setBgGradient("from-gray-700 via-gray-600 to-gray-500");
      else setBgGradient("from-sky-400 via-blue-500 to-indigo-600");
    } catch (err) {
      console.error(err);
      alert("Error fetching weather");
    } finally {
      setLoading(false);
      setSuggestions([]); 
    }
  };

  return (
    <div className={`min-h-screen  flex flex-col items-center justify-center bg-gradient-to-br ${bgGradient} transition-all duration-1000 p-4`}>
      <Card className="w-full max-w-2xl backdrop-blur-2xl bg-white/20 border border-white/30 shadow-2xl rounded-3xl p-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-white drop-shadow-lg mb-6">
          🌤️ Weather Now
        </h1>

        {/* Search */}
        <div className="relative mb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Enter city..."
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <Button onClick={() => getWeather()} disabled={loading} className="w-full sm:w-auto">
              {loading ? "Loading..." : "Check"}
            </Button>
          </div>

          {suggestions.length > 0 && (
            <ul className="absolute bg-white/90 text-black w-full rounded-xl shadow-lg mt-2 z-50">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  className="px-4 py-2 hover:bg-blue-200 cursor-pointer rounded-lg"
                  onClick={() => {
                    setCity(s);
                    getWeather(s);
                  }}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent Cities */}
        {recentCities.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {recentCities.map(c => (
              <Button key={c} onClick={() => getWeather(c)} className="text-sm bg-white/30 hover:bg-white/50">
                {c}
              </Button>
            ))}
          </div>
        )}

        {/* Placeholder / Current Weather */}
        {!weather ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-white p-8">
            <p className="text-lg sm:text-xl italic">Search for a city to see the weather!</p>
            <Cloud className="w-16 h-16 mx-auto mt-4 text-gray-300 animate-pulse" />
          </motion.div>
        ) : (
          <>
            {/* Current Weather */}
            <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.5}} className="text-center text-white mb-6">
              <h2 className="text-3xl font-bold drop-shadow-lg">{weather.location}</h2>
              <div className="flex justify-center items-center gap-6 mt-4">
                {weatherIcons[weather.code]?.icon || <Cloud className="w-12 h-12 text-gray-400" />}
                <p className="text-5xl font-bold">{convertTemp(weather.temperature)}°{unit}</p>
              </div>
              <p className="mt-2 text-lg">💨 {weather.windspeed} km/h</p>
              <p>Local Time: {new Date(weather.time).toLocaleTimeString()}</p>
              <Button onClick={toggleUnit} className="mt-3 text-sm bg-white/30 hover:bg-white/50">Switch to °{unit==="C"?"F":"C"}</Button>
            </motion.div>

            {/* 5-Day Forecast */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              {forecast.map((day, idx) => (
                <Card key={idx} className="bg-white/20 text-white p-4 text-center rounded-2xl hover:bg-white/30 transition">
                  <p className="font-semibold">{new Date(day.date).toLocaleDateString(undefined, { weekday:'short', day:'numeric' })}</p>
                  {weatherIcons[day.code]?.icon || <Cloud className="w-10 h-10 mx-auto" />}
                  <p className="mt-1">Max: {convertTemp(day.max)}°{unit}</p>
                  <p>Min: {convertTemp(day.min)}°{unit}</p>
                  <p className="text-xs mt-1">🌅 {new Date(day.sunrise).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</p>
                  <p className="text-xs">🌇 {new Date(day.sunset).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</p>
                </Card>
              ))}
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
