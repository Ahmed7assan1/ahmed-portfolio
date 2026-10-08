/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: 'var(--color-surface)',
          dim: 'var(--color-surface-dim)',
          bright: 'var(--color-surface-bright)',
          'container-lowest': 'var(--color-surface-container-lowest)',
          'container-low': 'var(--color-surface-container-low)',
          container: 'var(--color-surface-container)',
          'container-high': 'var(--color-surface-container-high)',
          'container-highest': 'var(--color-surface-container-highest)',
        },
        on: {
          surface: 'var(--color-on-surface)',
          'surface-variant': 'var(--color-on-surface-variant)',
        },
        outline: {
          DEFAULT: 'var(--color-outline)',
          variant: 'var(--color-outline-variant)',
        },
        primary: {
          DEFAULT: '#38bdf8', // Technical Sky Blue accent
          hover: '#0284c7',
          container: '#0c4a6e',
          'on-primary': '#062033',
          'on-container': '#dff4ff',
        },
        secondary: {
          DEFAULT: '#94a3b8',
          container: '#334155',
          'on-secondary': '#0f172a',
          'on-container': '#f1f5f9',
        },
        tertiary: {
          DEFAULT: '#64748b',
          container: '#1e293b',
          'on-tertiary': '#020617',
          'on-container': '#e2e8f0',
        },
        error: {
          DEFAULT: '#f87171',
          container: '#7f1d1d',
          'on-error': '#450a0a',
          'on-container': '#fef2f2',
        },
        background: 'var(--color-background)',
        'on-background': 'var(--color-on-background)',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'display-xl': ['76px', { lineHeight: '0.98', letterSpacing: '-0.03em', fontWeight: '700' }],
        'headline-lg': ['42px', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '600' }],
        'headline-lg-mobile': ['32px', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '600' }],
        'headline-md': ['24px', { lineHeight: '1.35', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.65', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.65', fontWeight: '400' }],
        'label-mono': ['13px', { lineHeight: '1.2', letterSpacing: '0.08em', fontWeight: '500' }],
      },
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.75rem',
        lg: '1.25rem',
        xl: '1.75rem',
        full: '9999px',
      },
      maxWidth: {
        container: '1280px',
      },
      spacing: {
        gutter: '2rem',
        section: '6rem',
        card: '1.75rem',
      },
      boxShadow: {
        glow: '0px 20px 60px rgba(0, 0, 0, 0.45)',
        'glow-primary': '0px 10px 40px rgba(56, 189, 248, 0.25)',
      },
      backdropBlur: {
        glass: '20px',
      },
    },
  },
  plugins: [],
}
