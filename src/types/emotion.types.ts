export type Emotion = 'happy' | 'excited' | 'surprised' | 'wink' | 'laughing' | 'playful' | 'cute' | 'proud' | 'satisfied' | 'relaxed' | 'curious' | 'thinking' | 'confused' | 'sad' | 'disappointed' | 'angry' | 'warning' | 'worried' | 'sleepy' | 'love';
export type EyeShape = 'open' | 'closed' | 'wink' | 'heart' | 'star' | 'spiral' | 'fire' | 'watery';
export interface EyeConfig { shape: EyeShape; scale?: number; pupilScale?: number; lookX?: number; lookY?: number; rotation?: number; closedType?: 'up' | 'down' }
export interface BrowConfig { rotation?: number; translateX?: number; translateY?: number; curve?: 'soft' | 'raised' | 'sad' | 'angry' | 'thinking' }
export interface MouthConfig { shape: 'smile' | 'angry' | 'small-smile' | 'wide-smile' | 'laugh' | 'open' | 'o' | 'sad' | 'frown' | 'tongue' | 'wave' | 'sleep' | 'squiggly'; translateY?: number; scaleX?: number }
export interface EffectConfig { type: 'heart' | 'star' | 'tear' | 'zzz' | 'warning' | 'anger' | 'sparkle' | 'thinking-hand'; position?: 'left' | 'right' | 'top' | 'around' | 'center' }
export interface EmotionConfig { leftEye: EyeConfig; rightEye: EyeConfig; leftBrow: BrowConfig; rightBrow: BrowConfig; mouth: MouthConfig; cheeks?: { visible: boolean; intensity?: number }; effects?: EffectConfig[]; faceAnimation?: 'none' | 'bounce' | 'breathe' | 'shake' | 'pulse' | 'laugh' }
