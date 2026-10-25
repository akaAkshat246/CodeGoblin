import React from 'react';
import { Sparkles, Trophy, Flame, ChevronRight, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GOBLIN_CHARACTERS } from '../data/mockData';

export const LevelUpModal: React.FC = () => {
  const { levelUpData, closeLevelUpModal, currentUser } = useApp();

  if (!levelUpData) return null;

  const currentGoblin = GOBLIN_CHARACTERS.find((g) => g.id === currentUser?.avatarGoblinId) || GOBLIN_CHARACTERS[1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md p-6 rounded-3xl bg-[#11111B] border border-[#A3E635]/40 shadow-glow-green text-center overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#A3E635]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#8B5CF6]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={closeLevelUpModal}
          className="absolute top-4 right-4 p-2 rounded-xl text-[#A1A1B5] hover:text-[#F5F3FF] hover:bg-[#171725] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Mascot Avatar in Gold Ring */}
        <div className="relative mx-auto w-24 h-24 mb-4">
          <div className="w-full h-full rounded-2xl overflow-hidden ring-4 ring-[#A3E635] shadow-glow-green">
            <img
              src={currentGoblin.avatarImg}
              alt="Level Up Goblin"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-[#A3E635] text-[#09090F] font-black text-xs">
            ★ LVL {levelUpData.newLevel}
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A3E635]/15 text-[#A3E635] text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Rank Ascension</span>
        </div>

        <h3 className="text-2xl font-display font-black text-[#F5F3FF] tracking-tight">
          LEVEL {levelUpData.newLevel} UNLOCKED!
        </h3>

        <p className="text-xs text-[#A1A1B5] mt-1.5 max-w-xs mx-auto leading-relaxed">
          Your coding contributions have elevated your standing in the goblin hierarchy.
        </p>

        {/* Unlocked Perks Card */}
        <div className="mt-5 p-3.5 rounded-2xl bg-[#171725] border border-white/5 text-left space-y-2 text-xs">
          <div className="font-bold text-[#F5F3FF] flex items-center gap-1.5 text-xs">
            <Trophy className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span>New Goblin Powers Unlocked:</span>
          </div>
          <div className="flex items-center gap-2 text-[#A1A1B5]">
            <span className="text-[#A3E635]">✔</span>
            <span>Increased reputation multiplier on discussion solutions</span>
          </div>
          <div className="flex items-center gap-2 text-[#A1A1B5]">
            <span className="text-[#A3E635]">✔</span>
            <span>Ability to pin priority collaboration requests in Squads</span>
          </div>
          <div className="flex items-center gap-2 text-[#A1A1B5]">
            <span className="text-[#A3E635]">✔</span>
            <span>Eligible for exclusive GoblinHacks 2026 bounty tracks</span>
          </div>
        </div>

        <button
          onClick={closeLevelUpModal}
          className="mt-6 w-full goblin-btn-green py-2.5 text-xs font-bold flex items-center justify-center gap-2"
        >
          <span>Claim Goblin Honors & Continue</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
