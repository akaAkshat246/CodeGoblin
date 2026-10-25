import {
  GoblinCharacter,
  UserProfile,
  Achievement,
  LearningTrack,
  Quest,
  DiscussionPost,
  DiscussionReply,
  ProjectShowcase,
  HackathonEvent,
  Squad,
  NotificationItem
} from '../types';

export const GOBLIN_CHARACTERS: GoblinCharacter[] = [
  {
    id: 1,
    name: "Sparky Ops",
    roleTitle: "Community & Operations Lead",
    motto: "People first, progress together.",
    quote: "Building the strongest goblin clan through relentless organization and open doors.",
    personality: "Hyper-organized, empathetic, voice of the community, master of logistics and welcoming every new coder.",
    responsibilities: [
      "Builds and manages the community",
      "Keeps things organized and running smoothly",
      "Handles communications and outreach channels",
      "Coordinates members, squads, and teams",
      "Ensures smooth operations across all events"
    ],
    associatedActivities: [
      "New member welcome circles",
      "Community AMAs & town halls",
      "Operations & Discord channel hygiene",
      "Cross-team sync & logistics"
    ],
    avatarImg: "/assets/goblins/goblin_1_avatar.jpg",
    cardImg: "/assets/goblins/role_1_card.jpg",
    badgeColor: "purple"
  },
  {
    id: 2,
    name: "Byte Wizard",
    roleTitle: "Technical Lead",
    motto: "Builds the foundation for bigger ideas.",
    quote: "Talk is cheap. Show me the clean architecture, the robust API, and the test suite.",
    personality: "Analytical, deep systems thinker, nocturnal coder, loves refactoring and unblocking tricky bugs.",
    responsibilities: [
      "Defines technical direction and standards",
      "Guides tech stack & cloud architecture",
      "Helps solve complex algorithmic & system problems",
      "Maintains code quality standards and CI/CD",
      "Mentors and supports developers across squads"
    ],
    associatedActivities: [
      "System design breakdowns",
      "Code review clinics",
      "Full-stack architecture sprints",
      "Vibe coding with LLM toolchains"
    ],
    avatarImg: "/assets/goblins/goblin_2_avatar.jpg",
    cardImg: "/assets/goblins/role_2_card.jpg",
    badgeColor: "green"
  },
  {
    id: 3,
    name: "Pixel Pixie",
    roleTitle: "Design & Creative Lead",
    motto: "Turns ideas into beautiful experiences.",
    quote: "If the UX hurts the eyes, the backend doesn't matter. Good design is goblin sorcery.",
    personality: "Aesthetic perfectionist, typography nerd, passionate about micro-animations and dark neon palettes.",
    responsibilities: [
      "Creates visual identity and design system",
      "Builds graphics, UI/UX, and branding kits",
      "Designs assets for events, posters, and hackathons",
      "Maintains creative consistency across all pages",
      "Brings abstract ideas to life visually"
    ],
    associatedActivities: [
      "Figma UI teardowns & redesign challenges",
      "Design system tokens workshop",
      "User research and micro-interaction polish",
      "Hackathon pitch deck design"
    ],
    avatarImg: "/assets/goblins/goblin_3_avatar.jpg",
    cardImg: "/assets/goblins/role_3_card.jpg",
    badgeColor: "purple"
  },
  {
    id: 4,
    name: "Blitz Victor",
    roleTitle: "Hackathon & Events Lead",
    motto: "Brings people together through amazing events.",
    quote: "36 hours of energy, caffeine, and zero doubt. We don't just participate; we win podiums.",
    personality: "High-voltage hype generator, stage presence, strategist, helps students formulate winning pitch decks.",
    responsibilities: [
      "Organizes hackathons, dev jams, and build sprints",
      "Plans and manages event logistics and prize tracks",
      "Connects with external hackathon partners and sponsors",
      "Coordinates with judging teams and industry mentors",
      "Ensures smooth execution from kickoff to demo day"
    ],
    associatedActivities: [
      "Hackathon squad drafting nights",
      "Pitch dry-runs with live judges",
      "Speed hackathon prototype prep",
      "Prize bounty strategy breakdowns"
    ],
    avatarImg: "/assets/goblins/goblin_4_avatar.jpg",
    cardImg: "/assets/goblins/role_4_card.jpg",
    badgeColor: "green"
  },
  {
    id: 5,
    name: "Sterling Venture",
    roleTitle: "Business & Services Lead",
    motto: "Turns opportunities into real impact.",
    quote: "A project without users is a playground. A project with impact changes lives and builds companies.",
    personality: "Shrewd, charismatic, strategic, connects engineering students with enterprise clients and startup grants.",
    responsibilities: [
      "Explores collaboration and monetization opportunities",
      "Builds industry partnerships and service offerings",
      "Works on real-world impact and commercial ideas",
      "Connects with companies, incubators, and clients",
      "Helps create long-term value and community growth"
    ],
    associatedActivities: [
      "Startup grant applications",
      "Client dev contract matching",
      "Sponsorship outreach workshops",
      "Product monetization masterclasses"
    ],
    avatarImg: "/assets/goblins/goblin_5_avatar.jpg",
    cardImg: "/assets/goblins/role_5_card.jpg",
    badgeColor: "purple"
  },
  {
    id: 6,
    name: "Ledger Gremlin",
    roleTitle: "Finance & Administration Lead",
    motto: "Keeps the team running smoothly.",
    quote: "Transparent numbers make honest communities. Every rupee and cloud credit counts toward our mission.",
    personality: "Calculated, meticulous, spreadsheet virtuoso, ensures budgets and prize pools are 100% accountable.",
    responsibilities: [
      "Manages community finances and annual budgeting",
      "Tracks expenses, cloud credits, and event funds",
      "Handles resource approvals and hardware inventories",
      "Maintains financial records and transparent documentation",
      "Keeps the entire goblin ecosystem operational"
    ],
    associatedActivities: [
      "Cloud budget optimization labs",
      "Grant allocation and transparent ledger updates",
      "Hackathon prize distribution management",
      "Resource request reviews"
    ],
    avatarImg: "/assets/goblins/goblin_6_avatar.jpg",
    cardImg: "/assets/goblins/role_6_card.jpg",
    badgeColor: "green"
  },
  {
    id: 7,
    name: "Nova Builder",
    roleTitle: "Innovation & Project Lead",
    motto: "From idea to implementation.",
    quote: "Never let a brilliant idea rot in your notes app. Build the MVP this weekend.",
    personality: "Relentless experimenter, prototype fanatic, cross-functional bridge between designers and coders.",
    responsibilities: [
      "Drives new experimental ideas and internal products",
      "Identifies and nurtures promising community projects",
      "Coordinates cross-functional squads (Frontend, Backend, Design)",
      "Tracks progress through the Idea -> Plan -> Build -> Launch cycle",
      "Ensures projects create demonstrable real-world impact"
    ],
    associatedActivities: [
      "Weekend Build Challenges",
      "Project Forge curation and demo spotlights",
      "MVP architecture whiteboarding",
      "Product launch playbooks"
    ],
    avatarImg: "/assets/goblins/goblin_7_avatar.jpg",
    cardImg: "/assets/goblins/role_7_card.jpg",
    badgeColor: "purple"
  },
  {
    id: 8,
    name: "Sage Mentor",
    roleTitle: "Community Engagement & Mentorship Lead",
    motto: "Learn. Share. Grow. Together.",
    quote: "There are no stupid questions in the Goblin Den. What one learns today, they teach tomorrow.",
    personality: "Warm, encouraging, scholarly, passionate about unblocking beginners and organizing 1-on-1 mentorship.",
    responsibilities: [
      "Helps junior members learn foundational skills",
      "Organizes weekly peer-learning sessions and workshops",
      "Mentors juniors and onboarding new members",
      "Builds a supportive, safe, and inclusive builder culture",
      "Keeps the community active, motivated, and engaged"
    ],
    associatedActivities: [
      "First-Year survival guides & office hours",
      "Peer code pairing sessions",
      "Weekly AMA with senior engineers",
      "Community wellness and motivation check-ins"
    ],
    avatarImg: "/assets/goblins/goblin_8_avatar.jpg",
    cardImg: "/assets/goblins/role_8_card.jpg",
    badgeColor: "green"
  },
  {
    id: 9,
    name: "Echo Hype",
    roleTitle: "Marketing & Outreach Lead",
    motto: "Tells our story to the world.",
    quote: "If you built something awesome and didn't post about it, did it even happen? Let's make it legendary.",
    personality: "Social media maven, storytelling prodigy, camera-ready, captures the energy of student builders.",
    responsibilities: [
      "Promotes community achievements and upcoming events",
      "Creates viral content for Instagram, LinkedIn, and X",
      "Builds the CodeGoblins brand and online presence",
      "Connects with college clubs, tech societies, and colleges",
      "Engages with broader developer ecosystems and tech influencers"
    ],
    associatedActivities: [
      "Build-in-public LinkedIn bootcamps",
      "Hackathon highlight reels & behind-the-scenes reels",
      "College campus ambassador networks",
      "Podcast and member showcase interviews"
    ],
    avatarImg: "/assets/goblins/goblin_9_avatar.jpg",
    cardImg: "/assets/goblins/role_9_card.jpg",
    badgeColor: "purple"
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_spawn",
    title: "First Spawn",
    description: "Completed onboarding and joined the Goblin Den.",
    icon: "🥚",
    category: "onboarding",
    xpReward: 100
  },
  {
    id: "code_goblin",
    title: "Code Goblin",
    description: "Completed your first interactive programming quest.",
    icon: "⚡",
    category: "coding",
    xpReward: 250
  },
  {
    id: "idea_gremlin",
    title: "Idea Gremlin",
    description: "Submitted your first project or feature idea to the Forge.",
    icon: "💡",
    category: "coding",
    xpReward: 200
  },
  {
    id: "squad_builder",
    title: "Squad Builder",
    description: "Formed or joined a collaborative squad with peer builders.",
    icon: "🤝",
    category: "community",
    xpReward: 300
  },
  {
    id: "ship_it",
    title: "Ship It!",
    description: "Published a live working project with demo URL & GitHub.",
    icon: "🚀",
    category: "coding",
    xpReward: 500
  },
  {
    id: "hackathon_hunter",
    title: "Hackathon Hunter",
    description: "Registered for and formed a team for an official hackathon.",
    icon: "🏆",
    category: "hackathon",
    xpReward: 400
  },
  {
    id: "knowledge_keeper",
    title: "Knowledge Keeper",
    description: "Authored a reply marked as the Accepted Solution in Discussions.",
    icon: "🧠",
    category: "community",
    xpReward: 350
  },
  {
    id: "streak_guardian",
    title: "Streak Guardian",
    description: "Maintained a 7-day continuous learning & coding streak.",
    icon: "🔥",
    category: "streak",
    xpReward: 450
  },
  {
    id: "vibe_sorcerer",
    title: "Vibe Sorcerer",
    description: "Mastered AI-assisted vibe coding workflows to ship an MVP in under 24 hours.",
    icon: "✨",
    category: "coding",
    xpReward: 600
  }
];

