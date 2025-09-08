import React from "react";
import Weather from "./components/Weather";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex flex-grow items-center justify-center ">
        <Weather />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
