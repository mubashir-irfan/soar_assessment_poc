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
      keyframes: {
        'pulse-fast': {
          // Rename for clarity
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
      animation: {
        'pulse-fast': 'pulse-fast 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite', // 1 second duration
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
    function ({ addUtilities }) {
      addUtilities({
        '.scroll-smooth': {
          'scroll-behavior': 'smooth',
        },
      });
    },
  ],
};
