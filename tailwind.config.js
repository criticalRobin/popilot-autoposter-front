import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";
import aspectRatio from "@tailwindcss/aspect-ratio";
import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lapislazuli: "#1C5D99",
        moonstone: "#639FAB",
        powderblue: "#BBCDE5",
        erieblack: "#222222",
        white: "#FFFFFF",
      },
    },
  },
  plugins: [typography, forms, aspectRatio, daisyui],
};
