/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#e7fdf9',
          DEFAULT: '#13ecc8',
          dark: '#0ba38a',
        },
        accent: {
          warm: '#0d9488', // Warm teal
          dark: '#0f172a'
        }
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '8px',
        'md': '0.375rem',
        'lg': '0.5rem',
        'full': '9999px',
      }
    },
  },
  plugins: [],
}
