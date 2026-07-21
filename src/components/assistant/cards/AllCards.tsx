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
        <svg width="68%" height="68%" viewBox="0 0 24 24" fill="#8B5CF6">
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
          {/* Tia sáng phía trên */}
          <path d="M24 3v4M16 5.5l2.2 3.2M32 5.5l-2.2 3.2" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />

          {/* Khối trái - hình cong mềm như ngọn lửa/bàn tay */}
          <path d="M6 27c-1-6 2-11 8-14 2-1 4 0 4 2s-2 3-3 5c-2 3-1 6 1 8-4 1-8 1-10-1z" fill="#F97316" />

          {/* Khối phải - đối xứng */}
          <path d="M42 27c1-6-2-11-8-14-2-1-4 0-4 2s2 3 3 5c2 3 1 6-1 8 4 1 8 1 10-1z" fill="#F97316" />

          {/* Ngôi sao lấp lánh trung tâm - đặt SAU CÙNG để không bị che */}
          <path d="M24 9l1.6 5L31 15.5l-5.4 1.5L24 22l-1.6-5L17 15.5l5.4-1.5L24 9z" fill="#F97316" />
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
          <path d="M16 3.5L3.5 24.5h25L16 3.5z" fill="#EF4444" stroke="#EF4444" strokeWidth="3" strokeLinejoin="round" />
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
          {/* Detailed Operator Vector illustration matching sample */}
          <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
            {/* Background */}
            <circle cx="50" cy="50" r="48" fill="#2D76E4" />
            <path d="M 50,2 A 48,48 0 0,1 98,50 L 50,98 Z" fill="#1B5BB7" />

            {/* Long Shadow */}
            <path d="M 66,40 L 96,70 L 78,96 L 48,66 Z" fill="#13479B" opacity="0.3" />

            {/* Neck */}
            <path d="M 42,50 L 42,61 C 42,65 58,65 58,61 L 58,50 Z" fill="#FDC4A2" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M 50,50 L 50,62.8 C 53.5,62.8 58,61 58,59 L 58,50 Z" fill="#EAA37F" />

            {/* Tie */}
            <path d="M 46.5,60 L 53.5,60 L 55,86 L 50,92 L 45,86 Z" fill="#FF7A00" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />

            {/* Shirt */}
            <path d="M 18,78 C 25,65 35,60 50,60 C 65,60 75,65 82,78 L 82,100 L 18,100 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />

            {/* Collar Flaps */}
            <path d="M 50,60 C 44,60 36,63 36,70 C 36,74 44,74 50,65 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" strokeLinejoin="round" />
            <path d="M 50,60 C 56,60 64,63 64,70 C 64,74 56,74 50,65 Z" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" strokeLinejoin="round" />

            {/* Face base split tone */}
            <path d="M 34,34 C 34,25 41,20 50,20 C 50,20 50,58 50,58 C 41,58 34,54 34,45 Z" fill="#FDC4A2" />
            <path d="M 50,20 C 59,20 66,25 66,34 L 66,45 C 66,54 59,58 50,58 Z" fill="#EAA37F" />
            <path d="M 34,34 C 34,25 41,20 50,20 C 59,20 66,25 66,34 L 66,45 C 66,54 59,58 50,58 C 41,58 34,54 34,45 Z" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />

            {/* Hair base split tone */}
            <path d="M 34,34 C 34,21 41,15 50,15 L 50,30 C 42,30 34,32 34,34 Z" fill="#704E35" />
            <path d="M 50,15 C 59,15 66,21 66,34 C 66,32 58,30 50,30 Z" fill="#563C28" />
            <path d="M 34,34 C 34,21 41,15 50,15 C 59,15 66,21 66,34 C 66,32 58,30 50,30 C 42,30 34,32 34,34 Z" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />

            {/* Headband */}
            <path d="M 30,34 C 30,19 40,13 50,13 C 60,13 70,19 70,34" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />

            {/* Earcups */}
            <rect x="28" y="28" width="9" height="16" rx="4.5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />
            <rect x="63" y="28" width="9" height="16" rx="4.5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" strokeLinejoin="round" />

            {/* Microphone */}
            <path d="M 64,39 C 64,48 58,49 53,49" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
            <rect x="49" y="46.5" width="5.5" height="5" rx="2.5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
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
        <svg width="100%" height="100%" viewBox="0 0 200 68" preserveAspectRatio="xMidYMid slice">
          <defs>
            {/* 1. Linear gradient + Radial gradient for background */}
            <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#EEF0FB" />
            </linearGradient>
            <radialGradient id="bgCover" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>

            {/* 2. Gaussian blur for soft park blobs */}
            <filter id="parkBlur">
              <feGaussianBlur stdDeviation="3.5" />
            </filter>

            {/* 4. Landing Glow Gradient */}
            <radialGradient id="pinGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.38" />
              <stop offset="60%" stopColor="#7C3AED" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
            </radialGradient>

            {/* 5. Pin Gradient */}
            <linearGradient id="pinGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9061F9" />
              <stop offset="100%" stopColor="#6D28D9" />
            </linearGradient>
          </defs>

          {/* Map Base with Gradients */}
          <rect width="200" height="68" fill="url(#bgGrad)" />
          <rect width="200" height="68" fill="url(#bgCover)" />

          {/* Faded green land zones (Soft blurred park blobs) */}
          <ellipse cx="25" cy="12" rx="18" ry="10" fill="#D8F5E8" opacity="0.5" filter="url(#parkBlur)" />
          <ellipse cx="178" cy="15" rx="16" ry="8" fill="#D8F5E8" opacity="0.5" filter="url(#parkBlur)" />
          <ellipse cx="38" cy="54" rx="14" ry="7" fill="#D8F5E8" opacity="0.5" filter="url(#parkBlur)" />
          <ellipse cx="165" cy="48" rx="12" ry="6" fill="#D8F5E8" opacity="0.5" filter="url(#parkBlur)" />

          {/* Perspective grid lines */}
          <line x1="100" y1="46" x2="-20" y2="-10" stroke="#E2E8F0" strokeWidth="0.8" opacity="0.5" />
          <line x1="100" y1="46" x2="220" y2="-10" stroke="#E2E8F0" strokeWidth="0.8" opacity="0.5" />
          <line x1="100" y1="46" x2="-20" y2="78" stroke="#E2E8F0" strokeWidth="0.8" opacity="0.5" />
          <line x1="100" y1="46" x2="220" y2="78" stroke="#E2E8F0" strokeWidth="0.8" opacity="0.5" />

          {/* Roads: Borders (Drawn first) */}
          {/* Main roads */}
          <path d="M -20,52 Q 60,38 100,46 T 220,40" stroke="#D6DCE8" strokeWidth="13" fill="none" opacity="0.5" strokeLinecap="round" />
          <path d="M 100,78 Q 90,57 100,46 T 110,-10" stroke="#D6DCE8" strokeWidth="11" fill="none" opacity="0.5" strokeLinecap="round" />

          {/* Diagonal roads */}
          <path d="M -10,12 Q 50,34 100,46" stroke="#D6DCE8" strokeWidth="10" fill="none" opacity="0.5" strokeLinecap="round" />
          <path d="M 210,78 Q 150,62 100,46" stroke="#D6DCE8" strokeWidth="10" fill="none" opacity="0.5" strokeLinecap="round" />
          <path d="M -20,78 L 100,46" stroke="#D6DCE8" strokeWidth="10" fill="none" opacity="0.5" strokeLinecap="round" />
          <path d="M 220,0 L 100,46" stroke="#D6DCE8" strokeWidth="10" fill="none" opacity="0.5" strokeLinecap="round" />

          {/* Roads: White Center Fills (Drawn on top) */}
          <path d="M -20,52 Q 60,38 100,46 T 220,40" stroke="#FFFFFF" strokeWidth="11" fill="none" strokeLinecap="round" opacity="0.95" />
          <path d="M 100,78 Q 90,57 100,46 T 110,-10" stroke="#FFFFFF" strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.95" />
          <path d="M -10,12 Q 50,34 100,46" stroke="#FFFFFF" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.9" />
          <path d="M 210,78 Q 150,62 100,46" stroke="#FFFFFF" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.9" />
          <path d="M -20,78 L 100,46" stroke="#FFFFFF" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.9" />
          <path d="M 220,0 L 100,46" stroke="#FFFFFF" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.9" />

          {/* Radial Landing Glow */}
          <ellipse cx="100" cy="46" rx="22" ry="9" fill="url(#pinGlow)" />
        </svg>

        {/* Bouncing pin anchored exactly on the shadow at 68% top (Y=46) */}
        <div
          style={{
            position: 'absolute',
            top: '68%',
            left: '50%',
            transform: 'translate(-50%, -100%)',
            transformOrigin: 'bottom center',
            zIndex: 3
          }}
        >
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            style={{ filter: 'drop-shadow(0 6px 8px rgba(109,40,217,0.35))' }}
          >
            <svg width="clamp(33px, 3.7vw, 49px)" height="clamp(41px, 4.5vw, 61px)" viewBox="0 0 24 30">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 9 12 18 12 18s12-9 12-18c0-6.63-5.37-12-12-12z" fill="url(#pinGradient)" />
              <circle cx="12" cy="11" r="5" fill="white" stroke="#F3E8FF" strokeWidth="1" />
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
            <div style={{
              width: 'clamp(44px, 5vw, 64px)',
              height: 'clamp(44px, 5vw, 64px)',
              borderRadius: '50%',
              background: selected === p.id ? p.bg : '#F8FAFC',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 'clamp(26px, 3.2vw, 40px)',
              flexShrink: 0,
            }}>{p.icon}</div>
            <span style={{ fontSize: 'clamp(9px,0.85vw,11px)', fontWeight: 700, color: '#334155', lineHeight: 1.2, textAlign: 'center' }}>{p.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
