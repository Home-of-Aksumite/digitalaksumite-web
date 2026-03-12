/**
 * Hero Section
 * Main hero with navy background and gold CTA
 * Uses content from Strapi HomePage single type
 */

import Link from 'next/link';
import { Container } from '@/components/container';
import { cn } from '@/lib/utils';
import type { HomePage } from '@/types/content';

interface HeroProps {
  homePage?: HomePage | null;
}

export function Hero({ homePage }: HeroProps) {
  // Use Strapi data if available, otherwise fallback to defaults
  const title = homePage?.heroTitle || 'Ancient Power.\nModern Technology.';
  const subtitle =
    homePage?.heroSubtitle ||
    'Digital Aksumite blends African heritage with cutting-edge engineering to build digital solutions that stand the test of time.';
  const ctaButtonText = homePage?.heroPrimaryButtonText || 'Get in Touch';
  const secondaryButtonText = homePage?.heroSecondaryButtonText || 'Our Services';

  return (
    <section className="relative overflow-hidden bg-[#0F2A44]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #C9A227 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Gold Accent Line */}
      <div className="absolute right-0 bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent" />

      <Container className="relative">
        <div className="flex min-h-[600px] flex-col items-center justify-center py-24 text-center md:min-h-[700px] md:py-32">
          {/* Title */}
          <h1 className="max-w-4xl text-4xl leading-tight font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            {title.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i < title.split('\n').length - 1 && <br />}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#E5E7EB]/80 md:text-xl">
            {subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className={cn(
                'inline-flex items-center justify-center rounded-lg px-8 py-4',
                'text-base font-semibold transition-all duration-200',
                'bg-[#C9A227] text-[#121212] hover:bg-[#A18220]',
                'focus:ring-2 focus:ring-[#C9A227] focus:ring-offset-2 focus:ring-offset-[#0F2A44] focus:outline-none'
              )}
            >
              {ctaButtonText}
              <ArrowIcon className="ml-2 h-5 w-5" />
            </Link>

            <Link
              href="#/contact"
              className={cn(
                'inline-flex items-center justify-center rounded-lg px-8 py-4',
                'text-base font-medium transition-all duration-200',
                'border border-[#E5E7EB]/30 text-white',
                'hover:border-[#C9A227] hover:text-[#C9A227]',
                'focus:ring-2 focus:ring-[#C9A227] focus:ring-offset-2 focus:ring-offset-[#0F2A44] focus:outline-none'
              )}
            >
              {secondaryButtonText}
            </Link>
          </div>
        </div>
      </Container>
    </section>
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
