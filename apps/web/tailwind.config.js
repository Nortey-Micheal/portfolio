/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'deep-space': 'rgb(var(--color-deep-space) / <alpha-value>)',
        'steel-gray': 'rgb(var(--color-steel-gray) / <alpha-value>)',
        'teal-neon': 'rgb(var(--color-teal-neon) / <alpha-value>)',
        'aqua-glow': 'rgb(var(--color-aqua-glow) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Sansita', 'VendSans', 'Arial', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}
