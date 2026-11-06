import React, { useState } from 'react';
import { useApp, NavigationPage } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ToastContainer } from './components/ToastContainer';
import { LevelUpModal } from './components/LevelUpModal';
import { AuthModal } from './components/AuthModal';
import { OnboardingModal } from './components/OnboardingModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { DiscoverPage } from './pages/DiscoverPage';
import { DiscussionsPage } from './pages/DiscussionsPage';
import { DiscussionDetailPage } from './pages/DiscussionDetailPage';
import { QuestsPage } from './pages/QuestsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { HackathonsPage } from './pages/HackathonsPage';
import { SquadsPage } from './pages/SquadsPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { MembersPage } from './pages/MembersPage';
import { NineGoblinsHubPage } from './pages/NineGoblinsHubPage';
import { LearningHubPage } from './pages/LearningHubPage';
import { AnnouncementsPage } from './pages/AnnouncementsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { AdminPage } from './pages/AdminPage';
import { ResourcesStorePage } from './pages/ResourcesStorePage';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ShortcutsModal } from './components/ShortcutsModal';
import { AppleDockNavigation } from './components/framer';

export const AppContent: React.FC = () => {
  const { activePage, navigateTo } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true;
  });
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  // Global Keyboard Shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement?.tagName || '').toLowerCase();
      const isInput = activeTag === 'input' || activeTag === 'textarea';

      // Toggle sidebar via Ctrl+B or Cmd+B shortcut
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setIsSidebarOpen((prev) => !prev);
      }

      // Toggle shortcuts cheatsheet via ?
      if (e.key === '?' && !isInput && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isLanding = activePage === 'landing';

  return (
    <div className="min-h-screen bg-[#09090F] text-[#F5F3FF] flex flex-col font-sans selection:bg-[#8B5CF6]/30 selection:text-[#A3E635]">
      {/* Global Modals & Notifications */}
      <ToastContainer />
      <LevelUpModal />
      <AuthModal />
      <OnboardingModal />
      <GlobalSearchModal />
      <ShortcutsModal isOpen={isShortcutsOpen} onClose={() => setIsShortcutsOpen(false)} />

      {/* Landing Page (Full Width View) */}
      {isLanding ? (
        <main className="flex-1">
          <LandingPage />
        </main>
      ) : (
        /* Authenticated & Community Layout (Sidebar + Main Area) */
        <div className="flex-1 flex flex-col w-full">
          {/* Main Den Navbar */}
          <Navbar
            onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
            isSidebarOpen={isSidebarOpen}
          />
          <div className="flex-1 flex w-full">
            {/* Desktop & Mobile Sidebar */}
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
            />

          {/* Main Body with Transitioning Margin for Sidebar */}
          <main className={`flex-1 transition-all duration-300 ease-in-out min-h-[calc(100vh-4rem)] pb-24 md:pb-12 overflow-x-hidden ${
            isSidebarOpen ? 'md:ml-60' : 'ml-0'
          }`}>
            {activePage === 'dashboard' && <DashboardPage />}
            {activePage === 'discover' && <DiscoverPage />}
            {activePage === 'discussions' && <DiscussionsPage />}
            {activePage === 'discussion_detail' && <DiscussionDetailPage />}
            {activePage === 'quests' && <QuestsPage />}
            {activePage === 'projects' && <ProjectsPage />}
            {activePage === 'project_detail' && <ProjectDetailPage />}
            {activePage === 'hackathons' && <HackathonsPage />}
            {activePage === 'squads' && <SquadsPage />}
            {activePage === 'learning_hub' && <LearningHubPage />}
            {activePage === 'resources_store' && <ResourcesStorePage />}
            {activePage === 'leaderboards' && <LeaderboardPage />}
            {activePage === 'members' && <MembersPage />}
            {activePage === 'announcements' && <AnnouncementsPage />}
            {activePage === 'nine_goblins' && <NineGoblinsHubPage />}
            {activePage === 'profile' && <ProfilePage />}
            {activePage === 'settings' && <SettingsPage />}
            {activePage === 'admin' && <AdminPage />}
          </main>

          {/* Mobile Apple Dock Navigation Bar */}
          <div className="md:hidden">
            <AppleDockNavigation
              activeId={
                activePage === 'learning_hub'
                  ? 'learning'
                  : activePage === 'projects' || activePage === 'project_detail'
                  ? 'forge'
                  : activePage === 'discussions' || activePage === 'discussion_detail'
                  ? 'den'
                  : activePage === 'leaderboards'
                  ? 'leaderboard'
                  : activePage === 'resources_store'
                  ? 'resources'
                  : activePage
              }
              onNavigate={(pageId) => {
                let target: NavigationPage = 'dashboard';
                if (pageId === 'learning') target = 'learning_hub';
                else if (pageId === 'forge') target = 'projects';
                else if (pageId === 'den') target = 'discussions';
                else if (pageId === 'leaderboard') target = 'leaderboards';
                else if (pageId === 'resources') target = 'resources_store';
                else if (pageId === 'quests') target = 'quests';
                else if (pageId === 'dashboard') target = 'dashboard';
                navigateTo(target);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}
