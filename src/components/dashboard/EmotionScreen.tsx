import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import type { Emotion } from '../../types/emotion.types';
import { EmotionFace } from '../emotion/EmotionFace';
import { DashboardHeader } from './DashboardHeader';
import { DashboardStats } from './DashboardStats';
import { BottomNavigation } from './BottomNavigation';
import type { ReactNode } from 'react';

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
      left: '15%', right: '15%',
      bottom: '2%', height: '9%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 'clamp(6px,1.5vw,12px)',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center',
        gap: 'clamp(2px, 0.4vw, 3.5px)',
        height: 'clamp(14px, 3vh, 28px)',
      }}>
        {BAR_HEIGHTS.map((h, i) => (
          <motion.div key={i}
            animate={{ scaleY: [1, 0.35, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 + i * 0.05, delay: i * 0.05, ease: 'easeInOut' }}
            style={{
              width: 'clamp(2px, 0.45vw, 4.5px)',
              height: `${h * 100}%`,
              background: 'linear-gradient(to top, #3B82F6, #8B5CF6)',
              borderRadius: 9999,
              transformOrigin: 'center',
            }}
          />
        ))}
      </div>
      <span style={{ fontSize: 'clamp(9px, 1.3vw, 17px)', color: '#334155', fontWeight: 700 }}>{hint}</span>
    </div>
  );
}

// ── Left Navigation Rail (Frosted glass capsule) ──────────────────────────────
function IconRailLeft() {
  const sz = 'clamp(18px, 2.2vw, 28px)';

  const railContainerStyle: CSSProperties = {
    position: 'absolute',
    zIndex: 6,
    left: '2.5%',
    top: '11%',
    bottom: '12%',
    width: 'clamp(52px, 5.5vw, 76px)',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: 24,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '2vh 0',
    boxShadow: '0 8px 32px rgba(201, 193, 193, 0.14)',
  };

  const itemStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: '1.2vh 0',
    color: '#334155',
  };

  return (
    <div style={railContainerStyle}>
      {/* 1. Home (Active, outline style with blue glowing bar on left edge) */}
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} style={{ ...itemStyle, color: '#3B82F6' }}>
        {/* Glow indicator line */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: '25%',
          bottom: '25%',
          width: 3.5,
          borderRadius: '0 4px 4px 0',
          background: '#00d2ff',
          boxShadow: '0 0 10px #3B82F6, 0 0 4px #00d2ff',
        }} />
        <svg viewBox="0 0 24 24" width={sz} height={sz} fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </motion.div>

      {/* 2. Symmetrical Compass pointer (vertical) */}
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} style={itemStyle}>
        <svg viewBox="0 0 24 24" width={sz} height={sz} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 19 21 12 17 5 21 12 2" />
        </svg>
      </motion.div>

      {/* 3. Music note */}
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} style={itemStyle}>
        <svg viewBox="0 0 24 24" width={sz} height={sz} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
        </svg>
      </motion.div>

      {/* 4. Phone */}
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} style={itemStyle}>
        <svg viewBox="0 0 24 24" width={sz} height={sz} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </motion.div>

      {/* 5. Settings (Gear) */}
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} style={itemStyle}>
        <svg viewBox="0 0 24 24" width={sz} height={sz} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.52 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </motion.div>

      {/* 6. Scooter / Vespa - dùng ảnh mẫu */}
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} style={itemStyle}>
        <img src="/scooter-icon.png" alt="scooter" style={{ width: sz, height: sz, objectFit: 'contain', filter: 'brightness(0) saturate(100%) invert(38%) sepia(100%) saturate(400%) hue-rotate(195deg) brightness(95%)' }} />
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
  return (
    <section className="radxa-screen" style={{ background: '#f4f6f9' }}>
      {/* Background glow removed as requested */}

      <DashboardHeader temperature={temperature} />

      {/* Right stats panel — moved to the right side */}
      {assistantMode ? (
        <div style={{
          position: 'absolute',
          right: '3.5%',
          top: '11%',
          bottom: '12%',
          width: 'clamp(52px, 12%, 150px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          zIndex: 5,
        }}>
          {/* D READY (aligned right) */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
            <span style={{ fontSize: 'clamp(16px, 3.4vw, 44px)', fontWeight: 900, color: '#22C55E', lineHeight: 1 }}>D</span>
            <span style={{ fontSize: 'clamp(7px, 1vw, 14px)', fontWeight: 800, color: '#22C55E', letterSpacing: '0.05em' }}>READY</span>
          </div>

          {/* Speed (centered relative to panel) */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '4px' }}>
            <span style={{ fontSize: 'clamp(24px, 5.8vw, 82px)', fontWeight: 900, color: '#1e293b', lineHeight: 0.9 }}>{speed}</span>
            <span style={{ fontSize: 'clamp(7px, 1vw, 15px)', color: '#64748b', fontWeight: 650, marginTop: 2 }}>km/h</span>
          </div>

          {/* Battery (aligned right) */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3, width: '100%', maxWidth: 120 }}>
            <span style={{
              fontSize: 'clamp(9px, 1.2vw, 18px)',
              fontWeight: 800,
              color: battery <= 20 ? '#EF4444' : '#3B82F6',
              lineHeight: 1,
            }}>{battery}%</span>
            <div style={{
              width: '100%',
              height: 'clamp(6px, 1vw, 15px)',
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
                    : 'linear-gradient(90deg, #3B82F6 0%, #00d2ff 35%, #8B5CF6 70%, #d846ef 100%)',
                  backgroundSize: '200% 100%',
                  animation: 'batteryShimmer 2.4s linear infinite',
                  WebkitMaskImage: 'repeating-linear-gradient(to right, #000 0px, #000 calc(100%/6 - 2px), transparent calc(100%/6 - 2px), transparent calc(100%/6))',
                  maskImage: 'repeating-linear-gradient(to right, #000 0px, #000 calc(100%/6 - 2px), transparent calc(100%/6 - 2px), transparent calc(100%/6))',
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
          {/* Center-bottom info card slot — positioned perfectly relative to navigation and stats */}
          <div style={{
            position: 'absolute', zIndex: 6,
            left: 'clamp(64px, 16%, 220px)',
            right: 'clamp(64px, 16%, 220px)',
            top: '48%',
            bottom: '11%',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            overflow: 'hidden',
          }}>
            {infoCard}
          </div>

          <IconRailLeft />
          <VoiceBar hint={voiceHint} />
        </>
      )}

      {!assistantMode && <BottomNavigation />}
    </section>
  );
}
