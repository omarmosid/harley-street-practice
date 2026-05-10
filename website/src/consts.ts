/**
 * Brand-wide config. Anything that might appear in more than one place lives here.
 * Components MUST import from this file rather than hard-coding values.
 */

export const SITE_NAME = "London Harley Street Practice";
export const SITE_TAGLINE = "Same-day private GP and multidisciplinary care on Harley Street.";
export const SITE_DESCRIPTION =
  "Private GP clinic at 66 Harley Street, London. Same-day appointments, executive health checks, blood tests, ultrasound, visa medicals, musculoskeletal care, and counselling.";
export const SITE_URL = "https://www.londonhspractice.co.uk"; // update at cutover

/** External booking provider (HeyDoc). Every "Book" CTA links here. */
export const BOOKING_URL =
  "https://online-booking.heydoc.co.uk/?token=4fJrtP4N6GUYmSSUFkUWDOsDBJ28ON4vaxz6wL16";

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
  { label: "Services", href: "/services" },
  { label: "Team", href: "/team" },
  { label: "Membership", href: "/membership" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];
