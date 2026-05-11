# AGENTS.md — London Health Check

This file is the operating manual for any AI agent or human working on this repo.
Read it fully before making changes.

---

## 1. Project goals (ranked)

1. **Drive health check bookings** through HeyDoc, phone calls, and email enquiries.
2. **Rank for high-intent private health check searches in London**, including health check, executive health check, well man check, well woman check, and Harley Street preventative screening queries.
3. **Project Harley Street trust** through the London Harley Street Practice operator brand, clinician-led content, clear pricing, and transparent appointment information.
4. **Maintain excellent performance and accessibility** — Lighthouse >=95 on key pages, WCAG 2.1 AA.

Every implementation decision should be evaluated against these goals in order.
If a feature does not help bookings, trust, SEO, or accessibility, it probably should not ship.

---

## 1a. Site relationship

This website is `https://londonhealthcheck.uk`.

It is a dedicated health-check-focused sister site operated by London Harley Street Practice (`https://www.londonhspractice.co.uk`), established in 2003. The public-facing brand is **London Health Check**. The trust/operator framing is **by London Harley Street Practice**.

Do not change the current visual identity without explicit instruction. The existing editorial, premium Harley Street design system is the right direction.

The main conversion is always booking a health check appointment through HeyDoc.

---

## 2. Tech stack

- **Framework**: Astro 6 (static-first, islands where needed)
- **Hosting**: Cloudflare Workers via `@astrojs/cloudflare` adapter
- **Styling**: Tailwind CSS v4
- **Content**: Astro Content Collections for services, health checks, team, testimonials, insights
- **Images**: Astro `<Image />` + `sharp`
- **Icons**: `phosphor-astro` via `src/components/ui/Icon.astro`
- **SEO**: `@astrojs/sitemap`, custom JSON-LD helpers, OG tags
- **Booking**: External link to HeyDoc only; no native booking flow

Node >=22.12.0. Use `npm` and preserve `package-lock.json`.

---

## 3. Repository structure

```
harley-street-practice/
├── AGENTS.md                 ← canonical operating manual
├── AGENT.md                  ← pointer to AGENTS.md
├── design.md                 ← visual design reference
├── content-cache/            ← scraped source content; do not re-scrape by default
└── website/                  ← Astro app
    ├── src/
    │   ├── assets/           ← imported images and brand assets
    │   ├── components/       ← reusable Astro components
    │   ├── content/
    │   │   ├── health-checks/← one page per health check tier
    │   │   ├── services/     ← legacy/service pages kept live
    │   │   ├── team/         ← legacy/supporting pages kept live
    │   │   ├── testimonials/
    │   │   └── insights/     ← health library articles
    │   ├── layouts/
    │   ├── pages/
    │   ├── styles/
    │   ├── lib/
    │   ├── consts.ts         ← brand config, booking URL, phone, nav
    │   └── content.config.ts
    ├── public/
    ├── astro.config.mjs
    ├── wrangler.jsonc
    └── package.json
```

The routes `/`, `/health-checks`, `/health-checks/[slug]`, `/pricing`, `/how-it-works`, `/about`, and `/contact` are the main conversion/SEO surface for this site.

---

## 4. Content cache convention

The old Squarespace site is the source of truth for source content, prices, practitioner names, medical wording, testimonials, and images.

- Read from `content-cache/` when drafting or migrating copy.
- Do not re-scrape unless the user explicitly asks to refresh content or content is missing.
- Preserve medical, regulatory, price, and practitioner-qualification details accurately.
- Do not invent testimonials, clinicians, clinical claims, prices, or guarantees.
- Health check tier data currently comes from `website/src/content/services/health-checks.mdx` and `content-cache/pages/health-checks.md`.

---

## 5. Design system

Keep the existing premium editorial identity.

Rules:

- Use the existing warm cream, ink, muted gold, Fraunces, and Inter system.
- Do not introduce a new brand style unless explicitly requested.
- Buttons remain hard-edged ink rectangles (`rounded-[2px]`), uppercase tracking, no pill/SaaS styling.
- Use Tailwind utilities and shared tokens. Avoid inline colours or arbitrary new visual systems.
- Continue to use local image imports and Astro `<Image />` for performance.
- `@layer base` in `global.css` is required so utilities override base element resets.

