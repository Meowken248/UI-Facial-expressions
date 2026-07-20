import { motion } from 'framer-motion';
import type { BrowConfig } from '../../types/emotion.types';

const SPRING = { type: 'spring' as const, stiffness: 220, damping: 24, mass: 0.9 };

// Rounded single-stroke brows match the soft capsule ends in the reference.
function getBrowPath(curve: BrowConfig['curve'], side: 'left' | 'right') {
  if (curve === 'angry') {
    return side === 'left' ? 'M 25,38 Q 105,52 185,84' : 'M 25,84 Q 105,52 185,38';
  }
  if (curve === 'sad') {
    return side === 'left' ? 'M 25,74 Q 95,22 185,38' : 'M 25,38 Q 115,22 185,74';
  }
  if (curve === 'raised') {
    return side === 'left' ? 'M 25,58 Q 105,8 185,52' : 'M 25,52 Q 105,8 185,58';
  }
  return side === 'left' ? 'M 25,69 Q 105,22 185,64' : 'M 25,64 Q 105,22 185,69';
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
          strokeWidth: 15,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }}
      />
    </motion.svg>
  );
}
