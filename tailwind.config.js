/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'blue-opacity': 'rgba(99, 102, 241, 0.1)',
      },
    },
  },
  plugins: [],
};

