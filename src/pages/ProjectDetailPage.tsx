import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  Bookmark,
  ExternalLink,
  GitBranch,
  Users,
  CheckCircle2,
  Calendar,
  Sparkles,
  Send,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GOBLIN_CHARACTERS } from '../data/mockData';

export const ProjectDetailPage: React.FC = () => {
  const {
    selectedProjectId,
    projects,
    likeProject,
    toggleSaveProject,
    currentUser,
    navigateTo
  } = useApp();

  const [isCollabModalOpen, setIsCollabModalOpen] = useState(false);
  const [collabRole, setCollabRole] = useState('Frontend / Fullstack Developer');
  const [collabPitch, setCollabPitch] = useState('');
  const [collabSent, setCollabSent] = useState(false);

  const project = projects.find((p) => p.id === selectedProjectId);

  if (!project) {
    return (
      <div className="p-8 text-center text-[#A1A1B5]">
        <p>Project not found or archived.</p>
        <button
          onClick={() => navigateTo('projects')}
          className="mt-4 px-4 py-2 rounded-xl bg-[#171725] text-xs font-semibold text-[#F5F3FF]"
        >
          Back to Project Forge
        </button>
      </div>
    );
  }

  const isLiked = currentUser ? project.likedUserIds.includes(currentUser.id) : false;
  const isSaved = currentUser?.savedProjectIds?.includes(project.id);

  const handleSendCollab = (e: React.FormEvent) => {
    e.preventDefault();
    setCollabSent(true);
    setTimeout(() => {
      setIsCollabModalOpen(false);
      setCollabSent(false);
      setCollabPitch('');
    }, 2000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Back to Forge */}
      <button
        onClick={() => navigateTo('projects')}
        className="flex items-center gap-1.5 text-xs font-semibold text-[#A1A1B5] hover:text-[#F5F3FF] transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Project Forge</span>
      </button>

      {/* Main Cover Banner */}
      <div className="rounded-3xl overflow-hidden border border-[#8B5CF6]/30 bg-[#171725] relative shadow-2xl">
        <div className="h-64 sm:h-80 w-full relative">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090F] via-transparent to-transparent" />
        </div>

        <div className="p-6 sm:p-8 relative -mt-16 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#A3E635]/20 text-[#A3E635] border border-[#A3E635]/30">
                {project.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#171725] text-amber-400 border border-amber-500/30">
                {project.status}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-black text-[#F5F3FF]">
              {project.title}
            </h1>
            <p className="text-sm sm:text-base text-[#A1A1B5] mt-1 max-w-xl leading-relaxed">
              {project.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => likeProject(project.id)}
              className={`p-3 rounded-2xl border transition flex items-center gap-2 text-xs font-bold ${
                isLiked
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                  : 'bg-[#171725] border-white/10 hover:border-white/30 text-[#A1A1B5]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-400' : ''}`} />
              <span>{project.likes}</span>
            </button>

            <button
              onClick={() => toggleSaveProject(project.id)}
              className={`p-3 rounded-2xl border transition ${
                isSaved ? 'text-[#A3E635] border-[#A3E635]/40' : 'bg-[#171725] border-white/10 text-[#A1A1B5]'
              }`}
            >
              <Bookmark className="w-4 h-4" />
            </button>

            {project.status === 'Looking for Teammates' && (
              <button
                onClick={() => setIsCollabModalOpen(true)}
                className="goblin-btn-green py-3 px-5 text-xs font-bold flex items-center gap-2"
              >
                <Users className="w-4 h-4 text-[#09090F]" />
                <span>Join Team</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Action Links (Demo, Repo) */}
      <div className="flex flex-wrap gap-3">
        {project.liveDemoUrl && (
          <a
            href={project.liveDemoUrl}
            target="_blank"
            rel="noreferrer"
            className="goblin-btn-primary py-2.5 px-6 text-xs font-bold flex items-center gap-2"
          >
            <span>Open Live Working Demo</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        )}

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#171725] border border-white/10 hover:border-[#8B5CF6] text-xs font-semibold text-[#F5F3FF] flex items-center gap-2 transition"
          >
            <GitBranch className="w-4 h-4 text-[#8B5CF6]" />
            <span>GitHub Repository</span>
          </a>
        )}
      </div>

      {/* Problem & Solution Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="goblin-card p-6 border-rose-500/20">
          <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider mb-2">
            The Problem Statement
          </h3>
          <p className="text-xs sm:text-sm text-[#A1A1B5] leading-relaxed">
            {project.problemStatement}
          </p>
        </div>

        <div className="goblin-card p-6 border-emerald-500/20">
          <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2">
            Our Solution & Impact
          </h3>
          <p className="text-xs sm:text-sm text-[#A1A1B5] leading-relaxed">
            {project.solution}
          </p>
        </div>
      </div>

      {/* Tech Architecture Stack */}
      <div className="goblin-card p-6">
        <h3 className="text-sm font-bold text-[#F5F3FF] uppercase tracking-wider mb-3">
          Technologies & Libraries Used
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1.5 rounded-xl bg-[#11111B] border border-[#8B5CF6]/30 text-xs font-mono font-semibold text-[#A3E635]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Contributors Roster */}
      <div className="goblin-card p-6">
        <h3 className="text-sm font-bold text-[#F5F3FF] uppercase tracking-wider mb-4 flex items-center gap-2">
          <Users className="w-4 h-4 text-[#8B5CF6]" />
          <span>Project Contributors ({project.contributors.length})</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {project.contributors.map((c, i) => {
            const goblin = GOBLIN_CHARACTERS.find((g) => g.id === c.goblinId) || GOBLIN_CHARACTERS[0];
            return (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-2xl bg-[#11111B] border border-white/5"
              >
                <img
                  src={goblin.avatarImg}
                  alt={c.name}
                  className="w-10 h-10 rounded-xl object-cover ring-1 ring-white/10"
                />
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-[#F5F3FF] truncate">{c.name}</h4>
                  <p className="text-[11px] text-[#A3E635] truncate">{c.role}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* JOIN COLLABORATION MODAL */}
      {isCollabModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md p-6 rounded-3xl bg-[#11111B] border border-[#A3E635]/40 shadow-glow-green text-left">
            <button
              onClick={() => setIsCollabModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-[#A1A1B5] hover:text-[#F5F3FF]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-[#F5F3FF]">
              Request to Join: {project.title}
            </h3>
            <p className="text-xs text-[#A1A1B5] mt-1 mb-4">
              Send a collaboration pitch to the project lead with your role and availability.
            </p>

            {collabSent ? (
              <div className="p-6 text-center text-emerald-400 space-y-2">
                <CheckCircle2 className="w-10 h-10 mx-auto" />
                <p className="text-sm font-bold">Request Sent to Project Lead!</p>
                <p className="text-xs text-[#A1A1B5]">
                  They will review your profile and connect with you.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendCollab} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#F5F3FF] mb-1">
                    Your Proposed Role
                  </label>
                  <input
                    type="text"
                    required
                    value={collabRole}
                    onChange={(e) => setCollabRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#A3E635]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#F5F3FF] mb-1">
                    Why do you want to collaborate?
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={collabPitch}
                    onChange={(e) => setCollabPitch(e.target.value)}
                    placeholder="Briefly state your relevant skills and weekly availability..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#A3E635]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCollabModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-[#A1A1B5]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="goblin-btn-green py-2 px-5 text-xs font-bold flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5 text-[#09090F]" />
                    <span>Send Request</span>
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
