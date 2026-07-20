import { memo, useId } from 'react';
import type { EyeConfig } from '../../types/emotion.types';

interface Props {
  config: EyeConfig;
  side: 'left' | 'right';
  blinking: boolean;
}

export const Eye = memo(function Eye({ config, side, blinking }: Props) {
  const id = useId().replace(/:/g, '');
  const shape = blinking ? 'closed' : config.shape;
  const tx = config.lookX ?? 0;
  const ty = config.lookY ?? 0;

  const isClosed = shape === 'closed' || shape === 'wink';
  const isHeart = shape === 'heart';
  const isStar = shape === 'star';
  const isSpiral = shape === 'spiral';
  const isFire = shape === 'fire';
  const isWatery = shape === 'watery';

  // Eye eyelashes path depending on left/right side
  const lashPath = side === 'left'
    ? 'M 32,94 C 12,94 3,82 0,72 C 8,82 20,88 32,88 Z'
    : 'M 188,94 C 208,94 217,82 220,72 C 212,82 200,88 188,88 Z';

  // Closed eye line path
  const closedPath = isClosed
    ? (config.closedType === 'down' || shape === 'wink'
        ? 'M 35,90 Q 110,135 185,90'  // Curves down (relaxed, sleepy, wink)
        : 'M 35,90 Q 110,40 185,90'    // Curves up (laughing, satisfied)
      )
    : 'M 35,90 Q 110,40 185,90';

  return (
    <svg
      className="eye"
      style={{
        transform: `scale(${config.scale ?? 1}) rotate(${config.rotation ?? 0}deg)`,
        transition: 'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
      viewBox="0 0 220 180"
      aria-hidden="true"
    >
      <defs>
        {/* Left eye: cyan-blue linear gradient (dark top, glowing bottom) */}
        <linearGradient id={`${id}-blue-iris`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#080c16" />
          <stop offset="35%" stopColor="#0369a1" />
          <stop offset="75%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>

        {/* Right eye: purple-magenta linear gradient */}
        <linearGradient id={`${id}-purple-iris`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#080c16" />
          <stop offset="35%" stopColor="#6d28d9" />
          <stop offset="75%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#e879f9" />
        </linearGradient>

        {/* Heart eye pink-red gradient */}
        <linearGradient id={`${id}-heart-grad`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
      </defs>

      {/* 1. Closed/Wink Eye Line (fades and scales elastically) */}
      <g
        className="eye-layer"
        style={{
          opacity: isClosed ? 1 : 0,
          transform: isClosed ? 'scale(1)' : 'scale(0.55)',
          pointerEvents: isClosed ? 'auto' : 'none',
        }}
      >
        <path className="eye-line-path" d={closedPath} />
        {/* Small lash on the closed eye line */}
        <path
          className="eye-lash"
          d={side === 'left' ? 'M 35,90 Q 20,80 15,85' : 'M 185,90 Q 200,80 205,85'}
          stroke="#0f172a"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* 2. Open Eye Shell & Lash (fades and scales elastically) */}
      <g
        className="eye-layer"
        style={{
          opacity: isClosed ? 0 : 1,
          transform: isClosed ? 'scale(0.55)' : 'scale(1)',
          pointerEvents: isClosed ? 'none' : 'auto',
        }}
      >
        {/* Eye sclera outline */}
        <ellipse className="eye-shell" cx="110" cy="90" rx="79" ry="76" />
        {/* Cute outer eyelash */}
        <path className="eye-lash" d={lashPath} />
      </g>

      {/* 3. Pupil/Iris Group (Translate for gaze + scale for spring pop) */}
      <g
        className="eye-layer pupil"
        style={{
          opacity: isClosed ? 0 : 1,
          pointerEvents: isClosed ? 'none' : 'auto',
          transform: `translate(calc(${tx}px + var(--pointer-x, 0) * 1px), calc(${ty}px + var(--pointer-y, 0) * 1px)) ${isClosed ? 'scale(0.25)' : 'scale(1)'}`,
        }}
      >
        {/* A. Normal Open Eye / Watery Eye / Fire Eye / Star Eye */}
        {!isHeart && !isSpiral && (
          <>
            {/* Iris circle */}
            <circle
              cx="110"
              cy="94"
              r={58 * (config.pupilScale ?? 1)}
              fill={side === 'left' ? `url(#${id}-blue-iris)` : `url(#${id}-purple-iris)`}
            />

            {/* Glowing bottom crescent highlight */}
            <path
              className="eye-glow"
              d="M 68,114 Q 110,146 152,114 Q 110,126 68,114 Z"
              fill={side === 'left' ? '#7dd3fc' : '#f472b6'}
            />

            {/* Normal highlights (only when not star) */}
            {!isStar && (
              <>
                {/* Large white highlight ellipse */}
                <ellipse
                  className="eye-reflection-large"
                  cx="86"
                  cy="66"
                  rx="18"
                  ry="24"
                  transform="rotate(-15 86 66)"
                />
                {/* Medium white highlight circle */}
                <ellipse
                  className="eye-reflection-small"
                  cx="134"
                  cy="114"
                  rx="9"
                  ry="12"
                  transform="rotate(-15 134 114)"
                />
              </>
            )}

            {/* Star-eye pupil detail */}
            {isStar && (
              <path
                className="star-eye"
                d="m110 40 14 30 34 4 -25 24 7 34 -30 -17 -30 17 7 -34 -25 -24 34 -4 Z"
                fill="#fde047"
                stroke="#ffffff"
                strokeWidth="2"
              />
            )}

            {/* Fire-eye burning flame */}
            {isFire && (
              <path
                className="eye-fire-flame"
                d="M 85,125 C 65,95 90,80 80,50 C 105,60 100,75 110,80 C 115,65 130,55 125,35 C 150,60 155,100 130,125 Z"
                fill="#f97316"
                opacity="0.85"
              />
            )}

            {/* Watery-eye soft bottom wave */}
            {isWatery && (
              <path
                className="eye-watery-wave"
                d="M 52,112 Q 110,135 168,112 Q 110,154 52,112 Z"
                fill="#38bdf8"
                opacity="0.9"
              />
            )}
          </>
        )}

        {/* B. Heart Eye (Cute/Love) */}
        {isHeart && (
          <>
            <path
              className="heart-eye"
              fill={`url(#${id}-heart-grad)`}
              d="M 110,148 C 94,125 40,93 40,52 C 40,14 88,5 110,40 C 132,5 180,14 180,52 C 180,93 126,125 110,148 Z"
            />
            {/* Heart reflection */}
            <circle cx="82" cy="48" r="14" fill="#ffffff" opacity="0.85" />
            <circle cx="132" cy="48" r="8" fill="#ffffff" opacity="0.75" />
          </>
        )}

        {/* C. Spiral Eye (Confused) */}
        {isSpiral && (
          <>
            <circle cx="110" cy="90" r="64" fill="#f8fafc" stroke={side === 'left' ? '#0ea5e9' : '#a855f7'} strokeWidth="12" />
            <path
              className="eye-spiral-path"
              d="M 110,90 C 110,72 135,72 135,90 C 135,116 85,120 83,86 C 81,42 165,35 171,92 C 179,155 75,170 58,104"
              stroke={side === 'left' ? '#0284c7' : '#7c3aed'}
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
            />
          </>
        )}
      </g>
    </svg>
  );
});
