'use client';

/**
 * Theme Provider
 * Manages light/dark mode with system preference detection and localStorage persistence
 */

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {},
  mounted: false,
});

const STORAGE_KEY = 'digital-aksumite-theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for hydration mismatch prevention in Next.js
    setMounted(true);

    // Check localStorage first, then system preference
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;

    if (stored && (stored === 'light' || stored === 'dark')) {
      setThemeState(stored);
      document.documentElement.classList.toggle('dark', stored === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      setThemeState(initialTheme);
      document.documentElement.classList.toggle('dark', prefersDark);
    }

    // Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't manually set preference
      if (!localStorage.getItem(STORAGE_KEY)) {
        const newTheme = e.matches ? 'dark' : 'light';
        setThemeState(newTheme);
        document.documentElement.classList.toggle('dark', e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
    const isDark = newTheme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
  };

  const toggleTheme = () => {
    const current = theme;
    const newTheme = current === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
