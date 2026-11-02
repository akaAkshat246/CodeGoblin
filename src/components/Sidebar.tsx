import React from 'react';
import {
  LayoutDashboard,
  Compass,
  MessageSquare,
  Scroll,
  Hammer,
  Trophy,
  Users2,
  Crown,
  UserCheck,
  Sparkles,
  User,
  Settings,
  ShieldCheck,
  ChevronRight,
  Zap,
  Globe,
  BookOpen,
  Megaphone,
  PackageOpen
} from 'lucide-react';
import { useApp, NavigationPage } from '../context/AppContext';
import { isAdminEmail } from '../utils/adminAuth';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  id: NavigationPage;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeType?: 'purple' | 'green' | 'amber';
  requiresAdmin?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const { activePage, navigateTo, currentUser, completedQuestIds, squads, announcements } = useApp();

  const navItems: NavItem[] = [
    { id: 'landing', label: '← Public Website', icon: Globe, badge: 'Home', badgeType: 'green' },
    { id: 'dashboard', label: 'Home / Dashboard', icon: LayoutDashboard },
    { id: 'learning_hub', label: 'Learning Hub', icon: BookOpen, badge: 'Roadmaps', badgeType: 'green' },
    { id: 'hackathons', label: 'Events & Workshops', icon: Trophy, badge: 'Live', badgeType: 'amber' },
    { id: 'resources_store', label: 'Resources Store', icon: PackageOpen, badge: 'Blueprints', badgeType: 'green' },
    { id: 'projects', label: 'Project Forge', icon: Hammer },
    { id: 'squads', label: 'Teams & Collaboration', icon: Users2, badge: `${squads.length}`, badgeType: 'purple' },
    { id: 'quests', label: 'Quests & Challenges', icon: Scroll, badge: `${completedQuestIds.length}/5`, badgeType: 'green' },
    { id: 'discussions', label: 'The Goblin Den', icon: MessageSquare, badge: 'Active', badgeType: 'purple' },
    { id: 'leaderboards', label: 'Leaderboards', icon: Crown },
    { id: 'members', label: 'Goblin Directory', icon: UserCheck },
    { id: 'announcements', label: 'Announcements', icon: Megaphone, badge: `${announcements.length}`, badgeType: 'purple' },
    { id: 'nine_goblins', label: 'The Nine Goblins', icon: Sparkles, badge: 'Roles', badgeType: 'green' },
  ];

  const bottomItems: NavItem[] = [
    { id: 'profile', label: 'Profile & Identity', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'admin', label: 'Admin Dashboard', icon: ShieldCheck, requiresAdmin: true, badge: 'Shield', badgeType: 'amber' },
  ];

  const handleNavClick = (page: NavigationPage) => {
    navigateTo(page);
    onCloseMobile();
  };

  const isNavActive = (page: NavigationPage) => {
    if (activePage === page) return true;
    if (page === 'discussions' && activePage === 'discussion_detail') return true;
    if (page === 'projects' && activePage === 'project_detail') return true;
    return false;
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Main Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 w-64 bg-[#09090F]/90 backdrop-blur-2xl border-r border-white/5 flex flex-col justify-between p-3.5 z-40 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Navigation list */}
        <div className="space-y-6 overflow-y-auto pr-1">
          <div>
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-[#A1A1B5]/70 mb-2">
              Community Realm
            </p>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isNavActive(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-[14px] text-xs font-medium transition-all group ${
                      active
                        ? 'bg-[#171725]/90 text-[#F5F3FF] border border-white/10 shadow-sm font-semibold'
                        : 'text-[#A1A1B5] hover:text-[#F5F3FF] hover:bg-[#11111B]/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {/* Android Squircle Icon Container */}
                      <div
                        className={`w-7 h-7 rounded-[9px] flex items-center justify-center transition-all ${
                          active
                            ? 'bg-[#A3E635]/20 text-[#A3E635] border border-[#A3E635]/30 shadow-sm'
                            : 'bg-white/5 text-[#8B5CF6]/80 group-hover:text-white group-hover:bg-[#8B5CF6]/20'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                          item.badgeType === 'green'
                            ? 'bg-[#A3E635]/15 text-[#A3E635]'
                            : item.badgeType === 'amber'
                            ? 'bg-amber-500/15 text-amber-400'
                            : 'bg-[#8B5CF6]/15 text-[#C084FC]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div>
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-[#A1A1B5]/70 mb-2">
              Personal & System
            </p>
            <nav className="space-y-1">
              {bottomItems
                .map((item) => {
                  const Icon = item.icon;
                  const active = isNavActive(item.id);
                  const isItemAdmin = item.id === 'admin';
                  const isUserAdmin = currentUser?.role === 'Administrator' || currentUser?.role === 'Moderator' || isAdminEmail(currentUser?.email);

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-[14px] text-xs font-medium transition-all group ${
                        active
                          ? 'bg-[#171725]/90 text-[#F5F3FF] border border-white/10 shadow-sm font-semibold'
                          : 'text-[#A1A1B5] hover:text-[#F5F3FF] hover:bg-[#11111B]/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {/* Android Squircle Icon Container */}
                        <div
                          className={`w-7 h-7 rounded-[9px] flex items-center justify-center transition-all ${
                            active
                              ? isItemAdmin
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-sm'
                                : 'bg-[#A3E635]/20 text-[#A3E635] border border-[#A3E635]/30 shadow-sm'
                              : isItemAdmin
                              ? 'bg-amber-500/10 text-amber-400/80 group-hover:bg-amber-500/20'
                              : 'bg-white/5 text-[#8B5CF6]/80 group-hover:text-white group-hover:bg-[#8B5CF6]/20'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span>{isItemAdmin && !isUserAdmin ? 'Admin VIP Gate' : item.label}</span>
                      </div>

                      {item.badge && (
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          isItemAdmin ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-white/10 text-white'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
            </nav>
          </div>
        </div>

        {/* Bottom Community Banner Widget */}
        <div className="mt-4 pt-3 border-t border-white/5">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-[#171725] to-[#11111B] border border-[#8B5CF6]/20 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-3.5 h-3.5 text-[#A3E635]" />
              <span className="text-[11px] font-bold text-[#F5F3FF]">Next Build Sprint</span>
            </div>
            <p className="text-[10px] text-[#A1A1B5] leading-snug mb-2">
              GoblinHacks 2026 starts in 18 days. ₹1,50,000 prize pool!
            </p>
            <button
              onClick={() => handleNavClick('hackathons')}
              className="w-full flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/30 text-[#A855F7] text-[11px] font-semibold transition"
            >
              <span>Explore Event</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
