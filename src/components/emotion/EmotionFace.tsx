import { AnimatePresence, motion } from 'framer-motion';
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

// Spring config for the face-level cross-fade
const FACE_SPRING = { type: 'spring' as const, stiffness: 240, damping: 26, mass: 0.9 };

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
  const crying: EffectConfig[] =
    emotion === 'sad'
      ? [{ type: 'tear', position: 'left' }, { type: 'tear', position: 'right' }]
      : [];
  const effects = [...(config.effects ?? []), ...crying];
  const faceAnim = animated ? config.faceAnimation ?? 'none' : 'none';

  return (
    <div className={`face-layer face-${faceAnim}`} style={{ position: 'absolute', inset: 0 }}>
      <div className="face-aura" />
      <div className="brows">
        <Eyebrow config={config.leftBrow}  side="left"  />
        <Eyebrow config={config.rightBrow} side="right" />
      </div>
      <div className="eyes">
        <Eye config={config.leftEye}  side="left"  blinking={blinking} />
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

  // Allow blink for any "open-ish" eye — includes star, heart, fire, watery
  const canBlink =
    config.leftEye.shape !== 'closed' &&
    config.leftEye.shape !== 'wink'   &&
    config.rightEye.shape !== 'closed';

  const blinking = useAutoBlink(autoBlink, canBlink);

  return (
    <div
      ref={ref}
      className={`emotion-face ${className}`}
      role="img"
      aria-label={`Biểu cảm ${emotionLabels[emotion]}`}
    >
      {/* AnimatePresence with mode="popLayout" to make cross-fades springy */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={emotion}
          initial={{ opacity: 0, scale: 0.88, y: 8 }}
          animate={{ opacity: 1, scale: 1,    y: 0 }}
          exit={{ opacity: 0, scale: 0.88,    y: -8 }}
          transition={FACE_SPRING}
          style={{
            position: 'absolute',
            inset: 0,
            transformOrigin: 'center',
          }}
        >
          <FaceContent emotion={emotion} blinking={blinking} animated={animated} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
