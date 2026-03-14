/**
 * HeroSystemVisualization Component
 * Living Text System - Distributed network forming brand identity
 * Digital infrastructure organizing into 'Digital Aksumite'
 * Architectural, intelligent, calm, timeless
 */

'use client';

import { motion, useAnimation, useInView, type Variants } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface Node {
  id: number;
  initialX: number;
  initialY: number;
  targetX: number;
  targetY: number;
  delay: number;
}

interface Connection {
  from: number;
  to: number;
}

// Distributed network starting positions (scattered)
const nodes: Node[] = [
  // Apex - narrow top
  { id: 1, initialX: 20, initialY: 20, targetX: 50, targetY: 5, delay: 0 },

  // Upper crown - first false window tier
  { id: 2, initialX: 85, initialY: 15, targetX: 42, targetY: 15, delay: 0.08 },
  { id: 3, initialX: 15, initialY: 85, targetX: 58, targetY: 15, delay: 0.16 },

  // Second tier
  { id: 4, initialX: 75, initialY: 75, targetX: 40, targetY: 25, delay: 0.24 },
  { id: 5, initialX: 40, initialY: 10, targetX: 60, targetY: 25, delay: 0.32 },

  // Third tier
  { id: 6, initialX: 60, initialY: 90, targetX: 38, targetY: 35, delay: 0.4 },
  { id: 7, initialX: 90, initialY: 35, targetX: 62, targetY: 35, delay: 0.48 },

  // Fourth tier
  { id: 8, initialX: 50, initialY: 50, targetX: 36, targetY: 45, delay: 0.56 },
  { id: 9, initialX: 25, initialY: 60, targetX: 64, targetY: 45, delay: 0.64 },

  // Fifth tier - wider body
  { id: 10, initialX: 80, initialY: 80, targetX: 34, targetY: 55, delay: 0.72 },
  { id: 11, initialX: 10, initialY: 40, targetX: 66, targetY: 55, delay: 0.8 },

  // Lower section - connects directly to base
  { id: 12, initialX: 55, initialY: 95, targetX: 30, targetY: 70, delay: 0.88 },
  { id: 13, initialX: 45, initialY: 5, targetX: 70, targetY: 70, delay: 0.96 },

  // Wide base - left and right corners
  { id: 14, initialX: 25, initialY: 92, targetX: 18, targetY: 88, delay: 1.04 },
  { id: 15, initialX: 75, initialY: 88, targetX: 82, targetY: 88, delay: 1.12 },

  // Base center
  { id: 16, initialX: 50, initialY: 95, targetX: 50, targetY: 92, delay: 1.2 },
];

// Connections tracing the authentic obelisk with horizontal tiers
const connections: Connection[] = [
  // Main frame - left side
  { from: 1, to: 2 },
  { from: 2, to: 4 },
  { from: 4, to: 6 },
  { from: 6, to: 8 },
  { from: 8, to: 10 },
  { from: 10, to: 12 },
  { from: 12, to: 14 },
  { from: 14, to: 16 },

  // Main frame - right side
  { from: 1, to: 3 },
  { from: 3, to: 5 },
  { from: 5, to: 7 },
  { from: 7, to: 9 },
  { from: 9, to: 11 },
  { from: 11, to: 13 },
  { from: 13, to: 15 },
  { from: 15, to: 16 },

  // Horizontal tier connections
  { from: 2, to: 3 },
  { from: 4, to: 5 },
  { from: 6, to: 7 },
  { from: 8, to: 9 },
  { from: 10, to: 11 },
  { from: 12, to: 13 },

  // Base connections
  { from: 14, to: 15 },
  { from: 14, to: 16 },
  { from: 15, to: 16 },
];

