import React from 'react';

export interface HamburgerMenuProps {
  isOpen: boolean;
  toggle?: () => void;
  size?: number;
  strokeWidth?: number;
  color?: string;
  activeColor?: string;
  className?: string;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  isOpen,
  toggle,
  size = 24,
  strokeWidth = 2,
  color = '#e4e4e7',
  activeColor = '#A3E635',
  className = '',
}) => {
  const currentColor = isOpen ? activeColor : color;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      className={`relative flex items-center justify-center p-2 rounded-lg hover:bg-white/5 transition-colors focus:outline-none ${className}`}
      style={{ width: size + 16, height: size + 16 }}
    >
      <div className="relative flex flex-col justify-between" style={{ width: size, height: size * 0.75 }}>
        {/* Top bar */}
        <span
          className="block w-full rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center"
          style={{
            height: strokeWidth,
            backgroundColor: currentColor,
            transform: isOpen
              ? `translateY(${size * 0.375 - strokeWidth / 2}px) rotate(45deg)`
              : 'translateY(0) rotate(0deg)',
          }}
        />

        {/* Middle bar */}
        <span
          className="block w-full rounded-full transition-all duration-200 ease-out"
          style={{
            height: strokeWidth,
            backgroundColor: currentColor,
            opacity: isOpen ? 0 : 1,
            transform: isOpen ? 'scaleX(0)' : 'scaleX(1)',
          }}
        />

        {/* Bottom bar */}
        <span
          className="block w-full rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center"
          style={{
            height: strokeWidth,
            backgroundColor: currentColor,
            transform: isOpen
              ? `translateY(-${size * 0.375 - strokeWidth / 2}px) rotate(-45deg)`
              : 'translateY(0) rotate(0deg)',
          }}
        />
      </div>
    </button>
  );
};

