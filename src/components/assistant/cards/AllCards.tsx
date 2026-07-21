import React from 'react';
import { motion } from 'framer-motion';

/* ── Base card shell ─────────────────────────────────────────────────────────── */
const cardBase: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.85)',
  backdropFilter: 'blur(16px)',
  borderRadius: 24,
  border: '1.5px solid rgba(255, 255, 255, 0.95)',
  boxShadow: '0 8px 32px rgba(15, 23, 42, 0.04)',
  padding: 'clamp(10px, 1.2vw, 18px)',
  width: '100%',
  boxSizing: 'border-box' as const,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
};

const titleStyle: React.CSSProperties = {
  fontSize: 'clamp(12px, 1.3vw, 18px)',
  fontWeight: 750,
  color: '#0f172a',
  lineHeight: 1.2,
  margin: '8px 0 0',
};

const subtitleStyle: React.CSSProperties = {
  fontSize: 'clamp(9px, 0.9vw, 13px)',
  color: '#64748b',
  margin: '4px 0 0',
  lineHeight: 1.3,
  fontWeight: 500,
};

const buttonContainerStyle: React.CSSProperties = {
  display: 'flex',
  gap: 8,
  marginTop: 14,
  width: '100%',
  justifyContent: 'center',
  flexWrap: 'nowrap' as const,
};

const btnBase: React.CSSProperties = {
  flex: 1,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  padding: 'clamp(6px, 0.7vw, 11px) clamp(10px, 1vw, 16px)',
  borderRadius: 14,
  fontSize: 'clamp(10px, 1vw, 13px)',
  fontWeight: 700,
  cursor: 'pointer',
  border: '1.5px solid #e2e8f0',
  background: 'white',
  color: '#334155',
  whiteSpace: 'nowrap' as const,
  boxShadow: '0 2px 6px rgba(15, 23, 42, 0.02)',
  transition: 'all 0.15s',
};

function Btn({ label, icon, color, solid, onClick }: { label: string; icon?: React.ReactNode; color?: string; solid?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...btnBase,
        ...(solid && color ? { background: color, border: 'none', color: 'white', boxShadow: `0 4px 12px ${color}40` } : {}),
      }}
    >
      {icon}
      {label}
    </button>
  );
}

/* ═══ 1. HẾT PIN ════════════════════════════════════════════════════════════════ */
export function LowBatteryCard() {
  return (
    <div style={cardBase}>
      <motion.div
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
        style={{ flexShrink: 0 }}
      >
        <svg width="clamp(36px, 4.2vw, 54px)" height="clamp(28px, 3.2vw, 42px)" viewBox="0 0 32 26" fill="none">
          <rect x="2" y="2" width="24" height="22" rx="5" stroke="#EF4444" strokeWidth="2.5"/>
          <path d="M29 9v8" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M16 6l-4 6h6l-4 6" stroke="#EF4444" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>

      <p style={titleStyle}>Pin sắp hết</p>
      <p style={subtitleStyle}>Vui lòng sạc xe để tiếp tục di chuyển.</p>

      <div style={buttonContainerStyle}>
        <Btn
          label="Tìm trạm sạc"
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          }
        />
        <Btn
          label="Gọi hỗ trợ"
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
          }
        />
      </div>
    </div>
  );
}

/* ═══ 2. XE HỎNG ════════════════════════════════════════════════════════════════ */
export function VehicleErrorCard() {
  return (
    <div style={cardBase}>
      <div style={{ flexShrink: 0 }}>
        <svg width="clamp(32px, 3.8vw, 56px)" height="clamp(32px, 3.8vw, 56px)" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      </div>

      <p style={titleStyle}>Xe đang gặp sự cố</p>
      <p style={subtitleStyle}>Không khuyến nghị tiếp tục di chuyển.</p>

      <div style={buttonContainerStyle}>
        <Btn
          label="Gọi cứu hộ"
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.6 1.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.5 16.5z"/>
            </svg>
          }
        />
        <Btn
          label="Kiểm tra lỗi"
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
          }
        />
      </div>
    </div>
  );
}

