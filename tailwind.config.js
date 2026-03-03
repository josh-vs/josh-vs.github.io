/** @type {import('tailwindcss').Config} */
import fluid, { extract, screens, fontSize } from 'fluid-tailwind'

export default {
  content: {
    files: ["src/**/*.{njk, md, html}"],
    extract
  },
  safelist: [],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        change: "transparent",
      },
    },
  },
  plugins: [fluid,
            require("@tailwindcss/typography")],
  theme: {
    screens, // Tailwind's default screens, in `rem`Q
    fontSize, // Tailwind's default font sizes, in `rem` (including line heights)
    extend: {
      screens: {
        xs: '20rem'
      },
      fontFamily: {
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
        'brap_white': "#85919b"      }
    },
  },
};

