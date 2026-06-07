/**
 * analytics.ts — GA4 lead generation event tracking.
 *
 * Fires `generate_lead` when users interact with lead-generation CTAs:
 * - Online booking (HeyDoc)
 * - Phone calls
 * - Email enquiries
 *
 * Assumes GA4/gtag is already loaded on the page.
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

type LeadType = 'online_booking' | 'phone_call' | 'email_enquiry';

function fireGenerateLead(leadType: LeadType, linkText?: string) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', 'generate_lead', {
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

    if (href === bookingUrl || href.includes('heydoc.co.uk')) {
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
