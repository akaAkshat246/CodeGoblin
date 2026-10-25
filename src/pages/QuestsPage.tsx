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
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LEARNING_TRACKS } from '../data/mockData';
import { Quest, LearningRoadmap } from '../types';

export const QuestsPage: React.FC = () => {
  const { quests, completedQuestIds, completeQuest, currentUser } = useApp();
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
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#A3E635]/20 text-[#A3E635]">
              <Scroll className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-[#F5F3FF]">
              Quests & Learning Tracks
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#A1A1B5] mt-1">
            Turn theoretical college syllabus into practical code. Solve quests, master vibe coding, and earn XP.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#171725] px-4 py-2 rounded-2xl border border-white/5 self-start sm:self-auto">
          <span className="text-xs text-[#A1A1B5]">Completed:</span>
          <span className="text-sm font-mono font-bold text-[#A3E635]">
            {completedQuestIds.length} / {quests.length} Quests
          </span>
        </div>
      </div>

      {/* 8 Track Selector Cards */}
      <div className="space-y-3">
        <p className="text-xs font-bold text-[#A1A1B5] uppercase tracking-wider">
          Learning Tracks (8 Specializations)
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          <button
            onClick={() => setSelectedTrackId('all')}
            className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1.5 ${
              selectedTrackId === 'all'
                ? 'bg-[#8B5CF6] text-white border-[#8B5CF6] shadow-glow-purple font-bold'
                : 'bg-[#171725] text-[#A1A1B5] border-white/5 hover:border-[#8B5CF6]/40 hover:text-[#F5F3FF]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span className="text-[11px]">All Tracks</span>
          </button>

          {LEARNING_TRACKS.map((track: LearningRoadmap) => {
            const Icon = getTrackIcon(track.icon);
            const active = selectedTrackId === track.id;
            return (
              <button
                key={track.id}
                onClick={() => setSelectedTrackId(track.id)}
                className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1.5 ${
                  active
                    ? 'bg-[#8B5CF6] text-white border-[#8B5CF6] shadow-glow-purple font-bold'
                    : 'bg-[#171725] text-[#A1A1B5] border-white/5 hover:border-[#8B5CF6]/40 hover:text-[#F5F3FF]'
                }`}
              >
                <Icon className="w-4 h-4 text-[#A3E635]" />
                <span className="text-[10px] leading-tight line-clamp-2">{track.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Track Overview Banner */}
      {selectedTrackId !== 'all' && (
        (() => {
          const track = LEARNING_TRACKS.find((t: LearningRoadmap) => t.id === selectedTrackId);
          if (!track) return null;
          return (
            <div className="p-5 rounded-3xl bg-[#11111B] border border-[#8B5CF6]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-[#A3E635] uppercase tracking-wider">
                  Track Overview • {track.level}
                </span>
                <h3 className="text-lg font-bold text-[#F5F3FF] mt-0.5">{track.title}</h3>
                <p className="text-xs text-[#A1A1B5] mt-1 max-w-2xl">{track.description}</p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {track.tags.map((tag: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-[#171725] border border-white/5 text-[#A1A1B5]">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredQuests.map((quest) => {
          const isDone = completedQuestIds.includes(quest.id);

          return (
            <div
              key={quest.id}
              className={`goblin-card p-5 sm:p-6 flex flex-col justify-between transition-all ${
                isDone ? 'border-emerald-500/30 bg-[#171725]/60' : 'hover:border-[#A3E635]/40'
              }`}
            >
              <div>
                {/* Header pills */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#8B5CF6]/20 text-[#C084FC]">
                      {quest.category}
                    </span>
                    <span className="text-[10px] font-semibold text-[#A1A1B5]">
                      {quest.level}
                    </span>
                    {quest.isDailyQuest && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400">
                        Daily
                      </span>
                    )}
                  </div>

                  <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-[#A3E635]/15 text-[#A3E635]">
                    +{quest.xpReward} XP
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#F5F3FF]">{quest.title}</h3>
                <p className="text-xs text-[#A1A1B5] mt-1.5 leading-relaxed">
                  {quest.description}
                </p>

                {/* Objectives */}
                <div className="mt-4 space-y-1.5 text-xs text-[#A1A1B5]">
                  <p className="text-[11px] font-bold text-[#F5F3FF] uppercase tracking-wider">
                    Core Objectives:
                  </p>
                  {quest.objectives.map((obj, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-[#A3E635] mt-0.5">✔</span>
                      <span className="text-[11px]">{obj}</span>
                    </div>
                  ))}
                </div>

                {/* Resources */}
                {quest.resources.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap gap-2 text-[11px]">
                    <span className="text-[#A1A1B5]">Curated References:</span>
                    {quest.resources.map((res, i) => (
                      <a
                        key={i}
                        href={res.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#A855F7] hover:text-[#A3E635] flex items-center gap-1 transition font-medium"
                      >
                        <span>{res.title}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-[#A1A1B5]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>~{quest.estimatedMinutes} mins</span>
                </div>

                {isDone ? (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>XP Claimed</span>
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveSubmissionQuest(quest)}
                    className="goblin-btn-green py-2 px-4 text-xs font-bold flex items-center gap-1.5"
                  >
                    <span>Submit Assignment</span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg p-6 rounded-3xl bg-[#11111B] border border-[#A3E635]/40 shadow-glow-green text-left">
            <button
              onClick={() => setActiveSubmissionQuest(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-[#A1A1B5] hover:text-[#F5F3FF]"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#A3E635]/15 text-[#A3E635]">
              +{activeSubmissionQuest.xpReward} XP Reward
            </span>

            <h3 className="text-lg font-bold text-[#F5F3FF] mt-2">
              Submit Solution: {activeSubmissionQuest.title}
            </h3>

            <div className="my-3 p-3 rounded-xl bg-[#171725] border border-white/5 text-xs text-[#A1A1B5]">
              <span className="font-bold text-[#F5F3FF] block mb-1">Assignment Challenge:</span>
              <p>{activeSubmissionQuest.assignmentPrompt}</p>
            </div>

            <form onSubmit={handleSubmitQuest} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#F5F3FF] mb-1">
                  Your Answer / Code Snippet / Prompt Solution
                </label>
                <textarea
                  rows={4}
                  required
                  value={submissionAnswer}
                  onChange={(e) => setSubmissionAnswer(e.target.value)}
                  placeholder="Paste your solution or summary here..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#09090F] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#A3E635]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveSubmissionQuest(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#A1A1B5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="goblin-btn-green py-2 px-5 text-xs font-bold flex items-center gap-1.5"
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
