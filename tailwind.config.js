/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      backgroundColor: {
        dark: "rgb(31 41 55)",
      },
      fontFamily: {
        heading: "Raleway, sans-serif",
        text: "Open Sans, sans-serif",
      },
      colors: {
        primary: {
          50: "#fbf6fe",
          100: "#f4eafd",
          200: "#ecd9fb",
          300: "#dcbcf6",
          400: "#c791ef",
          500: "#b166e6",
          600: "#9436d3",
          700: "#8734bc",
          800: "#722f9a",
          900: "#5d277c",
          950: "#3f115a",
        },
      },
      boxShadow: {
        "3xl": "0 0 10px 0 rgba(0, 0, 0, 0.1)",
      },
    },
  },
  safelist: [
    "text-primary-500",
    "font-medium",
    "text-gray-500",
    "dark:text-gray-300",
  ],
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
