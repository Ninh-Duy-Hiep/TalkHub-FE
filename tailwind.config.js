/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          light: 'var(--color-primary-light)',
        },
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: {
          DEFAULT: 'var(--color-error)',
          bg: 'var(--color-error-bg)',
        },
        brand: {
          bg: 'var(--color-bg-main)',
          text: 'var(--color-text-main)',
          muted: 'var(--color-text-muted)',
          border: 'var(--color-border)',
        }
      }
    },
  },
  plugins: [],
}