export const LEARNING_TRACKS: LearningTrack[] = [
  {
    id: "vibe_coding",
    title: "Vibe Coding & AI-Assisted Dev",
    description: "Build full-stack applications at the speed of thought using AI code agents, prompt architectures, and rapid iteration.",
    goblinRoleId: 2,
    icon: "Sparkles",
    level: "All Levels",
    totalQuests: 6,
    tags: ["LLM Agents", "Prompt Engineering", "Full-Stack MVP", "Rapid Shipping"]
  },
  {
    id: "web_dev",
    title: "Modern Web Development",
    description: "Master modern React, TypeScript, Tailwind, state management, and production web deployment.",
    goblinRoleId: 3,
    icon: "Layout",
    level: "Beginner to Intermediate",
    totalQuests: 8,
    tags: ["React 19", "TypeScript", "Tailwind CSS", "API Design"]
  },
  {
    id: "ai_ml",
    title: "AI & Machine Learning",
    description: "From Python data pipelines to fine-tuning LLMs, RAG architectures, and deploying ML microservices.",
    goblinRoleId: 7,
    icon: "Cpu",
    level: "Intermediate",
    totalQuests: 7,
    tags: ["Python", "RAG", "Embeddings", "FastAPI"]
  },
  {
    id: "cloud_devops",
    title: "Cloud & DevOps Sprints",
    description: "Dockerize your apps, configure automated CI/CD pipelines, and deploy on modern cloud platforms.",
    goblinRoleId: 2,
    icon: "Cloud",
    level: "Intermediate",
    totalQuests: 5,
    tags: ["Docker", "GitHub Actions", "Kubernetes", "Supabase"]
  },
  {
    id: "dsa_cp",
    title: "DSA & Competitive Programming",
    description: "Crack coding interview patterns, dynamic programming, graphs, and conquer weekly algorithmic battles.",
    goblinRoleId: 2,
    icon: "Binary",
    level: "All Levels",
    totalQuests: 9,
    tags: ["Arrays", "Graphs", "DP", "LeetCode Master"]
  },
  {
    id: "open_source",
    title: "Open Source Contributions",
    description: "Learn Git workflows, locate good first issues, submit pull requests, and contribute to real-world repositories.",
    goblinRoleId: 1,
    icon: "GitPullRequest",
    level: "Beginner",
    totalQuests: 4,
    tags: ["Git", "GitHub", "Code Reviews", "OSS Culture"]
  },
  {
    id: "ui_ux",
    title: "UI/UX & Product Design",
    description: "Wireframing in Figma, design systems, visual hierarchy, micro-interactions, and accessibility standards.",
    goblinRoleId: 3,
    icon: "Palette",
    level: "Beginner to Intermediate",
    totalQuests: 5,
    tags: ["Figma", "Design Tokens", "Accessibility", "Prototyping"]
  },
  {
    id: "hackathon_prep",
    title: "Hackathon Champion Playbook",
    description: "Turn problem statements into winning prototypes, master pitch decks, and build judges' favorite demos in 36 hours.",
    goblinRoleId: 4,
    icon: "Trophy",
    level: "All Levels",
    totalQuests: 5,
    tags: ["Pitch Decks", "Rapid Prototyping", "Demo Polish", "Team Dynamics"]
  }
];

