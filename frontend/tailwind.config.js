/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        spicyRice: 'Spicy Rice', // Add your custom font
        sacramento: 'Sacramento',
      },
    },
  },
  plugins: [],
}