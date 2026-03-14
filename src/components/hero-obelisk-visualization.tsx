/**
 * HeroObeliskVisualization Component
 * Calm, architectural, timeless system symbol
 * Ancient engineering quietly powering modern digital systems
 */

'use client';

import { motion } from 'framer-motion';

export function HeroObeliskVisualization() {
  return (
    <div className="relative hidden max-h-[520px] w-full max-w-lg lg:block xl:max-w-xl">
      {/* Stronger gold glow behind obelisk */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.35] blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse 80% 100% at center, rgba(201,162,39,0.5), transparent 70%)',
        }}
      />

      {/* Secondary ambient glow */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.20] blur-2xl"
        style={{
          background: 'radial-gradient(circle at 50% 60%, rgba(201,162,39,0.4), transparent 60%)',
        }}
      />

      {/* Subtle grid texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,162,39,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,162,39,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      <div
        className="absolute inset-0 -z-10 opacity-[0.12] blur-3xl"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(201,162,39,0.12), transparent 70%)',
        }}
      />

      <motion.svg
        viewBox="0 0 240 480"
        className="h-full max-h-[520px] w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        {/* Main obelisk structure */}
        <motion.g
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          {/* Obelisk body - with animated marble shimmer gradient */}
          <motion.path
            d="M80,460 L88,140 L92,80 L96,50 L100,35 L110,28 L120,24 L130,28 L140,35 L144,50 L148,80 L152,140 L160,460 Z"
            fill="url(#obeliskGradientAnimated)"
            stroke="#C9A227"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, ease: 'easeOut' }}
          />

          {/* Top crown detail - bolder */}
          <motion.path
            d="M100,35 L120,24 L140,35"
            fill="none"
            stroke="#C9A227"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />

          {/* False door outer frame - with inner glow animation */}
          <motion.rect
            x="102"
            y="90"
            width="36"
            height="160"
            rx="3"
            fill="none"
            stroke="rgba(201,162,39,0.8)"
            strokeWidth="2.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          />
          <motion.rect
            x="102"
            y="90"
            width="36"
            height="160"
            rx="3"
            fill="none"
            stroke="url(#falseDoorGlow)"
            strokeWidth="3"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />

          {/* False door inner frame */}
          <motion.rect
            x="108"
            y="96"
            width="24"
            height="148"
            rx="2"
            fill="none"
            stroke="rgba(201,162,39,0.4)"
            strokeWidth="1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          />

          {/* False door cross bars */}
          <line x1="108" y1="140" x2="132" y2="140" stroke="rgba(201,162,39,0.5)" strokeWidth="1" />
          <line x1="108" y1="180" x2="132" y2="180" stroke="rgba(201,162,39,0.5)" strokeWidth="1" />
          <line x1="108" y1="220" x2="132" y2="220" stroke="rgba(201,162,39,0.5)" strokeWidth="1" />

          {/* Side decorative columns */}
          <rect x="92" y="100" width="4" height="140" fill="rgba(201,162,39,0.15)" rx="1" />
          <rect x="144" y="100" width="4" height="140" fill="rgba(201,162,39,0.15)" rx="1" />

          {/* Horizontal decorative bands */}
          <line
            x1="88"
            y1="140"
            x2="152"
            y2="140"
            stroke="rgba(201,162,39,0.3)"
            strokeWidth="0.5"
          />
          <line
            x1="88"
            y1="240"
            x2="152"
            y2="240"
            stroke="rgba(201,162,39,0.3)"
            strokeWidth="0.5"
          />
          <line
            x1="88"
            y1="340"
            x2="152"
            y2="340"
            stroke="rgba(201,162,39,0.3)"
            strokeWidth="0.5"
          />

          {/* Base platform */}
          <motion.g>
            <motion.rect
              x="60"
              y="450"
              width="120"
              height="20"
              rx="3"
              fill="url(#baseGradient)"
              stroke="#C9A227"
              strokeWidth="1"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{ transformOrigin: '120px 460px' }}
            />
            <motion.rect
              x="70"
              y="430"
              width="100"
              height="20"
              rx="2"
              fill="url(#baseGradient2)"
              stroke="#C9A227"
              strokeWidth="0.8"
              strokeOpacity="0.8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              style={{ transformOrigin: '120px 440px' }}
            />
          </motion.g>

          {/* System nodes - calm, restrained energy */}
          <g>
            {/* Top node */}
            <motion.circle
              cx="120"
              cy="60"
              r="3"
              fill="#C9A227"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.85, 0.6] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
            />

            {/* Side nodes - staggered timing */}
            <motion.circle
              cx="60"
              cy="200"
              r="3"
              fill="#C9A227"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.85, 0.6] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            />
            <motion.circle
              cx="180"
              cy="180"
              r="2.5"
              fill="#C9A227"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.85, 0.6] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
            />
            <motion.circle
              cx="55"
              cy="320"
              r="2.5"
              fill="#C9A227"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.85, 0.6] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 2.4 }}
            />
            <motion.circle
              cx="185"
              cy="300"
              r="2.5"
              fill="#C9A227"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.85, 0.6] }}
              transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut', delay: 3.2 }}
            />
            <motion.circle
              cx="120"
              cy="400"
              r="2"
              fill="#C9A227"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.85, 0.6] }}
              transition={{ duration: 5.3, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
            />
          </g>

          {/* Connection lines - gentle opacity animation */}
          <motion.line
            x1="55"
            y1="200"
            x2="92"
            y2="200"
            stroke="rgba(201,162,39,0.3)"
            strokeWidth="0.8"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.line
            x1="180"
            y1="180"
            x2="148"
            y2="180"
            stroke="rgba(201,162,39,0.3)"
            strokeWidth="0.8"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
          <motion.line
            x1="50"
            y1="320"
            x2="90"
            y2="320"
            stroke="rgba(201,162,39,0.3)"
            strokeWidth="0.8"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          <motion.line
            x1="185"
            y1="300"
            x2="150"
            y2="300"
            stroke="rgba(201,162,39,0.3)"
            strokeWidth="0.8"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          />
          <motion.line
            x1="120"
            y1="64"
            x2="120"
            y2="90"
            stroke="rgba(201,162,39,0.4)"
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          />

          {/* Gradients with animated marble shimmer */}
          <defs>
            <linearGradient id="obeliskGradientAnimated" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(201,162,39,0.15)">
                <animate
                  attributeName="stopColor"
                  values="rgba(201,162,39,0.15);rgba(201,162,39,0.22);rgba(201,162,39,0.15)"
                  dur="18s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="30%" stopColor="rgba(201,162,39,0.25)">
                <animate
                  attributeName="stopColor"
                  values="rgba(201,162,39,0.25);rgba(201,162,39,0.35);rgba(201,162,39,0.25)"
                  dur="18s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="50%" stopColor="rgba(201,162,39,0.35)">
                <animate
                  attributeName="stopColor"
                  values="rgba(201,162,39,0.35);rgba(201,162,39,0.42);rgba(201,162,39,0.35)"
                  dur="18s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="70%" stopColor="rgba(201,162,39,0.25)">
                <animate
                  attributeName="stopColor"
                  values="rgba(201,162,39,0.25);rgba(201,162,39,0.35);rgba(201,162,39,0.25)"
                  dur="18s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="rgba(201,162,39,0.15)">
                <animate
                  attributeName="stopColor"
                  values="rgba(201,162,39,0.15);rgba(201,162,39,0.22);rgba(201,162,39,0.15)"
                  dur="18s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
            <linearGradient id="falseDoorGlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(201,162,39,0.6)" />
              <stop offset="50%" stopColor="rgba(255,215,100,0.8)" />
              <stop offset="100%" stopColor="rgba(201,162,39,0.6)" />
            </linearGradient>
            <linearGradient id="baseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(201,162,39,0.4)" />
              <stop offset="50%" stopColor="rgba(201,162,39,0.6)" />
              <stop offset="100%" stopColor="rgba(201,162,39,0.4)" />
            </linearGradient>
            <linearGradient id="baseGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(201,162,39,0.3)" />
              <stop offset="50%" stopColor="rgba(201,162,39,0.5)" />
              <stop offset="100%" stopColor="rgba(201,162,39,0.3)" />
            </linearGradient>
          </defs>
        </motion.g>
      </motion.svg>

      {/* Slow floating animation for entire structure */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
