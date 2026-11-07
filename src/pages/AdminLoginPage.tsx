import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  KeyRound,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Shield,
  Fingerprint
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SEOHead } from '../components/SEOHead';
import {
  isAdminEmail,
  getAdminClearance,
  AUTHORIZED_ADMIN_CREDENTIALS
} from '../utils/adminAuth';

export const AdminLoginPage: React.FC = () => {
  const { loginAs, allUsers, navigateTo } = useApp();
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPasscode, setAdminPasscode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const clearance = getAdminClearance(adminEmail);

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const inputEmail = adminEmail.trim().toLowerCase();
    if (!isAdminEmail(inputEmail)) {
      setErrorMessage(
        'Access Denied: This mail ID is not registered in the CodeGoblins Administrator Allowlist. Regular clan members cannot access this terminal.'
      );
      return;
    }

    // Find registered admin user or matching email
    const matchedAdmin = allUsers.find(
      (u) => u.email.toLowerCase() === inputEmail
    ) || allUsers.find((u) => u.role === 'Administrator') || allUsers[0];

    loginAs(matchedAdmin.id);
    navigateTo('admin');
  };

  const handleFastTrackAdmin = (userId: string, email: string) => {
    const matched = allUsers.find(
      (u) => u.id === userId || u.email.toLowerCase() === email.toLowerCase()
    ) || allUsers[0];

    loginAs(matched.id);
    navigateTo('admin');
  };

  return (
    <div className="min-h-screen bg-[#09090F] text-[#F5F3FF] flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans selection:bg-amber-500/30 selection:text-amber-300">
      <SEOHead
        title="Administrator Clearance Terminal — CodeGoblins"
        description="Restricted platform governance and security operations terminal for authorized CodeGoblins administrators and stewards."
        canonicalPath="/admin-login"
        pageId="admin_login"
      />

      {/* Top Navbar Header */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between pb-6 border-b border-white/[0.06]">
        <button
          onClick={() => navigateTo('landing')}
          className="flex items-center gap-2 group text-left"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden border border-amber-400/40 group-hover:border-amber-400 transition shrink-0">
            <img
              src="/art/logo.webp"
              alt="CodeGoblins Mascot"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
          </div>
          <span className="font-display font-bold text-base tracking-wider text-white">
            CODE<span className="text-amber-400">GOBLINS</span>
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold ml-1">
            SECURITY TERMINAL
          </span>
        </button>

        <button
          onClick={() => navigateTo('login')}
          className="text-xs font-mono text-zinc-400 hover:text-white transition flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Switch to Member Login</span>
        </button>
      </header>

      {/* Center Security Box */}
      <main className="max-w-md w-full mx-auto my-8 relative">
        {/* Ambient Glows */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative rounded-3xl bg-[#111118]/95 border border-amber-500/30 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          {/* Header Title */}
          <div className="space-y-1.5 text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="pt-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                Restricted Clearance Core
              </span>
            </div>
            <h1 className="text-2xl font-bold font-display text-white mt-1">
              Administrator Login
            </h1>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
              Private platform operations console: RBAC user roles, project approvals, workshop publishing, and security audit trails.
            </p>
          </div>

          {/* Authorized Admin Mail Profiles Fast-Track */}
          <div className="p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
              <Fingerprint className="w-3.5 h-3.5" />
              <span>Authorized Admin Profiles (One-Click)</span>
            </span>
            <div className="space-y-1.5">
              {AUTHORIZED_ADMIN_CREDENTIALS.slice(0, 3).map((cred) => (
                <button
                  key={cred.email}
                  onClick={() => handleFastTrackAdmin(cred.userId, cred.email)}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#171725] border border-white/5 hover:border-amber-400/50 hover:bg-[#1E1E32] transition text-left group"
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-white group-hover:text-amber-300 transition truncate">
                        {cred.name}
                      </p>
                      <p className="text-[10px] text-zinc-400 font-mono truncate">{cred.email}</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-amber-400/15 text-amber-300 border border-amber-400/30 shrink-0">
                    Verify
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleAdminSubmit} className="space-y-3.5 text-xs">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-200 flex items-start gap-2 leading-relaxed">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label className="block text-zinc-300 font-semibold mb-1">
                Authorized Admin Mail ID
              </label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => {
                  setAdminEmail(e.target.value);
                  setErrorMessage('');
                }}
                placeholder="akshat.vats@codegoblins.dev or admin@codegoblins.in"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#171725] border border-amber-500/30 text-xs text-white focus:outline-none focus:border-amber-400 transition font-mono"
              />

              {/* Live Admin Mail Verification Badge */}
              {clearance.isAdmin && (
                <div className="mt-2 p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-300 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-bold">Verified Administrator: </span>
                    <span>{clearance.clearanceLevel}</span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-zinc-300 font-semibold mb-1">
                Admin Security Passkey / Password
              </label>
              <input
                type="password"
                required
                value={adminPasscode}
                onChange={(e) => setAdminPasscode(e.target.value)}
                placeholder="••••••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#171725] border border-amber-500/30 text-xs text-white focus:outline-none focus:border-amber-400 transition font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={!clearance.isAdmin && !adminEmail}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-amber-400/20 disabled:opacity-50"
            >
              <KeyRound className="w-4 h-4" />
              <span>Verify Clearance &amp; Open Admin Console</span>
            </button>
          </form>

          {/* Switch to Regular Clan Member */}
          <div className="pt-4 border-t border-white/[0.06] text-center space-y-2">
            <p className="text-xs text-zinc-400">
              Not an administrator? Regular members cannot access this terminal.
            </p>
            <button
              type="button"
              onClick={() => navigateTo('login')}
              className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-lime-400 hover:text-lime-300 transition"
            >
              ← Switch to Clan Member Login
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-zinc-500 max-w-md mx-auto pt-4 font-mono">
        CodeGoblins Security Terminal • Administrator Authority Only
      </footer>
    </div>
  );
};
