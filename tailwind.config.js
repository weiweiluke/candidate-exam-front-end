/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Look for JS/TypeScript files in src folder
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
