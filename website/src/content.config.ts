/**
 * Astro content collections.
 *
 * Architecture
 * ------------
 * - `services`      → the 6 top-level service hubs (private-gp, health-checks, etc.)
 *                     One MDX entry per service. The MDX body is the long editorial
 *                     copy. Frontmatter holds structured fields used by the layout
 *                     template (eyebrow numbering, hero lede, pricing tiers, FAQs).
 *
 * - `visaCountries` → individual country-specific visa medical pages. We keep one
 *                     entry per country to preserve long-tail SEO ("[country] visa
 *                     medical london").
 *
 * - `team`          → practitioners. One entry per doctor / therapist.
 *
 * - `testimonials`  → patient reviews scraped from the existing site. Authored as
 *                     small data objects (no MDX body needed).
 *
 * - `insights`      → blog / editorial articles.
 *
 * All schemas keep their fields minimal but typed. We use Zod's defaults so MDX
 * authors can omit optional structure when not needed.
 */

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** A single price tier (e.g. one of the 16 health check tiers). */
const tierSchema = z.object({
  name: z.string(),
  price: z.string(), // free-form string; some tiers are "£2665 / £3865*"
  duration: z.string().optional(),
  description: z.string().optional(),
  /** Bullet list of what's included. */
  includes: z.array(z.string()).default([]),
  /** Marks the tier as the recommended / flagship option. */
  featured: z.boolean().default(false),
  /** Optional anchor id for in-page linking. */
  anchor: z.string().optional(),
});

/** A grouping of tiers with an optional heading + lede. */
const tierGroupSchema = z.object({
  heading: z.string().optional(),
  lede: z.string().optional(),
  tiers: z.array(tierSchema),
});

const faqSchema = z.object({
  question: z.string(),
  answer: z.string(), // plain markdown allowed inside MDX renderer
});

/* --------------------------------------------------------------------------- */
/*  Services                                                                   */
/* --------------------------------------------------------------------------- */

const services = defineCollection({
  loader: glob({ base: './src/content/services', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      /** URL slug + ordering in the index. */
      order: z.number().int().min(1).max(99),
      /** Display title used in eyebrows + hero. */
      title: z.string(),
      /** Optional short label (used in nav, breadcrumbs). */
      shortTitle: z.string().optional(),
      /** Hero lede, shown directly under the headline. */
      lede: z.string(),
      /** Used for <title>, OG, and search summaries. */
      seoTitle: z.string(),
      seoDescription: z.string(),
      /** Optional hero image — most pages will be type-led, no image. */
      heroImage: z.optional(image()),
      heroImageAlt: z.string().optional(),
      /** Optional structured pricing groups (used by Health Checks). */
      tierGroups: z.array(tierGroupSchema).default([]),
      /** Optional FAQ entries appended to the page. */
      faqs: z.array(faqSchema).default([]),
      /** Mono support line: "From £180. Same-day appointments." */
      supportLine: z.string().optional(),
      /** Whether to render the visa-country grid below the body (only set on visa-medicals). */
      showVisaCountries: z.boolean().default(false),
    }),
});

/* --------------------------------------------------------------------------- */
/*  Visa countries                                                             */
/* --------------------------------------------------------------------------- */

const visaCountries = defineCollection({
  loader: glob({ base: './src/content/visa-countries', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    country: z.string(),
    /** Two-letter ISO code where useful (sorting, flags later). */
    iso: z.string().length(2).optional(),
    /** Short summary shown on the visa-medicals hub grid. */
    summary: z.string(),
    /** Page meta. */
    seoTitle: z.string(),
    seoDescription: z.string(),
    /** Optional list of required documents / certificates for this country. */
    requirements: z.array(z.string()).default([]),
    /** Optional fee. */
    fee: z.string().optional(),
    /** Estimated duration of the appointment. */
    duration: z.string().optional(),
  }),
});

/* --------------------------------------------------------------------------- */
/*  Team                                                                       */
/* --------------------------------------------------------------------------- */

const team = defineCollection({
  loader: glob({ base: './src/content/team', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      order: z.number().int(),
      name: z.string(),
      /** Honorific + role, e.g. "Dr · Medical Director" or "Mr · Chiropractor". */
      role: z.string(),
      /** GMC / professional registration number, preserved verbatim. */
      registration: z.string().optional(),
      portrait: z.optional(image()),
      portraitAlt: z.string().optional(),
      /** Short tagline shown on team index cards. */
      summary: z.string(),
      /** Listed credentials, in order. */
      credentials: z.array(z.string()).default([]),
      /** Areas of clinical interest. */
      specialties: z.array(z.string()).default([]),
      seoTitle: z.string().optional(),
      seoDescription: z.string().optional(),
    }),
});

/* --------------------------------------------------------------------------- */
/*  Testimonials                                                               */
/* --------------------------------------------------------------------------- */

const testimonials = defineCollection({
  loader: glob({ base: './src/content/testimonials', pattern: '**/*.json' }),
  schema: z.object({
    author: z.string(),
    when: z.string(),
    text: z.string(),
  }),
});

/* --------------------------------------------------------------------------- */
/*  Insights                                                                   */
/* --------------------------------------------------------------------------- */

const insights = defineCollection({
  loader: glob({ base: './src/content/insights', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      lede: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      author: z.string().optional(),
      heroImage: z.optional(image()),
      heroImageAlt: z.string().optional(),
      tags: z.array(z.string()).default([]),
      seoTitle: z.string().optional(),
      seoDescription: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = {
  services,
  visaCountries,
  team,
  testimonials,
  insights,
};
