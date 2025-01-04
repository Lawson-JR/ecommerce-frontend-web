/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bahnschrift: ['bahnschrift', 'sans-serif'],
        cursive: ['Cascadia Mono PL', 'sans-serif']
      },
    },
  },
  plugins: [],
}