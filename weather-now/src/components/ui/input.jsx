import * as React from "react";

export function Input(props) {
  return (
    <input
      {...props}
      className="flex w-full px-4 py-2 border border-white/40 bg-white/30 text-white placeholder-white/70 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
    />
  );
}
