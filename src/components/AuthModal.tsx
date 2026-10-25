import React, { useState } from 'react';
import { X, Sparkles, User, Shield, GraduationCap, Code2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GOBLIN_CHARACTERS } from '../data/mockData';

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
