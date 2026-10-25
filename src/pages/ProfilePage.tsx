import React, { useState } from 'react';
import {
  User,
  Sparkles,
  Flame,
  Trophy,
  Calendar,
  GitBranch,
  Globe,
  GraduationCap,
  Edit3,
  Check,
  Hammer,
  Bookmark,
  Layers,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GOBLIN_CHARACTERS, INITIAL_ACHIEVEMENTS } from '../data/mockData';

export const ProfilePage: React.FC = () => {
  const {
    currentUser,
    selectedMemberId,
    allUsers,
    updateProfile,
    projects,
    posts,
    navigateTo
  } = useApp();

  const isOwnProfile = !selectedMemberId || selectedMemberId === currentUser?.id;
  const targetUser = isOwnProfile
    ? currentUser
    : allUsers.find((u) => u.id === selectedMemberId) || currentUser;

  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(targetUser?.displayName || '');
  const [bio, setBio] = useState(targetUser?.bio || '');
  const [college, setCollege] = useState(targetUser?.college || '');
  const [githubUrl, setGithubUrl] = useState(targetUser?.githubUrl || '');
  const [portfolioUrl, setPortfolioUrl] = useState(targetUser?.portfolioUrl || '');
  const [selectedAvatarId, setSelectedAvatarId] = useState(targetUser?.avatarGoblinId || 2);

  if (!targetUser) return null;

  const activeGoblin = GOBLIN_CHARACTERS.find((g) => g.id === targetUser.avatarGoblinId) || GOBLIN_CHARACTERS[1];
  const userProjects = projects.filter((p) => p.authorId === targetUser.id);
  const userSavedPosts = posts.filter((p) => targetUser.savedPostIds?.includes(p.id));

  const handleSaveProfile = () => {
    if (!isOwnProfile) return;
    updateProfile({
      displayName,
      bio,
      college,
      githubUrl,
      portfolioUrl,
      avatarGoblinId: selectedAvatarId
    });
    setIsEditing(false);
  };

  // Activity Heatmap Simulation (Past 28 Days)
  const days = Array.from({ length: 28 }, (_, i) => {
    const active = i >= 28 - targetUser.streakDays;
    return { day: i + 1, active };
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Profile Header Banner */}
      <div className="goblin-card p-6 sm:p-8 relative overflow-hidden border-[#8B5CF6]/30">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Mascot Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-[#8B5CF6]/50 shadow-glow-purple">
                <img
                  src={
                    GOBLIN_CHARACTERS.find((g) => g.id === (isEditing ? selectedAvatarId : targetUser.avatarGoblinId))
                      ?.avatarImg || activeGoblin.avatarImg
                  }
                  alt={targetUser.displayName}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute -bottom-2 -right-1 px-2.5 py-0.5 rounded-full bg-[#A3E635] text-[#09090F] font-black text-xs">
                Lvl {targetUser.level}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#A855F7] uppercase tracking-wider">
                  {targetUser.role}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#A3E635]/15 text-[#A3E635]">
                  {activeGoblin.roleTitle}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-black text-[#F5F3FF] mt-0.5">
                {targetUser.displayName}
              </h1>
              <p className="text-xs text-[#A1A1B5] font-mono">@{targetUser.username}</p>

              {targetUser.college && (
                <p className="text-xs text-slate-300 font-medium mt-1 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>{targetUser.college} • {targetUser.yearOfStudy}</span>
                </p>
              )}
            </div>
          </div>

          {isOwnProfile && (
            <div>
              {isEditing ? (
                <button
                  onClick={handleSaveProfile}
                  className="goblin-btn-green py-2 px-5 text-xs font-bold flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 rounded-xl bg-[#171725] border border-white/10 hover:border-[#8B5CF6] text-xs font-semibold text-[#F5F3FF] flex items-center gap-2 transition"
                >
                  <Edit3 className="w-4 h-4 text-[#8B5CF6]" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Edit Mode Inputs */}
        {isEditing ? (
          <div className="mt-6 pt-6 border-t border-white/5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#F5F3FF] mb-2">
                Choose Your Goblin Mascot Avatar (The 9 Archetypes)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
                {GOBLIN_CHARACTERS.map((g) => (
                  <div
                    key={g.id}
                    onClick={() => setSelectedAvatarId(g.id)}
                    className={`cursor-pointer p-1.5 rounded-xl border text-center transition ${
                      selectedAvatarId === g.id
                        ? 'border-[#A3E635] bg-[#171725] ring-2 ring-[#A3E635]'
                        : 'border-white/5 bg-[#11111B]'
                    }`}
                  >
                    <img src={g.avatarImg} alt={g.name} className="w-full h-12 object-cover rounded-lg" />
                    <span className="text-[9px] font-bold text-[#A1A1B5] mt-1 block truncate">#{g.id}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#F5F3FF] mb-1">Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#11111B] border border-white/10 text-xs text-[#F5F3FF]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#F5F3FF] mb-1">College & Branch</label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#11111B] border border-white/10 text-xs text-[#F5F3FF]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F5F3FF] mb-1">Builder Bio</label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#11111B] border border-white/10 text-xs text-[#F5F3FF]"
              />
            </div>
          </div>
        ) : (
          <div className="mt-6 pt-6 border-t border-white/5 space-y-4">
            <p className="text-xs sm:text-sm text-[#A1A1B5] leading-relaxed max-w-3xl">
              {targetUser.bio}
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              {targetUser.githubUrl && (
                <a
                  href={targetUser.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-[#11111B] border border-white/5 text-[#A1A1B5] hover:text-[#F5F3FF] flex items-center gap-1.5 transition"
                >
                  <GitBranch className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>GitHub</span>
                </a>
              )}
              {targetUser.portfolioUrl && (
                <a
                  href={targetUser.portfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-[#11111B] border border-white/5 text-[#A1A1B5] hover:text-[#F5F3FF] flex items-center gap-1.5 transition"
                >
                  <Globe className="w-3.5 h-3.5 text-[#A3E635]" />
                  <span>Portfolio</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 2-Column: Activity Streak Calendar & Gamified Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Streak Heatmap */}
        <div className="goblin-card p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#F5F3FF] uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Activity History (Asia/Kolkata)</span>
            </h3>
            <span className="text-xs font-mono font-bold text-amber-400">
              {targetUser.streakDays} Day Active Streak
            </span>
          </div>

          <p className="text-[11px] text-[#A1A1B5]">
            Daily qualifying activities (solving quests, discussions, code commits) count toward your streak.
          </p>

          <div className="grid grid-cols-7 gap-2 pt-2">
            {days.map((d) => (
              <div
                key={d.day}
                className={`h-7 rounded-lg flex items-center justify-center text-[10px] font-mono transition ${
                  d.active
                    ? 'bg-[#A3E635]/25 border border-[#A3E635] text-[#A3E635] font-bold'
                    : 'bg-[#11111B] border border-white/5 text-white/20'
                }`}
                title={`Day ${d.day} • ${d.active ? 'Active' : 'Rest'}`}
              >
                {d.day}
              </div>
            ))}
          </div>
        </div>

        {/* Reputation & Level Metrics */}
        <div className="goblin-card p-6 space-y-4">
          <h3 className="text-xs font-bold text-[#F5F3FF] uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
            <span>Reputation & Clan Standing</span>
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-[#11111B] border border-white/5">
              <span className="text-[10px] text-[#A1A1B5] uppercase">Total Earned XP</span>
              <p className="text-xl font-black text-[#A3E635] mt-0.5">{targetUser.xp} XP</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#11111B] border border-white/5">
              <span className="text-[10px] text-[#A1A1B5] uppercase">Clan Reputation</span>
              <p className="text-xl font-black text-[#C084FC] mt-0.5">{targetUser.reputationScore} Rep</p>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-[#A1A1B5]">
            <div className="flex justify-between">
              <span>Next Level Threshold:</span>
              <span className="font-mono text-[#F5F3FF] font-bold">{targetUser.xpToNextLevel} XP</span>
            </div>
            <div className="flex justify-between">
              <span>Longest Continuous Streak:</span>
              <span className="font-mono text-amber-400 font-bold">{targetUser.longestStreak} Days</span>
            </div>
          </div>
        </div>
      </div>

      {/* ACHIEVEMENTS GRID */}
      <div className="goblin-card p-6 space-y-4">
        <h3 className="text-xs font-bold text-[#F5F3FF] uppercase tracking-wider flex items-center gap-1.5">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Unlocked Badges & Achievements</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {INITIAL_ACHIEVEMENTS.map((ach) => {
            const isUnlocked = targetUser.achievements?.includes(ach.id);
            return (
              <div
                key={ach.id}
                className={`p-3.5 rounded-2xl border flex items-center gap-3 transition ${
                  isUnlocked
                    ? 'bg-[#11111B] border-[#8B5CF6]/40 shadow-glow-purple text-[#F5F3FF]'
                    : 'bg-[#11111B]/40 border-white/5 text-[#A1A1B5] opacity-50'
                }`}
              >
                <span className="text-2xl">{ach.icon}</span>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold">{ach.title}</h4>
                    {isUnlocked && <span className="text-[10px] text-[#A3E635]">✔</span>}
                  </div>
                  <p className="text-[10px] text-[#A1A1B5] leading-snug mt-0.5">{ach.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* USER PROJECTS & SAVED DISCUSSIONS */}
      {userProjects.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-[#F5F3FF] uppercase tracking-wider flex items-center gap-2">
            <Hammer className="w-4 h-4 text-amber-400" />
            <span>Forged Projects ({userProjects.length})</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userProjects.map((p) => (
              <div
                key={p.id}
                onClick={() => navigateTo('project_detail', p.id)}
                className="goblin-card p-4 cursor-pointer hover:border-[#8B5CF6]/50 transition flex items-center justify-between"
              >
                <div>
                  <h4 className="text-sm font-bold text-[#F5F3FF]">{p.title}</h4>
                  <p className="text-xs text-[#A1A1B5] truncate max-w-sm">{p.tagline}</p>
                </div>
                <span className="text-xs font-semibold text-[#A3E635]">{p.likes} ♥</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
