/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fbf7ee',
          100: '#f4ebcf',
          200: '#e8d49a',
          300: '#dbb95f',
          400: '#cf9e34',
          500: '#b88124',
          600: '#9b641c',
          700: '#7c491b',
          800: '#673c1d',
          900: '#56321c',
          950: '#32190d',
        },
        dark: {
          bg: '#0a0d14',
          card: '#121824',
          border: '#1e293b',
          hover: '#1a2234',
        },
        accent: {
          purple: '#8b5cf6',
          gold: '#f59e0b',
          pink: '#ec4899',
          cyan: '#06b6d4',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.15) 0%, rgba(10, 13, 20, 0.95) 70%)',
        'gold-gradient': 'linear-gradient(135deg, #f59e0b 0%, #b88124 100%)',
        'purple-gradient': 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
