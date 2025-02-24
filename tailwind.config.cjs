/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"], 
  theme: {
    extend: {},
  },
  safelist: [
    { pattern: /bg-\[#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\]/ }
  ],
  plugins: [],
};
