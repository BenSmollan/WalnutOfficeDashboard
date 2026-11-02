const base = { width: 18, height: 18, viewBox: '0 0 20 20', fill: 'none', 'aria-hidden': true };
const stroke = { stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const ProfileIcon = () => (
  <svg {...base}>
    <circle cx="10" cy="10" r="7" {...stroke} />
    <path d="M10 3v14M3 10h14" {...stroke} />
  </svg>
);
export const FeedbackIcon = () => (
  <svg {...base}>
    <rect x="4" y="3" width="12" height="14" rx="2" {...stroke} />
    <path d="M7 7.5h6M7 10.5h6M7 13.5h4" {...stroke} />
  </svg>
);
export const PersonIcon = () => (
  <svg {...base}>
    <circle cx="10" cy="7" r="3" {...stroke} />
    <path d="M4.5 16.5c.8-2.8 3-4.3 5.5-4.3s4.7 1.5 5.5 4.3" {...stroke} />
  </svg>
);
export const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const ArrowLeft = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M13 8H3M7.5 3.5 3 8l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const Check = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
