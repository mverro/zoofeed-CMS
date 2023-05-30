/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        'zoo': "url('assets/zoofeed-bg.png')",
      },
      fontFamily: {
        'inter': ['Inter'],
      }
    },
  },
  plugins: [],
})

