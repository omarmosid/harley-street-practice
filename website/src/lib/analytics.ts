/**
 * analytics.ts — GTM / GA4 lead generation event tracking.
 *
 * Fires `generate_lead` when users interact with lead-generation CTAs:
 * - Online booking / appointments page
 * - Phone calls
 * - Email enquiries
 *
 * Pushes a `generate_lead` event to the GTM dataLayer. Google Consent Mode
 * controls whether GA4 receives cookieless or full analytics data.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

type LeadType = 'online_booking' | 'phone_call' | 'email_enquiry';

function fireGenerateLead(leadType: LeadType, linkText?: string) {
  if (typeof window === 'undefined') {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'generate_lead',
    lead_type: leadType,
    page_location: window.location.href,
    page_path: window.location.pathname,
    ...(linkText ? { link_text: linkText } : {}),
  });
}

function getLinkText(anchor: HTMLAnchorElement): string | undefined {
  return (
    anchor.getAttribute('aria-label')?.trim() ||
    anchor.textContent?.trim() ||
    undefined
  );
}

function isOnlineBookingHref(href: string, bookingUrl: string): boolean {
  if (href === bookingUrl || href.includes('heydoc.co.uk')) {
    return true;
  }

  try {
    const url = new URL(href, window.location.href);
    return (
      (url.hostname === 'londonhspractice.co.uk' ||
        url.hostname === 'www.londonhspractice.co.uk') &&
      url.pathname.replace(/\/$/, '') === '/appointments'
    );
  } catch {
    return false;
  }
}

export function initLeadTracking() {
  const bookingUrl = document.body.dataset.bookingUrl;
  if (!bookingUrl) return;

  document.addEventListener('click', (event) => {
    const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>(
      'a[href]'
    );
    if (!anchor) return;

    const href = anchor.getAttribute('href') || '';
    const text = getLinkText(anchor);

    if (isOnlineBookingHref(href, bookingUrl)) {
      fireGenerateLead('online_booking', text);
      return;
    }

    if (href.startsWith('tel:')) {
      fireGenerateLead('phone_call', text);
      return;
    }

    if (href.startsWith('mailto:')) {
      fireGenerateLead('email_enquiry', text);
      return;
    }
  });
}

// Auto-init when imported as a module-script.
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLeadTracking);
  } else {
    initLeadTracking();
  }
}
