import React, { useState } from 'react';
import {
  Flame,
  Search,
  Bell,
  Sparkles,
  ShieldAlert,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  CheckCircle2,
  Trophy
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GOBLIN_CHARACTERS } from '../data/mockData';

interface NavbarProps {
  onToggleMobileSidebar: () => void;
  isMobileSidebarOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMobileSidebar, isMobileSidebarOpen }) => {
  const {
    currentUser,
    activePage,
    navigateTo,
    setIsSearchModalOpen,
    setIsAuthModalOpen,
    setIsOnboardingModalOpen,
    logout,
    notifications,
    markNotificationRead,
    markAllNotificationsRead
  } = useApp();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false);

  const activeGoblin = GOBLIN_CHARACTERS.find((g) => g.id === currentUser?.avatarGoblinId) || GOBLIN_CHARACTERS[1];
  const unreadNotifs = notifications.filter((n) => !n.read);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#8B5CF6]/20 bg-[#09090F]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            className="md:hidden p-2 rounded-lg text-[#A1A1B5] hover:text-[#F5F3FF] hover:bg-[#171725] transition"
            aria-label="Toggle navigation"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            onClick={() => navigateTo(currentUser ? 'dashboard' : 'landing')}
            className="flex items-center gap-2.5 group text-left"
          >
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#b5ed72]/40 group-hover:border-[#b5ed72] transition duration-300">
              <img
                src="/art/logo.webp"
                alt="CodeGoblins Mascot"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-base tracking-wider text-[#f3f1ec]">
                  CODE<span className="text-[#b5ed72]">GOBLINS</span>
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-[#b5ed72]/20 text-[#b5ed72] border border-[#b5ed72]/30">
                  DEN HQ
                </span>
              </div>
              <p className="hidden md:block text-[9px] text-[#8a8d99] tracking-tight">
                BUILD BEYOND CODE.
              </p>
            </div>
          </button>
        </div>

        {/* Center: Quick Search Trigger */}
        <div className="flex-1 max-w-md hidden sm:block">
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#11111B] border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/40 text-[#A1A1B5] text-xs transition group shadow-inner"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-[#8B5CF6] group-hover:text-[#A3E635] transition" />
              <span>Search quests, discussions, squads, projects...</span>
            </span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-[#171725] text-[#A1A1B5] rounded border border-white/5">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Right: Gamification Status & Auth controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Surface / Public Website button */}
          <button
            type="button"
            onClick={() => {
              navigateTo('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-[#b5ed72]/10 border border-[#b5ed72]/30 text-[#b5ed72] hover:bg-[#b5ed72]/20 text-xs font-semibold transition cursor-pointer"
            title="Return to public CodeGoblins website"
          >
            <span>← Website</span>
          </button>

          {currentUser ? (
            <>
              {/* Daily Streak Indicator */}
              <div
                title={`${currentUser.streakDays} day activity streak in Asia/Kolkata timezone`}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#171725] border border-amber-500/30 text-amber-400 text-xs font-semibold cursor-pointer hover:border-amber-400 transition"
                onClick={() => navigateTo('profile')}
              >
                <Flame className="w-4 h-4 text-amber-400 animate-pulse fill-amber-400/20" />
                <span>{currentUser.streakDays}d</span>
              </div>

              {/* XP & Level Badge */}
              <div
                title={`Level ${currentUser.level} Goblin Cadet • ${currentUser.xp} XP total`}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#171725] border border-[#8B5CF6]/30 text-xs font-medium cursor-pointer hover:border-[#A3E635] transition"
                onClick={() => navigateTo('profile')}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#A3E635]" />
                <span className="text-[#A3E635] font-bold">Lvl {currentUser.level}</span>
                <span className="text-white/40">•</span>
                <span className="text-[#F5F3FF] font-mono text-[11px]">{currentUser.xp} XP</span>
              </div>

              {/* Notification Bell with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsNotifMenuOpen(!isNotifMenuOpen)}
                  className="relative p-2 rounded-xl bg-[#11111B] border border-[#8B5CF6]/20 text-[#A1A1B5] hover:text-[#F5F3FF] hover:border-[#8B5CF6]/50 transition"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadNotifs.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#A3E635] text-[#09090F] text-[9px] font-black flex items-center justify-center animate-bounce">
                      {unreadNotifs.length}
                    </span>
                  )}
                </button>

                {isNotifMenuOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#11111B] border border-[#8B5CF6]/30 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
                      <div className="flex items-center gap-1.5 font-bold text-sm text-[#F5F3FF]">
                        <Bell className="w-4 h-4 text-[#8B5CF6]" />
                        <span>Notifications</span>
                        {unreadNotifs.length > 0 && (
                          <span className="text-xs text-[#A3E635]">({unreadNotifs.length} unread)</span>
                        )}
                      </div>
                      {unreadNotifs.length > 0 && (
                        <button
                          onClick={markAllNotificationsRead}
                          className="text-[11px] text-[#A855F7] hover:underline"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>

                    <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                      {notifications.length === 0 ? (
                        <p className="text-xs text-[#A1A1B5] text-center py-4">No notifications yet.</p>
                      ) : (
                        notifications.map((notif) => (
                          <div
                            key={notif.id}
                            onClick={() => {
                              markNotificationRead(notif.id);
                              if (notif.actionUrl) {
                                navigateTo(notif.actionUrl as any);
                                setIsNotifMenuOpen(false);
                              }
                            }}
                            className={`p-2.5 rounded-xl text-left cursor-pointer transition border ${
                              notif.read
                                ? 'bg-[#171725]/40 border-transparent text-[#A1A1B5]'
                                : 'bg-[#171725] border-[#8B5CF6]/30 text-[#F5F3FF]'
                            }`}
                          >
                            <div className="flex items-center justify-between text-xs font-semibold mb-1">
                              <span className="flex items-center gap-1">
                                {!notif.read && <span className="w-1.5 h-1.5 rounded-full bg-[#A3E635]" />}
                                {notif.title}
                              </span>
                              <span className="text-[10px] text-[#A1A1B5]">
                                {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <p className="text-[11px] leading-relaxed text-[#A1A1B5]">{notif.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Avatar & Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2 p-1 rounded-xl bg-[#11111B] border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/50 transition group"
                >
                  <img
                    src={activeGoblin.avatarImg}
                    alt={currentUser.displayName}
                    className="w-8 h-8 rounded-lg object-cover ring-1 ring-[#8B5CF6]/40"
                  />
                  <span className="hidden md:inline-block text-xs font-semibold text-[#F5F3FF] max-w-[100px] truncate">
                    {currentUser.displayName}
                  </span>
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#11111B] border border-[#8B5CF6]/30 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="p-2.5 border-b border-white/5 mb-1.5">
                      <p className="text-xs font-bold text-[#F5F3FF] truncate">{currentUser.displayName}</p>
                      <p className="text-[11px] text-[#A1A1B5] font-mono">@{currentUser.username}</p>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#8B5CF6]/20 text-[#C084FC]">
                          {currentUser.role}
                        </span>
                        <span className="text-[10px] text-[#A3E635] font-semibold">
                          {activeGoblin.roleTitle}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-0.5 text-xs">
                      <button
                        onClick={() => {
                          navigateTo('profile');
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[#A1A1B5] hover:text-[#F5F3FF] hover:bg-[#171725] transition"
                      >
                        <User className="w-4 h-4 text-[#8B5CF6]" />
                        <span>My Goblin Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          navigateTo('settings');
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[#A1A1B5] hover:text-[#F5F3FF] hover:bg-[#171725] transition"
                      >
                        <Settings className="w-4 h-4 text-[#8B5CF6]" />
                        <span>Account Settings</span>
                      </button>

                      {(currentUser.role === 'Administrator' || currentUser.role === 'Moderator') && (
                        <button
                          onClick={() => {
                            navigateTo('admin');
                            setIsProfileMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-amber-400 hover:bg-[#171725] transition font-medium"
                        >
                          <ShieldAlert className="w-4 h-4 text-amber-400" />
                          <span>Admin Dashboard</span>
                        </button>
                      )}

                      <div className="my-1 border-t border-white/5" />

                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 transition"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Exit Den (Sign Out)</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#A1A1B5] hover:text-[#F5F3FF] hover:bg-[#171725] transition"
              >
                Sign In
              </button>
              <button
                onClick={() => setIsOnboardingModalOpen(true)}
                className="goblin-btn-primary text-xs py-1.5 px-3.5 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Join Goblins</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
