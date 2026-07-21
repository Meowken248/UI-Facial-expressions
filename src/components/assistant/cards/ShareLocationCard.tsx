import React from 'react';
import { AlertCard } from './AlertCard';

interface ShareLocationCardProps {
  onSendToFamily?: () => void;
  onStopSharing?: () => void;
}

export function ShareLocationCard({ onSendToFamily, onStopSharing }: ShareLocationCardProps) {
  return (
    <AlertCard
      variant="success"
      icon={
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="#8B5CF6" opacity=".15" stroke="#8B5CF6" strokeWidth="2"/>
          <circle cx="12" cy="10" r="3" fill="#8B5CF6"/>
        </svg>
      }
      title="Đã chia sẻ vị trí"
      description="Người thân có thể theo dõi vị trí của bạn."
      extra={
        <div className="w-full h-16 rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 border border-purple-100 flex items-center justify-center relative">
          {/* Fake map background */}
          <svg width="100%" height="100%" viewBox="0 0 200 64" preserveAspectRatio="xMidYMid slice">
            <rect width="200" height="64" fill="#EEF2FF"/>
            <line x1="0" y1="32" x2="200" y2="32" stroke="#C7D2FE" strokeWidth="8"/>
            <line x1="60" y1="0" x2="60" y2="64" stroke="#C7D2FE" strokeWidth="8"/>
            <line x1="140" y1="0" x2="140" y2="64" stroke="#C7D2FE" strokeWidth="6"/>
            <rect x="70" y="10" width="30" height="20" rx="3" fill="#DDD6FE"/>
            <rect x="20" y="38" width="25" height="15" rx="3" fill="#DDD6FE"/>
          </svg>
          {/* Pin */}
          <div className="absolute">
            <svg width="28" height="36" viewBox="0 0 28 36">
              <path d="M14 0C6.27 0 0 6.27 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.27 21.73 0 14 0z" fill="#8B5CF6"/>
              <circle cx="14" cy="14" r="6" fill="white"/>
            </svg>
          </div>
        </div>
      }
      actions={[
        {
          label: 'Gửi cho người thân',
          variant: 'outline',
          icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
          onClick: onSendToFamily,
        },
        {
          label: 'Dừng chia sẻ',
          variant: 'solid',
          color: '#FEE2E2',
          icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>,
          onClick: onStopSharing,
        },
      ]}
    />
  );
}
