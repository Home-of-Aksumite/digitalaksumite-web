/**
 * Premium Hero Section
 * Immersive hero with animated gradient, staggered text reveal
 * Architectural, precise, calm - inspired by Stripe and Apple
 */

'use client';

import { AnimatedGradientBackground } from '@/components/animated-gradient-background';
import { PremiumButton } from '@/components/premium-button';
import { HeroObeliskVisualization } from '@/components/hero-obelisk-visualization';
import { ClientLogosMarquee } from '@/components/client-logos-marquee';
import { Container } from '@/components/container';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import type { HomePage, TrustedPartner } from '@/types/content';

interface HeroProps {
  homePage?: HomePage | null;
  trustedPartners?: TrustedPartner[];
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

export function Hero({ homePage, trustedPartners }: HeroProps) {
  // Scroll-based parallax for obelisk - more dramatic effect
  const { scrollY } = useScroll();
  const obeliskY = useTransform(scrollY, [0, 300, 600], [0, -60, -120]);
  const obeliskOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const obeliskScale = useTransform(scrollY, [0, 400], [1, 0.9]);

  // Use Strapi data if available, otherwise fallback to defaults
  const heroTitle = homePage?.heroTitle;
  // Split title by newlines or pipe character to support multi-line titles
  const titleLines = heroTitle
    ? heroTitle.split(/\n|\|/)
    : [];
  // Only use defaults if no heroTitle provided at all
  const line1 = titleLines[0]?.trim() || (heroTitle ? '' : 'We Build');
  const line2 = titleLines[1]?.trim() || (heroTitle ? '' : 'Systems');
  const line3 = titleLines[2]?.trim() || (heroTitle ? '' : 'That Last');

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

  return (
    <section className="relative min-h-screen bg-[#0F2A44]">
      {/* Animated Gradient Background */}
      <AnimatedGradientBackground />

      {/* Content */}
      <Container className="relative z-10">
        <div className="flex min-h-[130vh] items-start pt-16 lg:pt-20">
          <div className="grid w-full grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8">
            {/* Left side - Text content */}
            <motion.div
              className="flex flex-col items-center pt-4 text-center lg:items-start lg:pt-8 lg:text-left"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Title - 3 lines: editable from Strapi via heroTitle */}
              <motion.h1 className="max-w-5xl" variants={containerVariants}>
                <motion.span
                  className="block text-5xl leading-[1.08] font-bold tracking-tight text-white md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl"
                  variants={titleWordVariants}
                >
                  {line1}
                </motion.span>
                <motion.span
                  className="mt-2 block text-5xl leading-[1.08] font-bold tracking-tight text-white md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl"
                  variants={titleWordVariants}
                >
                  {line2}
                </motion.span>
                <motion.span
                  className="mt-2 block text-5xl leading-[1.08] font-bold tracking-tight text-white md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl"
                  variants={titleWordVariants}
                >
                  {line3}
                </motion.span>
              </motion.h1>

              {/* Subtitle - stepped back to let title dominate */}
              <motion.p
                className="mt-3 max-w-xl text-base leading-relaxed text-[#E5E7EB]/60 md:text-lg lg:text-xl"
                variants={itemVariants}
              >
                {subtitle}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
                variants={itemVariants}
              >
                <PremiumButton
                  href={ctaButtonUrl}
                  variant="primary"
                  className="min-w-[160px] text-base"
                >
                  {ctaButtonText}
                </PremiumButton>

                <PremiumButton
                  href={secondaryButtonUrl}
                  variant="secondary"
                  className="min-w-[160px] text-base"
                >
                  {secondaryButtonText}
                </PremiumButton>
              </motion.div>
            </motion.div>

            {/* Right side - Obelisk visualization with scroll effects */}
            <motion.div
              className="hidden items-start justify-center lg:flex"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              style={{ y: obeliskY, opacity: obeliskOpacity, scale: obeliskScale }}
            >
              <HeroObeliskVisualization />
            </motion.div>
          </div>
        </div>

        {/* Client Logos Marquee - Trust Banner - positioned lower */}
        <div className="absolute right-0 bottom-4 left-0 z-20">
          <Container>
            <p className="mb-4 text-center text-lg font-bold text-white/60">
              Trusted by industry leaders
            </p>
            <ClientLogosMarquee logos={trustedPartners} />
          </Container>
        </div>

        {/* Logo marquee placeholder area */}
        <div className="absolute right-0 bottom-0 left-0 h-24" />
      </Container>

      {/* Bottom accent line */}
      <div className="absolute right-0 bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A227]/30 to-transparent" />
    </section>
  );
}
