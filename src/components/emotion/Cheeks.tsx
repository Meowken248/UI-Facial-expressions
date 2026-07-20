export function Cheeks({ visible, intensity = 0.72 }: { visible: boolean; intensity?: number }) {
  return (
    <div
      className="cheeks"
      style={{
        opacity: visible ? intensity : 0,
        transform: visible ? 'scale(1)' : 'scale(0.4)',
        transition: 'transform 0.65s cubic-bezier(0.34, 1.75, 0.64, 1), opacity 0.35s ease',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <svg className="cheek-left" viewBox="0 0 100 50">
        <defs>
          <radialGradient id="cheek-glow-left" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff8fa3" stopOpacity="1" />
            <stop offset="60%" stopColor="#ff9fbf" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ff9fbf" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="50" cy="25" rx="42" ry="18" fill="url(#cheek-glow-left)" />
        {/* Three cute diagonal highlight lines */}
        <line x1="38" y1="29" x2="43" y2="19" stroke="#ffffff" strokeWidth="4.5" opacity="0.9" />
        <line x1="48" y1="31" x2="53" y2="21" stroke="#ffffff" strokeWidth="4.5" opacity="0.9" />
        <line x1="58" y1="33" x2="63" y2="23" stroke="#ffffff" strokeWidth="4.5" opacity="0.9" />
      </svg>

      <svg className="cheek-right" viewBox="0 0 100 50">
        <defs>
          <radialGradient id="cheek-glow-right" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff8fa3" stopOpacity="1" />
            <stop offset="60%" stopColor="#ff9fbf" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ff9fbf" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="50" cy="25" rx="42" ry="18" fill="url(#cheek-glow-right)" />
        {/* Three cute diagonal highlight lines */}
        <line x1="38" y1="29" x2="43" y2="19" stroke="#ffffff" strokeWidth="4.5" opacity="0.9" />
        <line x1="48" y1="31" x2="53" y2="21" stroke="#ffffff" strokeWidth="4.5" opacity="0.9" />
        <line x1="58" y1="33" x2="63" y2="23" stroke="#ffffff" strokeWidth="4.5" opacity="0.9" />
      </svg>
    </div>
  );
}
