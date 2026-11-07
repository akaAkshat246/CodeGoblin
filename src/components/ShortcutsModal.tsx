import React from 'react';
import { X, Command, Keyboard } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Ctrl + K', desc: 'Universal command search & jump' },
    { key: 'Ctrl + B', desc: 'Toggle minimal sidebar (hide / expand)' },
    { key: '?', desc: 'Toggle keyboard shortcuts cheatsheet' },
    { key: 'Esc', desc: 'Close open modal or active drawer' },
  ];

  const navigations = [
    { key: 'G then D', desc: 'Jump to Home / Dashboard' },
    { key: 'G then E', desc: 'Jump to Events & Workshops' },
    { key: 'G then P', desc: 'Jump to Project Forge' },
    { key: 'G then S', desc: 'Jump to Teams & Squads' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md p-6 rounded-2xl bg-[#111118] border border-white/10 shadow-2xl text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <Keyboard className="w-4 h-4 text-lime-400" />
          <h3 className="text-base font-semibold text-white">Keyboard Shortcuts</h3>
        </div>
        <p className="text-xs text-zinc-400 mb-4">
          Navigate the Den like a pro with fast keyboard controls.
        </p>

        <div className="space-y-4 text-xs">
          <div>
            <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider block mb-2">
              General
            </span>
            <div className="space-y-1.5">
              {shortcuts.map((sc, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <span className="text-zinc-300">{sc.desc}</span>
                  <kbd className="px-2 py-0.5 rounded bg-black/40 border border-white/10 font-mono text-[11px] text-zinc-300">
                    {sc.key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider block mb-2">
              Fast Navigation
            </span>
            <div className="space-y-1.5">
              {navigations.map((sc, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <span className="text-zinc-300">{sc.desc}</span>
                  <kbd className="px-2 py-0.5 rounded bg-black/40 border border-white/10 font-mono text-[11px] text-zinc-300">
                    {sc.key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-500">
          <span>Press Esc to dismiss</span>
          <span className="text-lime-400">CodeGoblins Den v2.1</span>
        </div>
      </div>
    </div>
  );
};

