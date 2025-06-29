/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "tg-bg": "var(--tg-theme-bg-color, #ffffff)",
        "tg-text": "var(--tg-theme-text-color, #000000)",
        "tg-hint": "var(--tg-theme-hint-color, #999999)",
        "tg-link": "var(--tg-theme-link-color, #2481cc)",
        "tg-button": "var(--tg-theme-button-color, #2481cc)",
        "tg-button-text": "var(--tg-theme-button-text-color, #ffffff)",
        "tg-secondary-bg": "var(--tg-theme-secondary-bg-color, #f1f1f1)",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      animation: {
        "pulse-scale": "pulse-scale 0.2s ease-in-out",
        "scan-line": "scan-line 2s linear infinite",
      },
      keyframes: {
        "pulse-scale": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
    },
  },
  plugins: [],
};
