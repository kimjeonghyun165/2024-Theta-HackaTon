/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
      extend: {
        boxShadow: {
          'button': '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25)',
        },
        backgroundImage: {
          'eleventh' : 'linear-gradient(90deg, rgba(119, 119, 119, 0.2) 0%, rgba(221, 221, 221, 0.2) 100%)',
          'twelfth' : 'linear-gradient(to right, #2A2B71 0%, rgba(0, 27, 72, 0.5) 50%, rgba(13, 32, 85, 0.5) 70%, rgba(42, 43, 113, 0.5) 100%)',
          'sixteenth': 'linear-gradient(180deg, rgba(208, 208, 208, 0.25) 50%, rgba(106, 106, 106, 0.5) 100%)',
          'heart' : 'linear-gradient(90deg, rgba(255, 0, 77, 0.2) 0%, rgba(221, 221, 221, 0.2) 100%)',
          'MyPageProfileBackground' : 'linear-gradient(135deg, rgba(36, 72, 98, 0.09) 0%, rgba(255, 255, 255, 0.27) 55.1%, rgba(255, 255, 255, 0.27) 63.6%, rgba(36, 72, 98, 0.3) 100%)'
        },
        colors: {
          'main': '#030408',
          'second': '#FFFFFF',
          'third': '#D0D0D012',
          'fourth' : '#25296C',
          'fifth' : '#777777',
          'sixth' : '#D0D0D0',
          'seventh' : '#6A6A6A',
          'eight':'#77777733',
          'twentyfirst':'#A1B0FF',
          'highlight':'#FF004D'
        },
      },
  },

  plugins: [
    require('daisyui'),
  ],

  daisyui: {
    themes: [ "dark"],
  }
};

