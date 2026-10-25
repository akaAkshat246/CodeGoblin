import React, { useState } from 'react';
import {
  Users2,
  Plus,
  CheckCircle2,
  Clock,
  ArrowRight,
  Shield,
  Sparkles,
  Trophy,
  CheckSquare,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GOBLIN_CHARACTERS } from '../data/mockData';

export const SquadsPage: React.FC = () => {
  const {
    squads,
    createSquad,
    joinSquad,
    updateSquadTaskStatus,
    addSquadTask,
    currentUser
  } = useApp();

  const [selectedSquadId, setSelectedSquadId] = useState<string>(squads[0]?.id || '');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Form states for new squad
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [targetEventOrProject, setTargetEventOrProject] = useState('GoblinHacks 2026');
  const [neededRolesInput, setNeededRolesInput] = useState('UI/UX Designer, Python Backend');
  const [maxMembers, setMaxMembers] = useState(4);
  const [tagsInput, setTagsInput] = useState('GoblinHacks, AI, React');

  const selectedSquad = squads.find((s) => s.id === selectedSquadId) || squads[0];

  const handleCreateSquad = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const neededRoles = neededRolesInput
      .split(',')
      .map((r) => r.trim())
      .filter(Boolean);

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    createSquad({
      name: name.trim(),
      description: description.trim(),
      leaderId: currentUser.id,
      leaderName: currentUser.displayName,
      leaderGoblinId: currentUser.avatarGoblinId,
      targetEventOrProject: targetEventOrProject.trim(),
      neededRoles: neededRoles.length > 0 ? neededRoles : ['Developer Wanted'],
      members: [
        {
          userId: currentUser.id,
          name: currentUser.displayName,
          role: 'Squad Leader',
          goblinId: currentUser.avatarGoblinId
        }
      ],
      maxMembers,
      tags: tags.length > 0 ? tags : ['General'],
      tasks: [
        {
          id: `task_${Date.now()}_1`,
          title: 'Finalize core hackathon problem statement',
          status: 'done',
          assigneeName: currentUser.displayName
        },
        {
          id: `task_${Date.now()}_2`,
          title: 'Draft architecture & component breakdown',
          status: 'in_progress',
          assigneeName: currentUser.displayName
        }
      ],
      isOpen: true
    });

    setIsCreateModalOpen(false);
    setName('');
    setDescription('');
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !selectedSquad) return;
    addSquadTask(selectedSquad.id, newTaskTitle.trim(), currentUser?.displayName || 'Cadet');
    setNewTaskTitle('');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#8B5CF6]/20 text-[#A855F7]">
              <Users2 className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-[#F5F3FF]">
              Squads & Team Finder
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#A1A1B5] mt-1">
            Never hack alone. Find teammates, join open squads, and track progress on interactive task boards.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="goblin-btn-primary py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Form New Squad</span>
        </button>
      </div>

      {/* Squads Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {squads.map((squad) => {
          const isSelected = selectedSquad?.id === squad.id;
          const isMember = currentUser ? squad.members.some((m) => m.userId === currentUser.id) : false;
          const leaderGoblin = GOBLIN_CHARACTERS.find((g) => g.id === squad.leaderGoblinId) || GOBLIN_CHARACTERS[0];

          return (
            <div
              key={squad.id}
              onClick={() => setSelectedSquadId(squad.id)}
              className={`goblin-card p-5 cursor-pointer transition flex flex-col justify-between ${
                isSelected
                  ? 'border-[#A3E635] shadow-glow-green ring-1 ring-[#A3E635]'
                  : 'hover:border-[#8B5CF6]/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={leaderGoblin.avatarImg}
                      alt={squad.leaderName}
                      className="w-8 h-8 rounded-lg object-cover ring-1 ring-white/10"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-[#F5F3FF]">{squad.name}</h3>
                      <p className="text-[10px] text-[#A1A1B5]">
                        Led by <span className="text-[#A3E635]">{squad.leaderName}</span>
                      </p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#8B5CF6]/20 text-[#C084FC]">
                    {squad.members.length} / {squad.maxMembers} Members
                  </span>
                </div>

                <p className="text-xs text-[#A1A1B5] mt-2 line-clamp-2 leading-relaxed">
                  {squad.description}
                </p>

                <div className="mt-3 flex items-center gap-2 text-xs">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[11px] text-[#F5F3FF] font-semibold">
                    Target: {squad.targetEventOrProject}
                  </span>
                </div>

                {/* Needed Roles */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {squad.neededRoles.map((role, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-500/15 border border-rose-500/25 text-rose-300"
                    >
                      Seeking: {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-[#A1A1B5]">
                  {squad.tasks.length} tasks on board
                </span>

                {isMember ? (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Member of Squad</span>
                  </span>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      joinSquad(squad.id);
                    }}
                    className="goblin-btn-green py-1.5 px-3 text-xs font-bold"
                  >
                    Join Squad
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* SELECTED SQUAD WORKSPACE & KANBAN TASK BOARD */}
      {selectedSquad && (
        <div className="p-6 rounded-3xl bg-[#11111B] border border-[#8B5CF6]/30 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#A3E635]/20 text-[#A3E635]">
                  Active Workspace
                </span>
                <h2 className="text-xl font-bold text-[#F5F3FF]">{selectedSquad.name}</h2>
              </div>
              <p className="text-xs text-[#A1A1B5] mt-1">{selectedSquad.description}</p>
            </div>

            {/* Quick Add Task */}
            <form onSubmit={handleAddTask} className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Add task to squad board..."
                className="px-3.5 py-2 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#8B5CF6] w-full sm:w-60"
              />
              <button
                type="submit"
                className="goblin-btn-primary py-2 px-3 text-xs font-bold shrink-0"
              >
                + Add
              </button>
            </form>
          </div>

          {/* Members Roster */}
          <div>
            <h4 className="text-xs font-bold text-[#A1A1B5] uppercase tracking-wider mb-2">
              Squad Roster ({selectedSquad.members.length} / {selectedSquad.maxMembers})
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {selectedSquad.members.map((member, i) => {
                const goblin = GOBLIN_CHARACTERS.find((g) => g.id === member.goblinId) || GOBLIN_CHARACTERS[0];
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#171725] border border-white/5 text-xs"
                  >
                    <img
                      src={goblin.avatarImg}
                      alt={member.name}
                      className="w-6 h-6 rounded-md object-cover"
                    />
                    <span className="font-bold text-[#F5F3FF]">{member.name}</span>
                    <span className="text-[10px] text-[#A3E635]">({member.role})</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3-Column Kanban Board */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* 1. To Do */}
            <div className="p-4 rounded-2xl bg-[#171725]/60 border border-white/5 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300 pb-2 border-b border-white/5">
                <span>To Do</span>
                <span className="px-2 py-0.5 rounded bg-white/5 text-[10px]">
                  {selectedSquad.tasks.filter((t) => t.status === 'todo').length}
                </span>
              </div>
              <div className="space-y-2">
                {selectedSquad.tasks
                  .filter((t) => t.status === 'todo')
                  .map((task) => (
                    <div
                      key={task.id}
                      className="p-3 rounded-xl bg-[#11111B] border border-white/5 hover:border-[#8B5CF6]/40 transition text-xs space-y-1.5"
                    >
                      <p className="font-semibold text-[#F5F3FF]">{task.title}</p>
                      <div className="flex items-center justify-between text-[10px] text-[#A1A1B5]">
                        <span>Assigned: {task.assigneeName}</span>
                        <button
                          onClick={() => updateSquadTaskStatus(selectedSquad.id, task.id, 'in_progress')}
                          className="text-[#A855F7] hover:underline font-bold"
                        >
                          Start →
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* 2. In Progress */}
            <div className="p-4 rounded-2xl bg-[#171725]/60 border border-white/5 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-amber-400 pb-2 border-b border-white/5">
                <span>In Progress</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/15 text-[10px]">
                  {selectedSquad.tasks.filter((t) => t.status === 'in_progress').length}
                </span>
              </div>
              <div className="space-y-2">
                {selectedSquad.tasks
                  .filter((t) => t.status === 'in_progress')
                  .map((task) => (
                    <div
                      key={task.id}
                      className="p-3 rounded-xl bg-[#11111B] border border-amber-500/20 hover:border-amber-400 transition text-xs space-y-1.5"
                    >
                      <p className="font-semibold text-[#F5F3FF]">{task.title}</p>
                      <div className="flex items-center justify-between text-[10px] text-[#A1A1B5]">
                        <span>Assigned: {task.assigneeName}</span>
                        <button
                          onClick={() => updateSquadTaskStatus(selectedSquad.id, task.id, 'done')}
                          className="text-[#A3E635] hover:underline font-bold"
                        >
                          Complete ✔
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* 3. Done */}
            <div className="p-4 rounded-2xl bg-[#171725]/60 border border-white/5 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-400 pb-2 border-b border-white/5">
                <span>Done</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-[10px]">
                  {selectedSquad.tasks.filter((t) => t.status === 'done').length}
                </span>
              </div>
              <div className="space-y-2">
                {selectedSquad.tasks
                  .filter((t) => t.status === 'done')
                  .map((task) => (
                    <div
                      key={task.id}
                      className="p-3 rounded-xl bg-[#11111B] border border-emerald-500/20 text-xs space-y-1.5 opacity-80"
                    >
                      <p className="font-semibold text-[#F5F3FF] line-through">{task.title}</p>
                      <div className="flex items-center justify-between text-[10px] text-emerald-400">
                        <span>Done by {task.assigneeName}</span>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE SQUAD MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#11111B] border border-[#8B5CF6]/30 shadow-2xl text-left">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-[#A1A1B5] hover:text-[#F5F3FF]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-display font-black text-[#F5F3FF] mb-1">
              Assemble a New Clan Squad
            </h3>
            <p className="text-xs text-[#A1A1B5] mb-5">
              Specify the target hackathon or project, required roles, and recruit teammates (+100 XP).
            </p>

            <form onSubmit={handleCreateSquad} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#F5F3FF] mb-1">
                  Squad Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Algorithmic Aces"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F5F3FF] mb-1">
                  Target Hackathon / Project
                </label>
                <input
                  type="text"
                  required
                  value={targetEventOrProject}
                  onChange={(e) => setTargetEventOrProject(e.target.value)}
                  placeholder="e.g. GoblinHacks 2026"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F5F3FF] mb-1">
                  Roles You Need (comma separated)
                </label>
                <input
                  type="text"
                  required
                  value={neededRolesInput}
                  onChange={(e) => setNeededRolesInput(e.target.value)}
                  placeholder="UI/UX Designer, FastAPI Backend, Pitch Presenter"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F5F3FF] mb-1">
                  Squad Mission / Pitch
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What is your squad building and what vibe are you looking for?"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#A1A1B5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="goblin-btn-primary px-6 py-2.5 text-xs font-bold flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Create Squad (+100 XP)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
