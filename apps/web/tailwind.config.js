/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      transitionProperty: {
        height: 'height',
      },
      colors: {
        border: 'var(--color-base-300)',
        input: 'var(--color-base-300)',
        ring: 'var(--color-base-300)',
        background: 'var(--color-base-200)',
        foreground: 'var(--color-base-content)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-primary-content)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          foreground: 'var(--color-secondary-content)',
        },
        destructive: {
          DEFAULT: 'var(--color-error)',
          foreground: 'var(--color-error-content)',
        },
        muted: {
          DEFAULT: 'var(--color-base-100)',
          foreground: 'var(--color-base-content)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          foreground: 'var(--color-accent-content)',
        },
        popover: {
          DEFAULT: 'var(--color-base-100)',
          foreground: 'var(--color-base-content)',
        },
        card: {
          DEFAULT: 'var(--color-base-100)',
          foreground: 'var(--color-base-content)',
        },
        sidebar: {
          DEFAULT: 'var(--color-base-100)',
          foreground: 'var(--color-base-content)',
          primary: 'var(--color-primary)',
          'primary-foreground': 'var(--color-primary-content)',
          accent: 'var(--color-accent)',
          'accent-foreground': 'var(--color-accent-content)',
          border: 'var(--color-base-300)',
          ring: 'var(--color-info)',
        },
      },
      borderRadius: {
        xl: '1rem',
        lg: '0.5rem',
        md: '0.25rem',
        sm: '0.125rem',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--bits-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--bits-accordion-content-height)' },
          to: { height: '0' },
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
