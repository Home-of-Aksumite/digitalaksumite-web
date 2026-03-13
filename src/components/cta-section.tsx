/**
 * CTA Section
 * Impactful call-to-action with animated gradient background
 * Premium, architectural presentation
 */

'use client';

import { Container } from '@/components/container';
import { ScrollReveal } from '@/components/scroll-reveal';
import { PremiumButton } from '@/components/premium-button';
import { motion } from 'framer-motion';
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
      {/* Animated Gradient Background */}
      <div className="absolute inset-0">
        {/* Subtle animated glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A227]/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #C9A227 1px, transparent 1px),
                              linear-gradient(to bottom, #C9A227 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Gold Accent Lines */}
      <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-transparent via-[#C9A227]/50 to-transparent" />
      <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-transparent via-[#C9A227]/50 to-transparent" />

      <Container className="relative z-10">
        <div className="py-28 text-center md:py-32">
          <ScrollReveal>
            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              {resolvedTitle}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[#E5E7EB]/80 md:text-xl">
              {resolvedSubtitle}
            </p>
          </ScrollReveal>

          {/* CTA Buttons */}
          <ScrollReveal delay={0.2}>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <PremiumButton href={resolvedPrimaryCta.href} variant="primary">
                {resolvedPrimaryCta.label}
              </PremiumButton>

              <PremiumButton href={resolvedSecondaryCta.href} variant="secondary">
                {resolvedSecondaryCta.label}
              </PremiumButton>
            </div>
          </ScrollReveal>

          {/* Bottom decorative line */}
          <div className="absolute bottom-0 left-1/2 h-[1px] w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#C9A227]/50 to-transparent" />
        </div>
      </Container>
    </section>
  );
}
