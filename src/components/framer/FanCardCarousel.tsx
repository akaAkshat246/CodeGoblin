import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowUpRight } from 'lucide-react';

export interface FanCardItem {
  id: string | number;
  title: string;
  subtitle?: string;
  tagline?: string;
  image: string;
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

  const currentItem = items[activeIndex];

  return (
    <div className={`relative w-full max-w-4xl mx-auto py-8 select-none ${className}`}>
      {/* Cards Fan Stage */}
      <div className="relative h-[380px] sm:h-[440px] flex items-center justify-center overflow-visible">
        {items.map((item, idx) => {
          // Calculate relative offset from active card
          let offset = idx - activeIndex;
          if (offset > items.length / 2) offset -= items.length;
          if (offset < -items.length / 2) offset += items.length;

          const isCenter = offset === 0;
          const absOffset = Math.abs(offset);
          const isVisible = absOffset <= 3; // show 7 cards in fan

          if (!isVisible) return null;

          const rotate = offset * 9; // degrees
          const translateX = offset * 70; // px
          const translateY = absOffset * 14; // downward arc
          const scale = isCenter ? 1.05 : Math.max(0.78, 1 - absOffset * 0.08);
          const zIndex = 30 - absOffset * 5;
          const opacity = Math.max(0.35, 1 - absOffset * 0.22);

          return (
            <div
              key={item.id}
              onClick={() => {
                setActiveIndex(idx);
                if (onSelect) onSelect(item, idx);
              }}
              style={{
                transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`,
                zIndex,
                opacity,
              }}
              className={`absolute w-52 sm:w-64 h-72 sm:h-88 rounded-2xl p-3 cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isCenter
                  ? 'ring-2 ring-lime-400 shadow-[0_20px_50px_rgba(163,230,53,0.25)] bg-[#171725]'
                  : 'bg-[#111118]/90 border border-white/10 hover:border-white/30'
              }`}
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-black/40 flex flex-col justify-between p-3.5">
                {/* Top Badge */}
                <div className="flex items-center justify-between text-xs z-10">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-black/60 border border-white/10 text-zinc-300">
                    0{idx + 1}
                  </span>
                  {item.badge && (
                    <span className="text-[10px] font-semibold text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded border border-lime-400/20">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Character Artwork */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                    loading="lazy"
                  />
                </div>

                {/* Bottom Overlay Info */}
                <div className="relative z-10 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-6 -mx-3.5 -mb-3.5 p-3.5">
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
                    ? 'w-5 h-1.5 bg-lime-400'
                    : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Jump to item ${i + 1}`}
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
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Selected Guild Identity • 0{activeIndex + 1}
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
