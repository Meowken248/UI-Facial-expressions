interface DashboardStatsProps {
  speed: number;
  battery: number;
  rangeKm: number;
}

export function DashboardStats({ speed, battery, rangeKm }: DashboardStatsProps) {
  const safeBattery = Math.max(0, Math.min(100, battery));
  return (
    <>
      <aside className="stats stats-left" aria-label={`Tốc độ ${speed} kilomet trên giờ, số P`}>
        <div className="speed-readout">
          <strong>{speed}</strong>
          <small>km/h</small>
        </div>
        <div className="stat-separator" />
        <div className="gear">P</div>
      </aside>

      <aside className="stats stats-right" aria-label={`Quãng đường còn lại ${rangeKm} kilomet, pin ${safeBattery} phần trăm`}>
        <div className="range-readout">
          <strong>{rangeKm}</strong>
          <small>km</small>
        </div>
        <div className="stat-separator" />
        <div className="battery-readout">
          <b>{safeBattery}%</b>
          <span className="battery" aria-hidden="true">
            <i style={{ width: `${safeBattery}%` }} />
          </span>
        </div>
      </aside>
    </>
  );
}
