import { motion } from 'framer-motion';

const SPRING = { type: 'spring' as const, stiffness: 300, damping: 26, mass: 0.7 };

export function Cheeks({ visible, intensity = 0.72 }: { visible: boolean; intensity?: number }) {
  return (
    <motion.div
      className="cheeks"
      animate={{
        opacity: visible ? intensity : 0,
        scale: visible ? 1 : 0.35,
      }}
      transition={SPRING}
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    >
      {/* Left cheek */}
      <svg className="cheek-left" viewBox="0 0 100 50">
        <defs>
          <radialGradient id="cheek-gl" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ff8fa3" stopOpacity="1" />
            <stop offset="60%"  stopColor="#ff9fbf" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ff9fbf" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="50" cy="25" rx="42" ry="18" fill="url(#cheek-gl)" />
        <line x1="38" y1="29" x2="43" y2="19" stroke="#fff" strokeWidth="4.5" opacity="0.9" strokeLinecap="round" />
        <line x1="48" y1="31" x2="53" y2="21" stroke="#fff" strokeWidth="4.5" opacity="0.9" strokeLinecap="round" />
        <line x1="58" y1="33" x2="63" y2="23" stroke="#fff" strokeWidth="4.5" opacity="0.9" strokeLinecap="round" />
      </svg>

      {/* Right cheek */}
      <svg className="cheek-right" viewBox="0 0 100 50">
        <defs>
          <radialGradient id="cheek-gr" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ff8fa3" stopOpacity="1" />
            <stop offset="60%"  stopColor="#ff9fbf" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ff9fbf" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="50" cy="25" rx="42" ry="18" fill="url(#cheek-gr)" />
        <line x1="38" y1="29" x2="43" y2="19" stroke="#fff" strokeWidth="4.5" opacity="0.9" strokeLinecap="round" />
        <line x1="48" y1="31" x2="53" y2="21" stroke="#fff" strokeWidth="4.5" opacity="0.9" strokeLinecap="round" />
        <line x1="58" y1="33" x2="63" y2="23" stroke="#fff" strokeWidth="4.5" opacity="0.9" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}
