import React from 'react';
import {
  Compass,
  Sparkles,
  Trophy,
  Users2,
  Hammer,
  ArrowRight,
  Flame,
  CheckCircle2,
  Zap,
  Globe
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GOBLIN_CHARACTERS } from '../data/mockData';

export const DiscoverPage: React.FC = () => {
  const { navigateTo, projects, hackathons, squads, allUsers } = useApp();

  const featuredProject = projects[0];
  const upcomingHackathon = hackathons[0];
  const activeSquad = squads[0];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-[#8B5CF6]/20 text-[#A855F7]">
            <Compass className="w-5 h-5" />
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-[#F5F3FF]">
            Discover the Clan
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#A1A1B5] mt-1">
          Explore curated highlights, featured student projects, mentorship networks, and hackathon alerts.
        </p>
      </div>

      {/* Featured Spotlight Hero */}
      {featuredProject && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#171725] via-[#11111B] to-[#1E1E32] border border-[#A3E635]/30 shadow-glow-green relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A3E635]/15 text-[#A3E635] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Project Spotlight</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-[#F5F3FF]">
                {featuredProject.title}
              </h2>
              <p className="text-sm text-[#A1A1B5] leading-relaxed">
                {featuredProject.tagline}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {featuredProject.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#09090F] border border-white/5 text-[#A3E635]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto">
              <button
                onClick={() => navigateTo('project_detail', featuredProject.id)}
                className="goblin-btn-green py-3 px-6 text-xs font-bold flex items-center justify-center gap-2 shadow-glow-green"
              >
                <span>View Project Case Study</span>
                <ArrowRight className="w-4 h-4 text-[#09090F]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3 Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Hackathon spotlight */}
        <div className="goblin-card p-6 flex flex-col justify-between border-amber-500/30">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-400">
                Major Event
              </span>
              <Trophy className="w-4 h-4 text-amber-400" />
            </div>
            <h3 className="text-base font-bold text-[#F5F3FF]">{upcomingHackathon.title}</h3>
            <p className="text-xs text-[#A1A1B5] mt-1.5 line-clamp-3 leading-relaxed">
              {upcomingHackathon.description}
            </p>
          </div>
          <button
            onClick={() => navigateTo('hackathons')}
            className="mt-5 w-full goblin-btn-primary py-2 text-xs font-bold"
          >
            Explore Event Details →
          </button>
        </div>

        {/* Squad finder spotlight */}
        <div className="goblin-card p-6 flex flex-col justify-between border-[#8B5CF6]/30">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#8B5CF6]/20 text-[#C084FC]">
                Squad Finder
              </span>
              <Users2 className="w-4 h-4 text-[#8B5CF6]" />
            </div>
            <h3 className="text-base font-bold text-[#F5F3FF]">{activeSquad.name}</h3>
            <p className="text-xs text-[#A1A1B5] mt-1.5 line-clamp-3 leading-relaxed">
              {activeSquad.description}
            </p>
          </div>
          <button
            onClick={() => navigateTo('squads')}
            className="mt-5 w-full goblin-btn-green py-2 text-xs font-bold"
          >
            View Open Squads →
          </button>
        </div>

        {/* Mentorship spotlight */}
        <div className="goblin-card p-6 flex flex-col justify-between border-sky-500/30">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-500/15 text-sky-400">
                Peer Mentorship
              </span>
              <Zap className="w-4 h-4 text-sky-400" />
            </div>
            <h3 className="text-base font-bold text-[#F5F3FF]">Connect with Mentors</h3>
            <p className="text-xs text-[#A1A1B5] mt-1.5 line-clamp-3 leading-relaxed">
              Senior B.Tech students and working developers offering 1-on-1 guidance on system design, internships, and vibe coding.
            </p>
          </div>
          <button
            onClick={() => navigateTo('squads')}
            className="mt-5 w-full py-2 px-3 rounded-xl bg-[#171725] border border-white/10 hover:border-sky-400 text-xs font-semibold text-[#F5F3FF] transition"
          >
            Find a Squad →
          </button>
        </div>
      </div>
    </div>
  );
};
