/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Vazirmatn', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Vazirmatn', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
