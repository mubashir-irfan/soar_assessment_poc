/** @type {import('tailwindcss').Config} */
const designSystem = require('./src/design-system');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: designSystem.colors,
      fontSize: designSystem.fontSize,
      spacing: designSystem.spacing,
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addComponents, theme }) {
      addComponents({
        '.focus-ring': {
          '&:focus': {
            outline: 'none',
            boxShadow: `0 0 0 2px ${theme('colors.soar')}`,
            borderRadius: '0.375rem',
          },
        },
      });
    },
  ],
};