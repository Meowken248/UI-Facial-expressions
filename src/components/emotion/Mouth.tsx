import { AnimatePresence, motion } from 'framer-motion';
import type { MouthConfig } from '../../types/emotion.types';

const SPRING = { type: 'spring' as const, stiffness: 260, damping: 22, mass: 0.8 };

const paths: Record<MouthConfig['shape'], string> = {
  smile:         'M35 55 Q110 125 185 55',
  'small-smile': 'M55 65 Q110 108 165 65',
  open:          'M70 62 Q110 36 150 62 Q146 130 110 132 Q74 130 70 62Z',
  o:             'M80 78 Q110 40 140 78 Q141 132 110 137 Q79 132 80 78Z',
  sad:           'M42 115 Q110 44 178 115',
  frown:         'M42 112 Q110 42 178 112',
  tongue:        'M42 52 Q110 105 178 52 Q170 145 110 150 Q50 145 42 52Z',
  wave:          'M48 75 Q78 120 110 75 Q142 120 172 75',
  sleep:         'M88 83 Q110 64 132 83 Q130 114 110 116 Q90 114 88 83Z',
  laugh:         'M35 50 Q110 100 185 50 Q175 152 110 157 Q45 152 35 50Z',
};

const tonguePaths: Partial<Record<MouthConfig['shape'], string>> = {
  open:   'M80 100 Q110 75 140 100 Q135 125 110 128 Q85 125 80 100 Z',
  tongue: 'M73 124 Q110 85 147 124 Q136 147 110 149 Q84 147 73 124 Z',
  laugh:  'M65 118 Q110 75 155 118 Q142 150 110 153 Q78 150 65 118 Z',
};

const FILLED = new Set(['open', 'o', 'tongue', 'laugh', 'sleep']);

export function Mouth({ config }: { config: MouthConfig }) {
  const shape = config.shape;
  const d = paths[shape];
  const isFilled = FILLED.has(shape);
  const tongue = tonguePaths[shape];

  return (
    <svg className="mouth" viewBox="0 0 220 180" aria-hidden="true">
      <AnimatePresence mode="popLayout">
        <motion.g
          key={shape}
          initial={{ opacity: 0, scale: 0.45, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.45, y: 6 }}
          transition={SPRING}
          style={{ transformOrigin: '110px 100px', transformBox: 'fill-box' }}
        >
          <path d={d} className={isFilled ? 'mouth-fill' : 'mouth-line'} />
          {tongue && <path d={tongue} className="mouth-tongue" />}
        </motion.g>
      </AnimatePresence>
    </svg>
  );
}
