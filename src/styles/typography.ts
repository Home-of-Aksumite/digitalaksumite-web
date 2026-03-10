/**
 * Typography Tokens
 * Font families, sizes, weights, and line heights
 */

export const typography = {
  // Font families
  fontFamily: {
    sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
    display: ['var(--font-inter)', 'system-ui', 'sans-serif'],
    mono: ['var(--font-mono)', 'monospace'],
  },

  // Font sizes
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }], // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
    base: ['1rem', { lineHeight: '1.5rem' }], // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem' }], // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }], // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
    '5xl': ['3rem', { lineHeight: '1' }], // 48px
    '6xl': ['3.75rem', { lineHeight: '1' }], // 60px
    '7xl': ['4.5rem', { lineHeight: '1' }], // 72px
    '8xl': ['6rem', { lineHeight: '1' }], // 96px
    '9xl': ['8rem', { lineHeight: '1' }], // 128px
  },

  // Font weights
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  // Line heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // Heading styles
  headings: {
    h1: {
      fontSize: 'text-4xl md:text-5xl lg:text-6xl',
      fontWeight: 'font-bold',
      lineHeight: 'leading-tight',
      letterSpacing: 'tracking-tight',
    },
    h2: {
      fontSize: 'text-3xl md:text-4xl lg:text-5xl',
      fontWeight: 'font-bold',
      lineHeight: 'leading-tight',
      letterSpacing: 'tracking-tight',
    },
    h3: {
      fontSize: 'text-2xl md:text-3xl',
      fontWeight: 'font-semibold',
      lineHeight: 'leading-snug',
      letterSpacing: 'tracking-tight',
    },
    h4: {
      fontSize: 'text-xl md:text-2xl',
      fontWeight: 'font-semibold',
      lineHeight: 'leading-snug',
      letterSpacing: 'tracking-tight',
    },
    h5: {
      fontSize: 'text-lg md:text-xl',
      fontWeight: 'font-semibold',
      lineHeight: 'leading-snug',
    },
    h6: {
      fontSize: 'text-base md:text-lg',
      fontWeight: 'font-semibold',
      lineHeight: 'leading-snug',
    },
  },

  // Body text styles
  body: {
    large: 'text-lg leading-relaxed',
    base: 'text-base leading-relaxed',
    small: 'text-sm leading-relaxed',
    xs: 'text-xs leading-relaxed',
  },
} as const;

export type Typography = typeof typography;
