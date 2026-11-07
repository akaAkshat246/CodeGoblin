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
  Clock,
  KeyRound,
  Shield,
  Zap,
  Fingerprint,
  BookOpen,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole, HackathonEvent } from '../types';
import { GOBLIN_CHARACTERS } from '../data/mockData';
import { SEOHead } from '../components/SEOHead';
import {
  isAdminEmail,
  getAdminClearance,
  AUTHORIZED_ADMIN_CREDENTIALS
} from '../utils/adminAuth';

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
    navigateTo,
    roadmaps,
    createRoadmap,
    deleteRoadmap,
    addRoadmapStep
  } = useApp();

  const [activeTab, setActiveTab] = useState<'members' | 'projects' | 'events' | 'learning' | 'discussions' | 'audit_logs'>('projects');
  
  // Gatekeeper Special Mail State
  const [adminMailInput, setAdminMailInput] = useState('');
  const [gateError, setGateError] = useState('');

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

  // Study Material & Curriculum Creator Modal State
  const [isRoadmapModalOpen, setIsRoadmapModalOpen] = useState(false);
  const [newRoadmapTitle, setNewRoadmapTitle] = useState('');
  const [newRoadmapDescription, setNewRoadmapDescription] = useState('');
  const [newRoadmapLevel, setNewRoadmapLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'>('Beginner');
  const [newRoadmapHours, setNewRoadmapHours] = useState('15 Hours');
  const [newRoadmapTags, setNewRoadmapTags] = useState('React, TypeScript, Vibe Coding');
  const [newFirstStepTitle, setNewFirstStepTitle] = useState('Foundations & Core Setup');
  const [newFirstStepDesc, setNewFirstStepDesc] = useState('Study core concepts, architecture patterns, and initialize local development environment.');
  const [newFirstStepResourceTitle, setNewFirstStepResourceTitle] = useState('Official Documentation & Reference Manual');
  const [newFirstStepResourceUrl, setNewFirstStepResourceUrl] = useState('https://developer.mozilla.org/');

  // Add Chapter to Existing Roadmap Modal State
  const [selectedRoadmapForStep, setSelectedRoadmapForStep] = useState<string | null>(null);
  const [newStepTitle, setNewStepTitle] = useState('');
  const [newStepDesc, setNewStepDesc] = useState('');
  const [newStepResourceTitle, setNewStepResourceTitle] = useState('Reference Documentation');
  const [newStepResourceUrl, setNewStepResourceUrl] = useState('https://react.dev');

  const hasAdminMail = isAdminEmail(currentUser?.email);
  const isAdmin = currentUser?.role === 'Administrator' || currentUser?.role === 'Moderator' || hasAdminMail;
  const clearance = getAdminClearance(currentUser?.email || (isAdmin ? 'akshat.vats@codegoblins.dev' : null));

  // SPECIAL ADMIN MAIL ID GATEKEEPER (GLASSMORPHISM & ANDROID SQUIRCLE LAYOUT)
  if (!isAdmin) {
    const inputClearance = getAdminClearance(adminMailInput);

    const handleGatekeeperSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!isAdminEmail(adminMailInput)) {
        setGateError('Invalid Mail ID. Administrative access requires an authorized @codegoblins.in or registered admin mail ID.');
        return;
      }

      setGateError('');
      // Find matching user or default to Akshat Vats
      const matched = allUsers.find(
        (u) => u.email.toLowerCase() === adminMailInput.trim().toLowerCase()
      ) || allUsers.find((u) => u.role === 'Administrator') || allUsers[0];

      loginAs(matched.id);
    };

    return (
      <div className="p-4 sm:p-8 max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
        <SEOHead
          title="Admin Clearance Required"
          description="Restricted platform operations portal for CodeGoblins administrators and stewards."
          canonicalPath="/admin"
          pageId="admin_gatekeeper"
        />

        <div className="p-6 sm:p-8 rounded-[28px] glass-panel border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.8)] relative overflow-hidden space-y-6">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Android Squircle Shield Icon */}
          <div className="text-center space-y-3 relative z-10">
            <div className="w-16 h-16 rounded-[22px] bg-amber-500/20 text-amber-400 border border-amber-500/40 mx-auto flex items-center justify-center shadow-lg">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                Restricted Platform Core
              </span>
              <h2 className="text-2xl font-display font-black text-[#F5F3FF] mt-2">
                Special Admin Mail ID Clearance
              </h2>
              <p className="text-xs text-[#A1A1B5] max-w-md mx-auto mt-1 leading-relaxed">
                The operations console governs workshop ticket publishing, showcase curation, RBAC permissions, and security audit logs. Access is strictly granted to verified <span className="text-amber-300 font-mono font-bold">@codegoblins.in</span> admin mail IDs.
              </p>
            </div>
          </div>

          {/* Quick-Select Authorized Admin Mail Profiles */}
          <div className="space-y-2.5 relative z-10">
            <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
              One-Touch Verified Admin Profiles
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {AUTHORIZED_ADMIN_CREDENTIALS.slice(0, 4).map((cred) => (
                <button
                  key={cred.email}
                  onClick={() => loginAs(cred.userId)}
                  className="p-3.5 rounded-[20px] bg-[#171725]/70 border border-white/5 hover:border-amber-400/50 hover:bg-[#1E1E32] transition text-left group flex items-start gap-3 backdrop-blur-md"
                >
                  <div className="android-icon-box bg-amber-500/20 text-amber-400 border border-amber-500/30 group-hover:scale-105">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-[#F5F3FF] truncate">{cred.name}</p>
                      <span className="px-1.5 py-0.2 rounded text-[8px] font-bold bg-amber-500/20 text-amber-300">
                        {cred.clearanceLevel.split(' ')[0]}
                      </span>
                    </div>
                    <p className="text-[10px] font-mono text-amber-300/90 truncate">{cred.email}</p>
                    <p className="text-[10px] text-[#A1A1B5] truncate mt-0.5">{cred.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Manual Admin Mail ID Input Form */}
          <form onSubmit={handleGatekeeperSubmit} className="space-y-3.5 pt-4 border-t border-white/5 relative z-10">
            <div>
              <label className="block text-xs font-medium text-[#A1A1B5] mb-1">
                Authenticate with Special Admin Mail ID
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={adminMailInput}
                  onChange={(e) => {
                    setAdminMailInput(e.target.value);
                    setGateError('');
                  }}
                  placeholder="e.g. akshat@codegoblins.in or admin@codegoblins.dev"
                  className="w-full pl-10 pr-4 py-2.5 rounded-[18px] bg-[#171725]/80 border border-white/10 text-xs text-[#F5F3FF] focus:outline-none focus:border-amber-400 transition font-mono"
                />
                <KeyRound className="w-4 h-4 text-[#A1A1B5] absolute left-3.5 top-3" />
              </div>
            </div>

            {/* Live Clearance Recognition Badge */}
            {inputClearance.isAdmin && (
              <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-300 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <p className="font-bold">Authorized Admin Mail ID Detected!</p>
                  <p className="text-[11px] text-[#A1A1B5]">
                    {inputClearance.clearanceLevel} • {inputClearance.description}
                  </p>
                </div>
              </div>
            )}

            {gateError && (
              <div className="p-3 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center gap-2 text-xs text-rose-300">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{gateError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full goblin-btn-green py-2.5 px-6 text-xs font-bold rounded-[18px] flex items-center justify-center gap-2 shadow-lg"
            >
              <Fingerprint className="w-4 h-4" />
              <span>Verify Mail ID & Open Console</span>
            </button>
          </form>

          <div className="pt-2 text-center text-[11px] text-[#A1A1B5]">
            Signed in as <span className="text-[#A3E635] font-semibold">{currentUser?.displayName}</span> ({currentUser?.email})
          </div>
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

  const handleCreateRoadmapSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoadmapTitle.trim()) return;

    createRoadmap({
      title: newRoadmapTitle.trim(),
      description: newRoadmapDescription.trim() || 'Comprehensive study track provided by CodeGoblins Academic Council.',
      level: newRoadmapLevel,
      estimatedHours: newRoadmapHours,
      tags: newRoadmapTags.split(',').map((t) => t.trim()).filter(Boolean),
      goblinRoleId: 2,
      archetype: 'Architect',
      icon: 'BookOpen',
      steps: [
        {
          title: newFirstStepTitle.trim() || 'Core Foundations',
          description: newFirstStepDesc.trim() || 'Initial study material and setup.',
          resourceTitle: newFirstStepResourceTitle.trim() || 'Official Docs',
          resourceUrl: newFirstStepResourceUrl.trim() || 'https://developer.mozilla.org/'
        }
      ]
    });

    setIsRoadmapModalOpen(false);
    setNewRoadmapTitle('');
    setNewRoadmapDescription('');
  };

  const handleAddStepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoadmapForStep || !newStepTitle.trim()) return;

    addRoadmapStep(selectedRoadmapForStep, {
      title: newStepTitle.trim(),
      description: newStepDesc.trim() || 'Study directives and concepts provided by admin.',
      resourceTitle: newStepResourceTitle.trim() || 'Documentation',
      resourceUrl: newStepResourceUrl.trim() || 'https://developer.mozilla.org/'
    });

    setSelectedRoadmapForStep(null);
    setNewStepTitle('');
    setNewStepDesc('');
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

      {/* 1. VERIFIED ADMIN SPECIAL MAIL ID CLEARANCE BANNER (GLASSMORPHISM) */}
      <div className="p-5 rounded-[26px] glass-panel border border-amber-500/30 shadow-[0_12px_40px_rgba(245,158,11,0.15)] relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 rounded-[20px] bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center shrink-0 shadow-lg">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                {clearance.clearanceLevel}
              </span>
              <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Verified Session
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-display font-black text-[#F5F3FF] mt-1">
              Active Admin: <span className="font-mono text-amber-300">{currentUser?.email || 'akshat.vats@codegoblins.dev'}</span>
            </h2>
            <p className="text-xs text-[#A1A1B5] mt-0.5 max-w-xl">
              {clearance.description} • Signed in as <strong className="text-white">{currentUser?.displayName}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 relative z-10 self-start md:self-auto">
          <button
            onClick={() => setIsEventModalOpen(true)}
            className="goblin-btn-green py-2 px-3.5 text-xs font-bold rounded-[16px] flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Workshop</span>
          </button>
        </div>
      </div>

      {/* 2. ANDROID-STYLED QUICK ACTION TILES (MATERIAL YOU QUICK SETTINGS) */}
      <div>
        <p className="text-[11px] font-bold text-[#A1A1B5] uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-[#A3E635]" />
          <span>Android Quick Command Controls</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Tile 1: Project Moderation */}
          <div
            onClick={() => setActiveTab('projects')}
            className={`android-tile ${activeTab === 'projects' ? 'ring-2 ring-amber-400/50 bg-[#1E1E32]/90' : ''}`}
          >
            <div className="android-icon-box bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Hammer className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold text-[#F5F3FF]">Forge Submissions</h4>
              <p className="text-[10px] text-[#A1A1B5] mt-0.5 truncate">{projects.length} submissions • Review & feature</p>
            </div>
          </div>

          {/* Tile 2: Schedule Workshop */}
          <div
            onClick={() => setIsEventModalOpen(true)}
            className="android-tile group"
          >
            <div className="android-icon-box bg-[#A3E635]/20 text-[#A3E635] border border-[#A3E635]/30 group-hover:scale-105">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold text-[#F5F3FF]">Schedule Workshop</h4>
              <p className="text-[10px] text-[#A1A1B5] mt-0.5 truncate">Publish masterclasses & passes</p>
            </div>
          </div>

          {/* Tile 3: Member RBAC */}
          <div
            onClick={() => setActiveTab('members')}
            className={`android-tile ${activeTab === 'members' ? 'ring-2 ring-[#8B5CF6]/50 bg-[#1E1E32]/90' : ''}`}
          >
            <div className="android-icon-box bg-[#8B5CF6]/20 text-[#C084FC] border border-[#8B5CF6]/30">
              <Users className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold text-[#F5F3FF]">Member Governance</h4>
              <p className="text-[10px] text-[#A1A1B5] mt-0.5 truncate">{allUsers.length} Clan members • RBAC matrix</p>
            </div>
          </div>

          {/* Tile 4: Audit Trails */}
          <div
            onClick={() => setActiveTab('audit_logs')}
            className={`android-tile ${activeTab === 'audit_logs' ? 'ring-2 ring-rose-500/50 bg-[#1E1E32]/90' : ''}`}
          >
            <div className="android-icon-box bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <History className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold text-[#F5F3FF]">Security Audit Logs</h4>
              <p className="text-[10px] text-[#A1A1B5] mt-0.5 truncate">{auditLogs.length} verified trails • Immutable</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. ANALYTICS OVERVIEW METRICS (GLASSMORPHIC CARDS) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="glass-card p-4 rounded-[20px]">
          <div className="flex items-center justify-between text-xs text-[#A1A1B5] mb-1">
            <span>Members</span>
            <Users className="w-4 h-4 text-[#8B5CF6]" />
          </div>
          <p className="text-2xl font-black text-[#F5F3FF]">{allUsers.length}</p>
          <span className="text-[10px] text-emerald-400 font-semibold">+14 this week</span>
        </div>

        <div className="glass-card p-4 rounded-[20px]">
          <div className="flex items-center justify-between text-xs text-[#A1A1B5] mb-1">
            <span>Showcase</span>
            <Hammer className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-black text-[#F5F3FF]">{projects.length}</p>
          <span className="text-[10px] text-amber-400 font-semibold">Active MVPs</span>
        </div>

        <div className="glass-card p-4 rounded-[20px]">
          <div className="flex items-center justify-between text-xs text-[#A1A1B5] mb-1">
            <span>Workshops</span>
            <Calendar className="w-4 h-4 text-[#A3E635]" />
          </div>
          <p className="text-2xl font-black text-[#F5F3FF]">{hackathons.length}</p>
          <span className="text-[10px] text-[#A3E635] font-semibold">{totalRegisteredSeats} RSVPs</span>
        </div>

        <div className="glass-card p-4 rounded-[20px]">
          <div className="flex items-center justify-between text-xs text-[#A1A1B5] mb-1">
            <span>Discussions</span>
            <MessageSquare className="w-4 h-4 text-[#C084FC]" />
          </div>
          <p className="text-2xl font-black text-[#F5F3FF]">{posts.length}</p>
          <span className="text-[10px] text-[#A1A1B5] font-semibold">Live Threads</span>
        </div>

        <div className="glass-card p-4 rounded-[20px]">
          <div className="flex items-center justify-between text-xs text-[#A1A1B5] mb-1">
            <span>Downloads</span>
            <PackageOpen className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-2xl font-black text-[#F5F3FF]">{totalDownloads}</p>
          <span className="text-[10px] text-sky-400 font-semibold">Blueprints</span>
        </div>

        <div className="glass-card p-4 rounded-[20px]">
          <div className="flex items-center justify-between text-xs text-[#A1A1B5] mb-1">
            <span>Audit Logs</span>
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
          onClick={() => setActiveTab('learning')}
          className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
            activeTab === 'learning'
              ? 'bg-[#171725] text-[#A3E635] border border-[#A3E635]/40 font-bold'
              : 'text-[#A1A1B5] hover:text-[#F5F3FF]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Curriculum & Study Tracks ({roadmaps.length})</span>
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

      {/* TAB: CURRICULUM & STUDY MATERIALS (ADMIN PROVIDED) */}
      {activeTab === 'learning' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#171725] border border-white/5">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#A3E635]/20 text-[#A3E635] border border-[#A3E635]/30">
                  ADMIN ACADEMIC STEWARD
                </span>
                <span className="text-xs text-zinc-400 font-mono">{roadmaps.length} Tracks Published</span>
              </div>
              <h3 className="text-lg font-bold text-[#F5F3FF] mt-1">
                Study Materials & Curriculum Manager
              </h3>
              <p className="text-xs text-[#A1A1B5] mt-0.5 max-w-xl">
                As administrators, you provide official learning tracks, syllabus chapters, tutorials, and reading materials for students to study.
              </p>
            </div>

            <button
              onClick={() => setIsRoadmapModalOpen(true)}
              className="goblin-btn-green px-4 py-2 text-xs font-bold flex items-center gap-2 shrink-0 shadow-[0_0_15px_rgba(163,230,53,0.2)]"
            >
              <Plus className="w-4 h-4" />
              <span>Publish New Study Track</span>
            </button>
          </div>

          {/* List of Study Tracks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roadmaps.map((map) => (
              <div key={map.id} className="p-5 rounded-2xl bg-[#111118] border border-white/[0.08] flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.06] text-zinc-300">
                      {map.level}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-500" />
                      {map.estimatedHours}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white">{map.title}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">{map.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {map.tags.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-zinc-400 border border-white/[0.06]">
                        #{t}
                      </span>
                    ))}
                  </div>

                  {/* Chapters List */}
                  <div className="pt-2 border-t border-white/[0.06] space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                      <span>Study Chapters ({map.steps.length})</span>
                      <button
                        onClick={() => {
                          setSelectedRoadmapForStep(map.id);
                          setNewStepTitle('');
                          setNewStepDesc('');
                        }}
                        className="text-[11px] text-[#A3E635] hover:underline flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Chapter</span>
                      </button>
                    </div>

                    <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                      {map.steps.map((step, sIdx) => (
                        <div key={sIdx} className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04] text-xs flex items-center justify-between gap-2">
                          <span className="text-zinc-300 truncate">
                            <strong className="text-zinc-500 mr-1.5 font-mono">{sIdx + 1}.</strong>
                            {step.title}
                          </span>
                          {step.resourceUrl && (
                            <a
                              href={step.resourceUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[10px] text-zinc-400 hover:text-white shrink-0 flex items-center gap-0.5"
                            >
                              <span>Docs</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[10px] text-zinc-500 font-mono">
                    ID: {map.id} • {map.publishedBy || 'Admin Curated'}
                  </span>
                  <button
                    onClick={() => {
                      if (confirm(`Archive and remove study track "${map.title}"?`)) {
                        deleteRoadmap(map.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition"
                    title="Delete Track"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
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

      {/* 2. Publish New Study Track / Curriculum Modal */}
      {isRoadmapModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#11111B] border border-lime-400/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-black text-[#F5F3FF] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-lime-400" />
                <span>Publish Official Study Track</span>
              </h3>
              <button
                onClick={() => setIsRoadmapModalOpen(false)}
                className="p-1 rounded-lg text-[#A1A1B5] hover:text-[#F5F3FF]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRoadmapSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#A1A1B5] font-semibold mb-1">Study Track Title</label>
                <input
                  type="text"
                  required
                  value={newRoadmapTitle}
                  onChange={(e) => setNewRoadmapTitle(e.target.value)}
                  placeholder="e.g. Full-Stack AI Engineering & Agents 2026"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:border-lime-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A1A1B5] font-semibold mb-1">Study Level</label>
                  <select
                    value={newRoadmapLevel}
                    onChange={(e) => setNewRoadmapLevel(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="All Levels">All Levels</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#A1A1B5] font-semibold mb-1">Estimated Hours</label>
                  <input
                    type="text"
                    value={newRoadmapHours}
                    onChange={(e) => setNewRoadmapHours(e.target.value)}
                    placeholder="e.g. 18 Hours"
                    className="w-full px-3 py-2 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#A1A1B5] font-semibold mb-1">Syllabus Overview & Description</label>
                <textarea
                  rows={2}
                  required
                  value={newRoadmapDescription}
                  onChange={(e) => setNewRoadmapDescription(e.target.value)}
                  placeholder="What will the student study and learn in this curriculum track?"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-[#A1A1B5] font-semibold mb-1">Topic Tags (comma-separated)</label>
                <input
                  type="text"
                  value={newRoadmapTags}
                  onChange={(e) => setNewRoadmapTags(e.target.value)}
                  placeholder="React, TypeScript, Next.js, AI"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none"
                />
              </div>

              {/* Initial Chapter */}
              <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                <p className="text-[11px] font-bold text-lime-400 uppercase tracking-wider">
                  Initial Chapter 1 Study Content
                </p>
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Chapter 1 Title</label>
                  <input
                    type="text"
                    required
                    value={newFirstStepTitle}
                    onChange={(e) => setNewFirstStepTitle(e.target.value)}
                    placeholder="e.g. Chapter 1: Core Architecture & Setup"
                    className="w-full px-3 py-1.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Study Notes & Directives</label>
                  <textarea
                    rows={2}
                    value={newFirstStepDesc}
                    onChange={(e) => setNewFirstStepDesc(e.target.value)}
                    placeholder="Reading instructions and key focus points for students..."
                    className="w-full px-3 py-1.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-white focus:outline-none resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={newFirstStepResourceTitle}
                    onChange={(e) => setNewFirstStepResourceTitle(e.target.value)}
                    placeholder="Docs Title"
                    className="px-3 py-1.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-white focus:outline-none"
                  />
                  <input
                    type="url"
                    value={newFirstStepResourceUrl}
                    onChange={(e) => setNewFirstStepResourceUrl(e.target.value)}
                    placeholder="https://docs..."
                    className="px-3 py-1.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsRoadmapModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-white/10 text-xs font-semibold text-[#A1A1B5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="goblin-btn-green py-2 px-5 text-xs font-bold"
                >
                  Publish Track
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Add Study Chapter Modal */}
      {selectedRoadmapForStep && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#11111B] border border-lime-400/40 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-lime-400" />
                <span>Add Study Chapter</span>
              </h3>
              <button
                onClick={() => setSelectedRoadmapForStep(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddStepSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Chapter Title</label>
                <input
                  type="text"
                  required
                  value={newStepTitle}
                  onChange={(e) => setNewStepTitle(e.target.value)}
                  placeholder="e.g. Next.js App Router & Server Components"
                  className="w-full px-3 py-2 rounded-xl bg-[#171725] border border-white/10 text-xs text-white focus:outline-none focus:border-lime-400"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Study Guide & Instructions</label>
                <textarea
                  rows={3}
                  required
                  value={newStepDesc}
                  onChange={(e) => setNewStepDesc(e.target.value)}
                  placeholder="Explain concepts, coding patterns, and self-study directives..."
                  className="w-full px-3 py-2 rounded-xl bg-[#171725] border border-white/10 text-xs text-white focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Resource Title</label>
                  <input
                    type="text"
                    value={newStepResourceTitle}
                    onChange={(e) => setNewStepResourceTitle(e.target.value)}
                    placeholder="Documentation"
                    className="w-full px-3 py-1.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Resource Link</label>
                  <input
                    type="url"
                    value={newStepResourceUrl}
                    onChange={(e) => setNewStepResourceUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-1.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRoadmapForStep(null)}
                  className="px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-semibold text-zinc-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="goblin-btn-green py-1.5 px-4 text-xs font-bold"
                >
                  Add Chapter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
