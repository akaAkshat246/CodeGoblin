import React, { useState } from 'react';
import {
  Crown,
  Trophy,
  Flame,
  Zap,
  Sparkles,
  Medal,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GOBLIN_CHARACTERS } from '../data/mockData';

export const LeaderboardPage: React.FC = () => {
  const { allUsers, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState<'weekly' | 'allTime' | 'streak' | 'helpful'>('weekly');

  const sortedUsers = [...allUsers].sort((a, b) => {
    if (activeTab === 'streak') {
      return b.streakDays - a.streakDays || b.xp - a.xp;
    }
    if (activeTab === 'helpful') {
      return b.reputationScore - a.reputationScore || b.xp - a.xp;
    }
    if (activeTab === 'weekly') {
      // For weekly, prioritize active learners and current week momentum
      return b.xp - a.xp;
    }
    return b.xp - a.xp;
  });

  const top3 = sortedUsers.slice(0, 3);
  const remainingUsers = sortedUsers.slice(3);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Crown className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-[#F5F3FF]">
              Clan Leaderboards & Reputation
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#A1A1B5] mt-1">
            Celebrating consistent building, verified quest solutions, project shipping, and peer mentorship.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#11111B] border border-white/5 self-start sm:self-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('weekly')}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeTab === 'weekly' ? 'bg-[#8B5CF6] text-white shadow-glow-purple' : 'text-[#A1A1B5] hover:text-[#F5F3FF]'
            }`}
          >
            Weekly XP
          </button>
          <button
            onClick={() => setActiveTab('allTime')}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeTab === 'allTime' ? 'bg-[#8B5CF6] text-white shadow-glow-purple' : 'text-[#A1A1B5] hover:text-[#F5F3FF]'
            }`}
          >
            All-Time XP
          </button>
          <button
            onClick={() => setActiveTab('streak')}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeTab === 'streak' ? 'bg-[#8B5CF6] text-white shadow-glow-purple' : 'text-[#A1A1B5] hover:text-[#F5F3FF]'
            }`}
          >
            Streaks (IST)
          </button>
          <button
            onClick={() => setActiveTab('helpful')}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeTab === 'helpful' ? 'bg-[#8B5CF6] text-white shadow-glow-purple' : 'text-[#A1A1B5] hover:text-[#F5F3FF]'
            }`}
          >
            Top Helpful
          </button>
        </div>
      </div>

      {/* TOP 3 PODIUM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-6 pb-2">
        {/* 2nd Place (Silver) */}
        {top3[1] && (
          <div
            onClick={() => navigateTo('profile', top3[1].id)}
            className="goblin-card p-6 flex flex-col items-center text-center justify-between border-slate-400/30 cursor-pointer order-2 md:order-1 transition hover:-translate-y-1"
          >
            <div className="w-full flex justify-between items-center text-xs mb-2 text-slate-400 font-bold">
              <span className="flex items-center gap-1">
                <Medal className="w-4 h-4 text-slate-300" />
                <span>#2 Silver Goblin</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-400/10 text-slate-300">
                Lvl {top3[1].level}
              </span>
            </div>

            <div className="relative my-3">
              <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-slate-400/60 shadow-lg">
                <img
                  src={
                    GOBLIN_CHARACTERS.find((g) => g.id === top3[1].avatarGoblinId)?.avatarImg ||
                    GOBLIN_CHARACTERS[0].avatarImg
                  }
                  alt={top3[1].displayName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#F5F3FF]">{top3[1].displayName}</h3>
              <p className="text-xs text-[#A1A1B5] font-mono">@{top3[1].username}</p>
              <p className="text-[11px] text-[#A3E635] mt-1 font-semibold">{top3[1].college}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 w-full flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">{top3[1].streakDays}d streak</span>
              <span className="text-[#A3E635] font-bold">
                {activeTab === 'helpful' ? `${top3[1].reputationScore} Rep` : `${top3[1].xp} XP`}
              </span>
            </div>
          </div>
        )}

        {/* 1st Place (Gold) - Elevated Center */}
        {top3[0] && (
          <div
            onClick={() => navigateTo('profile', top3[0].id)}
            className="goblin-card p-6 flex flex-col items-center text-center justify-between border-amber-400/60 shadow-glow-green cursor-pointer order-1 md:order-2 md:-translate-y-4 transition hover:-translate-y-5 bg-gradient-to-b from-[#1E1E32] to-[#171725]"
          >
            <div className="w-full flex justify-between items-center text-xs mb-2 text-amber-400 font-black">
              <span className="flex items-center gap-1.5">
                <Crown className="w-5 h-5 text-amber-400 animate-bounce" />
                <span>#1 Champion</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300">
                Lvl {top3[0].level}
              </span>
            </div>

            <div className="relative my-3">
              <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-amber-400 shadow-glow-combined">
                <img
                  src={
                    GOBLIN_CHARACTERS.find((g) => g.id === top3[0].avatarGoblinId)?.avatarImg ||
                    GOBLIN_CHARACTERS[0].avatarImg
                  }
                  alt={top3[0].displayName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-black text-[#F5F3FF]">{top3[0].displayName}</h3>
              <p className="text-xs text-[#A1A1B5] font-mono">@{top3[0].username}</p>
              <p className="text-xs text-[#A3E635] mt-1 font-semibold">{top3[0].college}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 w-full flex items-center justify-between text-xs font-mono">
              <span className="text-amber-400 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-amber-400/30" />
                <span>{top3[0].streakDays}d streak</span>
              </span>
              <span className="text-[#A3E635] font-black text-sm">
                {activeTab === 'helpful' ? `${top3[0].reputationScore} Rep` : `${top3[0].xp} XP`}
              </span>
            </div>
          </div>
        )}

        {/* 3rd Place (Bronze) */}
        {top3[2] && (
          <div
            onClick={() => navigateTo('profile', top3[2].id)}
            className="goblin-card p-6 flex flex-col items-center text-center justify-between border-amber-700/40 cursor-pointer order-3 transition hover:-translate-y-1"
          >
            <div className="w-full flex justify-between items-center text-xs mb-2 text-amber-600 font-bold">
              <span className="flex items-center gap-1">
                <Medal className="w-4 h-4 text-amber-600" />
                <span>#3 Bronze Goblin</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-700/10 text-amber-500">
                Lvl {top3[2].level}
              </span>
            </div>

            <div className="relative my-3">
              <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-amber-700/60 shadow-lg">
                <img
                  src={
                    GOBLIN_CHARACTERS.find((g) => g.id === top3[2].avatarGoblinId)?.avatarImg ||
                    GOBLIN_CHARACTERS[0].avatarImg
                  }
                  alt={top3[2].displayName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#F5F3FF]">{top3[2].displayName}</h3>
              <p className="text-xs text-[#A1A1B5] font-mono">@{top3[2].username}</p>
              <p className="text-[11px] text-[#A3E635] mt-1 font-semibold">{top3[2].college}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 w-full flex items-center justify-between text-xs font-mono">
              <span className="text-amber-600">{top3[2].streakDays}d streak</span>
              <span className="text-[#A3E635] font-bold">
                {activeTab === 'helpful' ? `${top3[2].reputationScore} Rep` : `${top3[2].xp} XP`}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* REMAINING RANKINGS TABLE */}
      <div className="goblin-card overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between text-xs font-bold text-[#A1A1B5] uppercase tracking-wider">
          <span>Rank & Member</span>
          <div className="flex items-center gap-8">
            <span className="hidden sm:inline">Streak</span>
            <span>Reputation</span>
            <span>Total Score</span>
          </div>
        </div>

        <div className="divide-y divide-white/5">
          {sortedUsers.map((user, index) => {
            const goblin = GOBLIN_CHARACTERS.find((g) => g.id === user.avatarGoblinId) || GOBLIN_CHARACTERS[0];
            return (
              <div
                key={user.id}
                onClick={() => navigateTo('profile', user.id)}
                className="px-6 py-3.5 flex items-center justify-between hover:bg-[#1E1E32] cursor-pointer transition text-xs"
              >
                <div className="flex items-center gap-3.5">
                  <span className="w-6 font-black text-center text-[#A1A1B5]">
                    #{index + 1}
                  </span>
                  <img
                    src={goblin.avatarImg}
                    alt={user.displayName}
                    className="w-8 h-8 rounded-xl object-cover ring-1 ring-white/10"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#F5F3FF]">{user.displayName}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#8B5CF6]/20 text-[#C084FC]">
                        Lvl {user.level}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#A1A1B5]">{user.college}</p>
                  </div>
                </div>

                <div className="flex items-center gap-8 font-mono">
                  <span className="hidden sm:inline text-amber-400 font-semibold">
                    {user.streakDays}d
                  </span>
                  <span className="text-[#C084FC] font-semibold">
                    {user.reputationScore}
                  </span>
                  <span className="text-[#A3E635] font-black text-sm">
                    {user.xp} XP
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fairness & Anti-Cheat Note */}
      <div className="p-4 rounded-2xl bg-[#11111B] border border-white/5 text-xs text-[#A1A1B5] flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[#A3E635] shrink-0" />
        <span>
          Leaderboards are updated deterministically in Asia/Kolkata timezone. Spam, self-awarded XP, and fraudulent activity are automatically filtered by clan moderation.
        </span>
      </div>
    </div>
  );
};
