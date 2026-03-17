/**
 * Premium Button Component
 * Architectural, precise button with subtle gold glow on hover
 * Inspired by Stripe's interaction design
 */

'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface PremiumButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  external?: boolean;
}

export function PremiumButton({
  href,
  children,
  variant = 'primary',
  className,
  external = false,
}: PremiumButtonProps) {
  const baseStyles = cn(
    'group relative inline-flex items-center justify-center',
    'overflow-hidden rounded-lg px-8 py-4',
    'text-base font-semibold',
    'transition-all duration-300',
    'focus:outline-none focus:ring-2 focus:ring-[#C9A227]/50',
    variant === 'primary' && [
      'bg-[#C9A227] text-[#121212]',
      'hover:bg-[#0F2A44] hover:text-[#C9A227]',
      'hover:shadow-[0_0_30px_rgba(201,162,39,0.3)]',
      'hover:scale-[1.02]',
    ],
    variant === 'secondary' && [
      'border border-[#0F2A44]/30 text-[#0F2A44]',
      'hover:border-[#C9A227]/50 hover:text-[#C9A227]',
      'hover:bg-[#C9A227]/5',
    ],
    className
  );

  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={href} className={baseStyles} {...externalProps}>
        {/* Glow effect for primary */}
        {variant === 'primary' && (
          <span className="absolute inset-0 rounded-lg bg-white/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
        )}

        {/* Shine sweep animation */}
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

        {/* Content */}
        <span className="relative flex items-center gap-2">
          {children}
          {variant === 'primary' && (
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </span>
      </Link>
    </motion.div>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}
