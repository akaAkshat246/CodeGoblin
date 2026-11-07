import React, { useState } from 'react';
import {
  User,
  Lock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GOBLIN_CHARACTERS } from '../data/mockData';
import { authService } from '../lib/supabase';
import { SEOHead } from '../components/SEOHead';
import { isAdminEmail } from '../utils/adminAuth';

export const LoginPage: React.FC = () => {
  const { loginAs, allUsers, navigateTo } = useApp();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Regular Clan Members (Non-Admin demo profiles)
  const regularMemberProfiles = allUsers.filter(
    (u) => u.role !== 'Administrator' && !isAdminEmail(u.email)
  ).slice(0, 4);

  const handleMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const input = emailOrUsername.trim().toLowerCase();
    if (!input) {
      setErrorMessage('Please enter your email or username.');
      return;
    }

    // Find matching user
    const found = allUsers.find(
      (u) =>
        u.email.toLowerCase() === input ||
        u.username.toLowerCase() === input
    );

    if (found) {
      loginAs(found.id);
      navigateTo('dashboard');
      return;
    }

    // Fallback: log in with the first regular member profile
    const fallbackUser = regularMemberProfiles[0] || allUsers[0];
    loginAs(fallbackUser.id);
    navigateTo('dashboard');
  };

  const handleFastTrackMember = (userId: string) => {
    loginAs(userId);
    navigateTo('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#09090F] text-[#F5F3FF] flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans selection:bg-[#8B5CF6]/30 selection:text-[#A3E635]">
      <SEOHead
        title="Clan Member Login — CodeGoblins"
        description="Sign in as a student, builder, or developer to access the CodeGoblins Den, hackathon sprints, squads, and project forge."
        canonicalPath="/login"
        pageId="member_login"
      />

      {/* Top Navbar Header */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between pb-6 border-b border-white/[0.06]">
        <button
          onClick={() => navigateTo('landing')}
          className="flex items-center gap-2 group text-left"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden border border-lime-400/40 group-hover:border-lime-400 transition shrink-0">
            <img
              src="/art/logo.webp"
              alt="CodeGoblins Mascot"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
          </div>
          <span className="font-display font-bold text-base tracking-wider text-white">
            CODE<span className="text-[#A3E635]">GOBLINS</span>
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-lime-400/15 text-lime-400 border border-lime-400/30 font-bold ml-1">
            MEMBER PORTAL
          </span>
        </button>

        <button
          onClick={() => navigateTo('landing')}
          className="text-xs font-mono text-zinc-400 hover:text-white transition flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Website</span>
        </button>
      </header>

      {/* Center Login Box */}
      <main className="max-w-md w-full mx-auto my-8 relative">
        {/* Ambient Glows */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#A3E635]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#8B5CF6]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative rounded-3xl bg-[#111118]/90 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          {/* Header Title */}
          <div className="space-y-1.5 text-center">
            <div className="w-12 h-12 rounded-2xl bg-lime-400/10 border border-lime-400/30 text-lime-400 flex items-center justify-center mx-auto shadow-md">
              <User className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold font-display text-white mt-2">
              Sign In as Clan Member
            </h1>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
              Access your developer dashboard, hackathon sprints, squads, project forge, and esports leaderboards.
            </p>
          </div>

          {/* Quick Demo Switcher for Students / Members */}
          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-lime-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Member Demo Profiles</span>
            </span>
            <div className="grid grid-cols-2 gap-2">
              {regularMemberProfiles.map((user) => {
                const goblin = GOBLIN_CHARACTERS.find((g) => g.id === user.avatarGoblinId) || GOBLIN_CHARACTERS[1];
                return (
                  <button
                    key={user.id}
                    onClick={() => handleFastTrackMember(user.id)}
                    className="flex items-center gap-2 p-2 rounded-xl bg-[#171725] border border-white/5 hover:border-lime-400/40 transition text-left group"
                  >
                    <img
                      src={goblin.avatarImg}
                      alt={user.displayName}
                      className="w-7 h-7 rounded-lg object-cover ring-1 ring-white/10 group-hover:ring-lime-400 transition"
                    />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-white truncate">{user.displayName}</p>
                      <p className="text-[10px] text-zinc-400 font-mono truncate">Lvl {user.level} • {user.role}</p>
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
                loginAs(regularMemberProfiles[0]?.id || 'user_current');
                navigateTo('dashboard');
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#171725] border border-white/10 hover:border-white/20 text-xs font-semibold text-white transition shadow-sm"
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
                loginAs(regularMemberProfiles[1]?.id || 'user_current');
                navigateTo('dashboard');
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#171725] border border-white/10 hover:border-white/20 text-xs font-semibold text-white transition shadow-sm"
            >
              <span className="text-red-400 font-bold text-sm">G</span>
              <span>Google</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-white/[0.06]" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">or with email</span>
            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>

          {/* Form */}
          <form onSubmit={handleMemberSubmit} className="space-y-3.5 text-xs">
            {errorMessage && (
              <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label className="block text-zinc-400 font-semibold mb-1">
                Email Address or Username
              </label>
              <input
                type="text"
                required
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                placeholder="developer@college.edu or username"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-white focus:outline-none focus:border-lime-400 transition"
              />
            </div>

            <div>
              <label className="block text-zinc-400 font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-white focus:outline-none focus:border-lime-400 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-lime-400/20"
            >
              <span>Enter The Goblin Den</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Switch to Admin Terminal Card */}
          <div className="pt-4 border-t border-white/[0.06] text-center space-y-2">
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-left">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <p className="font-bold text-white text-[11px]">Are you a Platform Admin?</p>
                  <p className="text-[10px] text-zinc-400">Restricted @codegoblins.dev clearance</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigateTo('admin_login')}
                className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold shrink-0 transition"
              >
                Admin Terminal →
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-zinc-500 max-w-md mx-auto pt-4 font-mono">
        CodeGoblins Platform • Student &amp; Developer Access
      </footer>
    </div>
  );
};
