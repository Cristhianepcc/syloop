import { ReactNode } from 'react';

type Tone = 'neutral' | 'brand' | 'warn' | 'danger' | 'success';

const toneClasses: Record<Tone, string> = {
  neutral: 'bg-[#F1F5F9] text-[#475569]',
  brand: 'bg-tint text-brand-ink',
  warn: 'bg-warn-bg text-warn-text',
  danger: 'bg-danger-bg text-danger-text',
  success: 'bg-[#DCFCE7] text-[#166534]',
};

export function Badge({ tone = 'neutral', children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex w-fit shrink-0 items-center gap-1.5 self-start rounded-full px-2.5 py-1 text-xs font-semibold ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}

export function Dot({ tone = 'neutral' }: { tone?: Tone }) {
  const dotClasses: Record<Tone, string> = {
    neutral: 'bg-[#94A3B8]',
    brand: 'bg-brand',
    warn: 'bg-warn-dot',
    danger: 'bg-danger',
    success: 'bg-[#16A34A]',
  };
  return <span className={`inline-block h-1.5 w-1.5 rounded-full ${dotClasses[tone]}`} />;
}
