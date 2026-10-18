import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padded?: boolean;
}

export function Card({ children, padded = true, className = '', ...props }: CardProps) {
  return (
    <div className={`rounded-card bg-white ${padded ? 'p-6' : ''} ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardBlock({ children, className = '', ...props }: CardProps) {
  return (
    <div className={`rounded-block bg-canvas p-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <h2 className={`font-sans text-[17px] font-bold text-ink ${className}`}>{children}</h2>;
}
