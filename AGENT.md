# AGENT.md — London Harley Street Practice

This file is the operating manual for any AI agent (or human) working on this repo.
Read it fully before making changes.

---

## 1. Project goals (ranked)

1. **Increase qualified leads** for the practice (bookings, contact-form submissions, calls).
2. **Project a premium, modern brand** befitting a Harley Street private clinic.
3. **Strong organic SEO** — preserve and grow rankings during migration from Squarespace.
4. **Excellent performance and accessibility** — Lighthouse ≥95 on all key pages, WCAG 2.1 AA.

Every implementation decision should be evaluated against these goals in order.
If a feature doesn't serve at least one of them, it probably shouldn't ship in v1.

---

## 2. Tech stack

- **Framework**: [Astro 6](https://astro.build) (static-first, islands where needed)
- **Hosting**: Cloudflare Workers via `@astrojs/cloudflare` adapter
- **Styling**: Tailwind CSS v4 (`@theme` design tokens map 1:1 to `design.md`)
- **Content**: Astro Content Collections (MDX) for services, team, testimonials, insights
- **Images**: Astro `<Image />` + `sharp`
- **Icons**: `astro-icon` with Lucide pack
- **Forms**: Cloudflare Pages Functions / Worker endpoints + Turnstile
- **SEO**: `@astrojs/sitemap`, custom JSON-LD components, OG image generation
- **Booking**: External link to HeyDoc (no native booking flow — see §7)

Node ≥22.12.0. Use `npm` (lockfile is `package-lock.json`).

---

## 3. Repository structure

```
harley-street-practice/
├── AGENT.md                  ← you are here
├── design.md                 ← design system (single source of truth)
├── content-cache/            ← scraped source content (do not re-scrape)
│   ├── pages/                ← markdown of every page on the old site
│   ├── insights/             ← markdown of every insights/blog article
│   ├── images/               ← downloaded images + manifest.json
│   ├── url-map.json          ← old URL → new URL (drives redirects)
│   └── scrape-log.md         ← what was scraped + when
└── website/                  ← the Astro app
    ├── src/
    │   ├── assets/           ← imported images & fonts
    │   ├── components/       ← reusable Astro components
    │   ├── content/          ← MDX content collections
    │   │   ├── services/
    │   │   ├── team/
    │   │   ├── testimonials/
    │   │   └── insights/
    │   ├── layouts/          ← page templates
    │   ├── pages/            ← route files
    │   ├── styles/           ← global.css, tailwind imports
    │   ├── lib/              ← utilities (jsonld, seo, redirects)
    │   ├── consts.ts         ← brand config (booking URL, phone, etc.)
    │   └── content.config.ts
    ├── public/               ← static assets, robots.txt, _redirects
    ├── astro.config.mjs
    ├── wrangler.jsonc
    └── package.json
```

---

## 4. Content cache convention (IMPORTANT)

The old Squarespace site is the source of truth for **content** (copy, images,
practitioner names, regulatory text, testimonials). To avoid hammering it on every
build and to keep work reproducible:

- All content was scraped **once** into `content-cache/`.
- **Always read from `content-cache/`** when drafting or migrating copy.
- **Do not re-scrape** unless the user explicitly says "refresh content" or content is missing.
- If something is missing from the cache, add it to `content-cache/scrape-log.md`
  under "Missing / TODO" and ask the user before re-scraping.
- Preserve **medical / regulatory / qualifications text verbatim** (GMC numbers,
  doctor titles, FCO registration, CQC statements). Never paraphrase these.
- Testimonials may only be used if they appear in the cache (i.e. were public on
  the old site). Author attribution must match the cache.

`url-map.json` maps every old path to its new path. It drives the redirect Worker
in `website/src/lib/redirects.ts`. When you add or rename a route, update this file.

---

## 5. Design system

`design.md` at the repo root is the **single source of truth** for visuals.
The Tailwind v4 `@theme` block in `website/src/styles/global.css` mirrors it exactly.

Rules:

- **No hard-coded colors, font sizes, spacings, or shadows in components.**
  Use Tailwind utilities that map to design tokens.
- New tokens (e.g. a new shadow elevation) must be added to `design.md` first,
  then to `@theme`, then used.
- The visual direction is **Clinical Premium**: muted navy, warm off-white,
  subtle gold accent, serif display + sans body. See `design.md` §1 and §3.
- Components reference design.md component specs by name (Button.primary,
  Card.elevated, Service.tile, etc.).

---

## 6. SEO conventions (every page)

Every routable page MUST include:

1. `<BaseHead>` with `title`, `description`, canonical URL, OG tags, Twitter card.
2. At least one JSON-LD block via `<JsonLd>` helpers in `src/lib/jsonld.ts`:
   - Home: `MedicalBusiness` + `WebSite`
   - Service pages: `MedicalProcedure` (or `MedicalService`) + `BreadcrumbList`
   - Team pages: `Physician` per practitioner
   - Articles: `Article` + `BreadcrumbList`
   - Pages with FAQs: `FAQPage`
3. A unique, keyword-aware `<h1>`.
4. Crawlable internal links to related content.
5. A primary CTA above the fold (book or call).

Sitemap is auto-generated by `@astrojs/sitemap`. `robots.txt` lives in `public/`.

301 redirects from old Squarespace URLs are handled by the Cloudflare adapter
via a redirects map in `src/lib/redirects.ts` (driven by `url-map.json`).

---

## 7. Booking & lead capture

- The practice uses **HeyDoc** for online booking.
- The booking URL is in `src/consts.ts` as `BOOKING_URL`. **Never hard-code it
  elsewhere.**
- All "Book Appointment" CTAs link out to `BOOKING_URL` with `target="_blank"
  rel="noopener"`.
- Phone (`tel:`) and email (`mailto:`) links are also in `consts.ts`.
- The contact form on `/contact` posts to a Cloudflare Pages Function that
  emails the practice (via Resend or MailChannels) and validates with Turnstile.

---

## 8. Coding conventions

- **Astro components first.** Reach for React/Solid only when client interactivity
  is required (e.g. a multi-step form, a carousel that can't be done with CSS).
- **No inline styles.** Use Tailwind classes mapped to design tokens.
- **Semantic HTML always.** `<article>`, `<section>`, `<nav>`, `<main>`, etc.
  Headings in order, no skipped levels.
- **Images via `<Image />`** with explicit width/height to prevent CLS. Use
  `loading="eager"` only for above-the-fold images.
- **Links to external sites** open in a new tab and use `rel="noopener"`.
- **No third-party scripts** (analytics, chat, marketing pixels) without explicit
  user approval.
- **Accessibility**: every interactive element has a focus state, every image has
  alt text (or `alt=""` if decorative), every form field has a label, hit
  targets ≥44×44.

---

## 9. Definition of done (per page)

A page is done when:

- [ ] Lighthouse ≥95 in Performance, Accessibility, Best Practices, SEO
- [ ] Renders correctly at 320px, 768px, 1024px, 1440px viewports
- [ ] Has unique title, meta description, OG image, canonical URL
- [ ] Has appropriate JSON-LD schema
- [ ] All CTAs link to `BOOKING_URL`, `tel:`, or `mailto:` from consts
- [ ] axe-core finds zero serious/critical issues
- [ ] Works with JavaScript disabled (since Astro is static-first, this should be free)

---

## 10. Build, dev, deploy

```bash
cd website
npm install
npm run dev          # local dev server
npm run build        # production build to dist/
npm run preview      # preview the built site locally
npm run deploy       # build + wrangler deploy to Cloudflare
```

Do **not** deploy without an explicit user instruction. Custom domain cutover
(DNS swap from the current Squarespace host) is a separate, manual step
documented in the eventual `DEPLOY.md`.

---

## 11. What NOT to do

- Do not modify the live `londonhspractice.co.uk` site.
- Do not paraphrase medical, regulatory, or practitioner-qualification copy.
- Do not invent testimonials, doctor names, prices, or service details.
- Do not add tracking/analytics/chat/marketing scripts without approval.
- Do not push to `main` or deploy without explicit user instruction.
- Do not bypass the design system (no inline colors / font sizes).
- Do not commit secrets, API keys, or `.env` files.
