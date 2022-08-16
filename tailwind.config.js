/* eslint-disable */

const { screens } = require('tailwindcss/defaultTheme')

const spacing = {}
const fontSize = {}
for (let i = 0; i <= 500; i++) {
  spacing[i] = i === 0 ? i : `${i}px`
}
for (let i = 12; i <= 100; i++) {
  if (i % 2 === 0) fontSize[i] = `${i}px`
}



module.exports = {
  mode: 'jit',
  darkMode: 'class',
  important: false,
  theme: {
    borderWidth: {
      DEFAULT: '1px',
      ...fontSize
    },
    borderRadius: {
      'none': '0',
      'sm': '0.125rem',
      DEFAULT: '6px',
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '9999px',
      'large': '12px',
      ...fontSize
    },
    spacing,
    minHeight: spacing,
    minWidth: spacing,
    boxShadow: {
      sm: 'var(--shadow-sm)',
      DEFAULT: 'var(--shadow)',
      md: 'var(--shadow-md)',
      lg: 'var(--shadow-lg)',
      xl: 'var(--shadow-xl)',
      '2xl': 'var(--shadow-2xl)',
      inner: 'var(--shadow-inner)',
    },
    extend: {
      colors: {
        gray: {
          50: 'var(--color-gray-50)',
          100: 'var(--color-gray-100)',
          200: 'var(--color-gray-200)',
          300: 'var(--color-gray-300)',
          400: 'var(--color-gray-400)',
          500: 'var(--color-gray-500)',
          600: 'var(--color-gray-600)',
          700: 'var(--color-gray-700)',
          800: 'var(--color-gray-800)',
          900: 'var(--color-gray-900)',
        },
        primary: {
          DEFAULT: 'var(--color-primary-500)',
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
        },
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
        info: 'var(--info)',
      },
      fontSize,
      fontFamily: {
        montserrat: 'Montserrat',
        inter: 'Inter',
      },
      minWidth: {
        'screen-sm': screens.sm,
        'screen-md': screens.md,
        'screen-lg': screens.lg,
        'screen-xl': screens.xl,
        'screen-2xl': screens['2xl'],
      },
      lineHeight: {
        12: '12px',
        16: '16px',
        20: '20px',
        24: '24px',
        28: '28px',
        32: '32px',
        36: '36px',
        40: '40px',
      }
    },
  },
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    layers: ['utilities'],
    content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  },
}
