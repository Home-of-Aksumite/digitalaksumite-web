/**
 * Brand Colors
 * Digital Aksumite - Ancient power + modern technology
 */

export const colors = {
  // Primary Brand Colors
  navy: {
    DEFAULT: '#0F2A44',
    50: '#E8EDF2',
    100: '#D1DBE6',
    200: '#A3B7CD',
    300: '#7593B4',
    400: '#476F9B',
    500: '#0F2A44', // Primary
    600: '#0C2237',
    700: '#091A2A',
    800: '#06111D',
    900: '#030910',
  },

  // Heritage Accent
  gold: {
    DEFAULT: '#C9A227',
    50: '#F9F4E6',
    100: '#F3E9CD',
    200: '#E7D39B',
    300: '#DBBD69',
    400: '#CFA737',
    500: '#C9A227', // Primary accent
    600: '#A18220',
    700: '#796219',
    800: '#514111',
    900: '#28210A',
  },

  // Neutrals
  charcoal: {
    DEFAULT: '#121212',
    50: '#E5E5E5',
    100: '#CCCCCC',
    200: '#999999',
    300: '#666666',
    400: '#333333',
    500: '#121212', // Dark mode bg
    600: '#0F0F0F',
    700: '#0C0C0C',
    800: '#080808',
    900: '#040404',
  },

  gray: {
    DEFAULT: '#E5E7EB',
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB', // Borders / UI lines
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Semantic Colors
  white: '#FFFFFF',
  black: '#000000',

  // Status Colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
} as const;

export type Colors = typeof colors;
