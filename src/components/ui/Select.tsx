import { SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export function Select({ label, className = '', id, children, ...props }: SelectProps) {
  return (
    <label className="flex flex-col gap-1.5" htmlFor={id}>
      {label && <span className="text-xs font-semibold uppercase tracking-[0.1em] text-link">{label}</span>}
      <span className="relative inline-flex">
        <select
          id={id}
          className={`min-h-[44px] w-full appearance-none rounded-[10px] border border-[#E2E8F0] bg-white px-3.5 pr-9 text-[15px] text-ink focus-visible:focus-ring ${className}`}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#475569]" />
      </span>
    </label>
  );
}
