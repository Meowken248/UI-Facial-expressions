import { memo, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { EyeConfig } from '../../types/emotion.types';

interface Props {
  config: EyeConfig;
  side: 'left' | 'right';
  blinking: boolean;
}

// Spring configs — tuned for biological feel
const SPRING_IRIS  = { type: 'spring' as const, stiffness: 280, damping: 22, mass: 0.8 };
const SPRING_BLINK = { type: 'spring' as const, stiffness: 600, damping: 38, mass: 0.4 };
const SPRING_GAZE  = { type: 'spring' as const, stiffness: 160, damping: 20, mass: 1.2 };
const SPRING_PUPIL = { type: 'spring' as const, stiffness: 120, damping: 18, mass: 1.0 };

export const Eye = memo(function Eye({ config, side, blinking }: Props) {
  const id = useId().replace(/:/g, '');
  const shape = blinking ? 'closed' : config.shape;
  const tx = config.lookX ?? 0;
  const ty = config.lookY ?? 0;

  const isClosedShape = shape === 'closed' || shape === 'wink';
  const isHeart  = shape === 'heart';
  const isStar   = shape === 'star';
  const isSpiral = shape === 'spiral';
  const isFire   = shape === 'fire';
  const isWatery = shape === 'watery';

  // Closed line direction
  const closedPath = (config.closedType === 'down' || shape === 'wink')
    ? 'M 35,90 Q 110,135 185,90'
    : 'M 35,90 Q 110,40 185,90';

  // Outer lash wing
  const lashPath = side === 'left'
    ? 'M 32,94 C 12,94 3,82 0,72 C 8,82 20,88 32,88 Z'
    : 'M 188,94 C 208,94 217,82 220,72 C 212,82 200,88 188,88 Z';

  // ── Highlight shifts slightly opposite to gaze direction ──
  // Creates realistic specular reflection that stays at light source angle
  const highlightLargeX = 86 - tx * 0.4;
  const highlightLargeY = 66 - ty * 0.3;
  const highlightSmallX = 134 - tx * 0.25;
  const highlightSmallY = 114 - ty * 0.2;

  // ── Pupil radius driven by pupilScale (set in config per emotion) ──
  const pupilR = 58 * (config.pupilScale ?? 1);

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
        <radialGradient id={`${id}-blue`} cx="45%" cy="38%" r="58%">
          <stop offset="0%"   stopColor="#38bdf8" />
          <stop offset="40%"  stopColor="#0ea5e9" />
          <stop offset="72%"  stopColor="#0369a1" />
          <stop offset="100%" stopColor="#080c16" />
        </radialGradient>
        <radialGradient id={`${id}-purple`} cx="45%" cy="38%" r="58%">
          <stop offset="0%"   stopColor="#e879f9" />
          <stop offset="40%"  stopColor="#a855f7" />
          <stop offset="72%"  stopColor="#6d28d9" />
          <stop offset="100%" stopColor="#080c16" />
        </radialGradient>
        <radialGradient id={`${id}-heart`} cx="50%" cy="30%" r="60%">
          <stop offset="0%"   stopColor="#fb7185" />
          <stop offset="55%"  stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#be123c" />
        </radialGradient>
        <filter id={`${id}-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id={`${id}-inner-shadow`} x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* ── Closed / Wink line ── */}
      <AnimatePresence>
        {isClosedShape && (
          <motion.g
            key="closed"
            initial={{ opacity: 0, scaleY: 0.05 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0.05 }}
            transition={SPRING_BLINK}
            style={{ transformOrigin: '110px 90px', transformBox: 'fill-box' }}
          >
            <motion.path
              className="eye-line-path"
              initial={{ d: 'M 35,90 Q 110,90 185,90' }}
              animate={{ d: closedPath }}
              transition={SPRING_BLINK}
            />
            {/* Outer lash tip when closed */}
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
            initial={{ opacity: 0, scaleY: 0.05 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0.05 }}
            transition={SPRING_BLINK}
            style={{ transformOrigin: '110px 90px', transformBox: 'fill-box' }}
          >
            <ellipse className="eye-shell" cx="110" cy="90" rx="79" ry="76"
              filter={`url(#${id}-inner-shadow)`} />
            <path className="eye-lash" d={lashPath} />
          </motion.g>
        )}
      </AnimatePresence>

      {/* ── Pupil / Iris group ── */}
      <AnimatePresence>
        {!isClosedShape && (
          <motion.g
            key="pupil"
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1, x: tx, y: ty }}
            exit={{ opacity: 0, scale: 0.2 }}
            transition={SPRING_IRIS}
            style={{ transformOrigin: '110px 90px', transformBox: 'fill-box' }}
          >
            {/* Gaze layer — follows pointer via CSS var */}
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
                  {/* Iris with radial gradient for depth */}
                  <motion.circle
                    cx="110" cy="94"
                    r={pupilR}
                    fill={side === 'left' ? `url(#${id}-blue)` : `url(#${id}-purple)`}
                    animate={{ r: pupilR }}
                    transition={SPRING_PUPIL}
                  />
                  {/* Bottom iris sheen */}
                  <path
                    d="M 68,114 Q 110,146 152,114 Q 110,126 68,114 Z"
                    fill={side === 'left' ? '#7dd3fc' : '#f472b6'}
                    opacity="0.35"
                    style={{ mixBlendMode: 'screen' }}
                  />
                  {/* ── Specular highlights — shift opposite to gaze ── */}
                  {!isStar && (
                    <>
                      <motion.ellipse
                        cx={highlightLargeX} cy={highlightLargeY}
                        rx="18" ry="24"
                        fill="#fff"
                        animate={{ cx: highlightLargeX, cy: highlightLargeY }}
                        transition={SPRING_GAZE}
                        transform={`rotate(-15 ${highlightLargeX} ${highlightLargeY})`}
                      />
                      <motion.ellipse
                        cx={highlightSmallX} cy={highlightSmallY}
                        rx="9" ry="12"
                        fill="#fff" opacity="0.9"
                        animate={{ cx: highlightSmallX, cy: highlightSmallY }}
                        transition={SPRING_GAZE}
                        transform={`rotate(-15 ${highlightSmallX} ${highlightSmallY})`}
                      />
                    </>
                  )}
                  {isStar && (
                    <>
                      <motion.path
                        d="m110 45 12 27 30 4 -22 21 6 30 -26 -15 -26 15 6 -30 -22 -21 30 -4 Z"
                        fill="#fde047" stroke="#fff" strokeWidth="2"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 7, ease: 'linear' }}
                        style={{ transformOrigin: '110px 90px', transformBox: 'fill-box' }}
                      />
                      {/* Star highlight */}
                      <ellipse cx="96" cy="70" rx="10" ry="14" fill="#fff" opacity="0.8"
                        transform="rotate(-15 96 70)" />
                    </>
                  )}
                  {isFire && (
                    <motion.path
                      d="M 85,125 C 65,95 90,80 80,50 C 105,60 100,75 110,80 C 115,65 130,55 125,35 C 150,60 155,100 130,125 Z"
                      fill="#f97316" opacity="0.9"
                      animate={{ scaleY: [1, 1.15, 0.98, 1.12, 1], skewX: [0, 2, -2, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                      style={{ transformOrigin: '110px 125px', transformBox: 'fill-box' }}
                    />
                  )}
                  {isWatery && (
                    <motion.path
                      d="M 52,115 Q 110,138 168,115 Q 110,158 52,115 Z"
                      fill="#38bdf8" opacity="0.88"
                      animate={{ scaleX: [1, 1.05, 1], y: [0, 2.5, 0] }}
                      transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                      style={{ transformOrigin: '110px 135px', transformBox: 'fill-box' }}
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
                    animate={{ scale: [1, 1.07, 0.97, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 1.3, ease: 'easeInOut' }}
                    style={{ transformOrigin: '110px 90px', transformBox: 'fill-box' }}
                    filter={`url(#${id}-glow)`}
                  />
                  <circle cx="82" cy="50" r="15" fill="#fff" opacity="0.88" />
                  <circle cx="134" cy="48" r="8"  fill="#fff" opacity="0.75" />
                </>
              )}

              {/* ── Spiral Eye ── */}
              {isSpiral && (
                <>
                  <circle cx="110" cy="90" r="64"
                    fill="#f8fafc"
                    stroke={side === 'left' ? '#0ea5e9' : '#a855f7'}
                    strokeWidth="10"
                  />
                  <motion.path
                    d="M 110,90 C 110,72 135,72 135,90 C 135,116 85,120 83,86 C 81,42 165,35 171,92 C 179,155 75,170 58,104"
                    stroke={side === 'left' ? '#0284c7' : '#7c3aed'}
                    strokeWidth="8" strokeLinecap="round" fill="none"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
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