export const INITIAL_QUESTS: Quest[] = [
  {
    id: "quest_vibe_1",
    trackId: "vibe_coding",
    title: "Vibe Coding 101: Prompting an AI Agent",
    description: "Learn how to formulate structured, architectural prompts that guide AI agents to produce clean modular code rather than spaghetti.",
    level: "Beginner",
    xpReward: 150,
    estimatedMinutes: 30,
    category: "Vibe Coding",
    objectives: [
      "Understand context grounding and system prompts",
      "Specify API contracts and state requirements upfront",
      "Iteratively debug generated code without losing context"
    ],
    resources: [
      { title: "Prompt Engineering for Coders Guide", url: "https://docs.anthropic.com" },
      { title: "Vibe Coding Manifesto", url: "https://codegoblins.dev/vibe" }
    ],
    assignmentPrompt: "Draft an architectural spec for a student task-tracker app including schema, 3 UI screens, and API endpoints, and submit your prompt summary.",
    isDailyQuest: true
  },
  {
    id: "quest_web_1",
    trackId: "web_dev",
    title: "Build a Dark Mode Glassmorphic Component",
    description: "Design and implement a responsive, accessible card component using Tailwind CSS with subtle purple glows and hover physics.",
    level: "Beginner",
    xpReward: 200,
    estimatedMinutes: 45,
    category: "Web Development",
    objectives: [
      "Use modern Tailwind color schemes and arbitrary borders",
      "Ensure proper contrast and focus states",
      "Add interactive hover transforms with smooth bezier transitions"
    ],
    resources: [
      { title: "Tailwind CSS Official Documentation", url: "https://tailwindcss.com" }
    ],
    assignmentPrompt: "Create a React component snippet with JSX and Tailwind classes representing a Goblin Squad Card.",
    isDailyQuest: false
  },
  {
    id: "quest_dsa_1",
    trackId: "dsa_cp",
    title: "Daily Algo: Two Pointer Masterclass",
    description: "Solve a classic subarray sum or container problem using the two-pointer technique with optimal O(N) time and O(1) space.",
    level: "Intermediate",
    xpReward: 180,
    estimatedMinutes: 35,
    category: "DSA & CP",
    objectives: [
      "Identify two-pointer vs sliding-window problems",
      "Avoid redundant quadratic scans",
      "Handle edge cases with duplicate values"
    ],
    resources: [
      { title: "Two Pointers Pattern Reference", url: "https://leetcode.com" }
    ],
    assignmentPrompt: "Explain the pointer adjustment condition when current sum is less than target in a sorted array.",
    isDailyQuest: true
  },
  {
    id: "quest_hackathon_1",
    trackId: "hackathon_prep",
    title: "The 3-Minute Hackathon Pitch Formula",
    description: "Deconstruct winning pitch decks into: Hook -> Problem -> Live Demo -> Tech Wow-Factor -> Impact.",
    level: "Beginner",
    xpReward: 250,
    estimatedMinutes: 40,
    category: "Hackathons",
    objectives: [
      "Structure a narrative arc that grabs judges in the first 20 seconds",
      "Avoid live demo pitfalls with pre-recorded contingency clips",
      "Highlight student-driven real-world viability"
    ],
    resources: [
      { title: "Hackathon Winning Pitch Decks Archive", url: "https://devpost.com" }
    ],
    assignmentPrompt: "Write a 3-sentence elevator pitch for an AI tool that assists first-year engineering students with campus labs.",
    isDailyQuest: false
  },
  {
    id: "quest_oss_1",
    trackId: "open_source",
    title: "Fork, Branch, Commit & PR Mastery",
    description: "Configure your local Git upstream remote, create a feature branch, and write a conventional commit message.",
    level: "Beginner",
    xpReward: 150,
    estimatedMinutes: 25,
    category: "Open Source",
    objectives: [
      "Sync fork with upstream main branch",
      "Write semantic commits (feat, fix, docs, refactor)",
      "Open a clean pull request with issue link references"
    ],
    resources: [
      { title: "Conventional Commits Specification", url: "https://www.conventionalcommits.org" }
    ],
    assignmentPrompt: "Write out the 4 terminal git commands required to add an upstream remote and fetch its newest tags.",
    isDailyQuest: false
  }
];

