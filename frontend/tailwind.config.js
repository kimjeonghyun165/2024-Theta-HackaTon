/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
      extend: {
        backgroundImage: {
          'gradient-1': 'linear-gradient(180deg, rgba(208, 208, 208, 0.25) 50%, rgba(106, 106, 106, 0.5) 100%)',
        },
        colors: {
          'main': '#030408',
          'second': '#FFFFFF',
          'third': '#9D9D9D',
          'fourth' : '#25296C',
          'fifth' : '#777777',
          'sixth' : '#D0D0D0',
          'seventh' : '#6A6A6A',
        },
      },
  },
  plugins: [
    require('daisyui'),
  ],
};

