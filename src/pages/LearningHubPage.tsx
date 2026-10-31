import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Clock,
  Layers,
  ChevronRight,
  Bookmark,
  Check,
  Search,
  Terminal,
  FileCode,
  X,
  Copy,
  ArrowRight,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { LearningStep, LearningRoadmap } from '../types';
import { SEOHead } from '../components/SEOHead';

export const LearningHubPage: React.FC = () => {
  const { roadmaps, completedLessonIds, toggleCompleteLesson } = useApp();
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string>(roadmaps[0]?.id || 'vibe_coding');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  
  // Interactive Guide Reader Modal
  const [activeGuideStep, setActiveGuideStep] = useState<{ step: LearningStep; roadmapTitle: string; index: number } | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

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
      particleCount: 40,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#A3E635', '#8B5CF6']
    });
    setActiveGuideStep(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      <SEOHead
        title="Knowledge Hub — Vibe Coding & Hackathon Roadmaps"
        description="Structured developer learning tracks, vibe coding tutorials, Git workflows, and hackathon victory playbooks for ambitious engineering students."
        canonicalPath="/learn"
        pageId="learning_hub"
      />

      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-[#A3E635]/20 text-[#A3E635]">
            <GraduationCap className="w-5 h-5" />
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-[#F5F3FF]">
            Community Knowledge Hub & Roadmaps
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#A1A1B5] mt-1">
          Structured developer roadmaps, milestone checklists, and curated resources. Learn at your own pace and level up.
        </p>
      </div>

      {/* Search & Level Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#11111B] border border-white/5">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-[#8B5CF6] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides, topics (e.g. Vibe, Git)..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#171725] border border-white/5 text-xs text-[#F5F3FF] placeholder-[#A1A1B5] focus:outline-none focus:border-[#8B5CF6]"
          />
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto text-xs font-semibold">
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3 py-1.5 rounded-lg transition ${
                selectedLevel === lvl
                  ? 'bg-[#171725] text-[#A3E635] border border-[#A3E635]/30'
                  : 'text-[#A1A1B5] hover:text-[#F5F3FF]'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Roadmap Navigation Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRoadmaps.map((map) => {
          const isSelected = selectedRoadmap?.id === map.id;
          const completedCount = map.steps.filter((s) => completedLessonIds.includes(s.title)).length;
          const progressPercent = Math.round((completedCount / map.steps.length) * 100);

          return (
            <div
              key={map.id}
              onClick={() => setSelectedRoadmapId(map.id)}
              className={`goblin-card p-5 cursor-pointer transition flex flex-col justify-between ${
                isSelected
                  ? 'border-[#A3E635] shadow-glow-green ring-1 ring-[#A3E635]'
                  : 'hover:border-[#8B5CF6]/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#8B5CF6]/20 text-[#C084FC]">
                    {map.level}
                  </span>
                  <span className="text-[10px] font-mono text-[#A1A1B5] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#A3E635]" />
                    {map.estimatedHours}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#F5F3FF] mt-1">{map.title}</h3>
                <p className="text-xs text-[#A1A1B5] mt-1 line-clamp-2 leading-relaxed">
                  {map.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-[#A1A1B5]">Milestones</span>
                  <span className="text-[#A3E635] font-bold">
                    {completedCount} / {map.steps.length} ({progressPercent}%)
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#11111B] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#A3E635] transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Roadmap Detailed Curriculum */}
      {selectedRoadmap && (
        <div className="goblin-card p-6 sm:p-8 space-y-6 border-[#8B5CF6]/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/5">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#A3E635]/20 text-[#A3E635]">
                Specialization Track
              </span>
              <h2 className="text-2xl font-bold text-[#F5F3FF] mt-1">
                {selectedRoadmap.title}
              </h2>
              <p className="text-xs text-[#A1A1B5] mt-1 max-w-xl">{selectedRoadmap.description}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedRoadmap.tags.map((t, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#11111B] border border-white/5 text-[#A1A1B5]"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Ordered Milestone Steps */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[#A1A1B5] uppercase tracking-wider">
              Ordered Learning Milestones & Actions (Click to Read Complete Guide)
            </h3>

            <div className="space-y-3">
              {selectedRoadmap.steps.map((step, idx) => {
                const isStepDone = completedLessonIds.includes(step.title);

                return (
                  <div
                    key={idx}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isStepDone
                        ? 'bg-[#171725]/50 border-emerald-500/30 text-[#A1A1B5]'
                        : 'bg-[#171725] border-white/5 text-[#F5F3FF] hover:border-[#8B5CF6]/30'
                    }`}
                  >
                    <div
                      onClick={() => handleOpenGuide(step, idx)}
                      className="flex items-start gap-3 cursor-pointer flex-1"
                    >
                      <span className="w-6 h-6 rounded-lg bg-[#8B5CF6]/20 text-[#C084FC] font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-[#F5F3FF] hover:text-[#A3E635] transition flex items-center gap-2">
                          <span>{step.title}</span>
                          {isStepDone && <span className="text-emerald-400 text-xs">✔ Completed</span>}
                        </h4>
                        <p className="text-xs text-[#A1A1B5] mt-1 leading-relaxed max-w-2xl">
                          {step.description}
                        </p>

                        <div className="mt-2 flex items-center gap-2 text-xs text-[#A855F7] font-semibold">
                          <span>Read Field Manual & Code Spec</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleCompleteLesson(step.title, step.title)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition flex items-center gap-1.5 ${
                        isStepDone
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'goblin-btn-green'
                      }`}
                    >
                      {isStepDone ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Marked Complete</span>
                        </>
                      ) : (
                        <span>Mark as Completed (+50 XP)</span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Guide Reader Modal */}
      {activeGuideStep && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#11111B] border border-[#8B5CF6]/30 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#8B5CF6]/20 text-[#C084FC]">
                  {activeGuideStep.roadmapTitle} • Milestone #{activeGuideStep.index + 1}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#F5F3FF] mt-2">
                  {activeGuideStep.step.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveGuideStep(null)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#A1A1B5] hover:text-[#F5F3FF]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="space-y-4 text-xs sm:text-sm text-[#A1A1B5] leading-relaxed">
              <p>{activeGuideStep.step.description}</p>

              <div className="p-4 rounded-2xl bg-[#171725] border border-white/5 space-y-2">
                <h4 className="text-xs font-bold text-[#F5F3FF] uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#A3E635]" />
                  <span>Goblin Implementation Directives</span>
                </h4>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Define explicit inputs, data boundaries, and edge failure cases before coding.</li>
                  <li>Verify build with <code>npm run build</code> or <code>oxlint</code> after every atomic step.</li>
                  <li>Ensure zero-mock connections for all critical third-party integrations.</li>
                </ul>
              </div>

              {activeGuideStep.step.resourceTitle && (
                <div className="p-3 bg-white/5 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[#A1A1B5]">Reference Documentation: </span>
                    <strong className="text-[#F5F3FF]">{activeGuideStep.step.resourceTitle}</strong>
                  </div>
                  <a
                    href={activeGuideStep.step.resourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#A3E635] hover:underline flex items-center gap-1 font-bold"
                  >
                    <span>Open Docs</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4">
              <span className="text-xs text-[#A1A1B5]">
                Reward: <strong className="text-[#A3E635]">+50 XP</strong> for completing this milestone
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveGuideStep(null)}
                  className="px-4 py-2 rounded-xl border border-white/10 text-xs font-semibold text-[#A1A1B5] hover:text-[#F5F3FF]"
                >
                  Close
                </button>
                <button
                  onClick={handleCompleteFromModal}
                  className="goblin-btn-green py-2 px-5 text-xs font-bold flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4 text-[#09090F]" />
                  <span>Mark Milestone Complete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
