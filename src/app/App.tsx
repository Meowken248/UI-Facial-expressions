import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EmotionScreen } from '../components/dashboard/EmotionScreen';
import { EmotionControls } from '../components/controls/EmotionControls';
import { useEmotionController } from '../hooks/useEmotionController';
import { useAssistantStore } from '../store/assistantStore';
import '../styles/assistant.css';

import {
  LowBatteryCard,
  VehicleErrorCard,
  CollisionCard,
  AccidentCard,
  CallingRescueCard,
  ShareLocationCard,
  CarryingFriendCard,
  BoardingBeforeCard,
  BoardingAfterCard,
  TripPurposeCard,
} from '../components/assistant/cards/AllCards';
import type { Emotion } from '../types/emotion.types';
import type { AssistantState } from '../types/assistant';

// ── State → Emotion (face expression) ────────────────────────────────────────
const STATE_EMOTION: Record<AssistantState, Emotion> = {
  'low-battery': 'worried',
  'vehicle-error': 'worried',
  'collision': 'surprised',
  'accident': 'sad',
  'calling-rescue': 'proud',
  'share-location': 'happy',
  'carrying-friend': 'satisfied',
  'person-boarding-before': 'proud',
  'person-boarding-after': 'laughing',
  'trip-purpose': 'happy',
};

// ── State → battery % ─────────────────────────────────────────────────────────
const STATE_BATTERY: Record<AssistantState, number> = {
  'low-battery': 1,
  'vehicle-error': 86,
  'collision': 86,
  'accident': 86,
  'calling-rescue': 86,
  'share-location': 86,
  'carrying-friend': 86,
  'person-boarding-before': 86,
  'person-boarding-after': 86,
  'trip-purpose': 86,
};

const GROUP_A: AssistantState[] = [
  'low-battery', 'vehicle-error', 'collision', 'accident', 'calling-rescue', 'share-location',
];

const VOICE_HINTS: Record<AssistantState, string> = {
  'low-battery': 'Mình có thể giúp gì cho bạn?',
  'vehicle-error': 'Mình có thể giúp gì cho bạn?',
  'collision': 'Mình có thể giúp gì cho bạn?',
  'accident': 'Mình có thể giúp gì cho bạn?',
  'calling-rescue': 'Mình có thể giúp gì cho bạn?',
  'share-location': 'Mình có thể giúp gì cho bạn?',
  'carrying-friend': "Nói: \"Chở người thân\"",
  'person-boarding-before': "Nói: \"Chở bạn bè\"",
  'person-boarding-after': "Nói: \"Chở người thân\"",
  'trip-purpose': 'Nói hoặc chọn mục tiêu',
};

const STATE_LABELS: Record<AssistantState, string> = {
  'low-battery': '1. Hết pin',
  'vehicle-error': '2. Xe hỏng',
  'collision': '3. Va chạm',
  'accident': '4. Tai nạn',
  'calling-rescue': '5. Gọi cứu hộ',
  'share-location': '6. Chia sẻ vị trí',
  'carrying-friend': '7. Chở bạn bè',
  'person-boarding-before': '8. Lên xe (trước)',
  'person-boarding-after': '9. Lên xe (sau)',
  'trip-purpose': '10. Mục đích',
};

const ALL_STATES = Object.keys(STATE_LABELS) as AssistantState[];

function renderCard(state: AssistantState) {
  switch (state) {
    case 'low-battery': return <LowBatteryCard />;
    case 'vehicle-error': return <VehicleErrorCard />;
    case 'collision': return <CollisionCard />;
    case 'accident': return <AccidentCard />;
    case 'calling-rescue': return <CallingRescueCard />;
    case 'share-location': return <ShareLocationCard />;
    case 'carrying-friend': return <CarryingFriendCard />;
    case 'person-boarding-before': return <BoardingBeforeCard />;
    case 'person-boarding-after': return <BoardingAfterCard />;
    case 'trip-purpose': return <TripPurposeCard />;
  }
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const controller = useEmotionController();
  const store = useAssistantStore();
  const [autoBlink, setAutoBlink] = useState(true);
  const [followPointer, setFollowPointer] = useState(true);
  const [animated, setAnimated] = useState(true);
  const [assistantMode, setAssistantMode] = useState(true);
  const screenRef = useRef<HTMLDivElement>(null);

  const fullscreen = useCallback(async () => {
    if (!document.fullscreenElement && screenRef.current?.requestFullscreen)
      await screenRef.current.requestFullscreen();
  }, []);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
      if (!assistantMode) {
        if (e.key === 'ArrowLeft') controller.previous();
        if (e.key === 'ArrowRight') controller.next();
        if (e.code === 'Space') { e.preventDefault(); controller.setAutoPlay(!controller.autoPlay); }
      } else {
        const idx = ALL_STATES.indexOf(store.state);
        if (e.key === 'ArrowLeft') store.setState(ALL_STATES[Math.max(0, idx - 1)]);
        if (e.key === 'ArrowRight') store.setState(ALL_STATES[Math.min(ALL_STATES.length - 1, idx + 1)]);
      }
      if (e.key.toLowerCase() === 'f') void fullscreen();
      if (e.key.toLowerCase() === 'a') setAssistantMode(v => !v);
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [controller, fullscreen, assistantMode, store]);

  const infoCard = assistantMode ? (
    <AnimatePresence mode="wait">
      <motion.div key={store.state}
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}>
        {renderCard(store.state)}
      </motion.div>
    </AnimatePresence>
  ) : undefined;

  return (
    <main>


      {/* ── Device frame ── */}
      <div className="stage" ref={screenRef}>
        <div className="device-frame">
          <EmotionScreen
            emotion={assistantMode ? STATE_EMOTION[store.state] : controller.emotion}
            speed={assistantMode ? (GROUP_A.includes(store.state) ? 0 : 56) : 0}
            battery={assistantMode ? STATE_BATTERY[store.state] : 80}
            rangeKm={120}
            autoBlink={autoBlink}
            followPointer={followPointer}
            animated={animated}
            assistantMode={assistantMode}
            infoCard={infoCard}
            voiceHint={assistantMode ? VOICE_HINTS[store.state] : undefined}
            currentState={store.state}
          />
        </div>
      </div>

      {/* ── State selector pills (below device frame) ── */}
      {assistantMode ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
          {ALL_STATES.map((s) => {
            const isGroupA = GROUP_A.includes(s);
            const isActive = store.state === s;
            return (
              <button key={s} onClick={() => store.setState(s)} style={{
                padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                border: isActive ? 'none' : '1.5px solid #e2e8f0',
                background: isActive ? (isGroupA ? '#EF4444' : '#3B82F6') : '#fff',
                color: isActive ? '#fff' : '#475569',
                transition: 'all 0.15s',
                boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
              }}>
                {STATE_LABELS[s]}
              </button>
            );
          })}
        </div>
      ) : (
        <EmotionControls
          emotion={controller.emotion}
          onSelect={controller.setEmotion}
          onPrevious={controller.previous}
          onNext={controller.next}
          autoBlink={autoBlink} setAutoBlink={setAutoBlink}
          followPointer={followPointer} setFollowPointer={setFollowPointer}
          animated={animated} setAnimated={setAnimated}
          autoPlay={controller.autoPlay} setAutoPlay={controller.setAutoPlay}
          onFullscreen={() => void fullscreen()}
        />
      )}
    </main>
  );
}