/* ═══ 3. VA CHẠM ════════════════════════════════════════════════════════════════ */
export function CollisionCard() {
  return (
    <div style={cardBase}>
      <motion.div
        animate={{ x: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 0.25, ease: 'easeInOut' }}
        style={{ flexShrink: 0 }}
      >
        <svg width="clamp(32px, 3.8vw, 56px)" height="clamp(32px, 3.8vw, 56px)" viewBox="0 0 24 24">
          <polygon points="12,2 22,20 2,20" fill="#F97316" stroke="#EA580C" strokeWidth="1.2"/>
          <text x="12" y="17" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white">!</text>
        </svg>
      </motion.div>

      <p style={titleStyle}>Phát hiện va chạm nhẹ</p>
      <p style={subtitleStyle}>Bạn có cần hỗ trợ không?</p>

      <div style={buttonContainerStyle}>
        <Btn
          label="Tôi ổn"
          solid
          color="#22C55E"
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          }
        />
        <Btn
          label="Gọi người thân"
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          }
        />
      </div>
    </div>
  );
}

/* ═══ 4. TAI NẠN ════════════════════════════════════════════════════════════════ */
const CIRC = 2 * Math.PI * 18;
export function AccidentCard() {
  const [t, setT] = React.useState(10);
  React.useEffect(() => {
    if (t <= 0) return;
    const id = setInterval(() => setT(n => n - 1), 1000);
    return () => clearInterval(id);
  }, [t]);
  const progress = (t / 10) * CIRC;
  const ringColor = t <= 3 ? '#EF4444' : '#F97316';
  return (
    <div style={cardBase}>
      <motion.div
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ repeat: Infinity, duration: 0.6 }}
        style={{ flexShrink: 0 }}
      >
        <svg width="clamp(32px, 3.8vw, 56px)" height="clamp(32px, 3.8vw, 56px)" viewBox="0 0 24 24" fill="#EF4444">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="17" r="1" fill="white"/>
        </svg>
      </motion.div>

      <p style={titleStyle}>Nghi ngờ tai nạn</p>
      <p style={subtitleStyle}>Tự động gọi hỗ trợ sau 10 giây</p>

      {/* Countdown ring */}
      <svg width="clamp(32px, 3.5vw, 48px)" height="clamp(32px, 3.5vw, 48px)" viewBox="0 0 40 40" style={{ flexShrink: 0, marginTop: 8 }}>
        <circle cx="20" cy="20" r="18" fill="none" stroke="#fee2e2" strokeWidth="3"/>
        <circle cx="20" cy="20" r="18" fill="none" stroke={ringColor} strokeWidth="3"
          strokeDasharray={CIRC} strokeDashoffset={CIRC - progress}
          strokeLinecap="round" transform="rotate(-90 20 20)"
          style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }}/>
        <text x="20" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill={ringColor}>{t}</text>
      </svg>

      <div style={buttonContainerStyle}>
        <Btn
          label="Gọi cấp cứu"
          solid
          color="#EF4444"
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.6 1.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.5 16.5z"/>
            </svg>
          }
        />
        <Btn
          label="Chia sẻ vị trí"
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          }
        />
      </div>
    </div>
  );
}

