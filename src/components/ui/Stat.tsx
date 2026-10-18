import { ReactNode } from 'react';

interface StatProps {
  label: string;
  value: string;
  sub?: ReactNode;
  tone?: 'default' | 'debt' | 'brand';
}

const toneClasses: Record<NonNullable<StatProps['tone']>, string> = {
  default: 'text-ink',
  debt: 'text-debt',
  brand: 'text-brand-ink',
};

export function Stat({ label, value, sub, tone = 'default' }: StatProps) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-link">{label}</p>
      <p className={`mt-1 font-serif text-4xl font-medium ${toneClasses[tone]}`}>{value}</p>
      {sub && <p className="mt-1 text-sm text-[#475569]">{sub}</p>}
    </div>
  );
}
