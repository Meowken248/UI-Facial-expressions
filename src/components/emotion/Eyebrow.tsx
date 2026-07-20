import { motion } from 'framer-motion';
import type { BrowConfig } from '../../types/emotion.types';

const SPRING = { type: 'spring' as const, stiffness: 220, damping: 24, mass: 0.9 };

// Rounded single-stroke brows match the soft capsule ends in the reference.
function getBrowPath(curve: BrowConfig['curve'], side: 'left' | 'right') {
  if (curve === 'angry') {
    return side === 'left' ? 'M 60,43 Q 105,52 150,73' : 'M 60,73 Q 105,52 150,43';
  }
  if (curve === 'sad') {
    return side === 'left' ? 'M 60,68 Q 96,31 150,43' : 'M 60,43 Q 114,31 150,68';
  }
  if (curve === 'raised') {
    return side === 'left' ? 'M 60,58 Q 105,22 150,54' : 'M 60,54 Q 105,22 150,58';
  }
  return side === 'left' ? 'M 60,65 Q 105,38 150,62' : 'M 60,62 Q 105,38 150,65';
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
        style={{
          fill: 'none',
          stroke: side === 'left' ? '#078bea' : '#8254df',
          strokeWidth: 12,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }}
      />
    </motion.svg>
  );
}
