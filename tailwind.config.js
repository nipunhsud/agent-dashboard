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
      colors: {
        'custom-purple': '#333399', 
        'custom-purple-800': '#3B0066', 
        'custom-purple-600': '#5A0099', 
      },
    },
  },
  plugins: [],
};

