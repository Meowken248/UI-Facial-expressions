import React from 'react';

const icons = {
  Back: <svg viewBox="0 0 24 24"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>,
  Vehicle: <svg viewBox="0 0 24 24"><polygon points="12 2 19 21 12 17 5 21 12 2"/></svg>,
  Home: <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>,
  Music: <svg viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
  Phone: <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
};

const items = ['Back', 'Vehicle', 'Home', 'Music', 'Phone'] as const;

export function BottomNavigation() {
  return (
    <nav className="bottom-nav" aria-label="Điều hướng chính">
      {items.map((label) => (
        <button key={label} className={label === 'Home' ? 'active' : ''} aria-label={label}>
          {icons[label]}
        </button>
      ))}
    </nav>
  );
}
