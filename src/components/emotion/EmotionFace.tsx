import { AnimatePresence, motion, type Transition } from 'framer-motion';
import { memo } from 'react';
import { emotionConfigs } from '../../config/emotion.config';
import { emotionLabels } from '../../config/emotion.labels';
import type { EffectConfig, Emotion } from '../../types/emotion.types';
import { useAutoBlink } from '../../hooks/useAutoBlink';
import { usePointerTracking } from '../../hooks/usePointerTracking';
import { Eye } from './Eye';
import { Eyebrow } from './Eyebrow';
import { Mouth } from './Mouth';
import { Cheeks } from './Cheeks';
import { EmotionEffects } from './EmotionEffects';

export interface EmotionFaceProps {
  emotion: Emotion;
  autoBlink?: boolean;
  followPointer?: boolean;
  animated?: boolean;
  className?: string;
}

// ── Transition groups — each emotion group has its own personality ────────────
type TransitionGroup = 'joyful' | 'sad' | 'surprised' | 'calm';

const EMOTION_GROUPS: Record<Emotion, TransitionGroup> = {
  happy: 'joyful',
  excited: 'joyful',
  laughing: 'joyful',
  wink: 'joyful',
  playful: 'joyful',
  cute: 'joyful',
  love: 'joyful',
  proud: 'calm',
  satisfied: 'calm',
  relaxed: 'calm',
  thinking: 'calm',
  curious: 'surprised',
  surprised: 'surprised',
  warning: 'surprised',
  confused: 'surprised',
  sad: 'sad',
  disappointed: 'sad',
  worried: 'sad',
  angry: 'surprised',
  sleepy: 'calm',
};

// Joyful: bouncy pop-in from below
const JOYFUL_ENTER = { opacity: 0, scale: 0.82, y: 14 };
const JOYFUL_SHOW = { opacity: 1, scale: 1, y: 0 };
const JOYFUL_EXIT = { opacity: 0, scale: 0.82, y: -12 };
const JOYFUL_TRANS = { type: 'spring' as const, stiffness: 320, damping: 22, mass: 0.7 };

// Sad: slow drift downward
const SAD_ENTER = { opacity: 0, scale: 0.96, y: -6 };
const SAD_SHOW = { opacity: 1, scale: 1, y: 0 };
const SAD_EXIT = { opacity: 0, scale: 0.96, y: 10 };
const SAD_TRANS: Transition = { type: 'tween', duration: 0.55, ease: 'easeInOut' };

// Surprised: flash — instant + slight scale overshoot
const SURP_ENTER = { opacity: 0, scale: 0.75 };
const SURP_SHOW = { opacity: 1, scale: 1 };
const SURP_EXIT = { opacity: 0, scale: 1.1 };
const SURP_TRANS = { type: 'spring' as const, stiffness: 500, damping: 28, mass: 0.6 };

// Calm: gentle cross-fade
const CALM_ENTER = { opacity: 0, scale: 0.94 };
const CALM_SHOW = { opacity: 1, scale: 1 };
const CALM_EXIT = { opacity: 0, scale: 0.94 };
const CALM_TRANS: Transition = { type: 'tween', duration: 0.45, ease: 'easeInOut' };

function getTransitionProps(group: TransitionGroup) {
  switch (group) {
    case 'joyful': return { initial: JOYFUL_ENTER, animate: JOYFUL_SHOW, exit: JOYFUL_EXIT, transition: JOYFUL_TRANS };
    case 'sad': return { initial: SAD_ENTER, animate: SAD_SHOW, exit: SAD_EXIT, transition: SAD_TRANS };
    case 'surprised': return { initial: SURP_ENTER, animate: SURP_SHOW, exit: SURP_EXIT, transition: SURP_TRANS };
    case 'calm': return { initial: CALM_ENTER, animate: CALM_SHOW, exit: CALM_EXIT, transition: CALM_TRANS };
  }
}

const FaceContent = memo(function FaceContent({
  emotion,
  blinking,
  animated,
}: {
  emotion: Emotion;
  blinking: boolean;
  animated: boolean;
}) {
  const config = emotionConfigs[emotion];
  const effects = config.effects ?? [];
  const faceAnim = animated ? (config.faceAnimation ?? 'float') : 'none';

  return (
    <div className={`face-layer face-${faceAnim}`} style={{ position: 'absolute', inset: 0 }}>
      <div className="face-aura" />
      <div className="brows">
        <Eyebrow config={config.leftBrow} side="left" />
        <Eyebrow config={config.rightBrow} side="right" />
      </div>
      <div className="eyes">
        <Eye config={config.leftEye} side="left" blinking={blinking} />
        <Eye config={config.rightEye} side="right" blinking={blinking} />
      </div>
      <Cheeks visible={config.cheeks?.visible ?? false} intensity={config.cheeks?.intensity} />
      <Mouth config={config.mouth} />
      <EmotionEffects effects={effects} />
    </div>
  );
});

export function EmotionFace({
  emotion,
  autoBlink = true,
  followPointer = true,
  animated = true,
  className = '',
}: EmotionFaceProps) {
  const ref = usePointerTracking(followPointer);
  const config = emotionConfigs[emotion];

  const canBlink =
    config.leftEye.shape !== 'closed' &&
    config.leftEye.shape !== 'wink' &&
    config.rightEye.shape !== 'closed';

  const blinking = useAutoBlink(autoBlink, canBlink);

  const group = EMOTION_GROUPS[emotion];
  const txProps = getTransitionProps(group);

  return (
    <div
      ref={ref}
      className={`emotion-face ${className}`}
      role="img"
      aria-label={`Biểu cảm ${emotionLabels[emotion]}`}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={emotion}
          initial={txProps.initial}
          animate={txProps.animate}
          exit={txProps.exit}
          transition={txProps.transition}
          style={{ position: 'absolute', inset: 0, transformOrigin: 'center' }}
        >
          <FaceContent emotion={emotion} blinking={blinking} animated={animated} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
