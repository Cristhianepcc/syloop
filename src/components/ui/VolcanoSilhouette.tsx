export function VolcanoSilhouette({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const fill = variant === 'light' ? '#FFFFFF' : '#15202E';
  const stroke = variant === 'light' ? '#BFD7FB' : '#27364D';
  const snow = variant === 'light' ? '#EEF4FE' : '#334155';

  return (
    <svg
      viewBox="0 0 1200 220"
      preserveAspectRatio="none"
      className="h-full w-full"
      aria-hidden="true"
    >
      <path d="M0 220 L180 90 L260 150 L380 40 L470 150 L620 10 L700 60 L760 150 L900 70 L1020 140 L1200 90 L1200 220 Z" fill={fill} stroke={stroke} strokeWidth="2" />
      <path d="M598 28 L642 58 L620 58 L636 70 L604 70 L620 58 L598 58 Z" fill={snow} />
    </svg>
  );
}
