/**
 * CTA Section
 * Call-to-action banner with navy background
 */

import { Container } from '@/components/container';
import { cn } from '@/lib/utils';
import type { HomePage } from '@/types/content';

interface CTASectionProps {
  homePage?: HomePage | null;
  title?: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function CTASection({
  homePage,
  title = 'Ready to Build Something Amazing?',
  subtitle = 'Let us bring your digital vision to life. From concept to deployment, we are with you every step of the way.',
  primaryCta = { label: 'Start Your Project', href: '/#contact' },
  secondaryCta = { label: 'Schedule a Call', href: '/#contact' },
}: CTASectionProps) {
  const resolvedTitle = homePage?.ctaTitle || title;
  const resolvedSubtitle = homePage?.ctaSubtitle || subtitle;
  const resolvedPrimaryCta = {
    label: homePage?.ctaPrimaryButtonText || homePage?.ctaButtonText || primaryCta.label,
    href: homePage?.ctaPrimaryButtonUrl || primaryCta.href,
  };
  const resolvedSecondaryCta = {
    label: homePage?.ctaSecondaryButtonText || secondaryCta.label,
    href: homePage?.ctaSecondaryButtonUrl || secondaryCta.href,
  };

  return (
    <section className="relative overflow-hidden bg-[#0F2A44]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #C9A227 1px, transparent 1px),
                              linear-gradient(to bottom, #C9A227 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Gold Accent Lines */}
      <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-transparent via-[#C9A227] to-transparent opacity-50" />
      <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-transparent via-[#C9A227] to-transparent opacity-50" />

      <Container className="relative">
        <div className="py-20 text-center md:py-28">
          {/* Title */}
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            {resolvedTitle}
          </h2>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#E5E7EB]/80">{resolvedSubtitle}</p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={resolvedPrimaryCta.href}
              className={cn(
                'inline-flex items-center justify-center rounded-lg px-8 py-4',
                'text-base font-semibold transition-all duration-200',
                'bg-[#C9A227] text-[#121212] hover:bg-[#A18220]',
                'focus:ring-2 focus:ring-[#C9A227] focus:ring-offset-2 focus:ring-offset-[#0F2A44] focus:outline-none'
              )}
            >
              {resolvedPrimaryCta.label}
              <ArrowIcon className="ml-2 h-5 w-5" />
            </a>

            <a
              href={resolvedSecondaryCta.href}
              className={cn(
                'inline-flex items-center justify-center rounded-lg px-8 py-4',
                'text-base font-medium transition-all duration-200',
                'border border-[#E5E7EB]/30 text-white',
                'hover:border-[#C9A227] hover:text-[#C9A227]',
                'focus:ring-2 focus:ring-[#C9A227] focus:ring-offset-2 focus:ring-offset-[#0F2A44] focus:outline-none'
              )}
            >
              {resolvedSecondaryCta.label}
            </a>
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
