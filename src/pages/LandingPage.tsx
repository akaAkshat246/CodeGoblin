import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Code2,
  Users2,
  Trophy,
  Flame,
  CheckCircle2,
  Terminal,
  Compass,
  Layers,
  Rocket,
  ShieldCheck,
  Zap,
  HelpCircle,
  Activity,
  Megaphone
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GOBLIN_CHARACTERS, FOUNDERS } from '../data/mockData';

export const LandingPage: React.FC = () => {
  const {
    navigateTo,
    setIsAuthModalOpen,
    setIsOnboardingModalOpen,
    projects,
    activityFeed
  } = useApp();

  const [activeFeedFilter, setActiveFeedFilter] = useState<string>('all');

  const filteredFeed = activeFeedFilter === 'all'
    ? activityFeed
    : activityFeed.filter((item) => item.type === activeFeedFilter);

  return (
    <div className="min-h-screen bg-[#09090F] text-[#F5F3FF]">
      {/* 1. HERO SECTION — ENTER THE GOBLIN REALM */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-[#8B5CF6]/15">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-gradient-to-b from-[#8B5CF6]/20 via-[#A3E635]/10 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 -left-32 w-80 h-80 bg-[#8B5CF6]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-80 h-80 bg-[#A3E635]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171725] border border-[#8B5CF6]/30 shadow-glow-purple">
              <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-pulse" />
              <span className="text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-[#A3E635] via-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent">
                “Code Hard. Level Up. Stay Goblin.”
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight leading-[1.08]">
              Welcome to the{' '}
              <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#A3E635] via-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent drop-shadow-sm">
                Goblin Realm.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg md:text-xl text-[#A1A1B5] max-w-2xl mx-auto leading-relaxed font-normal">
              A place to build wild ideas, conquer hackathons, find your people, and level up your developer journey.
            </p>

            {/* Core Brand Philosophy */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#11111B]/90 border border-[#8B5CF6]/25 max-w-xl mx-auto backdrop-blur-sm">
              <p className="text-xs sm:text-sm font-semibold text-[#F5F3FF]">
                Learn together. Build together. Compete together. Level up together.
              </p>
            </div>

            {/* Call to Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={() => setIsOnboardingModalOpen(true)}
                className="w-full sm:w-auto goblin-btn-green py-3.5 px-8 text-sm font-bold flex items-center justify-center gap-2 shadow-glow-green"
              >
                <Sparkles className="w-4 h-4 text-[#09090F]" />
                <span>Join the Realm</span>
                <ArrowRight className="w-4 h-4 text-[#09090F]" />
              </button>

              <button
                onClick={() => navigateTo('hackathons')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#171725] border border-white/10 hover:border-[#8B5CF6]/40 text-[#F5F3FF] text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#1E1E32] transition"
              >
                <Trophy className="w-4 h-4 text-[#8B5CF6]" />
                <span>Explore Hackathons</span>
              </button>
            </div>

            {/* Founders Attribution Strip */}
            <div className="pt-4 flex items-center justify-center gap-2 text-xs text-[#A1A1B5]">
              <span>Founded by</span>
              <span className="font-bold text-[#F5F3FF]">Akshat Vats</span>
              <span>&</span>
              <span className="font-bold text-[#F5F3FF]">Akshat Kumar</span>
              <span className="text-white/20">•</span>
              <span className="text-[#A3E635]">For student builders worldwide</span>
            </div>
          </div>

          {/* Hero Banner Artwork Display */}
          <div className="mt-12 max-w-5xl mx-auto rounded-3xl overflow-hidden border border-[#8B5CF6]/30 shadow-2xl relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090F] via-transparent to-transparent z-10 pointer-events-none" />
            <img
              src="/assets/goblins/chaos_hero_poster.jpg"
              alt="Code Goblins — The People Behind the Chaos"
              className="w-full h-auto object-cover group-hover:scale-[1.01] transition duration-500"
            />
            <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#11111B]/85 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <div className="text-left">
                <h4 className="text-sm font-bold text-[#F5F3FF]">
                  The Nine Goblins — Clan Archetypes
                </h4>
                <p className="text-xs text-[#A1A1B5]">
                  Leader • Architect • Creator • Competitor • Strategist • Debugger • Builder • Explorer • Hacker
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateTo('nine_goblins')}
                  className="px-4 py-2 rounded-xl bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/30 text-[#C084FC] text-xs font-semibold transition"
                >
                  Explore All 9 Roles
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE COMMUNITY METRICS OVERVIEW */}
      <section className="py-12 border-b border-[#8B5CF6]/15 bg-[#11111B]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="p-4 rounded-2xl bg-[#171725]/50 border border-white/5">
              <span className="text-2xl sm:text-3xl font-black font-display text-[#F5F3FF]">142+</span>
              <p className="text-xs text-[#A1A1B5] mt-0.5">Total Members</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#171725]/50 border border-white/5">
              <span className="text-2xl sm:text-3xl font-black font-display text-[#A3E635]">89</span>
              <p className="text-xs text-[#A1A1B5] mt-0.5">Active This Week</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#171725]/50 border border-white/5">
              <span className="text-2xl sm:text-3xl font-black font-display text-[#C084FC]">38+</span>
              <p className="text-xs text-[#A1A1B5] mt-0.5">Projects Forged</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#171725]/50 border border-white/5">
              <span className="text-2xl sm:text-3xl font-black font-display text-amber-400">12</span>
              <p className="text-xs text-[#A1A1B5] mt-0.5">Hackathons Entered</p>
            </div>
            <div className="col-span-2 md:col-span-1 p-4 rounded-2xl bg-[#171725]/50 border border-white/5">
              <span className="text-2xl sm:text-3xl font-black font-display text-sky-400">520+</span>
              <p className="text-xs text-[#A1A1B5] mt-0.5">Quests Solved</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LIVE ACTIVITY FEED */}
      <section className="py-16 border-b border-[#8B5CF6]/15">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A3E635]/15 text-[#A3E635] text-xs font-bold uppercase tracking-wider mb-1">
                <Activity className="w-3.5 h-3.5" />
                <span>Real-Time Pulse</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-[#F5F3FF]">
                Live Community Activity Feed
              </h2>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
              {['all', 'quest', 'project', 'squad', 'achievement'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFeedFilter(filter)}
                  className={`px-3 py-1.5 rounded-xl capitalize transition ${
                    activeFeedFilter === filter
                      ? 'bg-[#8B5CF6] text-white shadow-glow-purple'
                      : 'bg-[#171725] text-[#A1A1B5] hover:text-[#F5F3FF]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            {filteredFeed.map((item) => {
              const goblin = GOBLIN_CHARACTERS.find((g) => g.id === item.actorGoblinId) || GOBLIN_CHARACTERS[0];
              return (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-[#171725]/60 border border-white/5 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={goblin.avatarImg}
                      alt={item.actorName}
                      className="w-7 h-7 rounded-lg object-cover ring-1 ring-white/10"
                    />
                    <p className="text-[#A1A1B5]">
                      <span className="font-bold text-[#F5F3FF]">{item.actorName}</span>{' '}
                      {item.actionText}{' '}
                      <span className="text-[#A3E635] font-semibold">{item.targetText}</span>
                    </p>
                  </div>
                  <span className="text-[10px] text-white/30 shrink-0 font-mono">{item.timestamp}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. MEET THE NINE GOBLINS */}
      <section className="py-20 border-b border-[#8B5CF6]/15 bg-[#11111B]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B5CF6]/15 text-[#C084FC] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Nine Goblins</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-[#F5F3FF]">
                Choose Your Developer Archetype
              </h2>
              <p className="text-xs sm:text-sm text-[#A1A1B5] mt-1 max-w-xl">
                Every member has a distinct archetype. Choose the role that resonates with your passion.
              </p>
            </div>
            <button
              onClick={() => navigateTo('nine_goblins')}
              className="px-4 py-2.5 rounded-xl bg-[#171725] border border-[#8B5CF6]/30 text-xs font-semibold text-[#F5F3FF] hover:border-[#A3E635] transition flex items-center gap-2 self-start md:self-auto"
            >
              <span>Explore Role Hubs & Activity Tracks</span>
              <ArrowRight className="w-4 h-4 text-[#A3E635]" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {GOBLIN_CHARACTERS.map((goblin) => (
              <div
                key={goblin.id}
                className="goblin-card p-4 flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10 ring-2 ring-[#8B5CF6]/20 group-hover:ring-[#A3E635] transition shrink-0">
                      <img
                        src={goblin.avatarImg}
                        alt={goblin.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8B5CF6]/20 text-[#C084FC]">
                          Role #{goblin.id}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#A3E635]/20 text-[#A3E635]">
                          {goblin.archetype}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-[#F5F3FF] mt-1">{goblin.name}</h4>
                      <p className="text-[11px] text-[#A3E635] font-semibold">{goblin.roleTitle}</p>
                    </div>
                  </div>

                  <p className="text-xs text-[#A1A1B5] italic mb-3 font-medium">
                    "{goblin.motto}"
                  </p>

                  <div className="space-y-1.5 text-[11px] text-[#A1A1B5]">
                    {goblin.responsibilities.slice(0, 3).map((resp, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <span className="text-[#8B5CF6] font-bold">✔</span>
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-[#A1A1B5]">
                    {goblin.associatedActivities.length} Clan Activities
                  </span>
                  <button
                    onClick={() => navigateTo('nine_goblins')}
                    className="text-xs text-[#A855F7] group-hover:text-[#A3E635] font-semibold transition"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURED PROJECTS PREVIEW */}
      <section className="py-20 border-b border-[#8B5CF6]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Trophy className="w-3.5 h-3.5" />
                <span>Projects Showcase</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-[#F5F3FF]">
                Built by Student Goblins
              </h2>
            </div>
            <button
              onClick={() => navigateTo('projects')}
              className="px-4 py-2.5 rounded-xl bg-[#171725] border border-white/10 hover:border-[#8B5CF6]/40 text-xs font-semibold text-[#F5F3FF] transition"
            >
              View All Showcase Projects →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((proj) => (
              <div
                key={proj.id}
                onClick={() => navigateTo('project_detail', proj.id)}
                className="goblin-card overflow-hidden cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="h-40 w-full overflow-hidden relative">
                    <img
                      src={proj.coverImage}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-[#09090F]/80 backdrop-blur-sm text-[10px] font-semibold text-[#A3E635]">
                      {proj.status}
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-base font-bold text-[#F5F3FF] group-hover:text-[#A3E635] transition">
                      {proj.title}
                    </h4>
                    <p className="text-xs text-[#A1A1B5] mt-1 line-clamp-2">
                      {proj.tagline}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 flex items-center justify-between text-xs text-[#A1A1B5]">
                  <span>By {proj.authorName}</span>
                  <span className="text-rose-400 font-semibold">{proj.likes} ♥</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="py-20 text-center relative overflow-hidden bg-gradient-to-b from-[#11111B] to-[#09090F]">
        <div className="max-w-4xl mx-auto px-4 space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-display font-black text-[#F5F3FF]">
            Ready to Enter the Realm?
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1B5] max-w-xl mx-auto">
            Code hard. Level up. Stay goblin. Founded by Akshat Vats and Akshat Kumar for all builders.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setIsOnboardingModalOpen(true)}
              className="w-full sm:w-auto goblin-btn-green py-3.5 px-8 text-sm font-bold flex items-center justify-center gap-2 shadow-glow-green"
            >
              <Sparkles className="w-4 h-4 text-[#09090F]" />
              <span>Join the Realm</span>
            </button>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#171725] border border-white/10 text-xs font-semibold hover:border-[#8B5CF6]/50 transition"
            >
              Sign In Existing Member
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-[#8B5CF6]/15 bg-[#09090F] text-xs text-[#A1A1B5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-sm text-[#A3E635]">CODE GOBLINS</span>
            <span>• Founded by Akshat Vats & Akshat Kumar • “Code Hard. Level Up. Stay Goblin.”</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => navigateTo('announcements')} className="hover:text-[#F5F3FF]">
              Announcements
            </button>
            <button onClick={() => navigateTo('learning_hub')} className="hover:text-[#F5F3FF]">
              Learning Hub
            </button>
            <button onClick={() => navigateTo('nine_goblins')} className="hover:text-[#F5F3FF]">
              The 9 Goblins
            </button>
            <button onClick={() => navigateTo('hackathons')} className="hover:text-[#F5F3FF]">
              Hackathons
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
