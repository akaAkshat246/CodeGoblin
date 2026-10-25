import React from 'react';
import {
  Megaphone,
  Pin,
  Calendar,
  Sparkles,
  Award,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GOBLIN_CHARACTERS, FOUNDERS } from '../data/mockData';

export const AnnouncementsPage: React.FC = () => {
  const { announcements, navigateTo } = useApp();

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-[#8B5CF6]/20 text-[#A855F7]">
            <Megaphone className="w-5 h-5" />
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-[#F5F3FF]">
            Clan Broadcasts & Announcements
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#A1A1B5] mt-1">
          Official communiques, platform milestones, and hackathon schedules directly from the Founders and Core Leads.
        </p>
      </div>

      {/* Founders Banner Tribute */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#171725] via-[#11111B] to-[#1E1E32] border border-[#A3E635]/30 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A3E635]/15 text-[#A3E635] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Founded by Builders for Builders</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-black text-[#F5F3FF]">
              The Code Goblins Clan Leadership
            </h2>
            <p className="text-xs text-[#A1A1B5] mt-1 max-w-xl leading-relaxed">
              Founded by <span className="text-[#F5F3FF] font-bold">Akshat Vats</span> and{' '}
              <span className="text-[#F5F3FF] font-bold">Akshat Kumar</span> with one mission:
              helping college developers break free from rigid syllabus theory and ship real software.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {FOUNDERS.map((founder, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 p-2 rounded-2xl bg-[#09090F]/80 border border-white/5"
              >
                <img
                  src={
                    GOBLIN_CHARACTERS.find((g) => g.id === founder.goblinId)?.avatarImg ||
                    GOBLIN_CHARACTERS[0].avatarImg
                  }
                  alt={founder.name}
                  className="w-9 h-9 rounded-xl object-cover ring-1 ring-[#A3E635]/40"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#F5F3FF]">{founder.name}</h4>
                  <p className="text-[10px] text-[#A3E635] font-semibold">{founder.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Announcements Stream */}
      <div className="space-y-5">
        {announcements.map((ann) => {
          const authorGoblin = GOBLIN_CHARACTERS.find((g) => g.id === ann.authorAvatarGoblinId) || GOBLIN_CHARACTERS[0];

          return (
            <div
              key={ann.id}
              className={`goblin-card p-6 sm:p-7 border transition-all ${
                ann.isPinned
                  ? 'border-[#A3E635]/40 bg-[#171725] shadow-glow-green'
                  : 'border-[#8B5CF6]/20 bg-[#171725]/60'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  {ann.isPinned && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#A3E635]/20 text-[#A3E635] flex items-center gap-1 border border-[#A3E635]/30">
                      <Pin className="w-3 h-3" />
                      <span>Pinned Broadcast</span>
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#8B5CF6]/20 text-[#C084FC]">
                    {ann.category}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-[#A1A1B5] font-mono">
                    {ann.badge}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#A1A1B5]">
                  <Calendar className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>
                    {new Date(ann.createdAt).toLocaleDateString([], {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#F5F3FF] mb-2 leading-snug">
                {ann.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#A1A1B5] leading-relaxed mb-4 whitespace-pre-line">
                {ann.content}
              </p>

              {/* Author attribution footer */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <img
                    src={authorGoblin.avatarImg}
                    alt={ann.authorName}
                    className="w-8 h-8 rounded-lg object-cover ring-1 ring-white/10"
                  />
                  <div>
                    <h5 className="font-bold text-[#F5F3FF]">{ann.authorName}</h5>
                    <p className="text-[10px] text-[#A3E635]">{ann.authorTitle}</p>
                  </div>
                </div>

                {ann.category === 'Hackathon' && (
                  <button
                    onClick={() => navigateTo('hackathons')}
                    className="text-xs text-[#A855F7] hover:text-[#A3E635] font-semibold flex items-center gap-1 transition"
                  >
                    <span>View Hackathon Track</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
