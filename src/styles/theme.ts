/**
 * Theme Configuration
 * Light and dark mode theme tokens for Digital Aksumite
 */

import { colors } from './colors';

export type Theme = 'light' | 'dark' | 'system';

// Light mode theme
export const lightTheme = {
  // Backgrounds
  background: {
    primary: colors.white,
    secondary: colors.gray[50],
    tertiary: colors.gray[100],
    hero: colors.navy.DEFAULT,
    footer: colors.navy.DEFAULT,
  },

  // Text colors
  text: {
    primary: colors.charcoal.DEFAULT,
    secondary: colors.gray[600],
    tertiary: colors.gray[500],
    inverse: colors.white,
    muted: colors.gray[400],
    heading: colors.navy.DEFAULT,
  },

  // Interactive elements
  interactive: {
    primary: {
      background: colors.navy.DEFAULT,
      text: colors.white,
      hover: colors.navy[600],
      active: colors.navy[700],
    },
    accent: {
      background: colors.gold.DEFAULT,
      text: colors.charcoal.DEFAULT,
      hover: colors.gold[600],
      active: colors.gold[700],
    },
    secondary: {
      background: 'transparent',
      border: colors.navy.DEFAULT,
      text: colors.navy.DEFAULT,
      hover: colors.navy[50],
    },
    ghost: {
      background: 'transparent',
      text: colors.navy.DEFAULT,
      hover: colors.navy[50],
    },
  },

  // Borders
  border: {
    light: colors.gray[200],
    medium: colors.gray[300],
    strong: colors.gray[400],
    accent: colors.gold.DEFAULT,
  },

  // Accents
  accent: {
    gold: colors.gold.DEFAULT,
    navy: colors.navy.DEFAULT,
  },

  // Status
  status: {
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    info: colors.info,
  },

  // Shadows
  shadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
} as const;

// Dark mode theme
export const darkTheme = {
  // Backgrounds
  background: {
    primary: colors.charcoal.DEFAULT,
    secondary: colors.charcoal[600],
    tertiary: colors.charcoal[700],
    hero: colors.charcoal[700],
    footer: colors.navy.DEFAULT,
  },

  // Text colors
  text: {
    primary: colors.gray[200],
    secondary: colors.gray[300],
    tertiary: colors.gray[400],
    inverse: colors.charcoal.DEFAULT,
    muted: colors.gray[500],
    heading: colors.white,
  },

  // Interactive elements
  interactive: {
    primary: {
      background: colors.gold.DEFAULT,
      text: colors.charcoal.DEFAULT,
      hover: colors.gold[600],
      active: colors.gold[700],
    },
    accent: {
      background: colors.gold.DEFAULT,
      text: colors.charcoal.DEFAULT,
      hover: colors.gold[600],
      active: colors.gold[700],
    },
    secondary: {
      background: 'transparent',
      border: colors.gold.DEFAULT,
      text: colors.gold.DEFAULT,
      hover: `${colors.gold.DEFAULT}20`, // 20 hex = ~12% opacity
    },
    ghost: {
      background: 'transparent',
      text: colors.gray[200],
      hover: colors.charcoal[600],
    },
  },

  // Borders
  border: {
    light: colors.charcoal[600],
    medium: colors.charcoal[500],
    strong: colors.charcoal[400],
    accent: colors.gold.DEFAULT,
  },

  // Accents
  accent: {
    gold: colors.gold.DEFAULT,
    navy: colors.navy.DEFAULT,
  },

  // Status
  status: {
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    info: colors.info,
  },

  // Shadows (more subtle in dark mode)
  shadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.5)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)',
  },
} as const;

export type LightTheme = typeof lightTheme;
export type DarkTheme = typeof darkTheme;

// CSS variable mapping for Tailwind
export const themeVars = {
  light: {
    // Backgrounds
    '--background-primary': lightTheme.background.primary,
    '--background-secondary': lightTheme.background.secondary,
    '--background-hero': lightTheme.background.hero,
    '--background-footer': lightTheme.background.footer,

    // Text
    '--text-primary': lightTheme.text.primary,
    '--text-secondary': lightTheme.text.secondary,
    '--text-inverse': lightTheme.text.inverse,
    '--text-heading': lightTheme.text.heading,

    // Interactive
    '--interactive-primary-bg': lightTheme.interactive.primary.background,
    '--interactive-primary-text': lightTheme.interactive.primary.text,
    '--interactive-accent-bg': lightTheme.interactive.accent.background,
    '--interactive-accent-text': lightTheme.interactive.accent.text,

    // Borders
    '--border-light': lightTheme.border.light,
    '--border-accent': lightTheme.border.accent,

    // Accents
    '--accent-gold': lightTheme.accent.gold,
    '--accent-navy': lightTheme.accent.navy,
  },
  dark: {
    // Backgrounds
    '--background-primary': darkTheme.background.primary,
    '--background-secondary': darkTheme.background.secondary,
    '--background-hero': darkTheme.background.hero,
    '--background-footer': darkTheme.background.footer,

    // Text
    '--text-primary': darkTheme.text.primary,
    '--text-secondary': darkTheme.text.secondary,
    '--text-inverse': darkTheme.text.inverse,
    '--text-heading': darkTheme.text.heading,

    // Interactive
    '--interactive-primary-bg': darkTheme.interactive.primary.background,
    '--interactive-primary-text': darkTheme.interactive.primary.text,
    '--interactive-accent-bg': darkTheme.interactive.accent.background,
    '--interactive-accent-text': darkTheme.interactive.accent.text,

    // Borders
    '--border-light': darkTheme.border.light,
    '--border-accent': darkTheme.border.accent,

    // Accents
    '--accent-gold': darkTheme.accent.gold,
    '--accent-navy': darkTheme.accent.navy,
  },
} as const;
