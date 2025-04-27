/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#F5E6D3',
          100: '#E6C8A0',
          200: '#D4A276',
          300: '#C17F4E',
          400: '#8B4513',
          500: '#A0522D',
          600: '#6B3E26',
          700: '#4A2C1B',
          800: '#2C1810',
          900: '#1A0F0A',
        },
      },
    },
  },
  plugins: [],
};