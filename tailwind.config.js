/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#0b0a0c',
          subtle: '#141118',
          card: '#eee3f7',
          'card-lite': '#f6eefb',
          border: 'rgba(217, 190, 240, 0.25)',
          'border-strong': '#d9bef0',
        },
        octa: {
          page: '#0b0a0c',
          card: '#eee3f7',
          'card-lite': '#f6eefb',
          ink: '#1e1526',
          'ink-soft': '#57495f',
          'ink-faint': '#6f6178',
          plum: '#a06cd5',
          'plum-deep': '#7c4bb0',
          'plum-bright': '#b78ce0',
          rise: '#147b37',
          dip: '#ad3568',
        },
        primary: {
          50: '#f6eefb',
          100: '#eee3f7',
          500: '#b78ce0',
          600: '#7c4bb0',
          700: '#5f4380',
          800: '#3d2f4c',
          900: '#1e1526',
        },
        segment: {
          high: '#147b37',
          potential: '#7c4bb0',
          stuck: '#b48ede',
          risk: '#ad3568',
          placement: '#0D9488',
        },
        driver: {
          positive: '#147b37',
          negative: '#ad3568',
          neutral: '#6f6178',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
        'card': '0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.04)',
        'elevated': '0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.04)',
        'dropdown': '0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -4px rgba(15, 23, 42, 0.05)',
      },
      borderRadius: {
        'DEFAULT': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
      }
    },
  },
  plugins: [],
}
