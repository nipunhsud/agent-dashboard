/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        'button': '0 9px 13px -5px #6056ff66,0 2px 2px 0 #6056ff40,inset 0 -2px 0 0 #3b32f980,inset 0 0 0 1px #fff3,inset 0 7px 12px 0 #943bff',
      }
    },
  },
  plugins: [],
};
