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
        loadingProgressBar: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        wiggleFadeOut: "wiggleFadeOut 2s ease-in-out",
        loadingProgressBar: "loadingProgressBar 2s linear infinite",
      },
    },
    fontFamily: {
      Pixelify: ["Pixelify"],
    },
  },
  plugins: [],
};
