import React, { useState } from 'react';
import {
  Settings,
  Bell,
  Shield,
  Palette,
  User,
  LogOut,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsPage: React.FC = () => {
  const { currentUser, logout } = useApp();

  const [emailNotifs, setEmailNotifs] = useState(true);
  const [questReminders, setQuestReminders] = useState(true);
  const [squadInvites, setSquadInvites] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);
  const [showCollege, setShowCollege] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div>
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-[#8B5CF6]/20 text-[#A855F7]">
            <Settings className="w-5 h-5" />
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-[#F5F3FF]">
            Account & Clan Settings
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[#A1A1B5] mt-1">
          Manage your notifications, privacy preferences, and community visibility.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Privacy & Visibility */}
        <div className="goblin-card p-6 space-y-4">
          <h3 className="text-sm font-bold text-[#F5F3FF] uppercase tracking-wider flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#A3E635]" />
            <span>Privacy & Public Presence</span>
          </h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-[#11111B] border border-white/5 cursor-pointer">
              <div>
                <p className="font-semibold text-[#F5F3FF]">Public Builder Profile</p>
                <p className="text-[11px] text-[#A1A1B5]">Allow other students to find and view your forged projects</p>
              </div>
              <input
                type="checkbox"
                checked={publicProfile}
                onChange={(e) => setPublicProfile(e.target.checked)}
                className="w-4 h-4 rounded accent-[#8B5CF6]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-[#11111B] border border-white/5 cursor-pointer">
              <div>
                <p className="font-semibold text-[#F5F3FF]">Display College & Year of Study</p>
                <p className="text-[11px] text-[#A1A1B5]">Helps connect with campus peers and local hackathon squads</p>
              </div>
              <input
                type="checkbox"
                checked={showCollege}
                onChange={(e) => setShowCollege(e.target.checked)}
                className="w-4 h-4 rounded accent-[#8B5CF6]"
              />
            </label>
          </div>
        </div>

        {/* Notifications */}
        <div className="goblin-card p-6 space-y-4">
          <h3 className="text-sm font-bold text-[#F5F3FF] uppercase tracking-wider flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#8B5CF6]" />
            <span>In-App Notification Alerts</span>
          </h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-[#11111B] border border-white/5 cursor-pointer">
              <div>
                <p className="font-semibold text-[#F5F3FF]">Daily Quest & Streak Alerts</p>
                <p className="text-[11px] text-[#A1A1B5]">Get reminded of new daily quests in Asia/Kolkata timezone</p>
              </div>
              <input
                type="checkbox"
                checked={questReminders}
                onChange={(e) => setQuestReminders(e.target.checked)}
                className="w-4 h-4 rounded accent-[#8B5CF6]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-[#11111B] border border-white/5 cursor-pointer">
              <div>
                <p className="font-semibold text-[#F5F3FF]">Squad & Hackathon Invitations</p>
                <p className="text-[11px] text-[#A1A1B5]">Instant notification when a peer adds you to a team</p>
              </div>
              <input
                type="checkbox"
                checked={squadInvites}
                onChange={(e) => setSquadInvites(e.target.checked)}
                className="w-4 h-4 rounded accent-[#8B5CF6]"
              />
            </label>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-2">
          {saved ? (
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Preferences Saved!</span>
            </span>
          ) : (
            <span />
          )}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={logout}
              className="px-4 py-2.5 rounded-xl border border-rose-500/30 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>

            <button
              type="submit"
              className="goblin-btn-primary px-6 py-2.5 text-xs font-bold"
            >
              Save Preferences
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
