import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "selector",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          950: "#0a0a0a",
          900: "#1a1a1a",
          800: "#2a2a2a",
          700: "#3a3a3a",
          500: "#5a5a5a",
          400: "#7a7a7a",
          300: "#a3a3a3",
        },
        orange: {
          600: "#ff6b35",
          500: "#ff7d47",
          400: "#ff8c5a",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Menlo", "Monaco", "monospace"],
      },
      animation: {
        "float-1": "float 15s ease-in-out infinite",
        "float-2": "float 20s ease-in-out infinite reverse",
        "float-3": "float 12s ease-in-out infinite 1s",
        "spin-slow": "spin-slow 20s linear infinite",
        bounce: "bounce 1s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "33%": { transform: "translate(30px, -50px) rotate(10deg)" },
          "66%": { transform: "translate(-20px, 20px) rotate(-5deg)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
