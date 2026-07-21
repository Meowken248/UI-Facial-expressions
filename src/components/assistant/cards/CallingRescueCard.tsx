import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CallingRescueCardProps {
  onHangUp?: () => void;
}

export function CallingRescueCard({ onHangUp }: CallingRescueCardProps) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-blue-100 shadow-sm p-3 flex flex-col items-center gap-2 w-full">
      {/* Avatar */}
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 border-2 border-white shadow flex items-center justify-center overflow-hidden">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="14" r="8" fill="#93C5FD"/>
          <ellipse cx="20" cy="34" rx="13" ry="8" fill="#93C5FD"/>
          <circle cx="20" cy="13" r="6" fill="#BFDBFE"/>
          <path d="M14 18 Q20 28 26 18" stroke="#60A5FA" strokeWidth="2" fill="none"/>
        </svg>
      </div>

      <div className="text-center">
        <p className="text-sm font-bold text-slate-800 leading-tight">Đang gọi cứu hộ</p>
        <p className="text-[10px] text-slate-400">Trung tâm hỗ trợ 24/7</p>
      </div>

      {/* Call Timer */}
      <span className="text-base font-mono font-semibold text-slate-600">{mm}:{ss}</span>

      {/* Hang Up Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onHangUp}
        className="w-12 h-12 rounded-full bg-red-500 shadow-lg flex items-center justify-center"
        aria-label="Cúp máy"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(135deg)' }}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.6 1.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.5 16.5z"/>
        </svg>
      </motion.button>
    </div>
  );
}
