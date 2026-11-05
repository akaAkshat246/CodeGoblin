import React, { useState } from 'react';
import {
  Users,
  Search,
  GraduationCap,
  Flame,
  CheckCircle2,
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-lime-400" />
            <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Goblin Directory & Mentors
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Discover fellow student developers, connect with mentors, and form hackathon squads.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-[#111118] border border-white/[0.06]">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search members by name, skill, or college..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30"
          />
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto text-xs">
          <button
            onClick={() => setMentorFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              mentorFilter === 'all'
                ? 'bg-white text-black font-semibold'
                : 'text-zinc-400 hover:text-white bg-white/[0.03] border border-white/[0.06]'
            }`}
          >
            All Members ({allUsers.length})
          </button>
          <button
            onClick={() => setMentorFilter('mentors')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              mentorFilter === 'mentors'
                ? 'bg-white text-black font-semibold'
                : 'text-zinc-400 hover:text-white bg-white/[0.03] border border-white/[0.06]'
            }`}
          >
            Mentors ({allUsers.filter((u) => u.isMentor).length})
          </button>
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMembers.map((member) => {
          const goblin = GOBLIN_CHARACTERS.find((g) => g.id === member.avatarGoblinId) || GOBLIN_CHARACTERS[0];

          return (
            <div
              key={member.id}
              className="p-4 sm:p-5 rounded-xl bg-[#111118] border border-white/[0.06] hover:border-white/[0.12] flex flex-col justify-between transition-colors group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={goblin.avatarImg}
                      alt={member.displayName}
                      className="w-10 h-10 rounded-lg object-cover border border-white/10 shrink-0"
                    />
                    <div>
                      <h3
                        onClick={() => navigateTo('profile', member.id)}
                        className="text-xs sm:text-sm font-semibold text-white hover:text-purple-300 cursor-pointer transition-colors"
                      >
                        {member.displayName}
                      </h3>
                      <p className="text-[11px] text-zinc-500 font-mono">@{member.username}</p>
                      <span className="text-[10px] text-lime-400 font-medium">
                        {goblin.roleTitle}
                      </span>
                    </div>
                  </div>

                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-white/[0.04] text-zinc-400 border border-white/[0.06]">
                    Lvl {member.level}
                  </span>
                </div>

                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {member.bio}
                </p>

                {member.college && (
                  <p className="text-[11px] text-zinc-400 mt-2 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span className="truncate">{member.college}</span>
                  </p>
                )}

                {/* Skills tags */}
                <div className="mt-2.5 flex flex-wrap gap-1">
                  {member.skills.slice(0, 4).map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] bg-white/[0.03] border border-white/[0.06] text-zinc-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-zinc-500 font-mono flex items-center gap-1 text-[11px]">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>{member.streakDays}d streak</span>
                </span>

                <div className="flex items-center gap-2">
                  {member.isMentor && member.id !== currentUser?.id && (
                    <button
                      onClick={() => setSelectedMentor(member)}
                      className="px-2.5 py-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-lime-400 text-[11px] font-medium transition-colors"
                    >
                      Request Mentor
                    </button>
                  )}
                  <button
                    onClick={() => navigateTo('profile', member.id)}
                    className="text-zinc-400 hover:text-white font-medium text-xs transition-colors"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md p-6 rounded-2xl bg-[#111118] border border-white/10 shadow-2xl text-left">
            <button
              onClick={() => setSelectedMentor(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-semibold text-white">
              Request Mentorship with {selectedMentor.displayName}
            </h3>
            <p className="text-xs text-zinc-400 mt-1 mb-4">
              {selectedMentor.mentorBio || 'Connect for 1-on-1 advice on code, projects, or career.'}
            </p>

            {mentorshipSent ? (
              <div className="p-6 text-center text-emerald-400 space-y-2">
                <CheckCircle2 className="w-8 h-8 mx-auto" />
                <p className="text-sm font-semibold">Mentorship Request Sent</p>
                <p className="text-xs text-zinc-400">
                  {selectedMentor.displayName} will be notified.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendMentorshipRequest} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                    What would you like to discuss?
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={mentorshipTopic}
                    onChange={(e) => setMentorshipTopic(e.target.value)}
                    placeholder="e.g. Code review on my full-stack repository or hackathon team guidance..."
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedMentor(null)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-white text-black hover:bg-zinc-200 text-xs font-semibold transition-colors"
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
