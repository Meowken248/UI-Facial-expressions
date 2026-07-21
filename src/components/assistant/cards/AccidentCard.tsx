import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { AlertCard } from './AlertCard';

interface AccidentCardProps {
  onCallEmergency?: () => void;
  onShareLocation?: () => void;
  onCancel?: () => void;
}

const TOTAL_SECONDS = 10;
const CIRCUMFERENCE = 2 * Math.PI * 20; // r=20

export function AccidentCard({ onCallEmergency, onShareLocation, onCancel }: AccidentCardProps) {
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (!active || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [active, timeLeft]);

  const handleCancel = useCallback(() => {
    setActive(false);
    setTimeLeft(TOTAL_SECONDS);
    onCancel?.();
  }, [onCancel]);

  const progress = (timeLeft / TOTAL_SECONDS) * CIRCUMFERENCE;
  const ringColor = timeLeft <= 3 ? '#EF4444' : '#F97316';

  return (
    <AlertCard
      variant="danger"
      icon={
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 0.6 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#EF4444">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <line x1="12" y1="17" x2="12.01" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </motion.div>
      }
      title="Nghi ngờ tai nạn"
      description="Tự động gọi hỗ trợ sau 10 giây"
      extra={
        <div className="flex justify-center my-1">
          {/* SVG Countdown Ring */}
          <svg width="48" height="48" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="20" fill="none" stroke="#fee2e2" strokeWidth="4"/>
            <circle
              cx="24" cy="24" r="20"
              fill="none"
              stroke={ringColor}
              strokeWidth="4"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE - progress}
              strokeLinecap="round"
              transform="rotate(-90 24 24)"
              style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }}
            />
            <text x="24" y="28" textAnchor="middle" fontSize="14" fontWeight="bold" fill={ringColor}>
              {timeLeft}
            </text>
          </svg>
        </div>
      }
      actions={[
        {
          label: 'Gọi cấp cứu',
          variant: 'solid',
          color: '#EF4444',
          icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.6 1.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.5 16.5z"/></svg>,
          onClick: onCallEmergency,
        },
        {
          label: 'Chia sẻ vị trí',
          variant: 'outline',
          icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
          onClick: onShareLocation,
        },
      ]}
    />
  );
}
