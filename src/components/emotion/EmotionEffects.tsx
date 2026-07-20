import type React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { EffectConfig } from '../../types/emotion.types';

const SPRING_POP = { type: 'spring' as const, stiffness: 400, damping: 28, mass: 0.6 };

// ─── SVG icons ─────────────────────────────────────────────────────────────

function HeartSVG({ size = 36 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="#f43f5e"
      style={{ filter: 'drop-shadow(0 2px 6px rgba(244,63,94,0.5))' }}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function SparkleSVG({ size = 32 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="#eab308"
      style={{ filter: 'drop-shadow(0 2px 5px rgba(234,179,8,0.5))' }}>
      <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2Z" />
    </svg>
  );
}

function WarningSVG({ size = 56 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="#ef4444"
      style={{ filter: 'drop-shadow(0 4px 10px rgba(239,68,68,0.45))' }}>
      <path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z" />
    </svg>
  );
}

function AngerSVG({ size = 44 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none"
      stroke="#dc2626" strokeWidth="3" strokeLinecap="round"
      style={{ filter: 'drop-shadow(0 2px 6px rgba(220,38,38,0.4))' }}>
      <path d="M4 12c4.4 0 8-3.6 8-8M12 20c0-4.4 3.6-8 8-8M20 12c-4.4 0-8 3.6-8 8M12 4c0 4.4-3.6 8-8 8" />
    </svg>
  );
}

function HandSVG() {
  return (
    <svg viewBox="0 0 64 64" width={56} height={56} fill="none">
      <path d="M16 44C16 44 12 36 16 28C20 20 28 20 32 28C34 24 38 24 40 28C42 24 46 24 48 28C50 32 50 44 38 48C26 52 16 44 16 44Z"
        fill="#fff8" stroke="#0f172a" strokeWidth="4" strokeLinejoin="round" />
      <path d="M32 28C32 20 36 12 40 12C44 12 44 20 44 28"
        fill="#fff8" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 36C10 36 8 44 14 46" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

// ─── Single teardrop that falls straight down from under the eye ────────────
function TearDrop({ delay = 0, offsetX = 0 }: { delay?: number; offsetX?: number }) {
  return (
    <motion.div
      style={{ position: 'absolute', x: offsetX }}
      initial={{ opacity: 0, y: 0, scaleY: 0.3, scaleX: 0.6 }}
      animate={{
        opacity:  [0, 1,   1,   0.8, 0],
        y:        [0, 10,  28,  52,  72],
        scaleY:   [0.3, 1, 1.1, 0.9, 0.7],
        scaleX:   [0.6, 1, 0.9, 0.85, 0.8],
      }}
      transition={{
        duration: 1.8,
        delay,
        repeat: Infinity,
        repeatDelay: 0.9,
        ease: 'easeIn',
      }}
    >
      <svg viewBox="0 0 28 36" width={20} height={26}
        fill="#38bdf8"
        style={{ filter: 'drop-shadow(0 3px 6px rgba(14,165,233,0.55))' }}>
        {/* Teardrop: round bottom, pointed top */}
        <path d="M14 1 C14 1 2 18 2 25 a12 12 0 0 0 24 0 C26 18 14 1 14 1Z" />
        {/* shine highlight */}
        <ellipse cx="9" cy="22" rx="3" ry="5" fill="#fff" opacity="0.65"
          transform="rotate(-20 9 22)" />
      </svg>
    </motion.div>
  );
}

// ─── Tear stream per eye: 2 drops staggered, positioned just below eye ───────
//   The .effects div covers the full emotion-face area.
//   Eyes are in `top: 22%; height: 38%` → eye bottom ≈ 60% of face.
//   Left eye center  ≈ 27% from left.
//   Right eye center ≈ 73% from left (27% from right).
function TearStream({ side }: { side: 'left' | 'right' }) {
  const baseStyle: React.CSSProperties =
    side === 'left'
      ? { position: 'absolute', left: '23%',  top: '60%' }
      : { position: 'absolute', right: '22%', top: '60%' };

  return (
    <div style={baseStyle}>
      <TearDrop delay={0}    offsetX={-6} />
      <TearDrop delay={0.85} offsetX={6}  />
    </div>
  );
}

// ─── Floating hearts ─────────────────────────────────────────────────────────
function FloatHeart({ n }: { n: number }) {
  const floatX = [-14, 18, -26][n] ?? 0;
  const positions: React.CSSProperties[] = [
    { position: 'absolute', left: '2%',  top: '26%' },
    { position: 'absolute', right: '4%', top: '17%' },
    { position: 'absolute', right: '10%', top: '48%' },
  ];
  return (
    <motion.div
      style={positions[n] ?? positions[0]}
      initial={{ opacity: 0, y: 24, scale: 0.4, rotate: -15 }}
      animate={{ opacity: [0, 1, 1, 0], y: [24, -10, -50, -90], scale: [0.4, 1.1, 1, 0.8], x: floatX }}
      transition={{ duration: 3, delay: n * 0.6, repeat: Infinity, ease: 'easeOut' }}
    >
      <HeartSVG size={32 - n * 4} />
    </motion.div>
  );
}

// ─── Sparkles ─────────────────────────────────────────────────────────────────
function FloatSparkle({ n }: { n: number }) {
  const positions: React.CSSProperties[] = [
    { position: 'absolute', left: '2%',  top: '12%' },
    { position: 'absolute', right: '3%', top: '8%'  },
    { position: 'absolute', left: '10%', top: '55%' },
  ];
  return (
    <motion.div
      style={positions[n] ?? positions[0]}
      animate={{ rotate: [0, 180, 360], scale: [0.6, 1.2, 0.6], opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 2.5, delay: n * 0.7, repeat: Infinity, ease: 'easeInOut' }}
    >
      <SparkleSVG size={28 - n * 4} />
    </motion.div>
  );
}

// ─── Zzz ─────────────────────────────────────────────────────────────────────
function FloatZzz({ n }: { n: number }) {
  const scale = [1, 0.75, 0.55][n] ?? 1;
  const startLeft = [55, 62, 70][n] ?? 55;
  return (
    <motion.div
      style={{ position: 'absolute', left: `${startLeft}%`, top: '15%' }}
      initial={{ opacity: 0, y: 16, scale: scale * 0.5 }}
      animate={{
        opacity: [0, 0.9, 0.8, 0],
        y:       [16, -10, -40, -70],
        x:       [0, 12, 20, 30],
        scale:   [scale * 0.5, scale, scale, scale * 0.8],
      }}
      transition={{ duration: 3.5, delay: n * 0.85, repeat: Infinity, ease: 'easeOut' }}
    >
      <svg viewBox="0 0 24 24" width={28 * scale} height={28 * scale} fill="#3b82f6"
        style={{ filter: 'drop-shadow(0 2px 4px rgba(59,130,246,0.35))' }}>
        <path d="M21 3H10.5v2.25h6L10.5 12h10.5V9.75h-6l6-6.75zM14 13H5v2h5l-5 5.5V23h9v-2h-5l5-5.5V13z" />
      </svg>
    </motion.div>
  );
}

// ─── Warning & Anger ──────────────────────────────────────────────────────────
function PulseWarning() {
  return (
    <motion.div style={{ position: 'absolute', right: '8%', top: '8%' }}
      animate={{ scale: [0.9, 1.12, 0.95, 1.08, 0.9] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}>
      <WarningSVG />
    </motion.div>
  );
}

function PulseAnger() {
  return (
    <motion.div style={{ position: 'absolute', right: '6%', top: '8%' }}
      animate={{ scale: [0.85, 1.1, 0.85], rotate: [-6, 6, -6] }}
      transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
      <AngerSVG />
    </motion.div>
  );
}

// ─── Thinking hand ────────────────────────────────────────────────────────────
function ThinkingHand() {
  return (
    <motion.div
      style={{ position: 'absolute', bottom: '-45px', left: '45%' }}
      animate={{ y: [0, -5, 0], rotate: [0, -4, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
      <HandSVG />
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function EmotionEffects({ effects = [] }: { effects?: EffectConfig[] }) {
  const hearts   = effects.filter(e => e.type === 'heart');
  const sparkles = effects.filter(e => e.type === 'sparkle' || e.type === 'star');
  const zzzes    = effects.filter(e => e.type === 'zzz');
  const tears    = effects.filter(e => e.type === 'tear');
  const warnings = effects.filter(e => e.type === 'warning');
  const angers   = effects.filter(e => e.type === 'anger');
  const hands    = effects.filter(e => e.type === 'thinking-hand');

  return (
    <div className="effects" aria-hidden="true">
      <AnimatePresence>
        {/* Hearts */}
        {hearts.length > 0 && [0, 1, 2].map(n => (
          <FloatHeart key={`heart-${n}`} n={n} />
        ))}

        {/* Sparkles */}
        {sparkles.length > 0 && [0, 1, 2].map(n => (
          <FloatSparkle key={`sparkle-${n}`} n={n} />
        ))}

        {/* Zzz */}
        {zzzes.length > 0 && [0, 1, 2].map(n => (
          <FloatZzz key={`zzz-${n}`} n={n} />
        ))}

        {/* Tears — one stream per side, falling straight from under each eye */}
        {tears.map((t, i) => (
          <motion.div
            key={`tear-${i}-${t.position}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={SPRING_POP}
          >
            <TearStream side={(t.position === 'right' ? 'right' : 'left')} />
          </motion.div>
        ))}

        {/* Warning */}
        {warnings.map((_, i) => <PulseWarning key={`warn-${i}`} />)}

        {/* Anger */}
        {angers.map((_, i) => <PulseAnger key={`anger-${i}`} />)}

        {/* Thinking hand */}
        {hands.map((_, i) => <ThinkingHand key={`hand-${i}`} />)}
      </AnimatePresence>
    </div>
  );
}
