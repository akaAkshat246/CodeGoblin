import React, { useState } from 'react';
import {
  X,
  Sparkles,
  User,
  Shield,
  ArrowRight,
  ShieldCheck,
  KeyRound,
  CheckCircle2,
  Lock,
  Zap,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GOBLIN_CHARACTERS } from '../data/mockData';
import { authService } from '../lib/supabase';
import {
  isAdminEmail,
  getAdminClearance,
  AUTHORIZED_ADMIN_CREDENTIALS
} from '../utils/adminAuth';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    setIsOnboardingModalOpen,
    loginAs,
    allUsers,
    navigateTo
  } = useApp();

  const [authMode, setAuthMode] = useState<'member' | 'admin'>('member');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminPasscode, setAdminPasscode] = useState('');
  const [adminError, setAdminError] = useState('');

  if (!isAuthModalOpen) return null;

  const clearance = getAdminClearance(email);

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');

    if (authMode === 'admin') {
      if (!clearance.isAdmin) {
        setAdminError(
          'Access Denied: This email does not possess administrator clearance. Only authorized @codegoblins.dev credentials can access the Admin console. Please switch to Clan Member login.'
        );
        return;
      }

      // Find matching admin user
      const matchedUser = allUsers.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      ) || allUsers.find((u) => u.role === 'Administrator') || allUsers[0];
      
      loginAs(matchedUser.id);
      setIsAuthModalOpen(false);
      navigateTo('admin');
      return;
    }

    // Default member login
    const foundUser = allUsers.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );
    loginAs(foundUser?.id || allUsers[0]?.id || 'user_current');
    setIsAuthModalOpen(false);
    navigateTo('dashboard');
  };

  const handleAdminFastTrack = (userId: string) => {
    loginAs(userId);
    setIsAuthModalOpen(false);
    navigateTo('admin');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg p-6 sm:p-7 rounded-[28px] glass-panel border border-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.85)] text-left overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B5CF6]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#A3E635]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-2xl text-[#A1A1B5] hover:text-[#F5F3FF] hover:bg-white/5 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-1.5 relative z-10">
          <div className="android-icon-box bg-[#8B5CF6]/20 text-[#A855F7] border border-[#8B5CF6]/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#A855F7] uppercase tracking-wider block">
              The Goblin Den Access Portal
            </span>
            <h3 className="text-xl font-display font-black text-[#F5F3FF]">
              Sign in to CodeGoblins
            </h3>
          </div>
        </div>

        {/* Mode Selector Tabs (Glassmorphic) */}
        <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-[#09090F]/70 border border-white/5 my-4 relative z-10">
          <button
            type="button"
            onClick={() => setAuthMode('member')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              authMode === 'member'
                ? 'bg-[#171725] text-[#A3E635] border border-white/10 shadow-sm'
                : 'text-[#A1A1B5] hover:text-[#F5F3FF]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Clan Member</span>
          </button>

          <button
            type="button"
            onClick={() => setAuthMode('admin')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              authMode === 'admin'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-[#A1A1B5] hover:text-amber-400'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Clearance</span>
          </button>
        </div>

        {/* MODE 1: CLAN MEMBER FLOW */}
        {authMode === 'member' && (
          <div className="space-y-4 relative z-10">
            {/* Quick Demo Personas */}
            <div className="p-3.5 rounded-2xl bg-[#171725]/60 border border-white/5 backdrop-blur-md">
              <p className="text-[10px] font-bold text-[#A3E635] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User className="w-3 h-3" />
                <span>Instant Demo Switcher</span>
              </p>
              <div className="grid grid-cols-2 gap-2">
                {allUsers.slice(0, 4).map((user) => {
                  const goblin = GOBLIN_CHARACTERS.find((g) => g.id === user.avatarGoblinId) || GOBLIN_CHARACTERS[0];
                  return (
                    <button
                      key={user.id}
                      onClick={() => {
                        loginAs(user.id);
                        setIsAuthModalOpen(false);
                      }}
                      className="flex items-center gap-2 p-2 rounded-xl bg-[#11111B]/80 border border-white/5 hover:border-[#8B5CF6]/50 transition text-left group"
                    >
                      <img
                        src={goblin.avatarImg}
                        alt={user.displayName}
                        className="w-7 h-7 rounded-lg object-cover ring-1 ring-white/10 group-hover:ring-[#A3E635] transition"
                      />
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-[#F5F3FF] truncate">{user.displayName}</p>
                        <p className="text-[10px] text-[#A1A1B5] truncate">Lvl {user.level} • {user.role}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* OAuth Buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={async () => {
                  await authService.signInWithGithub();
                  loginAs(allUsers[0]?.id || 'user_current');
                  setIsAuthModalOpen(false);
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-[#171725]/80 border border-white/10 hover:border-white/20 text-xs font-semibold text-[#F5F3FF] transition shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub</span>
              </button>

              <button
                type="button"
                onClick={async () => {
                  await authService.signInWithGoogle();
                  loginAs(allUsers[1]?.id || 'user_current');
                  setIsAuthModalOpen(false);
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-[#171725]/80 border border-white/10 hover:border-white/20 text-xs font-semibold text-[#F5F3FF] transition shadow-sm"
              >
                <span className="text-red-400 font-bold text-sm">G</span>
                <span>Google</span>
              </button>
            </div>

            {/* Email Input with Live Admin Detection */}
            <form onSubmit={handleCustomLogin} className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-medium text-[#A1A1B5] mb-1">
                  Email or Username
                </label>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="cadet@codegoblins.dev or akshat@codegoblins.in"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#171725]/80 border border-white/10 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#8B5CF6] transition"
                />

                {/* Special Admin Mail Indicator */}
                {clearance.isAdmin && (
                  <div className="mt-2 p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center gap-2 text-xs text-amber-300 animate-in fade-in">
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      <strong className="font-bold">Special Admin Mail Detected:</strong> {clearance.clearanceLevel}.
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-[#A1A1B5] mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#171725]/80 border border-white/10 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#8B5CF6] transition"
                />
              </div>

              <button
                type="submit"
                className="w-full goblin-btn-primary py-2.5 text-xs font-bold flex items-center justify-center gap-2 mt-2 rounded-2xl"
              >
                <span>Enter The Goblin Den</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Link to Dedicated Full Member Login Page */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsAuthModalOpen(false);
                  navigateTo('login');
                }}
                className="inline-flex items-center gap-1.5 text-xs text-[#A1A1B5] hover:text-[#A3E635] transition font-medium"
              >
                <span>Open Dedicated Member Login Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* MODE 2: ADMIN CORE ACCESS (SPECIAL MAIL ID CLEARANCE) */}
        {authMode === 'admin' && (
          <div className="space-y-4 relative z-10 animate-in fade-in">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <Lock className="w-4 h-4" />
                <span>Restricted Admin & Governance Core</span>
              </div>
              <p className="text-[#A1A1B5] text-[11px] leading-relaxed">
                Access to project curation, workshop publishing, security audit trails, and member RBAC requires an authorized <span className="text-amber-300 font-mono font-semibold">@codegoblins.in</span> or whitelisted admin mail ID.
              </p>
            </div>

            {/* Quick Authenticate Verified Founders */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                Authorized Admin Mail ID Profiles
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {AUTHORIZED_ADMIN_CREDENTIALS.slice(0, 4).map((cred) => (
                  <button
                    key={cred.email}
                    onClick={() => handleAdminFastTrack(cred.userId)}
                    className="p-3 rounded-2xl bg-[#171725]/80 border border-white/5 hover:border-amber-400/50 hover:bg-[#1E1E32] transition text-left group flex items-start gap-2.5"
                  >
                    <div className="android-icon-box bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-[#F5F3FF] truncate">{cred.name}</p>
                      <p className="text-[10px] font-mono text-amber-300 truncate">{cred.email}</p>
                      <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-500/15 text-amber-300">
                        {cred.clearanceLevel.split(' ')[0]}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Direct Admin Mail Form */}
            <form onSubmit={handleCustomLogin} className="space-y-3 pt-2 border-t border-white/5">
              <div>
                <label className="block text-xs font-medium text-[#A1A1B5] mb-1">
                  Enter Admin Mail ID
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@codegoblins.in"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#171725]/80 border border-amber-500/30 text-xs text-[#F5F3FF] focus:outline-none focus:border-amber-400 transition font-mono"
                />
              </div>

              {adminError && (
                <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300 animate-in fade-in">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{adminError}</span>
                </div>
              )}

              {clearance.isAdmin && (
                <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <p className="font-bold">Verified Administrator: {clearance.clearanceLevel}</p>
                    <p className="text-[10px] text-[#A1A1B5]">{clearance.description}</p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={!clearance.isAdmin && !email}
                className="w-full goblin-btn-green py-2.5 text-xs font-bold flex items-center justify-center gap-2 mt-2 rounded-2xl disabled:opacity-50"
              >
                <KeyRound className="w-4 h-4" />
                <span>Verify Admin Clearance & Open Console</span>
              </button>
            </form>

            {/* Link to Dedicated Full Admin Security Terminal */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsAuthModalOpen(false);
                  navigateTo('admin_login');
                }}
                className="inline-flex items-center gap-1.5 text-xs text-amber-400/80 hover:text-amber-300 transition font-medium"
              >
                <span>Open Dedicated Admin Security Terminal Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-5 pt-3.5 border-t border-white/5 text-center text-xs text-[#A1A1B5] relative z-10">
          New to the clan?{' '}
          <button
            onClick={() => {
              setIsAuthModalOpen(false);
              setIsOnboardingModalOpen(true);
            }}
            className="text-[#A855F7] font-semibold hover:underline"
          >
            Spawn a new Goblin account
          </button>
        </div>
      </div>
    </div>
  );
};
