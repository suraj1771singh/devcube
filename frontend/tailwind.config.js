/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "bg_light_pri":"#EAEDF1",
        'bg_light_sec':"#FFFFFF",
        'font_light_pri':"#00000",
        'font_light_sec':"#436086",

        "fade_font":"#808080",
        "bg_dark_pri":"#011022",
        'bg_dark_sec':"#000000",
        'font_dark_pri':"#EAEDF1",
        'font_dark_sec':"#FFFFFF",
        
        'third_color':"#E2B714",

        'transparent': 'transparent',
        'current': 'currentColor',
        'white': '#ffffff',
        'purple': '#3f3cbb',
        'midnight': '#121063',
        'metal': '#565584',
        'tahiti': '#3ab7bf',
        'silver': '#ecebff',
        'bubble-gum': '#ff77e9',
        'bermuda': '#78dcca',
        gray: colors.slate,
        green: colors.emerald,
        yellow: colors.amber,
        pink: colors.fuchsia
      },
    },

  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require("tailwindcss-animate"),
  ]
}