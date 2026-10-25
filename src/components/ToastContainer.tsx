import React from 'react';
import { Sparkles, CheckCircle2, Trophy, Info, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isXP = toast.type === 'xp';
        const isAchievement = toast.type === 'achievement';
        const isSuccess = toast.type === 'success';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl border shadow-2xl backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-3 fade-in ${
              isXP
                ? 'bg-[#171725]/95 border-[#A3E635]/40 text-[#F5F3FF] shadow-glow-green'
                : isAchievement
                ? 'bg-[#171725]/95 border-[#8B5CF6]/50 text-[#F5F3FF] shadow-glow-purple'
                : isSuccess
                ? 'bg-[#171725]/95 border-emerald-500/40 text-[#F5F3FF]'
                : 'bg-[#171725]/95 border-white/10 text-[#F5F3FF]'
            }`}
          >
            <div className="mt-0.5">
              {isXP ? (
                <div className="w-7 h-7 rounded-lg bg-[#A3E635]/20 flex items-center justify-center text-[#A3E635]">
                  <Zap className="w-4 h-4" />
                </div>
              ) : isAchievement ? (
                <div className="w-7 h-7 rounded-lg bg-[#8B5CF6]/20 flex items-center justify-center text-[#A855F7]">
                  <Trophy className="w-4 h-4" />
                </div>
              ) : isSuccess ? (
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              ) : (
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#A1A1B5]">
                  <Info className="w-4 h-4" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <h4 className="text-xs font-bold tracking-tight text-[#F5F3FF] flex items-center gap-1.5">
                {toast.title}
                {isXP && <span className="text-[10px] text-[#A3E635] font-mono">GAIN</span>}
              </h4>
              <p className="text-[11px] text-[#A1A1B5] leading-relaxed mt-0.5">{toast.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