---

## 6. SEO conventions

Every routable page must include:

1. `<BaseHead>` with title, description, canonical URL, OG tags, and Twitter card.
2. A unique, keyword-aware `<h1>`.
3. Crawlable internal links to related health check pages, pricing, how it works, or contact.
4. A primary booking CTA above the fold.
5. Appropriate JSON-LD:
   - Home: `MedicalBusiness` + `WebSite`
   - `/health-checks`: `ItemList` + breadcrumbs
   - Tier pages: `MedicalProcedure` + `Offer` + `BreadcrumbList` + `FAQPage` when FAQs exist
   - `/pricing`: `ItemList`
   - `/how-it-works`: `HowTo` + `FAQPage` when FAQs exist
   - `/about`: `AboutPage` with operator relationship
   - `/contact`: `ContactPage` / `MedicalBusiness` NAP consistency
   - Articles: `Article` + `BreadcrumbList`

Canonical URLs must use `https://londonhealthcheck.uk` through `SITE_URL` in `src/consts.ts`.

Sitemap is auto-generated by `@astrojs/sitemap`. `robots.txt` should allow crawling and reference the generated sitemap index.

---

## 7. Booking and lead capture

- The practice uses HeyDoc for online booking.
- The booking URL is in `src/consts.ts` as `BOOKING_URL`. Never hard-code it elsewhere.
- All booking CTAs link to `BOOKING_URL` with `target="_blank" rel="noopener noreferrer"`.
- Phone and email links are in `src/consts.ts` and must be reused for NAP consistency.
- The goal of every main page is to move the user towards booking or calling about a health check.

---

## 8. Health check pages

Each health check tier should have a dedicated page under `/health-checks/[slug]`.

Preferred tier-page structure:

- Breadcrumbs
- Hero with tier name, price, duration, summary, Book CTA, call CTA
- Who it is for
- What is included
- How the appointment works
- Preparation and fasting guidance where relevant
- Results and follow-up
- FAQs
- Related checks
- Final booking CTA

Use clear, medically cautious British English. Do not overpromise outcomes or imply screening prevents disease.

---

## 9. Coding conventions

- Astro components first. Use client-side frameworks only when interaction genuinely requires them.
- Semantic HTML always.
- Headings in order; no skipped heading levels.
- Images use Astro `<Image />` with explicit sizing and useful alt text.
- External links open in a new tab with `rel="noopener noreferrer"`.
- No third-party scripts, analytics, chat, or marketing pixels without explicit approval.
- Accessibility: visible focus states, labelled form fields, meaningful link text, hit targets >=44x44.

---

## 10. Hidden-but-live pages

These existing routes remain live for SEO continuity and incoming links, but should not be promoted in the primary header/footer navigation unless explicitly requested:

- `/services`
- `/services/[slug]`
- `/services/visa-medicals/[country]`
- `/team`
- `/membership`
- `/corporate`
- `/appointments`

Insights are still useful as health-library/E-E-A-T content. Keep `/insights` and `/insights/[slug]` live and link them lightly from the footer as a health library.

Do not delete, redirect, or noindex hidden-but-live pages unless the user explicitly asks.

---

## 11. Definition of done

A page is done when:

- Lighthouse remains >=95 where feasible.
- It renders correctly at 320px, 768px, 1024px, and 1440px.
- It has unique title, meta description, canonical URL, and OG tags.
- It has appropriate JSON-LD.
- It contains a visible booking CTA above the fold.
- All booking, phone, and email links come from `src/consts.ts`.
- It works with JavaScript disabled where possible.

---

## 12. Build, dev, deploy

```bash
cd website
npm install
npm run dev
npm run build
npm run preview
npm run deploy
```

Do not deploy without explicit user instruction.

---

## 13. What not to do

- Do not modify the live `londonhspractice.co.uk` site.
- Do not delete or move existing support pages without explicit instruction.
- Do not invent testimonials, clinicians, prices, tests, clinical claims, or regulatory details.
- Do not add analytics, chat, tracking pixels, or third-party marketing scripts without approval.
- Do not push, deploy, or commit without explicit user instruction.
- Do not bypass the existing design system.
- Do not commit secrets, API keys, or `.env` files.
