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

// Simplified obelisk nodes - 7 key points instead of 16
const nodes: Node[] = [
  // Apex
  { id: 1, initialX: 35, initialY: 15, targetX: 50, targetY: 8, delay: 0 },

  // Upper crown
  { id: 2, initialX: 70, initialY: 25, targetX: 40, targetY: 20, delay: 0.3 },
  { id: 3, initialX: 20, initialY: 30, targetX: 60, targetY: 20, delay: 0.6 },

  // Mid body
  { id: 4, initialX: 75, initialY: 45, targetX: 38, targetY: 40, delay: 0.9 },
  { id: 5, initialX: 15, initialY: 50, targetX: 62, targetY: 40, delay: 1.2 },

  // Lower section
  { id: 6, initialX: 65, initialY: 70, targetX: 35, targetY: 65, delay: 1.5 },
  { id: 7, initialX: 25, initialY: 75, targetX: 65, targetY: 65, delay: 1.8 },
];

// Minimal connections - just the frame
const connections: Connection[] = [
  // Left side
  { from: 1, to: 2 },
  { from: 2, to: 4 },
  { from: 4, to: 6 },

  // Right side
  { from: 1, to: 3 },
  { from: 3, to: 5 },
  { from: 5, to: 7 },

  // Cross connections (minimal)
  { from: 2, to: 3 },
  { from: 4, to: 5 },
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
      opacity: 0.6,
      scale: 1,
    }),
    text: (node: Node) => ({
      cx: `${node.targetX}%`,
      cy: `${node.targetY}%`,
      opacity: 1,
      scale: 1.1,
      transition: {
        duration: 4.5,
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
      {/* Enhanced radial gradient background - more subtle */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse 80% 100% at 50% 40%, rgba(201,162,39,0.06), transparent 50%),
            radial-gradient(circle at 50% 80%, rgba(201,162,39,0.03), transparent 40%)
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
            {/* Outer aura - soft glow - more subtle */}
            <motion.circle
              custom={node}
              variants={nodeVariants}
              initial="distributed"
              animate={controls}
              r="4"
              fill="none"
              stroke="#C9A227"
              strokeWidth="0.2"
              style={{
                opacity: phase === 'formed' ? 0.08 : 0.04,
              }}
            />

            {/* Middle ring - pulse - more subtle */}
            <motion.circle
              custom={node}
              variants={nodeVariants}
              initial="distributed"
              animate={controls}
              r="2.5"
              fill="none"
              stroke="#C9A227"
              strokeWidth="0.3"
              style={{
                opacity: phase === 'formed' ? 0.15 : 0.08,
              }}
            />

            {/* Core node - solid - smaller */}
            <motion.circle
              custom={node}
              variants={nodeVariants}
              initial="distributed"
              animate={controls}
              r="1.5"
              fill="#C9A227"
              style={{
                filter: 'drop-shadow(0 0 3px rgba(201,162,39,0.4))',
              }}
            />
          </g>
        ))}

        {/* Text label - smaller, more subtle */}
        <motion.text
          x="50"
          y="85"
          textAnchor="middle"
          fill="#C9A227"
          fontSize="4"
          fontFamily="system-ui, sans-serif"
          fontWeight="500"
          letterSpacing="1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'formed' ? 0.85 : 0 }}
          transition={{ duration: 2, delay: 0.5 }}
          style={{
            filter: 'drop-shadow(0 0 2px rgba(201,162,39,0.3))',
          }}
        >
          DIGITAL AKSUMITE
        </motion.text>
      </motion.svg>

      {/* Slow floating motion - reduced */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          y: [0, -2, 0],
        }}
        transition={{
          duration: 20,
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
      const duration = 4500;
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
      stroke="rgba(201,162,39,0.35)"
      strokeWidth="0.5"
      strokeLinecap="round"
      initial={{ opacity: 0 }}
      animate={{
        opacity: phase === 'formed' ? [0.35, 0.5, 0.35] : 0.3,
      }}
      transition={{
        opacity: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 },
      }}
    />
  );
}
