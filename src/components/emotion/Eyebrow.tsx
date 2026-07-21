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
  // Soft brow: a shallow, asymmetric arc. Its rounded head faces the centre,
  // then it tapers into a small outer tail, as in the reference image.
  return side === 'left'
    ? 'M 30,94 C 72,60 121,39 169,51 C 179,54 183,62 178,70 C 174,76 167,76 161,70 C 123,58 83,76 38,101 C 31,104 26,99 30,94 Z'
    : 'M 180,94 C 138,60 89,39 41,51 C 31,54 27,62 32,70 C 36,76 43,76 49,70 C 87,58 127,76 172,101 C 179,104 184,99 180,94 Z';
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
        scale: 0.95,
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