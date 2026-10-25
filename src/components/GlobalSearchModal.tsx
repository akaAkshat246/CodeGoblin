import React, { useState, useEffect } from 'react';
import { Search, X, MessageSquare, Hammer, Scroll, Trophy, Users, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    navigateTo,
    posts,
    projects,
    quests,
    hackathons,
    allUsers
  } = useApp();

  const [query, setQuery] = useState('');

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
      if (e.key === 'Escape' && isSearchModalOpen) {
        setIsSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchModalOpen, setIsSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedPosts = q
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
    : [];

  const matchedProjects = q
    ? projects.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.techStack.some((t) => t.toLowerCase().includes(q))
      )
    : [];

  const matchedQuests = q
    ? quests.filter(
        (quest) =>
          quest.title.toLowerCase().includes(q) ||
          quest.description.toLowerCase().includes(q) ||
          quest.category.toLowerCase().includes(q)
      )
    : [];

  const matchedEvents = q
    ? hackathons.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.requiredSkills.some((s) => s.toLowerCase().includes(q))
      )
    : [];

  const matchedMembers = q
    ? allUsers.filter(
        (u) =>
          u.displayName.toLowerCase().includes(q) ||
          u.username.toLowerCase().includes(q) ||
          u.skills.some((s) => s.toLowerCase().includes(q))
      )
    : [];

  const totalResults =
    matchedPosts.length +
    matchedProjects.length +
    matchedQuests.length +
    matchedEvents.length +
    matchedMembers.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:pt-20 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#11111B] border border-[#8B5CF6]/30 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5 bg-[#171725]/60">
          <Search className="w-5 h-5 text-[#8B5CF6] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search discussions, projects, quests, hackathons, members..."
            className="w-full bg-transparent text-sm text-[#F5F3FF] placeholder-[#A1A1B5] focus:outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-[#A1A1B5] hover:text-[#F5F3FF]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="px-2 py-1 rounded-lg bg-[#11111B] border border-white/10 text-xs text-[#A1A1B5] hover:text-[#F5F3FF]"
          >
            ESC
          </button>
        </div>

        {/* Search Results Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!q ? (
            <div className="py-8 text-center text-[#A1A1B5] space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8B5CF6]">
                Global Clan Search
              </p>
              <p className="text-xs">
                Type keywords like <span className="text-[#A3E635]">"Vibe Coding"</span>,{' '}
                <span className="text-[#A3E635]">"React"</span>, <span className="text-[#A3E635]">"GoblinHacks"</span>, or{' '}
                <span className="text-[#A3E635]">"FastAPI"</span>.
              </p>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-8 text-center text-[#A1A1B5]">
              <p className="text-sm font-semibold text-[#F5F3FF]">No goblin artifacts found</p>
              <p className="text-xs mt-1">Try another search keyword or check spelling.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Quests */}
              {matchedQuests.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#A3E635] uppercase tracking-wider mb-2">
                    <Scroll className="w-3.5 h-3.5" />
                    <span>Quests & Learning ({matchedQuests.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedQuests.map((quest) => (
                      <div
                        key={quest.id}
                        onClick={() => {
                          navigateTo('quests');
                          setIsSearchModalOpen(false);
                        }}
                        className="p-2.5 rounded-xl bg-[#171725] hover:bg-[#1E1E32] border border-white/5 cursor-pointer flex items-center justify-between group transition"
                      >
                        <div>
                          <p className="text-xs font-bold text-[#F5F3FF] group-hover:text-[#A3E635] transition">
                            {quest.title}
                          </p>
                          <p className="text-[11px] text-[#A1A1B5] truncate max-w-md">
                            {quest.description}
                          </p>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#A3E635]/15 text-[#A3E635]">
                          +{quest.xpReward} XP
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Discussions */}
              {matchedPosts.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#C084FC] uppercase tracking-wider mb-2">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>The Goblin Den Discussions ({matchedPosts.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedPosts.map((post) => (
                      <div
                        key={post.id}
                        onClick={() => {
                          navigateTo('discussion_detail', post.id);
                          setIsSearchModalOpen(false);
                        }}
                        className="p-2.5 rounded-xl bg-[#171725] hover:bg-[#1E1E32] border border-white/5 cursor-pointer flex items-center justify-between group transition"
                      >
                        <div>
                          <p className="text-xs font-bold text-[#F5F3FF] group-hover:text-[#C084FC] transition">
                            {post.title}
                          </p>
                          <p className="text-[11px] text-[#A1A1B5]">
                            {post.category} • {post.repliesCount} replies • {post.upvotes} upvotes
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#A1A1B5] group-hover:text-[#F5F3FF] transition" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {matchedProjects.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                    <Hammer className="w-3.5 h-3.5" />
                    <span>Project Forge ({matchedProjects.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedProjects.map((project) => (
                      <div
                        key={project.id}
                        onClick={() => {
                          navigateTo('project_detail', project.id);
                          setIsSearchModalOpen(false);
                        }}
                        className="p-2.5 rounded-xl bg-[#171725] hover:bg-[#1E1E32] border border-white/5 cursor-pointer flex items-center justify-between group transition"
                      >
                        <div>
                          <p className="text-xs font-bold text-[#F5F3FF] group-hover:text-amber-400 transition">
                            {project.title}
                          </p>
                          <p className="text-[11px] text-[#A1A1B5] truncate max-w-md">
                            {project.tagline}
                          </p>
                        </div>
                        <span className="text-[11px] text-[#A1A1B5]">{project.likes} ♥</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hackathons */}
              {matchedEvents.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Hackathons & Events ({matchedEvents.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedEvents.map((evt) => (
                      <div
                        key={evt.id}
                        onClick={() => {
                          navigateTo('hackathons');
                          setIsSearchModalOpen(false);
                        }}
                        className="p-2.5 rounded-xl bg-[#171725] hover:bg-[#1E1E32] border border-white/5 cursor-pointer flex items-center justify-between group transition"
                      >
                        <div>
                          <p className="text-xs font-bold text-[#F5F3FF] group-hover:text-emerald-400 transition">
                            {evt.title}
                          </p>
                          <p className="text-[11px] text-[#A1A1B5]">
                            {evt.organizer} • {evt.prizePool}
                          </p>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/15 text-emerald-400 font-semibold">
                          {evt.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Members */}
              {matchedMembers.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">
                    <Users className="w-3.5 h-3.5" />
                    <span>Builders & Mentors ({matchedMembers.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedMembers.map((member) => (
                      <div
                        key={member.id}
                        onClick={() => {
                          navigateTo('profile', member.id);
                          setIsSearchModalOpen(false);
                        }}
                        className="p-2.5 rounded-xl bg-[#171725] hover:bg-[#1E1E32] border border-white/5 cursor-pointer flex items-center justify-between group transition"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-[#F5F3FF] group-hover:text-sky-400 transition">
                            {member.displayName}
                          </span>
                          <span className="text-[10px] text-[#A1A1B5]">@{member.username}</span>
                          <span className="px-1.5 py-0.2 rounded text-[10px] bg-[#8B5CF6]/20 text-[#C084FC]">
                            Lvl {member.level}
                          </span>
                        </div>
                        <span className="text-[10px] text-[#A1A1B5]">{member.college}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