export const INITIAL_POSTS: DiscussionPost[] = [
  {
    id: "post_1",
    title: "How I vibe coded my first hackathon MVP in 14 hours using modern agents",
    content: "During last weekend's hackathon, our 3-person squad decided to test pure vibe coding. Instead of manually writing 2,000 lines of boilerplate boilerplate, we defined our Postgres schema, drafted strict API specs, and let our agent generate endpoints while we focused on the core algorithmic sauce. Here's our exact prompt chain and what failed along the way!",
    authorId: "user_dev_1",
    authorName: "Arjun Verma",
    authorAvatarGoblinId: 2,
    authorRole: "Mentor",
    category: "Vibe Coding",
    tags: ["VibeCoding", "Hackathons", "React", "AI"],
    createdAt: "2026-10-24T18:30:00Z",
    upvotes: 42,
    upvotedUserIds: [],
    repliesCount: 3,
    solved: true,
    acceptedReplyId: "rep_1_1",
    codeSnippet: {
      language: "typescript",
      code: `// Prompt Spec Pattern for Agents:
interface AgentContext {
  role: "Senior Fullstack Engineer";
  constraints: ["TypeScript strict mode", "Zero any types", "Tailwind dark theme"];
  task: "Generate CRUD repository with optimistic UI mutations";
}`
    }
  },
  {
    id: "post_2",
    title: "Best resources for 1st year B.Tech students who want to build real projects outside syllabus?",
    content: "College currently teaches us basic Turbo C++ and theoretical physics. Where should a 1st year student start if the goal is to build full-stack web apps, contribute to open source, and enter hackathons by semester 3?",
    authorId: "user_newbie_1",
    authorName: "Priya Nair",
    authorAvatarGoblinId: 8,
    authorRole: "Member",
    category: "Introductions",
    tags: ["Beginner", "CollegeGuide", "Career", "WebDev"],
    createdAt: "2026-10-25T10:15:00Z",
    upvotes: 29,
    upvotedUserIds: [],
    repliesCount: 2,
    solved: false
  },
  {
    id: "post_3",
    title: "Deploying Supabase + Docker on a student budget: Zero cost architecture",
    content: "Sharing our tested deployment strategy for student builders. You can run self-hosted Postgres, storage buckets, and auth with automated backups on free tiers or micro VPS without burning your cloud credits.",
    authorId: "user_admin_1",
    authorName: "Rohan Das",
    authorAvatarGoblinId: 6,
    authorRole: "Administrator",
    category: "Cloud & DevOps",
    tags: ["DevOps", "Docker", "Supabase", "ZeroCost"],
    createdAt: "2026-10-23T14:00:00Z",
    upvotes: 38,
    upvotedUserIds: [],
    repliesCount: 1,
    solved: true,
    acceptedReplyId: "rep_3_1"
  }
];

