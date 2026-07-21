import React from 'react';
import { motion } from 'framer-motion';
import { AlertCard } from './AlertCard';

interface CollisionCardProps {
  onImOk?: () => void;
  onCallFamily?: () => void;
}

export function CollisionCard({ onImOk, onCallFamily }: CollisionCardProps) {
  return (
    <AlertCard
      variant="warning"
      icon={
        <motion.div
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 0.3, ease: 'easeInOut' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 19 17 11 6 11 17 19 11 5" fill="#F97316" stroke="#F97316" strokeWidth="1.5"/>
          </svg>
        </motion.div>
      }
      title="Phát hiện va chạm nhẹ"
      description="Bạn có cần hỗ trợ không?"
      actions={[
        {
          label: 'Tôi ổn',
          variant: 'solid',
          color: '#22C55E',
          icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
          onClick: onImOk,
        },
        {
          label: 'Gọi người thân',
          variant: 'outline',
          icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
          onClick: onCallFamily,
        },
      ]}
    />
  );
}
