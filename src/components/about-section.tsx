/**
 * About Section
 * Philosophy/About with scroll reveal, refined typography, and system visualization
 * Architectural, calm presentation
 */

'use client';

import { Container } from '@/components/container';
import { ScrollReveal } from '@/components/scroll-reveal';
import { PremiumButton } from '@/components/premium-button';
import { HeroSystemVisualization } from '@/components/hero-system-visualization';
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
    <section
      id="about"
      className="relative overflow-hidden bg-[#121212] py-28 md:py-32 dark:bg-[#121212]"
    >
      {/* Background glow effect matching hero visualization style */}
      <div
        className="pointer-events-none absolute top-1/2 right-0 h-full w-1/2 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle at 70% 50%, rgba(201,162,39,0.05), transparent 60%)',
        }}
      />

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Text Content */}
          <div className="order-2 lg:order-1">
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
                  'text-white'
                )}
              >
                {title}
              </h2>
            </ScrollReveal>

            {/* Description */}
            <ScrollReveal delay={0.2}>
              <p
                className={cn('mt-8 max-w-xl text-lg leading-relaxed md:text-xl', 'text-[#9CA3AF]')}
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

          {/* Right: System Visualization */}
          <div className="order-1 flex items-center justify-center lg:order-2">
            <ScrollReveal delay={0.2} direction="left">
              <div className="relative">
                <HeroSystemVisualization />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
