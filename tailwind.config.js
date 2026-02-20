/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        warm: {
          50: '#FAF8F5',
          100: '#F2EFEB',
          200: '#E8E4DE',
          300: '#D5D0C8',
          400: '#B8B2A8',
          500: '#9A9388',
          600: '#767676',
          700: '#636363',
          800: '#3A3835',
          900: '#2C2A27',
          950: '#1F1D1B',
        },
        accent: {
          blue: '#4E8AF7',
          green: '#2B5945',
        },
        ink: {
          DEFAULT: '#1E2124',
          secondary: '#636363',
          tertiary: '#767676',
        },
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
      },
      fontSize: {
        base: ['1rem', { lineHeight: '1.5' }],
      },
      boxShadow: {
        'warm-sm': '0 1px 3px rgba(44, 42, 39, 0.08), 0 4px 12px rgba(44, 42, 39, 0.04)',
        'warm': '0 4px 16px rgba(44, 42, 39, 0.08), 0 1px 3px rgba(44, 42, 39, 0.06)',
        'warm-lg': '0 8px 30px rgba(44, 42, 39, 0.12), 0 4px 12px rgba(44, 42, 39, 0.06)',
      },
      screens: {
        'sm': '35em',
        'md': '60em',
        'lg': '80em',
      },
    },
  },
  plugins: [],
}
