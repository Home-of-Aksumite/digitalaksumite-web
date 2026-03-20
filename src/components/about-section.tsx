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
      className={cn(
        'relative overflow-hidden border-t border-[#E8E4DC] py-20 md:py-28 lg:py-32',
        'bg-[#FAFAF5]',
        'dark:border-[#2D3748] dark:bg-[#18181B]'
      )}
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
                  'mt-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl xl:text-6xl',
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
                  'mt-6 max-w-xl text-base leading-relaxed md:mt-8 md:text-lg lg:text-xl',
                  'text-[#475569]',
                  'dark:text-[#9CA3AF]'
                )}
              >
                {shortText}
              </p>
            </ScrollReveal>

            {/* CTA Button */}
            <ScrollReveal delay={0.3}>
              <div className="mt-8 md:mt-12">
                <PremiumButton href="/about" variant="primary">
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
