/**
 * Animated Gradient Background
 * Subtle, slow-moving mesh gradient for premium hero sections
 * Inspired by Stripe's atmospheric backgrounds
 */

'use client';

import { motion } from 'framer-motion';

export function AnimatedGradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Primary gradient orbs */}
      <motion.div
        className="absolute -top-1/2 -left-1/2 h-full w-full rounded-full bg-gradient-to-br from-[#C9A227]/20 via-transparent to-transparent"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute -right-1/2 -bottom-1/2 h-full w-full rounded-full bg-gradient-to-tl from-[#1a3a5c]/40 via-transparent to-transparent"
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary subtle glow */}
      <motion.div
        className="absolute top-1/3 left-1/3 h-96 w-96 rounded-full bg-[#C9A227]/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Noise texture overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(201,162,39,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,162,39,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}
