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
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LEARNING_ROADMAPS } from '../data/mockData';

export const LearningHubPage: React.FC = () => {
  const { roadmaps, completedLessonIds, toggleCompleteLesson } = useApp();
  const [selectedRoadmapId, setSelectedRoadmapId] = useState<string>(roadmaps[0]?.id || 'vibe_coding');

  const selectedRoadmap = roadmaps.find((r) => r.id === selectedRoadmapId) || roadmaps[0];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-[#A3E635]/20 text-[#A3E635]">
            <GraduationCap className="w-5 h-5" />
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-[#F5F3FF]">
            Community Learning Hub
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#A1A1B5] mt-1">
          Structured developer roadmaps, milestone checklists, and curated resources. Learn at your own pace and level up.
        </p>
      </div>

      {/* Roadmap Navigation Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {roadmaps.map((map) => {
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
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Ordered Milestone Steps */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[#A1A1B5] uppercase tracking-wider">
              Ordered Learning Milestones & Actions
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
                        : 'bg-[#171725] border-white/5 text-[#F5F3FF]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-[#8B5CF6]/20 text-[#C084FC] font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-[#F5F3FF] flex items-center gap-2">
                          <span>{step.title}</span>
                          {isStepDone && <span className="text-emerald-400 text-xs">✔ Completed</span>}
                        </h4>
                        <p className="text-xs text-[#A1A1B5] mt-1 leading-relaxed max-w-2xl">
                          {step.description}
                        </p>

                        {step.resourceTitle && (
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-[10px] text-[#A1A1B5]">Recommended:</span>
                            <a
                              href={step.resourceUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-[#A855F7] hover:text-[#A3E635] flex items-center gap-1 font-semibold"
                            >
                              <span>{step.resourceTitle}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}
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
    </div>
  );
};
