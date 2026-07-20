import { memo, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { EyeConfig } from '../../types/emotion.types';

interface Props {
  config: EyeConfig;
  side: 'left' | 'right';
  blinking: boolean;
}

// Spring configs — tuned for biological feel
const SPRING_IRIS = { type: 'spring' as const, stiffness: 280, damping: 22, mass: 0.8 };
const SPRING_BLINK = { type: 'spring' as const, stiffness: 600, damping: 38, mass: 0.4 };
const SPRING_GAZE = { type: 'spring' as const, stiffness: 160, damping: 20, mass: 1.2 };
const SPRING_PUPIL = { type: 'spring' as const, stiffness: 120, damping: 18, mass: 1.0 };

// Base pupil radius at pupilScale = 1. All highlight/heart geometry below is
// authored against this base and then scaled by `hs` so everything stays
// proportionally correct on shrunken/enlarged eyes (surprised, angry, love, etc).
const BASE_PUPIL_R = 70;

export const Eye = memo(function Eye({ config, side, blinking }: Props) {
  const id = useId().replace(/:/g, '');
  const shape = blinking ? 'closed' : config.shape;
  const tx = config.lookX ?? 0;
  const ty = config.lookY ?? 0;

  const isClosedShape = shape === 'closed' || shape === 'wink';
  const isHeart = shape === 'heart';
  const isStar = shape === 'star';
  const isSpiral = shape === 'spiral';
  const isFire = shape === 'fire';
  const isWatery = shape === 'watery';

  // Closed line direction
  const closedPath = (config.closedType === 'down' || shape === 'wink')
    ? 'M 35,90 Q 110,135 185,90'
    : 'M 35,90 Q 110,40 185,90';

  // ── Outer lash "tab" — fully rounded capsule (rx = height/2), replacing the
  // old bezier wing. Slightly overlaps the shell edge so it reads as one
  // continuous rounded piece, exactly like the reference photos' smooth nub. ──
  const LASH_W = 34, LASH_H = 16;
  const lashX = side === 'left' ? -4 : 190;
  const lashY = 90 - LASH_H / 2;

  // Core (near-black center mass) sits slightly offset toward the "thin ring" side —
  // this is what makes the outer colored ring read as thicker on one side, matching the refs.
  const coreOffsetX = (side === 'left' ? 5 : -5);
  const coreOffsetY = 4;

  // ── Pupil radius driven by pupilScale (set in config per emotion) ──
  const pupilR = BASE_PUPIL_R * (config.pupilScale ?? 1);
  // Scale factor applied to every highlight/heart size AND its offset from the
  // eye center, so they shrink/grow together with the core.
  const hs = pupilR / BASE_PUPIL_R;

  const coreOffX = coreOffsetX * hs;
  const coreOffY = coreOffsetY * hs;

  // ── Highlights: authored as deltas from eye center (110, 90), then scaled by `hs` ──
  // Verified against the reference photos: blue/left = 3 highlights, purple/right =
  // 4 highlights (extra mid-left oval), and this same cluster is reused, unchanged,
  // on top of the star and heart shapes too.
  const dxLarge = (side === 'left' ? -28 : 28);
  const dyLarge = -32;
  const highlightLargeX = 110 + dxLarge * hs - tx * 0.4;
  const highlightLargeY = 90 + dyLarge * hs - ty * 0.3;

  const dxSmall = (side === 'left' ? 42 : -42);
  const dySmall = 28;
  const highlightSmallX = 110 + dxSmall * hs - tx * 0.25;
  const highlightSmallY = 90 + dySmall * hs - ty * 0.2;

  const dxMid = (side === 'left' ? -44 : 44); // purple-only 2nd oval
  const dyMid = 6;
  const highlightMidX = 110 + dxMid * hs - tx * 0.2;
  const highlightMidY = 90 + dyMid * hs - ty * 0.15;

  const dxTiny = (side === 'left' ? 48 : 22);
  const dyTiny = 48;
  const highlightTinyX = 110 + dxTiny * hs;
  const highlightTinyY = 90 + dyTiny * hs;

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
        {/* Outer ring — linear, bright at one edge fading to near-black, matches the
            uneven "glass rim" lighting in the reference photos (not a symmetric radial). */}
        <linearGradient id={`${id}-ringBlue`} x1="12%" y1="18%" x2="88%" y2="82%">
          <stop offset="0%" stopColor="#7fdcff" />
          <stop offset="18%" stopColor="#2f9fe8" />
          <stop offset="48%" stopColor="#0d3a6e" />
          <stop offset="100%" stopColor="#020a16" />
        </linearGradient>
        <linearGradient id={`${id}-ringPurple`} x1="88%" y1="18%" x2="12%" y2="82%">
          <stop offset="0%" stopColor="#d9b8ff" />
          <stop offset="18%" stopColor="#a15ff0" />
          <stop offset="48%" stopColor="#4a1980" />
          <stop offset="100%" stopColor="#0a0414" />
        </linearGradient>

        {/* Core — near-black, only a faint lift at top-left so it never goes flat-dead-black */}
        <radialGradient id={`${id}-core`} cx="40%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#1b2028" />
          <stop offset="55%" stopColor="#05070c" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>

        <radialGradient id={`${id}-heart`} cx="35%" cy="28%" r="75%">
          <stop offset="0%" stopColor="#ff9bb3" />
          <stop offset="45%" stopColor="#f9557d" />
          <stop offset="100%" stopColor="#be123c" />
        </radialGradient>
        <filter id={`${id}-glow`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
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
            {/* Outer lash tip when closed — already rounded via strokeLinecap */}
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
            <ellipse className="eye-shell" cx="110" cy="90" rx="82" ry="79"
              filter={`url(#${id}-inner-shadow)`}
              style={{ fill: '#050914', stroke: '#02050b', strokeWidth: 9 }} />
            {/* Fully rounded capsule tab — rx = height/2 guarantees round ends on both sides */}
            <rect className="eye-lash" x={lashX} y={lashY} width={LASH_W} height={LASH_H}
              rx={LASH_H / 2} ry={LASH_H / 2} />
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
              {/* ── Ring + seam + core — shared by normal / star / fire / watery / heart.
                  Heart-eye refs always use the purple ring regardless of side. ── */}
              {!isSpiral && (
                <>
                  <motion.circle
                    cx="110" cy="90"
                    fill="none"
                    stroke={isHeart ? `url(#${id}-ringPurple)` : (side === 'left' ? `url(#${id}-ringBlue)` : `url(#${id}-ringPurple)`)}
                    strokeWidth={17 * hs}
                    animate={{ r: pupilR + 9 }}
                    transition={SPRING_PUPIL}
                  />
                  <motion.circle
                    cx="110" cy="90"
                    fill="none"
                    stroke="#020409"
                    strokeWidth={3 * hs}
                    animate={{ r: pupilR + 1 }}
                    transition={SPRING_PUPIL}
                  />
                  <motion.circle
                    cx={110 + coreOffX} cy={90 + coreOffY}
                    fill={`url(#${id}-core)`}
                    animate={{ r: pupilR }}
                    transition={SPRING_PUPIL}
                  />
                </>
              )}

              {/* ── Star ── */}
              {isStar && (
                <motion.path
                  d="m110 45 12 27 30 4 -22 21 6 30 -26 -15 -26 15 6 -30 -22 -21 30 -4 Z"
                  fill="#fde047" stroke="#f5b400" strokeWidth="2.5"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 7, ease: 'linear' }}
                  style={{ transformOrigin: '110px 90px', transformBox: 'fill-box' }}
                />
              )}

              {/* ── Heart — sits centered in the core like a pupil, NOT filling the whole eye ── */}
              {isHeart && (
                <g transform={`translate(${110 + coreOffX} ${90 + coreOffY + 4 * hs})`}>
                  <motion.path
                    d="M 0,-14 C -8,-34 -34,-34 -34,-12 C -34,8 -14,22 0,34 C 14,22 34,8 34,-12 C 34,-34 8,-34 0,-14 Z"
                    fill={`url(#${id}-heart)`}
                    stroke="#9f1239"
                    strokeWidth={1.5 * hs}
                    animate={{ scale: [hs, hs * 1.08, hs * 0.97, hs * 1.05, hs] }}
                    transition={{ repeat: Infinity, duration: 1.3, ease: 'easeInOut' }}
                    style={{ transformOrigin: '0px 0px', transformBox: 'fill-box' }}
                    filter={`url(#${id}-glow)`}
                  />
                </g>
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

              {/* ── Specular highlight cluster — reused as-is on normal / star / heart /
                  fire / watery eyes, sized & positioned relative to pupilR via `hs` ── */}
              {!isSpiral && (
                <>
                  {/* Main highlight — two overlapping lobes forming one soft "cloud" */}
                  <motion.ellipse
                    cx={highlightLargeX} cy={highlightLargeY}
                    rx={(side === 'left' ? 26 : 30) * hs}
                    ry={(side === 'left' ? 33 : 25) * hs}
                    fill="#fff" opacity="0.97"
                    animate={{ cx: highlightLargeX, cy: highlightLargeY }}
                    transition={SPRING_GAZE}
                    transform={`rotate(${side === 'left' ? -18 : 20} ${highlightLargeX} ${highlightLargeY})`}
                  />
                  <motion.ellipse
                    cx={highlightLargeX + (side === 'left' ? 26 : -26) * hs}
                    cy={highlightLargeY + 6 * hs}
                    rx={16 * hs} ry={20 * hs}
                    fill="#fff" opacity="0.95"
                    animate={{
                      cx: highlightLargeX + (side === 'left' ? 26 : -26) * hs,
                      cy: highlightLargeY + 6 * hs,
                    }}
                    transition={SPRING_GAZE}
                    transform={`rotate(${side === 'left' ? -10 : 10} ${highlightLargeX} ${highlightLargeY})`}
                  />

                  {/* Purple/right-only: extra small mid-left oval — normal-eye-only detail */}
                  {side === 'right' && !isStar && !isHeart && (
                    <motion.ellipse
                      cx={highlightMidX} cy={highlightMidY}
                      rx={12 * hs} ry={16 * hs}
                      fill="#fff" opacity="0.92"
                      animate={{ cx: highlightMidX, cy: highlightMidY }}
                      transition={SPRING_GAZE}
                      transform={`rotate(-12 ${highlightMidX} ${highlightMidY})`}
                    />
                  )}

                  {/* Small solid circle, lower-right of the core */}
                  <motion.circle
                    cx={highlightSmallX} cy={highlightSmallY}
                    r={(side === 'left' ? 11 : 9) * hs}
                    fill="#fff" opacity="0.95"
                    animate={{ cx: highlightSmallX, cy: highlightSmallY }}
                    transition={SPRING_GAZE}
                  />

                  {/* Tiny highlight — blue/normal-left ref has a light-blue ring;
                      everywhere else (purple, star, heart) it's a plain solid dot */}
                  {side === 'left' && !isStar && !isHeart ? (
                    <circle cx={highlightTinyX} cy={highlightTinyY} r={7 * hs}
                      fill="#f8fdff" stroke="#61d8ff" strokeWidth={4 * hs} />
                  ) : (
                    <circle cx={highlightTinyX} cy={highlightTinyY} r={6 * hs} fill="#fff" opacity="0.95" />
                  )}

                  {/* Star-only: extra tiny stray dot near the outer ring edge (top-left) */}
                  {isStar && (
                    <circle
                      cx={110 + (side === 'left' ? -62 : 62) * hs}
                      cy={90 - 34 * hs}
                      r={3.2 * hs}
                      fill="#fff" opacity="0.9"
                    />
                  )}
                </>
              )}

              {/* ── Spiral Eye — unchanged, fully self-contained shape ── */}
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