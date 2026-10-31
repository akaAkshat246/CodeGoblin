// CodeGoblins Enterprise Analytics Engine
// Plugs into Google Analytics 4 (GA4), Search Console, and PostHog telemetry

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export type AnalyticsEventType =
  | 'page_view'
  | 'join_community_click'
  | 'workshop_register_click'
  | 'workshop_payment_success'
  | 'project_submitted'
  | 'project_liked'
  | 'resource_downloaded'
  | 'resource_copied'
  | 'guide_started'
  | 'guide_completed'
  | 'squad_joined'
  | 'quest_completed'
  | 'admin_action';

export interface AnalyticsEventProps {
  [key: string]: string | number | boolean | undefined;
}

class AnalyticsService {
  private isProduction = typeof import.meta !== 'undefined' && Boolean(import.meta.env?.PROD);
  private debugMode = !this.isProduction;

  /**
   * Track high-intent custom events
   */
  public trackEvent(eventName: AnalyticsEventType, properties?: AnalyticsEventProps): void {
    if (this.debugMode) {
      console.log(`%c[Analytics: ${eventName}]`, 'color: #A3E635; font-weight: bold;', properties || {});
    }

    // Google Analytics 4 integration
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, properties);
    }
  }

  /**
   * Track virtual page transitions (SPA / Next.js routing)
   */
  public trackPageView(pageName: string, title?: string): void {
    if (this.debugMode) {
      console.log(`%c[Analytics PageView] -> ${pageName}`, 'color: #8B5CF6; font-weight: bold;', { title });
    }

    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_title: title || pageName,
        page_location: window.location.href,
        page_path: `/${pageName}`
      });
    }
  }
}

export const analytics = new AnalyticsService();
