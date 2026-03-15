/**
 * Client Logos Marquee - World Class Trust Banner
 * Premium infinite scrolling logo showcase with sophisticated interactions
 * Inspired by Stripe, Linear, and Apple-level polish
 */

'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { ClientLogo } from '@/types/content';
import { trustedPartnerService } from '@/services/client-logo.service';

interface ClientLogosMarqueeProps {
  logos?: ClientLogo[];
}

export function ClientLogosMarquee({ logos: initialLogos }: ClientLogosMarqueeProps) {
  const [logos, setLogos] = useState<ClientLogo[]>(initialLogos || []);
  const [loading, setLoading] = useState(!initialLogos);
  const [hoveredId, setHoveredId] = useState<string | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!initialLogos) {
      trustedPartnerService.getAll().then((data) => {
        setLogos(data);
        setLoading(false);
      });
    }
  }, [initialLogos]);

  // Create seamless infinite scroll - duplicate enough times
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos];

  if (loading) {
    return (
      <div className="py-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-center gap-8">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-16 w-32 animate-pulse rounded-xl bg-white/5 backdrop-blur-sm"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (logos.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-sm font-medium text-white/40">Trusted partners coming soon...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Premium container with subtle glass effect - full width edge to edge */}
      <div className="relative w-full overflow-hidden border-y border-white/5 bg-white/[0.02] backdrop-blur-sm">
        {/* Top gold accent line - full width */}
        <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A227]/40 to-transparent" />

        {/* Bottom gold accent line - full width */}
        <div className="absolute right-0 bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A227]/40 to-transparent" />

        {/* Left fade gradient */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0F2A44]/80 via-[#0F2A44]/40 to-transparent" />

        {/* Right fade gradient */}
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-24 bg-gradient-to-l from-[#0F2A44]/80 via-[#0F2A44]/40 to-transparent" />

        {/* Scrolling container */}
        <div
          ref={containerRef}
          className="flex items-center gap-2 py-5"
          style={{
            animation: 'marquee-scroll 30s linear infinite',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.animationPlayState = 'paused';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.animationPlayState = 'running';
            setHoveredId(undefined);
          }}
        >
          <style>{`
            @keyframes marquee-scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-16.666%); }
            }
          `}</style>

          {duplicatedLogos.map((logo, index) => {
            const isHovered = hoveredId === `${logo.id}-${index}`;
            const hasAnyHover = hoveredId !== undefined;
            const uniqueKey = `${logo.id}-${index}`;

            return (
              <div
                key={uniqueKey}
                className="group flex-shrink-0 px-8"
                onMouseEnter={() => setHoveredId(uniqueKey)}
                onMouseLeave={() => setHoveredId(undefined)}
              >
                {logo.link ? (
                  <Link
                    href={logo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block"
                  >
                    <LogoCard logo={logo} isHovered={isHovered} hasAnyHover={hasAnyHover} />
                  </Link>
                ) : (
                  <LogoCard logo={logo} isHovered={isHovered} hasAnyHover={hasAnyHover} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface LogoCardProps {
  logo: ClientLogo;
  isHovered: boolean;
  hasAnyHover: boolean;
}

function LogoCard({ logo, isHovered, hasAnyHover }: LogoCardProps) {
  return (
    <motion.div
      className="relative flex h-16 w-32 items-center justify-center px-4"
      animate={{
        scale: isHovered ? 1.12 : 1,
      }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Subtle glow on hover */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-full"
        animate={{
          boxShadow: isHovered
            ? '0 0 40px rgba(201, 162, 39, 0.25), 0 0 80px rgba(201, 162, 39, 0.1)'
            : '0 0 0px rgba(201, 162, 39, 0)',
        }}
        transition={{ duration: 0.3 }}
      />

      {logo.logo ? (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
          <Image
            src={logo.logo.url}
            alt={logo.name}
            width={120}
            height={48}
            unoptimized
            className="h-9 w-auto max-w-[100px] object-contain transition-all duration-400"
            style={{
              filter: hasAnyHover
                ? isHovered
                  ? 'grayscale(0) brightness(1.25) drop-shadow(0 4px 16px rgba(201, 162, 39, 0.35))'
                  : 'grayscale(0.7) brightness(0.6) opacity(0.35)'
                : 'grayscale(0.2) brightness(1) opacity(0.9)',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
        </div>
      ) : (
        <span
          className="text-center text-sm font-bold tracking-widest uppercase transition-all duration-400"
          style={{
            color: isHovered
              ? '#C9A227'
              : hasAnyHover
                ? 'rgba(255, 255, 255, 0.35)'
                : 'rgba(255, 255, 255, 0.8)',
            textShadow: isHovered ? '0 0 30px rgba(201, 162, 39, 0.6)' : 'none',
            letterSpacing: isHovered ? '0.15em' : '0.1em',
            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
          }}
        >
          {logo.name}
        </span>
      )}
    </motion.div>
  );
}
