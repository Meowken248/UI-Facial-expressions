import React from 'react';
import { AlertCard } from './AlertCard';

interface LowBatteryCardProps {
  onFindStation?: () => void;
  onCallSupport?: () => void;
}

export function LowBatteryCard({ onFindStation, onCallSupport }: LowBatteryCardProps) {
  return (
    <AlertCard
      variant="danger"
      icon={
        <div className="animate-pulse">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="16" height="11" rx="2"/>
            <path d="M22 11v4"/>
            <line x1="10" y1="10" x2="8" y2="14" strokeWidth="2"/>
            <line x1="8" y1="14" x2="12" y2="14" strokeWidth="2"/>
            <line x1="12" y1="14" x2="10" y2="18" strokeWidth="2"/>
          </svg>
        </div>
      }
      title="Pin sắp hết"
      description="Vui lòng sạc xe để tiếp tục di chuyển."
      actions={[
        {
          label: 'Tìm trạm sạc',
          variant: 'outline',
          icon: (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          ),
          onClick: onFindStation,
        },
        {
          label: 'Gọi hỗ trợ',
          variant: 'outline',
          icon: (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 18 l2-4 4 2 2-4 4 2 2-4 2 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <circle cx="8.5" cy="8.5" r="2.5"/>
              <path d="M15.5 6a2.5 2.5 0 1 1 0 5"/>
            </svg>
          ),
          onClick: onCallSupport,
        },
      ]}
    />
  );
}
