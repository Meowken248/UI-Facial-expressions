import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import type { Emotion } from '../../types/emotion.types';
import { EmotionFace } from '../emotion/EmotionFace';
import { DashboardHeader } from './DashboardHeader';
import { DashboardStats } from './DashboardStats';
import { BottomNavigation } from './BottomNavigation';
import type { ReactNode } from 'react';

/* ── Battery shimmer keyframe injected once ── */
const BATTERY_STYLE = `
@keyframes batteryShimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes batteryPulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.45; }
}
`;
if (typeof document !== 'undefined' && !document.getElementById('battery-anim-style')) {
  const s = document.createElement('style');
  s.id = 'battery-anim-style';
  s.textContent = BATTERY_STYLE;
  document.head.appendChild(s);
}

// ── Ambient glow color per emotion group ─────────────────────────────────────
const GLOW_MAP: Record<Emotion, string> = {
  happy: 'rgba(250,204,21, 0.10)',
  excited: 'rgba(234,179, 8, 0.13)',
  surprised: 'rgba(99, 102,241, 0.10)',
  wink: 'rgba(236,72, 153, 0.09)',
  laughing: 'rgba(234,179, 8, 0.11)',
  playful: 'rgba(168,85, 247, 0.10)',
  cute: 'rgba(244,63, 94, 0.10)',
  proud: 'rgba(14, 165,233, 0.10)',
  satisfied: 'rgba(20, 184,166, 0.09)',
  relaxed: 'rgba(99, 102,241, 0.08)',
  curious: 'rgba(14, 165,233, 0.11)',
  thinking: 'rgba(148,163,184, 0.08)',
  confused: 'rgba(168,85, 247, 0.09)',
  sad: 'rgba(239,68,  68, 0.12)',
  disappointed: 'rgba(100,116,139, 0.09)',
  angry: 'rgba(239,68,  68, 0.14)',
  warning: 'rgba(239,68,  68, 0.11)',
  worried: 'rgba(14, 165,233, 0.10)',
  sleepy: 'rgba(99, 102,241, 0.08)',
  love: 'rgba(244,63, 94, 0.13)',
};

export interface EmotionScreenProps {
  emotion: Emotion;
  speed?: number;
  battery?: number;
  rangeKm?: number;
  temperature?: number;
  autoBlink?: boolean;
  followPointer?: boolean;
  animated?: boolean;
  assistantMode?: boolean;
  infoCard?: ReactNode;
  voiceHint?: string;
  currentState?: string;
}

// ── Equalizer voice bar ───────────────────────────────────────────────────────
const BAR_HEIGHTS = [0.35, 0.55, 0.8, 1.0, 0.8, 0.55, 0.35];

function VoiceBar({ hint }: { hint: string }) {
  return (
    <div style={{
      position: 'absolute', zIndex: 7,
      left: '11%', right: '11%',
      bottom: '3%', height: '10%',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 3.5, height: 28 }}>
        {BAR_HEIGHTS.map((h, i) => (
          <motion.div key={i}
            animate={{ scaleY: [1, 0.35, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 + i * 0.05, delay: i * 0.05, ease: 'easeInOut' }}
            style={{ width: 4.5, height: h * 28, background: 'linear-gradient(to top, #3B82F6, #8B5CF6)', borderRadius: 9999, transformOrigin: 'center' }}
          />
        ))}
      </div>
      <span style={{ fontSize: 'clamp(11px, 1.3vw, 17px)', color: '#334155', fontWeight: 700 }}>{hint}</span>
    </div>
  );
}

// ── Icon rail (Back / Navigation / Home / Music / Phone) ──────────────────────
function IconRailAbsolute() {
  const btnStyle: CSSProperties = {
    width: 'clamp(38px, 4.2vw, 56px)',
    height: 'clamp(38px, 4.2vw, 56px)',
    borderRadius: 15,
    background: 'rgba(255, 255, 255, 0.75)',
    border: '1.5px solid rgba(255, 255, 255, 0.95)',
    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#475569',
    cursor: 'pointer',
    transition: 'background-color 0.15s, border-color 0.15s',
  };
  const sz = 'clamp(18px, 2vw, 26px)';
  return (
    <div style={{
      position: 'absolute', zIndex: 6,
      right: '4%', top: '24%', bottom: '15%', width: '10%',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',
    }}>
      {/* Back */}
      <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }} style={btnStyle}>
        <svg viewBox="0 0 24 24" width={sz} height={sz} fill="none" stroke="#6C3BFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
        </svg>
      </motion.div>

      {/* Navigation Pointer */}
      <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }} style={btnStyle}>
        <svg viewBox="0 0 24 24" width={sz} height={sz} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 19 21 12 17 5 21 12 2" />
        </svg>
      </motion.div>

      {/* Active Home (Purple) */}
      <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }} style={{ ...btnStyle, background: 'rgba(255, 255, 255, 0.85)', borderColor: '#8B5CF6' }}>
        <svg viewBox="0 0 24 24" width={sz} height={sz} fill="#8B5CF6">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      </motion.div>

      {/* Music */}
      <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }} style={btnStyle}>
        <svg viewBox="0 0 24 24" width={sz} height={sz} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
        </svg>
      </motion.div>

      {/* Phone */}
      <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }} style={btnStyle}>
        <svg viewBox="0 0 24 24" width={sz} height={sz} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </motion.div>
    </div>
  );
}

