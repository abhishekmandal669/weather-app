import * as React from "react";

export function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg transition disabled:opacity-50"
    >
      {children}
    </button>
  );
}
