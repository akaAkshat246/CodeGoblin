import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Rotate3d, Layers } from 'lucide-react';

export interface FanCardItem {
  id: string | number;
  title: string;
  subtitle?: string;
  tagline?: string;
  image: string;
  cutoutImage?: string;
  badge?: string;
  color?: string;
  description?: string;
}

interface FanCardCarouselProps {
  items: FanCardItem[];
  onSelect?: (item: FanCardItem, index: number) => void;
  className?: string;
}

export const FanCardCarousel: React.FC<FanCardCarouselProps> = ({
  items,
  onSelect,
  className = '',
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const activeCardRef = useRef<HTMLDivElement>(null);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Center card interactive 3D gyroscope tracking
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!activeCardRef.current) return;
    const rect = activeCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rY = ((x - centerX) / centerX) * 16;
    const rX = ((centerY - y) / centerY) * 16;

    setRotX(rX);
    setRotY(rY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.7,
    });
  };

  const handleCardMouseLeave = () => {
    setIsHovered(false);
    setRotX(0);
    setRotY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const currentItem = items[activeIndex];

  return (
    <div className={`relative w-full max-w-4xl mx-auto py-8 select-none ${className}`}>
      {/* 3D Perspective Stage Container */}
      <div
        className="relative h-[400px] sm:h-[460px] flex items-center justify-center overflow-visible"
        style={{ perspective: 1200 }}
      >
        {items.map((item, idx) => {
          let offset = idx - activeIndex;
          if (offset > items.length / 2) offset -= items.length;
          if (offset < -items.length / 2) offset += items.length;

          const isCenter = offset === 0;
          const absOffset = Math.abs(offset);
          const isVisible = absOffset <= 3; // show up to 7 cards in arc

          if (!isVisible) return null;

          // True 3D arc transform
          const rotateZ = offset * 8; // degrees
          const rotateYArc = offset * -12; // yaw turning toward camera
          const translateX = offset * 75; // px horizontal fan
          const translateY = absOffset * 16; // downward parabolic curve
          const translateZArc = -absOffset * 45; // receding depth on Z-axis
          const scale = isCenter ? 1.08 : Math.max(0.76, 1 - absOffset * 0.08);
          const zIndex = 30 - absOffset * 5;
          const opacity = Math.max(0.38, 1 - absOffset * 0.2);

          return (
            <div
              key={item.id}
              ref={isCenter ? activeCardRef : null}
              onMouseMove={isCenter ? handleCardMouseMove : undefined}
              onMouseEnter={isCenter ? () => setIsHovered(true) : undefined}
              onMouseLeave={isCenter ? handleCardMouseLeave : undefined}
              onClick={() => {
                setActiveIndex(idx);
                if (onSelect) onSelect(item, idx);
              }}
              style={{
                transform: isCenter
                  ? `translateX(${translateX}px) translateY(${translateY}px) translateZ(30px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`
                  : `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZArc}px) rotateY(${rotateYArc}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
                transformStyle: 'preserve-3d',
                zIndex,
                opacity,
                transition: isCenter && isHovered
                  ? 'none'
                  : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
              }}
              className={`absolute w-56 sm:w-68 h-78 sm:h-92 rounded-3xl p-3.5 cursor-pointer shadow-2xl ${
                isCenter
                  ? 'ring-2 ring-lime-400 shadow-[0_25px_60px_rgba(163,230,53,0.35)] bg-[#12121c]'
                  : 'bg-[#0f0f18]/90 border border-white/10 hover:border-white/30 hover:scale-105'
              }`}
            >
              <div
                className="relative w-full h-full rounded-2xl overflow-hidden bg-black/50 flex flex-col justify-between p-3.5 border border-white/5"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* 3D Volumetric Stage Glow (Center card only) */}
                {isCenter && (
                  <div
                    className="absolute inset-0 pointer-events-none rounded-2xl"
                    style={{
                      background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(163, 230, 53, 0.22) 0%, transparent 65%)`,
                      transform: 'translateZ(-15px)',
                    }}
                  />
                )}

                {/* Holographic Foil Reflection Sweep */}
                {isCenter && (
                  <div
                    className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-200"
                    style={{
                      opacity: glarePos.opacity,
                      background: `linear-gradient(${rotY * 10 + 115}deg, transparent 25%, rgba(255,255,255,0.2) 45%, rgba(163,230,53,0.3) 50%, rgba(168,85,247,0.25) 55%, transparent 75%)`,
                      transform: 'translateZ(50px)',
                    }}
                  />
                )}

                {/* Top Badge Strip */}
                <div
                  className="flex items-center justify-between text-xs z-20"
                  style={{ transform: isCenter ? 'translateZ(25px)' : 'none' }}
                >
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-black/70 border border-white/10 text-zinc-300 backdrop-blur-md">
                    0{idx + 1}
                  </span>
                  {item.badge && (
                    <span className="text-[10px] font-bold text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded-md border border-lime-400/30 shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Character Artwork with 3D Pop-Out */}
                <div
                  className="relative flex-1 flex items-center justify-center my-1"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Dynamic Floor Shadow */}
                  {isCenter && (
                    <div
                      className="absolute bottom-1 w-36 h-8 rounded-full bg-black/80 blur-sm pointer-events-none"
                      style={{
                        transform: `translateZ(-5px) scale(${isHovered ? 1.15 : 1})`,
                      }}
                    />
                  )}

                  {/* Character Image */}
                  <div
                    className="relative z-20 w-4/5 h-4/5 transition-transform duration-200 ease-out"
                    style={{
                      transform: isCenter
                        ? isHovered
                          ? 'translateZ(45px) scale(1.15)'
                          : 'translateZ(25px) scale(1.05)'
                        : 'translateZ(0px)',
                      filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.8))',
                    }}
                  >
                    <img
                      src={isCenter && item.cutoutImage ? item.cutoutImage : item.image}
                      alt={item.title}
                      className="w-full h-full object-contain rounded-xl"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Bottom Overlay Info Strip */}
                <div
                  className="relative z-20 bg-gradient-to-t from-black/95 via-black/75 to-transparent pt-6 -mx-3.5 -mb-3.5 p-3.5"
                  style={{ transform: isCenter ? 'translateZ(30px)' : 'none' }}
                >
                  <h4 className="text-sm font-bold text-white tracking-wide truncate">
                    {item.title}
                  </h4>
                  {item.subtitle && (
                    <p className="text-[11px] text-lime-400 font-medium truncate mt-0.5">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls & Active Item Summary */}
      <div className="mt-6 flex flex-col items-center gap-4">
        {/* Carousel Prev/Next Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] text-white transition-all hover:scale-105 active:scale-95"
            aria-label="Previous goblin"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dot Indicator Strip */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`transition-all rounded-full ${
                  i === activeIndex
                    ? 'w-5 h-1.5 bg-lime-400 shadow-[0_0_8px_#A3E635]'
                    : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Jump to goblin ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] text-white transition-all hover:scale-105 active:scale-95"
            aria-label="Next goblin"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Selected Goblin Banner */}
        {currentItem && (
          <div className="text-center max-w-md px-4 animate-in fade-in duration-300">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Sparkles className="w-3 h-3 text-lime-400" />
              GUILD IDENTITY • 0{activeIndex + 1} OF 09
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
              {currentItem.title}
            </h3>
            {currentItem.tagline && (
              <p className="text-xs text-lime-400 font-medium italic mt-0.5">
                "{currentItem.tagline}"
              </p>
            )}
            {currentItem.description && (
              <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                {currentItem.description}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
