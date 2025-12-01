/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"  // <--- ESTO DEBE SER EXACTO
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#d946ef',
          dark: '#1a1a1a',
          card: '#262626',
        }
      },
    },
  },
  plugins: [],
}