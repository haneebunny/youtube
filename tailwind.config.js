/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        1: "1px",
        2: "2px",
      },
    },
  },
  plugins: [],
};
