import type { BrowConfig } from '../../types/emotion.types';

export function Eyebrow({ config, side }: { config: BrowConfig; side: 'left' | 'right' }) {
  const curve = config.curve ?? 'soft';

  // Build beautiful calligraphic/filled thick-to-thin eyebrow shapes
  let d = '';
  if (curve === 'angry') {
    d = side === 'left'
      ? 'M 25,35 Q 105,75 185,92 Q 105,68 25,35 Z'
      : 'M 25,92 Q 105,75 185,35 Q 105,68 25,92 Z';
  } else if (curve === 'sad') {
    d = side === 'left'
      ? 'M 25,86 Q 100,10 185,55 Q 100,28 25,86 Z'
      : 'M 25,55 Q 110,10 185,86 Q 110,28 25,55 Z';
  } else if (curve === 'raised') {
    d = side === 'left'
      ? 'M 25,52 Q 105,2 185,46 Q 105,20 25,52 Z'
      : 'M 25,46 Q 105,2 185,52 Q 105,20 25,46 Z';
  } else {
    // soft / default
    d = side === 'left'
      ? 'M 25,65 Q 105,12 185,60 Q 105,28 25,65 Z'
      : 'M 25,60 Q 105,12 185,65 Q 105,28 25,60 Z';
  }

  const style = {
    transform: `translate(${config.translateX ?? 0}px, ${config.translateY ?? 0}px) rotate(${config.rotation ?? 0}deg)`,
  };

  return (
    <svg className="brow" style={style} viewBox="0 0 210 110" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}
