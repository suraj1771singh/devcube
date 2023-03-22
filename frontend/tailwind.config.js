/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "bg_pri":"#2d2d39",
        'bg_sec':"#3f4156",
        'font_pri':"#e5e4e0",
        'font_sec':"#C9C8C6",
        'third_color':"#71c6dd",
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
  plugins: [],
}