export const INITIAL_REPLIES: DiscussionReply[] = [
  {
    id: "rep_1_1",
    postId: "post_1",
    authorId: "user_admin_1",
    authorName: "Rohan Das",
    authorAvatarGoblinId: 2,
    authorRole: "Administrator",
    content: "Great breakdown! The critical takeaway is specifying input/output data types before letting the AI write logic. That alone eliminates 80% of hallucinated interfaces.",
    createdAt: "2026-10-24T19:10:00Z",
    upvotes: 18,
    upvotedUserIds: [],
    isAccepted: true
  },
  {
    id: "rep_1_2",
    postId: "post_1",
    authorId: "user_newbie_1",
    authorName: "Priya Nair",
    authorAvatarGoblinId: 8,
    authorRole: "Member",
    content: "Did you use Vite or Next.js for the frontend during the sprint? We had hydration issues in our last attempt.",
    createdAt: "2026-10-24T20:45:00Z",
    upvotes: 4,
    upvotedUserIds: [],
    isAccepted: false
  },
  {
    id: "rep_3_1",
    postId: "post_3",
    authorId: "user_dev_1",
    authorName: "Arjun Verma",
    authorAvatarGoblinId: 7,
    authorRole: "Mentor",
    content: "We verified this setup in the recent 48-hr sprint. The automatic SSL via Caddy reverse proxy made deployment take under 5 minutes.",
    createdAt: "2026-10-23T15:30:00Z",
    upvotes: 12,
    upvotedUserIds: [],
    isAccepted: true
  }
];

