/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        medai: {
          "primary": "#7C3AED",   // purple
          "secondary": "#A78BFA",
          "accent": "#C4B5FD",
          "neutral": "#1F2937",
          "base-100": "#F8FAFC",
          "base-200": "#EEF2FF",
          "base-300": "#E5E7EB",
          "info": "#38BDF8",
          "success": "#22C55E",
          "warning": "#F59E0B",
          "error": "#EF4444",
        },
      },
    ],
  },
};
