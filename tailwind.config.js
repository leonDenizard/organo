/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'backgound': '#302F2F',
        'bubble-blue': '#23A8F2',
        'bubble-red': '#FA6262',
        'primary-color': 'rgba(255,255,255, 0.02)',
        'border-color': 'rgba(255,255,255, 0.2)',
        'button-color': 'rgba(255,255,255, 0.12)',
        'button-hover': 'rgba(0,0,0, 0.12)'
      },
      fontFamily:{
        'popp': ['poppins']
      },
      boxShadow:{
        'shadow-button': '15px 15px 20px 0 rgba(0, 0, 0, 0.3)',
        'shadow-button-hover': '5px 5px 10px 0 rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}