// PWA Installation & Service Worker Manager
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

let deferredPrompt: BeforeInstallPromptEvent | null = null;
const listeners = new Set<(canInstall: boolean) => void>();

export function isAppInstalled(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
    document.referrer.includes('android-app://')
  );
}

export function isIOSDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as unknown as { MSStream?: unknown }).MSStream
  );
}

export function initPWA(): void {
  if (typeof window === 'undefined') return;

  // 1. Register Service Worker
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          // Check for worker updates
          reg.onupdatefound = () => {
            const installing = reg.installing;
            if (installing) {
              installing.onstatechange = () => {
                if (installing.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('[PWA] New version available.');
                }
              };
            }
          };
        })
        .catch((err) => {
          console.warn('[PWA] Service Worker registration failed:', err);
        });
    });
  }

  // 2. Capture BeforeInstallPrompt
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
    listeners.forEach((fn) => fn(true));
  });

  // 3. App installed event
  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    listeners.forEach((fn) => fn(false));
    console.log('[PWA] CodeGoblins successfully installed.');
  });
}

export function subscribeToInstallPrompt(callback: (canInstall: boolean) => void): () => void {
  listeners.add(callback);
  callback(deferredPrompt !== null || (isIOSDevice() && !isAppInstalled()));
  return () => listeners.delete(callback);
}

export async function promptPWAInstall(): Promise<'accepted' | 'dismissed' | 'ios' | 'unavailable'> {
  if (isAppInstalled()) return 'unavailable';

  if (deferredPrompt) {
    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        deferredPrompt = null;
        listeners.forEach((fn) => fn(false));
      }
      return choice.outcome;
    } catch (err) {
      console.warn('[PWA] prompt error:', err);
      return 'unavailable';
    }
  }

  if (isIOSDevice()) {
    return 'ios';
  }

  return 'unavailable';
}
