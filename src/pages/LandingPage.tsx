import React from 'react';
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
  ChevronDown,
  Layers,
  Rocket,
  ShieldCheck,
  Zap,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GOBLIN_CHARACTERS } from '../data/mockData';

export const LandingPage: React.FC = () => {
  const { navigateTo, setIsAuthModalOpen, setIsOnboardingModalOpen, projects, hackathons } = useApp();

  return (
    <div className="min-h-screen bg-[#09090F] text-[#F5F3FF]">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 border-b border-[#8B5CF6]/15">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#8B5CF6]/20 via-[#A3E635]/10 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-[#8B5CF6]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-80 h-80 bg-[#A3E635]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171725] border border-[#8B5CF6]/30 shadow-glow-purple">
              <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-pulse" />
              <span className="text-xs font-bold tracking-wide uppercase bg-gradient-to-r from-[#A3E635] to-[#A855F7] bg-clip-text text-transparent">
                The Community Platform for Curious Builders
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tight leading-[1.08]">
              College teaches the syllabus.{' '}
              <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#A3E635] via-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent drop-shadow-sm">
                Goblins build what comes next.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg md:text-xl text-[#A1A1B5] max-w-2xl mx-auto leading-relaxed font-normal">
              A gamified developer ecosystem for college students. Learn full-stack & vibe coding,
              find your squad, ship real software, and turn hackathon prototypes into extraordinary impact.
            </p>

            {/* Core Philosophy Quote Banner */}
            <div className="p-3 sm:p-4 rounded-2xl bg-[#11111B]/80 border border-[#8B5CF6]/25 max-w-xl mx-auto backdrop-blur-sm">
              <p className="text-xs sm:text-sm font-semibold text-[#F5F3FF] italic">
                "Different strengths. Same passion. Turning ideas into real impact — together."
              </p>
            </div>

            {/* Call to Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={() => setIsOnboardingModalOpen(true)}
                className="w-full sm:w-auto goblin-btn-green py-3.5 px-8 text-sm font-bold flex items-center justify-center gap-2 shadow-glow-green"
              >
                <Sparkles className="w-4 h-4 text-[#09090F]" />
                <span>Enter the Goblin Den</span>
                <ArrowRight className="w-4 h-4 text-[#09090F]" />
              </button>

              <button
                onClick={() => navigateTo('discover')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#171725] border border-white/10 hover:border-[#8B5CF6]/40 text-[#F5F3FF] text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#1E1E32] transition"
              >
                <Compass className="w-4 h-4 text-[#8B5CF6]" />
                <span>Explore the Community</span>
              </button>
            </div>

            {/* Verified Student Metric Pills */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-[#A1A1B5]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
                <span>100% Free for College Students</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
                <span>Gamified XP & Streaks</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
                <span>No Corporate Fluff</span>
              </div>
            </div>
          </div>

          {/* Hero Banner Artwork Display */}
          <div className="mt-12 sm:mt-16 max-w-5xl mx-auto rounded-3xl overflow-hidden border border-[#8B5CF6]/30 shadow-2xl relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090F] via-transparent to-transparent z-10 pointer-events-none" />
            <img
              src="/assets/goblins/chaos_hero_poster.jpg"
              alt="CodeGoblins - The People Behind the Chaos"
              className="w-full h-auto object-cover group-hover:scale-[1.01] transition duration-500"
            />
            <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#11111B]/85 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <div className="text-left">
                <h4 className="text-sm font-bold text-[#F5F3FF]">
                  The People Behind the Chaos
                </h4>
                <p className="text-xs text-[#A1A1B5]">
                  Building Our Core Team • Roles, Responsibilities & Future Growth
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateTo('nine_goblins')}
                  className="px-4 py-2 rounded-xl bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/30 text-[#C084FC] text-xs font-semibold transition"
                >
                  Meet All 9 Goblins
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE THREE PILLARS (Ownership, Collaboration, Execution) */}
      <section className="py-20 border-b border-[#8B5CF6]/15 bg-[#11111B]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B5CF6]/15 text-[#C084FC] text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Community Foundation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-[#F5F3FF]">
              Big Ideas Need People Who Own Them
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A1B5]">
              CodeGoblins is growing beyond just a hackathon group. We organize events, run learning quests, and provide peer mentorship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="goblin-card p-6 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#F5F3FF] mb-2">OWNERSHIP</h3>
                <p className="text-xs text-[#A1A1B5] leading-relaxed">
                  Clear responsibility for each area. When you take on a module, you see it through from schema to deployment.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-semibold text-sky-400">
                Clear accountability for each area →
              </div>
            </div>

            <div className="goblin-card p-6 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#A855F7] mb-4">
                  <Users2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#F5F3FF] mb-2">COLLABORATION</h3>
                <p className="text-xs text-[#A1A1B5] leading-relaxed">
                  Different strengths, one team. Designers, algorithmic thinkers, and vibe coders combine forces to ship winning MVPs.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-semibold text-[#A855F7]">
                Different strengths, one team →
              </div>
            </div>

            <div className="goblin-card p-6 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#A3E635]/15 border border-[#A3E635]/30 flex items-center justify-center text-[#A3E635] mb-4">
                  <Rocket className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#F5F3FF] mb-2">EXECUTION</h3>
                <p className="text-xs text-[#A1A1B5] leading-relaxed">
                  Ideas into action, consistently. We celebrate finished prototypes and shipped code over infinite theoretical planning.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-semibold text-[#A3E635]">
                Ideas into action, consistently →
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MEET THE NINE GOBLINS (The Official Reference Cards) */}
      <section className="py-20 border-b border-[#8B5CF6]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A3E635]/15 text-[#A3E635] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Core Archetypes</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-[#F5F3FF]">
                Meet The Nine Goblins
              </h2>
              <p className="text-xs sm:text-sm text-[#A1A1B5] mt-1 max-w-xl">
                Every member has a distinct archetype. Choose the role that resonates with your passion or expand across multiple tracks.
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
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8B5CF6]/20 text-[#C084FC]">
                        Role #{goblin.id}
                      </span>
                      <h4 className="text-sm font-bold text-[#F5F3FF] mt-0.5">{goblin.name}</h4>
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

      {/* 4. FEATURED FORGE PROJECTS */}
      <section className="py-20 border-b border-[#8B5CF6]/15 bg-[#11111B]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Trophy className="w-3.5 h-3.5" />
                <span>Project Forge Showcase</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-[#F5F3FF]">
                Built by Student Goblins
              </h2>
              <p className="text-xs sm:text-sm text-[#A1A1B5] mt-1 max-w-xl">
                Real software shipped by community members. No dummy templates or fake statistics.
              </p>
            </div>
            <button
              onClick={() => navigateTo('projects')}
              className="px-4 py-2.5 rounded-xl bg-[#171725] border border-white/10 hover:border-[#8B5CF6]/40 text-xs font-semibold text-[#F5F3FF] transition"
            >
              View All Forge Projects →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-[#09090F]/80 backdrop-blur-sm text-[10px] font-semibold text-[#A3E635] border border-[#A3E635]/30">
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

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {proj.techStack.slice(0, 3).map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] bg-[#11111B] border border-white/5 text-[#A1A1B5]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
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

      {/* 5. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 border-b border-[#8B5CF6]/15">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B5CF6]/15 text-[#C084FC] text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Student FAQ</span>
            </div>
            <h2 className="text-3xl font-display font-black text-[#F5F3FF]">
              Everything You Need to Know
            </h2>
          </div>

          <div className="space-y-4 text-left">
            <div className="p-4 rounded-2xl bg-[#171725] border border-white/5">
              <h4 className="text-sm font-bold text-[#F5F3FF] mb-1">
                I'm a 1st-year student who only knows basic Turbo C++. Can I still join?
              </h4>
              <p className="text-xs text-[#A1A1B5] leading-relaxed">
                Absolutely! CodeGoblins was built specifically for students like you. Our Quests and Mentorship tracks start with modern web dev, Git fundamentals, and AI vibe coding workflows to get you building interactive software in your first month.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#171725] border border-white/5">
              <h4 className="text-sm font-bold text-[#F5F3FF] mb-1">
                What does "Vibe Coding" mean in CodeGoblins?
              </h4>
              <p className="text-xs text-[#A1A1B5] leading-relaxed">
                Vibe coding is the superpower of pairing deep software intuition with modern AI coding agents. Instead of getting stuck on repetitive syntax, you design architectural contracts, write system prompts, and rapidly iterate on production-grade software.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#171725] border border-white/5">
              <h4 className="text-sm font-bold text-[#F5F3FF] mb-1">
                How does the XP and Streak system work?
              </h4>
              <p className="text-xs text-[#A1A1B5] leading-relaxed">
                You earn XP by solving daily quests, publishing helpful solutions in The Goblin Den, and shipping projects. Streaks track your daily consistency based on Asia/Kolkata timezone so you build steady learning habits without toxic pressure.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#171725] border border-white/5">
              <h4 className="text-sm font-bold text-[#F5F3FF] mb-1">
                Is CodeGoblins completely free?
              </h4>
              <p className="text-xs text-[#A1A1B5] leading-relaxed">
                Yes! Free community discussions, learning tracks, squad finder, hackathon registrations, and leaderboards are 100% accessible to every student.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CALL TO ACTION */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[#11111B] to-[#09090F]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-display font-black text-[#F5F3FF]">
            Ready to Build Beyond the Syllabus?
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1B5] max-w-xl mx-auto">
            Join the Goblin clan, choose your archetype, claim your daily streak, and find teammates for the next big hackathon.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setIsOnboardingModalOpen(true)}
              className="w-full sm:w-auto goblin-btn-green py-3.5 px-8 text-sm font-bold flex items-center justify-center gap-2 shadow-glow-green"
            >
              <Sparkles className="w-4 h-4 text-[#09090F]" />
              <span>Spawn Your Goblin Account</span>
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
            <span className="font-display font-black text-sm text-[#A3E635]">CODEGOBLINS</span>
            <span>• "Different strengths. Same passion. Turning ideas into real impact — together."</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => navigateTo('nine_goblins')} className="hover:text-[#F5F3FF]">
              The 9 Goblins
            </button>
            <button onClick={() => navigateTo('quests')} className="hover:text-[#F5F3FF]">
              Quests
            </button>
            <button onClick={() => navigateTo('hackathons')} className="hover:text-[#F5F3FF]">
              Hackathons
            </button>
            <button onClick={() => navigateTo('discussions')} className="hover:text-[#F5F3FF]">
              Goblin Den
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
