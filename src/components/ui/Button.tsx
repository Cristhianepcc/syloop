import { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'sky' | 'ghost' | 'danger';
type Size = 'md' | 'sm';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconOnly?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-ink text-white hover:bg-[#15202E] active:bg-[#0F1621]',
  secondary: 'bg-white text-ink border border-[#E2E8F0] hover:bg-[#F8FAFC]',
  sky: 'bg-sky text-ink hover:bg-[#6AA3F5]',
  ghost: 'bg-transparent text-ink hover:bg-[#F1F5F9]',
  danger: 'bg-white text-danger border border-danger-border hover:bg-danger-bg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconOnly = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const sizeClasses = size === 'md' ? 'min-h-[44px] px-5 text-[15px]' : 'min-h-[38px] px-3.5 text-sm';
  const padding = iconOnly ? (size === 'md' ? 'w-11 px-0' : 'w-9 px-0') : sizeClasses;

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-[10px] font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:focus-ring ${variantClasses[variant]} ${padding} ${className}`}
      {...props}
    >
      {icon}
      {!iconOnly && children}
    </button>
  );
}
