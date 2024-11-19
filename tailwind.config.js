export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        wiggleFadeOut: {
          "0%": { transform: "rotate(-3deg)", opacity: "1" },
          "50%": { transform: "rotate(3deg)", opacity: "1" },
          "75%": { transform: "rotate(3deg)", opacity: "0.5" },
          "100%": { transform: "rotate(-3deg)", opacity: "0" },
        },
        loadingProgressBar: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        wiggleFadeOut: "wiggleFadeOut 4s ease-in-out",
        loadingProgressBar: "loadingProgressBar 2s linear infinite",
      },
      gridTemplateColumns: {
        16: "repeat(16, minmax(0, 1fr))",
      },
    },
    fontFamily: {
      Pixelify: ["Pixelify", "Pretendard"],
    },
  },
  plugins: [],
};
