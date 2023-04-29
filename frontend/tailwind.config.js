/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg_light_pri: "#EAEDF1",
        bg_light_pri_skl: "#EAEDF1",
        bg_light_sec: "#FFFFFF",
        bg_light_sec_skl: "#FFFFFF",
        font_light_pri: "#00000",
        font_light_sec: "#436086",

        fade_font: "#808080",
        bg_dark_pri: "#111111",
        bg_dark_pri_skl: "#111111",
        bg_dark_sec: "#1C1C1C",
        bg_dark_sec_skl: "#1C1C1C",
        font_dark_pri: "#CCCCCC",
        font_dark_sec: "#D9D9D9",

        third_color: "#8001FF",

        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        purple: "#3f3cbb",
        midnight: "#121063",
        metal: "#565584",
        tahiti: "#3ab7bf",
        silver: "#ecebff",
        "bubble-gum": "#ff77e9",
        bermuda: "#78dcca",
        gray: colors.slate,
        green: colors.emerald,
        yellow: colors.amber,
        pink: colors.fuchsia,
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide"), require("tailwindcss-animate")],
};
