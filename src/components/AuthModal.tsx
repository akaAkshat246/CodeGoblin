import React, { useState } from 'react';
import { X, Sparkles, User, Shield, GraduationCap, Code2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GOBLIN_CHARACTERS } from '../data/mockData';
import { authService, isSupabaseConfigured } from '../lib/supabase';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    setIsOnboardingModalOpen,
    loginAs,
    allUsers
  } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default to the first member or cadet
    loginAs(allUsers[0]?.id || 'user_current');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg p-6 rounded-3xl bg-[#11111B] border border-[#8B5CF6]/30 shadow-2xl text-left overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-xl text-[#A1A1B5] hover:text-[#F5F3FF] hover:bg-[#171725] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <span className="p-2 rounded-xl bg-[#8B5CF6]/20 text-[#A855F7]">
            <Sparkles className="w-4 h-4" />
          </span>
          <span className="text-xs font-bold text-[#A855F7] uppercase tracking-wider">
            Access The Goblin Den
          </span>
        </div>
        <h3 className="text-xl font-display font-black text-[#F5F3FF]">
          Sign in to CodeGoblins
        </h3>
        <p className="text-xs text-[#A1A1B5] mt-1 mb-5">
          Join peer developers, build squads, earn XP, and conquer hackathons.
        </p>

        {/* Instant Persona Switcher (For Pair-Programming & Demo Verification) */}
        <div className="mb-6 p-3.5 rounded-2xl bg-[#171725] border border-white/5">
          <p className="text-[11px] font-bold text-[#A3E635] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            <span>Instant Demo Switcher (Quick Sign In)</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {allUsers.slice(0, 4).map((user) => {
              const goblin = GOBLIN_CHARACTERS.find((g) => g.id === user.avatarGoblinId) || GOBLIN_CHARACTERS[0];
              return (
                <button
                  key={user.id}
                  onClick={() => loginAs(user.id)}
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-[#11111B] border border-white/5 hover:border-[#8B5CF6]/50 hover:bg-[#1E1E32] transition text-left group"
                >
                  <img
                    src={goblin.avatarImg}
                    alt={user.displayName}
                    className="w-8 h-8 rounded-lg object-cover ring-1 ring-white/10 group-hover:ring-[#A3E635] transition"
                  />
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-[#F5F3FF] truncate">{user.displayName}</p>
                    <p className="text-[10px] text-[#A1A1B5] truncate">
                      {user.role} • Lvl {user.level}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* OAuth Providers (Supabase Auth Phase 2) */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            type="button"
            onClick={async () => {
              await authService.signInWithGithub();
              loginAs(allUsers[0]?.id || 'user_current');
            }}
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#171725] border border-white/10 hover:border-white/30 text-xs font-semibold text-[#F5F3FF] transition"
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
            }}
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#171725] border border-white/10 hover:border-white/30 text-xs font-semibold text-[#F5F3FF] transition"
          >
            <span className="text-red-400 font-bold text-sm">G</span>
            <span>Google</span>
          </button>
        </div>

        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-white/10 w-full" />
          <span className="bg-[#11111B] px-3 text-[10px] font-mono uppercase text-[#A1A1B5] absolute">
            or passwordless email
          </span>
        </div>

        {/* Standard Email / Password Form */}
        <form onSubmit={handleCustomLogin} className="space-y-3.5">
          <div>
            <label className="block text-xs font-medium text-[#A1A1B5] mb-1">
              Email or Username
            </label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="cadet@codegoblins.dev"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#8B5CF6] transition"
            />
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
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#171725] border border-white/10 text-xs text-[#F5F3FF] focus:outline-none focus:border-[#8B5CF6] transition"
            />
          </div>

          <button
            type="submit"
            className="w-full goblin-btn-primary py-2.5 text-xs font-bold flex items-center justify-center gap-2 mt-2"
          >
            <span>Enter the Goblin Den</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer */}
        <div className="mt-5 pt-3.5 border-t border-white/5 text-center text-xs text-[#A1A1B5]">
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
