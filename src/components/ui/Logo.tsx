interface LogoProps {
  variant?: 'default' | 'light';
  showWordmark?: boolean;
  className?: string;
}

export function Logo({ variant = 'default', showWordmark = true, className = '' }: LogoProps) {
  const rightStroke = variant === 'light' ? '#FFFFFF' : '#1E293B';
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width="32"
        height="16"
        viewBox="0 0 80 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect x="4" y="5" width="48" height="30" rx="15" stroke="#4A8CF0" strokeWidth="6" />
        <rect x="28" y="5" width="48" height="30" rx="15" stroke={rightStroke} strokeWidth="6" />
      </svg>
      {showWordmark && (
        <span
          className={`font-sans font-extrabold text-lg ${variant === 'light' ? 'text-white' : 'text-ink'}`}
          style={{ letterSpacing: '-0.03em' }}
        >
          syloop
        </span>
      )}
    </span>
  );
}
