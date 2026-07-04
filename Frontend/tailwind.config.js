/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
      },
      colors: {
        brand: {
          50: "#f8f6f2",
          100: "#efe7da",
          200: "#ddc8aa",
          300: "#c8a87f",
          400: "#b78d5f",
          500: "#9f7046",
          600: "#82583a",
          700: "#64432f",
          800: "#432c21",
          900: "#241711",
        },
      },
      boxShadow: {
        soft: "0 24px 80px rgba(17, 24, 39, 0.12)",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top, rgba(255,255,255,0.55), transparent 28%), linear-gradient(135deg, rgba(159,112,70,0.08), rgba(36,23,17,0.04))",
      },
    },
  },
  plugins: [],
};
