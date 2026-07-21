import React from 'react';
import { motion } from 'framer-motion';

/* ── Base card shell ─────────────────────────────────────────────────────────── */
const cardBase: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.88)',
  backdropFilter: 'blur(18px)',
  borderRadius: 24,
  border: '1.5px solid rgba(255, 255, 255, 0.95)',
  boxShadow: '0 8px 32px rgba(15, 23, 42, 0.04)',
  padding: 'clamp(10px, 1.2vw, 16px)',
  width: '100%',
  boxSizing: 'border-box' as const,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: 6,
};

const titleStyle: React.CSSProperties = {
  fontSize: 'clamp(12px, 1.3vw, 17px)',
  fontWeight: 750,
  color: '#0f172a',
  lineHeight: 1.2,
  margin: 0,
};

const subtitleStyle: React.CSSProperties = {
  fontSize: 'clamp(9px, 0.9vw, 12px)',
  color: '#64748b',
  margin: 0,
  lineHeight: 1.3,
  fontWeight: 500,
};

const buttonContainerStyle: React.CSSProperties = {
  display: 'flex',
  gap: 8,
  marginTop: 6,
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
  padding: 'clamp(6px, 0.7vw, 10px) clamp(10px, 1vw, 14px)',
  borderRadius: 14,
  fontSize: 'clamp(10px, 0.95vw, 12px)',
  fontWeight: 700,
  cursor: 'pointer',
  border: '1.5px solid #e2e8f0',
  background: 'white',
  color: '#334155',
  whiteSpace: 'nowrap' as const,
  boxShadow: '0 2px 6px rgba(15, 23, 42, 0.02)',
  transition: 'all 0.15s',
};

function Btn({ label, icon, borderColor, color, onClick }: { label: string; icon?: React.ReactNode; borderColor?: string; color?: string; onClick?: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      style={{
        ...btnBase,
        ...(borderColor ? { borderColor } : {}),
        ...(color ? { color } : {}),
      }}
    >
      {icon}
      {label}
    </motion.button>
  );
}

