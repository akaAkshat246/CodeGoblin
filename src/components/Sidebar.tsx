import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  PackageOpen,
  Hammer,
  Users2,
  Scroll,
  MessageSquare,
  Crown,
  UserCheck,
  Megaphone,
  User,
  Settings,
  ShieldCheck,
  PanelLeftClose,
  Globe
} from 'lucide-react';
import { useApp, NavigationPage } from '../context/AppContext';
import { isAdminEmail } from '../utils/adminAuth';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  id: NavigationPage;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  requiresAdmin?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { activePage, navigateTo, currentUser } = useApp();

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'learning_hub', label: 'Learning Hub', icon: BookOpen },
    { id: 'hackathons', label: 'Events & Workshops', icon: Trophy },
    { id: 'resources_store', label: 'Resources Store', icon: PackageOpen },
    { id: 'projects', label: 'Project Forge', icon: Hammer },
    { id: 'squads', label: 'Teams & Squads', icon: Users2 },
    { id: 'quests', label: 'Quests', icon: Scroll },
    { id: 'discussions', label: 'The Goblin Den', icon: MessageSquare },
    { id: 'leaderboards', label: 'Leaderboards', icon: Crown },
    { id: 'members', label: 'Goblin Directory', icon: UserCheck },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
  ];

  const bottomItems: NavItem[] = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'admin', label: 'Admin', icon: ShieldCheck, requiresAdmin: true },
    { id: 'landing', label: 'Public Site', icon: Globe },
  ];

  const handleNavClick = (page: NavigationPage) => {
    navigateTo(page);
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      onClose();
    }
  };

  const isNavActive = (page: NavigationPage) => {
    if (activePage === page) return true;
    if (page === 'discussions' && activePage === 'discussion_detail') return true;
    if (page === 'projects' && activePage === 'project_detail') return true;
    return false;
  };

  const isUserAdmin =
    currentUser?.role === 'Administrator' ||
    currentUser?.role === 'Moderator' ||
    isAdminEmail(currentUser?.email);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
        />
      )}

      {/* Main Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 w-60 bg-[#09090F]/95 backdrop-blur-xl border-r border-white/[0.06] flex flex-col justify-between p-3 z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Navigation List */}
        <div className="space-y-4 overflow-y-auto pr-1 scrollbar-none">
          {/* Header with collapse button */}
          <div className="flex items-center justify-between px-2 pt-1 pb-1">
            <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
              Navigation
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              title="Hide sidebar"
              aria-label="Hide sidebar"
            >
              <PanelLeftClose className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Primary Nav */}
          <nav className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isNavActive(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors group ${
                    active
                      ? 'bg-white/[0.08] text-white font-medium'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 transition-colors ${
                      active ? 'text-lime-400' : 'text-zinc-400 group-hover:text-white'
                    }`} />
                    <span>{item.label}</span>
                  </div>

                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="pt-3 border-t border-white/[0.06] space-y-0.5">
          {bottomItems
            .filter((item) => !item.requiresAdmin || isUserAdmin)
            .map((item) => {
              const Icon = item.icon;
              const active = isNavActive(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors group ${
                    active
                      ? 'bg-white/[0.08] text-white font-medium'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 transition-colors ${
                      active ? 'text-lime-400' : 'text-zinc-400 group-hover:text-white'
                    }`} />
                    <span>{item.label}</span>
                  </div>

                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                  )}
                </button>
              );
            })}
        </div>
      </aside>
    </>
  );
};
