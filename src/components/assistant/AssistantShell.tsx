import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EmotionFace } from '../emotion/EmotionFace';
import { StatusBar } from './StatusBar';
import { SpeedGauge } from './SpeedGauge';
import { IconRail } from './IconRail';
import { VoiceHintBar } from './VoiceHintBar';
import type { Emotion } from '../../types/emotion.types';

interface AssistantShellProps {
  emotion: Emotion;
  speed?: number;
  battery?: number;
  stateKey: string;
  voiceHint?: string;
  children: React.ReactNode;
}

const CARD_ENTER = { opacity: 0, y: 12 };
const CARD_SHOW  = { opacity: 1, y: 0 };
const CARD_EXIT  = { opacity: 0, y: -8 };
const CARD_TRANS = { type: 'spring' as const, stiffness: 300, damping: 24, mass: 0.7 };

export function AssistantShell({
  emotion,
  speed = 0,
  battery = 86,
  stateKey,
  voiceHint = 'Mình có thể giúp gì cho bạn?',
  children,
}: AssistantShellProps) {
  return (
    <div className="
      relative flex flex-col
      w-full h-full
      bg-gradient-to-b from-[#EAF0FB] to-[#F5F7FD]
      border border-white/60
      rounded-3xl
      shadow-xl shadow-blue-100/50
      overflow-hidden
    ">
      {/* Top: Status Bar */}
      <StatusBar />

      {/* Middle: 3-column layout */}
      <div className="flex flex-1 items-center px-2 gap-2 min-h-0">
        {/* Left: Speed + Battery */}
        <div className="flex flex-col justify-center w-[22%] flex-shrink-0">
          <SpeedGauge speed={speed} battery={battery} />
        </div>

        {/* Center: Face (top) + InfoCard (bottom) */}
        <div className="flex flex-col flex-1 items-center min-w-0 gap-2 py-1">
          {/* Face */}
          <div className="w-full" style={{ height: 'clamp(80px, 12vh, 150px)' }}>
            <EmotionFace
              emotion={emotion}
              autoBlink
              followPointer
              animated
              className="!w-full !h-full"
            />
          </div>

          {/* Animated card slot */}
          <AnimatePresence mode="wait">
            <motion.div
              key={stateKey}
              initial={CARD_ENTER}
              animate={CARD_SHOW}
              exit={CARD_EXIT}
              transition={CARD_TRANS}
              className="w-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Icon Rail */}
        <div className="flex-shrink-0 w-[10%] flex items-center justify-center">
          <IconRail />
        </div>
      </div>

      {/* Bottom: Voice Hint Bar */}
      <VoiceHintBar hint={voiceHint} />
    </div>
  );
}
