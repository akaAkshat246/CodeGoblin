import React, { useState } from 'react';
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
  Crown,
  Check,
  Clock,
  Filter,
  Layers,
  ArrowUpRight,
  Search
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { GOBLIN_CHARACTERS } from '../data/mockData';
import { SEOHead } from '../components/SEOHead';

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

  const [activeTab, setActiveTab] = useState<'overview' | 'quests' | 'discussions' | 'events'>('overview');
  const [questFilter, setQuestFilter] = useState<'all' | 'pending' | 'completed'>('all');

  if (!currentUser) return null;

  const activeGoblin = GOBLIN_CHARACTERS.find((g) => g.id === currentUser.avatarGoblinId) || GOBLIN_CHARACTERS[1];
  const dailyQuests = quests.filter((q) => q.isDailyQuest);
  const trendingPosts = [...posts].sort((a, b) => b.upvotes - a.upvotes).slice(0, 4);
  const upcomingHackathon = hackathons.find((h) => h.status === 'Upcoming') || hackathons[0];
  const sortedMembers = [...allUsers].sort((a, b) => b.xp - a.xp);

  // Time of day greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  // XP & Level calculations
  const currentXP = currentUser.xp;
  const currentLevel = currentUser.level;
  const prevLevelXP = Math.pow(currentLevel - 1, 2) * 60;
  const nextLevelXP = Math.pow(currentLevel, 2) * 60;
  const xpNeeded = Math.max(0, nextLevelXP - currentXP);
  const levelProgressPercent = Math.min(
    100,
    Math.max(0, Math.round(((currentXP - prevLevelXP) / (nextLevelXP - prevLevelXP)) * 100))
  );

  const handleClaimQuest = (questId: string) => {
    completeQuest(questId);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#A3E635', '#8B5CF6']
    });
  };

  const filteredQuests = quests.filter((q) => {
    const isCompleted = completedQuestIds.includes(q.id);
    if (questFilter === 'pending') return !isCompleted;
    if (questFilter === 'completed') return isCompleted;
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      <SEOHead
        title="Command Dashboard"
        description="Personal developer hub: manage learning quests, monitor clan streak, track XP level, and review upcoming sprints."
        canonicalPath="/dashboard"
        pageId="dashboard"
      />

      {/* 1. MODERN V2.1 CLEAN HEADER (DECLUTTERED) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div className="flex items-center gap-3.5">
          <div className="relative shrink-0">
            <img
              src={activeGoblin.avatarImg}
              alt={currentUser.displayName}
              className="w-12 h-12 rounded-xl object-cover ring-1 ring-white/10"
            />
            <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-md bg-[#A3E635] text-[#09090F] font-black text-[10px] leading-tight">
              L{currentLevel}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#F5F3FF]">
                {greeting}, {currentUser.displayName}
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#8B5CF6]/20 text-[#C084FC]">
                {activeGoblin.roleTitle}
              </span>
            </div>
            <p className="text-xs text-[#A1A1B5] mt-0.5">
              {currentUser.college ? `${currentUser.college} • ` : ''}Clan Rank #{sortedMembers.findIndex(m => m.id === currentUser.id) + 1}
            </p>
          </div>
        </div>

        {/* Quick Action Pills */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => navigateTo('projects')}
            className="px-3 py-1.5 rounded-lg bg-[#171725] border border-white/10 hover:border-white/20 text-xs font-semibold text-[#F5F3FF] transition flex items-center gap-1.5"
          >
            <Hammer className="w-3.5 h-3.5 text-amber-400" />
            <span>New Project</span>
          </button>
          <button
            onClick={() => navigateTo('discussions')}
            className="px-3 py-1.5 rounded-lg bg-[#171725] border border-white/10 hover:border-white/20 text-xs font-semibold text-[#F5F3FF] transition flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span>Ask Clan</span>
          </button>
          <button
            onClick={() => navigateTo('squads')}
            className="goblin-btn-primary py-1.5 px-3 text-xs font-bold flex items-center gap-1.5"
          >
            <Users2 className="w-3.5 h-3.5" />
            <span>Find Squad</span>
          </button>
        </div>
      </div>

      {/* 2. V2.1 COMPACT KPI METRIC STRIP (4 CLEAN TILES) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Metric 1: Level Progress */}
        <div className="p-4 rounded-2xl bg-[#11111B] border border-white/5 space-y-2 hover:border-white/10 transition">
          <div className="flex items-center justify-between text-xs text-[#A1A1B5]">
            <span>Level {currentLevel} Ascension</span>
            <span className="text-[10px] font-mono text-[#A3E635] font-bold">
              {levelProgressPercent}%
            </span>
          </div>
          <div className="text-xl font-bold font-mono text-[#F5F3FF]">
            {currentXP} <span className="text-xs font-normal text-[#A1A1B5]">XP</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#171725] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#A3E635] transition-all duration-300"
              style={{ width: `${levelProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Activity Streak */}
        <div className="p-4 rounded-2xl bg-[#11111B] border border-white/5 space-y-1 hover:border-white/10 transition">
          <div className="flex items-center justify-between text-xs text-[#A1A1B5]">
            <span>Daily Streak</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-bold font-mono text-[#F5F3FF]">
            {currentUser.streakDays} <span className="text-xs font-normal text-[#A1A1B5]">days</span>
          </div>
          <p className="text-[11px] text-[#A1A1B5]">Personal record: {currentUser.longestStreak} days</p>
        </div>

        {/* Metric 3: Quests Completed */}
        <div className="p-4 rounded-2xl bg-[#11111B] border border-white/5 space-y-1 hover:border-white/10 transition">
          <div className="flex items-center justify-between text-xs text-[#A1A1B5]">
            <span>Completed Sprints</span>
            <Scroll className="w-4 h-4 text-[#A3E635]" />
          </div>
          <div className="text-xl font-bold font-mono text-[#F5F3FF]">
            {completedQuestIds.length} <span className="text-xs font-normal text-[#A1A1B5]">/ {quests.length}</span>
          </div>
          <p className="text-[11px] text-emerald-400 font-semibold">
            {quests.length - completedQuestIds.length} quests pending
          </p>
        </div>

        {/* Metric 4: Active Squads & Teams */}
        <div className="p-4 rounded-2xl bg-[#11111B] border border-white/5 space-y-1 hover:border-white/10 transition">
          <div className="flex items-center justify-between text-xs text-[#A1A1B5]">
            <span>Collaboration</span>
            <Users2 className="w-4 h-4 text-[#8B5CF6]" />
          </div>
          <div className="text-xl font-bold font-mono text-[#F5F3FF]">
            {squads.length} <span className="text-xs font-normal text-[#A1A1B5]">squads</span>
          </div>
          <p className="text-[11px] text-[#A855F7] font-semibold">
            {currentUser.reputationScore} Rep Score
          </p>
        </div>
      </div>

      {/* 3. SEGMENTED TAB NAVIGATION (DECLUTTERED) */}
      <div className="flex items-center gap-1.5 border-b border-white/5 pb-2 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3.5 py-1.5 rounded-lg transition ${
            activeTab === 'overview'
              ? 'bg-[#171725] text-[#A3E635] border border-white/10 font-bold'
              : 'text-[#A1A1B5] hover:text-[#F5F3FF]'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('quests')}
          className={`px-3.5 py-1.5 rounded-lg transition ${
            activeTab === 'quests'
              ? 'bg-[#171725] text-[#A3E635] border border-white/10 font-bold'
              : 'text-[#A1A1B5] hover:text-[#F5F3FF]'
          }`}
        >
          Sprint Quests ({quests.length})
        </button>
        <button
          onClick={() => setActiveTab('discussions')}
          className={`px-3.5 py-1.5 rounded-lg transition ${
            activeTab === 'discussions'
              ? 'bg-[#171725] text-[#A3E635] border border-white/10 font-bold'
              : 'text-[#A1A1B5] hover:text-[#F5F3FF]'
          }`}
        >
          Community Discussions ({posts.length})
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`px-3.5 py-1.5 rounded-lg transition ${
            activeTab === 'events'
              ? 'bg-[#171725] text-[#A3E635] border border-white/10 font-bold'
              : 'text-[#A1A1B5] hover:text-[#F5F3FF]'
          }`}
        >
          Upcoming Sprints ({hackathons.length})
        </button>
      </div>

      {/* 4. TAB CONTENT: OVERVIEW (CLEAN 2-COLUMN SPLIT) */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Priority Focus & Daily Sprints */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Quests Card */}
            <div className="p-5 rounded-2xl bg-[#11111B] border border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#F5F3FF] flex items-center gap-2">
                    <Scroll className="w-4 h-4 text-[#A3E635]" />
                    <span>Today's Learning Sprints</span>
                  </h3>
                  <p className="text-[11px] text-[#A1A1B5] mt-0.5">
                    Complete daily milestones to maintain your streak and earn Clan XP.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('quests')}
                  className="text-xs text-[#A855F7] hover:text-[#A3E635] font-semibold transition"
                >
                  View All →
                </button>
              </div>

              <div className="space-y-2.5">
                {dailyQuests.map((quest) => {
                  const isDone = completedQuestIds.includes(quest.id);
                  return (
                    <div
                      key={quest.id}
                      className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                        isDone
                          ? 'bg-[#171725]/40 border-white/5 text-[#A1A1B5]'
                          : 'bg-[#171725] border-white/5 hover:border-[#8B5CF6]/30 text-[#F5F3FF]'
                      }`}
                    >
                      <div className="space-y-0.5 flex-1 pr-2">
                        <div className="flex items-center gap-2 text-[10px]">
                          <span className="font-mono text-[#A855F7] font-semibold">[{quest.category}]</span>
                          <span className="text-[#A1A1B5]">~{quest.estimatedMinutes}m</span>
                        </div>
                        <h4 className="text-xs font-bold text-[#F5F3FF]">{quest.title}</h4>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        <span className="text-xs font-mono font-bold text-[#A3E635]">
                          +{quest.xpReward} XP
                        </span>
                        {isDone ? (
                          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-semibold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" />
                            <span>Done</span>
                          </span>
                        ) : (
                          <button
                            onClick={() => handleClaimQuest(quest.id)}
                            className="goblin-btn-green py-1 px-3 text-xs font-bold"
                          >
                            Complete
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Trending Discussions */}
            <div className="p-5 rounded-2xl bg-[#11111B] border border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#F5F3FF] flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#8B5CF6]" />
                    <span>Trending in The Goblin Den</span>
                  </h3>
                  <p className="text-[11px] text-[#A1A1B5] mt-0.5">
                    Active technical discussions, solved bugs, and architecture reviews.
                  </p>
                </div>
                <button
                  onClick={() => navigateTo('discussions')}
                  className="text-xs text-[#A855F7] hover:text-[#A3E635] font-semibold transition"
                >
                  Join Den →
                </button>
              </div>

              <div className="divide-y divide-white/5">
                {trendingPosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => navigateTo('discussion_detail', post.id)}
                    className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] transition px-2 rounded-lg group"
                  >
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-2 text-[10px] text-[#A1A1B5]">
                        <span className="text-[#A3E635] font-semibold">{post.category}</span>
                        <span>•</span>
                        <span>By {post.authorName}</span>
                        {post.solved && (
                          <span className="text-emerald-400 font-bold">✓ Solved</span>
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-[#F5F3FF] group-hover:text-[#A855F7] transition truncate mt-0.5">
                        {post.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 text-xs font-mono text-[#A1A1B5]">
                      <span>{post.upvotes} ▲</span>
                      <span>{post.repliesCount} 💬</span>
                      <ChevronRight className="w-4 h-4 text-[#8B5CF6]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col: Hackathon Spotlight & Clan Leaderboard Widget */}
          <div className="space-y-6">
            {/* Spotlight Hackathon */}
            <div className="p-5 rounded-2xl bg-[#11111B] border border-white/5 space-y-3.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5" /> Next Event
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400">
                  {upcomingHackathon.status}
                </span>
              </div>

              <div className="h-28 rounded-xl overflow-hidden relative">
                <img
                  src={upcomingHackathon.bannerImage}
                  alt={upcomingHackathon.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 text-xs font-bold text-[#F5F3FF]">
                  {upcomingHackathon.title}
                </span>
              </div>

              <p className="text-xs text-[#A1A1B5] line-clamp-2 leading-relaxed">
                {upcomingHackathon.description}
              </p>

              <div className="flex items-center justify-between text-xs font-mono text-[#A3E635] pt-1 border-t border-white/5">
                <span>{upcomingHackathon.prizePool}</span>
                <span className="text-[#A1A1B5]">{upcomingHackathon.teamSize}</span>
              </div>

              <button
                onClick={() => navigateTo('hackathons')}
                className="w-full goblin-btn-primary py-2 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <span>View Details & Squads</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Leaderboard Podium Preview */}
            <div className="p-5 rounded-2xl bg-[#11111B] border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#F5F3FF] flex items-center gap-1.5">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span>Clan Leaderboard</span>
                </h4>
                <button
                  onClick={() => navigateTo('leaderboards')}
                  className="text-[11px] text-[#A855F7] hover:text-[#A3E635]"
                >
                  View All →
                </button>
              </div>

              <div className="space-y-2">
                {sortedMembers.slice(0, 3).map((member, idx) => {
                  const goblin = GOBLIN_CHARACTERS.find((g) => g.id === member.avatarGoblinId) || GOBLIN_CHARACTERS[0];
                  return (
                    <div
                      key={member.id}
                      onClick={() => navigateTo('profile', member.id)}
                      className="p-2.5 rounded-xl bg-[#171725] border border-white/5 hover:border-white/10 cursor-pointer flex items-center justify-between transition"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-4 text-center font-bold text-xs ${
                            idx === 0 ? 'text-amber-400' : idx === 1 ? 'text-slate-300' : 'text-amber-600'
                          }`}
                        >
                          #{idx + 1}
                        </span>
                        <img
                          src={goblin.avatarImg}
                          alt={member.displayName}
                          className="w-7 h-7 rounded-lg object-cover"
                        />
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-[#F5F3FF] truncate">{member.displayName}</p>
                          <p className="text-[10px] text-[#A1A1B5]">Lvl {member.level} • {member.streakDays}d</p>
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
      )}

      {/* 5. TAB CONTENT: QUESTS */}
      {activeTab === 'quests' && (
        <div className="p-5 rounded-2xl bg-[#11111B] border border-white/5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
            <div>
              <h3 className="text-sm font-bold text-[#F5F3FF]">Sprint Quests Roster</h3>
              <p className="text-xs text-[#A1A1B5]">Filter and complete learning challenges to unlock perks.</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              {(['all', 'pending', 'completed'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setQuestFilter(f)}
                  className={`px-3 py-1 rounded-lg capitalize transition ${
                    questFilter === f
                      ? 'bg-[#171725] text-[#A3E635] border border-white/10'
                      : 'text-[#A1A1B5] hover:text-[#F5F3FF]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredQuests.map((quest) => {
              const isDone = completedQuestIds.includes(quest.id);
              return (
                <div
                  key={quest.id}
                  className={`p-4 rounded-xl border transition flex flex-col justify-between ${
                    isDone
                      ? 'bg-[#171725]/50 border-white/5'
                      : 'bg-[#171725] border-white/5 hover:border-[#8B5CF6]/30'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#8B5CF6]/20 text-[#C084FC]">
                        {quest.category}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#A3E635]">
                        +{quest.xpReward} XP
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#F5F3FF]">{quest.title}</h4>
                    <p className="text-xs text-[#A1A1B5] line-clamp-2">{quest.description}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-[#A1A1B5]">~{quest.estimatedMinutes} mins</span>
                    {isDone ? (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Completed
                      </span>
                    ) : (
                      <button
                        onClick={() => handleClaimQuest(quest.id)}
                        className="goblin-btn-green py-1 px-3 text-xs font-bold"
                      >
                        Claim XP
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. TAB CONTENT: DISCUSSIONS */}
      {activeTab === 'discussions' && (
        <div className="p-5 rounded-2xl bg-[#11111B] border border-white/5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div>
              <h3 className="text-sm font-bold text-[#F5F3FF]">Recent Den Conversations</h3>
              <p className="text-xs text-[#A1A1B5]">Peer problem-solving and open discussions.</p>
            </div>
            <button
              onClick={() => navigateTo('discussions')}
              className="goblin-btn-primary py-1.5 px-3 text-xs font-bold"
            >
              Open Goblin Den
            </button>
          </div>

          <div className="divide-y divide-white/5">
            {posts.map((post) => (
              <div
                key={post.id}
                onClick={() => navigateTo('discussion_detail', post.id)}
                className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] transition px-2 rounded-xl group"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#A1A1B5] mb-1">
                    <span className="text-[#A3E635] font-semibold">[{post.category}]</span>
                    <span>By {post.authorName}</span>
                    {post.solved && (
                      <span className="text-emerald-400 font-bold">✓ Solved</span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-[#F5F3FF] group-hover:text-[#A855F7] transition">
                    {post.title}
                  </h4>
                  <p className="text-xs text-[#A1A1B5] line-clamp-1 mt-0.5">{post.content}</p>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-[#A1A1B5] shrink-0">
                  <span>{post.upvotes} ▲</span>
                  <span>{post.repliesCount} 💬</span>
                  <ChevronRight className="w-4 h-4 text-[#8B5CF6]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. TAB CONTENT: EVENTS */}
      {activeTab === 'events' && (
        <div className="p-5 rounded-2xl bg-[#11111B] border border-white/5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div>
              <h3 className="text-sm font-bold text-[#F5F3FF]">Events & Sprints Calendar</h3>
              <p className="text-xs text-[#A1A1B5]">Official hackathons and hands-on workshops.</p>
            </div>
            <button
              onClick={() => navigateTo('hackathons')}
              className="goblin-btn-primary py-1.5 px-3 text-xs font-bold"
            >
              Browse All Events
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hackathons.map((evt) => (
              <div
                key={evt.id}
                className="p-4 rounded-xl bg-[#171725] border border-white/5 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#8B5CF6]/20 text-[#C084FC]">
                      {evt.type}
                    </span>
                    <span className="text-amber-400 font-mono font-bold">{evt.prizePool}</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#F5F3FF]">{evt.title}</h4>
                  <p className="text-xs text-[#A1A1B5] line-clamp-2">{evt.description}</p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-[#A1A1B5] font-mono">
                    {new Date(evt.startDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </span>
                  <button
                    onClick={() => navigateTo('hackathons')}
                    className="text-[#A3E635] hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
