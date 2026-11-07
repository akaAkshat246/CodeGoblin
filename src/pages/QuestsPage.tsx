import React, { useState } from 'react';
import {
  Scroll,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Clock,
  Layers,
  ChevronRight,
  Code2,
  Cpu,
  Layout,
  Cloud,
  Binary,
  GitPullRequest,
  Palette,
  Trophy,
  X,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LEARNING_TRACKS } from '../data/mockData';
import { Quest, LearningRoadmap } from '../types';

export const QuestsPage: React.FC = () => {
  const { quests, completedQuestIds, completeQuest } = useApp();
  const [selectedTrackId, setSelectedTrackId] = useState<string>('all');
  const [activeSubmissionQuest, setActiveSubmissionQuest] = useState<Quest | null>(null);
  const [submissionAnswer, setSubmissionAnswer] = useState('');

  const getTrackIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return Sparkles;
      case 'Layout': return Layout;
      case 'Cpu': return Cpu;
      case 'Cloud': return Cloud;
      case 'Binary': return Binary;
      case 'GitPullRequest': return GitPullRequest;
      case 'Palette': return Palette;
      case 'Trophy': return Trophy;
      default: return Code2;
    }
  };

  const filteredQuests = selectedTrackId === 'all'
    ? quests
    : quests.filter((q) => q.trackId === selectedTrackId);

  const handleSubmitQuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSubmissionQuest) return;

    completeQuest(activeSubmissionQuest.id);
    setActiveSubmissionQuest(null);
    setSubmissionAnswer('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Scroll className="w-5 h-5 text-lime-400" />
            <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Quests & Challenges
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Turn syllabus theory into shipped code. Complete hands-on challenges to level up and earn XP.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
          <span className="text-xs text-zinc-400">Completed:</span>
          <span className="text-xs font-mono font-semibold text-lime-400">
            {completedQuestIds.length} / {quests.length}
          </span>
        </div>
      </div>

      {/* Track Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setSelectedTrackId('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            selectedTrackId === 'all'
              ? 'bg-white text-black font-semibold'
              : 'bg-white/[0.03] text-zinc-400 hover:text-white border border-white/[0.06]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>All Tracks</span>
        </button>

        {LEARNING_TRACKS.map((track: LearningRoadmap) => {
          const Icon = getTrackIcon(track.icon);
          const active = selectedTrackId === track.id;
          return (
            <button
              key={track.id}
              onClick={() => setSelectedTrackId(track.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                active
                  ? 'bg-white text-black font-semibold'
                  : 'bg-white/[0.03] text-zinc-400 hover:text-white border border-white/[0.06]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{track.title}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Track Overview Banner */}
      {selectedTrackId !== 'all' && (
        (() => {
          const track = LEARNING_TRACKS.find((t: LearningRoadmap) => t.id === selectedTrackId);
          if (!track) return null;
          return (
            <div className="p-4 rounded-xl bg-[#111118] border border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold text-lime-400 uppercase tracking-wider">
                    {track.level}
                  </span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-xs font-semibold text-white">{track.title}</span>
                </div>
                <p className="text-xs text-zinc-400 mt-1 max-w-2xl">{track.description}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {track.tags.map((tag: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-white/[0.03] border border-white/[0.06] text-zinc-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })()
      )}

      {/* Quest Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredQuests.map((quest) => {
          const isDone = completedQuestIds.includes(quest.id);

          return (
            <div
              key={quest.id}
              className={`p-5 rounded-xl border flex flex-col justify-between transition-colors ${
                isDone
                  ? 'bg-[#111118]/60 border-emerald-500/20'
                  : 'bg-[#111118] border-white/[0.06] hover:border-white/[0.12]'
              }`}
            >
              <div>
                {/* Header pills */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {quest.category}
                    </span>
                    <span className="text-[10px] text-zinc-400">
                      {quest.level}
                    </span>
                    {quest.isDailyQuest && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        Daily
                      </span>
                    )}
                  </div>

                  <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-lime-400/10 text-lime-400 border border-lime-400/20">
                    +{quest.xpReward} XP
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-white">{quest.title}</h3>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                  {quest.description}
                </p>

                {/* Objectives */}
                <div className="mt-4 space-y-1.5 text-xs text-zinc-400">
                  <p className="text-[10px] font-semibold text-zinc-300 uppercase tracking-wider">
                    Core Objectives
                  </p>
                  {quest.objectives.map((obj, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-lime-400 shrink-0 stroke-[2.5] mt-0.5" />
                      <span className="text-xs text-zinc-300">{obj}</span>
                    </div>
                  ))}
                </div>

                {/* References */}
                {quest.resources.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-zinc-500 text-[11px]">References:</span>
                    {quest.resources.map((res, i) => (
                      <a
                        key={i}
                        href={res.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-300 hover:text-white flex items-center gap-1 transition-colors text-[11px]"
                      >
                        <span>{res.title}</span>
                        <ExternalLink className="w-3 h-3 text-zinc-500" />
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3.5 border-t border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>~{quest.estimatedMinutes}m</span>
                </div>

                {isDone ? (
                  <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>XP Claimed</span>
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveSubmissionQuest(quest)}
                    className="px-3 py-1.5 rounded-lg bg-white text-black hover:bg-zinc-200 text-xs font-medium transition-colors flex items-center gap-1.5"
                  >
                    <span>Submit</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* SUBMISSION MODAL */}
      {activeSubmissionQuest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg p-6 rounded-2xl bg-[#111118] border border-white/10 shadow-2xl text-left">
            <button
              onClick={() => setActiveSubmissionQuest(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-lime-400/10 text-lime-400 border border-lime-400/20">
              +{activeSubmissionQuest.xpReward} XP Reward
            </span>

            <h3 className="text-base font-semibold text-white mt-2">
              Submit Solution: {activeSubmissionQuest.title}
            </h3>

            <div className="my-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-zinc-400">
              <span className="font-medium text-white block mb-1">Challenge Prompt</span>
              <p>{activeSubmissionQuest.assignmentPrompt}</p>
            </div>

            <form onSubmit={handleSubmitQuest} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Your Answer or Solution
                </label>
                <textarea
                  rows={4}
                  required
                  value={submissionAnswer}
                  onChange={(e) => setSubmissionAnswer(e.target.value)}
                  placeholder="Paste your code snippet, PR link, or summary..."
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveSubmissionQuest(null)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-lime-400 hover:bg-lime-300 text-black text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Verify & Claim +{activeSubmissionQuest.xpReward} XP</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
