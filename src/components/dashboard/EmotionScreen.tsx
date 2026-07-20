import { motion, AnimatePresence } from 'framer-motion';
import type { Emotion } from '../../types/emotion.types';
import { EmotionFace } from '../emotion/EmotionFace';
import { DashboardHeader } from './DashboardHeader';
import { DashboardStats } from './DashboardStats';
import { BottomNavigation } from './BottomNavigation';

// ── Ambient glow color per emotion group ─────────────────────────────────────
const GLOW_MAP: Record<Emotion, string> = {
  happy:       'rgba(250,204,21, 0.10)',
  excited:     'rgba(234,179, 8, 0.13)',
  surprised:   'rgba(99, 102,241, 0.10)',
  wink:        'rgba(236,72, 153, 0.09)',
  laughing:    'rgba(234,179, 8, 0.11)',
  playful:     'rgba(168,85, 247, 0.10)',
  cute:        'rgba(244,63, 94, 0.10)',
  proud:       'rgba(14, 165,233, 0.10)',
  satisfied:   'rgba(20, 184,166, 0.09)',
  relaxed:     'rgba(99, 102,241, 0.08)',
  curious:     'rgba(14, 165,233, 0.11)',
  thinking:    'rgba(148,163,184, 0.08)',
  confused:    'rgba(168,85, 247, 0.09)',
  sad:         'rgba(14, 165,233, 0.12)',
  disappointed:'rgba(100,116,139, 0.09)',
  angry:       'rgba(239,68,  68, 0.14)',
  warning:     'rgba(239,68,  68, 0.11)',
  worried:     'rgba(14, 165,233, 0.10)',
  sleepy:      'rgba(99, 102,241, 0.08)',
  love:        'rgba(244,63, 94, 0.13)',
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
}: EmotionScreenProps) {
  const glowColor = GLOW_MAP[emotion];

  return (
    <section className="radxa-screen">
      {/* ── Ambient glow layer ── */}
      <motion.div
        className="screen-glow"
        animate={{ background: `radial-gradient(ellipse 80% 55% at 50% 42%, ${glowColor}, transparent 72%)` }}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      />

      <DashboardHeader temperature={temperature} />
      <DashboardStats speed={speed} battery={battery} rangeKm={rangeKm} />
      <EmotionFace
        emotion={emotion}
        autoBlink={autoBlink}
        followPointer={followPointer}
        animated={animated}
      />
      <BottomNavigation />
    </section>
  );
}