export function HeroSystemVisualization() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });
  const [phase, setPhase] = useState<'distributed' | 'forming' | 'formed'>('distributed');
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      // Reset and replay animation when coming into view
      const playSequence = async () => {
        setPhase('distributed');
        await controls.set('distributed');
        await new Promise((resolve) => setTimeout(resolve, 500));
        setPhase('forming');
        await controls.start('text');
        setPhase('formed');
      };
      playSequence();
    }
  }, [isInView, controls]);

  const nodeVariants: Variants = {
    distributed: (node: Node) => ({
      cx: `${node.initialX}%`,
      cy: `${node.initialY}%`,
      opacity: 0.8,
      scale: 1,
    }),
    text: (node: Node) => ({
      cx: `${node.targetX}%`,
      cy: `${node.targetY}%`,
      opacity: 1,
      scale: 1.1,
      transition: {
        duration: 2.5,
        ease: 'easeInOut',
        delay: node.delay,
      },
    }),
  };

  return (
    <div
      ref={containerRef}
      className="relative hidden h-[400px] w-full max-w-[420px] items-center justify-center lg:flex"
    >
      {/* Enhanced radial gradient background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse 80% 100% at 50% 40%, rgba(201,162,39,0.1), transparent 50%),
            radial-gradient(circle at 50% 80%, rgba(201,162,39,0.05), transparent 40%)
          `,
        }}
      />

      <motion.svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        {/* Connection lines */}
        {connections.map((conn, index) => {
          const fromNode = nodes.find((n) => n.id === conn.from);
          const toNode = nodes.find((n) => n.id === conn.to);
          if (!fromNode || !toNode) return undefined;

          return (
            <ConnectionLine
              key={`conn-${index}`}
              fromNode={fromNode}
              toNode={toNode}
              phase={phase}
              index={index}
            />
          );
        })}

        {/* Nodes with enhanced glow */}
        {nodes.map((node) => (
          <g key={`node-${node.id}`}>
            {/* Outer aura - soft glow */}
            <motion.circle
              custom={node}
              variants={nodeVariants}
              initial="distributed"
              animate={controls}
              r="5"
              fill="none"
              stroke="#C9A227"
              strokeWidth="0.3"
              style={{
                opacity: phase === 'formed' ? 0.1 : 0.06,
              }}
            />

            {/* Middle ring - pulse */}
            <motion.circle
              custom={node}
              variants={nodeVariants}
              initial="distributed"
              animate={controls}
              r="3"
              fill="none"
              stroke="#C9A227"
              strokeWidth="0.4"
              style={{
                opacity: phase === 'formed' ? 0.2 : 0.12,
              }}
            />

            {/* Core node - solid */}
            <motion.circle
              custom={node}
              variants={nodeVariants}
              initial="distributed"
              animate={controls}
              r="2"
              fill="#C9A227"
              style={{
                filter: 'drop-shadow(0 0 5px rgba(201,162,39,0.6))',
              }}
            />
          </g>
        ))}

        {/* False window detail lines - subtle decorative elements */}
        {phase === 'formed' && (
          <>
            {/* Single subtle horizontal accent at mid body */}
            <motion.line
              x1="36%"
              y1="45%"
              x2="64%"
              y2="45%"
              stroke="rgba(201,162,39,0.06)"
              strokeWidth="0.3"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.06, 0.1, 0.06] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </>
        )}

        {/* Text label that appears after formation */}
        <motion.text
          x="50"
          y="98"
          textAnchor="middle"
          fill="#C9A227"
          fontSize="5"
          fontFamily="system-ui, sans-serif"
          fontWeight="500"
          letterSpacing="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'formed' ? 0.7 : 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          style={{
            filter: 'drop-shadow(0 0 3px rgba(201,162,39,0.4))',
          }}
        >
          DIGITAL AKSUMITE
        </motion.text>
      </motion.svg>

      {/* Slow floating motion */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          y: [0, -4, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

function ConnectionLine({
  fromNode,
  toNode,
  phase,
  index,
}: {
  fromNode: Node;
  toNode: Node;
  phase: 'distributed' | 'forming' | 'formed';
  index: number;
}) {
  const [currentFrom, setCurrentFrom] = useState({ x: fromNode.initialX, y: fromNode.initialY });
  const [currentTo, setCurrentTo] = useState({ x: toNode.initialX, y: toNode.initialY });

  useEffect(() => {
    if (phase === 'forming' || phase === 'formed') {
      const duration = 2500;
      const delay = Math.max(fromNode.delay, toNode.delay) * 1000;

      const startTime = Date.now() + delay;

      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const eased =
          progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        setCurrentFrom({
          x: fromNode.initialX + (fromNode.targetX - fromNode.initialX) * eased,
          y: fromNode.initialY + (fromNode.targetY - fromNode.initialY) * eased,
        });

        setCurrentTo({
          x: toNode.initialX + (toNode.targetX - toNode.initialX) * eased,
          y: toNode.initialY + (toNode.targetY - toNode.initialY) * eased,
        });

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      const timeout = setTimeout(() => {
        requestAnimationFrame(animate);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [phase, fromNode, toNode]);

  return (
    <motion.line
      x1={`${currentFrom.x}%`}
      y1={`${currentFrom.y}%`}
      x2={`${currentTo.x}%`}
      y2={`${currentTo.y}%`}
      stroke="rgba(201,162,39,0.25)"
      strokeWidth="0.8"
      strokeLinecap="round"
      initial={{ opacity: 0 }}
      animate={{
        opacity: phase === 'formed' ? [0.25, 0.4, 0.25] : 0.3,
      }}
      transition={{
        opacity: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 },
      }}
    />
  );
}
