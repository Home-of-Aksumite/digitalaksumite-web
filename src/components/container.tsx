/**
 * Container Component
 * Max-width wrapper with consistent padding
 */

import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const sizeClasses = {
  sm: 'max-w-3xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
};

function getSizeClass(size: string): string {
  switch (size) {
    case 'sm': {
      return sizeClasses.sm;
    }
    case 'md': {
      return sizeClasses.md;
    }
    case 'lg': {
      return sizeClasses.lg;
    }
    case 'full': {
      return sizeClasses.full;
    }
    case 'xl':
    default: {
      return sizeClasses.xl;
    }
  }
}

export function Container({ children, className, size = 'xl' }: ContainerProps) {
  const sizeClass = getSizeClass(size);
  return (
    <div className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizeClass, className)}>
      {children}
    </div>
  );
}
