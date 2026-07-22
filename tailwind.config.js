/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#0b1326',
          dim: '#0b1326',
          bright: '#31394d',
          'container-lowest': '#060e20',
          'container-low': '#131b2e',
          container: '#171f33',
          'container-high': '#222a3d',
          'container-highest': '#2d3449',
        },
        on: {
          surface: '#dae2fd',
          'surface-variant': '#c7c4d7',
        },
        outline: {
          DEFAULT: '#908fa0',
          variant: '#464554',
        },
        primary: {
          DEFAULT: '#c0c1ff',
          container: '#8083ff',
          'on-primary': '#1000a9',
          'on-container': '#0d0096',
        },
        secondary: {
          DEFAULT: '#ddb7ff',
          container: '#6f00be',
          'on-secondary': '#490080',
          'on-container': '#d6a9ff',
        },
        tertiary: {
          DEFAULT: '#adc6ff',
          container: '#4d8eff',
          'on-tertiary': '#002e6a',
          'on-container': '#00285d',
        },
        error: {
          DEFAULT: '#ffb4ab',
          container: '#93000a',
          'on-error': '#690005',
          'on-container': '#ffdad6',
        },
        background: '#0b1326',
        'on-background': '#dae2fd',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'display-xl': ['64px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'headline-lg': ['40px', { lineHeight: '1.2', fontWeight: '700' }],
        'headline-lg-mobile': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        'headline-md': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'label-mono': ['14px', { lineHeight: '1.2', letterSpacing: '0.05em', fontWeight: '500' }],
      },
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px',
      },
      maxWidth: {
        container: '1280px',
      },
      spacing: {
        gutter: '2rem',
        section: '6rem',
        card: '1.5rem',
      },
      boxShadow: {
        glow: '0px 10px 30px rgba(99, 102, 241, 0.2)',
      },
      backdropBlur: {
        glass: '12px',
      },
    },
  },
  plugins: [],
}
