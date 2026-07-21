import React from 'react';
import { motion } from 'framer-motion';

interface VoiceHintBarProps {
  hint?: string;
  isListening?: boolean;
}

// Equalizer bar heights for idle animation
const BAR_HEIGHTS = [0.4, 0.8, 0.5, 1.0, 0.6, 0.3, 0.75];

export function VoiceHintBar({ hint = 'Mình có thể giúp gì cho bạn?', isListening = false }: VoiceHintBarProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 mt-auto">
      {/* Waveform / Mic */}
      <div className="flex items-end gap-[2px] h-4">
        {isListening ? (
          // Active: red mic pulse
          <motion.span
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="text-red-500 text-base leading-none"
          >
            🎙️
          </motion.span>
        ) : (
          // Idle: equalizer bars
          BAR_HEIGHTS.map((h, i) => (
            <motion.div
              key={i}
              className="w-[3px] rounded-full bg-gradient-to-t from-blue-400 to-purple-400"
              animate={{ scaleY: [h, h * 0.4, h] }}
              transition={{
                repeat: Infinity,
                duration: 0.9 + i * 0.08,
                delay: i * 0.07,
                ease: 'easeInOut',
              }}
              style={{ height: '100%', transformOrigin: 'bottom' }}
            />
          ))
        )}
      </div>

      {/* Hint text */}
      <span className="text-xs text-slate-500 font-medium">{hint}</span>
    </div>
  );
}
