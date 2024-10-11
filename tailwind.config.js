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
        'secundary-color': 'rgba(0,0,0, 0.2)',
        'tertiary-color': 'rgba(255,255,255, 0.5)',
        'fourthy-color': 'rgba(255,255,255, 0.7)',
        'border-color': 'rgba(255,255,255, 0.2)',
        'button-color': 'rgba(255,255,255, 0.12)',
        'button-hover': 'rgba(0,0,0, 0.12)',
        'card-bg': 'rgba(0,0,0, 0.2)',
        'text-color': 'rgba(255,255,255,0.9)',
        'button-register': '#506eec',
        'modal-color': 'rgba(0,0,0, 0.1)',
        'day-worked-week' : 'rgba(0,71,255, 0.2)',
        'weekend': 'rgba(250,98,98, 0.7)'
      },
      fontFamily:{
        'popp': ['poppins']
      },
      boxShadow:{
        'shadow-button': '15px 15px 20px 0 rgba(0, 0, 0, 0.3)',
        'shadow-button-hover': '5px 5px 10px 0 rgba(0, 0, 0, 0.3)',
        'shadow-button-upload': '0, 0, 50px 10px rgba(250, 98, 98, 1)'
      },
      cursor: {
        'thick': 'caret-width: 3px;',
      }
    },
  },
  plugins: [],
}