/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlack: "#212228",
        customBlue: "#43a8c1",
        customBlueLight: "#3a99b0",
      },
    },
  },
  plugins: [],
};
