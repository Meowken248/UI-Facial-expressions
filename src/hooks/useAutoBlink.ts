import { useEffect, useState } from 'react';
export function useAutoBlink(enabled: boolean, canBlink: boolean) {
  const [blinking,setBlinking]=useState(false);
  useEffect(()=>{ if(!enabled||!canBlink)return; let closeTimer=0; let openTimer=0; const schedule=()=>{ closeTimer=window.setTimeout(()=>{setBlinking(true);openTimer=window.setTimeout(()=>{setBlinking(false);schedule()},150)},3000+Math.random()*4000)}; schedule(); return()=>{clearTimeout(closeTimer);clearTimeout(openTimer)} },[enabled,canBlink]);
  return blinking;
}
