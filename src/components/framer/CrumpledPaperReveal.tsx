import React, { useState } from 'react';
import { Scroll, Sparkles, ChevronDown } from 'lucide-react';

export interface CrumpledPaperRevealProps {
  title?: string;
  tagline?: string;
  content: string | React.ReactNode;
  initiallyRevealed?: boolean;
  className?: string;
}

export const CrumpledPaperReveal: React.FC<CrumpledPaperRevealProps> = ({
  title = 'The Goblin Oath & Manifesto',
  tagline = 'Click to unroll encrypted clan parchment',
  content,
  initiallyRevealed = false,
  className = '',
}) => {
  const [isRevealed, setIsRevealed] = useState(initiallyRevealed);

  return (
    <div className={`relative max-w-2xl mx-auto my-6 select-none ${className}`}>
      {/* Container parchment */}
      <div
        onClick={() => setIsRevealed(!isRevealed)}
        className={`group cursor-pointer rounded-2xl border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
          isRevealed
            ? 'bg-[#181822] border-lime-400/30 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(163,230,53,0.15)] ring-1 ring-lime-400/20'
            : 'bg-[#12121a] hover:bg-[#161622] border-white/10 hover:border-lime-400/30 shadow-lg'
        }`}
      >
        {/* Header toggle */}
        <div className="flex items-center justify-between p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isRevealed
                  ? 'bg-lime-400 text-black shadow-[0_0_15px_rgba(163,230,53,0.4)] rotate-6'
                  : 'bg-white/5 text-zinc-400 group-hover:text-lime-400 group-hover:bg-white/10'
              }`}
            >
              <Scroll className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm sm:text-base font-bold text-white tracking-wide">
                  {title}
                </h4>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-lime-400/10 text-lime-400 border border-lime-400/20">
                  {isRevealed ? 'UNROLLED' : 'SEALED'}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">{tagline}</p>
            </div>
          </div>

          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 transition-transform duration-300 ${
              isRevealed ? 'rotate-180 text-lime-400' : 'group-hover:translate-y-0.5'
            }`}
          >
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>

        {/* Paper reveal fold body */}
        <div
          className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isRevealed ? 'max-h-[800px] opacity-100 p-5 sm:p-6 pt-0 border-t border-white/5' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          {/* Subtle paper texture crease lines */}
          <div className="relative rounded-xl p-5 bg-[#0e0e15]/90 border border-white/5 font-mono text-xs sm:text-sm text-zinc-300 leading-relaxed space-y-3">
            <div className="absolute top-2 right-3 text-[10px] text-zinc-600 flex items-center gap-1 font-mono">
              <Sparkles className="w-3 h-3 text-lime-400" /> WAX SEAL VERIFIED
            </div>
            {typeof content === 'string' ? (
              <p className="whitespace-pre-line">{content}</p>
            ) : (
              content
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
