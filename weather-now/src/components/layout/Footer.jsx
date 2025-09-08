import React from "react";

export default function Footer() {
  return (
    <footer className="backdrop-blur-md bg-white/20 border-t border-white/30">
      <div className="max-w-5xl mx-auto px-6 py-4 text-center text-white/80 text-sm">
        © {new Date().getFullYear()} Weather Now · Made with ☀️ for outdoor lovers
      </div>
    </footer>
  );
}
