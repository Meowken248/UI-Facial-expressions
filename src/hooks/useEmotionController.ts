import { useCallback, useEffect, useState } from 'react';
import { emotionOrder } from '../config/emotion.labels';
import type { Emotion } from '../types/emotion.types';
export function useEmotionController(){const [emotion,setEmotion]=useState<Emotion>('happy');const [autoPlay,setAutoPlay]=useState(false);const step=useCallback((delta:number)=>setEmotion(current=>emotionOrder[(emotionOrder.indexOf(current)+delta+emotionOrder.length)%emotionOrder.length]),[]);useEffect(()=>{if(!autoPlay)return;const id=setInterval(()=>step(1),5000);return()=>clearInterval(id)},[autoPlay,step]);return{emotion,setEmotion,autoPlay,setAutoPlay,next:()=>step(1),previous:()=>step(-1)}}
