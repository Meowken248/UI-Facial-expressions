import React from 'react';

interface StatusBarProps {
  time?: string;
  temperature?: number;
  driveMode?: string;
  status?: string;
}

export function StatusBar({
  time = '10:30',
  temperature = 28,
  driveMode = 'D',
  status = 'READY',
}: StatusBarProps) {
  return (
    <div className="flex items-center justify-between w-full px-4 pt-3 pb-1">
      {/* Drive mode + status */}
      <div className="flex flex-col items-center leading-none">
        <span className="text-lg font-black text-green-500">{driveMode}</span>
        <span className="text-[9px] font-bold text-green-500 tracking-widest">{status}</span>
      </div>

      {/* Time */}
      <span className="text-sm font-semibold text-slate-600">{time}</span>

      {/* Weather */}
      <div className="flex items-center gap-1">
        <span className="text-base">☀️</span>
        <span className="text-xs font-semibold text-slate-600">{temperature}°C</span>
      </div>
    </div>
  );
}
