/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7fa',
          100: '#cceff5',
          200: '#99dfe9',
          300: '#66cfde',
          400: '#33bfd2',
          500: '#0891B2', // primary
          600: '#0E7490', // primary dark
          700: '#065464',
          800: '#033641',
          900: '#011B20',
        },
        secondary: {
          50: '#e6fcf5',
          100: '#ccf9eb',
          200: '#99f3d6',
          300: '#66edc2',
          400: '#33e7ad',
          500: '#059669', // secondary
          600: '#047857', // secondary dark
          700: '#03543f',
          800: '#022c22',
          900: '#01170F',
        },
        accent: {
          50: '#f2fbf9',
          100: '#e6f7f3',
          200: '#ccefe7',
          300: '#b3e7db',
          400: '#99dfcf',
          500: '#0FD8AB', // accent
          600: '#0CAD89', // accent dark
          700: '#085a47',
          800: '#042e24',
          900: '#021710',
        },
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        error: '#EF4444',
        warning: '#F59E0B',
        success: '#10B981',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};