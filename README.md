A modern and interactive weather application built with React + Vite + Tailwind CSS + Framer Motion.
It uses the Open-Meteo API to fetch real-time weather data and 5-day forecasts for any city.

The app is designed for Jamie (an outdoor enthusiast) to quickly check current weather, forecasts, and conditions before heading out.

🚀 Features

✅ Search Any City – Type a city and get real-time weather info.
✅ Smart Suggestions – Autocomplete dropdown for cities as you type.
✅ 5-Day Forecast – Daily high/low temperatures, weather icons, sunrise & sunset.
✅ Dynamic Weather Icons & Animations – Sun, clouds, rain, snow, storms with animations.
✅ Recent Searches – Stores the last 5 cities searched for quick access.
✅ Temperature Units Toggle – Switch between Celsius (°C) and Fahrenheit (°F).
✅ Local Time – Displays the city’s local time.
✅ Dynamic Backgrounds – Background gradients change based on weather (sunny, rainy, snowy, etc.).
✅ Responsive Design – Works seamlessly on desktop, tablet, and mobile.
✅ Smooth Animations – Powered by Framer Motion.

🛠️ Tech Stack

React + Vite – Fast frontend framework

Tailwind CSS – Modern utility-first CSS styling

Framer Motion – Smooth animations

Lucide React – Weather icons (sun, cloud, rain, snow, thunderstorm)

Open-Meteo API – Free weather & geocoding API

📂 Project Structure
weather-now/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── src/
│   ├── main.jsx          # Entry point
│   ├── App.jsx           # App wrapper with Header & Footer
│   ├── components/
│   │   ├── WeatherNow.jsx   # Main weather logic & UI
│   │   ├── Header.jsx       # App header
│   │   ├── Footer.jsx       # App footer
│   │   └── ui/              # Reusable UI components
│   │       ├── button.jsx
│   │       ├── card.jsx
│   │       └── input.jsx
│   └── styles.css        # Global styles

⚡ Installation & Setup
1️⃣ Clone the repo
git clone https://github.com/your-username/weather-now.git
cd weather-now

2️⃣ Install dependencies
npm install

3️⃣ Run development server
npm run dev
