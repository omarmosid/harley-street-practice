/**
 * Brand-wide config. Anything that might appear in more than one place lives here.
 * Components MUST import from this file rather than hard-coding values.
 */

export const SITE_NAME = "London Health Check";
export const SITE_TAGLINE = "Private health checks in London. Doctor-led, on Harley Street.";
export const SITE_DESCRIPTION =
  "Doctor-led private health checks on Harley Street, London. Clear pricing, written reports, and online booking.";
export const SITE_URL = "https://londonhealthcheck.uk";

export const OPERATOR = {
  name: "London Harley Street Practice",
  url: "https://www.londonhspractice.co.uk",
  foundingYear: "2003",
} as const;

/** Operator appointments page. Every "Book" CTA links here. */
export const APPOINTMENTS_URL =
  "https://www.londonhspractice.co.uk/appointments";

export function bookingUrl(content?: string): string {
  const params = new URLSearchParams({
    utm_source: "londonhealthcheck",
    utm_medium: "referral",
    utm_campaign: "appointments",
  });

  if (content) {
    params.set("utm_content", content);
  }

  return `${APPOINTMENTS_URL}?${params.toString()}`;
}

/** Default tagged booking URL for shared metadata and fallback usage. */
export const BOOKING_URL = bookingUrl();

export const PRACTICE = {
  phone: {
    display: "0207 127 6563",
    href: "tel:+442071276563",
  },
  email: {
    display: "contact@londonhspractice.co.uk",
    href: "mailto:contact@londonhspractice.co.uk",
  },
  address: {
    line1: "66 Harley Street",
    locality: "London",
    postalCode: "W1G 7HD",
    country: "United Kingdom",
    /** For schema.org / Google Maps */
    geo: { latitude: 51.5210, longitude: -0.1480 },
  },
  hours: {
    weekdays: "Monday–Friday, 9:00–18:30",
    weekends: "Closed (by appointment only)",
  },
  social: {
    instagram: "https://www.instagram.com/london_hs_practice/",
    twitter: "https://twitter.com/LHSPractice",
    facebook: "https://www.facebook.com/London-Harley-Street-Practice-267401657454542/",
  },
} as const;

/** Primary navigation — keep to 5 items. */
export const NAV: ReadonlyArray<{ label: string; href: string }> = [
  { label: "Health Checks", href: "/health-checks" },
  { label: "Pricing", href: "/pricing" },
  { label: "How it works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
];
