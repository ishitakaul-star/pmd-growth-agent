/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        intuit: {
          blue: '#0077C5',
          dark: '#1A1A2E',
          green: '#2CA01C',
          navy: '#0D2B4E',
          light: '#E8F4FD',
          accent: '#6C5CE7',
          warm: '#FF6B35',
        }
      }
    },
  },
  plugins: [],
}
