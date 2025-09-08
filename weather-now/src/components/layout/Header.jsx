import React from "react";
import { Sun } from "lucide-react";

export default function Header() {
  return (
    <header className="backdrop-blur-md bg-white/20 border-b border-white/30 shadow-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <Sun className="w-7 h-7 text-yellow-300" />
          <h1 className="text-xl font-bold text-white drop-shadow">
            Weather Now
          </h1>
        </div>
        <p className="text-sm text-white/80 italic">
          Your instant outdoor guide 🌍
        </p>
      </div>
    </header>
  );
}