export const INITIAL_PROJECTS: ProjectShowcase[] = [
  {
    id: "proj_1",
    title: "CampusRadar",
    tagline: "Live crowdsourced campus bus & shuttle tracker with arrival estimations",
    description: "Built by 3 second-year students to solve campus shuttle delays. Uses low-latency WebSocket pings and geofencing to give accurate arrival countdowns for college students.",
    problemStatement: "Students waste 25+ minutes waiting at campus gates without knowing if shuttle buses are operational or full.",
    solution: "A mobile-responsive PWA with driver GPS telemetry, peer check-ins, and automated schedule adjustments.",
    coverImage: "/assets/goblins/chaos_hero_poster.jpg",
    authorId: "user_dev_1",
    authorName: "Arjun Verma",
    authorAvatarGoblinId: 7,
    techStack: ["React", "TypeScript", "Tailwind", "Node.js", "WebSockets", "Leaflet"],
    githubUrl: "https://github.com/codegoblins/campus-radar",
    liveDemoUrl: "https://campusradar.demo.codegoblins.dev",
    category: "Full Stack & IoT",
    contributors: [
      { name: "Arjun Verma", role: "Fullstack Lead", goblinId: 7 },
      { name: "Tara Menon", role: "UI/UX Designer", goblinId: 3 },
      { name: "Kunal Shah", role: "Backend & Sockets", goblinId: 2 }
    ],
    status: "Shipped",
    likes: 64,
    likedUserIds: [],
    createdAt: "2026-10-20T12:00:00Z",
    featured: true
  },
  {
    id: "proj_2",
    title: "VibeDraft",
    tagline: "AI Hackathon pitch builder that creates interactive prototypes in minutes",
    description: "Takes raw ideas, generates user personas, competitive analysis, pitch slides, and an interactive clickable prototype.",
    problemStatement: "Engineering teams with great tech often lose hackathons due to mediocre pitch decks and poor visual storytelling.",
    solution: "Integrated LLM agent pipeline that crafts structured 3-minute pitch decks with exportable Tailwind mockup cards.",
    coverImage: "/assets/goblins/team_roles_poster.jpg",
    authorId: "user_admin_1",
    authorName: "Rohan Das",
    authorAvatarGoblinId: 4,
    techStack: ["React 19", "FastAPI", "Groq LLM", "Framer Motion", "Tailwind"],
    githubUrl: "https://github.com/codegoblins/vibedraft",
    liveDemoUrl: "https://vibedraft.demo.codegoblins.dev",
    category: "AI & Productivity",
    contributors: [
      { name: "Rohan Das", role: "AI Pipeline Lead", goblinId: 4 },
      { name: "Sneha Patel", role: "Frontend Architect", goblinId: 3 }
    ],
    status: "Looking for Teammates",
    likes: 51,
    likedUserIds: [],
    createdAt: "2026-10-22T14:30:00Z",
    featured: true
  },
  {
    id: "proj_3",
    title: "Algorunner Arena",
    tagline: "Real-time multiplayer code combat platform for college competitive coders",
    description: "Challenge your college peers to real-time 1v1 data structure battles with live execution sandboxes and test case visualization.",
    problemStatement: "Practicing LeetCode alone is monotonous and lacks the adrenaline of competitive teamwork.",
    solution: "Gamified duel lobby with live side-by-side execution, goblin avatars, and ranking ladders.",
    coverImage: "/assets/goblins/ownership_poster.jpg",
    authorId: "user_dev_1",
    authorName: "Arjun Verma",
    authorAvatarGoblinId: 2,
    techStack: ["Go", "React", "Docker Sandboxes", "PostgreSQL", "Tailwind"],
    githubUrl: "https://github.com/codegoblins/algorunner",
    category: "Competitive Programming",
    contributors: [
      { name: "Arjun Verma", role: "Execution Sandbox", goblinId: 2 },
      { name: "Vikram Sen", role: "Judge Engine", goblinId: 2 }
    ],
    status: "In Progress",
    likes: 39,
    likedUserIds: [],
    createdAt: "2026-10-24T09:00:00Z"
  }
];

export const INITIAL_HACKATHONS: HackathonEvent[] = [
  {
    id: "hack_1",
    title: "GoblinHacks 2026: Vibe & Build",
    organizer: "CodeGoblins Community Core",
    type: "Hackathon",
    format: "Online",
    startDate: "2026-11-14T09:00:00Z",
    endDate: "2026-11-16T18:00:00Z",
    registrationDeadline: "2026-11-10T23:59:59Z",
    prizePool: "₹1,50,000 + Cloud Grants",
    officialUrl: "https://goblinhacks.dev",
    requiredSkills: ["React / Next.js", "AI / LLMs", "UI/UX Design", "Pitch Craft"],
    status: "Upcoming",
    teamSize: "2 - 4 Members",
    description: "The flagship CodeGoblins hackathon for student builders. Build an audacious real-world software solution in 48 hours using vibe coding tools, open APIs, and rapid prototyping.",
    bannerImage: "/assets/goblins/chaos_hero_poster.jpg",
    registeredUserIds: ["user_current", "user_dev_1", "user_admin_1"]
  },
  {
    id: "hack_2",
    title: "Bengaluru Student DevSprint 2026",
    organizer: "Karnataka Tech Guild",
    type: "Hackathon",
    format: "Hybrid",
    location: "Koramangala, Bengaluru",
    startDate: "2026-11-28T08:00:00Z",
    endDate: "2026-11-29T20:00:00Z",
    registrationDeadline: "2026-11-20T23:59:59Z",
    prizePool: "₹2,00,000 + Incubator Fast-track",
    officialUrl: "https://devsprint.blr.dev",
    requiredSkills: ["Full Stack", "Mobile Apps", "Public Datasets", "Cloud"],
    status: "Upcoming",
    teamSize: "3 - 4 Members",
    description: "A high-intensity in-person building challenge addressing urban mobility, water intelligence, and campus productivity.",
    bannerImage: "/assets/goblins/ownership_poster.jpg",
    registeredUserIds: ["user_dev_1"]
  },
  {
    id: "hack_3",
    title: "Open Goblin Jam #4: AI Agents",
    organizer: "CodeGoblins Innovation Lab",
    type: "Code Jam",
    format: "Online",
    startDate: "2026-10-20T00:00:00Z",
    endDate: "2026-10-27T23:59:59Z",
    registrationDeadline: "2026-10-20T00:00:00Z",
    prizePool: "₹50,000 + Exclusive Badges",
    officialUrl: "https://jam.codegoblins.dev",
    requiredSkills: ["Python / TS", "Gemini / Claude API", "FastAPI"],
    status: "Ongoing",
    teamSize: "1 - 3 Members",
    description: "Build an autonomous developer tool or sidecar that simplifies daily coding tasks for college students.",
    bannerImage: "/assets/goblins/team_roles_poster.jpg",
    registeredUserIds: ["user_current"]
  }
];

