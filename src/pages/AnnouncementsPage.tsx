import React from 'react';
import {
  Megaphone,
  Pin,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GOBLIN_CHARACTERS, FOUNDERS } from '../data/mockData';

export const AnnouncementsPage: React.FC = () => {
  const { announcements, navigateTo } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Page Header */}
      <div className="border-b border-white/[0.06] pb-5">
        <div className="flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-purple-400" />
          <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Clan Announcements
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Official platform releases, milestone announcements, and hackathon schedules.
        </p>
      </div>

      {/* Leadership & Founders Card */}
      <div className="p-5 rounded-xl bg-[#111118] border border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider block mb-1">
            Clan Leadership
          </span>
          <h2 className="text-sm font-semibold text-white">
            Founded by Akshat Vats & Akshat Kumar
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl leading-relaxed">
            Building an open community for college developers to ship real code, join hackathons, and learn practical engineering.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {FOUNDERS.map((founder, i) => (
            <div
              key={i}
              className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]"
            >
              <img
                src={
                  GOBLIN_CHARACTERS.find((g) => g.id === founder.goblinId)?.avatarImg ||
                  GOBLIN_CHARACTERS[0].avatarImg
                }
                alt={founder.name}
                className="w-7 h-7 rounded-md object-cover border border-white/10"
              />
              <div>
                <h4 className="text-xs font-semibold text-white leading-tight">{founder.name}</h4>
                <p className="text-[10px] text-zinc-400">{founder.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Announcements Stream */}
      <div className="space-y-4">
        {announcements.map((ann) => {
          const authorGoblin = GOBLIN_CHARACTERS.find((g) => g.id === ann.authorAvatarGoblinId) || GOBLIN_CHARACTERS[0];

          return (
            <div
              key={ann.id}
              className={`p-5 rounded-xl border transition-colors ${
                ann.isPinned
                  ? 'border-lime-400/30 bg-[#111118]'
                  : 'border-white/[0.06] bg-[#111118]'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2">
                  {ann.isPinned && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-lime-400/10 text-lime-400 border border-lime-400/20 flex items-center gap-1">
                      <Pin className="w-3 h-3" />
                      <span>Pinned</span>
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    {ann.category}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-white/[0.03] border border-white/[0.06] text-zinc-400 font-mono">
                    {ann.badge}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {new Date(ann.createdAt).toLocaleDateString([], {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              <h3 className="text-base font-semibold text-white mb-2 leading-snug">
                {ann.title}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4 whitespace-pre-line">
                {ann.content}
              </p>

              {/* Author attribution footer */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <img
                    src={authorGoblin.avatarImg}
                    alt={ann.authorName}
                    className="w-6 h-6 rounded-md object-cover border border-white/10"
                  />
                  <div>
                    <h5 className="font-semibold text-white text-xs">{ann.authorName}</h5>
                    <p className="text-[10px] text-zinc-500">{ann.authorTitle}</p>
                  </div>
                </div>

                {ann.category === 'Hackathon' && (
                  <button
                    onClick={() => navigateTo('hackathons')}
                    className="text-xs text-zinc-300 hover:text-white font-medium flex items-center gap-1 transition-colors"
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
