import React, { useRef, useState, useEffect } from 'react';
import { 
  Home, 
  BookOpen, 
  Swords, 
  Hammer, 
  MessageSquare, 
  Trophy, 
  FolderDown, 
  Layers
} from 'lucide-react';

export interface DockItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
  onClick: () => void;
  isActive?: boolean;
}

interface AppleDockNavigationProps {
  activeId: string;
  onNavigate: (id: string) => void;
  className?: string;
  customItems?: DockItem[];
}

export const AppleDockNavigation: React.FC<AppleDockNavigationProps> = ({
  activeId,
  onNavigate,
  className = '',
  customItems,
}) => {
  const dockRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  const defaultItems: DockItem[] = [
    {
      id: 'dashboard',
      label: 'HQ',
      icon: <Home className="w-5 h-5" />,
      onClick: () => onNavigate('dashboard'),
      isActive: activeId === 'dashboard',
    },
    {
      id: 'learning',
      label: 'Learning',
      icon: <BookOpen className="w-5 h-5" />,
      onClick: () => onNavigate('learning'),
      isActive: activeId === 'learning',
    },
    {
      id: 'quests',
      label: 'Quests',
      icon: <Swords className="w-5 h-5" />,
      badge: '3',
      onClick: () => onNavigate('quests'),
      isActive: activeId === 'quests',
    },
    {
      id: 'forge',
      label: 'Forge',
      icon: <Hammer className="w-5 h-5" />,
      onClick: () => onNavigate('forge'),
      isActive: activeId === 'forge',
    },
    {
      id: 'den',
      label: 'Den',
      icon: <MessageSquare className="w-5 h-5" />,
      badge: 'Live',
      onClick: () => onNavigate('den'),
      isActive: activeId === 'den',
    },
    {
      id: 'leaderboard',
      label: 'Ranks',
      icon: <Trophy className="w-5 h-5" />,
      onClick: () => onNavigate('leaderboard'),
      isActive: activeId === 'leaderboard',
    },
    {
      id: 'resources',
      label: 'Store',
      icon: <FolderDown className="w-5 h-5" />,
      onClick: () => onNavigate('resources'),
      isActive: activeId === 'resources',
    },
  ];

  const items = customItems || defaultItems;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseX(e.clientX);
  };

  const handleMouseLeave = () => {
    setMouseX(null);
    setHoveredLabel(null);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      setMouseX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setMouseX(null);
    setHoveredLabel(null);
  };

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-[95vw] ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Label Tooltip */}
      {hoveredLabel && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-white text-[11px] font-mono tracking-wide pointer-events-none whitespace-nowrap shadow-xl animate-in fade-in zoom-in-95 duration-150">
          {hoveredLabel}
        </div>
      )}

      {/* Dock Container */}
      <div
        ref={dockRef}
        className="flex items-end gap-1.5 sm:gap-2 px-3 py-2 rounded-2xl bg-[#0e0e16]/85 backdrop-blur-xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.65),0_0_20px_rgba(163,230,53,0.1)] transition-all duration-300"
      >
        {items.map((item) => {
          return (
            <DockButton
              key={item.id}
              item={item}
              mouseX={mouseX}
              onHoverLabel={(label) => setHoveredLabel(label)}
            />
          );
        })}
      </div>
    </div>
  );
};

interface DockButtonProps {
  item: DockItem;
  mouseX: number | null;
  onHoverLabel: (label: string | null) => void;
}

const DockButton: React.FC<DockButtonProps> = ({ item, mouseX, onHoverLabel }) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (mouseX === null || !btnRef.current) {
      setScale(1);
      return;
    }

    const rect = btnRef.current.getBoundingClientRect();
    const itemCenter = rect.left + rect.width / 2;
    const distance = Math.abs(mouseX - itemCenter);
    const maxDistance = 120; // Influence radius

    if (distance < maxDistance) {
      // Gaussian or cosine falloff curve
      const factor = (Math.cos((distance / maxDistance) * Math.PI) + 1) / 2;
      const targetScale = 1 + factor * 0.45; // up to 1.45x magnification
      setScale(targetScale);
    } else {
      setScale(1);
    }
  }, [mouseX]);

  return (
    <div className="relative flex flex-col items-center">
      <button
        ref={btnRef}
        onClick={item.onClick}
        onMouseEnter={() => onHoverLabel(item.label)}
        onMouseLeave={() => onHoverLabel(null)}
        style={{
          transform: `scale(${scale}) translateY(-${(scale - 1) * 12}px)`,
          transformOrigin: 'bottom center',
        }}
        className={`relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl transition-transform duration-100 ease-out active:scale-95 ${
          item.isActive
            ? 'bg-lime-400 text-black shadow-[0_0_15px_rgba(163,230,53,0.4)]'
            : 'bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/5 hover:border-white/15'
        }`}
        aria-label={item.label}
      >
        {item.icon}

        {/* Optional Badge */}
        {item.badge && (
          <span className="absolute -top-1 -right-1 text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-purple-500 text-white shadow-sm border border-[#0e0e16]">
            {item.badge}
          </span>
        )}
      </button>

      {/* Active Dot indicator below icon */}
      <span
        className={`w-1 h-1 rounded-full mt-1 transition-all duration-300 ${
          item.isActive
            ? 'bg-lime-400 shadow-[0_0_6px_#A3E635]'
            : 'bg-transparent'
        }`}
      />
    </div>
  );
};
