/** @type {import('tailwindcss').Config} */
const designSystem = require('./src/design-system');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // The path to your React components/files
  ],
  darkMode: 'class', // Enable dark mode via class strategy
  theme: {
    extend: {
      colors: designSystem.colors,
      fontSize: designSystem.fontSize,
      spacing: designSystem.spacing,
    },
  },
  plugins: [],
};