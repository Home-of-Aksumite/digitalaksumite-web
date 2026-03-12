/**
 * Navbar Component
 * Site navigation with theme-aware styling
 */

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Container } from '@/components/container';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#services', label: 'Services' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#testimonials', label: 'Testimonials' },
  { href: '/#blog', label: 'Blog' },
  { href: '/careers', label: 'Careers' },
  { href: '/#contact', label: 'Contact' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-colors',
        'border-[#E5E7EB] bg-white',
        'dark:border-[#1F2937] dark:bg-[#121212]'
      )}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              'flex items-center gap-2 text-xl font-bold transition-colors',
              'text-[#0F2A44]',
              'dark:text-white'
            )}
          >
            <span className="text-2xl">◈</span>
            <span>Digital Aksumite</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors',
                  'text-[#0F2A44] hover:text-[#C9A227]',
                  'dark:text-[#E5E7EB] dark:hover:text-[#C9A227]'
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* CTA Button */}
            <Link
              href="/#contact"
              className={cn(
                'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                'bg-[#C9A227] text-[#121212] hover:bg-[#A18220]',
                'dark:bg-[#C9A227] dark:text-[#121212] dark:hover:bg-[#A18220]'
              )}
            >
              Get Started
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                'rounded-lg p-2 transition-colors',
                'text-[#0F2A44] hover:bg-[#0F2A44]/10',
                'dark:text-[#E5E7EB] dark:hover:bg-white/10'
              )}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <CloseIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className={cn(
              'border-t py-4 md:hidden',
              'border-[#E5E7EB] bg-white',
              'dark:border-[#1F2937] dark:bg-[#121212]'
            )}
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'text-base font-medium transition-colors',
                    'text-[#0F2A44] hover:text-[#C9A227]',
                    'dark:text-[#E5E7EB] dark:hover:text-[#C9A227]'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'mt-2 rounded-lg px-4 py-2 text-center text-sm font-medium',
                  'bg-[#C9A227] text-[#121212] hover:bg-[#A18220]',
                  'dark:bg-[#C9A227] dark:text-[#121212] dark:hover:bg-[#A18220]'
                )}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
