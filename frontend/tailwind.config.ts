import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "inner-sm": "inset 0 1.5px 0 0 rgba(0, 0, 0, 0.05)",
      },
      colors: {},
      fontFamily: {
        sans: ["var(--font-parkinsans)"],
        cursive: ["var(--font-neulis)"],
      },
      fontWeight: {
        100: "100",
        200: "200",
        300: "300",
        400: "400",
        500: "500",
        600: "600",
        700: "700",
        800: "800",
        900: "900",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss-directional-shadows"),
  ],
} satisfies Config;
