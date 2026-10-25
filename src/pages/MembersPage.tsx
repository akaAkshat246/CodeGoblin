import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Sparkles,
  GraduationCap,
  Flame,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GOBLIN_CHARACTERS } from '../data/mockData';
import { UserProfile } from '../types';

export const MembersPage: React.FC = () => {
  const { allUsers, navigateTo, currentUser } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [mentorFilter, setMentorFilter] = useState<'all' | 'mentors'>('all');
  const [selectedMentor, setSelectedMentor] = useState<UserProfile | null>(null);
  const [mentorshipTopic, setMentorshipTopic] = useState('');
  const [mentorshipSent, setMentorshipSent] = useState(false);

  const filteredMembers = allUsers.filter((member) => {
    const matchesMentor = mentorFilter === 'all' || member.isMentor;
    const matchesSearch =
      member.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.college && member.college.toLowerCase().includes(searchQuery.toLowerCase())) ||
      member.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesMentor && matchesSearch;
  });

  const handleSendMentorshipRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setMentorshipSent(true);
    setTimeout(() => {
      setSelectedMentor(null);
      setMentorshipSent(false);
      setMentorshipTopic('');
    }, 2000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#A3E635]/20 text-[#A3E635]">
              <Users className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-[#F5F3FF]">
              Members & Mentorship Directory
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#A1A1B5] mt-1">
            Discover peer coders, connect with verified student mentors, and build cross-college networks.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#11111B] border border-white/5">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#8B5CF6] absolute left-3.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search members by name, skill, or college..."
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl bg-[#171725] border border-white/5 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#8B5CF6]"
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-semibold">
          <button
            onClick={() => setMentorFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition ${
              mentorFilter === 'all'
                ? 'bg-[#171725] text-[#A3E635] border border-[#A3E635]/30'
                : 'text-[#A1A1B5] hover:text-[#F5F3FF]'
            }`}
          >
            All Members ({allUsers.length})
          </button>
          <button
            onClick={() => setMentorFilter('mentors')}
            className={`px-3 py-1.5 rounded-lg transition ${
              mentorFilter === 'mentors'
                ? 'bg-[#171725] text-[#A3E635] border border-[#A3E635]/30'
                : 'text-[#A1A1B5] hover:text-[#F5F3FF]'
            }`}
          >
            Available Mentors ({allUsers.filter((u) => u.isMentor).length})
          </button>
        </div>
      </div>

      {/* Members Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMembers.map((member) => {
          const goblin = GOBLIN_CHARACTERS.find((g) => g.id === member.avatarGoblinId) || GOBLIN_CHARACTERS[0];

          return (
            <div
              key={member.id}
              className="goblin-card p-5 flex flex-col justify-between group transition hover:border-[#8B5CF6]/40"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={goblin.avatarImg}
                      alt={member.displayName}
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-[#8B5CF6]/30 group-hover:ring-[#A3E635] transition shrink-0"
                    />
                    <div>
                      <h3
                        onClick={() => navigateTo('profile', member.id)}
                        className="text-sm font-bold text-[#F5F3FF] hover:text-[#A855F7] cursor-pointer transition"
                      >
                        {member.displayName}
                      </h3>
                      <p className="text-[11px] text-[#A1A1B5] font-mono">@{member.username}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] text-[#A3E635] font-semibold">
                          {goblin.roleTitle}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#8B5CF6]/20 text-[#C084FC]">
                    Lvl {member.level}
                  </span>
                </div>

                <p className="text-xs text-[#A1A1B5] line-clamp-2 leading-relaxed">
                  {member.bio}
                </p>

                {member.college && (
                  <p className="text-[11px] text-slate-300 font-medium mt-2 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span className="truncate">{member.college}</span>
                  </p>
                )}

                {/* Skills tags */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {member.skills.slice(0, 4).map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] bg-[#11111B] border border-white/5 text-[#A1A1B5]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer controls */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-amber-400 font-mono flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{member.streakDays}d streak</span>
                </span>

                <div className="flex items-center gap-2">
                  {member.isMentor && member.id !== currentUser?.id && (
                    <button
                      onClick={() => setSelectedMentor(member)}
                      className="goblin-btn-green py-1 px-3 text-[11px] font-bold"
                    >
                      Request Mentor
                    </button>
                  )}
                  <button
                    onClick={() => navigateTo('profile', member.id)}
                    className="text-[#A855F7] font-semibold hover:underline text-xs"
                  >
                    Profile →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MENTORSHIP REQUEST MODAL */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md p-6 rounded-3xl bg-[#11111B] border border-[#A3E635]/40 shadow-glow-green text-left">
            <button
              onClick={() => setSelectedMentor(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-[#A1A1B5] hover:text-[#F5F3FF]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-[#F5F3FF]">
              Request Mentorship with {selectedMentor.displayName}
            </h3>
            <p className="text-xs text-[#A1A1B5] mt-1 mb-4">
              {selectedMentor.mentorBio || 'Connect for 1-on-1 advice on code, career, or hackathon strategy.'}
            </p>

            {mentorshipSent ? (
              <div className="p-6 text-center text-emerald-400 space-y-2">
                <CheckCircle2 className="w-10 h-10 mx-auto" />
                <p className="text-sm font-bold">Mentorship Request Dispatched!</p>
                <p className="text-xs text-[#A1A1B5]">
                  {selectedMentor.displayName} will receive a notification in their Goblin HQ.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendMentorshipRequest} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#F5F3FF] mb-1">
                    What would you like to discuss?
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={mentorshipTopic}
                    onChange={(e) => setMentorshipTopic(e.target.value)}
                    placeholder="e.g. Guidance on setting up my first full-stack React + FastAPI architecture, or review my hackathon pitch..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#A3E635]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedMentor(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-[#A1A1B5]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="goblin-btn-green py-2 px-5 text-xs font-bold"
                  >
                    Send Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
