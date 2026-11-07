import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  UserProfile,
  UserRole,
  DiscussionPost,
  DiscussionReply,
  ProjectShowcase,
  HackathonEvent,
  Squad,
  NotificationItem,
  Quest,
  Achievement,
  AnnouncementItem,
  ActivityFeedItem,
  TeamRecruitmentListing,
  LearningRoadmap,
  LearningStep,
  DigitalResource,
  AuditLogEntry
} from '../types';
import {
  INITIAL_MEMBERS,
  INITIAL_POSTS,
  INITIAL_REPLIES,
  INITIAL_PROJECTS,
  INITIAL_HACKATHONS,
  INITIAL_SQUADS,
  INITIAL_NOTIFICATIONS,
  INITIAL_QUESTS,
  INITIAL_ACHIEVEMENTS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_ACTIVITY_FEED,
  INITIAL_RECRUITMENT_LISTINGS,
  LEARNING_ROADMAPS,
  GOBLIN_CHARACTERS,
  INITIAL_RESOURCES,
  INITIAL_AUDIT_LOGS
} from '../data/mockData';

export type NavigationPage =
  | 'landing'
  | 'login'
  | 'admin_login'
  | 'dashboard'
  | 'discover'
  | 'discussions'
  | 'discussion_detail'
  | 'quests'
  | 'projects'
  | 'project_detail'
  | 'hackathons'
  | 'build_win'
  | 'squads'
  | 'leaderboards'
  | 'learning_hub'
  | 'resources_store'
  | 'members'
  | 'announcements'
  | 'nine_goblins'
  | 'profile'
  | 'settings'
  | 'admin';

interface ToastMessage {
  id: string;
  type: 'xp' | 'success' | 'achievement' | 'info';
  title: string;
  description: string;
}

