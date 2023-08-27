/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        "text-gray": "#ccc",
        "primary": "#f4a7ba",
        // "primary": "#cf4764",
        "primary-hover": "#cf4764",
      },
      fontSize: {

      },
      boxShadow: {
        "black-b-0.1": "0 3px 7px 0 rgba(0,0,0,0.1)",
        "black-b-0.35": "0 3px 7px 0 rgba(0,0,0,0.35)",
        "black-b-0.50": "0 3px 7px 0 rgba(0,0,0,0.50)",
        "black-b-0.75": "0 3px 7px 0 rgba(0,0,0,0.75)",
        "black-b-0.1": "0 3px 7px 0 rgba(0,0,0,0.1)",
        "black-rb-0.1": "5px 7px 7px 0 rgba(0,0,0,0.1)",
        "black-rb-0.35": "5px 7px 7px 0 rgba(0,0,0,0.35)",
        "black-rb-0.50": "5px 7px 7px 0 rgba(0,0,0,0.50)",
        "black-rb-0.75": "5px 7px 7px 0 rgba(0,0,0,0.75)",
        "black-rb-0.1": "5px 7px 7px 0 rgba(0,0,0,0.1)",
      },
      backgroundColor: {
        "primary": "#f4a7ba",
        "primary-hover": "#cf4764",
        "rgba-black-0": "rgba(17,17,17,0)",
        "rgba-black-0.25": "rgba(17,17,17,0.25)",
        "rgba-black-0.50": "rgba(17,17,17,0.50)",
        "rgba-black-0.75": "rgba(17,17,17,0.75)",
        "rgba-black-1": "rgba(17,17,17,1)",
      },      
      keyframes: {

      },
      animation: {

      },
      transitionDelay: {
        "fast": "0.1s",
        "primary": "0.3s",
        "slow": "0.5s",
      },
      transitionDuration: {
        
      },
      borderColor: {
        "primary": "#f4a7ba",
        "primary-hover": "#cf4764",
        "rgba-white-0.1": "rgba(255, 255, 255, 0.1)",
      },            
    },
  },
  plugins: [],
}

