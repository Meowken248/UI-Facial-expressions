import { motion } from 'framer-motion';
import type { BrowConfig } from '../../types/emotion.types';

const SPRING = { type: 'spring' as const, stiffness: 220, damping: 24, mass: 0.9 };

// All paths share exactly the same structure for smooth morphing:
// M start Q peak-x,peak-y end Q mid-x,mid-y start Z
function getBrowPath(curve: BrowConfig['curve'], side: 'left' | 'right') {
  if (curve === 'angry') {
    return side === 'left'
      ? 'M 25,35 Q 105,72 185,92 Q 105,60 25,35 Z'
      : 'M 25,92 Q 105,72 185,35 Q 105,60 25,92 Z';
  }
  if (curve === 'sad') {
    return side === 'left'
      ? 'M 25,82 Q 100,14 185,52 Q 100,30 25,82 Z'
      : 'M 25,52 Q 110,14 185,82 Q 110,30 25,52 Z';
  }
  if (curve === 'raised') {
    return side === 'left'
      ? 'M 25,50 Q 105,4 185,44 Q 105,22 25,50 Z'
      : 'M 25,44 Q 105,4 185,50 Q 105,22 25,44 Z';
  }
  // soft / default
  return side === 'left'
    ? 'M 25,62 Q 105,14 185,58 Q 105,30 25,62 Z'
    : 'M 25,58 Q 105,14 185,62 Q 105,30 25,58 Z';
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
