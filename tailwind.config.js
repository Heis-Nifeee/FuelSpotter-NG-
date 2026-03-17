/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
      },
      colors: {
        fuel: {
          bg: '#0a0a0f',
          surface: '#13131a',
          card: '#1c1c27',
          border: '#2a2a3a',
          text: '#f1f0f5',
          muted: '#8884a0',
          accent: '#f97316',
          green: '#22c55e',
          red: '#ef4444',
          yellow: '#f59e0b',
        },
      },
    },
  },
  plugins: [],
}
