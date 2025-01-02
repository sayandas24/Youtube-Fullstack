import tailwindScrollbar from 'tailwind-scrollbar';
import tailwindMotion from 'tailwindcss-motion';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        spicyRice: 'Spicy Rice',
        sacramento: 'Sacramento',
      },
    },
  },
  plugins: [
    tailwindScrollbar({ nocompatible: true }),
    tailwindMotion
  ],
};
