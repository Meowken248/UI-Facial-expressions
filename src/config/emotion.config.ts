import type { Emotion, EmotionConfig, EyeShape, MouthConfig } from '../types/emotion.types';

const eye = (shape: EyeShape = 'open', extras = {}): EmotionConfig['leftEye'] => ({ shape, ...extras });
const mouth = (shape: MouthConfig['shape']): MouthConfig => ({ shape });

const base = (overrides: Partial<EmotionConfig> = {}): EmotionConfig => ({
  leftEye: eye(),
  rightEye: eye(),
  leftBrow: { curve: 'soft' },
  rightBrow: { curve: 'soft' },
  mouth: mouth('smile'),
  cheeks: { visible: true, intensity: 0.72 },
  faceAnimation: 'none',
  ...overrides
});

export const emotionConfigs: Record<Emotion, EmotionConfig> = {
  happy: base(),
  
  excited: base({
    leftEye: eye('star'),
    rightEye: eye('star'),
    mouth: mouth('open'),
    effects: [{ type: 'sparkle', position: 'around' }],
    faceAnimation: 'bounce'
  }),
  
  surprised: base({
    leftEye: eye('open', { pupilScale: 0.55, scale: 1.15 }),
    rightEye: eye('open', { pupilScale: 0.55, scale: 1.15 }),
    leftBrow: { curve: 'raised', translateY: -12 },
    rightBrow: { curve: 'raised', translateY: -12 },
    mouth: mouth('o')
  }),
  
  wink: base({
    rightEye: eye('wink', { closedType: 'down' }),
    mouth: mouth('small-smile')
  }),
  
  laughing: base({
    leftEye: eye('closed', { closedType: 'up' }),
    rightEye: eye('closed', { closedType: 'up' }),
    mouth: mouth('laugh'),
    faceAnimation: 'shake'
  }),
  
  playful: base({
    rightEye: eye('wink', { closedType: 'down' }),
    leftBrow: { rotation: -8 },
    rightBrow: { rotation: 10 },
    mouth: mouth('tongue')
  }),
  
  cute: base({
    leftEye: eye('heart'),
    rightEye: eye('heart'),
    mouth: mouth('wave'),
    effects: [{ type: 'heart', position: 'around' }]
  }),
  
  proud: base({
    leftEye: eye('open', { scale: 0.95 }),
    rightEye: eye('open', { scale: 0.95 }),
    leftBrow: { curve: 'raised' },
    rightBrow: { curve: 'raised' },
    mouth: mouth('small-smile')
  }),
  
  satisfied: base({
    leftEye: eye('closed', { closedType: 'up' }),
    rightEye: eye('closed', { closedType: 'up' }),
    mouth: mouth('small-smile')
  }),
  
  relaxed: base({
    leftEye: eye('closed', { closedType: 'down' }),
    rightEye: eye('closed', { closedType: 'down' }),
    mouth: mouth('small-smile'),
    faceAnimation: 'breathe'
  }),
  
  curious: base({
    leftEye: eye('open', { scale: 1.1, lookX: 6 }),
    rightEye: eye('open', { scale: 0.95, lookX: 6 }),
    leftBrow: { curve: 'raised', rotation: -8 },
    rightBrow: { curve: 'soft', rotation: 4 },
    mouth: mouth('o')
  }),
  
  thinking: base({
    leftEye: eye('open', { lookX: -6, lookY: -6 }),
    rightEye: eye('open', { lookX: -6, lookY: -6 }),
    leftBrow: { curve: 'raised', translateY: -8, rotation: -6 },
    rightBrow: { curve: 'soft', rotation: 8 },
    mouth: mouth('frown'),
    cheeks: { visible: false },
    effects: [{ type: 'thinking-hand', position: 'center' }]
  }),
  
  confused: base({
    leftEye: eye('spiral'),
    rightEye: eye('spiral'),
    leftBrow: { rotation: -12 },
    rightBrow: { rotation: 12 },
    mouth: mouth('wave'),
    faceAnimation: 'breathe'
  }),
  
  sad: base({
    leftEye: eye('watery', { lookY: 6 }),
    rightEye: eye('watery', { lookY: 6 }),
    leftBrow: { curve: 'sad', rotation: 10, translateY: 4 },
    rightBrow: { curve: 'sad', rotation: -10, translateY: 4 },
    mouth: mouth('sad')
  }),
  
  disappointed: base({
    leftEye: eye('watery', { scale: 0.9, lookY: 8 }),
    rightEye: eye('watery', { scale: 0.9, lookY: 8 }),
    leftBrow: { curve: 'sad', translateY: 6 },
    rightBrow: { curve: 'sad', translateY: 6 },
    mouth: mouth('sad'),
    effects: [{ type: 'tear', position: 'right' }]
  }),
  
  angry: base({
    leftEye: eye('fire'),
    rightEye: eye('fire'),
    leftBrow: { curve: 'angry', rotation: 16, translateY: 6 },
    rightBrow: { curve: 'angry', rotation: -16, translateY: 6 },
    mouth: mouth('frown'),
    effects: [{ type: 'anger', position: 'top' }],
    faceAnimation: 'shake',
    cheeks: { visible: false }
  }),
  
  warning: base({
    leftBrow: { curve: 'raised', translateY: -6 },
    rightBrow: { curve: 'raised', translateY: -6 },
    mouth: mouth('open'),
    effects: [{ type: 'warning', position: 'right' }],
    faceAnimation: 'pulse'
  }),
  
  worried: base({
    leftEye: eye('watery', { scale: 0.95 }),
    rightEye: eye('watery', { scale: 0.95 }),
    leftBrow: { curve: 'sad', rotation: 8 },
    rightBrow: { curve: 'sad', rotation: -8 },
    mouth: mouth('wave'),
    effects: [{ type: 'tear', position: 'left' }]
  }),
  
  sleepy: base({
    leftEye: eye('closed', { closedType: 'down' }),
    rightEye: eye('closed', { closedType: 'down' }),
    mouth: mouth('sleep'),
    effects: [{ type: 'zzz', position: 'right' }],
    faceAnimation: 'breathe',
    cheeks: { visible: false }
  }),
  
  love: base({
    leftEye: eye('heart'),
    rightEye: eye('heart'),
    mouth: mouth('laugh'),
    effects: [{ type: 'heart', position: 'around' }],
    faceAnimation: 'bounce'
  })
};
