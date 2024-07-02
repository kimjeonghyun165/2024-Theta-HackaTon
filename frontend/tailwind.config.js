/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
      extend: {
        colors: {
          'main': '#030408',
          'second': '#FFFFFF',
          'third': '#9D9D9D',
          'fourth' : '#25296C',
          'fifth' : '#777777',
          'sixth' : '#D0D0D0'
        },
      },
  },
  plugins: [
    require('daisyui'),
  ],
};

