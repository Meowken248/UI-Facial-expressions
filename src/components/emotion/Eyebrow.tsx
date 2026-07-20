import { motion } from 'framer-motion';
import type { BrowConfig } from '../../types/emotion.types';

const SPRING = { type: 'spring' as const, stiffness: 220, damping: 24, mass: 0.9 };

// Soft brows use a filled tapered silhouette: a full rounded inner head and a fine outer tail.
function getBrowPath(curve: BrowConfig['curve'], side: 'left' | 'right') {
  if (curve === 'angry') {
    return side === 'left' ? 'M 65,42 Q 105,52 145,72' : 'M 65,72 Q 105,52 145,42';
  }
  if (curve === 'sad') {
    return side === 'left' ? 'M 65,70 Q 96,26 145,42' : 'M 65,42 Q 114,26 145,70';
  }
  if (curve === 'raised') {
    return side === 'left' ? 'M 65,58 Q 105,10 145,54' : 'M 65,54 Q 105,10 145,58';
  }
  // Soft brow: full, rounded head on the inner edge, tapering to a fine outer tail.
  return side === 'left'
    ? 'M 42,92 C 78,52 126,35 165,49 C 174,52 177,60 172,68 C 136,53 88,71 45,100 C 39,101 37,96 42,92 Z'
    : 'M 43,50 C 80,28 125,38 166,84 C 172,90 170,95 164,96 C 125,65 87,57 53,70 C 45,74 35,61 43,50 Z';
}

export function Eyebrow({ config, side }: { config: BrowConfig; side: 'left' | 'right' }) {
  const d = getBrowPath(config.curve, side);
  const isTapered = !config.curve || config.curve === 'soft';
  const color = side === 'left' ? '#058cff' : '#8b5cf6';

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
          fill: isTapered ? color : 'none',
          stroke: isTapered ? 'none' : color,
          strokeWidth: isTapered ? 0 : 14,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }}
      />
    </motion.svg>
  );
}