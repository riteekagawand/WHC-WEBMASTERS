/** @type {import('tailwindcss').Config} */

import { heroui } from "@heroui/react"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: "#634aff",
        lightpurp:"#f7f6ff" // Custom shortcut for purple
      },
    },
  },
  darkMode: "class",

  plugins: [heroui()],
}
