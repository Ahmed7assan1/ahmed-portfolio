/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#0a0a0a',
          dim: '#050505',
          bright: '#3d3d3a',
          'container-lowest': '#050505',
          'container-low': '#111110',
          container: '#161615',
          'container-high': '#1e1e1c',
          'container-highest': '#282826',
        },
        on: {
          surface: '#f2f1ec',
          'surface-variant': '#8f8f89',
        },
        outline: {
          DEFAULT: '#5a5a55',
          variant: '#2a2a27',
        },
        primary: {
          DEFAULT: '#38bdf8',
          container: '#0c4a6e',
          'on-primary': '#062033',
          'on-container': '#dff4ff',
        },
        secondary: {
          DEFAULT: '#c9c6bc',
          container: '#4a4944',
          'on-secondary': '#201f1c',
          'on-container': '#e8e6df',
        },
        tertiary: {
          DEFAULT: '#7a7a73',
          container: '#3a3a36',
          'on-tertiary': '#0f0f0d',
          'on-container': '#c4c4bc',
        },
        accent: {
          emerald: '#38bdf8',
        },
        error: {
          DEFAULT: '#ffb4ab',
          container: '#93000a',
          'on-error': '#690005',
          'on-container': '#ffdad6',
        },
        background: '#0a0a0a',
        'on-background': '#f2f1ec',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'display-xl': ['76px', { lineHeight: '0.98', letterSpacing: '-0.03em', fontWeight: '600' }],
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
        container: '1320px',
      },
      spacing: {
        gutter: '2rem',
        section: '7rem',
        card: '1.75rem',
      },
      boxShadow: {
        glow: '0px 20px 60px rgba(0, 0, 0, 0.55)',
      },
      backdropBlur: {
        glass: '20px',
      },
    },
  },
  plugins: [],
}
