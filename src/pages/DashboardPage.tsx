import React, { useState, useEffect } from 'react';
import {
  Flame,
  Check,
  ArrowRight,
  Plus,
  BookOpen,
  Calendar,
  MessageSquare,
  Sparkles,
  Trophy,
  Crown,
  Layers,
  ChevronRight,
  ExternalLink,
  Play,
  Pause,
  RotateCcw,
  Timer,
  Target,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { GOBLIN_CHARACTERS } from '../data/mockData';
import { SEOHead } from '../components/SEOHead';
import { playSuccessChime, playLevelUpFanfare } from '../utils/soundEffects';
import { SpotlightCard, NumberTicker, BarGraph, ChartJS } from '../components/framer';

export const DashboardPage: React.FC = () => {
  const {
    currentUser,
    navigateTo,
    quests,
    completedQuestIds,
    completeQuest,
    posts,
    hackathons,
    allUsers,
    roadmaps,
    completedLessonIds
  } = useApp();

  const [activeTab, setActiveTab] = useState<'tasks' | 'events' | 'discussions'>('tasks');

  if (!currentUser) return null;

  const activeGoblin = GOBLIN_CHARACTERS.find((g) => g.id === currentUser.avatarGoblinId) || GOBLIN_CHARACTERS[1];
  const dailyQuests = quests.filter((q) => q.isDailyQuest);
  const pendingQuests = dailyQuests.filter((q) => !completedQuestIds.includes(q.id));
  const upcomingHackathon = hackathons.find((h) => h.status === 'Upcoming') || hackathons[0];
  const trendingPosts = [...posts].sort((a, b) => b.upvotes - a.upvotes).slice(0, 3);
  const sortedMembers = [...allUsers].sort((a, b) => b.xp - a.xp);
  const userRank = sortedMembers.findIndex((m) => m.id === currentUser.id) + 1;

  // Next roadmap step focus
  const currentRoadmap = roadmaps[0];
  const nextStep = currentRoadmap?.steps.find((s) => !completedLessonIds.includes(s.title)) || currentRoadmap?.steps[0];

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

  // Focus Sprint (25m Deep Work Pomodoro)
  const [focusSeconds, setFocusSeconds] = useState(25 * 60);
  const [isFocusRunning, setIsFocusRunning] = useState(false);
  const [focusFinished, setFocusFinished] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isFocusRunning && focusSeconds > 0) {
      interval = setInterval(() => {
        setFocusSeconds((prev) => prev - 1);
      }, 1000);
    } else if (focusSeconds === 0 && isFocusRunning) {
      setIsFocusRunning(false);
      setFocusFinished(true);
      playLevelUpFanfare();
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#A3E635', '#8B5CF6', '#F59E0B']
      });
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isFocusRunning, focusSeconds]);

  const toggleFocus = () => {
    if (focusFinished) {
      setFocusSeconds(25 * 60);
      setFocusFinished(false);
    }
    setIsFocusRunning((prev) => !prev);
  };

  const resetFocus = () => {
    setIsFocusRunning(false);
    setFocusSeconds(25 * 60);
    setFocusFinished(false);
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Daily Builder Target
  const [dailyGoalClaimed, setDailyGoalClaimed] = useState(false);
  const dailyTargetXP = 200;
  const todayEarnedXP = 160 + (completedQuestIds.length * 20);
  const isGoalReached = todayEarnedXP >= dailyTargetXP;

  const handleClaimDailyGoal = () => {
    if (dailyGoalClaimed) return;
    setDailyGoalClaimed(true);
    playSuccessChime();
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#A3E635', '#F59E0B']
    });
  };

  const handleClaimQuest = (questId: string) => {
    completeQuest(questId);
    playSuccessChime();
    confetti({
      particleCount: 35,
      spread: 55,
      origin: { y: 0.8 },
      colors: ['#A3E635', '#8B5CF6']
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 animate-in fade-in duration-200">
      <SEOHead
        title="Dashboard"
        description="Clean, focused overview of your developer journey, daily quests, and clan milestones."
        canonicalPath="/dashboard"
        pageId="dashboard"
      />

      {/* 1. MINIMAL HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-3.5">
          <div className="relative shrink-0">
            <img
              src={activeGoblin.avatarImg}
              alt={currentUser.displayName}
              className="w-12 h-12 rounded-full object-cover ring-1 ring-white/10"
            />
            <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-[#A3E635] text-[#09090F] font-mono font-bold text-[9px] leading-none">
              L{currentLevel}
            </span>
          </div>

          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              {currentUser.displayName}
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5 flex items-center gap-2">
              <span className="text-[#A3E635] font-medium">{activeGoblin.roleTitle}</span>
              <span>•</span>
              <span>Rank #{userRank} of {allUsers.length}</span>
              {currentUser.college && (
                <>
                  <span className="hidden md:inline">•</span>
                  <span className="hidden md:inline text-zinc-500">{currentUser.college}</span>
                </>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTo('learning_hub')}
            className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-zinc-200 transition flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
            <span>Roadmaps</span>
          </button>
          <button
            onClick={() => navigateTo('projects')}
            className="px-3.5 py-2 rounded-xl bg-[#A3E635] hover:bg-[#bef264] text-[#09090F] text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* 2. MINIMAL 4-STAT METRIC STRIP WITH FRAMER SPOTLIGHT & NUMBER TICKER */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Metric 1: Level Progress */}
        <SpotlightCard className="p-4 space-y-2" spotlightColor="rgba(163, 230, 53, 0.15)">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Level {currentLevel}</span>
            <span className="font-mono text-zinc-300 font-medium">{levelProgressPercent}%</span>
          </div>
          <div className="text-lg font-bold font-mono text-white">
            <NumberTicker value={currentXP} />{' '}
            <span className="text-xs font-normal text-zinc-500">XP</span>
          </div>
          <div className="w-full h-1 rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className="h-full bg-[#A3E635] transition-all duration-300"
              style={{ width: `${levelProgressPercent}%` }}
            />
          </div>
        </SpotlightCard>

        {/* Metric 2: Streak */}
        <SpotlightCard className="p-4 space-y-2" spotlightColor="rgba(245, 158, 11, 0.15)">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Daily Streak</span>
            <Flame className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-lg font-bold font-mono text-white">
            <NumberTicker value={currentUser.streakDays} />{' '}
            <span className="text-xs font-normal text-zinc-500">days</span>
          </div>
          <p className="text-[11px] text-zinc-500">Best: {currentUser.longestStreak} days</p>
        </SpotlightCard>

        {/* Metric 3: Quests Pending */}
        <SpotlightCard className="p-4 space-y-2" spotlightColor="rgba(163, 230, 53, 0.15)">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Daily Quests</span>
            <Check className="w-3.5 h-3.5 text-[#A3E635]" />
          </div>
          <div className="text-lg font-bold font-mono text-white">
            {dailyQuests.length - pendingQuests.length}{' '}
            <span className="text-xs font-normal text-zinc-500">/ {dailyQuests.length}</span>
          </div>
          <p className="text-[11px] text-zinc-500">
            {pendingQuests.length > 0 ? `${pendingQuests.length} pending today` : 'All caught up! 🎉'}
          </p>
        </SpotlightCard>

        {/* Metric 4: Clan Rank */}
        <SpotlightCard className="p-4 space-y-2" spotlightColor="rgba(192, 132, 252, 0.15)">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Clan Standing</span>
            <Crown className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-lg font-bold font-mono text-white">
            Rank #{userRank}
          </div>
          <p className="text-[11px] text-zinc-500">Top {Math.round((userRank / allUsers.length) * 100)}% of builders</p>
        </SpotlightCard>
      </div>

      {/* 3. CURRENT FOCUS BANNER (Direct, Action-oriented) */}
      {currentRoadmap && nextStep && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#171725] to-[#111118] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#8B5CF6]/20 text-[#C084FC]">
                Current Roadmap
              </span>
              <span className="text-xs text-zinc-400 font-medium">
                {currentRoadmap.title}
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-white">
              Next Up: {nextStep.title}
            </h2>
            <p className="text-xs text-zinc-400 line-clamp-1">
              {nextStep.description}
            </p>
          </div>

          <button
            onClick={() => navigateTo('learning_hub')}
            className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.1] text-xs font-semibold text-white transition flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
          >
            <span>Continue Learning</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 3.5 POLISHED EDTECH TOOLS (Daily Builder Goal + Deep Work Focus Sprint with Framer Spotlight) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Daily Builder Target */}
        <SpotlightCard className="p-4 flex flex-col justify-between space-y-3" spotlightColor="rgba(163, 230, 53, 0.15)">
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 font-semibold text-white">
                <Target className="w-3.5 h-3.5 text-lime-400" />
                <span>Daily Builder Target</span>
              </span>
              <span className="font-mono text-xs text-lime-400 font-semibold">
                {todayEarnedXP} / {dailyTargetXP} XP
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              {isGoalReached
                ? 'Target reached! Daily consistency bonus is ready.'
                : `Earn ${Math.max(0, dailyTargetXP - todayEarnedXP)} more XP today to unlock focus bonus.`}
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className="h-full bg-lime-400 transition-all duration-300"
                style={{ width: `${Math.min(100, Math.round((todayEarnedXP / dailyTargetXP) * 100))}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-zinc-500">1.2x streak boost active</span>
              <button
                onClick={handleClaimDailyGoal}
                disabled={!isGoalReached || dailyGoalClaimed}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
                  dailyGoalClaimed
                    ? 'bg-white/[0.04] text-zinc-500 cursor-not-allowed'
                    : isGoalReached
                    ? 'bg-lime-400 hover:bg-lime-300 text-black'
                    : 'bg-white/[0.04] text-zinc-500 cursor-not-allowed'
                }`}
              >
                {dailyGoalClaimed ? 'Bonus Claimed' : 'Claim +25 XP Bonus'}
              </button>
            </div>
          </div>
        </SpotlightCard>

        {/* Clan Focus Sprint (25m Deep Work Pomodoro) */}
        <SpotlightCard className="p-4 flex flex-col justify-between space-y-3" spotlightColor="rgba(139, 92, 246, 0.15)">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-white">
              <Timer className="w-3.5 h-3.5 text-purple-400" />
              <span>Deep Work Sprint</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
              {focusFinished ? 'Completed!' : isFocusRunning ? 'Running' : 'Paused'}
            </span>
          </div>

          <div className="flex items-center justify-between py-1">
            <div className="font-mono text-2xl font-bold tracking-wider text-white">
              {formatTimer(focusSeconds)}
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleFocus}
                className="px-3 py-1.5 rounded-lg bg-white text-black hover:bg-zinc-200 text-xs font-semibold transition-colors flex items-center gap-1"
              >
                {isFocusRunning ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>{focusFinished ? 'Restart' : 'Start Focus'}</span>
                  </>
                )}
              </button>
              <button
                onClick={resetFocus}
                className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white border border-white/[0.06] transition-colors"
                title="Reset timer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <p className="text-[11px] text-zinc-500">
            25m undistracted study sprint. Awards +20 Focus XP upon completion.
          </p>
        </SpotlightCard>
      </div>

      {/* 3.6 DATA VISUALIZATION: CLAN TRAJECTORY & DAILY XP */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <ChartJS
          title="Clan XP Progression"
          subtitle="Your 7-day builder activity trajectory"
          data={[
            { x: 'Mon', y: 120 },
            { x: 'Tue', y: 240 },
            { x: 'Wed', y: 190 },
            { x: 'Thu', y: 310 },
            { x: 'Fri', y: 480 },
            { x: 'Sat', y: 620 },
            { x: 'Sun', y: currentUser.xp },
          ]}
          lineColor="#A3E635"
          height={150}
        />
        <BarGraph
          title="Daily Quests & Forge Activity"
          subtitle="Completed challenges and commits per day"
          data={[
            { label: 'Mon', value: 25 },
            { label: 'Tue', value: 45 },
            { label: 'Wed', value: 30 },
            { label: 'Thu', value: 75, color: '#C084FC' },
            { label: 'Fri', value: 90 },
            { label: 'Sat', value: 110, color: '#A3E635' },
            { label: 'Sun', value: todayEarnedXP || 60, color: '#F59E0B' },
          ]}
          height={150}
        />
      </div>

      {/* 4. CLEAN TABS FOR MAIN CONTENT */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2 text-xs font-medium">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'tasks'
                ? 'bg-white/[0.08] text-white font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Daily Tasks ({dailyQuests.length})
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'events'
                ? 'bg-white/[0.08] text-white font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Upcoming Events ({hackathons.length})
          </button>
          <button
            onClick={() => setActiveTab('discussions')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'discussions'
                ? 'bg-white/[0.08] text-white font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Discussions ({posts.length})
          </button>
        </div>

        {/* TAB 1: DAILY TASKS (MINIMAL CHECKLIST) */}
        {activeTab === 'tasks' && (
          <div className="space-y-2.5">
            {dailyQuests.map((quest) => {
              const isDone = completedQuestIds.includes(quest.id);

              return (
                <div
                  key={quest.id}
                  className={`p-3.5 rounded-xl border transition flex items-center justify-between gap-4 ${
                    isDone
                      ? 'bg-white/[0.01] border-white/[0.04] text-zinc-500'
                      : 'bg-[#111118] border-white/[0.06] hover:border-white/[0.12] text-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                        isDone
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-white/[0.04] text-zinc-500 border border-white/[0.06]'
                      }`}
                    >
                      {isDone ? <Check className="w-3.5 h-3.5" /> : <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />}
                    </div>

                    <div className="overflow-hidden">
                      <h3 className={`text-xs sm:text-sm font-semibold truncate ${isDone ? 'line-through text-zinc-500' : 'text-white'}`}>
                        {quest.title}
                      </h3>
                      <p className="text-[11px] text-zinc-500 truncate mt-0.5">
                        {quest.category} • ~{quest.estimatedMinutes} mins
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-mono font-medium text-[#A3E635]">
                      +{quest.xpReward} XP
                    </span>

                    {isDone ? (
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                        Done
                      </span>
                    ) : (
                      <button
                        onClick={() => handleClaimQuest(quest.id)}
                        className="px-3 py-1 rounded-lg bg-white/[0.08] hover:bg-[#A3E635] hover:text-[#09090F] text-xs font-medium text-white transition"
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: UPCOMING EVENTS (MINIMAL CARDS) */}
        {activeTab === 'events' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {hackathons.map((evt) => (
              <div
                key={evt.id}
                className="p-4 rounded-xl bg-[#111118] border border-white/[0.06] hover:border-white/[0.12] transition space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.06] text-zinc-300">
                      {evt.type}
                    </span>
                    <span className="font-mono text-amber-400 font-medium">
                      {evt.prizePool}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{evt.title}</h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between text-xs text-zinc-400">
                  <span>
                    {new Date(evt.startDate).toLocaleDateString([], {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                  <button
                    onClick={() => navigateTo('hackathons')}
                    className="text-[#A3E635] hover:underline font-medium flex items-center gap-1"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: DISCUSSIONS (MINIMAL LIST) */}
        {activeTab === 'discussions' && (
          <div className="p-4 rounded-xl bg-[#111118] border border-white/[0.06] divide-y divide-white/[0.04]">
            {trendingPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => navigateTo('discussion_detail', post.id)}
                className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] transition px-2 rounded-lg group"
              >
                <div className="overflow-hidden">
                  <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                    <span className="text-[#A3E635] font-medium">{post.category}</span>
                    <span>•</span>
                    <span>{post.authorName}</span>
                    {post.solved && (
                      <span className="text-emerald-400 font-medium">✓ Solved</span>
                    )}
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#A855F7] transition truncate mt-0.5">
                    {post.title}
                  </h4>
                </div>

                <div className="flex items-center gap-3 shrink-0 text-xs font-mono text-zinc-500">
                  <span>{post.upvotes} ▲</span>
                  <span>{post.repliesCount} 💬</span>
                  <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
