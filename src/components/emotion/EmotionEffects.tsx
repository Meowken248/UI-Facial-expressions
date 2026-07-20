import type { EffectConfig } from '../../types/emotion.types';

export function EmotionEffects({ effects = [] }: { effects?: EffectConfig[] }) {
  return (
    <div className="effects" aria-hidden="true">
      {effects.flatMap((effect, idx) => {
        // Decide counts
        const count = ['heart', 'sparkle', 'zzz'].includes(effect.type) ? 3 : 1;

        return Array.from({ length: count }, (_, n) => {
          const key = `${effect.type}-${idx}-${n}`;
          const posClass = `effect-${effect.position ?? 'around'} n${n}`;

          // Inline custom styling variables for floating offsets
          const floatX = n === 0 ? '-10px' : n === 1 ? '20px' : '-25px';
          const style = {
            '--float-x': floatX,
            '--tear-x': n === 0 ? '-5px' : '5px',
          } as React.CSSProperties;

          // Render SVGs instead of basic text characters
          if (effect.type === 'heart') {
            return (
              <span key={key} className={`effect-svg effect-heart ${posClass}`} style={style}>
                <svg viewBox="0 0 24 24" width="36" height="36" fill="#f43f5e" filter="drop-shadow(0 2px 4px rgba(244,63,94,0.4))">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </span>
            );
          }

          if (effect.type === 'star' || effect.type === 'sparkle') {
            return (
              <span key={key} className={`effect-svg effect-sparkle ${posClass}`} style={style}>
                <svg viewBox="0 0 24 24" width="32" height="32" fill="#eab308" filter="drop-shadow(0 2px 4px rgba(234,179,8,0.4))">
                  <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2Z" />
                </svg>
              </span>
            );
          }

          if (effect.type === 'tear') {
            return (
              <span key={key} className={`effect-svg effect-tear ${posClass}`} style={style}>
                <svg viewBox="0 0 24 24" width="28" height="28" fill="#38bdf8" filter="drop-shadow(0 2px 4px rgba(56,189,248,0.4))">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </span>
            );
          }

          if (effect.type === 'zzz') {
            return (
              <span key={key} className={`effect-svg effect-zzz ${posClass}`} style={style}>
                <svg viewBox="0 0 24 24" width="28" height="28" fill="#2563eb" filter="drop-shadow(0 2px 4px rgba(37,99,235,0.3))">
                  <path d="M21 3H10.5v2.25h6L10.5 12h10.5V9.75h-6l6-6.75z M14 13H5v2h5l-5 5.5V23h9v-2h-5l5-5.5V13z" />
                </svg>
              </span>
            );
          }

          if (effect.type === 'warning') {
            return (
              <span key={key} className={`effect-svg effect-warning ${posClass}`} style={style}>
                <svg viewBox="0 0 24 24" width="64" height="64" fill="#ef4444">
                  <path d="M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z" />
                </svg>
              </span>
            );
          }

          if (effect.type === 'anger') {
            return (
              <span key={key} className={`effect-svg effect-anger ${posClass}`} style={style}>
                <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" filter="drop-shadow(0 2px 4px rgba(220,38,38,0.3))">
                  <path d="M4 12c4.4 0 8-3.6 8-8M12 20c0-4.4 3.6-8 8-8M20 12c-4.4 0-8 3.6-8 8M12 4c0 4.4-3.6 8-8 8" />
                </svg>
              </span>
            );
          }

          if (effect.type === 'thinking-hand') {
            return (
              <span key={key} className={`effect-thinking-hand`} style={style}>
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Glove/Hand outline */}
                  <path d="M16 44C16 44 12 36 16 28C20 20 28 20 32 28C34 24 38 24 40 28C42 24 46 24 48 28C50 32 50 44 38 48C26 52 16 44 16 44Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" strokeLinejoin="round"/>
                  {/* Index finger curved up to chin */}
                  <path d="M32 28C32 20 36 12 40 12C44 12 44 20 44 28" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  {/* Thumb curved out */}
                  <path d="M18 36C10 36 8 44 14 46" fill="none" stroke="#0F172A" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </span>
            );
          }

          return null;
        });
      })}
    </div>
  );
}
