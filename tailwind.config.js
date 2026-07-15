/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#1B2431',
          navy: '#14203A',
          light: '#22304A',
        },
        paper: {
          DEFAULT: '#EEF1F0',
          card: '#FBFCFB',
        },
        steel: {
          DEFAULT: '#56626F',
          soft: '#8992A0',
          line: '#D6DBD8',
        },
        amber: {
          DEFAULT: '#E8A33D',
          soft: '#F4CE93',
          deep: '#B87A1F',
        },
        rust: {
          DEFAULT: '#B0552E',
          soft: '#D9926E',
        },
        teal: {
          DEFAULT: '#2F8F7B',
          soft: '#BFE3DA',
        },
        alert: {
          DEFAULT: '#C1443C',
          soft: '#F0C4C0',
        },
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      letterSpacing: {
        widest2: '0.22em',
      },
      boxShadow: {
        card: '0 1px 2px rgba(20, 32, 58, 0.06), 0 8px 24px -12px rgba(20, 32, 58, 0.12)',
      },
    },
  },
  plugins: [],
};
