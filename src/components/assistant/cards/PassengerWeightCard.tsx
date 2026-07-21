import React, { useEffect, useRef, useState } from 'react';

export interface PassengerWeightCardProps {
  title: string;
  subtitle?: string;
  weight: number;
  maxWeight?: number;
  iconVariant?: 'friend' | 'boarding-before' | 'boarding-after';
}

function useAnimatedCounter(target: number, duration = 800) {
  const [value, setValue] = useState(target);
  const prevTarget = useRef(target);

  useEffect(() => {
    if (prevTarget.current === target) return;
    const start = prevTarget.current;
    const end = target;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(tick);
      else prevTarget.current = target;
    };

    requestAnimationFrame(tick);
  }, [target, duration]);

  return value;
}

function PersonIcon({ variant }: { variant: 'friend' | 'boarding-before' | 'boarding-after' }) {
  if (variant === 'friend') {
    return (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="11" cy="9" r="5" fill="#C4B5FD"/>
        <ellipse cx="11" cy="23" rx="8" ry="5" fill="#C4B5FD"/>
        <circle cx="22" cy="9" r="5" fill="#DDD6FE"/>
        <ellipse cx="22" cy="23" rx="8" ry="5" fill="#DDD6FE"/>
      </svg>
    );
  }
  if (variant === 'boarding-before') {
    return (
      <svg width="28" height="36" viewBox="0 0 28 36" fill="none">
        <circle cx="14" cy="8" r="6" fill="#94A3B8"/>
        <ellipse cx="14" cy="26" rx="10" ry="7" fill="#94A3B8"/>
        {/* Down arrow */}
        <path d="M14 30 L14 36 M10 33 L14 36 L18 33" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  // boarding-after
  return (
    <svg width="28" height="36" viewBox="0 0 28 36" fill="none">
      <circle cx="14" cy="8" r="6" fill="#8B5CF6"/>
      <ellipse cx="14" cy="26" rx="10" ry="7" fill="#8B5CF6"/>
      {/* Up arrow */}
      <path d="M14 36 L14 30 M10 33 L14 30 L18 33" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function PassengerWeightCard({
  title,
  subtitle,
  weight,
  maxWeight = 250,
  iconVariant = 'friend',
}: PassengerWeightCardProps) {
  const displayWeight = useAnimatedCounter(weight);
  const pct = Math.min((displayWeight / maxWeight) * 100, 100);
  const isAfter = iconVariant === 'boarding-after';

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-sm p-3 w-full">
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-bold text-slate-800">{title}</span>
          {subtitle && <span className="text-[10px] text-slate-400">{subtitle}</span>}
          {/* Weight readout */}
          <div className="flex items-baseline gap-1 mt-1">
            <span className={`text-3xl font-black leading-none ${isAfter ? 'text-purple-600' : 'text-slate-700'}`}>
              {displayWeight}
            </span>
            <span className="text-xs text-slate-400 font-medium">kg / {maxWeight} kg</span>
          </div>
        </div>
        {/* Icon */}
        <div className="flex-shrink-0 pt-1">
          <PersonIcon variant={iconVariant} />
        </div>
      </div>

      {/* Progress bar (only shown for boarding-after and friend states) */}
      {iconVariant !== 'boarding-before' && (
        <div className="mt-2 w-full h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${pct}%`,
              background: 'linear-gradient(90deg, #60A5FA 0%, #8B5CF6 100%)',
            }}
          />
        </div>
      )}
    </div>
  );
}
