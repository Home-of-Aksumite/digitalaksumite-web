/**
 * Premium Hero Section
 * Immersive hero with animated gradient, staggered text reveal
 * Architectural, precise, calm - inspired by Stripe and Apple
 */

'use client';

import { AnimatedGradientBackground } from '@/components/animated-gradient-background';
import { PremiumButton } from '@/components/premium-button';
import { Container } from '@/components/container';
import { motion, type Variants } from 'framer-motion';
import type { HomePage } from '@/types/content';

interface HeroProps {
  homePage?: HomePage | null;
}

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const titleWordVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function Hero({ homePage }: HeroProps) {
  // Use Strapi data if available, otherwise fallback to defaults
  const title = homePage?.heroTitle || 'Ancient Power.\nModern Technology.';
  const subtitle =
    homePage?.heroSubtitle ||
    'Digital Aksumite blends African heritage with cutting-edge engineering to build digital solutions that stand the test of time.';

  const primaryText = homePage?.heroPrimaryButtonText?.trim();
  const primaryUrl = homePage?.heroPrimaryButtonUrl?.trim();
  const secondaryText = homePage?.heroSecondaryButtonText?.trim();
  const secondaryUrl = homePage?.heroSecondaryButtonUrl?.trim();

  const ctaButtonText = primaryText ?? 'Start a Project';
  const ctaButtonUrl = primaryUrl ?? '/#contact';
  const secondaryButtonText = secondaryText ?? 'View Services';
  const secondaryButtonUrl = secondaryUrl ?? '/services';

  // Split title for staggered animation
  const titleLines = title.split('\n');

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0F2A44]">
      {/* Animated Gradient Background */}
      <AnimatedGradientBackground />

      {/* Content */}
      <Container className="relative z-10">
        <motion.div
          className="flex min-h-screen flex-col items-center justify-center py-32 pt-40"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Title - Staggered word by word */}
          <motion.h1 className="max-w-5xl text-center" variants={containerVariants}>
            {titleLines.map((line, lineIndex) => (
              <span key={lineIndex} className="block">
                {line.split(' ').map((word, wordIndex) => (
                  <motion.span
                    key={`${lineIndex}-${wordIndex}`}
                    className="mr-[0.3em] inline-block text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl xl:text-8xl"
                    variants={titleWordVariants}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mt-8 max-w-2xl text-center text-lg leading-relaxed text-[#E5E7EB]/80 md:text-xl"
            variants={itemVariants}
          >
            {subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center"
            variants={itemVariants}
          >
            <PremiumButton href={ctaButtonUrl} variant="primary" className="min-w-[160px]">
              {ctaButtonText}
            </PremiumButton>

            <PremiumButton href={secondaryButtonUrl} variant="secondary" className="min-w-[160px]">
              {secondaryButtonText}
            </PremiumButton>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            variants={itemVariants}
          >
            <motion.div
              className="flex flex-col items-center gap-2 text-[#E5E7EB]/40"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="text-xs tracking-widest uppercase">Scroll</span>
              <div className="h-12 w-[1px] bg-gradient-to-b from-[#C9A227]/50 to-transparent" />
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Bottom accent line */}
      <div className="absolute right-0 bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A227]/30 to-transparent" />
    </section>
  );
}
