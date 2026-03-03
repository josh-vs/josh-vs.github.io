/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "src/**/*.{njk, md, html}"
  ],
  safelist: [],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        change: "transparent",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  theme: {
    extend: {
      fontFamily: {
        victor: ['"Victor Mono"'],
        garamond: ['"Cormorant Garamond"'],
      },
      colors: {
        'evergreen':'#0B2323',
        'goldgray': "#AFAA6F",
        'ylorp': "#dcd3c1",
        'blorp': "#10191f",
        'tlorp': "#0f2726",
        'plorp': "#c2a6bf",
        'brap': "#1f3f3d",
        'brap_white': "#85919b"
      }
    },
  },
};


