import { memo, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { EyeConfig } from '../../types/emotion.types';

interface Props {
  config: EyeConfig;
  side: 'left' | 'right';
  blinking: boolean;
}

// Spring configs
const SPRING_IRIS = { type: 'spring' as const, stiffness: 280, damping: 22, mass: 0.8 };
const SPRING_BLINK = { type: 'spring' as const, stiffness: 500, damping: 35, mass: 0.5 };
const SPRING_GAZE  = { type: 'spring' as const, stiffness: 180, damping: 18, mass: 1.0 };

export const Eye = memo(function Eye({ config, side, blinking }: Props) {
  const id = useId().replace(/:/g, '');
  const shape = blinking ? 'closed' : config.shape;
  const tx = config.lookX ?? 0;
  const ty = config.lookY ?? 0;

  const isClosedShape = shape === 'closed' || shape === 'wink';
  const isHeart   = shape === 'heart';
  const isStar    = shape === 'star';
  const isSpiral  = shape === 'spiral';
  const isFire    = shape === 'fire';
  const isWatery  = shape === 'watery';

  // Closed path: curve down for wink/relax, curve up for laugh/satisfied
  const closedPath = (config.closedType === 'down' || shape === 'wink')
    ? 'M 35,90 Q 110,135 185,90'
    : 'M 35,90 Q 110,40 185,90';

  // Outer lash wing
  const lashPath = side === 'left'
    ? 'M 32,94 C 12,94 3,82 0,72 C 8,82 20,88 32,88 Z'
    : 'M 188,94 C 208,94 217,82 220,72 C 212,82 200,88 188,88 Z';

  return (
    <motion.svg
      className="eye"
      viewBox="0 0 220 180"
      aria-hidden="true"
      animate={{ scale: config.scale ?? 1, rotate: config.rotation ?? 0 }}
      transition={SPRING_IRIS}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id={`${id}-blue`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#080c16" />
          <stop offset="35%"  stopColor="#0369a1" />
          <stop offset="75%"  stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
        <linearGradient id={`${id}-purple`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#080c16" />
          <stop offset="35%"  stopColor="#6d28d9" />
          <stop offset="75%"  stopColor="#a855f7" />
          <stop offset="100%" stopColor="#e879f9" />
        </linearGradient>
        <linearGradient id={`${id}-heart`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#f43f5e" />
          <stop offset="50%"  stopColor="#ec4899" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
        <filter id={`${id}-glow`}>
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* ── Closed / Wink line ── */}
      <AnimatePresence>
        {isClosedShape && (
          <motion.g
            key="closed"
            initial={{ opacity: 0, scaleY: 0.1 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0.1 }}
            transition={SPRING_BLINK}
            style={{ transformOrigin: '110px 90px', transformBox: 'fill-box' }}
          >
            <motion.path
              className="eye-line-path"
              initial={{ d: 'M 35,90 Q 110,90 185,90' }}
              animate={{ d: closedPath }}
              transition={SPRING_BLINK}
            />
            <path
              d={side === 'left' ? 'M 35,90 Q 20,80 15,85' : 'M 185,90 Q 200,80 205,85'}
              stroke="#0f172a" strokeWidth="10" strokeLinecap="round" fill="none"
            />
          </motion.g>
        )}
      </AnimatePresence>

      {/* ── Open eye shell + lash ── */}
      <AnimatePresence>
        {!isClosedShape && (
          <motion.g
            key="shell"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={SPRING_BLINK}
            style={{ transformOrigin: '110px 90px', transformBox: 'fill-box' }}
          >
            <ellipse className="eye-shell" cx="110" cy="90" rx="79" ry="76" />
            <path className="eye-lash" d={lashPath} />
          </motion.g>
        )}
      </AnimatePresence>

      {/* ── Pupil / Iris group ── */}
      <AnimatePresence>
        {!isClosedShape && (
          <motion.g
            key="pupil"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: tx,
              y: ty,
            }}
            exit={{ opacity: 0, scale: 0.3 }}
            transition={SPRING_IRIS}
            style={{
              transformOrigin: '110px 90px',
              transformBox: 'fill-box',
            }}
          >
            {/* Pointer gaze inner layer */}
            <motion.g
              animate={{
                x: `calc(var(--pointer-x, 0) * 1px)`,
                y: `calc(var(--pointer-y, 0) * 1px)`,
              }}
              transition={SPRING_GAZE}
            >
              {/* ── Normal / Watery / Fire / Star ── */}
              {!isHeart && !isSpiral && (
                <>
                  <circle
                    cx="110" cy="94"
                    r={58 * (config.pupilScale ?? 1)}
                    fill={side === 'left' ? `url(#${id}-blue)` : `url(#${id}-purple)`}
                  />
                  <path
                    d="M 68,114 Q 110,146 152,114 Q 110,126 68,114 Z"
                    fill={side === 'left' ? '#7dd3fc' : '#f472b6'}
                    opacity="0.45"
                    style={{ mixBlendMode: 'screen' }}
                  />
                  {!isStar && (
                    <>
                      <ellipse cx="86" cy="66" rx="18" ry="24" fill="#fff" transform="rotate(-15 86 66)" />
                      <ellipse cx="134" cy="114" rx="9" ry="12" fill="#fff" opacity="0.9" transform="rotate(-15 134 114)" />
                    </>
                  )}
                  {isStar && (
                    <motion.path
                      d="m110 40 14 30 34 4 -25 24 7 34 -30 -17 -30 17 7 -34 -25 -24 34 -4 Z"
                      fill="#fde047" stroke="#fff" strokeWidth="2"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                      style={{ transformOrigin: '110px 90px', transformBox: 'fill-box' }}
                    />
                  )}
                  {isFire && (
                    <motion.path
                      d="M 85,125 C 65,95 90,80 80,50 C 105,60 100,75 110,80 C 115,65 130,55 125,35 C 150,60 155,100 130,125 Z"
                      fill="#f97316" opacity="0.85"
                      animate={{ scaleY: [1, 1.18, 1], skewX: [0, 3, -3, 0] }}
                      transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                      style={{ transformOrigin: '110px 125px', transformBox: 'fill-box' }}
                    />
                  )}
                  {isWatery && (
                    <motion.path
                      d="M 52,112 Q 110,135 168,112 Q 110,154 52,112 Z"
                      fill="#38bdf8" opacity="0.9"
                      animate={{ scaleX: [1, 1.06, 1], y: [0, 3, 0] }}
                      transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                      style={{ transformOrigin: '110px 133px', transformBox: 'fill-box' }}
                    />
                  )}
                </>
              )}

              {/* ── Heart Eye ── */}
              {isHeart && (
                <>
                  <motion.path
                    fill={`url(#${id}-heart)`}
                    d="M 110,148 C 94,125 40,93 40,52 C 40,14 88,5 110,40 C 132,5 180,14 180,52 C 180,93 126,125 110,148 Z"
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
                    style={{ transformOrigin: '110px 90px', transformBox: 'fill-box' }}
                    filter={`url(#${id}-glow)`}
                  />
                  <circle cx="82" cy="48" r="14" fill="#fff" opacity="0.85" />
                  <circle cx="132" cy="48" r="8"  fill="#fff" opacity="0.75" />
                </>
              )}

              {/* ── Spiral Eye ── */}
              {isSpiral && (
                <>
                  <circle cx="110" cy="90" r="64"
                    fill="#f8fafc"
                    stroke={side === 'left' ? '#0ea5e9' : '#a855f7'}
                    strokeWidth="12"
                  />
                  <motion.path
                    d="M 110,90 C 110,72 135,72 135,90 C 135,116 85,120 83,86 C 81,42 165,35 171,92 C 179,155 75,170 58,104"
                    stroke={side === 'left' ? '#0284c7' : '#7c3aed'}
                    strokeWidth="9" strokeLinecap="round" fill="none"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                    style={{ transformOrigin: '110px 90px', transformBox: 'fill-box' }}
                  />
                </>
              )}
            </motion.g>
          </motion.g>
        )}
      </AnimatePresence>
    </motion.svg>
  );
});