export function EmotionScreen({
  emotion,
  speed = 0,
  battery = 80,
  rangeKm = 120,
  temperature = 28,
  autoBlink = true,
  followPointer = true,
  animated = true,
  assistantMode = false,
  infoCard,
  voiceHint = 'Mình có thể giúp gì cho bạn?',
  currentState,
}: EmotionScreenProps) {
  const glowColor = GLOW_MAP[emotion];
  const isShareLocation = currentState === 'share-location';

  return (
    <section className="radxa-screen">
      <motion.div
        className="screen-glow"
        animate={{ background: `radial-gradient(ellipse 80% 55% at 50% 42%, ${glowColor}, transparent 72%)` }}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      />

      <DashboardHeader temperature={temperature} />

      {/* Render custom assistant left stats or original dashboard stats */}
      {assistantMode ? (
        <div style={{
          position: 'absolute',
          left: '6%',
          top: '12%',
          bottom: '15%',
          width: '14%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          zIndex: 5,
        }}>
          {/* D READY */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
            <span style={{ fontSize: 'clamp(24px, 3.4vw, 44px)', fontWeight: 900, color: '#22C55E', lineHeight: 1 }}>D</span>
            <span style={{ fontSize: 'clamp(10px, 1.1vw, 14px)', fontWeight: 800, color: '#22C55E', letterSpacing: '0.05em' }}>READY</span>
          </div>

          {/* Speed (Centered in the middle of left column) */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: 'clamp(44px, 5.8vw, 82px)', fontWeight: 900, color: '#1e293b', lineHeight: 0.9 }}>{speed}</span>
            <span style={{ fontSize: 'clamp(10px, 1.1vw, 15px)', color: '#64748b', fontWeight: 650, marginTop: 2 }}>km/h</span>
          </div>

          {/* Battery (At the bottom of left column) */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4, width: '100%', maxWidth: 'clamp(80px, 8.5vw, 130px)' }}>
            {/* Battery % — pulses red when low */}
            <motion.span
              animate={battery <= 20 ? { opacity: [1, 0.4, 1] } : { opacity: 1 }}
              transition={battery <= 20 ? { repeat: Infinity, duration: 1, ease: 'easeInOut' } : {}}
              style={{
                fontSize: 'clamp(12px, 1.3vw, 18px)',
                fontWeight: 800,
                color: battery <= 20 ? '#EF4444' : '#3B82F6',
                lineHeight: 1,
              }}
            >{battery}%</motion.span>

            {/* Animated shimmer battery bar */}
            <div style={{
              width: '100%',
              height: 'clamp(10px, 1.1vw, 15px)',
              border: battery <= 20 ? '1.5px solid #EF4444' : '1.5px solid #3B82F6',
              borderRadius: 9999,
              padding: 1.5,
              display: 'flex',
              background: 'transparent',
              overflow: 'hidden',
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${battery}%` }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  height: '100%',
                  borderRadius: 9999,
                  background: battery <= 20
                    ? 'linear-gradient(90deg, #EF4444, #FCA5A5, #EF4444)'
                    : 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 40%, #C084FC 60%, #3B82F6 100%)',
                  backgroundSize: '200% 100%',
                  animation: 'batteryShimmer 2.4s linear infinite',
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <DashboardStats speed={speed} battery={battery} rangeKm={rangeKm} />
      )}

      <EmotionFace
        emotion={emotion}
        autoBlink={autoBlink}
        followPointer={followPointer}
        animated={animated}
        className={assistantMode ? 'assistant-face' : ''}
      />

      {assistantMode && infoCard && (
        <>
          {/* Center-bottom info card slot */}
          <div style={{
            position: 'absolute', zIndex: 6,
            left: '25%', right: '25%',
            top: '48%', bottom: '10%',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            overflow: 'hidden',
          }}>
            {infoCard}
          </div>

          <IconRailAbsolute />
          <VoiceBar hint={voiceHint} />
        </>
      )}

      {!assistantMode && <BottomNavigation />}
    </section>
  );
}
