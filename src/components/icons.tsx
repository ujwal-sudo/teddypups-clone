// Small inline icons used across the site.
type P = { className?: string; style?: React.CSSProperties };

export function PawIcon({ className, style }: P) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} style={style} aria-hidden>
      <ellipse cx="10" cy="13.5" rx="5" ry="4.2" />
      <circle cx="3.6" cy="8.4" r="2.2" />
      <circle cx="7.4" cy="4.4" r="2.2" />
      <circle cx="12.6" cy="4.4" r="2.2" />
      <circle cx="16.4" cy="8.4" r="2.2" />
    </svg>
  );
}

export function Sparkle({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0c.8 6.6 5.4 11.2 12 12-6.6.8-11.2 5.4-12 12-.8-6.6-5.4-11.2-12-12C6.6 11.2 11.2 6.6 12 0z" />
    </svg>
  );
}

export function Squiggle({ className }: P) {
  return (
    <svg viewBox="0 0 200 12" fill="none" className={className} aria-hidden preserveAspectRatio="none">
      <path d="M2 7c12-6 22 4 34 0s22-6 34 0 22 4 34 0 22-6 34 0 22 4 34 0 16-4 26-1" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function SendIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M3 20.5 21.5 12 3 3.5l.02 6.6L15 12 3.02 13.9z" />
    </svg>
  );
}

export function Check({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="m4 12.5 5 5L20 6.5" />
    </svg>
  );
}

export function Moon({ className }: P) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <path d="M27 4a16 16 0 1 0 9 26A13 13 0 0 1 27 4z" fill="#fbe3b4" />
    </svg>
  );
}
