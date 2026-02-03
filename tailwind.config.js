/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f172a", // Slate 900
        surface: "#1e293b",    // Slate 800
        primary: "#8b5cf6",    // Violet 500
        secondary: "#06b6d4",  // Cyan 500
        accent: "#f43f5e",     // Rose 500
        text: "#f8fafc",       // Slate 50
        "text-muted": "#94a3b8", // Slate 400
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
