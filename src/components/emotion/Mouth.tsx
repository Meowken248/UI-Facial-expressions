import { AnimatePresence, motion } from 'framer-motion';
import type { MouthConfig } from '../../types/emotion.types';

const SPRING = { type: 'spring' as const, stiffness: 260, damping: 22, mass: 0.8 };

const paths: Record<MouthConfig['shape'], string> = {
  // 1. smile (happy open mouth, filled) - VUI VẺ, NHÁY MẮT
  // 1. smile (happy open mouth, filled) - VUI VẺ, NHÁY MẮT
  smile: 'M48 55 C48 48 65 52 82 55 C96 58 124 58 138 55 C155 52 172 48 172 55 C172 95 152 149 110 151 C68 149 48 95 48 55 Z',

  // 2. small-smile (closed smile line) - TỰ HÀO, HÀI LÒNG, THƯ GIÃN
  'small-smile': 'M65 85 Q110 115 155 85',

  // Hài lòng: nụ cười khép kín rộng và mềm hơn
  'wide-smile': 'M42 80 Q110 128 178 80',

  // 3. open (excited open mouth) - HÁO HỨC, CẢNH BÁO
  open: 'M85 85 C85 62 135 62 135 85 C135 110 85 110 85 85 Z',

  // 4. o (surprised vertical oval) - NGẠC NHIÊN, TÒ MÒ
  o: 'M88 90 C88 65 132 65 132 90 C132 118 88 118 88 90 Z',

  // 5. sad - BUỒN, THẤT VỌNG
  sad: 'M65 112 Q110 76 155 112',

  // 6. frown - TỨC GIẬN, SUY TƯ
  frown: 'M70 108 Q110 82 150 108',

  // 7. tongue (open mouth with tongue sticking down) - TINH NGHỊCH
  tongue: 'M68 74 Q110 91 152 74 Q145 104 110 105 Q75 104 68 74 Z',

  // 8. wave (cute cat "3" shape) - DỄ THƯƠNG
  wave: 'M60 85 Q85 110 110 85 Q135 110 160 85',

  // 9. sleep (asymmetric breathing oval) - NGỦ GẬT
  sleep: 'M94 92 C94 80 126 80 126 92 C126 104 94 104 94 92 Z',

  // 10. laugh (wide open mouth) - CƯỜI LỚN, YÊU THƯƠNG
  laugh: 'M58 56 Q110 74 162 56 C160 119 142 153 110 156 C78 153 60 119 58 56 Z',

  // 11. squiggly (wavy trembling line) - BỐI RỐI, LO LẮNG
  squiggly: 'M60 95 Q80 112 100 95 Q120 78 140 95 Q160 112 180 95',
};

const FILLED = new Set(['smile', 'open', 'o', 'tongue', 'laugh', 'sleep']);

export function Mouth({ config }: { config: MouthConfig }) {
  const shape = config.shape;
  const d = paths[shape];
  const isFilled = FILLED.has(shape);

  // Unique clip ID for this specific mouth shape
  const clipId = `mouth-clip-${shape}`;

  return (
    <svg className="mouth" viewBox="0 0 220 180" aria-hidden="true" style={{ overflow: 'visible', transform: `translateY(${config.translateY ?? 0}%) scaleX(${config.scaleX ?? 1})` }}>
      <defs>
        <clipPath id={clipId}>
          <path d={d} />
        </clipPath>
      </defs>

      <AnimatePresence mode="popLayout">
        <motion.g
          key={shape}
          initial={{ opacity: 0, scale: 0.45, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.45, y: 6 }}
          transition={SPRING}
          style={{ transformOrigin: '110px 100px', transformBox: 'fill-box' }}
        >
          {/* Main mouth background shell */}
          <path d={d} className={isFilled ? 'mouth-fill' : 'mouth-line'} />

          {/* Render tongue based on shape */}
          {shape === 'smile' && (
            <g clipPath={`url(#${clipId})`}>
              <ellipse cx="110" cy="126" rx="42" ry="26" className="mouth-tongue" />
            </g>
          )}

          {shape === 'laugh' && (
            <g clipPath={`url(#${clipId})`}>
              <circle cx="110" cy="132" r="38" className="mouth-tongue" />
            </g>
          )}

          {(shape === 'open' || shape === 'o' || shape === 'sleep') && (
            <g clipPath={`url(#${clipId})`}>
              <ellipse
                cx="110"
                cy={shape === 'sleep' ? 100 : 105}
                rx={shape === 'sleep' ? 14 : 17}
                ry={shape === 'sleep' ? 8 : 12}
                className="mouth-tongue"
              />
            </g>
          )}
          {shape === 'tongue' && (
            // Hanging outside tongue: overlaps top curve to avoid seams, extends downward
            <g>
              <path
                d="M86 82 Q110 90 134 82 L132 127 A22 22 0 0 1 88 127 Z"
                className="mouth-tongue"
                stroke="#0f172a"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <path d="M110 104 L110 128" stroke="#d95b78" strokeWidth="3" strokeLinecap="round" opacity="0.72" />
            </g>
          )}
        </motion.g>
      </AnimatePresence>
    </svg>
  );
}
