/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#ffffff',
        gold: '#c9a84c',
        ember: '#7a6228',
        paper: '#9d7b2c',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-dm)', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 0 45px rgba(201, 168, 76, 0.18)',
      },
    },
  },
  plugins: [],
};
