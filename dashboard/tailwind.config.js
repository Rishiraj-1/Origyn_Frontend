/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0A0F1E',
          800: '#111827',
          700: '#1F2937'
        },
        green: {
          accent: '#00FF88', // neon green
          500: '#22c55e'
        },
        amber: {
          accent: '#F59E0B' // warning
        },
        red: {
          accent: '#EF4444' // recall
        }
      },
      animation: {
        'scan-line': 'scan 2s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' }
        }
      }
    },
  },
  plugins: [],
}
