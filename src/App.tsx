import React, { useState } from 'react';
import { useApp } from './context/AppContext';
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

export const AppContent: React.FC = () => {
  const { activePage } = useApp();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const isLanding = activePage === 'landing';

  return (
    <div className="min-h-screen bg-[#09090F] text-[#F5F3FF] flex flex-col font-sans selection:bg-[#8B5CF6]/30 selection:text-[#A3E635]">
      {/* Global Modals & Notifications */}
      <ToastContainer />
      <LevelUpModal />
      <AuthModal />
      <OnboardingModal />
      <GlobalSearchModal />

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
            onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            isMobileSidebarOpen={isMobileSidebarOpen}
          />
          <div className="flex-1 flex w-full">
            {/* Desktop & Mobile Sidebar */}
            <Sidebar
              isMobileOpen={isMobileSidebarOpen}
              onCloseMobile={() => setIsMobileSidebarOpen(false)}
            />

          {/* Main Body with Left Margin for Fixed Desktop Sidebar */}
          <main className="flex-1 md:ml-64 min-h-[calc(100vh-4rem)] pb-12 overflow-x-hidden">
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
