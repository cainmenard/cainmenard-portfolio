/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        slate: {
          750: '#293548',
          850: '#1a2332',
          950: '#0f1623',
        },
      },
    },
  },
  plugins: [],
}
