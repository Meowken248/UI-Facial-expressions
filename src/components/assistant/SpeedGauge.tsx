import React from 'react';

interface SpeedGaugeProps {
  speed?: number;
  battery?: number;
  batteryColor?: 'blue' | 'red';
}

export function SpeedGauge({ speed = 0, battery = 86, batteryColor = 'blue' }: SpeedGaugeProps) {
  const isLow = battery <= 20;
  const segments = 7;
  const filledCount = Math.round((battery / 100) * segments);

  return (
    <div className="flex flex-col items-start gap-1 px-4">
      {/* Speed */}
      <div className="flex items-baseline gap-0.5">
        <span className="text-5xl font-black text-slate-800 leading-none tracking-tight">{speed}</span>
        <span className="text-[10px] font-semibold text-slate-400 leading-none mt-auto mb-1">km/h</span>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-slate-200 my-1" />

      {/* Battery */}
      <div className="flex flex-col gap-0.5 w-full">
        <span className={`text-sm font-bold leading-none ${isLow ? 'text-red-500 animate-pulse' : 'text-slate-700'}`}>
          {battery}%
        </span>
        {/* Segmented bar */}
        <div className={`relative flex rounded-full overflow-hidden border h-3 w-full ${isLow ? 'border-red-400' : 'border-indigo-400'}`}>
          {Array.from({ length: segments }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 ${i < filledCount
                ? isLow
                  ? 'bg-red-500'
                  : `bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500`
                : 'bg-transparent'
              } ${i > 0 ? 'border-l border-white/40' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
