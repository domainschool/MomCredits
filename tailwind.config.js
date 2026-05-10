/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        sunset: { 500: '#f97316' },
        gold: { 400: '#facc15', 500: '#eab308' },
      }
    },
  },
  plugins: [],
}

