import { ButtonHTMLAttributes } from 'react';

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  count?: number;
}

export function Chip({ active = false, count, children, className = '', ...props }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:focus-ring ${
        active
          ? 'border-tint-border bg-tint text-brand-ink'
          : 'border-[#E2E8F0] bg-white text-[#475569] hover:bg-[#F8FAFC]'
      } ${className}`}
      {...props}
    >
      {children}
      {typeof count === 'number' && (
        <span className={`text-xs ${active ? 'text-brand-ink' : 'text-[#475569]'}`}>{count}</span>
      )}
    </button>
  );
}
