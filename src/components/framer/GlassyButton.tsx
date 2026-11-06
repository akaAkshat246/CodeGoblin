import React from 'react';

export interface GlassyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'accent' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  glowColor?: string;
}

export const GlassyButton: React.FC<GlassyButtonProps> = ({
  children,
  variant = 'default',
  size = 'md',
  icon,
  iconPosition = 'left',
  glowColor,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm px-4 py-2.5 rounded-xl gap-2',
    lg: 'text-base px-6 py-3.5 rounded-2xl gap-2.5 font-medium',
  };

  const variantStyles = {
    default: {
      bg: 'bg-white/[0.06] hover:bg-white/[0.12]',
      border: 'border-white/15 hover:border-white/30',
      text: 'text-zinc-200 hover:text-white',
      shadow: 'hover:shadow-[0_0_20px_rgba(255,255,255,0.12)]',
    },
    primary: {
      bg: 'bg-lime-400/15 hover:bg-lime-400/25',
      border: 'border-lime-400/30 hover:border-lime-400/60',
      text: 'text-lime-400 hover:text-lime-300',
      shadow: 'hover:shadow-[0_0_25px_rgba(163,230,53,0.3)]',
    },
    accent: {
      bg: 'bg-purple-500/15 hover:bg-purple-500/25',
      border: 'border-purple-500/30 hover:border-purple-500/60',
      text: 'text-purple-300 hover:text-purple-200',
      shadow: 'hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]',
    },
    danger: {
      bg: 'bg-red-500/15 hover:bg-red-500/25',
      border: 'border-red-500/30 hover:border-red-500/60',
      text: 'text-red-400 hover:text-red-300',
      shadow: 'hover:shadow-[0_0_20px_rgba(239,68,68,0.25)]',
    },
  };

  const v = variantStyles[variant];

  return (
    <button
      disabled={disabled}
      className={`group relative inline-flex items-center justify-center font-medium backdrop-blur-xl border transition-all duration-300 active:scale-[0.98] select-none disabled:opacity-50 disabled:pointer-events-none overflow-hidden ${
        sizeClasses[size]
      } ${v.bg} ${v.border} ${v.text} ${v.shadow} ${className}`}
      {...props}
    >
      {/* Specular linear reflection line across top edge */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-75 group-hover:opacity-100 transition-opacity"
      />

      {/* Radial hover glare centered */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out"
      />

      {icon && iconPosition === 'left' && (
        <span className="shrink-0 transition-transform duration-200 group-hover:scale-110">
          {icon}
        </span>
      )}
      <span className="relative z-10">{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </button>
  );
};
