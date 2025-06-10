/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const themes = [
  {
    mytheme: {
      "primary": "#db530a",

      "secondary": "#ef69db",

      "accent": "#8787e5",

      "neutral": "#1d1820",

      "base-100": "#2f2749",

      "info": "#9cabe7",

      "success": "#80e0aa",

      "warning": "#f0b05c",

      "error": "#fb2856",
    },
  },
];
export const plugins = [require("daisyui")];

