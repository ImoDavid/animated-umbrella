import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: "class",
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    screens: {
      xs: "280px", // Very small phones
      sm: "640px", // Small tablets / large phones
      md: "768px", // Tablets
      lg: "1024px", // Small laptops
      xl: "1280px", // MacBook Air, 13" screens
      pc: "1366px", // Common laptop resolution
      max: "1440px", // Slightly larger laptops / desktops
      "2xl": "1536px", // Large desktops
      ds: { min: "280px", max: "600px" }, // Custom range for small devices
    },

    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
    },
  },
  plugins: [],
};

export default config;
