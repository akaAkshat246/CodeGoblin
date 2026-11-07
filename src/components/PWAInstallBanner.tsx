import React, { useState, useEffect } from 'react';
import { Download, X, Share, PlusSquare, Smartphone, Check, Sparkles } from 'lucide-react';
import {
  subscribeToInstallPrompt,
  promptPWAInstall,
  isAppInstalled,
  isIOSDevice,
} from '../utils/pwaInstall';
import { playClickTick, playSuccessChime } from '../utils/soundEffects';

interface PWAInstallBannerProps {
  forceShowModal?: boolean;
  onCloseModal?: () => void;
}

export const PWAInstallBanner: React.FC<PWAInstallBannerProps> = ({
  forceShowModal = false,
  onCloseModal,
}) => {
  const [canInstall, setCanInstall] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    const dismissed = sessionStorage.getItem('codegoblins_pwa_dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
    }

    const unsubscribe = subscribeToInstallPrompt((available) => {
      setCanInstall(available && !isAppInstalled());
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (forceShowModal) {
      if (isIOSDevice()) {
        setShowIOSModal(true);
      } else {
        handleTriggerInstall();
      }
    }
  }, [forceShowModal]);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('codegoblins_pwa_dismissed', 'true');
    playClickTick();
  };

  const handleTriggerInstall = async () => {
    playClickTick();
    const result = await promptPWAInstall();

    if (result === 'accepted') {
      setInstallSuccess(true);
      playSuccessChime();
      setTimeout(() => {
        setIsDismissed(true);
        if (onCloseModal) onCloseModal();
      }, 2500);
    } else if (result === 'ios') {
      setShowIOSModal(true);
    }
  };

  // If already installed or dismissed (and not forced open), render nothing
  const shouldShowFloatingBanner =
    canInstall && !isDismissed && !isAppInstalled() && !forceShowModal;

  return (
    <>
      {/* 1. Floating Desktop/Mobile Install Pill */}
      {shouldShowFloatingBanner && (
        <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 max-w-sm w-[calc(100vw-2rem)] animate-in slide-in-from-bottom-5 duration-300">
          <div className="p-3.5 rounded-2xl bg-[#111119]/95 backdrop-blur-2xl border border-lime-400/30 shadow-[0_10px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(163,230,53,0.15)] flex items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-lime-400/40 bg-[#09090F] shrink-0">
                <img
                  src="/pwa-192x192.png"
                  alt="CodeGoblins App Icon"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-white tracking-wide">
                    CodeGoblins App
                  </h4>
                  <span className="px-1.5 py-0.2 text-[8px] font-bold rounded bg-lime-400/20 text-lime-400 border border-lime-400/30">
                    PWA
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 truncate">
                  Install for faster access & offline mode
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleTriggerInstall}
                className="px-3 py-1.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-black text-xs font-bold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(163,230,53,0.3)] hover:scale-105 active:scale-95"
              >
                <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Install</span>
              </button>
              <button
                onClick={handleDismiss}
                className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.06] transition"
                aria-label="Dismiss install banner"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Success Alert when installed */}
      {installSuccess && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#111119]/95 border border-lime-400 text-lime-400 shadow-2xl flex items-center gap-3 animate-in zoom-in-95 duration-200">
          <Check className="w-5 h-5 text-lime-400" />
          <div>
            <p className="text-xs font-bold text-white">App Installed Successfully!</p>
            <p className="text-[11px] text-zinc-400">CodeGoblins is now ready on your device.</p>
          </div>
        </div>
      )}

      {/* 3. iOS Safari "Add to Home Screen" Walkthrough Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-3xl bg-[#111119] border border-white/10 p-5 text-left shadow-2xl">
            <button
              onClick={() => {
                setShowIOSModal(false);
                if (onCloseModal) onCloseModal();
              }}
              className="absolute top-4 right-4 p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition"
              aria-label="Close instructions"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl overflow-hidden border border-lime-400/40 shrink-0">
                <img src="/pwa-192x192.png" alt="App Icon" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Install CodeGoblins</h3>
                <p className="text-xs text-zinc-400">iOS Safari Installation Guide</p>
              </div>
            </div>

            <p className="text-xs text-zinc-300 mb-4 leading-relaxed">
              Install this web application directly onto your iPhone or iPad home screen in 3 quick taps:
            </p>

            <div className="space-y-3 mb-5">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold shrink-0">
                  1
                </div>
                <div className="text-xs text-zinc-300">
                  Tap the <strong className="text-white inline-flex items-center gap-1 mx-1"><Share className="w-3.5 h-3.5 inline" /> Share</strong> button in Safari's bottom toolbar.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="w-6 h-6 rounded-lg bg-lime-500/20 text-lime-400 flex items-center justify-center text-xs font-bold shrink-0">
                  2
                </div>
                <div className="text-xs text-zinc-300">
                  Scroll down the menu and tap <strong className="text-white inline-flex items-center gap-1 mx-1"><PlusSquare className="w-3.5 h-3.5 inline" /> Add to Home Screen</strong>.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold shrink-0">
                  3
                </div>
                <div className="text-xs text-zinc-300">
                  Tap <strong className="text-white">Add</strong> in the top-right corner to launch CodeGoblins in full-screen native mode.
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setShowIOSModal(false);
                if (onCloseModal) onCloseModal();
              }}
              className="w-full py-2.5 rounded-xl bg-lime-400 hover:bg-lime-300 text-black font-bold text-xs transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};
