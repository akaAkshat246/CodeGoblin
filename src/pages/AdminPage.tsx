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
  Lock,
  Plus,
  Calendar,
  PackageOpen,
  DollarSign,
  History,
  X,
  Sparkles,
  ExternalLink,
  Check,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole, HackathonEvent } from '../types';
import { GOBLIN_CHARACTERS } from '../data/mockData';
import { SEOHead } from '../components/SEOHead';

export const AdminPage: React.FC = () => {
  const {
    currentUser,
    allUsers,
    posts,
    projects,
    quests,
    hackathons,
    resources,
    auditLogs,
    updateUserRole,
    deletePost,
    toggleFeatureProject,
    approveProject,
    rejectProject,
    createEvent,
    loginAs,
    navigateTo
  } = useApp();

  const [activeTab, setActiveTab] = useState<'members' | 'projects' | 'events' | 'discussions' | 'audit_logs'>('projects');
  
  // Workshop Creator Form Modal State
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventType, setEventType] = useState<'Workshop' | 'Hackathon' | 'Code Jam'>('Workshop');
  const [eventFormat, setEventFormat] = useState<'Online' | 'In-Person' | 'Hybrid'>('Online');
  const [eventOrganizer, setEventOrganizer] = useState('Code Goblins Technical Clan');
  const [eventPrice, setEventPrice] = useState('0');
  const [instructorName, setInstructorName] = useState('Akshat Vats');
  const [instructorRole, setInstructorRole] = useState('Technical Steward');
  const [eventDescription, setEventDescription] = useState('');
  const [eventStartDate, setEventStartDate] = useState('2026-11-20T18:00');

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
            onClick={() => loginAs('user_akshat_vats')}
            className="goblin-btn-primary py-2.5 px-6 text-xs font-bold"
          >
            Switch to Founder / Admin (Akshat Vats)
          </button>
        </div>
      </div>
    );
  }

  const handleCreateEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;

    createEvent({
      title: eventTitle.trim(),
      organizer: eventOrganizer.trim(),
      type: eventType,
      format: eventFormat,
      startDate: new Date(eventStartDate).toISOString(),
      endDate: new Date(new Date(eventStartDate).getTime() + 2 * 3600 * 1000).toISOString(),
      registrationDeadline: new Date(eventStartDate).toISOString(),
      prizePool: eventType === 'Workshop' ? 'Live Certification + Source Code' : '₹1,00,000 + Badges',
      officialUrl: `https://codegoblins.in/events/${eventTitle.toLowerCase().replace(/\s+/g, '-')}`,
      requiredSkills: ['Next.js', 'Vibe Coding', 'FastAPI'],
      status: 'Upcoming',
      teamSize: eventType === 'Workshop' ? 'Individual' : '2-4 Builders',
      description: eventDescription.trim() || 'A high-impact collaborative building sprint organized by Code Goblins.',
      bannerImage: '/assets/goblins/chaos_hero_poster.jpg',
      priceInr: parseInt(eventPrice) || 0,
      isWorkshop: eventType === 'Workshop',
      instructorName: instructorName.trim(),
      instructorRole: instructorRole.trim()
    });

    setIsEventModalOpen(false);
    setEventTitle('');
    setEventDescription('');
  };

  const totalRegisteredSeats = hackathons.reduce((acc, h) => acc + h.registeredUserIds.length, 0);
  const totalDownloads = resources.reduce((acc, r) => acc + r.downloadsCount, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      <SEOHead
        title="Clan Administration & Governance Console"
        description="Private administrative control center for CodeGoblins. Curate projects, publish workshops, review audit trails, and govern member roles."
        canonicalPath="/admin"
        pageId="admin_console"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-[#F5F3FF]">
              Clan Administration & Operations Console
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#A1A1B5] mt-1">
            Review submissions, schedule workshops, moderate community discussions, and inspect security audit logs.
          </p>
        </div>

        <button
          onClick={() => setIsEventModalOpen(true)}
          className="goblin-btn-primary py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Workshop / Event</span>
        </button>
      </div>

      {/* Analytics Overview Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="goblin-card p-4">
          <div className="flex items-center justify-between text-xs text-[#A1A1B5] mb-1">
            <span>Members</span>
            <Users className="w-4 h-4 text-[#8B5CF6]" />
          </div>
          <p className="text-2xl font-black text-[#F5F3FF]">{allUsers.length}</p>
          <span className="text-[10px] text-emerald-400 font-semibold">+14 this week</span>
        </div>

        <div className="goblin-card p-4">
          <div className="flex items-center justify-between text-xs text-[#A1A1B5] mb-1">
            <span>Showcase Projects</span>
            <Hammer className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-black text-[#F5F3FF]">{projects.length}</p>
          <span className="text-[10px] text-amber-400 font-semibold">Active MVPs</span>
        </div>

        <div className="goblin-card p-4">
          <div className="flex items-center justify-between text-xs text-[#A1A1B5] mb-1">
            <span>Events / Sprints</span>
            <Calendar className="w-4 h-4 text-[#A3E635]" />
          </div>
          <p className="text-2xl font-black text-[#F5F3FF]">{hackathons.length}</p>
          <span className="text-[10px] text-[#A3E635] font-semibold">{totalRegisteredSeats} RSVPs</span>
        </div>

        <div className="goblin-card p-4">
          <div className="flex items-center justify-between text-xs text-[#A1A1B5] mb-1">
            <span>Discussions</span>
            <MessageSquare className="w-4 h-4 text-[#C084FC]" />
          </div>
          <p className="text-2xl font-black text-[#F5F3FF]">{posts.length}</p>
          <span className="text-[10px] text-[#A1A1B5] font-semibold">Live Threads</span>
        </div>

        <div className="goblin-card p-4">
          <div className="flex items-center justify-between text-xs text-[#A1A1B5] mb-1">
            <span>Store Downloads</span>
            <PackageOpen className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-2xl font-black text-[#F5F3FF]">{totalDownloads}</p>
          <span className="text-[10px] text-sky-400 font-semibold">Blueprints</span>
        </div>

        <div className="goblin-card p-4">
          <div className="flex items-center justify-between text-xs text-[#A1A1B5] mb-1">
            <span>Security Audits</span>
            <History className="w-4 h-4 text-rose-400" />
          </div>
          <p className="text-2xl font-black text-[#F5F3FF]">{auditLogs.length}</p>
          <span className="text-[10px] text-emerald-400 font-semibold">All Validated</span>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/5 pb-2 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === 'projects'
              ? 'bg-[#171725] text-[#A3E635] border border-[#A3E635]/40 font-bold'
              : 'text-[#A1A1B5] hover:text-[#F5F3FF]'
          }`}
        >
          Project Moderation & Showcase ({projects.length})
        </button>

        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === 'events'
              ? 'bg-[#171725] text-[#A3E635] border border-[#A3E635]/40 font-bold'
              : 'text-[#A1A1B5] hover:text-[#F5F3FF]'
          }`}
        >
          Workshops & Events Manager ({hackathons.length})
        </button>

        <button
          onClick={() => setActiveTab('members')}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === 'members'
              ? 'bg-[#171725] text-[#A3E635] border border-[#A3E635]/40 font-bold'
              : 'text-[#A1A1B5] hover:text-[#F5F3FF]'
          }`}
        >
          Member & Role RBAC ({allUsers.length})
        </button>

        <button
          onClick={() => setActiveTab('discussions')}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === 'discussions'
              ? 'bg-[#171725] text-[#A3E635] border border-[#A3E635]/40 font-bold'
              : 'text-[#A1A1B5] hover:text-[#F5F3FF]'
          }`}
        >
          Discussion Arena Moderation ({posts.length})
        </button>

        <button
          onClick={() => setActiveTab('audit_logs')}
          className={`px-4 py-2 rounded-xl transition ${
            activeTab === 'audit_logs'
              ? 'bg-[#171725] text-[#A3E635] border border-[#A3E635]/40 font-bold'
              : 'text-[#A1A1B5] hover:text-[#F5F3FF]'
          }`}
        >
          Security Audit Trail ({auditLogs.length})
        </button>
      </div>

      {/* TAB 1: PROJECTS MODERATION */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#A1A1B5]">
            <span>Manage submission approval statuses, featured spotlight flags, and repository links.</span>
          </div>

          <div className="space-y-3">
            {projects.map((proj) => {
              const isApproved = proj.moderationStatus !== 'rejected';

              return (
                <div
                  key={proj.id}
                  className="goblin-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[#A3E635] font-semibold">{proj.category}</span>
                      <span className="text-white/20">•</span>
                      <span className="text-[#A1A1B5]">By {proj.authorName}</span>
                      {proj.featured && (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-400 font-bold">
                          Featured
                        </span>
                      )}
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        isApproved ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {isApproved ? 'Approved for Showcase' : 'Needs Revision'}
                      </span>
                    </div>
                    <h4 className="font-bold text-[#F5F3FF] text-base">{proj.title}</h4>
                    <p className="text-xs text-[#A1A1B5] line-clamp-1">{proj.tagline}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleFeatureProject(proj.id)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
                        proj.featured
                          ? 'border-amber-400 text-amber-400 bg-amber-400/10'
                          : 'border-white/10 text-[#A1A1B5] hover:text-[#F5F3FF]'
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${proj.featured ? 'fill-amber-400' : ''}`} />
                      <span>{proj.featured ? 'Featured' : 'Spotlight'}</span>
                    </button>

                    {isApproved ? (
                      <button
                        onClick={() => rejectProject(proj.id, 'Requested additional architectural documentation')}
                        className="px-3 py-1.5 rounded-xl border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 text-xs font-semibold transition"
                      >
                        Request Changes
                      </button>
                    ) : (
                      <button
                        onClick={() => approveProject(proj.id)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30 text-xs font-semibold transition"
                      >
                        Approve
                      </button>
                    )}

                    <button
                      onClick={() => navigateTo('project_detail', proj.id)}
                      className="px-3 py-1.5 rounded-xl bg-[#171725] text-[#F5F3FF] hover:bg-[#1E1E32]"
                    >
                      Inspect
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: EVENTS & WORKSHOPS */}
      {activeTab === 'events' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#A1A1B5]">
            <span>Published workshops, registrations, and capacity tracking.</span>
            <button
              onClick={() => setIsEventModalOpen(true)}
              className="text-xs font-bold text-[#A3E635] hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Workshop</span>
            </button>
          </div>

          <div className="space-y-3">
            {hackathons.map((evt) => (
              <div
                key={evt.id}
                className="goblin-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#8B5CF6]/20 text-[#C084FC]">
                      {evt.type}
                    </span>
                    <span className="text-[#A1A1B5]">{evt.format}</span>
                    <span className="text-white/20">•</span>
                    <span className="text-emerald-400 font-mono font-bold">
                      {evt.registeredUserIds.length} Registered
                    </span>
                    {evt.priceInr && evt.priceInr > 0 ? (
                      <span className="text-amber-400 font-bold font-mono">₹{evt.priceInr}</span>
                    ) : (
                      <span className="text-[#A3E635] font-bold">Free</span>
                    )}
                  </div>
                  <h4 className="font-bold text-[#F5F3FF] text-base">{evt.title}</h4>
                  <p className="text-xs text-[#A1A1B5] mt-0.5">
                    Starts: {new Date(evt.startDate).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={evt.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-[#171725] text-xs font-semibold text-[#F5F3FF] hover:bg-[#1E1E32] flex items-center gap-1"
                  >
                    <span>View Page</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MEMBERS & ROLES */}
      {activeTab === 'members' && (
        <div className="goblin-card overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 text-xs font-bold text-[#A1A1B5] uppercase tracking-wider flex items-center justify-between">
            <span>User & Archetype</span>
            <div className="flex items-center gap-8">
              <span>Level / XP</span>
              <span>Assigned RBAC Role</span>
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

      {/* TAB 4: DISCUSSIONS MODERATION */}
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

      {/* TAB 5: SECURITY AUDIT LOGS */}
      {activeTab === 'audit_logs' && (
        <div className="goblin-card overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 text-xs font-bold text-[#A1A1B5] uppercase tracking-wider flex items-center justify-between">
            <span>Action & Actor</span>
            <div className="flex items-center gap-12">
              <span>Target Resource</span>
              <span>Timestamp</span>
            </div>
          </div>

          <div className="divide-y divide-white/5">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="px-6 py-4 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${
                    log.status === 'success' ? 'bg-emerald-400' : log.status === 'warning' ? 'bg-amber-400' : 'bg-sky-400'
                  }`} />
                  <div>
                    <span className="font-mono font-bold text-[#F5F3FF]">{log.action}</span>
                    <p className="text-[10px] text-[#A1A1B5]">By {log.actorName} ({log.actorRole})</p>
                  </div>
                </div>

                <div className="flex items-center gap-8 text-right font-mono">
                  <span className="text-xs text-[#A855F7] max-w-xs truncate">{log.target}</span>
                  <span className="text-[10px] text-[#A1A1B5]">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Workshop Creator Form Modal */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#11111B] border border-[#8B5CF6]/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-black text-[#F5F3FF] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#A3E635]" />
                <span>Publish New Event / Workshop</span>
              </h3>
              <button
                onClick={() => setIsEventModalOpen(false)}
                className="p-1 rounded-lg text-[#A1A1B5] hover:text-[#F5F3FF]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEventSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#A1A1B5] font-semibold mb-1">Workshop / Sprint Title</label>
                <input
                  type="text"
                  required
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="e.g. Building Autonomous AI Agents with LangChain"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:border-[#8B5CF6] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A1A1B5] font-semibold mb-1">Type</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none"
                  >
                    <option value="Workshop">Hands-on Workshop</option>
                    <option value="Hackathon">Sprint Hackathon</option>
                    <option value="Code Jam">Code Jam</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#A1A1B5] font-semibold mb-1">Format</label>
                  <select
                    value={eventFormat}
                    onChange={(e) => setEventFormat(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none"
                  >
                    <option value="Online">Online (Live Stream)</option>
                    <option value="In-Person">In-Person</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A1A1B5] font-semibold mb-1">Ticket Price (INR, 0 = Free)</label>
                  <input
                    type="number"
                    value={eventPrice}
                    onChange={(e) => setEventPrice(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#A1A1B5] font-semibold mb-1">Start Date & Time</label>
                  <input
                    type="datetime-local"
                    value={eventStartDate}
                    onChange={(e) => setEventStartDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#A1A1B5] font-semibold mb-1">Curriculum & Description</label>
                <textarea
                  rows={3}
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  placeholder="What will attendees build during this session?"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEventModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-white/10 text-xs font-semibold text-[#A1A1B5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="goblin-btn-primary py-2 px-5 text-xs font-bold"
                >
                  Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
