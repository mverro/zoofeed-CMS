/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        'zoo': "url('assets/zoofeed-bg.png')",
      }
    },
  },
  plugins: [],
}

