/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      rotate: {
        "0,3-turn": "0.3turn",
        "rad-1": "1rad",
      },
    },
  },
  plugins: [],
};
