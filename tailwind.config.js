/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
      "4xl": "2560px",
    },
    extend: {
      colors: {
        mainBg: "#7E22CE",
        primary: "#000000",
        secondary: "#610F11",
        mainLight: "#ef4444",
        gray: {
          0: "#ffffff",
          50: "#f5f5f5",
          100: "#eeeeee",
          200: "#e0e0e0",
          300: "#bdbdbd",
          400: "#9e9e9e",
          500: "#757575",
          600: "#616161",
          700: "#2f3238",
          800: "#1e2127",
          900: "#121418",
          1000: "#000000",
        },
      },
      fontFamily: {
        jost: ["Jost", "Arial", "sans-serif"],
        roboto: ["Roboto", "Arial", "sans-serif"],
        msmadi: ["MsMadi", "Arial", "sans-serif"],
      },
    },
  },
};
