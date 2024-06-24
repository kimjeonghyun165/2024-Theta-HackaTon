/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
      extend: {
        colors: {
          'main': '#030408',
          'second': '#FFFFFF',
          'third': '#9D9D9D',
        },
      },
  },
  plugins: [
    require('daisyui'),
  ],
};

