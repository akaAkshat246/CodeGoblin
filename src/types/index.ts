export type UserRole = 'Guest' | 'Member' | 'Moderator' | 'Event Organizer' | 'Mentor' | 'Administrator';

export type GoblinArchetype =
  | 'Leader'
  | 'Architect'
  | 'Creator'
  | 'Competitor'
  | 'Strategist'
  | 'Debugger'
  | 'Builder'
  | 'Explorer'
  | 'Hacker';

export interface GoblinCharacter {
  id: number;
  name: string;
  roleTitle: string;
  archetype: GoblinArchetype;
  motto: string;
  quote: string;
  personality: string;
  responsibilities: string[];
  associatedActivities: string[];
  avatarImg: string;
  cardImg: string;
  badgeColor: string;
  rpgPerks: string[];
}

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatarGoblinId: number;
  archetype: GoblinArchetype;
  role: UserRole;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streakDays: number;
  longestStreak: number;
  rankChange?: number; // e.g. +2, 0, -1
  lastActiveDate: string; // ISO date string
  college?: string;
  yearOfStudy?: string;
  bio: string;
  githubUrl?: string;
  portfolioUrl?: string;
  skills: string[];
  interests: string[];
  preferredRoles: string[];
  achievements: string[]; // achievement IDs
  isMentor: boolean;
  mentorBio?: string;
  reputationScore: number;
  savedPostIds: string[];
  savedProjectIds: string[];
  completedLessonIds?: string[];
  isAvailableForHireOrTeams?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'onboarding' | 'coding' | 'community' | 'hackathon' | 'streak';
  xpReward: number;
  unlockedAt?: string;
  rarity?: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

export interface Quest {
  id: string;
  trackId: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  xpReward: number;
  estimatedMinutes: number;
  category: string;
  objectives: string[];
  resources: { title: string; url: string }[];
  assignmentPrompt: string;
  isDailyQuest?: boolean;
}

export interface LearningStep {
  title: string;
  description: string;
  resourceTitle?: string;
  resourceUrl?: string;
}

export interface LearningRoadmap {
  id: string;
  title: string;
  description: string;
  goblinRoleId: number;
  archetype: GoblinArchetype;
  icon: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  estimatedHours: string;
  steps: LearningStep[];
  tags: string[];
}

export interface DiscussionPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatarGoblinId: number;
  authorRole: UserRole;
  category: string;
  tags: string[];
  createdAt: string;
  upvotes: number;
  upvotedUserIds: string[];
  repliesCount: number;
  solved: boolean;
  acceptedReplyId?: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
}

export interface DiscussionReply {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatarGoblinId: number;
  authorRole: UserRole;
  content: string;
  createdAt: string;
  upvotes: number;
  upvotedUserIds: string[];
  isAccepted: boolean;
  codeSnippet?: {
    language: string;
    code: string;
  };
}

export interface ProjectShowcase {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problemStatement: string;
  solution: string;
  coverImage: string;
  authorId: string;
  authorName: string;
  authorAvatarGoblinId: number;
  techStack: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  category: string;
  contributors: { name: string; role: string; goblinId: number }[];
  status: 'In Progress' | 'Shipped' | 'Looking for Teammates';
  likes: number;
  likedUserIds: string[];
  createdAt: string;
  featured?: boolean;
}

export interface HackathonEvent {
  id: string;
  title: string;
  organizer: string;
  type: 'Hackathon' | 'Workshop' | 'Dev Sprint' | 'Code Jam';
  format: 'Online' | 'In-Person' | 'Hybrid';
  location?: string;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  prizePool: string;
  officialUrl: string;
  requiredSkills: string[];
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  teamSize: string;
  description: string;
  bannerImage: string;
  registeredUserIds: string[];
}

export interface SquadTask {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'High' | 'Medium' | 'Low';
  deadline?: string;
  assigneeName?: string;
}

export interface SquadChatMessage {
  id: string;
  authorName: string;
  authorGoblinId: number;
  message: string;
  timestamp: string;
}

export interface Squad {
  id: string;
  name: string;
  description: string;
  leaderId: string;
  leaderName: string;
  leaderGoblinId: number;
  targetEventOrProject: string;
  neededRoles: string[];
  members: { userId: string; name: string; role: string; goblinId: number }[];
  maxMembers: number;
  tags: string[];
  tasks: SquadTask[];
  chatMessages: SquadChatMessage[];
  isOpen: boolean;
  createdAt: string;
}

export interface TeamRecruitmentListing {
  id: string;
  squadId: string;
  squadName: string;
  roleTitle: string;
  requiredSkills: string[];
  pitch: string;
  urgency: 'High' | 'Normal';
  targetEvent: string;
  createdAt: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  authorName: string;
  authorTitle: string;
  authorAvatarGoblinId: number;
  isPinned: boolean;
  createdAt: string;
  category: 'Community' | 'Hackathon' | 'Feature' | 'Partnership';
  badge: string;
}

export interface ActivityFeedItem {
  id: string;
  type: 'project' | 'quest' | 'squad' | 'achievement' | 'hackathon' | 'discussion';
  actorName: string;
  actorGoblinId: number;
  actionText: string;
  targetText: string;
  timestamp: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  type: 'quest' | 'achievement' | 'reply' | 'squad' | 'event' | 'admin' | 'announcement';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}
