/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
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
        },
        brand: { 50:'#F0F7FF', 100:'#E1EFFF', 200:'#C3DFFF', 300:'#93C5FD', 400:'#365EDC', 500:'#0077C5', 600:'#0065A9', 700:'#004D80', 800:'#1A2744', 900:'#0D1B2A' },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