interface AppContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  activePage: NavigationPage;
  selectedPostId: string | null;
  selectedProjectId: string | null;
  selectedMemberId: string | null;
  toasts: ToastMessage[];
  completedQuestIds: string[];
  completedLessonIds: string[];
  allUsers: UserProfile[];
  posts: DiscussionPost[];
  replies: DiscussionReply[];
  projects: ProjectShowcase[];
  hackathons: HackathonEvent[];
  squads: Squad[];
  notifications: NotificationItem[];
  announcements: AnnouncementItem[];
  activityFeed: ActivityFeedItem[];
  recruitmentListings: TeamRecruitmentListing[];
  roadmaps: LearningRoadmap[];
  quests: Quest[];
  achievements: Achievement[];
  isSearchModalOpen: boolean;
  isAuthModalOpen: boolean;
  isOnboardingModalOpen: boolean;
  levelUpData: { newLevel: number; oldLevel: number } | null;
  
  // Navigation & Modals
  navigateTo: (page: NavigationPage, itemId?: string) => void;
  setIsSearchModalOpen: (open: boolean) => void;
  setIsAuthModalOpen: (open: boolean) => void;
  setIsOnboardingModalOpen: (open: boolean) => void;
  closeLevelUpModal: () => void;
  
  // Auth
  loginAs: (userId: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  completeOnboarding: (data: Partial<UserProfile>) => void;

  // Gamification & XP
  awardXP: (amount: number, reason: string) => void;
  completeQuest: (questId: string) => void;
  toggleCompleteLesson: (lessonId: string, lessonTitle: string) => void;

  // Discussions
  createPost: (post: Omit<DiscussionPost, 'id' | 'createdAt' | 'upvotes' | 'upvotedUserIds' | 'repliesCount' | 'solved'>) => void;
  upvotePost: (postId: string) => void;
  addReply: (postId: string, content: string, codeSnippet?: { language: string; code: string }) => void;
  acceptReply: (postId: string, replyId: string) => void;
  toggleSavePost: (postId: string) => void;

  // Projects
  createProject: (project: Omit<ProjectShowcase, 'id' | 'likes' | 'likedUserIds' | 'createdAt'>) => void;
  likeProject: (projectId: string) => void;
  toggleSaveProject: (projectId: string) => void;

  // Hackathons
  registerForEvent: (eventId: string) => void;

  // Squads & Teams
  createSquad: (squad: Omit<Squad, 'id' | 'createdAt' | 'chatMessages'>) => void;
  joinSquad: (squadId: string) => void;
  updateSquadTaskStatus: (squadId: string, taskId: string, newStatus: 'todo' | 'in_progress' | 'done') => void;
  addSquadTask: (squadId: string, title: string, priority?: 'High' | 'Medium' | 'Low', deadline?: string, assigneeName?: string) => void;
  sendSquadMessage: (squadId: string, message: string) => void;
  applyToRecruitment: (listingId: string) => void;

  // Notifications
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Resources Store
  resources: DigitalResource[];
  downloadedResourceIds: string[];
  downloadResource: (resourceId: string) => void;

  // Workshops & Payments
  registerForWorkshopWithPayment: (eventId: string, isPaid: boolean, amountInr?: number) => void;
  createEvent: (event: Omit<HackathonEvent, 'id' | 'registeredUserIds'>) => void;

  // Admin & Governance
  auditLogs: AuditLogEntry[];
  addAuditLog: (action: string, target: string, status?: 'success' | 'warning' | 'info') => void;
  approveProject: (projectId: string) => void;
  rejectProject: (projectId: string, reason?: string) => void;
  updateUserRole: (userId: string, newRole: UserRole) => void;
  deletePost: (postId: string) => void;
  toggleFeatureProject: (projectId: string) => void;

  // Curriculum & Learning Materials (Provided by Admin for Users to Study)
  createRoadmap: (roadmap: Omit<LearningRoadmap, 'id'>) => void;
  deleteRoadmap: (roadmapId: string) => void;
  addRoadmapStep: (roadmapId: string, step: LearningStep) => void;
  updateRoadmap: (roadmapId: string, updated: Partial<LearningRoadmap>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const loadStored = <T,>(key: string, fallback: T): T => {
    try {
      const item = localStorage.getItem(`codegoblins_${key}`);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  };

  const saveStored = (key: string, value: unknown) => {
    try {
      localStorage.setItem(`codegoblins_${key}`, JSON.stringify(value));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  };

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() =>
    loadStored<UserProfile | null>('currentUser', null)
  );
  const [activePage, setActivePage] = useState<NavigationPage>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const savedUser = loadStored<UserProfile | null>('currentUser', null);
      if (path === '/admin-login' || hash === '#admin-login' || hash.startsWith('#admin-login')) {
        return 'admin_login';
      }
      if (path === '/login' || hash === '#login' || hash.startsWith('#login')) {
        return 'login';
      }
      if ((path === '/hq' || hash === '#hq' || hash.startsWith('#hq')) && savedUser) {
        return 'dashboard';
      }
    }
    return 'landing';
  });
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/admin-login' || hash === '#admin-login' || hash.startsWith('#admin-login')) {
        setActivePage('admin_login');
      } else if (path === '/login' || hash === '#login' || hash.startsWith('#login')) {
        setActivePage('login');
      } else if (path === '/hq' || hash === '#hq' || hash.startsWith('#hq')) {
        setActivePage('dashboard');
      } else if (path === '/' && (!hash || hash === '#' || hash === '#spawn')) {
        setActivePage('landing');
      }
    };
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const [allUsers, setAllUsers] = useState<UserProfile[]>(() =>
    loadStored<UserProfile[]>('users', INITIAL_MEMBERS)
  );
  const [posts, setPosts] = useState<DiscussionPost[]>(() =>
    loadStored<DiscussionPost[]>('posts', INITIAL_POSTS)
  );
  const [replies, setReplies] = useState<DiscussionReply[]>(() =>
    loadStored<DiscussionReply[]>('replies', INITIAL_REPLIES)
  );
  const [projects, setProjects] = useState<ProjectShowcase[]>(() =>
    loadStored<ProjectShowcase[]>('projects', INITIAL_PROJECTS)
  );
  const [hackathons, setHackathons] = useState<HackathonEvent[]>(() =>
    loadStored<HackathonEvent[]>('hackathons', INITIAL_HACKATHONS)
  );
  const [squads, setSquads] = useState<Squad[]>(() =>
    loadStored<Squad[]>('squads', INITIAL_SQUADS)
  );
  const [notifications, setNotifications] = useState<NotificationItem[]>(() =>
    loadStored<NotificationItem[]>('notifications', INITIAL_NOTIFICATIONS)
  );
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(() =>
    loadStored<AnnouncementItem[]>('announcements', INITIAL_ANNOUNCEMENTS)
  );
  const [activityFeed, setActivityFeed] = useState<ActivityFeedItem[]>(() =>
    loadStored<ActivityFeedItem[]>('activityFeed', INITIAL_ACTIVITY_FEED)
  );
  const [recruitmentListings, setRecruitmentListings] = useState<TeamRecruitmentListing[]>(() =>
    loadStored<TeamRecruitmentListing[]>('recruitmentListings', INITIAL_RECRUITMENT_LISTINGS)
  );
  const [completedQuestIds, setCompletedQuestIds] = useState<string[]>(() =>
    loadStored<string[]>('completedQuestIds', [])
  );
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() =>
    loadStored<string[]>('completedLessonIds', ['step_1'])
  );

  const [resources, setResources] = useState<DigitalResource[]>(() =>
    loadStored<DigitalResource[]>('resources', INITIAL_RESOURCES)
  );
  const [downloadedResourceIds, setDownloadedResourceIds] = useState<string[]>(() =>
    loadStored<string[]>('downloadedResourceIds', [])
  );
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() =>
    loadStored<AuditLogEntry[]>('auditLogs', INITIAL_AUDIT_LOGS)
  );
  const [roadmaps, setRoadmaps] = useState<LearningRoadmap[]>(() =>
    loadStored<LearningRoadmap[]>('roadmaps', LEARNING_ROADMAPS)
  );

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [levelUpData, setLevelUpData] = useState<{ newLevel: number; oldLevel: number } | null>(null);

  useEffect(() => saveStored('currentUser', currentUser), [currentUser]);
  useEffect(() => saveStored('users', allUsers), [allUsers]);
  useEffect(() => saveStored('posts', posts), [posts]);
  useEffect(() => saveStored('replies', replies), [replies]);
  useEffect(() => saveStored('projects', projects), [projects]);
  useEffect(() => saveStored('hackathons', hackathons), [hackathons]);
  useEffect(() => saveStored('squads', squads), [squads]);
  useEffect(() => saveStored('notifications', notifications), [notifications]);
  useEffect(() => saveStored('resources', resources), [resources]);
  useEffect(() => saveStored('downloadedResourceIds', downloadedResourceIds), [downloadedResourceIds]);
  useEffect(() => saveStored('auditLogs', auditLogs), [auditLogs]);
  useEffect(() => saveStored('completedQuestIds', completedQuestIds), [completedQuestIds]);
  useEffect(() => saveStored('completedLessonIds', completedLessonIds), [completedLessonIds]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const navigateTo = (page: NavigationPage, itemId?: string) => {
    if (page === 'discussion_detail' && itemId) {
      setSelectedPostId(itemId);
    } else if (page === 'project_detail' && itemId) {
      setSelectedProjectId(itemId);
    } else if (page === 'profile' && itemId) {
      setSelectedMemberId(itemId);
    } else if (page === 'profile' && !itemId) {
      setSelectedMemberId(currentUser?.id || null);
    }
    setActivePage(page);
    try {
      if (page === 'landing') {
        window.history.pushState(null, '', '/');
      } else if (!window.location.hash.startsWith('#hq')) {
        window.history.pushState(null, '', '/#hq');
      }
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const calculateLevel = (xp: number) => {
    return Math.floor(Math.sqrt(xp / 60)) + 1;
  };

  const awardXP = (amount: number, reason: string) => {
    if (!currentUser) return;
    const oldXP = currentUser.xp;
    const newXP = oldXP + amount;
    const oldLevel = calculateLevel(oldXP);
    const newLevel = calculateLevel(newXP);
    const nextLevelXP = Math.pow(newLevel, 2) * 60;

    const newAchievements = [...currentUser.achievements];
    if (newXP >= 500 && !newAchievements.includes('code_goblin')) {
      newAchievements.push('code_goblin');
    }

    const updatedUser: UserProfile = {
      ...currentUser,
      xp: newXP,
      level: newLevel,
      xpToNextLevel: nextLevelXP,
      reputationScore: currentUser.reputationScore + Math.floor(amount / 5),
      achievements: newAchievements
    };

    setCurrentUser(updatedUser);
    setAllUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));

    addToast({
      type: 'xp',
      title: `+${amount} XP Earned!`,
      description: reason
    });

    if (newLevel > oldLevel) {
      setLevelUpData({ newLevel, oldLevel });
      confetti({
        particleCount: 130,
        spread: 85,
        origin: { y: 0.6 }
      });
      addToast({
        type: 'achievement',
        title: `LEVEL UP! Level ${newLevel}`,
        description: `You are now Level ${newLevel}! Stay Goblin.`
      });
    }
  };

  const closeLevelUpModal = () => setLevelUpData(null);

  const completeQuest = (questId: string) => {
    if (completedQuestIds.includes(questId)) {
      addToast({
        type: 'info',
        title: 'Already Completed',
        description: 'You have already claimed XP for this quest.'
      });
      return;
    }

    const targetQuest = INITIAL_QUESTS.find((q) => q.id === questId);
    if (!targetQuest) return;

    setCompletedQuestIds((prev) => [...prev, questId]);
    awardXP(targetQuest.xpReward, `Completed quest: ${targetQuest.title}`);

    // Update Activity Feed
    setActivityFeed((prev) => [
      {
        id: `act_${Date.now()}`,
        type: 'quest',
        actorName: currentUser?.displayName || 'Cadet',
        actorGoblinId: currentUser?.avatarGoblinId || 2,
        actionText: 'completed daily quest',
        targetText: `${targetQuest.title} (+${targetQuest.xpReward} XP)`,
        timestamp: 'Just now'
      },
      ...prev
    ]);

    // Extend streak
    if (currentUser) {
      const todayStr = new Date().toISOString().split('T')[0];
      const lastActiveStr = currentUser.lastActiveDate ? currentUser.lastActiveDate.split('T')[0] : '';
      if (todayStr !== lastActiveStr) {
        const newStreak = currentUser.streakDays + 1;
        const updated = {
          ...currentUser,
          streakDays: newStreak,
          longestStreak: Math.max(newStreak, currentUser.longestStreak),
          lastActiveDate: new Date().toISOString()
        };
        setCurrentUser(updated);
        setAllUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
        addToast({
          type: 'success',
          title: `Streak Extended: ${newStreak} Days!`,
          description: 'Keep the momentum going in Asia/Kolkata timezone.'
        });
      }
    }
  };

  const toggleCompleteLesson = (lessonId: string, lessonTitle: string) => {
    const isCompleted = completedLessonIds.includes(lessonId);
    if (isCompleted) {
      setCompletedLessonIds((prev) => prev.filter((id) => id !== lessonId));
      addToast({
        type: 'info',
        title: 'Step Reset',
        description: `Unmarked: ${lessonTitle}`
      });
    } else {
      setCompletedLessonIds((prev) => [...prev, lessonId]);
      awardXP(50, `Completed roadmap step: ${lessonTitle}`);
      addToast({
        type: 'success',
        title: 'Step Completed! (+50 XP)',
        description: lessonTitle
      });
    }
  };

  const loginAs = (userId: string) => {
    const found = allUsers.find((u) => u.id === userId);
    if (found) {
      setCurrentUser(found);
      addToast({
        type: 'success',
        title: `Welcome back, ${found.displayName}!`,
        description: `Logged in as ${found.role} (${GOBLIN_CHARACTERS.find((g) => g.id === found.avatarGoblinId)?.roleTitle || 'Goblin'}).`
      });
    }
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setCurrentUser(null);
    navigateTo('landing');
    addToast({
      type: 'info',
      title: 'Logged Out',
      description: 'You have safely left the Goblin Den. See you soon!'
    });
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updated: UserProfile = { ...currentUser, ...updates };
    setCurrentUser(updated);
    setAllUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    addToast({
      type: 'success',
      title: 'Profile Updated',
      description: 'Your goblin persona and settings have been saved.'
    });
  };

  const completeOnboarding = (data: Partial<UserProfile>) => {
    const newUser: UserProfile = {
      id: `user_${Date.now()}`,
      username: data.username || `goblin_${Math.floor(Math.random() * 9000 + 1000)}`,
      displayName: data.displayName || 'B.Tech Apprentice',
      email: data.email || 'apprentice@codegoblins.dev',
      avatarGoblinId: data.avatarGoblinId || 2,
      archetype: (data.archetype as any) || 'Builder',
      role: 'Member',
      level: 1,
      xp: 150,
      xpToNextLevel: 300,
      streakDays: 1,
      longestStreak: 1,
      rankChange: 0,
      lastActiveDate: new Date().toISOString(),
      college: data.college || 'Engineering College',
      yearOfStudy: data.yearOfStudy || '1st Year B.Tech',
      bio: data.bio || 'New goblin ready to learn, form squads, and build real projects. Code hard. Level up. Stay goblin.',
      githubUrl: data.githubUrl || '',
      portfolioUrl: data.portfolioUrl || '',
      skills: data.skills && data.skills.length > 0 ? data.skills : ['JavaScript', 'HTML/CSS', 'Python'],
      interests: data.interests && data.interests.length > 0 ? data.interests : ['Web Development', 'Vibe Coding'],
      preferredRoles: data.preferredRoles || ['Learner & Builder'],
      achievements: ['first_spawn'],
      isMentor: false,
      reputationScore: 50,
      savedPostIds: [],
      savedProjectIds: [],
      isAvailableForHireOrTeams: true
    };

    setCurrentUser(newUser);
    setAllUsers((prev) => [newUser, ...prev]);
    setIsOnboardingModalOpen(false);

    confetti({
      particleCount: 110,
      spread: 75,
      origin: { y: 0.6 }
    });

    addToast({
      type: 'achievement',
      title: 'Achievement Unlocked: First Spawn!',
      description: 'Welcome to Code Goblins! Your journey begins now. +150 XP awarded.'
    });

    navigateTo('dashboard');
  };

  const createPost = (postData: Omit<DiscussionPost, 'id' | 'createdAt' | 'upvotes' | 'upvotedUserIds' | 'repliesCount' | 'solved'>) => {
    if (!currentUser) return;
    const newPost: DiscussionPost = {
      ...postData,
      id: `post_${Date.now()}`,
      createdAt: new Date().toISOString(),
      upvotes: 1,
      upvotedUserIds: [currentUser.id],
      repliesCount: 0,
      solved: false
    };

    setPosts((prev) => [newPost, ...prev]);
    awardXP(50, 'Published a thoughtful community post in Discussion Arena.');
    addToast({
      type: 'success',
      title: 'Post Published!',
      description: 'Your discussion is now visible to the clan.'
    });
  };

  const upvotePost = (postId: string) => {
    if (!currentUser) return;
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const hasUpvoted = p.upvotedUserIds.includes(currentUser.id);
        const upvotedUserIds = hasUpvoted
          ? p.upvotedUserIds.filter((id) => id !== currentUser.id)
          : [...p.upvotedUserIds, currentUser.id];
        return {
          ...p,
          upvotes: hasUpvoted ? p.upvotes - 1 : p.upvotes + 1,
          upvotedUserIds
        };
      })
    );
  };

  const addReply = (postId: string, content: string, codeSnippet?: { language: string; code: string }) => {
    if (!currentUser) return;
    const newReply: DiscussionReply = {
      id: `rep_${Date.now()}`,
      postId,
      authorId: currentUser.id,
      authorName: currentUser.displayName,
      authorAvatarGoblinId: currentUser.avatarGoblinId,
      authorRole: currentUser.role,
      content,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      upvotedUserIds: [],
      isAccepted: false,
      codeSnippet
    };

    setReplies((prev) => [...prev, newReply]);
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, repliesCount: p.repliesCount + 1 } : p))
    );
    awardXP(30, 'Shared a helpful answer in Discussion Arena.');
    addToast({
      type: 'success',
      title: 'Reply Submitted!',
      description: 'Your insight has been posted.'
    });
  };

  const acceptReply = (postId: string, replyId: string) => {
    setReplies((prev) =>
      prev.map((r) => (r.postId === postId ? { ...r, isAccepted: r.id === replyId } : r))
    );
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, solved: true, acceptedReplyId: replyId } : p))
    );

    const winningReply = replies.find((r) => r.id === replyId);
    if (winningReply && winningReply.authorId === currentUser?.id) {
      awardXP(100, 'Your answer was marked as the Accepted Solution!');
    }

    addToast({
      type: 'achievement',
      title: 'Accepted Solution Marked!',
      description: 'This thread is marked solved to help future learners.'
    });
  };

  const toggleSavePost = (postId: string) => {
    if (!currentUser) return;
    const saved = currentUser.savedPostIds || [];
    const isSaved = saved.includes(postId);
    const updated = isSaved ? saved.filter((id) => id !== postId) : [...saved, postId];
    updateProfile({ savedPostIds: updated });
    addToast({
      type: 'info',
      title: isSaved ? 'Post Removed' : 'Post Saved',
      description: isSaved ? 'Removed from saved items' : 'Saved to your profile bookmarks'
    });
  };

  const createProject = (projectData: Omit<ProjectShowcase, 'id' | 'likes' | 'likedUserIds' | 'createdAt'>) => {
    if (!currentUser) return;
    const newProj: ProjectShowcase = {
      ...projectData,
      id: `proj_${Date.now()}`,
      createdAt: new Date().toISOString(),
      likes: 1,
      likedUserIds: [currentUser.id]
    };
    setProjects((prev) => [newProj, ...prev]);
    awardXP(150, 'Forged and published a new project to Projects Showcase!');
    
    // Add to activity feed
    setActivityFeed((prev) => [
      {
        id: `act_${Date.now()}`,
        type: 'project',
        actorName: currentUser.displayName,
        actorGoblinId: currentUser.avatarGoblinId,
        actionText: 'launched a new prototype in Project Forge:',
        targetText: `${newProj.title} — ${newProj.tagline}`,
        timestamp: 'Just now'
      },
      ...prev
    ]);

    addToast({
      type: 'success',
      title: 'Project Forged!',
      description: 'Your project is now in the showcase gallery.'
    });
  };

  const likeProject = (projectId: string) => {
    if (!currentUser) return;
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        const hasLiked = p.likedUserIds.includes(currentUser.id);
        const likedUserIds = hasLiked
          ? p.likedUserIds.filter((id) => id !== currentUser.id)
          : [...p.likedUserIds, currentUser.id];
        return {
          ...p,
          likes: hasLiked ? p.likes - 1 : p.likes + 1,
          likedUserIds
        };
      })
    );
  };

  const toggleSaveProject = (projectId: string) => {
    if (!currentUser) return;
    const saved = currentUser.savedProjectIds || [];
    const isSaved = saved.includes(projectId);
    const updated = isSaved ? saved.filter((id) => id !== projectId) : [...saved, projectId];
    updateProfile({ savedProjectIds: updated });
    addToast({
      type: 'info',
      title: isSaved ? 'Project Removed' : 'Project Bookmarked',
      description: isSaved ? 'Removed from saved items' : 'Added to your bookmarked projects'
    });
  };

  const registerForEvent = (eventId: string) => {
    if (!currentUser) return;
    setHackathons((prev) =>
      prev.map((h) => {
        if (h.id !== eventId) return h;
        const already = h.registeredUserIds.includes(currentUser.id);
        if (already) return h;
        return {
          ...h,
          registeredUserIds: [...h.registeredUserIds, currentUser.id]
        };
      })
    );
    awardXP(80, 'Registered for official community event/hackathon!');
    addToast({
      type: 'success',
      title: 'Registration Confirmed!',
      description: 'You are registered. Check Teams & Collaboration to form your squad.'
    });
  };

  const createSquad = (squadData: Omit<Squad, 'id' | 'createdAt' | 'chatMessages'>) => {
    const newSquad: Squad = {
      ...squadData,
      id: `squad_${Date.now()}`,
      createdAt: new Date().toISOString(),
      chatMessages: [
        {
          id: `m_${Date.now()}`,
          authorName: squadData.leaderName,
          authorGoblinId: squadData.leaderGoblinId,
          message: `Squad ${squadData.name} initialized for ${squadData.targetEventOrProject}!`,
          timestamp: 'Just now'
        }
      ]
    };
    setSquads((prev) => [newSquad, ...prev]);
    awardXP(100, 'Created a collaboration team in Teams & Collaboration!');
    addToast({
      type: 'success',
      title: 'Squad Created!',
      description: 'Open for peer builders to apply.'
    });
  };

  const joinSquad = (squadId: string) => {
    if (!currentUser) return;
    setSquads((prev) =>
      prev.map((s) => {
        if (s.id !== squadId) return s;
        const exists = s.members.some((m) => m.userId === currentUser.id);
        if (exists || s.members.length >= s.maxMembers) return s;
        return {
          ...s,
          members: [
            ...s.members,
            {
              userId: currentUser.id,
              name: currentUser.displayName,
              role: currentUser.preferredRoles[0] || 'Apprentice Builder',
              goblinId: currentUser.avatarGoblinId
            }
          ]
        };
      })
    );
    awardXP(80, 'Joined a collaboration squad!');
    addToast({
      type: 'success',
      title: 'Joined Squad!',
      description: 'You have been added to the squad roster.'
    });
  };

  const updateSquadTaskStatus = (squadId: string, taskId: string, newStatus: 'todo' | 'in_progress' | 'done') => {
    setSquads((prev) =>
      prev.map((s) => {
        if (s.id !== squadId) return s;
        return {
          ...s,
          tasks: s.tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
        };
      })
    );
  };

  const addSquadTask = (squadId: string, title: string, priority: 'High' | 'Medium' | 'Low' = 'Medium', deadline: string = 'Soon', assigneeName?: string) => {
    setSquads((prev) =>
      prev.map((s) => {
        if (s.id !== squadId) return s;
        return {
          ...s,
          tasks: [
            ...s.tasks,
            { id: `task_${Date.now()}`, title, status: 'todo', priority, deadline, assigneeName: assigneeName || 'Unassigned' }
          ]
        };
      })
    );
  };

  const sendSquadMessage = (squadId: string, message: string) => {
    if (!currentUser || !message.trim()) return;
    setSquads((prev) =>
      prev.map((s) => {
        if (s.id !== squadId) return s;
        return {
          ...s,
          chatMessages: [
            ...s.chatMessages,
            {
              id: `msg_${Date.now()}`,
              authorName: currentUser.displayName,
              authorGoblinId: currentUser.avatarGoblinId,
              message: message.trim(),
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]
        };
      })
    );
  };

  const applyToRecruitment = (listingId: string) => {
    addToast({
      type: 'success',
      title: 'Application Dispatched!',
      description: 'Your profile was forwarded to the squad leader.'
    });
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast({
      type: 'info',
      title: 'All Caught Up!',
      description: 'All notifications marked as read.'
    });
  };

  const updateUserRole = (userId: string, newRole: UserRole) => {
    setAllUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    if (currentUser && currentUser.id === userId) {
      setCurrentUser((prev) => (prev ? { ...prev, role: newRole } : null));
    }
    addToast({
      type: 'success',
      title: 'Role Updated',
      description: `User role changed to ${newRole}.`
    });
  };

  const deletePost = (postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    addToast({
      type: 'info',
      title: 'Post Removed',
      description: 'Post was moderated and removed by Admin.'
    });
  };

  const toggleFeatureProject = (projectId: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, featured: !p.featured } : p))
    );
    addToast({
      type: 'success',
      title: 'Project Status Updated',
      description: 'Featured showcase flag toggled.'
    });
  };

  const addAuditLog = (action: string, target: string, status: 'success' | 'warning' | 'info' = 'info') => {
    const newLog: AuditLogEntry = {
      id: `log_${Date.now()}`,
      actorName: currentUser?.displayName || 'Clan Admin',
      actorRole: currentUser?.role || 'Administrator',
      action,
      target,
      timestamp: new Date().toISOString(),
      status
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const downloadResource = (resourceId: string) => {
    setResources((prev) =>
      prev.map((r) => (r.id === resourceId ? { ...r, downloadsCount: r.downloadsCount + 1 } : r))
    );
    setDownloadedResourceIds((prev) => (prev.includes(resourceId) ? prev : [...prev, resourceId]));
    awardXP(25, 'Downloaded starter kit / blueprint from Resources Store!');
    addToast({
      type: 'success',
      title: 'Resource Unlocked & Saved!',
      description: 'Blueprint ready. Added to your download history.'
    });
    addAuditLog('RESOURCE_DOWNLOADED', `Resource ID: ${resourceId}`, 'info');
  };

  const approveProject = (projectId: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, moderationStatus: 'approved' } : p))
    );
    addToast({
      type: 'achievement',
      title: 'Project Approved for Showcase!',
      description: 'The project is now publicly visible in Project Forge.'
    });
    addAuditLog('PROJECT_APPROVED', `Project ID: ${projectId}`, 'success');
  };

  const rejectProject = (projectId: string, reason?: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, moderationStatus: 'rejected' } : p))
    );
    addToast({
      type: 'info',
      title: 'Submission Status Updated',
      description: reason || 'Project marked for revision with feedback.'
    });
    addAuditLog('PROJECT_REJECTED', `Project ID: ${projectId}`, 'warning');
  };

  const createEvent = (eventData: Omit<HackathonEvent, 'id' | 'registeredUserIds'>) => {
    const newEvent: HackathonEvent = {
      ...eventData,
      id: `event_${Date.now()}`,
      registeredUserIds: currentUser ? [currentUser.id] : []
    };
    setHackathons((prev) => [newEvent, ...prev]);
    addToast({
      type: 'success',
      title: 'New Event / Workshop Published!',
      description: `${newEvent.title} is now live on the calendar.`
    });
    addAuditLog('EVENT_CREATED', `Event: ${newEvent.title}`, 'success');
  };

  const registerForWorkshopWithPayment = (eventId: string, isPaid: boolean, amountInr = 0) => {
    if (!currentUser) return;
    setHackathons((prev) =>
      prev.map((h) => {
        if (h.id !== eventId) return h;
        if (h.registeredUserIds.includes(currentUser.id)) return h;
        return { ...h, registeredUserIds: [...h.registeredUserIds, currentUser.id] };
      })
    );
    awardXP(isPaid ? 150 : 75, isPaid ? 'Registered for Masterclass Workshop!' : 'Secured seat in Community Workshop!');
    addToast({
      type: 'achievement',
      title: isPaid ? 'Payment Confirmed & Seat Locked!' : 'Workshop Seat Reserved!',
      description: `Order #CG-${Date.now().toString().slice(-6)} verified. Digital pass generated.`
    });
    addAuditLog('WORKSHOP_REGISTRATION', `User: ${currentUser.displayName} -> ${eventId} (${isPaid ? `₹${amountInr} Paid` : 'Free'})`, 'success');
  };

  const createRoadmap = (roadmapData: Omit<LearningRoadmap, 'id'>) => {
    const newRoadmap: LearningRoadmap = {
      ...roadmapData,
      id: `roadmap_${Date.now()}`,
      publishedBy: currentUser?.displayName || 'Admin Akshat Vats',
      createdAt: new Date().toISOString()
    };
    setRoadmaps((prev) => {
      const updated = [newRoadmap, ...prev];
      saveStored('roadmaps', updated);
      return updated;
    });
    addAuditLog('ROADMAP_CREATED', `Admin published study track: ${roadmapData.title}`, 'success');
    addToast({
      type: 'success',
      title: 'Study Track Published!',
      description: `"${roadmapData.title}" is now available for all students to study.`
    });
  };

  const deleteRoadmap = (roadmapId: string) => {
    setRoadmaps((prev) => {
      const updated = prev.filter((r) => r.id !== roadmapId);
      saveStored('roadmaps', updated);
      return updated;
    });
    addAuditLog('ROADMAP_DELETED', `Deleted study track #${roadmapId}`, 'warning');
    addToast({
      type: 'info',
      title: 'Study Track Removed',
      description: 'The roadmap was archived from the curriculum.'
    });
  };

  const addRoadmapStep = (roadmapId: string, step: LearningStep) => {
    setRoadmaps((prev) => {
      const updated = prev.map((r) =>
        r.id === roadmapId ? { ...r, steps: [...r.steps, step] } : r
      );
      saveStored('roadmaps', updated);
      return updated;
    });
    addAuditLog('ROADMAP_STEP_ADDED', `Added module "${step.title}" to track #${roadmapId}`, 'success');
    addToast({
      type: 'success',
      title: 'Study Chapter Added!',
      description: `Added "${step.title}" to study material.`
    });
  };

  const updateRoadmap = (roadmapId: string, updated: Partial<LearningRoadmap>) => {
    setRoadmaps((prev) => {
      const next = prev.map((r) => (r.id === roadmapId ? { ...r, ...updated } : r));
      saveStored('roadmaps', next);
      return next;
    });
    addToast({
      type: 'success',
      title: 'Curriculum Updated',
      description: 'Changes to study material saved successfully.'
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        activePage,
        selectedPostId,
        selectedProjectId,
        selectedMemberId,
        toasts,
        completedQuestIds,
        completedLessonIds,
        allUsers,
        posts,
        replies,
        projects,
        hackathons,
        squads,
        notifications,
        announcements,
        activityFeed,
        recruitmentListings,
        roadmaps,
        quests: INITIAL_QUESTS,
        achievements: INITIAL_ACHIEVEMENTS,
        isSearchModalOpen,
        isAuthModalOpen,
        isOnboardingModalOpen,
        levelUpData,
        navigateTo,
        setIsSearchModalOpen,
        setIsAuthModalOpen,
        setIsOnboardingModalOpen,
        closeLevelUpModal,
        loginAs,
        logout,
        updateProfile,
        completeOnboarding,
        awardXP,
        completeQuest,
        toggleCompleteLesson,
        createPost,
        upvotePost,
        addReply,
        acceptReply,
        toggleSavePost,
        createProject,
        likeProject,
        toggleSaveProject,
        registerForEvent,
        createSquad,
        joinSquad,
        updateSquadTaskStatus,
        addSquadTask,
        sendSquadMessage,
        applyToRecruitment,
        markNotificationRead,
        markAllNotificationsRead,
        resources,
        downloadedResourceIds,
        downloadResource,
        registerForWorkshopWithPayment,
        createEvent,
        auditLogs,
        addAuditLog,
        approveProject,
        rejectProject,
        updateUserRole,
        deletePost,
        toggleFeatureProject,
        createRoadmap,
        deleteRoadmap,
        addRoadmapStep,
        updateRoadmap
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
