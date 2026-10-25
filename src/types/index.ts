export type UserRole = 'Member' | 'Moderator' | 'Event Organizer' | 'Mentor' | 'Administrator';

export interface GoblinCharacter {
  id: number;
  name: string;
  roleTitle: string;
  motto: string;
  quote: string;
  personality: string;
  responsibilities: string[];
  associatedActivities: string[];
  avatarImg: string;
  cardImg: string;
  badgeColor: string;
}

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatarGoblinId: number;
  role: UserRole;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streakDays: number;
  longestStreak: number;
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
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'onboarding' | 'coding' | 'community' | 'hackathon' | 'streak';
  xpReward: number;
  unlockedAt?: string;
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

export interface LearningTrack {
  id: string;
  title: string;
  description: string;
  goblinRoleId: number;
  icon: string;
  level: string;
  totalQuests: number;
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
  assigneeName?: string;
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
  isOpen: boolean;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  type: 'quest' | 'achievement' | 'reply' | 'squad' | 'event' | 'admin';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}