// Helper for top circular icon background (Enlarged)
const iconCircleStyle = (bgColor: string): React.CSSProperties => ({
  width: 'clamp(80px, 8.5vw, 120px)',
  height: 'clamp(80px, 8.5vw, 120px)',
  borderRadius: '50%',
  background: bgColor,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

/* ═══ 1. HẾT PIN ════════════════════════════════════════════════════════════════ */
export function LowBatteryCard() {
  return (
    <div style={cardBase}>
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        style={{ flexShrink: 0, marginBottom: 4 }}
      >
        <svg width="clamp(72px, 8vw, 108px)" height="clamp(38px, 4.2vw, 58px)" viewBox="0 0 44 24" fill="none">
          <rect x="2" y="2" width="36" height="20" rx="4" stroke="#EF4444" strokeWidth="2.5" />
          <path d="M41 8v8" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
          <motion.path
            d="M21 6l-4 6h6l-4 6"
            stroke="#EF4444"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
          />
        </svg>
      </motion.div>

      <p style={titleStyle}>Pin sắp hết</p>
      <p style={subtitleStyle}>Vui lòng sạc xe để tiếp tục di chuyển.</p>

      <div style={buttonContainerStyle}>
        <Btn
          label="Tìm trạm sạc"
          borderColor="#DDD6FE"
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          }
        />
        <Btn
          label="Gọi hỗ trợ"
          borderColor="#BFDBFE"
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
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
      <motion.div
        animate={{ rotate: [-6, 6, -6] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        style={iconCircleStyle('#F5F3FF')}
      >
        <svg width="68%" height="68%" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      </motion.div>

      <p style={titleStyle}>Xe đang gặp sự cố</p>
      <p style={subtitleStyle}>Không khuyến nghị tiếp tục di chuyển.</p>

      <div style={buttonContainerStyle}>
        <Btn
          label="Gọi cứu hộ"
          borderColor="#DDD6FE"
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.6 1.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.5 16.5z" />
            </svg>
          }
        />
        <Btn
          label="Kiểm tra lỗi"
          borderColor="#BFDBFE"
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
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
      {/* Sparkle/collision rays (Enlarged) */}
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 0.5, ease: 'easeInOut' }}
        style={{ flexShrink: 0, marginBottom: 4 }}
      >
        <svg width="clamp(76px, 8.5vw, 110px)" height="clamp(60px, 7vw, 90px)" viewBox="0 0 48 36" fill="none">
          {/* Top rays */}
          <path d="M24 4v4M17 6l2 3M31 6l-2 3" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
          {/* Left collision shape */}
          <path d="M8 26l8-12 5 4-5 10H8z" fill="#F97316" />
          {/* Right collision shape */}
          <path d="M40 26l-8-12-5 4 5 10h8z" fill="#F97316" />
          {/* Center sparkle */}
          <path d="M24 10l1.5 4.5L30 16l-4.5 1.5L24 22l-1.5-4.5L18 16l4.5-1.5L24 10z" fill="#F97316" />
        </svg>
      </motion.div>

      <p style={titleStyle}>Phát hiện va chạm nhẹ</p>
      <p style={subtitleStyle}>Bạn có cần hỗ trợ không?</p>

      <div style={buttonContainerStyle}>
        <Btn
          label="Tôi ổn"
          borderColor="#DDD6FE"
          icon={
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6C3BFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          }
        />
        <Btn
          label="Gọi người thân"
          borderColor="#BFDBFE"
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
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
    <div style={{ ...cardBase, background: 'rgba(254, 242, 242, 0.92)', borderColor: 'rgba(252, 165, 165, 0.5)' }}>
      {/* Standalone large warning triangle (Enlarged) */}
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ repeat: Infinity, duration: 0.6, ease: 'easeOut' }}
        style={{ flexShrink: 0, marginBottom: 4 }}
      >
        <svg width="clamp(80px, 9vw, 120px)" height="clamp(70px, 7.8vw, 106px)" viewBox="0 0 32 28" fill="none">
          <path d="M16 2L2 26h28L16 2z" fill="#EF4444" />
          <rect x="15" y="10" width="2" height="8" rx="1" fill="white" />
          <circle cx="16" cy="21" r="1.5" fill="white" />
        </svg>
      </motion.div>

      <p style={{ ...titleStyle, color: '#0f172a' }}>Nghi ngờ tai nạn</p>

      {/* Subtitle with countdown circle inline to the right */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', marginTop: 2 }}>
        <p style={{ ...subtitleStyle, color: '#475569' }}>Tự động gọi hỗ trợ sau 10 giây</p>

        <svg width="28" height="28" viewBox="0 0 40 40" style={{ flexShrink: 0 }}>
          <circle cx="20" cy="20" r="18" fill="none" stroke="#fee2e2" strokeWidth="3" />
          <circle cx="20" cy="20" r="18" fill="none" stroke={ringColor} strokeWidth="3"
            strokeDasharray={CIRC} strokeDashoffset={CIRC - progress}
            strokeLinecap="round" transform="rotate(-90 20 20)"
            style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }} />
          <text x="20" y="24" textAnchor="middle" fontSize="12" fontWeight="800" fill={ringColor}>{t}</text>
        </svg>
      </div>

      <div style={buttonContainerStyle}>
        <Btn
          label="Gọi cấp cứu"
          borderColor="#FCA5A5"
          color="#EF4444"
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.6 1.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.5 16.5z" />
            </svg>
          }
        />
        <Btn
          label="Chia sẻ vị trí"
          borderColor="#BFDBFE"
          color="#2563EB"
          icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
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
    <div style={{ ...cardBase, gap: 5 }}>
      {/* Circle operator avatar wrapper (Enlarged) */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
        <motion.div
          animate={{ scale: [0.98, 1.3, 0.98], opacity: [0.4, 0, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          style={{ position: 'absolute', width: 'clamp(84px, 9vw, 120px)', height: 'clamp(84px, 9vw, 120px)', borderRadius: '50%', border: '2.5px solid #3B82F6' }}
        />
        <div style={{ position: 'relative', width: 'clamp(84px, 9vw, 120px)', height: 'clamp(84px, 9vw, 120px)', borderRadius: '50%', overflow: 'hidden', border: '2.5px solid white', boxShadow: '0 4px 14px rgba(59, 130, 246, 0.15)' }}>
          {/* Detailed Operator Vector illustration */}
          <svg width="100%" height="100%" viewBox="0 0 80 80" fill="none">
            {/* Background */}
            <circle cx="40" cy="40" r="40" fill="#EFF6FF" />
            {/* Hair back */}
            <path d="M24 38c0-10 6-16 16-16s16 6 16 16v12H24V38z" fill="#4A3728" />
            {/* Face */}
            <path d="M30 38c0-5.5 4.5-10 10-10s10 4.5 10 10v6c0 5.5-4.5 10-10 10s-10-4.5-10-10v-6z" fill="#FDD2C4" />
            {/* Hair front */}
            <path d="M24 32c2-8 8-10 16-10s14 2 16 10c0 0-4-6-16-6S24 32 24 32z" fill="#3D2E23" />
            <path d="M24 32c1 3 3 5 5 2" stroke="#3D2E23" strokeWidth="2" strokeLinecap="round" />
            {/* Eyes */}
            <circle cx="36" cy="37" r="2.5" fill="#334155" />
            <circle cx="44" cy="37" r="2.5" fill="#334155" />
            {/* Mouth */}
            <path d="M37 44q3 2 6 0" stroke="#E11D48" strokeWidth="1.8" strokeLinecap="round" />
            {/* Headphones */}
            <rect x="22" y="34" width="6" height="12" rx="3" fill="#2563EB" />
            <rect x="52" y="34" width="6" height="12" rx="3" fill="#2563EB" />
            <path d="M25 34c0-12 6-15 15-15s15 3 15 15" stroke="#2563EB" strokeWidth="2.5" fill="none" />
            <path d="M28 42h4c3 0 4 3 4 5" stroke="#2563EB" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Shirt */}
            <path d="M20 62c4-8 10-10 20-10s16 2 20 10H20z" fill="#2563EB" />
            <path d="M40 52v5" stroke="#FDD2C4" strokeWidth="2" />
            <path d="M34 57l6 3 6-3" fill="#EFF6FF" />
          </svg>
        </div>
      </div>

      <p style={titleStyle}>Đang gọi cứu hộ</p>
      <p style={subtitleStyle}>Trung tâm hỗ trợ 24/7</p>
      <p style={{ fontSize: 'clamp(11px,1.2vw,14px)', fontWeight: 750, color: '#64748b', fontFamily: 'monospace', margin: 0 }}>{mm}:{ss}</p>

      {/* End call red pill button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: 'clamp(90px, 10vw, 130px)',
          height: 'clamp(32px, 3.5vw, 44px)',
          borderRadius: 20,
          background: '#EF4444',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(239,68,68,0.3)',
          marginTop: 6
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(135deg)' }}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.6 1.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.5 16.5z" />
        </svg>
      </motion.button>
    </div>
  );
}

/* ═══ 6. CHIA SẺ VỊ TRÍ (ĐÃ SỬA) ═══════════════════════════════════════════════
   Fix 1: thêm alignItems:'stretch' + textAlign:'left' để không bị kế thừa
          textAlign:'center' từ cardBase (đây là NGUYÊN NHÂN GỐC khiến chữ
          bị canh giữa thay vì canh trái).
   Fix 2: icon "Gửi cho người thân" đổi từ icon chuông (Bell) sai sang icon
          share/gửi đúng.
   Fix 3: icon "Dừng chia sẻ" đổi từ hình vuông viền rỗng sang hình vuông
          ĐẶC màu đỏ như bản mẫu.
──────────────────────────────────────────────────────────────────────────── */
export function ShareLocationCard() {
  return (
    <div
      style={{
        ...cardBase,
        padding: 0,
        overflow: 'hidden',
        gap: 0,
        alignItems: 'stretch',   // ← FIX: không kế thừa alignItems:'center'
        textAlign: 'left',       // ← FIX: không kế thừa textAlign:'center'
      }}
    >
      {/* Map as Header Background */}
      <div style={{ height: 'clamp(84px, 9vw, 120px)', width: '100%', position: 'relative', background: '#EEF2F6', borderBottom: '1px solid #e2e8f0' }}>
        {/* Vector Grid Map Background with Perspective Roads & Land Zones */}
        <svg width="100%" height="100%" viewBox="0 0 200 84" preserveAspectRatio="xMidYMid slice">
          <rect width="200" height="84" fill="#F4F6F9"/>
          
          {/* Faded green land zones (Parks) */}
          <path d="M -10,-10 L 55,-10 L 45,35 L -10,25 Z" fill="#EBFDF5" stroke="#D1FAE5" strokeWidth="0.5"/>
          <path d="M 145,-10 L 210,-10 L 210,45 L 155,30 Z" fill="#EBFDF5" stroke="#D1FAE5" strokeWidth="0.5"/>
          <path d="M -10,65 L 50,55 L 35,95 L -10,95 Z" fill="#EBFDF5" stroke="#D1FAE5" strokeWidth="0.5"/>
          <path d="M 155,95 L 210,65 L 210,95 Z" fill="#EBFDF5" stroke="#D1FAE5" strokeWidth="0.5"/>

          {/* Perspective grid lines */}
          <line x1="100" y1="56" x2="-20" y2="-10" stroke="#E2E8F0" strokeWidth="0.8" opacity="0.6"/>
          <line x1="100" y1="56" x2="220" y2="-10" stroke="#E2E8F0" strokeWidth="0.8" opacity="0.6"/>
          <line x1="100" y1="56" x2="-20" y2="100" stroke="#E2E8F0" strokeWidth="0.8" opacity="0.6"/>
          <line x1="100" y1="56" x2="220" y2="100" stroke="#E2E8F0" strokeWidth="0.8" opacity="0.6"/>
          
          {/* Main roads */}
          <path d="M -20,62 Q 60,48 100,56 T 220,50" stroke="#FFFFFF" strokeWidth="8" fill="none" opacity="0.9"/>
          <path d="M -20,62 Q 60,48 100,56 T 220,50" stroke="#E2E8F0" strokeWidth="1.5" fill="none"/>
          
          <path d="M 100,94 Q 90,65 100,56 T 110,-10" stroke="#FFFFFF" strokeWidth="6" fill="none" opacity="0.9"/>
          <path d="M 100,94 Q 90,65 100,56 T 110,-10" stroke="#E2E8F0" strokeWidth="1.5" fill="none"/>

          <path d="M -10,0 Q 50,30 100,56" stroke="#FFFFFF" strokeWidth="5" fill="none" opacity="0.8"/>
          <path d="M -10,0 Q 50,30 100,56" stroke="#E2E8F0" strokeWidth="1" fill="none"/>
          
          <path d="M 210,95 Q 150,70 100,56" stroke="#FFFFFF" strokeWidth="5" fill="none" opacity="0.8"/>
          <path d="M 210,95 Q 150,70 100,56" stroke="#E2E8F0" strokeWidth="1" fill="none"/>
          
          {/* Static pin landing shadow target on the road intersection (centered vertically at 56px) */}
          <ellipse cx="100" cy="56" rx="8" ry="3.2" fill="#7C3AED" opacity="0.16"/>
          <ellipse cx="100" cy="56" rx="3.5" ry="1.6" fill="#7C3AED" opacity="0.35"/>
        </svg>
        {/* Bouncing pin anchored exactly on the shadow at 56px */}
        <div
          style={{ position: 'absolute', top: '56px', left: '50%', transform: 'translate(-50%, -100%)', transformOrigin: 'bottom center', zIndex: 3 }}
        >
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          >
            <svg width="clamp(28px, 3.2vw, 42px)" height="clamp(34px, 3.8vw, 52px)" viewBox="0 0 24 30">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 9 12 18 12 18s12-9 12-18c0-6.63-5.37-12-12-12z" fill="#7C3AED" />
              <circle cx="12" cy="11" r="5" fill="white" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Info Body */}
      <div style={{ padding: '8px 12px 10px', display: 'flex', flexDirection: 'column', gap: 4, width: '100%', boxSizing: 'border-box', textAlign: 'left' }}>
        <p style={titleStyle}>Đã chia sẻ vị trí</p>
        <p style={subtitleStyle}>Người thân có thể theo dõi vị trí của bạn.</p>

        <div style={buttonContainerStyle}>
          <Btn
            label="Gửi cho người thân"
            borderColor="#BFDBFE"
            color="#2563EB"
            icon={
              // FIX: icon share/gửi thay cho icon chuông (Bell) sai trước đó
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.6" y1="10.5" x2="15.4" y2="6.5" />
                <line x1="8.6" y1="13.5" x2="15.4" y2="17.5" />
              </svg>
            }
          />
          <Btn
            label="Dừng chia sẻ"
            borderColor="#FCA5A5"
            color="#EF4444"
            icon={
              // FIX: hình vuông ĐẶC màu đỏ thay cho viền rỗng trước đó
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#EF4444">
                <rect x="4" y="4" width="16" height="16" rx="3" />
              </svg>
            }
          />
        </div>
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <div>
          <p style={{ ...titleStyle, margin: 0 }}>Chở bạn bè</p>
          <p style={subtitleStyle}>Tải trọng hiện tại</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
            <span style={{ fontSize: 'clamp(26px, 3.5vw, 48px)', fontWeight: 900, color: '#1e293b', lineHeight: 1 }}>120</span>
            <span style={{ fontSize: 'clamp(9px, 0.9vw, 13px)', color: '#94a3b8', fontWeight: 600 }}>kg / 250 kg</span>
          </div>
        </div>
        {/* Two-people icon (Enlarged) */}
        <svg width="clamp(60px, 6.6vw, 92px)" height="clamp(60px, 6.6vw, 92px)" viewBox="0 0 40 40" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="13" cy="11" r="6" fill="#C4B5FD" />
          <ellipse cx="13" cy="27" rx="9" ry="6" fill="#C4B5FD" />
          <circle cx="27" cy="11" r="6" fill="#DDD6FE" />
          <ellipse cx="27" cy="27" rx="9" ry="6" fill="#DDD6FE" />
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <div>
          <p style={{ ...titleStyle, margin: 0 }}>Có người lên xe</p>
          <p style={subtitleStyle}>Tải trọng hiện tại</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
            <span style={{ fontSize: 'clamp(26px, 3.5vw, 48px)', fontWeight: 900, color: '#1e293b', lineHeight: 1 }}>0</span>
            <span style={{ fontSize: 'clamp(9px, 0.9vw, 13px)', color: '#94a3b8', fontWeight: 600 }}>kg / 250 kg</span>
          </div>
        </div>
        {/* Person + down arrow with bounce animation (Enlarged) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flexShrink: 0 }}>
          <svg width="clamp(48px, 5.2vw, 76px)" height="clamp(48px, 5.2vw, 76px)" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="9" r="6" fill="#CBD5E1" />
            <ellipse cx="16" cy="24" rx="10" ry="6" fill="#CBD5E1" />
          </svg>
          <motion.svg
            animate={{ y: [-2, 3, -2] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
          </motion.svg>
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
    const start = prev.current;
    const end = target;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 700, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(start + (end - start) * ease));
      if (p < 1) requestAnimationFrame(tick);
      else prev.current = target;
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <div>
          <p style={{ ...titleStyle, margin: 0 }}>Có người lên xe</p>
          <p style={subtitleStyle}>Tải trọng hiện tại</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
            <span style={{ fontSize: 'clamp(26px, 3.5vw, 48px)', fontWeight: 900, color: '#7C3AED', lineHeight: 1 }}>{weight}</span>
            <span style={{ fontSize: 'clamp(9px, 0.9vw, 13px)', color: '#94a3b8', fontWeight: 600 }}>kg / 250 kg</span>
          </div>
        </div>
        {/* Person + up arrow with bounce animation (Enlarged) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flexShrink: 0 }}>
          <svg width="clamp(48px, 5.2vw, 76px)" height="clamp(48px, 5.2vw, 76px)" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="9" r="6" fill="#8B5CF6" />
            <ellipse cx="16" cy="24" rx="10" ry="6" fill="#8B5CF6" />
          </svg>
          <motion.svg
            animate={{ y: [2, -3, 2] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          >
            <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
          </motion.svg>
        </div>
      </div>
    </div>
  );
}

/* ═══ 10. MỤC ĐÍCH CHUYẾN ĐI ═══════════════════════════════════════════════════ */
const PURPOSES = [
  { id: 'friend', label: 'Chở bạn bè', bg: '#F5F3FF', border: '#8B5CF6', icon: '👥' },
  { id: 'family', label: 'Chở người thân', bg: '#F0FDF4', border: '#22C55E', icon: '👨‍👩‍👧' },
  { id: 'colleague', label: 'Chở đồng nghiệp', bg: '#EFF6FF', border: '#3B82F6', icon: '💼' },
  { id: 'cargo', label: 'Chở hàng hóa', bg: '#FFF7ED', border: '#F97316', icon: '📦' },
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
