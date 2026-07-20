import { useEffect, useState } from 'react';

export function useAutoBlink(enabled: boolean, canBlink: boolean) {
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    if (!enabled || !canBlink) return;

    let t1 = 0, t2 = 0, t3 = 0, t4 = 0;

    const schedule = () => {
      // Khoảng cách ngẫu nhiên thực tế: 2–8 giây
      const interval = 2000 + Math.random() * 6000;

      t1 = window.setTimeout(() => {
        // Nhắm nhanh: 70–100ms (sinh học: fast downstroke)
        const closeMs = 70 + Math.random() * 30;
        // Mở chậm hơn: 140–200ms (sinh học: slow upstroke)
        const openMs  = 140 + Math.random() * 60;

        setBlinking(true);
        t2 = window.setTimeout(() => {
          setBlinking(false);

          // 20% xác suất double-blink (giống người thật)
          if (Math.random() < 0.2) {
            t3 = window.setTimeout(() => {
              setBlinking(true);
              t4 = window.setTimeout(() => {
                setBlinking(false);
                schedule();
              }, openMs);
            }, 80 + Math.random() * 60); // khoảng giữa 2 lần nháy
          } else {
            schedule();
          }
        }, openMs + closeMs); // tổng thời gian = nhắm + mở
      }, interval);
    };

    schedule();
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [enabled, canBlink]);

  return blinking;
}
