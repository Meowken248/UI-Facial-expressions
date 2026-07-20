import { motion } from 'framer-motion';
import type { BrowConfig } from '../../types/emotion.types';

const SPRING = { type: 'spring' as const, stiffness: 220, damping: 24, mass: 0.9 };

// Beautiful calligraphic paths (thick center, tapered ends) matching the template
function getBrowPath(curve: BrowConfig['curve'], side: 'left' | 'right') {
  if (curve === 'angry') {
    return side === 'left'
      ? 'M 25,35 Q 95,50 185,85 Q 95,62 25,35 Z'
      : 'M 25,85 Q 115,50 185,35 Q 115,62 25,85 Z';
  }
  if (curve === 'sad') {
    return side === 'left'
      ? 'M 25,75 Q 90,25 185,35 Q 90,37 25,75 Z'
      : 'M 25,35 Q 120,25 185,75 Q 120,37 25,35 Z';
  }
  if (curve === 'raised') {
    return side === 'left'
      ? 'M 25,55 Q 105,5 185,50 Q 105,17 25,55 Z'
      : 'M 25,50 Q 105,5 185,55 Q 105,17 25,50 Z';
  }
  // soft / default
  return side === 'left'
    ? 'M 25,70 Q 105,20 185,65 Q 105,32 25,70 Z'
    : 'M 25,65 Q 105,20 185,70 Q 105,32 25,65 Z';
}

export function Eyebrow({ config, side }: { config: BrowConfig; side: 'left' | 'right' }) {
  const d = getBrowPath(config.curve, side);

  return (
    <motion.svg
      className="brow"
      viewBox="0 0 210 110"
      aria-hidden="true"
      animate={{
        x: config.translateX ?? 0,
        y: config.translateY ?? 0,
        rotate: config.rotation ?? 0,
      }}
      transition={SPRING}
      style={{ overflow: 'visible', transformBox: 'fill-box', transformOrigin: 'center' }}
    >
      <motion.path
        d={d}
        animate={{ d }}
        transition={SPRING}
      />
    </motion.svg>
  );
}
