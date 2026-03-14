/**
 * Client Logos Marquee
 * Infinite scrolling trust banner with client/technology logos
 * Inspired by Stripe's logo marquee
 */

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ClientLogo } from '@/types/content';
import { trustedPartnerService } from '@/services/client-logo.service';

interface ClientLogosMarqueeProps {
  logos?: ClientLogo[];
}

export function ClientLogosMarquee({ logos: initialLogos }: ClientLogosMarqueeProps) {
  const [logos, setLogos] = useState<ClientLogo[]>(initialLogos || []);
  const [loading, setLoading] = useState(!initialLogos);
  const [hoveredIndex, setHoveredIndex] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!initialLogos) {
      trustedPartnerService.getAll().then((data) => {
        setLogos(data);
        setLoading(false);
      });
    }
  }, [initialLogos]);

  // Create 4 copies for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

  if (loading) {
    return (
      <div className="py-8">
        <div className="h-12 animate-pulse rounded bg-white/10" />
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
    <div className="relative overflow-hidden py-8">
      {/* Gradient fade on left */}
      <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-32 bg-gradient-to-r from-[#0F2A44] to-transparent" />

      {/* Gradient fade on right */}
      <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-32 bg-gradient-to-l from-[#0F2A44] to-transparent" />

      {/* Scrolling container with CSS animation for proper hover pause */}
      <div
        className="group flex items-center gap-16"
        style={{
          animation: `scroll 40s linear infinite`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.animationPlayState = 'paused';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.animationPlayState = 'running';
          setHoveredIndex(undefined);
        }}
      >
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
        {duplicatedLogos.map((logo, index) => {
          const isHovered = hoveredIndex === index;
          const hasAnyHover = hoveredIndex !== null;
          return (
            <div
              key={`${logo.id}-${index}`}
              className="flex-shrink-0"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(undefined)}
            >
              {logo.link ? (
                <Link
                  href={logo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-all duration-300"
                >
                  {logo.logo?.url ? (
                    <Image
                      src={logo.logo.url}
                      alt={logo.name}
                      width={120}
                      height={48}
                      className={`h-8 w-auto transition-all duration-300 ${
                        hasAnyHover
                          ? isHovered
                            ? 'opacity-100 grayscale-0'
                            : 'opacity-30 grayscale'
                          : 'opacity-70 grayscale'
                      }`}
                    />
                  ) : (
                    <span
                      className={`inline-block text-lg font-bold transition-all duration-300 will-change-transform ${
                        hasAnyHover
                          ? isHovered
                            ? 'scale-110 text-white'
                            : 'scale-90 text-white/30'
                          : 'scale-100 text-white/70'
                      }`}
                    >
                      {logo.name}
                    </span>
                  )}
                </Link>
              ) : (
                <div className="transition-all duration-300">
                  {logo.logo?.url ? (
                    <Image
                      src={logo.logo.url}
                      alt={logo.name}
                      width={120}
                      height={48}
                      className={`h-8 w-auto transition-all duration-300 ${
                        hasAnyHover
                          ? isHovered
                            ? 'opacity-100 grayscale-0'
                            : 'opacity-30 grayscale'
                          : 'opacity-70 grayscale'
                      }`}
                    />
                  ) : (
                    <span
                      className={`inline-block text-lg font-bold transition-all duration-300 will-change-transform ${
                        hasAnyHover
                          ? isHovered
                            ? 'scale-110 text-white'
                            : 'scale-90 text-white/30'
                          : 'scale-100 text-white/70'
                      }`}
                    >
                      {logo.name}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
