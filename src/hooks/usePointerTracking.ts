import { useEffect, useRef } from 'react';
export function usePointerTracking(enabled: boolean) {
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{const node=ref.current;if(!node||!enabled)return;const move=(e:PointerEvent)=>{const r=node.getBoundingClientRect();const x=Math.max(-1,Math.min(1,(e.clientX-r.left-r.width/2)/(r.width/2)));const y=Math.max(-1,Math.min(1,(e.clientY-r.top-r.height/2)/(r.height/2)));node.style.setProperty('--pointer-x',String(x*8));node.style.setProperty('--pointer-y',String(y*6))};const leave=()=>{node.style.setProperty('--pointer-x','0');node.style.setProperty('--pointer-y','0')};node.addEventListener('pointermove',move);node.addEventListener('pointerleave',leave);return()=>{node.removeEventListener('pointermove',move);node.removeEventListener('pointerleave',leave)}},[enabled]);
  return ref;
}
