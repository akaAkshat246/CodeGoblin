import React, { useState } from 'react';
import {
  Users2,
  Plus,
  CheckCircle2,
  Trophy,
  Send,
  X,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GOBLIN_CHARACTERS } from '../data/mockData';
import { SEOHead } from '../components/SEOHead';

export const SquadsPage: React.FC = () => {
  const {
    squads,
    createSquad,
    joinSquad,
    updateSquadTaskStatus,
    addSquadTask,
    sendSquadMessage,
    recruitmentListings,
    applyToRecruitment,
    currentUser
  } = useApp();

  const [activeTab, setActiveTab] = useState<'squads' | 'recruitment'>('squads');
  const [selectedSquadId, setSelectedSquadId] = useState<string>(squads[0]?.id || '');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [newTaskDeadline, setNewTaskDeadline] = useState('Nov 05');
  const [chatInput, setChatInput] = useState('');

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
          priority: 'High',
          deadline: 'Oct 28',
          assigneeName: currentUser.displayName
        },
        {
          id: `task_${Date.now()}_2`,
          title: 'Draft architecture & component breakdown',
          status: 'in_progress',
          priority: 'High',
          deadline: 'Oct 30',
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
    addSquadTask(selectedSquad.id, newTaskTitle.trim(), newTaskPriority, newTaskDeadline, currentUser?.displayName || 'Cadet');
    setNewTaskTitle('');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !selectedSquad) return;
    sendSquadMessage(selectedSquad.id, chatInput.trim());
    setChatInput('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 animate-in fade-in duration-200">
      <SEOHead
        title="Teams & Collaboration"
        description="Form squads, recruit hackathon teammates, and collaborate in shared team workspaces."
        canonicalPath="/squads"
        pageId="squads_hub"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Teams & Collaboration
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            Form squads, recruit teammates, and manage project tasks.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-[#A3E635] hover:bg-[#bef264] text-[#09090F] text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Form Team</span>
          </button>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2 text-xs font-medium">
        <button
          onClick={() => setActiveTab('squads')}
          className={`px-3 py-1.5 rounded-lg transition ${
            activeTab === 'squads'
              ? 'bg-white/[0.08] text-white font-semibold'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Active Squads ({squads.length})
        </button>
        <button
          onClick={() => setActiveTab('recruitment')}
          className={`px-3 py-1.5 rounded-lg transition ${
            activeTab === 'recruitment'
              ? 'bg-white/[0.08] text-white font-semibold'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Recruitment Calls ({recruitmentListings.length})
        </button>
      </div>

      {/* TAB 1: SQUADS */}
      {activeTab === 'squads' && (
        <div className="space-y-6">
          {/* Squad Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {squads.map((squad) => {
              const isSelected = selectedSquad?.id === squad.id;
              const isMember = currentUser ? squad.members.some((m) => m.userId === currentUser.id) : false;
              const leaderGoblin = GOBLIN_CHARACTERS.find((g) => g.id === squad.leaderGoblinId) || GOBLIN_CHARACTERS[0];

              return (
                <div
                  key={squad.id}
                  onClick={() => setSelectedSquadId(squad.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-[#171725] border-white/20 ring-1 ring-white/10'
                      : 'bg-[#111118] border-white/[0.06] hover:border-white/[0.12]'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={leaderGoblin.avatarImg}
                          alt={squad.leaderName}
                          className="w-7 h-7 rounded-full object-cover ring-1 ring-white/10"
                        />
                        <div>
                          <h3 className="text-sm font-semibold text-white">{squad.name}</h3>
                          <p className="text-[10px] text-zinc-400">Led by {squad.leaderName}</p>
                        </div>
                      </div>

                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.06] text-zinc-300">
                        {squad.members.length} / {squad.maxMembers}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {squad.description}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-amber-400/90 font-mono">
                      <Trophy className="w-3.5 h-3.5 text-amber-400" />
                      <span>{squad.targetEventOrProject}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {squad.neededRoles.map((role, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[10px] bg-rose-500/10 text-rose-300 font-medium"
                        >
                          Need: {role}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-xs">
                    <span className="text-[11px] font-mono text-zinc-500">
                      {squad.tasks.length} tasks
                    </span>

                    {isMember ? (
                      <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Member</span>
                      </span>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          joinSquad(squad.id);
                        }}
                        className="px-3 py-1 rounded-lg bg-white/[0.08] hover:bg-[#A3E635] hover:text-[#09090F] text-xs font-medium text-white transition"
                      >
                        Join
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ACTIVE WORKSPACE & KANBAN */}
          {selectedSquad && (
            <div className="p-5 rounded-2xl bg-[#111118] border border-white/[0.06] space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.06] text-zinc-400">
                      Active Workspace
                    </span>
                    <h2 className="text-base font-bold text-white">{selectedSquad.name}</h2>
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5">{selectedSquad.description}</p>
                </div>

                {/* Add Task Form */}
                <form onSubmit={handleAddTask} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="New squad task..."
                    className="px-3 py-1.5 rounded-lg bg-[#171725] border border-white/[0.08] text-xs text-white focus:outline-none w-44"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] text-xs font-medium text-white transition"
                  >
                    + Task
                  </button>
                </form>
              </div>

              {/* Members Roster */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-zinc-400 mr-1">Roster:</span>
                {selectedSquad.members.map((member, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-zinc-300 font-medium"
                  >
                    {member.name} <span className="text-zinc-500">({member.role})</span>
                  </span>
                ))}
              </div>

              {/* 3-Column Minimal Kanban Board */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* To Do */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-2">
                  <div className="flex items-center justify-between text-xs font-medium text-zinc-400 pb-1">
                    <span>To Do</span>
                    <span className="text-[10px] font-mono">{selectedSquad.tasks.filter((t) => t.status === 'todo').length}</span>
                  </div>
                  <div className="space-y-1.5">
                    {selectedSquad.tasks
                      .filter((t) => t.status === 'todo')
                      .map((task) => (
                        <div key={task.id} className="p-2.5 rounded-lg bg-[#171725] border border-white/[0.06] text-xs space-y-1">
                          <p className="font-medium text-white">{task.title}</p>
                          <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1">
                            <span>{task.assigneeName}</span>
                            <button
                              onClick={() => updateSquadTaskStatus(selectedSquad.id, task.id, 'in_progress')}
                              className="text-zinc-400 hover:text-white"
                            >
                              Start →
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* In Progress */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-2">
                  <div className="flex items-center justify-between text-xs font-medium text-amber-400 pb-1">
                    <span>In Progress</span>
                    <span className="text-[10px] font-mono">{selectedSquad.tasks.filter((t) => t.status === 'in_progress').length}</span>
                  </div>
                  <div className="space-y-1.5">
                    {selectedSquad.tasks
                      .filter((t) => t.status === 'in_progress')
                      .map((task) => (
                        <div key={task.id} className="p-2.5 rounded-lg bg-[#171725] border border-white/[0.06] text-xs space-y-1">
                          <p className="font-medium text-white">{task.title}</p>
                          <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1">
                            <span>{task.assigneeName}</span>
                            <button
                              onClick={() => updateSquadTaskStatus(selectedSquad.id, task.id, 'done')}
                              className="text-[#A3E635] hover:underline inline-flex items-center gap-1 font-medium"
                            >
                              <span>Done</span>
                              <Check className="w-3 h-3 stroke-[2.5]" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Done */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-2">
                  <div className="flex items-center justify-between text-xs font-medium text-emerald-400 pb-1">
                    <span>Done</span>
                    <span className="text-[10px] font-mono">{selectedSquad.tasks.filter((t) => t.status === 'done').length}</span>
                  </div>
                  <div className="space-y-1.5">
                    {selectedSquad.tasks
                      .filter((t) => t.status === 'done')
                      .map((task) => (
                        <div key={task.id} className="p-2.5 rounded-lg bg-[#171725] border border-white/[0.04] text-xs space-y-1 opacity-70">
                          <p className="font-medium text-white line-through">{task.title}</p>
                          <span className="text-[10px] text-emerald-400 block">{task.assigneeName}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Chat Box */}
              <div className="pt-3 border-t border-white/[0.06] space-y-2">
                <div className="p-3 rounded-xl bg-black/40 border border-white/[0.04] max-h-36 overflow-y-auto space-y-1.5">
                  {selectedSquad.chatMessages?.map((msg) => (
                    <div key={msg.id} className="text-xs">
                      <span className="font-medium text-zinc-300">{msg.authorName}</span>:{' '}
                      <span className="text-zinc-400">{msg.message}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type team update..."
                    className="flex-1 px-3 py-1.5 rounded-lg bg-[#171725] border border-white/[0.08] text-xs text-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] text-xs font-medium text-white transition flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                    <span>Send</span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: RECRUITMENT */}
      {activeTab === 'recruitment' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recruitmentListings.map((listing) => (
            <div
              key={listing.id}
              className="p-4 rounded-xl bg-[#111118] border border-white/[0.06] hover:border-white/[0.12] transition flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.06] text-zinc-300">
                    {listing.targetEvent}
                  </span>
                  {listing.urgency === 'High' && (
                    <span className="text-rose-400 text-[10px] font-medium font-mono">Urgent</span>
                  )}
                </div>

                <h3 className="text-sm font-semibold text-white">{listing.roleTitle}</h3>
                <p className="text-xs text-zinc-400 font-medium">Team: {listing.squadName}</p>
                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">{listing.pitch}</p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {listing.requiredSkills.map((s, i) => (
                    <span key={i} className="px-1.5 py-0.2 rounded text-[10px] bg-white/[0.04] text-zinc-400 font-mono">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-white/[0.04] flex items-center justify-end">
                <button
                  onClick={() => applyToRecruitment(listing.id)}
                  className="px-3 py-1 rounded-lg bg-white/[0.08] hover:bg-[#A3E635] hover:text-[#09090F] text-xs font-medium text-white transition"
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE SQUAD MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-md p-6 rounded-2xl bg-[#111118] border border-white/10 shadow-2xl text-left space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div>
                <h3 className="text-base font-bold text-white">Assemble Clan Team</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Recruit teammates and earn +100 XP</p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSquad} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Team Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Algorithmic Aces"
                  className="w-full px-3 py-2 rounded-xl bg-[#171725] border border-white/10 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Target Hackathon</label>
                <input
                  type="text"
                  required
                  value={targetEventOrProject}
                  onChange={(e) => setTargetEventOrProject(e.target.value)}
                  placeholder="e.g. GoblinHacks 2026"
                  className="w-full px-3 py-2 rounded-xl bg-[#171725] border border-white/10 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Needed Roles (comma separated)</label>
                <input
                  type="text"
                  required
                  value={neededRolesInput}
                  onChange={(e) => setNeededRolesInput(e.target.value)}
                  placeholder="UI/UX Designer, FastAPI Backend"
                  className="w-full px-3 py-2 rounded-xl bg-[#171725] border border-white/10 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">Team Pitch</label>
                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What is your team building?"
                  className="w-full px-3 py-2 rounded-xl bg-[#171725] border border-white/10 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#A3E635] hover:bg-[#bef264] text-[#09090F] text-xs font-bold"
                >
                  Create Team
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
