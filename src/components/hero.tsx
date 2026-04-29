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

  // Use CMS data if available, otherwise fallback to defaults
  const heroTitle = homePage?.heroTitle;
  // Split title by newlines or pipe character to support multi-line titles
  const titleLines = heroTitle ? heroTitle.split(/[\r\n]+|[|｜¦┃│]/) : [];

  const defaultLine1 = 'We Build';
  const defaultLine2 = 'Systems';
  const defaultLine3 = 'That Lasts';

  let line1 = defaultLine1;
  let line2 = defaultLine2;
  let line3 = defaultLine3;

  if (heroTitle) {
    const trimmedLines = titleLines.map((l) => l.trim()).filter(Boolean);

    if (trimmedLines.length >= 3) {
      line1 = trimmedLines[0] ?? defaultLine1;
      line2 = trimmedLines[1] ?? defaultLine2;
      line3 = trimmedLines[2] ?? defaultLine3;
    } else if (trimmedLines.length === 2) {
      line1 = trimmedLines[0] ?? defaultLine1;
      line2 = trimmedLines[1] ?? defaultLine2;
      line3 = defaultLine3;
    } else if (trimmedLines.length === 1) {
      const words = trimmedLines[0]!.split(/\s+/).filter(Boolean);

      if (words.length >= 5) {
        line1 = words.slice(0, 2).join(' ');
        line2 = words.slice(2, 4).join(' ');
        line3 = words.slice(4).join(' ');
      } else if (words.length === 4) {
        line1 = words.slice(0, 2).join(' ');
        line2 = words.slice(2, 3).join(' ');
        line3 = words.slice(3).join(' ');
      } else if (words.length === 3) {
        line1 = words[0] ?? defaultLine1;
        line2 = words[1] ?? defaultLine2;
        line3 = words[2] ?? defaultLine3;
      } else if (words.length === 2) {
        line1 = words.join(' ');
        line2 = defaultLine2;
        line3 = defaultLine3;
      } else {
        line1 = trimmedLines[0] ?? defaultLine1;
        line2 = defaultLine2;
        line3 = defaultLine3;
      }
    }
  }

  const subtitle =
    homePage?.heroSubtitle || 'We create systems that define, protect and guide our society.';

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
        <div className="flex min-h-screen items-start pt-24 md:items-center md:pt-20 lg:min-h-[130vh] lg:items-start lg:pt-20">
          <div className="grid w-full grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8">
            {/* Left side - Text content */}
            <motion.div
              className="flex flex-col items-center pt-0 text-center lg:items-start lg:pt-8 lg:text-left"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Title - 3 lines: editable from the CMS via heroTitle */}
              <motion.h1 className="w-full" variants={containerVariants}>
                <motion.span
                  className="block text-6xl leading-[1.06] font-bold tracking-tight whitespace-nowrap text-white md:text-7xl lg:text-7xl xl:text-8xl 2xl:text-9xl"
                  variants={titleWordVariants}
                >
                  {line1}
                </motion.span>
                <motion.span
                  className="mt-2 block text-6xl leading-[1.06] font-bold tracking-tight whitespace-nowrap text-white md:text-7xl lg:text-7xl xl:text-8xl 2xl:text-9xl"
                  variants={titleWordVariants}
                >
                  {line2}
                </motion.span>
                <motion.span
                  className="mt-2 block text-6xl leading-[1.06] font-bold tracking-tight whitespace-nowrap text-white md:text-7xl lg:text-7xl xl:text-8xl 2xl:text-9xl"
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
                className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center md:mt-12 lg:mt-8"
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
        <div className="relative z-20 mt-24 pb-14 md:mt-10 md:pb-10 lg:absolute lg:right-0 lg:bottom-4 lg:left-0 lg:mt-0 lg:pb-0">
          <Container>
            <p className="mb-4 text-center text-lg font-bold text-white/60">
              Trusted by industry leaders
            </p>
            <ClientLogosMarquee logos={trustedPartners} />
          </Container>
        </div>

        {/* Logo marquee placeholder area */}
        <div className="absolute right-0 bottom-0 left-0 hidden h-24 lg:block" />
      </Container>

      {/* Bottom accent line */}
      <div className="absolute right-0 bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[#C9A227]/30 to-transparent" />
    </section>
  );
}
