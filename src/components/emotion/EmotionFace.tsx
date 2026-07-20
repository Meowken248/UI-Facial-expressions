import { emotionConfigs } from '../../config/emotion.config';
import { emotionLabels } from '../../config/emotion.labels';
import type { Emotion } from '../../types/emotion.types';
import { useAutoBlink } from '../../hooks/useAutoBlink';
import { usePointerTracking } from '../../hooks/usePointerTracking';
import { Eye } from './Eye';import { Eyebrow } from './Eyebrow';import { Mouth } from './Mouth';import { Cheeks } from './Cheeks';import { EmotionEffects } from './EmotionEffects';
export interface EmotionFaceProps {emotion:Emotion;autoBlink?:boolean;followPointer?:boolean;animated?:boolean;className?:string}
export function EmotionFace({emotion,autoBlink=true,followPointer=true,animated=true,className=''}:EmotionFaceProps){const config=emotionConfigs[emotion];const canBlink=config.leftEye.shape==='open'&&config.rightEye.shape==='open';const blinking=useAutoBlink(autoBlink,canBlink);const ref=usePointerTracking(followPointer);return <div ref={ref} className={`emotion-face face-${animated?config.faceAnimation:'none'} ${className}`} role="img" aria-label={`Biểu cảm ${emotionLabels[emotion]}`}><div className="brows"><Eyebrow config={config.leftBrow} side="left"/><Eyebrow config={config.rightBrow} side="right"/></div><div className="eyes"><Eye config={config.leftEye} side="left" blinking={blinking}/><Eye config={config.rightEye} side="right" blinking={blinking}/></div><Cheeks visible={config.cheeks?.visible??false} intensity={config.cheeks?.intensity}/><Mouth config={config.mouth}/><EmotionEffects effects={config.effects}/></div>}
