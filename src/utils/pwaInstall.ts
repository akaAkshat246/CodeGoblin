// Service Worker Registration for caching & offline support (No UI prompts)
export function initPWA(): void {
  if (typeof window === 'undefined') return;

  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .catch((err) => {
          console.warn('[SW] Service Worker registration failed:', err);
        });
    });
  }
}
