import React, { useEffect } from 'react';
import { analytics } from '../utils/analytics';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  pageId?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath,
  pageId
}) => {
  useEffect(() => {
    // 1. Update Title
    const fullTitle = `${title} | CodeGoblins`;
    document.title = fullTitle;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      metaDesc.setAttribute('content', description);
      document.head.appendChild(metaDesc);
    }

    // 3. Update Canonical Link
    if (canonicalPath) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      const canonicalUrl = `https://codegoblins.in${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;
      if (linkCanonical) {
        linkCanonical.setAttribute('href', canonicalUrl);
      } else {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        linkCanonical.setAttribute('href', canonicalUrl);
        document.head.appendChild(linkCanonical);
      }
    }

    // 4. Fire virtual analytics pageview
    if (pageId) {
      analytics.trackPageView(pageId, title);
    }
  }, [title, description, canonicalPath, pageId]);

  return null;
};

