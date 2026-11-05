import React from 'react';

interface MarqueeProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  speed?: number; // duration in seconds
  pauseOnHover?: boolean;
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  children,
  speed = 28,
  pauseOnHover = true,
  className = '',
}) => {
  return (
    <div
      className={`relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ${className}`}
    >
      <div
        className={`animate-marquee flex items-center gap-6 ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
        style={{ '--marquee-duration': `${speed}s` } as React.CSSProperties}
      >
        <div className="flex items-center gap-6 shrink-0">{children}</div>
        <div className="flex items-center gap-6 shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};
