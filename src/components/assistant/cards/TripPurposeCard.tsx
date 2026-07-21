import React, { useState } from 'react';
import { TRIP_PURPOSES } from '../../../types/assistant';

interface TripPurposeCardProps {
  selected?: string;
  onSelect?: (id: string) => void;
}

export function TripPurposeCard({ selected = 'friend', onSelect }: TripPurposeCardProps) {
  const [localSelected, setLocalSelected] = useState(selected);

  const handleSelect = (id: string) => {
    setLocalSelected(id);
    onSelect?.(id);
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-sm p-3 w-full">
      <p className="text-sm font-bold text-slate-700 text-center mb-2">Chọn mục đích chuyến đi</p>
      <div className="grid grid-cols-4 gap-2">
        {TRIP_PURPOSES.map((p) => {
          const isSelected = localSelected === p.id;
          return (
            <button
              key={p.id}
              onClick={() => handleSelect(p.id)}
              className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl transition-all border text-center ${
                isSelected
                  ? 'border-purple-400 bg-purple-50 shadow-sm shadow-purple-100'
                  : 'border-slate-100 bg-white/60 hover:bg-white/90'
              }`}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-3xl"
                style={{ backgroundColor: p.bgColor }}
              >
                {p.icon}
              </div>
              <span className="text-[9px] font-semibold text-slate-600 leading-tight">{p.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