/* ═══ 5. GỌI CỨU HỘ ════════════════════════════════════════════════════════════ */
export function CallingRescueCard() {
  const [s, setS] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setS(n => n + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = String(Math.floor(s / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return (
    <div style={{ ...cardBase, gap: 6 }}>
      {/* Avatar */}
      <div style={{ width: 'clamp(44px,5vw,64px)', height: 'clamp(44px,5vw,64px)', borderRadius: '50%', background: 'linear-gradient(135deg,#818CF8,#60A5FA)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '2px solid white', boxShadow: '0 2px 10px rgba(99,102,241,0.3)' }}>
        <svg width="70%" height="70%" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="14" r="8" fill="#C7D2FE"/>
          <ellipse cx="20" cy="34" rx="14" ry="9" fill="#C7D2FE"/>
          <circle cx="20" cy="13" r="6" fill="#E0E7FF"/>
        </svg>
      </div>
      <div>
        <p style={{ ...titleStyle, margin: '4px 0 0' }}>Đang gọi cứu hộ</p>
        <p style={subtitleStyle}>Trung tâm hỗ trợ 24/7</p>
        <p style={{ fontSize: 'clamp(12px,1.4vw,18px)', fontWeight: 700, color: '#334155', fontFamily: 'monospace', margin: '4px 0 0' }}>{mm}:{ss}</p>
      </div>
      <motion.button
        whileTap={{ scale: 0.9 }}
        style={{ width: 'clamp(36px,4vw,52px)', height: 'clamp(36px,4vw,52px)', borderRadius: '50%', background: '#EF4444', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(239,68,68,0.4)', marginTop: 8 }}
      >
        <svg width="55%" height="55%" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(135deg)' }}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.6 1.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.5 16.5z"/>
        </svg>
      </motion.button>
    </div>
  );
}

/* ═══ 6. CHIA SẺ VỊ TRÍ ════════════════════════════════════════════════════════ */
export function ShareLocationCard() {
  return (
    <div style={cardBase}>
      <div style={{ flexShrink: 0 }}>
        <svg width="clamp(32px, 3.8vw, 56px)" height="clamp(32px, 3.8vw, 56px)" viewBox="0 0 24 24" fill="none">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="#8B5CF6" opacity=".15" stroke="#8B5CF6" strokeWidth="2"/>
          <circle cx="12" cy="10" r="3" fill="#8B5CF6"/>
        </svg>
      </div>

      <p style={titleStyle}>Đã chia sẻ vị trí</p>
      <p style={subtitleStyle}>Người thân có thể theo dõi vị trí của bạn.</p>

      {/* Fake map */}
      <div style={{ margin: '8px 0', borderRadius: 12, overflow: 'hidden', height: 'clamp(32px,4vw,52px)', width: '100%', position: 'relative', background: '#EEF2FF', border: '1px solid #e2e8f0' }}>
        <svg width="100%" height="100%" viewBox="0 0 200 52" preserveAspectRatio="xMidYMid slice">
          <rect width="200" height="52" fill="#EEF2FF"/>
          <line x1="0" y1="26" x2="200" y2="26" stroke="#C7D2FE" strokeWidth="8"/>
          <line x1="60" y1="0" x2="60" y2="52" stroke="#C7D2FE" strokeWidth="6"/>
          <line x1="140" y1="0" x2="140" y2="52" stroke="#C7D2FE" strokeWidth="5"/>
          <rect x="70" y="8" width="25" height="16" rx="3" fill="#DDD6FE"/>
          <rect x="18" y="30" width="20" height="12" rx="3" fill="#DDD6FE"/>
        </svg>
        {/* Pin */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-80%)' }}>
          <svg width="18" height="24" viewBox="0 0 18 24">
            <path d="M9 0C4.03 0 0 4.03 0 9c0 6.75 9 15 9 15s9-8.25 9-15C18 4.03 13.97 0 9 0z" fill="#8B5CF6"/>
            <circle cx="9" cy="9" r="4" fill="white"/>
          </svg>
        </div>
      </div>

      <div style={buttonContainerStyle}>
        <Btn
          label="Gửi cho người thân"
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          }
        />
        <Btn
          label="Dừng chia sẻ"
          solid
          color="#EF4444"
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            </svg>
          }
        />
      </div>
    </div>
  );
}

/* ═══ 7. CHỞ BẠN BÈ ════════════════════════════════════════════════════════════ */
export function CarryingFriendCard() {
  const customCardBase = {
    ...cardBase,
    alignItems: 'stretch' as const,
    textAlign: 'left' as const,
  };
  return (
    <div style={customCardBase}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <p style={{ ...titleStyle, margin: 0 }}>Chở bạn bè</p>
          <p style={subtitleStyle}>Tải trọng hiện tại</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
            <span style={{ fontSize: 'clamp(22px,3vw,42px)', fontWeight: 900, color: '#1e293b', lineHeight: 1 }}>120</span>
            <span style={{ fontSize: 'clamp(8px,0.85vw,12px)', color: '#94a3b8', fontWeight: 500 }}>kg / 250 kg</span>
          </div>
        </div>
        {/* Two-people icon */}
        <svg width="clamp(28px,3.2vw,44px)" height="clamp(28px,3.2vw,44px)" viewBox="0 0 40 40" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="13" cy="11" r="6" fill="#C4B5FD"/>
          <ellipse cx="13" cy="27" rx="9" ry="6" fill="#C4B5FD"/>
          <circle cx="27" cy="11" r="6" fill="#DDD6FE"/>
          <ellipse cx="27" cy="27" rx="9" ry="6" fill="#DDD6FE"/>
        </svg>
      </div>
    </div>
  );
}

/* ═══ 8. LÊN XE (TRƯỚC) ════════════════════════════════════════════════════════ */
export function BoardingBeforeCard() {
  const customCardBase = {
    ...cardBase,
    alignItems: 'stretch' as const,
    textAlign: 'left' as const,
  };
  return (
    <div style={customCardBase}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <p style={{ ...titleStyle, margin: 0 }}>Có người lên xe</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
            <span style={{ fontSize: 'clamp(22px,3vw,42px)', fontWeight: 900, color: '#1e293b', lineHeight: 1 }}>0</span>
            <span style={{ fontSize: 'clamp(8px,0.85vw,12px)', color: '#94a3b8', fontWeight: 500 }}>kg / 250 kg</span>
          </div>
        </div>
        {/* Person + down arrow */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flexShrink: 0 }}>
          <svg width="clamp(22px,2.5vw,34px)" height="clamp(22px,2.5vw,34px)" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="9" r="6" fill="#CBD5E1"/>
            <ellipse cx="16" cy="24" rx="10" ry="6" fill="#CBD5E1"/>
          </svg>
          <svg width="clamp(12px,1.4vw,18px)" height="clamp(12px,1.4vw,18px)" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ═══ 9. LÊN XE (SAU) ══════════════════════════════════════════════════════════ */
function useAnimatedCounter(target: number) {
  const [value, setValue] = React.useState(0);
  const prev = React.useRef(0);
  React.useEffect(() => {
    const start = prev.current; const end = target; const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 700, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(start + (end - start) * ease));
      if (p < 1) requestAnimationFrame(tick); else prev.current = target;
    };
    requestAnimationFrame(tick);
  }, [target]);
  return value;
}

export function BoardingAfterCard() {
  const weight = useAnimatedCounter(120);
  const customCardBase = {
    ...cardBase,
    alignItems: 'stretch' as const,
    textAlign: 'left' as const,
  };
  return (
    <div style={customCardBase}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <p style={{ ...titleStyle, margin: 0 }}>Có người lên xe</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
            <span style={{ fontSize: 'clamp(22px,3vw,42px)', fontWeight: 900, color: '#7C3AED', lineHeight: 1 }}>{weight}</span>
            <span style={{ fontSize: 'clamp(8px,0.85vw,12px)', color: '#94a3b8', fontWeight: 500 }}>kg / 250 kg</span>
          </div>
        </div>
        {/* Person + up arrow (purple) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flexShrink: 0 }}>
          <svg width="clamp(22px,2.5vw,34px)" height="clamp(22px,2.5vw,34px)" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="9" r="6" fill="#8B5CF6"/>
            <ellipse cx="16" cy="24" rx="10" ry="6" fill="#8B5CF6"/>
          </svg>
          <svg width="clamp(12px,1.4vw,18px)" height="clamp(12px,1.4vw,18px)" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ═══ 10. MỤC ĐÍCH CHUYẾN ĐI ═══════════════════════════════════════════════════ */
const PURPOSES = [
  { id: 'friend',    label: 'Chở bạn bè',     bg: '#F5F3FF', border: '#8B5CF6', icon: '👥' },
  { id: 'family',    label: 'Chở người thân',  bg: '#F0FDF4', border: '#22C55E', icon: '👨‍👩‍👧' },
  { id: 'colleague', label: 'Chở đồng nghiệp', bg: '#EFF6FF', border: '#3B82F6', icon: '💼' },
  { id: 'cargo',     label: 'Chở hàng hóa',    bg: '#FFF7ED', border: '#F97316', icon: '📦' },
];

export function TripPurposeCard() {
  const [selected, setSelected] = React.useState('friend');
  return (
    <div style={cardBase}>
      <p style={{ ...titleStyle, margin: 0, textAlign: 'center', marginBottom: 12 }}>Chọn mục đích chuyến đi</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, width: '100%' }}>
        {PURPOSES.map(p => (
          <button key={p.id} onClick={() => setSelected(p.id)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            padding: 'clamp(8px,1vw,14px) 4px',
            borderRadius: 14,
            border: selected === p.id ? `1.5px solid ${p.border}` : '1.5px solid #e2e8f0',
            background: selected === p.id ? p.bg : 'white',
            cursor: 'pointer',
            transition: 'all 0.15s',
            boxShadow: selected === p.id ? `0 2px 8px ${p.border}33` : 'none',
          }}>
            <span style={{ fontSize: 'clamp(16px,1.8vw,24px)' }}>{p.icon}</span>
            <span style={{ fontSize: 'clamp(8px,0.8vw,11px)', fontWeight: 700, color: '#334155', lineHeight: 1.2, textAlign: 'center' }}>{p.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
