import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Newsreader', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#1E293B',
        brand: '#4A8CF0',
        link: '#2563EB',
        'brand-ink': '#1D4ED8',
        sky: '#7DB2FF',
        tint: '#E3EDFD',
        'tint-soft': '#EEF4FE',
        'tint-border': '#BFD7FB',
        canvas: '#F4F5F7',
        'sidebar-hover': '#27364D',
        'sidebar-active': '#334155',
        warn: {
          dot: '#D97706',
          bg: '#FEF3C7',
          text: '#92400E',
          panel: '#FFFBEB',
        },
        debt: '#C2410C',
        danger: {
          DEFAULT: '#DC2626',
          bg: '#FEF2F2',
          border: '#FECACA',
          text: '#991B1B',
        },
        star: '#F59E0B',
      },
      borderRadius: {
        card: '12px',
        block: '10px',
      },
    },
  },
  plugins: [],
} satisfies Config;
