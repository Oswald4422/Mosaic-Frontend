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
          50: '#eef7ff',
          100: '#d9edff',
          200: '#bce0ff',
          300: '#8accff',
          400: '#51b2ff',
          500: '#2691ff',
          600: '#1170f9',
          700: '#0959e6',
          800: '#0d47ba',
          900: '#123e93',
        },
        secondary: {
          50: '#f4f7fb',
          100: '#e9eff7',
          200: '#cedeed',
          300: '#a5c3dd',
          400: '#75a2ca',
          500: '#5285b7',
          600: '#406a9a',
          700: '#35557d',
          800: '#2f4867',
          900: '#2a3e57',
        },
        accent: {
          50: '#fdf4ff',
          100: '#fae6ff',
          200: '#f4ccff',
          300: '#eba4ff',
          400: '#e06dff',
          500: '#d23eff',
          600: '#c021ff',
          700: '#a810e6',
          800: '#8b11bf',
          900: '#72139a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'hover': '0 10px 40px -3px rgba(0, 0, 0, 0.1), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
}
