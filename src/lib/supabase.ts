import { createClient } from '@supabase/supabase-js';
import { UserProfile, ProjectShowcase, HackathonEvent, DigitalResource, AuditLogEntry } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('placeholder')
);

// Fallback dummy client if credentials are not configured in local environment
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder-project.supabase.co', 'placeholder-anon-key');

/**
 * Phase 2 Auth Services (Supabase OAuth & Magic Link)
 */
export const authService = {
  /**
   * GitHub OAuth for developer accounts
   */
  async signInWithGithub() {
    if (!isSupabaseConfigured) {
      console.warn('[Supabase] Operating in local mock mode: simulated GitHub sign-in.');
      return { data: { provider: 'github', url: window.location.origin }, error: null };
    }
    return await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/#hq`
      }
    });
  },

  /**
   * Google OAuth for student accounts
   */
  async signInWithGoogle() {
    if (!isSupabaseConfigured) {
      console.warn('[Supabase] Operating in local mock mode: simulated Google sign-in.');
      return { data: { provider: 'google', url: window.location.origin }, error: null };
    }
    return await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/#hq`
      }
    });
  },

  /**
   * Passwordless Magic Link / OTP Email
   */
  async signInWithEmail(email: string) {
    if (!isSupabaseConfigured) {
      return { data: null, error: null };
    }
    return await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/#hq`
      }
    });
  },

  /**
   * Sign out current user
   */
  async signOut() {
    if (!isSupabaseConfigured) return { error: null };
    return await supabase.auth.signOut();
  },

  /**
   * Get authenticated user session
   */
  async getSession() {
    if (!isSupabaseConfigured) return null;
    const { data } = await supabase.auth.getSession();
    return data.session;
  }
};

/**
 * Phase 2 Data Access Services (Postgres with RLS)
 */
export const dataService = {
  /**
   * Fetch public user profile
   */
  async getProfile(userId: string): Promise<UserProfile | null> {
    if (!isSupabaseConfigured) return null;
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile from Supabase:', error);
      return null;
    }
    return data as UserProfile;
  },

  /**
   * Upsert profile updates
   */
  async updateProfile(userId: string, updates: Partial<UserProfile>) {
    if (!isSupabaseConfigured) return null;
    return await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);
  },

  /**
   * Fetch approved showcase projects
   */
  async getApprovedProjects(): Promise<ProjectShowcase[]> {
    if (!isSupabaseConfigured) return [];
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('moderation_status', 'approved')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects from Supabase:', error);
      return [];
    }
    return data as ProjectShowcase[];
  },

  /**
   * Record security audit log entry
   */
  async recordAuditLog(entry: Omit<AuditLogEntry, 'id'>) {
    if (!isSupabaseConfigured) return null;
    return await supabase.from('audit_logs').insert([entry]);
  }
};

