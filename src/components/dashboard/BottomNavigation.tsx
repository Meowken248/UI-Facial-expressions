const items=[['←','Back'],['◇','Vehicle'],['⌂','Home'],['♫','Music'],['◡','Phone']];
export function BottomNavigation(){return <nav className="bottom-nav" aria-label="Điều hướng chính">{items.map(([icon,label])=><button key={label} className={label==='Home'?'active':''} aria-label={label}><span>{icon}</span><small>{label}</small></button>)}</nav>}
