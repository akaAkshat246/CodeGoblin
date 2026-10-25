import React, { useState } from 'react';
import {
  Trophy,
  Calendar,
  MapPin,
  Users,
  ExternalLink,
  Search,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HackathonsPage: React.FC = () => {
  const { hackathons, registerForEvent, currentUser, navigateTo } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = hackathons.filter((e) => {
    const matchesStatus = filterStatus === 'All' || e.status === filterStatus;
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Trophy className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-[#F5F3FF]">
              Hackathons & Events
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#A1A1B5] mt-1">
            Discover premier hackathons, sprint challenges, register with your squad, and claim podiums.
          </p>
        </div>

        <button
          onClick={() => navigateTo('squads')}
          className="goblin-btn-primary py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <Users className="w-4 h-4" />
          <span>Find Teammates in Squads</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#11111B] border border-white/5">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#8B5CF6] absolute left-3.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events by title or keywords..."
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-[#171725] border border-white/5 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#8B5CF6]"
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-semibold">
          {['All', 'Upcoming', 'Ongoing', 'Completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg transition ${
                filterStatus === status
                  ? 'bg-[#171725] text-[#A3E635] border border-[#A3E635]/30'
                  : 'text-[#A1A1B5] hover:text-[#F5F3FF]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-6">
        {filteredEvents.map((evt) => {
          const isRegistered = currentUser ? evt.registeredUserIds.includes(currentUser.id) : false;

          return (
            <div
              key={evt.id}
              className="goblin-card p-6 sm:p-7 border-[#8B5CF6]/25 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 overflow-hidden relative"
            >
              {/* Event Details */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 flex-1">
                <div className="w-full sm:w-44 h-32 rounded-2xl overflow-hidden shrink-0 relative ring-1 ring-white/10">
                  <img
                    src={evt.bannerImage}
                    alt={evt.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-[#A3E635] text-[#09090F]">
                    {evt.type}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-[#A1A1B5] font-semibold">{evt.organizer}</span>
                    <span className="text-white/20">•</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400">
                      {evt.status}
                    </span>
                    <span className="text-white/20">•</span>
                    <span className="text-[#A3E635] font-mono font-bold">{evt.format}</span>
                    {evt.location && <span className="text-[#A1A1B5]">({evt.location})</span>}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#F5F3FF]">
                    {evt.title}
                  </h3>

                  <p className="text-xs text-[#A1A1B5] leading-relaxed max-w-2xl line-clamp-2">
                    {evt.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#A1A1B5] pt-1">
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                      <Trophy className="w-3.5 h-3.5" />
                      <span>{evt.prizePool}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#C084FC]">
                      <Users className="w-3.5 h-3.5" />
                      <span>{evt.teamSize}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#8B5CF6]" />
                      <span>
                        Starts: {new Date(evt.startDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full lg:w-auto shrink-0">
                {isRegistered ? (
                  <div className="px-5 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Registered (+80 XP)</span>
                  </div>
                ) : (
                  <button
                    onClick={() => registerForEvent(evt.id)}
                    className="goblin-btn-green py-2.5 px-6 text-xs font-bold flex items-center justify-center gap-2 shadow-glow-green"
                  >
                    <Sparkles className="w-4 h-4 text-[#09090F]" />
                    <span>Register Now</span>
                  </button>
                )}

                <button
                  onClick={() => navigateTo('squads')}
                  className="px-5 py-2.5 rounded-xl bg-[#171725] border border-white/10 hover:border-[#8B5CF6] text-xs font-semibold text-[#F5F3FF] flex items-center justify-center gap-2 transition"
                >
                  <Users className="w-4 h-4 text-[#8B5CF6]" />
                  <span>Assemble Squad</span>
                </button>

                <a
                  href={evt.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-center text-[11px] text-[#A855F7] hover:underline flex items-center justify-center gap-1 font-semibold pt-1"
                >
                  <span>Official Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
