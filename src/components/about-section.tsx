/**
 * About Section
 * Philosophy/About with scroll reveal and refined typography
 * Architectural, calm presentation
 */

'use client';

import { Container } from '@/components/container';
import { ScrollReveal } from '@/components/scroll-reveal';
import { PremiumButton } from '@/components/premium-button';
import { cn } from '@/lib/utils';
import type { AboutPage } from '@/types/content';

interface AboutSectionProps {
  aboutPage?: AboutPage;
}

export function AboutSection({ aboutPage }: AboutSectionProps) {
  const title = aboutPage?.title || 'About Us';
  const shortText =
    aboutPage?.history || aboutPage?.mission || 'Learn more about our story and mission.';

  return (
    <section id="about" className="bg-[#121212] py-28 md:py-32 dark:bg-[#121212]">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          {/* Section Label */}
          <ScrollReveal>
            <span className="text-sm font-semibold tracking-widest text-[#C9A227] uppercase">
              About Us
            </span>
          </ScrollReveal>

          {/* Title */}
          <ScrollReveal delay={0.1}>
            <h2
              className={cn(
                'mt-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl',
                'text-[#0F2A44]',
                'dark:text-white'
              )}
            >
              {title}
            </h2>
          </ScrollReveal>

          {/* Description */}
          <ScrollReveal delay={0.2}>
            <p
              className={cn(
                'mx-auto mt-8 max-w-2xl text-lg leading-relaxed md:text-xl',
                'text-[#6B7280]',
                'dark:text-[#9CA3AF]'
              )}
            >
              {shortText}
            </p>
          </ScrollReveal>

          {/* CTA Button */}
          <ScrollReveal delay={0.3}>
            <div className="mt-12">
              <PremiumButton href="/about" variant="secondary">
                Discover Our Story
              </PremiumButton>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
