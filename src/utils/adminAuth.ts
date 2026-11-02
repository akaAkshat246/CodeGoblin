/**
 * CodeGoblins Admin Security & Special Mail ID Verification Authority
 * 
 * Defines authorized administrative email addresses, domain allowlists,
 * and multi-tier security clearances for privileged platform access.
 */

export interface AdminCredential {
  email: string;
  name: string;
  role: 'Administrator';
  archetype: string;
  clearanceLevel: 'Omega Level (Founder)' | 'Alpha Level (Core Steward)' | 'Beta Level (Operations Lead)';
  description: string;
  userId: string;
  avatarGoblinId: number;
}

export const AUTHORIZED_ADMIN_CREDENTIALS: AdminCredential[] = [
  {
    email: 'akshat.vats@codegoblins.dev',
    name: 'Akshat Vats',
    role: 'Administrator',
    archetype: 'Architect',
    clearanceLevel: 'Omega Level (Founder)',
    description: 'Co-Founder & Technical Steward. Full root platform clearance and architecture authority.',
    userId: 'user_akshat_vats',
    avatarGoblinId: 2
  },
  {
    email: 'akshat@codegoblins.in',
    name: 'Akshat Vats',
    role: 'Administrator',
    archetype: 'Architect',
    clearanceLevel: 'Omega Level (Founder)',
    description: 'Co-Founder & Technical Steward (Official Domain). Full root platform clearance.',
    userId: 'user_akshat_vats',
    avatarGoblinId: 2
  },
  {
    email: 'akshat.kumar@codegoblins.dev',
    name: 'Akshat Kumar',
    role: 'Administrator',
    archetype: 'Leader',
    clearanceLevel: 'Omega Level (Founder)',
    description: 'Co-Founder & Community Architect. Strategic governance, ecosystem partnerships, and clan ops.',
    userId: 'user_akshat_kumar',
    avatarGoblinId: 1
  },
  {
    email: 'akshat.kumar@codegoblins.in',
    name: 'Akshat Kumar',
    role: 'Administrator',
    archetype: 'Leader',
    clearanceLevel: 'Omega Level (Founder)',
    description: 'Co-Founder & Community Architect (Official Domain). Strategic platform governance.',
    userId: 'user_akshat_kumar',
    avatarGoblinId: 1
  },
  {
    email: 'admin@codegoblins.in',
    name: 'CodeGoblins Admin Core',
    role: 'Administrator',
    archetype: 'Strategist',
    clearanceLevel: 'Alpha Level (Core Steward)',
    description: 'Central operations clearance for workshop creation, moderation, and system telemetry.',
    userId: 'user_akshat_vats',
    avatarGoblinId: 5
  },
  {
    email: 'admin@codegoblins.dev',
    name: 'CodeGoblins Dev Admin',
    role: 'Administrator',
    archetype: 'Strategist',
    clearanceLevel: 'Alpha Level (Core Steward)',
    description: 'Engineering and developer relations admin clearance.',
    userId: 'user_akshat_vats',
    avatarGoblinId: 5
  },
  {
    email: 'core@codegoblins.in',
    name: 'Clan Core Operations',
    role: 'Administrator',
    archetype: 'Leader',
    clearanceLevel: 'Alpha Level (Core Steward)',
    description: 'Operations and workshop ticketing management clearance.',
    userId: 'user_akshat_kumar',
    avatarGoblinId: 1
  },
  {
    email: 'steward@codegoblins.in',
    name: 'Technical Steward',
    role: 'Administrator',
    archetype: 'Architect',
    clearanceLevel: 'Alpha Level (Core Steward)',
    description: 'Code review and developer resources store verification steward.',
    userId: 'user_akshat_vats',
    avatarGoblinId: 2
  }
];

export const AUTHORIZED_ADMIN_DOMAINS = [
  'codegoblins.in',
  'codegoblins.dev',
  'admin.codegoblins.in'
];

/**
 * Validates whether an email address possesses administrative clearance.
 */
export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();

  // 1. Direct match with registered admin credentials
  if (AUTHORIZED_ADMIN_CREDENTIALS.some((c) => c.email.toLowerCase() === normalized)) {
    return true;
  }

  // 2. Custom designated list check
  const designatedExtra = ['akshatvats@gmail.com', 'codegoblinsofficial@gmail.com'];
  if (designatedExtra.includes(normalized)) {
    return true;
  }

  // 3. Domain level wildcard check
  const domain = normalized.split('@')[1];
  if (domain && AUTHORIZED_ADMIN_DOMAINS.includes(domain)) {
    return true;
  }

  return false;
}

/**
 * Retrieves the security clearance profile for a given email.
 */
export function getAdminClearance(email?: string | null): {
  isAdmin: boolean;
  tier: 'Founder' | 'Core Steward' | 'Platform Admin' | 'Member';
  clearanceLevel: string;
  description: string;
  credential?: AdminCredential;
} {
  if (!email) {
    return {
      isAdmin: false,
      tier: 'Member',
      clearanceLevel: 'Level 0 (Unverified)',
      description: 'Standard Community Member'
    };
  }

  const normalized = email.trim().toLowerCase();
  const matched = AUTHORIZED_ADMIN_CREDENTIALS.find((c) => c.email.toLowerCase() === normalized);

  if (matched) {
    const isFounder = matched.clearanceLevel.includes('Founder');
    return {
      isAdmin: true,
      tier: isFounder ? 'Founder' : 'Core Steward',
      clearanceLevel: matched.clearanceLevel,
      description: matched.description,
      credential: matched
    };
  }

  if (isAdminEmail(normalized)) {
    return {
      isAdmin: true,
      tier: 'Platform Admin',
      clearanceLevel: 'Alpha Level (Verified Domain)',
      description: `Verified CodeGoblins Administrator under official @${normalized.split('@')[1]} organizational domain.`
    };
  }

  return {
    isAdmin: false,
    tier: 'Member',
    clearanceLevel: 'Level 0 (Unverified)',
    description: 'Standard Community Member'
  };
}

