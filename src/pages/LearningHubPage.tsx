import React, { useState } from 'react';
import {
  Clock,
  Check,
  Search,
  Terminal,
  X,
  ArrowRight,
  ExternalLink,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { LearningStep } from '../types';
import { SEOHead } from '../components/SEOHead';
import { isAdminEmail } from '../utils/adminAuth';

export const LearningHubPage: React.FC = () => {
  const { roadmaps, completedLessonIds, toggleCompleteLesson, currentUser, navigateTo } = useApp();
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string>(roadmaps[0]?.id || 'vibe_coding');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');

  // Interactive Guide Reader Modal
  const [activeGuideStep, setActiveGuideStep] = useState<{ step: LearningStep; roadmapTitle: string; index: number } | null>(null);

  const levels = ['All', 'Beginner', 'Intermediate', 'All Levels'];

  const filteredRoadmaps = roadmaps.filter((map) => {
    const matchesLevel = selectedLevel === 'All' || map.level === selectedLevel;
    const matchesSearch =
      map.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      map.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      map.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLevel && matchesSearch;
  });

  const selectedRoadmap = roadmaps.find((r) => r.id === selectedRoadmapId) || filteredRoadmaps[0] || roadmaps[0];

  const handleOpenGuide = (step: LearningStep, index: number) => {
    setActiveGuideStep({ step, roadmapTitle: selectedRoadmap.title, index });
  };

  const handleCompleteFromModal = () => {
    if (!activeGuideStep) return;
    toggleCompleteLesson(activeGuideStep.step.title, activeGuideStep.step.title);
    confetti({
      particleCount: 35,
      spread: 55,
      origin: { y: 0.8 },
      colors: ['#A3E635', '#8B5CF6']
    });
    setActiveGuideStep(null);
  };

  const isUserAdmin = currentUser?.role === 'Administrator' || isAdminEmail(currentUser?.email);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 animate-in fade-in duration-200">
      <SEOHead
        title="Learning Hub — Official Study Tracks"
        description="Official developer learning tracks and study materials curated and provided by CodeGoblins Admins."
        canonicalPath="/learn"
        pageId="learning_hub"
      />

      {/* Admin Provided Learning Materials Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-[#111118] to-lime-950/20 border border-lime-400/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-lime-400/10 border border-lime-400/30 flex items-center justify-center shrink-0 text-lime-400">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-lime-400 uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Official Admin Curriculum
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] text-zinc-400 font-mono">
                Study Portal
              </span>
            </div>
            <p className="text-xs text-zinc-300 mt-0.5">
              Curated and maintained directly by CodeGoblins administrators. Work through each syllabus chapter, complete self-study directives, and earn XP.
            </p>
          </div>
        </div>

        {isUserAdmin && (
          <button
            onClick={() => navigateTo('admin')}
            className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-lime-400 hover:bg-lime-300 text-black text-xs font-bold transition flex items-center gap-1.5 shrink-0 shadow-lg shadow-lime-400/10"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Admin: Manage Curriculum</span>
          </button>
        )}
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-lime-400" />
            <span>Curriculum &amp; Study Tracks</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            Admin-provided syllabus modules, step-by-step reading materials, and actionable study guides.
          </p>
        </div>

        {/* Level Filters */}
        <div className="flex items-center gap-1.5 text-xs font-medium self-start sm:self-auto">
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3 py-1.5 rounded-lg transition ${
                selectedLevel === lvl
                  ? 'bg-white/[0.08] text-white font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-2.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search roadmaps, topics (e.g. Next.js, Git, Vibe)..."
          className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#111118] border border-white/[0.06] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/20 transition"
        />
      </div>

      {/* Roadmap Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredRoadmaps.map((map) => {
          const isSelected = selectedRoadmap?.id === map.id;
          const completedCount = map.steps.filter((s) => completedLessonIds.includes(s.title)).length;
          const progressPercent = Math.round((completedCount / map.steps.length) * 100);

          return (
            <div
              key={map.id}
              onClick={() => setSelectedRoadmapId(map.id)}
              className={`p-4 rounded-xl border cursor-pointer transition flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-[#171725] border-white/20 ring-1 ring-white/10'
                  : 'bg-[#111118] border-white/[0.06] hover:border-white/[0.14]'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.06] text-zinc-300">
                    {map.level}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-zinc-500" />
                    {map.estimatedHours}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-white">{map.title}</h3>
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {map.description}
                </p>
              </div>

              <div className="pt-2 border-t border-white/[0.04] space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                  <span>Milestones</span>
                  <span className={completedCount === map.steps.length ? 'text-[#A3E635]' : 'text-zinc-300'}>
                    {completedCount} / {map.steps.length}
                  </span>
                </div>
                <div className="w-full h-1 rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className="h-full bg-[#A3E635] transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Roadmap Detailed Steps */}
      {selectedRoadmap && (
        <div className="p-5 sm:p-6 rounded-2xl bg-[#111118] border border-white/[0.06] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#8B5CF6]/20 text-[#C084FC]">
                  Active Track
                </span>
                <span className="text-xs text-zinc-400 font-mono">{selectedRoadmap.estimatedHours}</span>
                <span className="text-xs text-lime-400 font-mono font-medium">
                  • Curated by {selectedRoadmap.publishedBy || 'Admin Akshat Vats'}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                {selectedRoadmap.title}
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5 max-w-2xl leading-relaxed">
                {selectedRoadmap.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {selectedRoadmap.tags.map((t, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.04] border border-white/[0.06] text-zinc-400"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Ordered Milestone Steps */}
          <div className="space-y-2.5">
            {selectedRoadmap.steps.map((step, idx) => {
              const isStepDone = completedLessonIds.includes(step.title);

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isStepDone
                      ? 'bg-white/[0.01] border-white/[0.04] text-zinc-500'
                      : 'bg-[#171725] border-white/[0.06] hover:border-white/[0.12] text-zinc-200'
                  }`}
                >
                  <div
                    onClick={() => handleOpenGuide(step, idx)}
                    className="flex items-start gap-3 cursor-pointer flex-1"
                  >
                    <span className="w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.06] text-zinc-400 font-mono text-xs font-medium flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className={`text-xs sm:text-sm font-semibold flex items-center gap-2 ${
                        isStepDone ? 'line-through text-zinc-500' : 'text-white hover:text-[#A3E635]'
                      } transition`}>
                        <span>{step.title}</span>
                        {isStepDone && <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />}
                      </h4>
                      <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1 leading-relaxed">
                        {step.description}
                      </p>
                      <span className="text-[11px] text-zinc-500 flex items-center gap-1 mt-1 font-medium hover:text-zinc-300">
                        <span>Read manual</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleCompleteLesson(step.title, step.title)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition flex items-center gap-1.5 ${
                      isStepDone
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-white/[0.08] hover:bg-[#A3E635] hover:text-[#09090F] text-white'
                    }`}
                  >
                    {isStepDone ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Completed</span>
                      </>
                    ) : (
                      <span>Mark Complete (+50 XP)</span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Guide Reader Modal */}
      {activeGuideStep && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#111118] border border-white/10 rounded-2xl max-w-xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.06] text-zinc-400">
                  {activeGuideStep.roadmapTitle} • Step {activeGuideStep.index + 1}
                </span>
                <h2 className="text-lg font-bold text-white mt-1.5">
                  {activeGuideStep.step.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveGuideStep(null)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="space-y-3.5 text-xs text-zinc-300 leading-relaxed">
              <p className="text-zinc-200 text-xs sm:text-sm leading-relaxed">{activeGuideStep.step.description}</p>

              {activeGuideStep.step.readingMaterial && (
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-1.5">
                  <h4 className="text-[11px] font-semibold text-lime-400 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Admin Study Notes &amp; Syllabus Text</span>
                  </h4>
                  <div className="text-zinc-300 text-xs whitespace-pre-wrap leading-relaxed font-sans">
                    {activeGuideStep.step.readingMaterial}
                  </div>
                </div>
              )}

              <div className="p-3.5 rounded-xl bg-[#171725] border border-white/[0.06] space-y-2">
                <h4 className="text-[11px] font-semibold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#A3E635]" />
                  <span>Admin Directives &amp; Action Items</span>
                </h4>
                <ul className="list-disc list-inside space-y-1 text-zinc-400 text-xs">
                  {activeGuideStep.step.studyDirectives && activeGuideStep.step.studyDirectives.length > 0 ? (
                    activeGuideStep.step.studyDirectives.map((dir, i) => (
                      <li key={i}>{dir}</li>
                    ))
                  ) : (
                    <>
                      <li>Review the official documentation and study concepts deeply before writing code.</li>
                      <li>Run local experiments, test edge cases, and ensure clean architecture.</li>
                      <li>Validate understanding with practice problems and peer reviews in the Clan.</li>
                    </>
                  )}
                </ul>
              </div>

              {activeGuideStep.step.resourceTitle && (
                <div className="p-3 bg-white/[0.03] border border-white/[0.06] rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="text-zinc-500">Official Reading Reference: </span>
                    <strong className="text-zinc-200">{activeGuideStep.step.resourceTitle}</strong>
                  </div>
                  <a
                    href={activeGuideStep.step.resourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#A3E635] hover:underline flex items-center gap-1 font-medium"
                  >
                    <span>Read Docs</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-4">
              <span className="text-xs text-zinc-400">
                Study Completion Reward: <strong className="text-[#A3E635]">+50 XP</strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveGuideStep(null)}
                  className="px-3.5 py-1.5 rounded-lg border border-white/[0.08] text-xs font-medium text-zinc-300 hover:text-white"
                >
                  Close
                </button>
                <button
                  onClick={handleCompleteFromModal}
                  className="px-4 py-1.5 rounded-lg bg-[#A3E635] hover:bg-[#bef264] text-[#09090F] text-xs font-bold flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Mark Chapter as Studied</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
