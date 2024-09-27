/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  important: true,
  content: ["./src/*.html", "./src/js/*.js", "./components/*.html", "index.html"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}