export const INITIAL_SQUADS: Squad[] = [
  {
    id: "squad_1",
    name: "Terminal Titans",
    description: "Assembling a rapid-fire squad for GoblinHacks 2026. Target: building an AI-powered student research companion.",
    leaderId: "user_dev_1",
    leaderName: "Arjun Verma",
    leaderGoblinId: 2,
    targetEventOrProject: "GoblinHacks 2026",
    neededRoles: ["UI/UX Designer", "FastAPI / Python Specialist"],
    members: [
      { userId: "user_dev_1", name: "Arjun Verma", role: "Technical Lead", goblinId: 2 },
      { userId: "user_current", name: "You (Goblin Cadet)", role: "Frontend Builder", goblinId: 7 }
    ],
    maxMembers: 4,
    tags: ["GoblinHacks", "AI Companion", "FastAPI", "React"],
    tasks: [
      { id: "task_1", title: "Finalize problem statement and target persona", status: "done", assigneeName: "Arjun" },
      { id: "task_2", title: "Build UI wireframes in Figma with dark theme", status: "in_progress", assigneeName: "Designer Wanted" },
      { id: "task_3", title: "Setup FastAPI repo and Gemini API keys", status: "in_progress", assigneeName: "Arjun" },
      { id: "task_4", title: "Connect React frontend with WebSocket stream", status: "todo", assigneeName: "You" }
    ],
    isOpen: true,
    createdAt: "2026-10-23T11:00:00Z"
  },
  {
    id: "squad_2",
    name: "Campus Crafters",
    description: "Building production tools for college clubs and student fests. Looking for a passionate frontend developer and backend engineer.",
    leaderId: "user_admin_1",
    leaderName: "Rohan Das",
    leaderGoblinId: 1,
    targetEventOrProject: "College Event OS",
    neededRoles: ["Frontend Dev (Tailwind)", "Cloud & DevOps"],
    members: [
      { userId: "user_admin_1", name: "Rohan Das", role: "Ops & Product", goblinId: 1 },
      { userId: "user_member_3", name: "Tara Menon", role: "Creative Lead", goblinId: 3 }
    ],
    maxMembers: 4,
    tags: ["OpenSource", "CollegeClub", "FullStack"],
    tasks: [
      { id: "task_2_1", title: "Draft schema for QR badge ticket validation", status: "done", assigneeName: "Rohan" },
      { id: "task_2_2", title: "Design mobile ticket scanner screen", status: "done", assigneeName: "Tara" },
      { id: "task_2_3", title: "Implement offline sync with IndexedDB", status: "todo", assigneeName: "Open" }
    ],
    isOpen: true,
    createdAt: "2026-10-24T16:00:00Z"
  }
];

