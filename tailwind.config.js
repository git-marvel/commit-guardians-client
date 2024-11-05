export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        wiggleFadeOut: {
          "0%": { transform: "rotate(-3deg)", opacity: "1" },
          "50%": { transform: "rotate(3deg)", opacity: "1" },
          "100%": { transform: "rotate(-3deg)", opacity: "0" },
        },
      },
      animation: {
        wiggleFadeOut: "wiggleFadeOut 2s ease-in-out",
      },
    },
    fontFamily: {
      Pixelify: ["Pixelify"],
    },
  },
  plugins: [],
};
