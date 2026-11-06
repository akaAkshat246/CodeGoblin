import React from 'react';

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  shimmerColor?: string;
  className?: string;
}

export const ShimmerButton: React.FC<ShimmerButtonProps> = ({
  children,
  shimmerColor = 'rgba(163, 230, 53, 0.4)',
  className = '',
  ...props
}) => {
  return (
    <button
      className={`group relative overflow-hidden rounded-xl bg-lime-400 hover:bg-lime-300 text-black px-4 py-2 font-bold text-xs transition-all duration-200 active:scale-95 shadow-[0_0_20px_rgba(163,230,53,0.25)] hover:shadow-[0_0_25px_rgba(163,230,53,0.4)] ${className}`}
      {...props}
    >
      {/* Moving Shimmer Reflection */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:animate-[shimmer-sweep_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <span className="relative z-10 flex items-center justify-center gap-1.5">{children}</span>
    </button>
  );
};