export const INITIAL_MEMBERS: UserProfile[] = [
  {
    id: "user_current",
    username: "goblin_cadet",
    displayName: "Cadet Builder",
    email: "cadet@codegoblins.dev",
    avatarGoblinId: 7,
    role: "Member",
    level: 3,
    xp: 680,
    xpToNextLevel: 1000,
    streakDays: 4,
    longestStreak: 9,
    lastActiveDate: "2026-10-25T15:00:00Z",
    college: "PES University, Bengaluru",
    yearOfStudy: "2nd Year B.Tech CSE",
    bio: "Passionate about vibe coding, building hackathon MVPs, and turning rough ideas into working software.",
    githubUrl: "https://github.com/goblin-cadet",
    portfolioUrl: "https://cadet.dev",
    skills: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Vibe Coding"],
    interests: ["Web Development", "AI/ML", "Hackathons", "Product Design"],
    preferredRoles: ["Frontend Builder", "Innovation & Project Lead"],
    achievements: ["first_spawn", "code_goblin"],
    isMentor: false,
    reputationScore: 140,
    savedPostIds: ["post_1"],
    savedProjectIds: ["proj_1"]
  },
  {
    id: "user_dev_1",
    username: "arjun_codes",
    displayName: "Arjun Verma",
    email: "arjun@codegoblins.dev",
    avatarGoblinId: 2,
    role: "Mentor",
    level: 8,
    xp: 3850,
    xpToNextLevel: 4500,
    streakDays: 19,
    longestStreak: 28,
    lastActiveDate: "2026-10-25T14:30:00Z",
    college: "RV College of Engineering",
    yearOfStudy: "3rd Year B.Tech",
    bio: "Technical Lead at CodeGoblins. Passionate about distributed systems, React 19, and building winning hackathon squads.",
    githubUrl: "https://github.com/arjun-verma",
    portfolioUrl: "https://arjunv.dev",
    skills: ["System Design", "React", "TypeScript", "FastAPI", "Docker", "Algorithms"],
    interests: ["Cloud & DevOps", "Vibe Coding", "Hackathons"],
    preferredRoles: ["Technical Lead", "Architecture Mentor"],
    achievements: ["first_spawn", "code_goblin", "idea_gremlin", "squad_builder", "ship_it", "hackathon_hunter", "streak_guardian"],
    isMentor: true,
    mentorBio: "Offering 1-on-1 weekly guidance on fullstack architecture, hackathon readiness, and unblocking tricky bugs.",
    reputationScore: 890,
    savedPostIds: [],
    savedProjectIds: []
  },
  {
    id: "user_admin_1",
    username: "rohan_lead",
    displayName: "Rohan Das",
    email: "rohan@codegoblins.dev",
    avatarGoblinId: 1,
    role: "Administrator",
    level: 10,
    xp: 5200,
    xpToNextLevel: 6000,
    streakDays: 34,
    longestStreak: 45,
    lastActiveDate: "2026-10-25T15:10:00Z",
    college: "BMS College of Engineering",
    yearOfStudy: "4th Year B.Tech",
    bio: "Community & Operations Lead. Helping first-year students navigate dev careers beyond traditional college lectures.",
    githubUrl: "https://github.com/rohandas",
    skills: ["Community Ops", "Cloud Architecture", "Product Management", "PostgreSQL"],
    interests: ["Open Source", "Career & Internships", "Business & Services"],
    preferredRoles: ["Community & Operations Lead", "Administrator"],
    achievements: ["first_spawn", "code_goblin", "idea_gremlin", "squad_builder", "ship_it", "knowledge_keeper", "streak_guardian", "vibe_sorcerer"],
    isMentor: true,
    mentorBio: "Mentoring students on internships, tech club leadership, and launching real products.",
    reputationScore: 1240,
    savedPostIds: [],
    savedProjectIds: []
  },
  {
    id: "user_member_3",
    username: "tara_pix",
    displayName: "Tara Menon",
    email: "tara@codegoblins.dev",
    avatarGoblinId: 3,
    role: "Member",
    level: 5,
    xp: 1950,
    xpToNextLevel: 2500,
    streakDays: 8,
    longestStreak: 14,
    lastActiveDate: "2026-10-25T11:00:00Z",
    college: "MS Ramaiah Institute of Technology",
    yearOfStudy: "2nd Year B.Tech",
    bio: "Design & Creative Lead goblin. Obsessed with dark UI, Framer Motion, and micro-animations.",
    githubUrl: "https://github.com/taramenon",
    portfolioUrl: "https://tara.design",
    skills: ["Figma", "UI/UX", "Tailwind CSS", "CSS Animations", "User Research"],
    interests: ["UI/UX and Product Design", "Web Development", "Hackathons"],
    preferredRoles: ["Design & Creative Lead"],
    achievements: ["first_spawn", "code_goblin", "idea_gremlin", "ship_it"],
    isMentor: true,
    mentorBio: "Happy to review student portfolios, Figma wireframes, and give actionable design feedback.",
    reputationScore: 420,
    savedPostIds: [],
    savedProjectIds: []
  },
  {
    id: "user_newbie_1",
    username: "priya_n",
    displayName: "Priya Nair",
    email: "priya@codegoblins.dev",
    avatarGoblinId: 8,
    role: "Member",
    level: 2,
    xp: 320,
    xpToNextLevel: 600,
    streakDays: 2,
    longestStreak: 3,
    lastActiveDate: "2026-10-25T10:15:00Z",
    college: "Dayananda Sagar College",
    yearOfStudy: "1st Year B.Tech",
    bio: "First-year student learning web dev, Git, and getting ready for my first hackathon sprint!",
    skills: ["HTML", "CSS", "Basic JavaScript", "Python"],
    interests: ["Web Development", "Vibe Coding", "Open Source"],
    preferredRoles: ["Learner", "Frontend Enthusiast"],
    achievements: ["first_spawn"],
    isMentor: false,
    reputationScore: 75,
    savedPostIds: [],
    savedProjectIds: []
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif_1",
    userId: "user_current",
    type: "quest",
    title: "Daily Quest Ready!",
    message: "Today's quest 'Vibe Coding 101' is live. Complete it to earn +150 XP and extend your streak.",
    timestamp: "2026-10-25T08:00:00Z",
    read: false,
    actionUrl: "quests"
  },
  {
    id: "notif_2",
    userId: "user_current",
    type: "squad",
    title: "Squad Invitation Confirmed",
    message: "Arjun Verma added you to the 'Terminal Titans' hackathon squad for GoblinHacks 2026.",
    timestamp: "2026-10-24T18:40:00Z",
    read: false,
    actionUrl: "squads"
  },
  {
    id: "notif_3",
    userId: "user_current",
    type: "achievement",
    title: "Achievement Unlocked!",
    message: "You unlocked 'Code Goblin' (+250 XP). Keep building and level up!",
    timestamp: "2026-10-23T16:00:00Z",
    read: true,
    actionUrl: "profile"
  }
];
