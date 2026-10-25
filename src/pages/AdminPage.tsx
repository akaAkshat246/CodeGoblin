import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  MessageSquare,
  Hammer,
  Scroll,
  TrendingUp,
  AlertTriangle,
  Trash2,
  Star,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { GOBLIN_CHARACTERS } from '../data/mockData';

export const AdminPage: React.FC = () => {
  const {
    currentUser,
    allUsers,
    posts,
    projects,
    quests,
    updateUserRole,
    deletePost,
    toggleFeatureProject,
    loginAs,
    navigateTo
  } = useApp();

  const [activeTab, setActiveTab] = useState<'members' | 'discussions' | 'projects'>('members');

  const isAdmin = currentUser?.role === 'Administrator' || currentUser?.role === 'Moderator';

  if (!isAdmin) {
    return (
      <div className="p-8 max-w-lg mx-auto text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center">
          <Lock className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-[#F5F3FF]">Admin Access Restricted</h2>
        <p className="text-xs text-[#A1A1B5] leading-relaxed">
          You are currently signed in as a <span className="text-[#A3E635] font-semibold">{currentUser?.role || 'Guest'}</span>. Only Administrators and Clan Moderators can access this dashboard.
        </p>
        <div className="pt-2">
          <button
            onClick={() => loginAs('user_admin_1')}
            className="goblin-btn-primary py-2.5 px-6 text-xs font-bold"
          >
            Switch to Admin Demo Account (Rohan Das)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
            <ShieldCheck className="w-5 h-5" />
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-[#F5F3FF]">
            Clan Administration & Moderation
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#A1A1B5] mt-1">
          Manage member roles, moderate discussions, curate featured projects, and monitor platform health.
        </p>
      </div>

      {/* Analytics Overview Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="goblin-card p-4">
          <div className="flex items-center justify-between text-xs text-[#A1A1B5] mb-1">
            <span>Total Members</span>
            <Users className="w-4 h-4 text-[#8B5CF6]" />
          </div>
          <p className="text-2xl font-black text-[#F5F3FF]">{allUsers.length}</p>
          <span className="text-[10px] text-emerald-400 font-semibold">+3 this week</span>
        </div>

        <div className="goblin-card p-4">
          <div className="flex items-center justify-between text-xs text-[#A1A1B5] mb-1">
            <span>Discussions</span>
            <MessageSquare className="w-4 h-4 text-[#A855F7]" />
          </div>
          <p className="text-2xl font-black text-[#F5F3FF]">{posts.length}</p>
          <span className="text-[10px] text-[#A3E635] font-semibold">Active threads</span>
        </div>

        <div className="goblin-card p-4">
          <div className="flex items-center justify-between text-xs text-[#A1A1B5] mb-1">
            <span>Forged Projects</span>
            <Hammer className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-black text-[#F5F3FF]">{projects.length}</p>
          <span className="text-[10px] text-amber-400 font-semibold">Real student MVPs</span>
        </div>

        <div className="goblin-card p-4">
          <div className="flex items-center justify-between text-xs text-[#A1A1B5] mb-1">
            <span>Active Quests</span>
            <Scroll className="w-4 h-4 text-[#A3E635]" />
          </div>
          <p className="text-2xl font-black text-[#F5F3FF]">{quests.length}</p>
          <span className="text-[10px] text-[#A3E635] font-semibold">8 learning tracks</span>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-2 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('members')}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === 'members'
              ? 'bg-[#171725] text-[#A3E635] border border-[#A3E635]/40 font-bold'
              : 'text-[#A1A1B5] hover:text-[#F5F3FF]'
          }`}
        >
          Member & Role Management ({allUsers.length})
        </button>
        <button
          onClick={() => setActiveTab('discussions')}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === 'discussions'
              ? 'bg-[#171725] text-[#A3E635] border border-[#A3E635]/40 font-bold'
              : 'text-[#A1A1B5] hover:text-[#F5F3FF]'
          }`}
        >
          Moderate Discussions ({posts.length})
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === 'projects'
              ? 'bg-[#171725] text-[#A3E635] border border-[#A3E635]/40 font-bold'
              : 'text-[#A1A1B5] hover:text-[#F5F3FF]'
          }`}
        >
          Curate Projects ({projects.length})
        </button>
      </div>

      {/* TAB 1: MEMBERS */}
      {activeTab === 'members' && (
        <div className="goblin-card overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 text-xs font-bold text-[#A1A1B5] uppercase tracking-wider flex items-center justify-between">
            <span>User & Archetype</span>
            <div className="flex items-center gap-8">
              <span>Level / XP</span>
              <span>Assigned Role</span>
            </div>
          </div>

          <div className="divide-y divide-white/5">
            {allUsers.map((user) => {
              const goblin = GOBLIN_CHARACTERS.find((g) => g.id === user.avatarGoblinId) || GOBLIN_CHARACTERS[0];
              return (
                <div
                  key={user.id}
                  className="px-6 py-4 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={goblin.avatarImg}
                      alt={user.displayName}
                      className="w-9 h-9 rounded-xl object-cover ring-1 ring-white/10"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#F5F3FF]">{user.displayName}</span>
                        <span className="text-[10px] text-[#A1A1B5]">@{user.username}</span>
                      </div>
                      <p className="text-[10px] text-[#A3E635]">{goblin.roleTitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right font-mono hidden sm:block">
                      <p className="font-bold text-[#F5F3FF]">Lvl {user.level}</p>
                      <p className="text-[10px] text-[#A1A1B5]">{user.xp} XP</p>
                    </div>

                    <select
                      value={user.role}
                      onChange={(e) => updateUserRole(user.id, e.target.value as UserRole)}
                      className="px-3 py-1.5 rounded-xl bg-[#11111B] border border-white/10 text-xs font-semibold text-[#A855F7] focus:outline-none focus:border-[#8B5CF6]"
                    >
                      <option value="Member">Member</option>
                      <option value="Moderator">Moderator</option>
                      <option value="Event Organizer">Event Organizer</option>
                      <option value="Mentor">Mentor</option>
                      <option value="Administrator">Administrator</option>
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: DISCUSSIONS MODERATION */}
      {activeTab === 'discussions' && (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="goblin-card p-4 flex items-center justify-between gap-4 text-xs"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-[#8B5CF6]/20 text-[#C084FC] font-semibold">
                    {post.category}
                  </span>
                  <span className="text-[#A1A1B5]">By {post.authorName}</span>
                </div>
                <h4 className="font-bold text-[#F5F3FF] text-sm">{post.title}</h4>
                <p className="text-xs text-[#A1A1B5] mt-1 line-clamp-1">{post.content}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => navigateTo('discussion_detail', post.id)}
                  className="px-3 py-1.5 rounded-xl bg-[#171725] text-xs font-semibold text-[#F5F3FF] hover:bg-[#1E1E32]"
                >
                  View
                </button>
                <button
                  onClick={() => deletePost(post.id)}
                  className="p-2 rounded-xl border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 transition"
                  title="Remove Post"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: PROJECTS CURATION */}
      {activeTab === 'projects' && (
        <div className="space-y-3">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="goblin-card p-4 flex items-center justify-between gap-4 text-xs"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[#A3E635] font-semibold">{proj.category}</span>
                  <span className="text-white/20">•</span>
                  <span className="text-[#A1A1B5]">By {proj.authorName}</span>
                  {proj.featured && (
                    <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-400 font-bold">
                      Featured
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-[#F5F3FF] text-sm">{proj.title}</h4>
                <p className="text-xs text-[#A1A1B5] mt-0.5">{proj.tagline}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleFeatureProject(proj.id)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
                    proj.featured
                      ? 'border-amber-400 text-amber-400 bg-amber-400/10'
                      : 'border-white/10 text-[#A1A1B5] hover:text-[#F5F3FF]'
                  }`}
                >
                  <Star className={`w-3.5 h-3.5 ${proj.featured ? 'fill-amber-400' : ''}`} />
                  <span>{proj.featured ? 'Featured' : 'Make Featured'}</span>
                </button>
                <button
                  onClick={() => navigateTo('project_detail', proj.id)}
                  className="px-3 py-1.5 rounded-xl bg-[#171725] text-[#F5F3FF] hover:bg-[#1E1E32]"
                >
                  Inspect
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
