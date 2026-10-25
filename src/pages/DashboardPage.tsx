import React from 'react';
import {
  Sparkles,
  Flame,
  Trophy,
  Scroll,
  MessageSquare,
  Users2,
  Hammer,
  ArrowRight,
  CheckCircle2,
  Calendar,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Zap,
  Award,
  Crown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GOBLIN_CHARACTERS, INITIAL_ACHIEVEMENTS } from '../data/mockData';

export const DashboardPage: React.FC = () => {
  const {
    currentUser,
    navigateTo,
    quests,
    completedQuestIds,
    completeQuest,
    posts,
    hackathons,
    squads,
    allUsers,
    projects
  } = useApp();

  if (!currentUser) return null;

  const activeGoblin = GOBLIN_CHARACTERS.find((g) => g.id === currentUser.avatarGoblinId) || GOBLIN_CHARACTERS[1];
  const dailyQuests = quests.filter((q) => q.isDailyQuest);
  const trendingPosts = [...posts].sort((a, b) => b.upvotes - a.upvotes).slice(0, 3);
  const upcomingHackathon = hackathons.find((h) => h.status === 'Upcoming') || hackathons[0];
  const sortedMembers = [...allUsers].sort((a, b) => b.xp - a.xp);

  // Time of day greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  // XP progress calculation
  const currentXP = currentUser.xp;
  const currentLevel = currentUser.level;
  const prevLevelXP = Math.pow(currentLevel - 1, 2) * 60;
  const nextLevelXP = Math.pow(currentLevel, 2) * 60;
  const levelProgressPercent = Math.min(
    100,
    Math.max(0, Math.round(((currentXP - prevLevelXP) / (nextLevelXP - prevLevelXP)) * 100))
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* 1. TOP HERO PROFILE & WELCOME BANNER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#171725] via-[#11111B] to-[#171725] border border-[#8B5CF6]/30 shadow-2xl relative overflow-hidden">
        {/* Ambient glow backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#8B5CF6]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#A3E635]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Mascot Avatar with Level Ring */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden ring-4 ring-[#8B5CF6]/50 shadow-glow-purple">
                <img
                  src={activeGoblin.avatarImg}
                  alt={currentUser.displayName}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute -bottom-2 -right-1 px-2.5 py-0.5 rounded-full bg-[#A3E635] text-[#09090F] font-black text-xs shadow-sm">
                Lvl {currentUser.level}
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-[#A855F7] uppercase tracking-wider">
                  Goblin HQ • {currentUser.role}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#A3E635]/15 text-[#A3E635] border border-[#A3E635]/30">
                  {activeGoblin.roleTitle}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-black text-[#F5F3FF] mt-1">
                {greeting}, {currentUser.displayName}!
              </h1>
              <p className="text-xs sm:text-sm text-[#A1A1B5] mt-1 font-mono">
                {currentUser.college} • {currentUser.yearOfStudy}
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            <button
              onClick={() => navigateTo('discussions')}
              className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl bg-[#171725] border border-[#8B5CF6]/30 hover:border-[#8B5CF6] text-xs font-semibold text-[#F5F3FF] flex items-center justify-center gap-2 transition"
            >
              <MessageSquare className="w-4 h-4 text-[#8B5CF6]" />
              <span>Ask in Den</span>
            </button>
            <button
              onClick={() => navigateTo('projects')}
              className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl bg-[#171725] border border-white/10 hover:border-amber-400 text-xs font-semibold text-[#F5F3FF] flex items-center justify-center gap-2 transition"
            >
              <Hammer className="w-4 h-4 text-amber-400" />
              <span>Forge Project</span>
            </button>
            <button
              onClick={() => navigateTo('squads')}
              className="flex-1 sm:flex-none goblin-btn-green py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-2"
            >
              <Users2 className="w-4 h-4 text-[#09090F]" />
              <span>Find Squad</span>
            </button>
          </div>
        </div>

        {/* Level Progression Progress Bar */}
        <div className="mt-6 pt-5 border-t border-white/5">
          <div className="flex items-center justify-between text-xs mb-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#F5F3FF]">Level {currentLevel} Ascension</span>
              <span className="text-[#A1A1B5]">
                ({currentXP} / {nextLevelXP} XP)
              </span>
            </div>
            <span className="font-mono text-xs text-[#A3E635] font-bold">
              {nextLevelXP - currentXP} XP until Level {currentLevel + 1}
            </span>
          </div>

          <div className="w-full h-2.5 rounded-full bg-[#11111B] overflow-hidden p-0.5 border border-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#A3E635] transition-all duration-500 shadow-glow-green"
              style={{ width: `${Math.max(5, levelProgressPercent)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. STATS & STREAK CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak card */}
        <div className="goblin-card p-4 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#A1A1B5] uppercase tracking-wider">
              Activity Streak (IST)
            </span>
            <div className="text-xl font-black text-[#F5F3FF] flex items-baseline gap-1.5">
              <span>{currentUser.streakDays} Days</span>
              <span className="text-xs text-[#A1A1B5] font-normal">/ {currentUser.longestStreak} max</span>
            </div>
          </div>
        </div>

        {/* Reputation Score */}
        <div className="goblin-card p-4 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#A855F7] shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#A1A1B5] uppercase tracking-wider">
              Reputation Score
            </span>
            <div className="text-xl font-black text-[#F5F3FF]">
              {currentUser.reputationScore} Rep
            </div>
          </div>
        </div>

        {/* Quests Completed */}
        <div className="goblin-card p-4 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#A3E635]/15 border border-[#A3E635]/30 flex items-center justify-center text-[#A3E635] shrink-0">
            <Scroll className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#A1A1B5] uppercase tracking-wider">
              Completed Quests
            </span>
            <div className="text-xl font-black text-[#F5F3FF]">
              {completedQuestIds.length} Sprints
            </div>
          </div>
        </div>

        {/* Active Squads */}
        <div className="goblin-card p-4 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
            <Users2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#A1A1B5] uppercase tracking-wider">
              Active Squads
            </span>
            <div className="text-xl font-black text-[#F5F3FF]">
              {squads.length} Teams
            </div>
          </div>
        </div>
      </div>

      {/* 3. MAIN DASHBOARD SPLIT: DAILY QUESTS & UPCOMING HACKATHON */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Today's Daily Quests */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scroll className="w-4 h-4 text-[#A3E635]" />
              <h2 className="text-base font-bold text-[#F5F3FF]">
                Today's Learning Quests (Asia/Kolkata)
              </h2>
            </div>
            <button
              onClick={() => navigateTo('quests')}
              className="text-xs text-[#A855F7] hover:text-[#A3E635] font-semibold transition"
            >
              All 8 Tracks →
            </button>
          </div>

          <div className="space-y-3">
            {dailyQuests.map((quest) => {
              const isDone = completedQuestIds.includes(quest.id);
              return (
                <div
                  key={quest.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isDone
                      ? 'bg-[#171725]/50 border-emerald-500/20 text-[#A1A1B5]'
                      : 'bg-[#171725] border-[#8B5CF6]/20 hover:border-[#8B5CF6]/50 text-[#F5F3FF]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#8B5CF6]/20 text-[#C084FC]">
                          {quest.category}
                        </span>
                        <span className="text-[10px] text-[#A1A1B5]">
                          ~{quest.estimatedMinutes} mins
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-[#F5F3FF]">{quest.title}</h4>
                      <p className="text-xs text-[#A1A1B5] mt-1 leading-relaxed">
                        {quest.description}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="inline-block px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#A3E635]/15 text-[#A3E635] mb-2">
                        +{quest.xpReward} XP
                      </span>
                      <div>
                        {isDone ? (
                          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Done</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => completeQuest(quest.id)}
                            className="goblin-btn-green py-1 px-3 text-xs font-bold"
                          >
                            Submit & Claim XP
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trending Discussions in Goblin Den */}
          <div className="pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#8B5CF6]" />
                <h2 className="text-base font-bold text-[#F5F3FF]">
                  Trending in The Goblin Den
                </h2>
              </div>
              <button
                onClick={() => navigateTo('discussions')}
                className="text-xs text-[#A855F7] hover:text-[#A3E635] font-semibold transition"
              >
                Join Discussions →
              </button>
            </div>

            <div className="space-y-2.5">
              {trendingPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => navigateTo('discussion_detail', post.id)}
                  className="p-3.5 rounded-2xl bg-[#171725] border border-white/5 hover:border-[#8B5CF6]/40 cursor-pointer transition flex items-center justify-between group"
                >
                  <div className="overflow-hidden pr-3">
                    <div className="flex items-center gap-2 text-[10px] text-[#A1A1B5] mb-0.5">
                      <span className="text-[#A3E635] font-semibold">[{post.category}]</span>
                      <span>By {post.authorName}</span>
                      {post.solved && (
                        <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                          ✓ Solved
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-[#F5F3FF] group-hover:text-[#A855F7] transition truncate">
                      {post.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 text-xs text-[#A1A1B5]">
                    <span>{post.upvotes} ▲</span>
                    <span>{post.repliesCount} 💬</span>
                    <ChevronRight className="w-4 h-4 text-[#8B5CF6]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Hackathon Spotlight & Leaderboard Widget */}
        <div className="space-y-6">
          {/* Upcoming Hackathon Card */}
          <div className="goblin-card p-5 space-y-4 border-[#A3E635]/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                <Trophy className="w-4 h-4" />
                <span>Next Big Event</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/15 text-amber-400">
                {upcomingHackathon.status}
              </span>
            </div>

            <div className="rounded-xl overflow-hidden h-28 relative">
              <img
                src={upcomingHackathon.bannerImage}
                alt={upcomingHackathon.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090F] via-transparent to-transparent" />
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#F5F3FF]">
                {upcomingHackathon.title}
              </h3>
              <p className="text-xs text-[#A1A1B5] mt-1 line-clamp-2">
                {upcomingHackathon.description}
              </p>
              <div className="mt-2.5 flex items-center justify-between text-xs text-[#A3E635] font-semibold font-mono">
                <span>Prize: {upcomingHackathon.prizePool}</span>
                <span className="text-[#A1A1B5]">{upcomingHackathon.teamSize}</span>
              </div>
            </div>

            <button
              onClick={() => navigateTo('hackathons')}
              className="w-full goblin-btn-primary py-2 text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <span>View Hackathon & Form Squad</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Weekly Top Goblins Podium Preview */}
          <div className="goblin-card p-5 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#F5F3FF]">
                <Crown className="w-4 h-4 text-amber-400" />
                <span>Clan Podium (Weekly XP)</span>
              </div>
              <button
                onClick={() => navigateTo('leaderboards')}
                className="text-[11px] text-[#A855F7] hover:text-[#A3E635]"
              >
                Full Roster →
              </button>
            </div>

            <div className="space-y-2">
              {sortedMembers.slice(0, 3).map((member, index) => {
                const goblin = GOBLIN_CHARACTERS.find((g) => g.id === member.avatarGoblinId) || GOBLIN_CHARACTERS[0];
                return (
                  <div
                    key={member.id}
                    onClick={() => navigateTo('profile', member.id)}
                    className="p-2 rounded-xl bg-[#11111B] border border-white/5 hover:border-[#8B5CF6]/40 cursor-pointer flex items-center justify-between transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-5 text-center font-black text-xs ${
                          index === 0
                            ? 'text-amber-400'
                            : index === 1
                            ? 'text-slate-300'
                            : 'text-amber-600'
                        }`}
                      >
                        #{index + 1}
                      </span>
                      <img
                        src={goblin.avatarImg}
                        alt={member.displayName}
                        className="w-7 h-7 rounded-lg object-cover ring-1 ring-white/10"
                      />
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-[#F5F3FF] truncate">{member.displayName}</p>
                        <p className="text-[10px] text-[#A1A1B5]">Lvl {member.level} • {member.streakDays}d streak</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#A3E635]">
                      {member.xp} XP
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
