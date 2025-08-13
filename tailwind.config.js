// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        monedaOrange: "#CC5500",
        monedaBlack: "#000000",
      },
    },
  },
  plugins: [],
};
