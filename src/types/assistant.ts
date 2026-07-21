import type { Emotion } from './emotion.types';

export type FaceExpression =
  | 'neutral'
  | 'worried'
  | 'shocked'
  | 'sad'
  | 'happy'
  | 'calm';

export type AssistantState =
  | 'low-battery'
  | 'vehicle-error'
  | 'collision'
  | 'accident'
  | 'calling-rescue'
  | 'share-location'
  | 'carrying-friend'
  | 'person-boarding-before'
  | 'person-boarding-after'
  | 'trip-purpose';

// Map FaceExpression -> existing Emotion type
export const EXPRESSION_TO_EMOTION: Record<FaceExpression, Emotion> = {
  neutral:  'relaxed',
  worried:  'worried',
  shocked:  'surprised',
  sad:      'sad',
  happy:    'happy',
  calm:     'satisfied',
};

// Map AssistantState -> FaceExpression
export const STATE_TO_EXPRESSION: Record<AssistantState, FaceExpression> = {
  'low-battery':           'worried',
  'vehicle-error':         'worried',
  'collision':             'shocked',
  'accident':              'sad',
  'calling-rescue':        'neutral',
  'share-location':        'happy',
  'carrying-friend':       'neutral',
  'person-boarding-before':'neutral',
  'person-boarding-after': 'happy',
  'trip-purpose':          'happy',
};

export interface TripPurposeOption {
  id: string;
  label: string;
  color: string;
  bgColor: string;
  icon: string;
}

export const TRIP_PURPOSES: TripPurposeOption[] = [
  { id: 'friend',    label: 'Chở bạn bè',      color: '#8B5CF6', bgColor: '#EDE9FE', icon: '👥' },
  { id: 'family',    label: 'Chở người thân',   color: '#22C55E', bgColor: '#DCFCE7', icon: '👨‍👩‍👧' },
  { id: 'colleague', label: 'Chở đồng nghiệp',  color: '#3B82F6', bgColor: '#DBEAFE', icon: '💼' },
  { id: 'cargo',     label: 'Chở hàng hóa',     color: '#F97316', bgColor: '#FFEDD5', icon: '📦' },
];
