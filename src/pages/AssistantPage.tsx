import React from 'react';
import '../styles/assistant.css';
import { useAssistantStore } from '../store/assistantStore';
import {
  STATE_TO_EXPRESSION,
  EXPRESSION_TO_EMOTION,
  type AssistantState,
} from '../types/assistant';
import { AssistantShell } from '../components/assistant/AssistantShell';
import { LowBatteryCard } from '../components/assistant/cards/LowBatteryCard';
import { VehicleErrorCard } from '../components/assistant/cards/VehicleErrorCard';
import { CollisionCard } from '../components/assistant/cards/CollisionCard';
import { AccidentCard } from '../components/assistant/cards/AccidentCard';
import { CallingRescueCard } from '../components/assistant/cards/CallingRescueCard';
import { ShareLocationCard } from '../components/assistant/cards/ShareLocationCard';
import { PassengerWeightCard } from '../components/assistant/cards/PassengerWeightCard';
import { TripPurposeCard } from '../components/assistant/cards/TripPurposeCard';

const ALL_STATES: AssistantState[] = [
  'low-battery',
  'vehicle-error',
  'collision',
  'accident',
  'calling-rescue',
  'share-location',
  'carrying-friend',
  'person-boarding-before',
  'person-boarding-after',
  'trip-purpose',
];

const STATE_LABELS: Record<AssistantState, string> = {
  'low-battery':           '1. Hết pin',
  'vehicle-error':         '2. Xe hỏng',
  'collision':             '3. Va chạm',
  'accident':              '4. Tai nạn',
  'calling-rescue':        '5. Gọi cứu hộ',
  'share-location':        '6. Chia sẻ vị trí',
  'carrying-friend':       '7. Chở bạn bè',
  'person-boarding-before':'8. Lên xe (trước)',
  'person-boarding-after': '9. Lên xe (sau)',
  'trip-purpose':          '10. Mục đích',
};

const VOICE_HINTS: Partial<Record<AssistantState, string>> = {
  'carrying-friend':       'Nói: "Chở người thân"',
  'person-boarding-before':'Nói: "Chở bạn bè"',
  'person-boarding-after': 'Nói: "Chở người thân"',
  'trip-purpose':          'Nói hoặc chọn mục tiêu',
};

function InfoCard({ state, store }: { state: AssistantState; store: ReturnType<typeof useAssistantStore.getState> }) {
  switch (state) {
    case 'low-battery':
      return <LowBatteryCard />;
    case 'vehicle-error':
      return <VehicleErrorCard />;
    case 'collision':
      return <CollisionCard />;
    case 'accident':
      return <AccidentCard />;
    case 'calling-rescue':
      return <CallingRescueCard />;
    case 'share-location':
      return <ShareLocationCard />;
    case 'carrying-friend':
      return (
        <PassengerWeightCard
          title="Chở bạn bè"
          subtitle="Tải trọng hiện tại"
          weight={120}
          iconVariant="friend"
        />
      );
    case 'person-boarding-before':
      return (
        <PassengerWeightCard
          title="Có người lên xe"
          weight={0}
          iconVariant="boarding-before"
        />
      );
    case 'person-boarding-after':
      return (
        <PassengerWeightCard
          title="Có người lên xe"
          weight={120}
          iconVariant="boarding-after"
        />
      );
    case 'trip-purpose':
      return (
        <TripPurposeCard
          selected={store.selectedTripPurpose}
          onSelect={store.setSelectedTripPurpose}
        />
      );
  }
}

const GROUP_A: AssistantState[] = ['low-battery', 'vehicle-error', 'collision', 'accident', 'calling-rescue', 'share-location'];
const GROUP_B: AssistantState[] = ['carrying-friend', 'person-boarding-before', 'person-boarding-after', 'trip-purpose'];

export default function AssistantPage() {
  const store = useAssistantStore();
  const { state, setState, speed, battery } = store;

  const expression = STATE_TO_EXPRESSION[state];
  const emotion = EXPRESSION_TO_EMOTION[expression];

  const speedForState = GROUP_A.includes(state) ? 0 : 56;
  const batteryForState = state === 'low-battery' ? 1 : battery;

  const voiceHint = VOICE_HINTS[state] ?? 'Mình có thể giúp gì cho bạn?';

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center p-4 gap-4 font-sans">
      <h1 className="text-xl font-bold text-slate-700">Smart Assistant — Preview</h1>

      {/* 2x5 state selector grid */}
      <div className="flex flex-col gap-2 w-full max-w-2xl">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Nhóm A — Cảnh báo & Sự cố</p>
        <div className="grid grid-cols-3 gap-2">
          {GROUP_A.map((s) => (
            <button
              key={s}
              onClick={() => setState(s)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                state === s
                  ? 'bg-red-500 text-white border-red-400 shadow'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-red-300'
              }`}
            >
              {STATE_LABELS[s]}
            </button>
          ))}
        </div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Nhóm B — Hành khách & Chuyến đi</p>
        <div className="grid grid-cols-4 gap-2">
          {GROUP_B.map((s) => (
            <button
              key={s}
              onClick={() => setState(s)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                state === s
                  ? 'bg-blue-500 text-white border-blue-400 shadow'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
              }`}
            >
              {STATE_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Card Preview */}
      <div className="w-full max-w-md" style={{ aspectRatio: '4/3' }}>
        <AssistantShell
          emotion={emotion}
          speed={speedForState}
          battery={batteryForState}
          stateKey={state}
          voiceHint={voiceHint}
        >
          <InfoCard state={state} store={store} />
        </AssistantShell>
      </div>

      <p className="text-[11px] text-slate-400">Biểu cảm hiện tại: <strong>{expression}</strong> → emotion: <strong>{emotion}</strong></p>
    </div>
  );
}
