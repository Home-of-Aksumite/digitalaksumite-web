/**
 * About Section
 * Displays company intro on homepage using AboutPage single type content
 */

import Link from 'next/link';
import { Container } from '@/components/container';
import { cn } from '@/lib/utils';
import type { AboutPage } from '@/types/content';

interface AboutSectionProps {
  aboutPage?: AboutPage;
}

export function AboutSection({ aboutPage }: AboutSectionProps) {
  const title = aboutPage?.title || 'About Us';
  // Use history if available, fallback to mission, then to default
  const shortText = aboutPage?.history || aboutPage?.mission || 'Learn more about our story and mission.';
  const buttonText = 'Discover Our Story';

  return (
    <section id="about" className={cn('py-20 md:py-28', 'bg-[#F9FAFB]', 'dark:bg-[#0C0C0C]')}>
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          {/* Section Label */}
          <span className="text-sm font-semibold tracking-wider text-[#C9A227] uppercase">
            About Us
          </span>

          {/* Title */}
          <h2
            className={cn(
              'mt-4 text-3xl font-bold tracking-tight md:text-4xl',
              'text-[#0F2A44]',
              'dark:text-white'
            )}
          >
            {title}
          </h2>

          {/* Description */}
          <p
            className={cn(
              'mx-auto mt-6 max-w-2xl text-lg leading-relaxed',
              'text-[#6B7280]',
              'dark:text-[#9CA3AF]'
            )}
          >
            {shortText}
          </p>

          {/* CTA Button */}
          <div className="mt-10">
            <Link
              href="/about"
              className={cn(
                'inline-flex items-center justify-center rounded-lg px-8 py-4',
                'text-base font-semibold transition-all duration-200',
                'border-2 border-[#0F2A44] text-[#0F2A44]',
                'hover:bg-[#0F2A44] hover:text-white',
                'dark:border-[#C9A227] dark:text-[#C9A227]',
                'dark:hover:bg-[#C9A227] dark:hover:text-[#121212]',
                'focus:ring-2 focus:ring-[#C9A227] focus:ring-offset-2 focus:outline-none'
              )}
            >
              {buttonText}
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
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
