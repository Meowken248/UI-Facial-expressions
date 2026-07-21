import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type AlertVariant = 'danger' | 'warning' | 'info' | 'success';

export interface AlertAction {
  label: string;
  variant: 'solid' | 'outline';
  color?: string; // e.g. '#22C55E'
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface AlertCardProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  actions?: AlertAction[];
  variant?: AlertVariant;
  extra?: React.ReactNode;
}

const VARIANT_COLORS: Record<AlertVariant, { border: string; iconBg: string }> = {
  danger: { border: 'border-white/20', iconBg: '' },
  warning: { border: 'border-white/20', iconBg: '' },
  info: { border: 'border-white/20', iconBg: '' },
  success: { border: 'border-white/20', iconBg: '' },
};

export function AlertCard({ icon, title, description, actions = [], variant = 'info', extra }: AlertCardProps) {
  const colors = VARIANT_COLORS[variant];
  return (
    <div
      className={`backdrop-blur-md rounded-2xl border ${colors.border} p-3 flex flex-col gap-2 w-full`}
      style={{ background: 'rgba(255, 255, 255, 0.18)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="rounded-xl p-2 flex-shrink-0">
          {icon}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-bold text-slate-800 leading-tight">{title}</span>
          {description && (
            <span className="text-[10px] text-slate-500 leading-tight">{description}</span>
          )}
        </div>
      </div>

      {/* Extra slot (e.g. countdown ring) */}
      {extra}

      {/* Actions */}
      {actions.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {actions.map((action, i) => (
            <button
              key={i}
              onClick={action.onClick}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all active:scale-95 ${action.variant === 'solid'
                ? 'text-white shadow-sm'
                : 'bg-white/20 border border-white/30 text-slate-700 backdrop-blur-sm'
                }`}
              style={action.variant === 'solid' && action.color ? { backgroundColor: action.color } : undefined}
            >
              {action.icon && <span className="flex-shrink-0">{action.icon}</span>}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
