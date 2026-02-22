/** @type {import('tailwindcss').Config} */
export default {
  // Baris ini adalah kunci agar kita bisa mematikan/menyalakan dark mode lewat tombol
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}