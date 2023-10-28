/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      color: {
        baseColor: "#f7f7f4",
        pryText: "#295011",
      }
    },
  },
  plugins: [],
}