import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  PackageOpen,
  MessageSquare,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useApp, NavigationPage } from '../context/AppContext';
import { isAdminEmail } from '../utils/adminAuth';

export const AndroidQuickDock: React.FC = () => {
  const { activePage, navigateTo, currentUser } = useApp();

  const isUserAdmin = currentUser?.role === 'Administrator' || isAdminEmail(currentUser?.email);

  const dockApps = [
    {
      id: 'dashboard' as NavigationPage,
      label: 'HQ',
      icon: LayoutDashboard,
      color: '#A3E635',
      bgColor: 'bg-[#A3E635]/15',
      borderColor: 'border-[#A3E635]/30',
      textColor: 'text-[#A3E635]'
    },
    {
      id: 'learning_hub' as NavigationPage,
      label: 'Learn',
      icon: BookOpen,
      color: '#8B5CF6',
      bgColor: 'bg-[#8B5CF6]/15',
      borderColor: 'border-[#8B5CF6]/30',
      textColor: 'text-[#C084FC]'
    },
    {
      id: 'hackathons' as NavigationPage,
      label: 'Sprints',
      icon: Trophy,
      color: '#F59E0B',
      bgColor: 'bg-amber-500/15',
      borderColor: 'border-amber-500/30',
      textColor: 'text-amber-400'
    },
    {
      id: 'resources_store' as NavigationPage,
      label: 'Armory',
      icon: PackageOpen,
      color: '#38BDF8',
      bgColor: 'bg-sky-500/15',
      borderColor: 'border-sky-500/30',
      textColor: 'text-sky-400'
    },
    {
      id: 'discussions' as NavigationPage,
      label: 'Arena',
      icon: MessageSquare,
      color: '#EC4899',
      bgColor: 'bg-pink-500/15',
      borderColor: 'border-pink-500/30',
      textColor: 'text-pink-400'
    },
    {
      id: 'admin' as NavigationPage,
      label: isUserAdmin ? 'Admin' : 'VIP Gate',
      icon: ShieldCheck,
      color: '#FBBF24',
      bgColor: 'bg-amber-400/20',
      borderColor: 'border-amber-400/40',
      textColor: 'text-amber-300',
      isAdminSpecial: true
    }
  ];

  return (
    <aside
      aria-label="Android Quick Navigation Dock"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 hidden sm:flex items-center gap-1.5 p-2 rounded-[28px] glass-panel border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-3 duration-300"
    >
      {dockApps.map((app) => {
        const Icon = app.icon;
        const isActive = activePage === app.id;

        return (
          <button
            key={app.id}
            onClick={() => navigateTo(app.id)}
            className={`group relative flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-200 active:scale-90 ${
              isActive
                ? 'bg-white/10 shadow-sm scale-105'
                : 'hover:bg-white/5 opacity-80 hover:opacity-100'
            }`}
            title={app.label}
          >
            {/* Android Squircle Icon Container */}
            <div
              className={`w-10 h-10 rounded-[14px] flex items-center justify-center transition-all duration-200 ${
                app.bgColor
              } ${app.borderColor} border ${
                isActive ? 'ring-2 ring-white/30 shadow-md' : 'group-hover:scale-105'
              }`}
            >
              <Icon className={`w-5 h-5 ${app.textColor}`} />
            </div>

            {/* App Label */}
            <span
              className={`text-[10px] font-bold mt-1 tracking-tight transition-colors ${
                isActive ? 'text-[#F5F3FF]' : 'text-[#A1A1B5] group-hover:text-[#F5F3FF]'
              }`}
            >
              {app.label}
            </span>

            {/* Android Material You Active Pill Dot */}
            {isActive && (
              <span
                className="absolute -bottom-1 w-4 h-1 rounded-full bg-[#A3E635] shadow-[0_0_8px_#A3E635]"
              />
            )}
          </button>
        );
      })}
    </aside>
  );
};
