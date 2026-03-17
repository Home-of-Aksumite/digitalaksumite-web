/**
 * Theme Toggle Button
 * Switches between light and dark mode
 */

'use client';

import { useTheme } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  variant?: 'icon' | 'button' | 'navbar';
}

export function ThemeToggle({ className, variant = 'icon' }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  // Prevent hydration mismatch - render placeholder during SSR
  if (!mounted) {
    return <div className={cn('h-5 w-5 rounded-lg', className)} aria-hidden="true" />;
  }

  if (variant === 'button') {
    return (
      <button
        onClick={toggleTheme}
        className={cn(
          'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
          'bg-[#0F2A44] text-white hover:bg-[#0C2237]',
          'dark:bg-[#C9A227] dark:text-[#121212] dark:hover:bg-[#A18220]',
          className
        )}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? (
          <>
            <MoonIcon className="h-4 w-4" />
            <span>Dark</span>
          </>
        ) : (
          <>
            <SunIcon className="h-4 w-4" />
            <span>Light</span>
          </>
        )}
      </button>
    );
  }

  if (variant === 'navbar') {
    return (
      <button
        onClick={toggleTheme}
        className={cn(
          'rounded-lg p-2 transition-colors',
          'text-white hover:bg-white/10',
          className
        )}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'rounded-lg p-2 transition-colors',
        'text-[#0F2A44] hover:bg-[#0F2A44]/10',
        'dark:text-[#E5E7EB] dark:hover:bg-white/10',
        className
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
    </button>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );
}
