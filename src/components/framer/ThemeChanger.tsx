import React, { useState, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';

export interface ThemeColor {
  id: string;
  name: string;
  hex: string;
  rgb: string;
  twClass: string;
}

export const THEMES: ThemeColor[] = [
  { id: 'lime', name: 'Goblin Lime', hex: '#A3E635', rgb: '163, 230, 53', twClass: 'bg-lime-400' },
  { id: 'purple', name: 'Arcane Purple', hex: '#A855F7', rgb: '168, 85, 247', twClass: 'bg-purple-500' },
  { id: 'amber', name: 'Ember Orange', hex: '#F59E0B', rgb: '245, 158, 11', twClass: 'bg-amber-500' },
  { id: 'cyan', name: 'Cyber Cyan', hex: '#06B6D4', rgb: '6, 182, 212', twClass: 'bg-cyan-500' },
  { id: 'emerald', name: 'Matrix Emerald', hex: '#10B981', rgb: '16, 185, 129', twClass: 'bg-emerald-500' },
];

export const ThemeChanger: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [currentTheme, setCurrentTheme] = useState<string>('lime');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('codegoblins_accent_theme');
    if (saved && THEMES.some((t) => t.id === saved)) {
      setTheme(saved);
    }
  }, []);

  const setTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    localStorage.setItem('codegoblins_accent_theme', themeId);
    const theme = THEMES.find((t) => t.id === themeId);
    if (theme) {
      document.documentElement.style.setProperty('--accent-color', theme.hex);
      document.documentElement.style.setProperty('--accent-rgb', theme.rgb);
    }
  };

  const activeThemeObj = THEMES.find((t) => t.id === currentTheme) || THEMES[0];

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all shadow-sm"
        title="Change Accent Theme"
        aria-label="Change Accent Theme"
      >
        <span
          className="w-3 h-3 rounded-full shadow-[0_0_8px_currentColor]"
          style={{ backgroundColor: activeThemeObj.hex, color: activeThemeObj.hex }}
        />
        <Palette className="w-3.5 h-3.5 text-zinc-400" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 p-2 rounded-2xl bg-[#12121c]/95 backdrop-blur-xl border border-white/15 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 px-2 py-1 mb-1">
              Accent Theme
            </div>
            <div className="space-y-1">
              {THEMES.map((theme) => {
                const isSelected = theme.id === currentTheme;
                return (
                  <button
                    key={theme.id}
                    onClick={() => {
                      setTheme(theme.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      isSelected
                        ? 'bg-white/10 text-white'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: theme.hex }}
                      />
                      <span>{theme.name}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

