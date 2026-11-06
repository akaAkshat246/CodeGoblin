import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Shield,
  Code2,
  Palette,
  Trophy,
  Briefcase,
  Calculator,
  Rocket,
  GraduationCap,
  Megaphone,
  CheckCircle2,
  Users
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GOBLIN_CHARACTERS } from '../data/mockData';
import { Goblin3DCard } from '../components/framer';

export const NineGoblinsHubPage: React.FC = () => {
  const { navigateTo, currentUser, updateProfile } = useApp();
  const [selectedGoblinId, setSelectedGoblinId] = useState<number>(1);

  const selectedGoblin = GOBLIN_CHARACTERS.find((g) => g.id === selectedGoblinId) || GOBLIN_CHARACTERS[0];

  const getRoleIcon = (id: number) => {
    switch (id) {
      case 1: return Megaphone;
      case 2: return Code2;
      case 3: return Palette;
      case 4: return Trophy;
      case 5: return Briefcase;
      case 6: return Calculator;
      case 7: return Rocket;
      case 8: return GraduationCap;
      case 9: return Sparkles;
      default: return Users;
    }
  };

  const handleSelectAsAvatar = () => {
    if (!currentUser) return;
    updateProfile({ avatarGoblinId: selectedGoblin.id });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-[#8B5CF6]/20 text-[#A855F7]">
            <Sparkles className="w-5 h-5" />
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-[#F5F3FF]">
            The Nine Goblins — Core Team Roles
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#A1A1B5] mt-1 max-w-2xl leading-relaxed">
          "Different strengths. Same passion. Turning ideas into real impact — together."
          Explore the official archetypes, responsibilities, and associated activities.
        </p>
      </div>

      {/* Nine Character Selector Carousel/Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-9 gap-2.5">
        {GOBLIN_CHARACTERS.map((goblin) => {
          const isSelected = goblin.id === selectedGoblinId;
          return (
            <button
              key={goblin.id}
              onClick={() => setSelectedGoblinId(goblin.id)}
              className={`p-2 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                isSelected
                  ? 'bg-[#171725] border-[#A3E635] shadow-glow-green ring-2 ring-[#A3E635]'
                  : 'bg-[#11111B] border-white/5 hover:border-[#8B5CF6]/40 hover:bg-[#171725]'
              }`}
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden ring-1 ring-white/10">
                <img
                  src={goblin.avatarImg}
                  alt={goblin.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[10px] font-bold text-[#F5F3FF] truncate w-full">
                #{goblin.id} {goblin.name.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Comprehensive Selected Goblin Breakdown */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#171725] via-[#11111B] to-[#171725] border border-[#8B5CF6]/30 shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* 3D Interactive Card Showcase */}
            <div className="w-full sm:w-64 shrink-0">
              <Goblin3DCard
                id={selectedGoblin.id}
                name={selectedGoblin.name}
                roleTitle={selectedGoblin.roleTitle}
                image={`/art/goblin-${selectedGoblin.id}.webp`}
                quote={selectedGoblin.quote}
                badge={`CLASS 0${selectedGoblin.id}`}
                primaryColor={
                  selectedGoblin.id === 2 ? '#A3E635' : selectedGoblin.id === 4 ? '#F59E0B' : '#A855F7'
                }
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#A3E635]/20 text-[#A3E635] border border-[#A3E635]/30">
                  Archetype #{selectedGoblin.id}
                </span>
                <span className="text-xs text-[#A1A1B5] font-semibold">
                  Official CodeGoblins Identity
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-[#F5F3FF] mt-1">
                {selectedGoblin.name}
              </h2>
              <p className="text-sm text-[#A855F7] font-bold">
                {selectedGoblin.roleTitle}
              </p>
              <p className="text-xs italic text-[#A1A1B5] mt-1">
                "{selectedGoblin.motto}"
              </p>
            </div>
          </div>

          {/* Avatar switch button */}
          {currentUser && currentUser.avatarGoblinId !== selectedGoblin.id ? (
            <button
              onClick={handleSelectAsAvatar}
              className="goblin-btn-green py-2.5 px-5 text-xs font-bold flex items-center gap-2 self-start lg:self-auto shrink-0"
            >
              <Sparkles className="w-4 h-4 text-[#09090F]" />
              <span>Adopt as My Profile Avatar</span>
            </button>
          ) : (
            <div className="px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Current Clan Avatar</span>
            </div>
          )}
        </div>

        {/* Personality & Quote */}
        <div className="p-4 rounded-2xl bg-[#09090F]/70 border border-white/5">
          <span className="text-[11px] font-bold text-[#A3E635] uppercase tracking-wider block mb-1">
            Character Personality & Vision
          </span>
          <p className="text-xs text-[#F5F3FF] leading-relaxed mb-2">
            {selectedGoblin.personality}
          </p>
          <p className="text-xs italic text-[#A855F7]">
            "{selectedGoblin.quote}"
          </p>
        </div>

        {/* 2-Column: Responsibilities Checklist & Associated Community Activities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Responsibilities */}
          <div className="goblin-card p-5 space-y-3">
            <h3 className="text-xs font-bold text-[#F5F3FF] uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#A3E635]" />
              <span>Official Responsibilities (From Poster)</span>
            </h3>
            <div className="space-y-2">
              {selectedGoblin.responsibilities.map((resp, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-[#A1A1B5]">
                  <span className="text-[#A3E635] font-bold">✔</span>
                  <span>{resp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Associated Activities */}
          <div className="goblin-card p-5 space-y-3">
            <h3 className="text-xs font-bold text-[#F5F3FF] uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
              <span>Associated Clan Activities & Quests</span>
            </h3>
            <div className="space-y-2">
              {selectedGoblin.associatedActivities.map((act, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-[#A1A1B5]">
                  <span className="text-[#8B5CF6] font-bold">⚡</span>
                  <span>{act}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full Team Poster Banner */}
        <div className="pt-4 border-t border-white/5">
          <p className="text-xs font-bold text-[#A1A1B5] uppercase tracking-wider mb-3">
            Full Clan Reference Poster
          </p>
          <div className="rounded-2xl overflow-hidden border border-white/10 ring-1 ring-white/5">
            <img
              src="/assets/goblins/team_roles_poster.jpg"
              alt="CodeGoblins Team Roles Poster"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
