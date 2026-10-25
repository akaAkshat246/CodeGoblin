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
  Achievement
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
  GOBLIN_CHARACTERS
} from '../data/mockData';

export type NavigationPage =
  | 'landing'
  | 'dashboard'
  | 'discover'
  | 'discussions'
  | 'discussion_detail'
  | 'quests'
  | 'projects'
  | 'project_detail'
  | 'hackathons'
  | 'squads'
  | 'leaderboards'
  | 'members'
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
  allUsers: UserProfile[];
  posts: DiscussionPost[];
  replies: DiscussionReply[];
  projects: ProjectShowcase[];
  hackathons: HackathonEvent[];
  squads: Squad[];
  notifications: NotificationItem[];
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

  // Squads
  createSquad: (squad: Omit<Squad, 'id' | 'createdAt'>) => void;
  joinSquad: (squadId: string) => void;
  updateSquadTaskStatus: (squadId: string, taskId: string, newStatus: 'todo' | 'in_progress' | 'done') => void;
  addSquadTask: (squadId: string, title: string, assigneeName?: string) => void;

  // Notifications
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Admin
  updateUserRole: (userId: string, newRole: UserRole) => void;
  deletePost: (postId: string) => void;
  toggleFeatureProject: (projectId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // LocalStorage helpers
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

  // State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() =>
    loadStored<UserProfile | null>('currentUser', INITIAL_MEMBERS[0])
  );
  const [activePage, setActivePage] = useState<NavigationPage>('dashboard');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

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
  const [completedQuestIds, setCompletedQuestIds] = useState<string[]>(() =>
    loadStored<string[]>('completedQuestIds', [])
  );

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [levelUpData, setLevelUpData] = useState<{ newLevel: number; oldLevel: number } | null>(null);

  // Sync to storage
  useEffect(() => saveStored('currentUser', currentUser), [currentUser]);
  useEffect(() => saveStored('users', allUsers), [allUsers]);
  useEffect(() => saveStored('posts', posts), [posts]);
  useEffect(() => saveStored('replies', replies), [replies]);
  useEffect(() => saveStored('projects', projects), [projects]);
  useEffect(() => saveStored('hackathons', hackathons), [hackathons]);
  useEffect(() => saveStored('squads', squads), [squads]);
  useEffect(() => saveStored('notifications', notifications), [notifications]);
  useEffect(() => saveStored('completedQuestIds', completedQuestIds), [completedQuestIds]);

  // Toast Helper
  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  // Navigation
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // XP & Gamification Engine
  const calculateLevel = (xp: number) => {
    // Level formula: level 1 is 0, level 2 is 300, level 3 is 700, etc.
    return Math.floor(Math.sqrt(xp / 60)) + 1;
  };

  const awardXP = (amount: number, reason: string) => {
    if (!currentUser) return;
    const oldXP = currentUser.xp;
    const newXP = oldXP + amount;
    const oldLevel = calculateLevel(oldXP);
    const newLevel = calculateLevel(newXP);
    const nextLevelXP = Math.pow(newLevel, 2) * 60;

    // Check if new achievements unlocked
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

    // Check for level up
    if (newLevel > oldLevel) {
      setLevelUpData({ newLevel, oldLevel });
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      addToast({
        type: 'achievement',
        title: `LEVEL UP! Level ${newLevel}`,
        description: `You are now a Level ${newLevel} Goblin Builder! New perks unlocked.`
      });
    }
  };

  const closeLevelUpModal = () => setLevelUpData(null);

  // Complete Quest
  const completeQuest = (questId: string) => {
    if (completedQuestIds.includes(questId)) {
      addToast({
        type: 'info',
        title: 'Already Completed',
        description: 'You have already claimed the XP for this quest.'
      });
      return;
    }

    const targetQuest = INITIAL_QUESTS.find((q) => q.id === questId);
    if (!targetQuest) return;

    setCompletedQuestIds((prev) => [...prev, questId]);
    awardXP(targetQuest.xpReward, `Completed quest: ${targetQuest.title}`);

    // Extend streak if not active today
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
          title: `Streak Extended: ${newStreak} Days! 🔥`,
          description: 'Keep the momentum going in Asia/Kolkata timezone.'
        });
      }
    }
  };

  // Auth Operations
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
      role: 'Member',
      level: 1,
      xp: 150,
      xpToNextLevel: 300,
      streakDays: 1,
      longestStreak: 1,
      lastActiveDate: new Date().toISOString(),
      college: data.college || 'Engineering College',
      yearOfStudy: data.yearOfStudy || '1st Year B.Tech',
      bio: data.bio || 'New goblin ready to learn, form squads, and build real projects.',
      githubUrl: data.githubUrl || '',
      portfolioUrl: data.portfolioUrl || '',
      skills: data.skills && data.skills.length > 0 ? data.skills : ['JavaScript', 'HTML/CSS', 'Python'],
      interests: data.interests && data.interests.length > 0 ? data.interests : ['Web Development', 'Vibe Coding'],
      preferredRoles: data.preferredRoles || ['Learner & Builder'],
      achievements: ['first_spawn'],
      isMentor: false,
      reputationScore: 50,
      savedPostIds: [],
      savedProjectIds: []
    };

    setCurrentUser(newUser);
    setAllUsers((prev) => [newUser, ...prev]);
    setIsOnboardingModalOpen(false);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    addToast({
      type: 'achievement',
      title: 'Achievement Unlocked: First Spawn! 🥚',
      description: 'Welcome to CodeGoblins! Your journey begins now. +150 XP awarded.'
    });

    navigateTo('dashboard');
  };

  // Discussions Logic
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
    awardXP(50, 'Published a thoughtful community post in The Goblin Den.');
    addToast({
      type: 'success',
      title: 'Post Published!',
      description: 'Your discussion is now visible to the community.'
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
    awardXP(30, 'Shared a helpful answer in The Goblin Den.');
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
      awardXP(100, 'Your answer was marked as the Accepted Solution! 🧠');
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

  // Projects Logic
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
    awardXP(150, 'Forged and published a new project to Project Forge!');
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

  // Hackathons
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
      title: 'Registration Confirmed! 🏆',
      description: 'You are registered. Check Squads to form or join your team.'
    });
  };

  // Squads
  const createSquad = (squadData: Omit<Squad, 'id' | 'createdAt'>) => {
    const newSquad: Squad = {
      ...squadData,
      id: `squad_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setSquads((prev) => [newSquad, ...prev]);
    awardXP(100, 'Created a collaboration squad in Team Finder!');
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
      title: 'Joined Squad! 🤝',
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

  const addSquadTask = (squadId: string, title: string, assigneeName?: string) => {
    setSquads((prev) =>
      prev.map((s) => {
        if (s.id !== squadId) return s;
        return {
          ...s,
          tasks: [
            ...s.tasks,
            { id: `task_${Date.now()}`, title, status: 'todo', assigneeName: assigneeName || 'Unassigned' }
          ]
        };
      })
    );
  };

  // Notifications
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

  // Admin capabilities
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
        allUsers,
        posts,
        replies,
        projects,
        hackathons,
        squads,
        notifications,
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
        markNotificationRead,
        markAllNotificationsRead,
        updateUserRole,
        deletePost,
        toggleFeatureProject
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
