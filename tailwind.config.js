/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    gridTemplateColumns: {
      "fill-auto": "repeat(auto-fill, minmax(15rem, 1fr))",
    },
    extend: {
      colors: {
        brand: "#FF0000",
      },
      spacing: {
        1: "1px",
        2: "2px",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
