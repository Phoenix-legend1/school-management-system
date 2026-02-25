/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'edu-sky': '#38BDF8',     // Sky Blue
        'edu-orange': '#FB923C',  // Light Orange
        'edu-navy': '#0C1A2E',    // Dark Navy for EduVerse
      },
    },
  },
  plugins: [],
}