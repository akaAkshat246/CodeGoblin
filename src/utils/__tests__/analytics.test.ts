import { describe, it, expect, vi, beforeEach } from 'vitest';
import { analytics } from '../analytics';

describe('CodeGoblins Telemetry & Analytics Tracker', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should track custom high-intent community events safely', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    analytics.trackEvent('workshop_register_click', {
      event_id: 'work_1',
      title: 'Vibe Coding Masterclass',
      price: 0
    });

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should forward virtual page views to dataLayer when gtag is available', () => {
    const mockGtag = vi.fn();
    (globalThis as any).window = {
      location: { href: 'https://codegoblins.in/store' },
      gtag: mockGtag
    };

    analytics.trackPageView('resources_store', 'Developer Resources Store');

    expect(mockGtag).toHaveBeenCalledWith('event', 'page_view', {
      page_title: 'Developer Resources Store',
      page_location: 'https://codegoblins.in/store',
      page_path: '/resources_store'
    });
  });
});
