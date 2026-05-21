import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#1a1a1a",
          light: "#2d2d2d",
        },
        gold: {
          DEFAULT: "#c9a962",
          light: "#e0c989",
        },
        cream: {
          DEFAULT: "#f5f2eb",
          dark: "#e8e4db",
        },
        brand: {
          blue: "#2c4a5e",
          "blue-light": "#3d6178",
        },
        ink: {
          DEFAULT: "#333333",
          muted: "#666666",
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', "serif"],
        sans: ['"Source Sans 3"', "system-ui", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate],
};

export default config;
