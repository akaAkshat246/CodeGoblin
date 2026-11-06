import React, { useState, useEffect } from 'react';
import {
  Flame,
  Search,
  Bell,
  Sparkles,
  ShieldAlert,
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
  SlidersHorizontal,
  ChevronDown,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { GOBLIN_CHARACTERS } from '../data/mockData';
import { isAdminEmail } from '../utils/adminAuth';
import { isSoundEnabled, setSoundEnabled, playSuccessChime, playClickTick } from '../utils/soundEffects';
import { ShortcutsModal } from './ShortcutsModal';
import { HamburgerMenu } from './framer';
import { THEMES, ThemeColor } from './framer/ThemeChanger';

interface NavbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, isSidebarOpen }) => {
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
    markAllNotificationsRead,
  } = useApp();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false);
  const [isStreakPopOpen, setIsStreakPopOpen] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
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
    setIsPreferencesOpen(false);
  };

  const activeGoblin =
    GOBLIN_CHARACTERS.find((g) => g.id === currentUser?.avatarGoblinId) || GOBLIN_CHARACTERS[1];
  const unreadNotifs = notifications.filter((n) => !n.read);
  const isUserAdmin = currentUser?.role === 'Administrator' || isAdminEmail(currentUser?.email);
  const activeThemeObj = THEMES.find((t) => t.id === currentTheme) || THEMES[0];

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
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#09090F]/85 backdrop-blur-2xl shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-15 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Hamburger Toggle & Minimal Brand Logo */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <HamburgerMenu
            isOpen={isSidebarOpen}
            toggle={onToggleSidebar}
            size={18}
            color="#a1a1aa"
            activeColor="#A3E635"
            className="hover:bg-white/[0.06] rounded-xl"
          />

          <button
            onClick={() => navigateTo(currentUser ? 'dashboard' : 'landing')}
            className="flex items-center gap-2 group text-left p-1 rounded-xl hover:bg-white/[0.03] transition-colors"
            title="Go to CodeGoblins HQ"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-lime-400/40 group-hover:border-lime-400 transition-colors duration-300 shrink-0">
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

        {/* Center: Command Search Trigger (Desktop) */}
        <div className="flex-1 max-w-sm lg:max-w-md hidden md:block mx-2">
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#11111B] border border-white/[0.08] hover:border-lime-400/40 text-zinc-400 hover:text-zinc-200 text-xs transition-all group shadow-inner"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-zinc-500 group-hover:text-lime-400 transition-colors" />
              <span className="truncate">Search quests, blueprints, squads...</span>
            </span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white/[0.04] text-zinc-400 rounded border border-white/5">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Right: De-cluttered Control Center */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Mobile Search Button */}
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="md:hidden p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            title="Search the Den"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Public Website Ghost Link */}
          <button
            type="button"
            onClick={() => {
              navigateTo('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            title="Visit Public Website"
          >
            <Globe className="w-3.5 h-3.5 text-zinc-400" />
            <span>Website</span>
          </button>

          {currentUser ? (
            <>
              {/* 1. UNIFIED GAMIFICATION CAPSULE ([ 🔥 15d · ⚡ Lvl 3 ]) */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    const next = !isStreakPopOpen;
                    closeAllMenus();
                    setIsStreakPopOpen(next);
                  }}
                  className={`flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 rounded-xl border text-xs transition-all select-none ${
                    isStreakPopOpen
                      ? 'bg-amber-400/15 border-amber-400/50 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                      : 'bg-[#111118] border-white/[0.08] hover:border-amber-400/40 text-zinc-200 hover:text-white'
                  }`}
                  title="Daily Streak & Builder Level"
                >
                  <div className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20 animate-pulse" />
                    <span className="font-semibold text-amber-400">{currentUser.streakDays}d</span>
                  </div>

                  <span className="text-zinc-600 hidden sm:inline">•</span>

                  <div className="hidden sm:flex items-center gap-1 text-zinc-300">
                    <Sparkles className="w-3 h-3 text-lime-400" />
                    <span className="font-medium text-lime-400">Lvl {currentLevel}</span>
                  </div>
                </button>

                {/* Gamification Popover Details */}
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
                          {currentUser.streakDays} Days Strong
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

                      {/* 7-Day Consistency Weekday Strip */}
                      <div className="mb-3">
                        <span className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-2 font-medium">
                          Week Consistency (Mon - Sun)
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
                            <span>Claim Daily Streak Bonus (+15 XP)</span>
                          </>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* 2. QUICK PREFERENCES & CUSTOMIZATION MENU */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    const next = !isPreferencesOpen;
                    closeAllMenus();
                    setIsPreferencesOpen(next);
                  }}
                  className={`p-2 rounded-xl border transition-all flex items-center justify-center ${
                    isPreferencesOpen
                      ? 'bg-white/[0.1] border-white/30 text-white'
                      : 'bg-[#111118] border-white/[0.08] hover:border-white/20 text-zinc-400 hover:text-white'
                  }`}
                  title="Preferences, Accent Color & Sounds"
                  aria-label="Preferences"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shadow-sm mr-1.5"
                    style={{ backgroundColor: activeThemeObj.hex }}
                  />
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                </button>

                {isPreferencesOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={closeAllMenus} />
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#111119]/95 backdrop-blur-xl border border-white/10 shadow-2xl p-3 z-50 text-left animate-in fade-in zoom-in-95 duration-150 space-y-3">
                      {/* Theme Accent Section */}
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block mb-2 px-1">
                          Theme Accent
                        </span>
                        <div className="grid grid-cols-5 gap-1.5 px-1">
                          {THEMES.map((theme) => {
                            const isSelected = theme.id === currentTheme;
                            return (
                              <button
                                key={theme.id}
                                onClick={() => handleSelectTheme(theme.id)}
                                title={theme.name}
                                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                                  isSelected
                                    ? 'ring-2 ring-white scale-105'
                                    : 'hover:scale-105 opacity-80 hover:opacity-100'
                                }`}
                                style={{ backgroundColor: theme.hex }}
                              >
                                {isSelected && <Check className="w-3.5 h-3.5 text-black" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="border-t border-white/[0.06] pt-2 space-y-1">
                        {/* Audio Feedback Toggle */}
                        <button
                          onClick={toggleSound}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-zinc-300 hover:text-white hover:bg-white/[0.05] transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            {soundOn ? (
                              <Volume2 className="w-3.5 h-3.5 text-lime-400" />
                            ) : (
                              <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
                            )}
                            <span>Sound Feedback</span>
                          </span>
                          <span className="text-[10px] font-mono text-zinc-400">
                            {soundOn ? 'ON' : 'OFF'}
                          </span>
                        </button>

                        {/* Keyboard Shortcuts Trigger */}
                        <button
                          onClick={() => {
                            setIsPreferencesOpen(false);
                            setIsShortcutsOpen(true);
                          }}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-zinc-300 hover:text-white hover:bg-white/[0.05] transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <Keyboard className="w-3.5 h-3.5 text-purple-400" />
                            <span>Shortcuts</span>
                          </span>
                          <kbd className="px-1.5 py-0.2 text-[10px] font-mono bg-white/[0.06] rounded text-zinc-400">
                            ?
                          </kbd>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* 3. NOTIFICATION BELL */}
              <div className="relative">
                <button
                  onClick={() => {
                    const next = !isNotifMenuOpen;
                    closeAllMenus();
                    setIsNotifMenuOpen(next);
                  }}
                  className={`relative p-2 rounded-xl border transition-all ${
                    isNotifMenuOpen
                      ? 'bg-white/[0.1] border-white/30 text-white'
                      : 'bg-[#111118] border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/20'
                  }`}
                  aria-label="Notifications"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadNotifs.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-lime-400 text-black text-[9px] font-black flex items-center justify-center animate-bounce shadow-sm">
                      {unreadNotifs.length}
                    </span>
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
                              ({unreadNotifs.length} unread)
                            </span>
                          )}
                        </div>
                        {unreadNotifs.length > 0 && (
                          <button
                            onClick={markAllNotificationsRead}
                            className="text-[11px] text-purple-400 hover:text-purple-300 transition-colors"
                          >
                            Mark all read
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

              {/* 4. PROFILE AVATAR & DROPDOWN */}
              <div className="relative">
                <button
                  onClick={() => {
                    const next = !isProfileMenuOpen;
                    closeAllMenus();
                    setIsProfileMenuOpen(next);
                  }}
                  className={`flex items-center gap-2 p-1 rounded-xl border transition-all ${
                    isProfileMenuOpen
                      ? 'bg-white/[0.1] border-white/30'
                      : 'bg-[#111118] border-white/[0.08] hover:border-white/20'
                  }`}
                  aria-label="User Profile"
                  title={currentUser.displayName}
                >
                  <img
                    src={activeGoblin.avatarImg}
                    alt={currentUser.displayName}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-cover ring-1 ring-lime-400/40"
                  />
                  <span className="hidden xl:inline-block text-xs font-semibold text-white max-w-[90px] truncate">
                    {currentUser.displayName}
                  </span>
                  <ChevronDown className="w-3 h-3 text-zinc-500 hidden sm:block" />
                </button>

                {isProfileMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={closeAllMenus} />
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#111119]/95 backdrop-blur-xl border border-white/10 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
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

                      <div className="space-y-0.5 text-xs">
                        {/* Admin Badge Shortcut inside Profile */}
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
                className="px-3.5 py-1.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-black text-xs font-bold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(163,230,53,0.3)]"
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
