import React, { useState } from 'react';
import {
  Trophy,
  Flame,
  Medal,
  ArrowUp,
  ArrowDown,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GOBLIN_CHARACTERS } from '../data/mockData';

export const LeaderboardPage: React.FC = () => {
  const { allUsers, currentUser, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState<'weekly' | 'allTime' | 'streak' | 'helpful'>('weekly');

  const sortedUsers = [...allUsers].sort((a, b) => {
    if (activeTab === 'streak') {
      return b.streakDays - a.streakDays || b.xp - a.xp;
    }
    if (activeTab === 'helpful') {
      return b.reputationScore - a.reputationScore || b.xp - a.xp;
    }
    return b.xp - a.xp;
  });

  const top3 = sortedUsers.slice(0, 3);
  const userRankIndex = currentUser ? sortedUsers.findIndex((u) => u.id === currentUser.id) : -1;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Leaderboards & Reputation
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Community rankings verified by completed quests, shipped projects, and helpful answers.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-[#111118] border border-white/[0.06] self-start sm:self-auto text-xs">
          {(
            [
              { id: 'weekly', label: 'Weekly XP' },
              { id: 'allTime', label: 'All-Time' },
              { id: 'streak', label: 'Streaks' },
              { id: 'helpful', label: 'Helpful' }
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-black font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Your Standing Banner */}
      {currentUser && userRankIndex !== -1 && (
        <div className="p-4 rounded-xl bg-[#111118] border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-lg bg-white/[0.04] text-white font-mono font-bold text-sm flex items-center justify-center border border-white/[0.08]">
              #{userRankIndex + 1}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-white">
                  Your Rank: {currentUser.displayName}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-lime-400/10 text-lime-400 border border-lime-400/20 flex items-center gap-0.5">
                  <ArrowUp className="w-2.5 h-2.5" />
                  <span>+{currentUser.rankChange || 2}</span>
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Level {currentUser.level} {currentUser.role} • {currentUser.streakDays}d streak • {currentUser.college}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 text-xs">
            <div>
              <span className="text-[10px] text-zinc-500 uppercase block font-medium">Reputation</span>
              <span className="font-semibold text-purple-300 font-mono text-sm">{currentUser.reputationScore}</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 uppercase block font-medium">Total Score</span>
              <span className="font-semibold text-lime-400 font-mono text-sm">{currentUser.xp} XP</span>
            </div>
            <button
              onClick={() => navigateTo('profile')}
              className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white text-xs font-medium transition-colors"
            >
              My Profile
            </button>
          </div>
        </div>
      )}

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 2nd Place (Silver) */}
        {top3[1] && (
          <div
            onClick={() => navigateTo('profile', top3[1].id)}
            className="p-5 rounded-xl bg-[#111118] border border-white/[0.06] hover:border-white/[0.12] flex flex-col items-center text-center justify-between cursor-pointer transition-colors order-2 md:order-1"
          >
            <div className="w-full flex justify-between items-center text-xs mb-3 text-zinc-400">
              <span className="flex items-center gap-1 font-medium text-zinc-300">
                <Medal className="w-4 h-4 text-zinc-300" />
                <span>#2 Silver</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.04] text-zinc-400">
                Lvl {top3[1].level}
              </span>
            </div>

            <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 my-2">
              <img
                src={
                  GOBLIN_CHARACTERS.find((g) => g.id === top3[1].avatarGoblinId)?.avatarImg ||
                  GOBLIN_CHARACTERS[0].avatarImg
                }
                alt={top3[1].displayName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-2">
              <h3 className="text-sm font-semibold text-white">{top3[1].displayName}</h3>
              <p className="text-xs text-zinc-500 font-mono">@{top3[1].username}</p>
              <p className="text-[11px] text-zinc-400 mt-1">{top3[1].college}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.06] w-full flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-500">{top3[1].streakDays}d streak</span>
              <span className="text-lime-400 font-semibold">
                {activeTab === 'helpful' ? `${top3[1].reputationScore} Rep` : `${top3[1].xp} XP`}
              </span>
            </div>
          </div>
        )}

        {/* 1st Place (Gold) */}
        {top3[0] && (
          <div
            onClick={() => navigateTo('profile', top3[0].id)}
            className="p-5 rounded-xl bg-[#111118] border border-amber-400/30 hover:border-amber-400/50 flex flex-col items-center text-center justify-between cursor-pointer transition-colors order-1 md:order-2"
          >
            <div className="w-full flex justify-between items-center text-xs mb-3 text-amber-400 font-semibold">
              <span className="flex items-center gap-1">
                <Medal className="w-4 h-4 text-amber-400" />
                <span>#1 Champion</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
                Lvl {top3[0].level}
              </span>
            </div>

            <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-amber-400/40 my-1">
              <img
                src={
                  GOBLIN_CHARACTERS.find((g) => g.id === top3[0].avatarGoblinId)?.avatarImg ||
                  GOBLIN_CHARACTERS[0].avatarImg
                }
                alt={top3[0].displayName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-2">
              <h3 className="text-base font-semibold text-white">{top3[0].displayName}</h3>
              <p className="text-xs text-zinc-500 font-mono">@{top3[0].username}</p>
              <p className="text-[11px] text-zinc-400 mt-1">{top3[0].college}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.06] w-full flex items-center justify-between text-xs font-mono">
              <span className="text-amber-400 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" />
                <span>{top3[0].streakDays}d streak</span>
              </span>
              <span className="text-lime-400 font-bold">
                {activeTab === 'helpful' ? `${top3[0].reputationScore} Rep` : `${top3[0].xp} XP`}
              </span>
            </div>
          </div>
        )}

        {/* 3rd Place (Bronze) */}
        {top3[2] && (
          <div
            onClick={() => navigateTo('profile', top3[2].id)}
            className="p-5 rounded-xl bg-[#111118] border border-white/[0.06] hover:border-white/[0.12] flex flex-col items-center text-center justify-between cursor-pointer transition-colors order-3"
          >
            <div className="w-full flex justify-between items-center text-xs mb-3 text-zinc-400">
              <span className="flex items-center gap-1 font-medium text-amber-500">
                <Medal className="w-4 h-4 text-amber-500" />
                <span>#3 Bronze</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.04] text-zinc-400">
                Lvl {top3[2].level}
              </span>
            </div>

            <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 my-2">
              <img
                src={
                  GOBLIN_CHARACTERS.find((g) => g.id === top3[2].avatarGoblinId)?.avatarImg ||
                  GOBLIN_CHARACTERS[0].avatarImg
                }
                alt={top3[2].displayName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-2">
              <h3 className="text-sm font-semibold text-white">{top3[2].displayName}</h3>
              <p className="text-xs text-zinc-500 font-mono">@{top3[2].username}</p>
              <p className="text-[11px] text-zinc-400 mt-1">{top3[2].college}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.06] w-full flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-500">{top3[2].streakDays}d streak</span>
              <span className="text-lime-400 font-semibold">
                {activeTab === 'helpful' ? `${top3[2].reputationScore} Rep` : `${top3[2].xp} XP`}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Leaderboard Table */}
      <div className="rounded-xl bg-[#111118] border border-white/[0.06] overflow-hidden">
        <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
          <span>Rank & Member</span>
          <div className="flex items-center gap-6 sm:gap-8">
            <span className="hidden sm:inline">Move</span>
            <span className="hidden sm:inline">Streak</span>
            <span>Rep</span>
            <span>Score</span>
          </div>
        </div>

        <div className="divide-y divide-white/[0.04]">
          {sortedUsers.map((user, index) => {
            const goblin = GOBLIN_CHARACTERS.find((g) => g.id === user.avatarGoblinId) || GOBLIN_CHARACTERS[0];
            const change = user.rankChange || 0;
            return (
              <div
                key={user.id}
                onClick={() => navigateTo('profile', user.id)}
                className={`px-5 py-3.5 flex items-center justify-between hover:bg-white/[0.02] cursor-pointer transition-colors text-xs ${
                  user.id === currentUser?.id ? 'bg-white/[0.03]' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-5 font-mono text-center text-zinc-500 text-xs font-medium">
                    #{index + 1}
                  </span>
                  <img
                    src={goblin.avatarImg}
                    alt={user.displayName}
                    className="w-7 h-7 rounded-lg object-cover border border-white/10"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-white">{user.displayName}</span>
                      <span className="text-[10px] px-1 py-0.2 rounded bg-white/[0.04] text-zinc-400">
                        Lvl {user.level}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500">{user.college}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 sm:gap-8 font-mono text-xs">
                  <div className="hidden sm:flex items-center gap-1 text-[11px]">
                    {change > 0 ? (
                      <span className="text-lime-400 flex items-center gap-0.5">
                        <ArrowUp className="w-3 h-3" />
                        +{change}
                      </span>
                    ) : change < 0 ? (
                      <span className="text-rose-400 flex items-center gap-0.5">
                        <ArrowDown className="w-3 h-3" />
                        {change}
                      </span>
                    ) : (
                      <span className="text-zinc-600">• 0</span>
                    )}
                  </div>
                  <span className="hidden sm:inline text-zinc-400">
                    {user.streakDays}d
                  </span>
                  <span className="text-purple-300">
                    {user.reputationScore}
                  </span>
                  <span className="text-lime-400 font-semibold">
                    {user.xp} XP
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rules Notice */}
      <div className="p-3.5 rounded-xl bg-[#111118] border border-white/[0.06] text-xs text-zinc-400 flex items-center gap-2.5">
        <ShieldCheck className="w-4 h-4 text-lime-400 shrink-0" />
        <span>
          XP is earned by verified submissions (+150-250 XP per quest, +200-500 XP per project, +50 XP per accepted answer). Spam is automatically disqualified.
        </span>
      </div>
    </div>
  );
};
