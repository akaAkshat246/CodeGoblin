import React, { useState, useEffect } from 'react';
import {
  Flame,
  Search,
  Bell,
  Sparkles,
  User,
  Settings,
  LogOut,
  ShieldCheck,
  Volume2,
  VolumeX,
  Keyboard,
  Shield,
  Zap,
  Check,
  Globe,
  Palette,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { GOBLIN_CHARACTERS } from '../data/mockData';
import { isAdminEmail } from '../utils/adminAuth';
import { isSoundEnabled, setSoundEnabled, playSuccessChime, playClickTick } from '../utils/soundEffects';
import { ShortcutsModal } from './ShortcutsModal';
import { HamburgerMenu } from './framer';
import { THEMES } from './framer/ThemeChanger';

interface NavbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  onOpenInstallModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, isSidebarOpen, onOpenInstallModal }) => {
  const {
    currentUser,
    navigateTo,
    setIsSearchModalOpen,
    setIsAuthModalOpen,
    setIsOnboardingModalOpen,
    logout,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
  } = useApp();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false);
  const [isStreakPopOpen, setIsStreakPopOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(() => isSoundEnabled());
  const [streakClaimedToday, setStreakClaimedToday] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('lime');

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem('codegoblins_accent_theme');
    if (saved && THEMES.some((t) => t.id === saved)) {
      setCurrentTheme(saved);
    }
  }, []);

  const handleSelectTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    localStorage.setItem('codegoblins_accent_theme', themeId);
    const theme = THEMES.find((t) => t.id === themeId);
    if (theme) {
      document.documentElement.style.setProperty('--accent-color', theme.hex);
      document.documentElement.style.setProperty('--accent-rgb', theme.rgb);
    }
    playClickTick();
  };

  const toggleSound = () => {
    const nextState = !soundOn;
    setSoundOn(nextState);
    setSoundEnabled(nextState);
    if (nextState) {
      playClickTick();
    }
  };

  const handleClaimStreakBonus = () => {
    if (streakClaimedToday) return;
    setStreakClaimedToday(true);
    playSuccessChime();
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.15 },
      colors: ['#F59E0B', '#A3E635', '#8B5CF6'],
    });
  };

  const closeAllMenus = () => {
    setIsProfileMenuOpen(false);
    setIsNotifMenuOpen(false);
    setIsStreakPopOpen(false);
  };

  const activeGoblin =
    GOBLIN_CHARACTERS.find((g) => g.id === currentUser?.avatarGoblinId) || GOBLIN_CHARACTERS[1];
  const unreadNotifs = notifications.filter((n) => !n.read);
  const isUserAdmin = currentUser?.role === 'Administrator' || isAdminEmail(currentUser?.email);

  // Level calculations for gamification capsule
  const currentXP = currentUser?.xp || 0;
  const currentLevel = currentUser?.level || 1;
  const prevLevelXP = Math.pow(currentLevel - 1, 2) * 60;
  const nextLevelXP = Math.pow(currentLevel, 2) * 60;
  const levelProgressPercent = Math.min(
    100,
    Math.max(0, Math.round(((currentXP - prevLevelXP) / (nextLevelXP - prevLevelXP)) * 100))
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#09090F]/90 backdrop-blur-2xl transition-colors">
      <div className="w-full px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
        {/* Left: Hamburger & Brand Identity */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <HamburgerMenu
            isOpen={isSidebarOpen}
            toggle={onToggleSidebar}
            size={18}
            color="#a1a1aa"
            activeColor="#A3E635"
            className="hover:bg-white/[0.06] rounded-lg -ml-1.5"
          />

          <button
            onClick={() => navigateTo(currentUser ? 'dashboard' : 'landing')}
            className="flex items-center gap-2 group text-left p-1 rounded-xl hover:bg-white/[0.03] transition-colors"
            title="CodeGoblins HQ"
          >
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-lime-400/40 group-hover:border-lime-400 transition-colors duration-300 shrink-0">
              <img
                src="/art/logo.webp"
                alt="CodeGoblins Mascot"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-sm sm:text-base tracking-wider text-white">
                CODE<span className="text-[#A3E635]">GOBLINS</span>
              </span>
              <span className="hidden sm:inline-flex px-1.5 py-0.2 text-[9px] font-bold rounded bg-lime-400/15 text-lime-400 border border-lime-400/25">
                DEN
              </span>
            </div>
          </button>
        </div>

        {/* Center: Command Search Bar */}
        <div className="flex-1 max-w-xs md:max-w-sm hidden sm:block mx-2">
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#111118]/80 border border-white/[0.08] hover:border-lime-400/40 text-zinc-400 hover:text-zinc-200 text-xs transition-all group shadow-sm"
          >
            <span className="flex items-center gap-2 truncate">
              <Search className="w-3.5 h-3.5 text-zinc-500 group-hover:text-lime-400 transition-colors shrink-0" />
              <span className="truncate">Search...</span>
            </span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white/[0.04] text-zinc-400 rounded border border-white/5">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Right: Minimal, De-cluttered Controls (Only 3 icons) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Mobile Search Icon Button */}
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="sm:hidden p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            title="Search"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {currentUser ? (
            <>
              {/* 1. Sleek Streak Badge */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    const next = !isStreakPopOpen;
                    closeAllMenus();
                    setIsStreakPopOpen(next);
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-semibold transition-all select-none ${
                    isStreakPopOpen
                      ? 'bg-amber-400/15 border-amber-400/50 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                      : 'bg-[#111118] border-amber-500/20 hover:border-amber-400/50 text-amber-400'
                  }`}
                  title={`${currentUser.streakDays} Day Daily Consistency Streak`}
                >
                  <Flame className="w-3.5 h-3.5 fill-amber-400/20 text-amber-400" />
                  <span>{currentUser.streakDays}d</span>
                </button>

                {/* Gamification Popover */}
                {isStreakPopOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={closeAllMenus} />
                    <div className="absolute right-0 mt-2 w-76 sm:w-80 rounded-2xl bg-[#111119]/95 backdrop-blur-xl border border-white/10 shadow-2xl p-4 z-50 text-left animate-in fade-in zoom-in-95 duration-150">
                      {/* Header */}
                      <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/[0.06]">
                        <div className="flex items-center gap-2">
                          <Flame className="w-4 h-4 text-amber-400 fill-amber-400/20" />
                          <span className="text-xs font-semibold text-white">Daily Consistency</span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20">
                          {currentUser.streakDays} Days
                        </span>
                      </div>

                      {/* Level Progress */}
                      <div className="mb-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="text-zinc-400 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-lime-400" /> Level {currentLevel}
                          </span>
                          <span className="font-mono text-[11px] text-lime-400 font-semibold">
                            {currentXP} / {nextLevelXP} XP ({levelProgressPercent}%)
                          </span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                          <div
                            className="h-full bg-lime-400 rounded-full transition-all duration-300"
                            style={{ width: `${levelProgressPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Weekday Strip */}
                      <div className="mb-3">
                        <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-2 font-medium">
                          Week (Mon - Sun)
                        </span>
                        <div className="flex items-center justify-between">
                          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => {
                            const isDone = idx < 5;
                            const isToday = idx === 4;
                            return (
                              <div key={idx} className="flex flex-col items-center gap-1">
                                <span className="text-[10px] text-zinc-500 font-mono">{day}</span>
                                <div
                                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                    isToday
                                      ? 'bg-amber-400 text-black ring-2 ring-amber-400/30'
                                      : isDone
                                      ? 'bg-lime-400/20 text-lime-400 border border-lime-400/30'
                                      : 'bg-white/[0.03] text-zinc-600 border border-white/[0.06]'
                                  }`}
                                >
                                  {isDone ? <Check className="w-3 h-3" /> : '•'}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Streak Perks */}
                      <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-[11px] space-y-1.5 mb-3 text-zinc-400">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <Zap className="w-3 h-3 text-lime-400" />
                            <span>XP Multiplier:</span>
                          </span>
                          <span className="font-semibold text-lime-400 font-mono">1.2x Active</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <Shield className="w-3 h-3 text-purple-400" />
                            <span>Streak Shield:</span>
                          </span>
                          <span className="text-zinc-300">1 Protected</span>
                        </div>
                      </div>

                      {/* Claim Button */}
                      <button
                        onClick={handleClaimStreakBonus}
                        disabled={streakClaimedToday}
                        className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                          streakClaimedToday
                            ? 'bg-white/[0.04] text-zinc-500 cursor-not-allowed'
                            : 'bg-amber-400 hover:bg-amber-300 text-black font-bold'
                        }`}
                      >
                        {streakClaimedToday ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-lime-400" />
                            <span>Today's Bonus Claimed</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Claim Daily Bonus (+15 XP)</span>
                          </>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* 2. Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => {
                    const next = !isNotifMenuOpen;
                    closeAllMenus();
                    setIsNotifMenuOpen(next);
                  }}
                  className={`relative p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors ${
                    isNotifMenuOpen ? 'bg-white/[0.08] text-white' : ''
                  }`}
                  aria-label="Notifications"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadNotifs.length > 0 && (
                    <span className="absolute 1.5 top-1.5 right-1.5 w-2 h-2 rounded-full bg-lime-400 shadow-[0_0_6px_#A3E635]" />
                  )}
                </button>

                {isNotifMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={closeAllMenus} />
                    <div className="absolute right-0 mt-2 w-80 sm:w-88 rounded-2xl bg-[#111119]/95 backdrop-blur-xl border border-white/10 shadow-2xl p-3 z-50 text-left animate-in fade-in zoom-in-95 duration-150">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.06]">
                        <div className="flex items-center gap-1.5 font-bold text-xs text-white">
                          <Bell className="w-3.5 h-3.5 text-purple-400" />
                          <span>Notifications</span>
                          {unreadNotifs.length > 0 && (
                            <span className="text-[11px] text-lime-400">
                              ({unreadNotifs.length} new)
                            </span>
                          )}
                        </div>
                        {unreadNotifs.length > 0 && (
                          <button
                            onClick={markAllNotificationsRead}
                            className="text-[11px] text-purple-400 hover:text-purple-300 transition-colors"
                          >
                            Mark read
                          </button>
                        )}
                      </div>

                      <div className="max-h-72 overflow-y-auto space-y-1.5 pr-1">
                        {notifications.length === 0 ? (
                          <p className="text-xs text-zinc-500 text-center py-6">
                            No notifications yet.
                          </p>
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
                                  ? 'bg-white/[0.02] border-transparent text-zinc-400'
                                  : 'bg-white/[0.05] border-purple-500/30 text-white'
                              }`}
                            >
                              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                                <span className="flex items-center gap-1">
                                  {!notif.read && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                                  )}
                                  {notif.title}
                                </span>
                                <span className="text-[10px] text-zinc-500 font-mono">
                                  {new Date(notif.timestamp).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </span>
                              </div>
                              <p className="text-[11px] leading-relaxed text-zinc-400">
                                {notif.message}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* 3. Minimal Profile Avatar with Consolidated Menu */}
              <div className="relative">
                <button
                  onClick={() => {
                    const next = !isProfileMenuOpen;
                    closeAllMenus();
                    setIsProfileMenuOpen(next);
                  }}
                  className={`p-0.5 rounded-full transition-all flex items-center justify-center ${
                    isProfileMenuOpen
                      ? 'ring-2 ring-lime-400 shadow-[0_0_12px_rgba(163,230,53,0.3)]'
                      : 'ring-1 ring-white/15 hover:ring-lime-400/60'
                  }`}
                  aria-label="User menu"
                  title={currentUser.displayName}
                >
                  <img
                    src={activeGoblin.avatarImg}
                    alt={currentUser.displayName}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
                  />
                </button>

                {/* Profile & Settings Dropdown */}
                {isProfileMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={closeAllMenus} />
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#111119]/95 backdrop-blur-xl border border-white/10 shadow-2xl p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                      {/* Identity Card */}
                      <div className="p-2.5 border-b border-white/[0.06] mb-1.5">
                        <p className="text-xs font-bold text-white truncate">
                          {currentUser.displayName}
                        </p>
                        <p className="text-[11px] text-zinc-400 font-mono">
                          @{currentUser.username}
                        </p>
                        <div className="mt-1.5 flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/20 text-purple-300">
                            {currentUser.role}
                          </span>
                          <span className="text-[10px] text-lime-400 font-semibold truncate">
                            {activeGoblin.roleTitle}
                          </span>
                        </div>
                      </div>

                      {/* Main Navigation Links */}
                      <div className="space-y-0.5 text-xs">
                        {isUserAdmin && (
                          <button
                            onClick={() => {
                              navigateTo('admin');
                              setIsProfileMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-amber-300 hover:bg-amber-500/10 transition font-medium"
                          >
                            <ShieldCheck className="w-4 h-4 text-amber-400" />
                            <span>Admin Portal VIP</span>
                          </button>
                        )}

                        <button
                          onClick={() => {
                            navigateTo('profile');
                            setIsProfileMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.05] transition"
                        >
                          <User className="w-4 h-4 text-purple-400" />
                          <span>My Goblin Profile</span>
                        </button>

                        <button
                          onClick={() => {
                            navigateTo('settings');
                            setIsProfileMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.05] transition"
                        >
                          <Settings className="w-4 h-4 text-purple-400" />
                          <span>Account Settings</span>
                        </button>

                        <button
                          onClick={() => {
                            navigateTo('landing');
                            setIsProfileMenuOpen(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.05] transition"
                        >
                          <Globe className="w-4 h-4 text-zinc-400" />
                          <span>Public Website</span>
                        </button>
                      </div>

                      {/* Embedded Theme Accent Swatches */}
                      <div className="border-t border-white/[0.06] my-2 pt-2 px-2">
                        <div className="flex items-center justify-between text-[10px] uppercase font-mono text-zinc-500 mb-1.5">
                          <span className="flex items-center gap-1">
                            <Palette className="w-3 h-3 text-zinc-400" /> Theme Accent
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-1">
                          {THEMES.map((theme) => {
                            const isSelected = theme.id === currentTheme;
                            return (
                              <button
                                key={theme.id}
                                onClick={() => handleSelectTheme(theme.id)}
                                title={theme.name}
                                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                                  isSelected
                                    ? 'ring-2 ring-white scale-110 shadow-sm'
                                    : 'opacity-70 hover:opacity-100 hover:scale-105'
                                }`}
                                style={{ backgroundColor: theme.hex }}
                              >
                                {isSelected && <Check className="w-3 h-3 text-black stroke-[3]" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Tools & Toggles */}
                      <div className="border-t border-white/[0.06] pt-1.5 space-y-0.5 text-xs">
                        <button
                          onClick={toggleSound}
                          className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.05] transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            {soundOn ? (
                              <Volume2 className="w-3.5 h-3.5 text-lime-400" />
                            ) : (
                              <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
                            )}
                            <span>Sound Effects</span>
                          </span>
                          <span className="text-[10px] font-mono text-zinc-400">
                            {soundOn ? 'ON' : 'OFF'}
                          </span>
                        </button>

                        <button
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            setIsShortcutsOpen(true);
                          }}
                          className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.05] transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <Keyboard className="w-3.5 h-3.5 text-purple-400" />
                            <span>Shortcuts</span>
                          </span>
                          <kbd className="px-1.5 py-0.2 text-[10px] font-mono bg-white/[0.06] rounded text-zinc-400">
                            ?
                          </kbd>
                        </button>

                        <button
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            onOpenInstallModal?.();
                          }}
                          className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.05] transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <Download className="w-3.5 h-3.5 text-lime-400" />
                            <span>Install App</span>
                          </span>
                          <span className="text-[10px] font-mono text-lime-400">
                            PWA
                          </span>
                        </button>

                        <div className="my-1 border-t border-white/[0.06]" />

                        <button
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 transition font-medium"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Exit Den (Sign Out)</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-white/[0.06] transition"
              >
                Sign In
              </button>
              <button
                onClick={() => setIsOnboardingModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-black text-xs font-bold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(163,230,53,0.3)]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Join Den</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Keyboard Shortcuts Modal */}
      <ShortcutsModal isOpen={isShortcutsOpen} onClose={() => setIsShortcutsOpen(false)} />
    </header>
  );
};
