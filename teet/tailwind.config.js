/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',       // App Router ашиглавал
    './pages/**/*.{js,ts,jsx,tsx}',     // хуучин Pages Router
    './components/**/*.{js,ts,jsx,tsx}' // бүх components
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ],
};
