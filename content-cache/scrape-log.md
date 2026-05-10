# Scrape log — content-cache

> One-time scrape of londonhspractice.co.uk on **2026-05-09** to seed
> `content-cache/`. **Do not re-scrape** unless the user explicitly says
> "refresh content" or content is missing. See `AGENT.md` §4.

---

## Summary

| Metric                | Value |
| --------------------- | ----- |
| Pages scraped         | 66    |
| Insights articles     | 11    |
| Total documents       | 77    |
| Unique images         | 248   |
| Images downloaded     | 248 (100%) |
| Total cache size      | ~87 MB |
| Failures              | 0     |
| Source                | https://www.londonhspractice.co.uk + sitemap.xml |
| Tooling               | Node + jsdom + turndown via `/tmp/lhsp-scrape/scrape.mjs` |

---

## Source enumeration

1. **Main sitemap** — `https://www.londonhspractice.co.uk/sitemap.xml` provided
   68 URLs. Two were excluded:
   - `/general-health-check` (returns 404 from sitemap entry; the active page
     uses `/general-health-check-old` slug, which we did capture)
   - duplicate `/services` redirect target
2. **Insights enumeration** — Squarespace's `/insights` index lists posts
   client-side. CDP captured 11 article URLs from rendered DOM. Insights are
   **not** in the main sitemap.
3. **Testimonials** — Captured separately via CDP from the Elfsight Google
   Reviews widget on the home page (8 reviews). Saved to `testimonials.json`,
   not in `pages/home.md` because the widget renders client-side.

---

## File layout

```
content-cache/
├── pages/                    66 .md files (all non-insights pages)
├── insights/                 11 .md files (blog/insights articles)
├── images/
│   ├── manifest.json         248 image entries (src, alt, sources, localPath)
│   └── files/                248 downloaded image binaries
├── testimonials.json         8 testimonials from Google Reviews via Elfsight
├── url-map.json              old → new URL mapping (73 page + 11 insights)
├── scrape-log.md             this file
└── scrape-log-table.md       per-file table (sizes, image counts) — auto-generated
```

---

## Notable findings

### High-value content captured

- **Team page** — full bios + qualifications for 11 practitioners (GPs, MSK,
  counsellors). Each with photo, qualifications string, narrative bio. Critical
  for `Physician` JSON-LD and trust on the new site.
- **Health checks (`/services/health-checks`)** — large 39 KB page, the most
  detailed service description; likely highest organic value.
- **Visa medicals** — a hub plus 27 country-specific landing pages with similar
  structure. These are pure SEO long-tail pages; we'll generate them from a
  shared template + per-country MDX.
- **Membership** — 3 tiers (Starter, Priority, Apex) with detailed comparison.
- **Testimonials** — 8 verifiable Google reviews with attribution. Use these
  verbatim with caution; they're public so consent is presumed.

### Potential issues / things to flag

- **`og_title` is `%t`** on insights articles — Squarespace's templating leak.
  We'll generate proper OG titles from h1 + brand name.
- **`og_image`** is missing on many internal pages — the new site needs a
  fallback OG image (logo on navy background) for any page that doesn't define
  one.
- **Auto-generated insight slugs** — 5 of 11 articles have ugly Squarespace
  slugs (`/insights/0n5v6u96vaqx68g5fhbj9wbl86lw0v`, `/insights/blog-post-title-two-lnfk5`).
  Real titles extracted from h1; remapped in `url-map.json` to descriptive slugs
  with 301s from the originals.
- **Duplicate / stale pages** — sitemap contained `/ultrasound-2`, `/ultrasound-3`,
  `/membership-1`, `/general-health-check-old`, `/new-page`. All marked redirect
  or drop in `url-map.json`.
- **Testimonials carousel** is rendered by Elfsight, so HTML-only scraping
  missed them. Captured via CDP and saved to `testimonials.json`.
- **Booking system** — `/appointments` embeds a HeyDoc iframe at
  `https://online-booking.heydoc.co.uk/?token=4fJrtP4N6GUYmSSUFkUWDOsDBJ28ON4vaxz6wL16`.
  This is the real booking URL; will live in `consts.ts` as `BOOKING_URL`.
- **Image alt text is empty** on virtually every image. The new site must add
  descriptive alt text (treat as a content task during page builds, not a
  re-scrape).

### Pages intentionally not migrated

- `/cart`, `/account/login`, `/checkout`, etc. — Squarespace commerce surfaces.
  The membership store endpoint will be replaced with a contact-form-driven
  flow.

---

## Reproducibility

The scrape scripts live in `/tmp/lhsp-scrape/` (gitignored — temporary):

- `scrape.mjs` — fetches each URL via HTTP, parses with jsdom, converts to
  markdown via turndown, strips Squarespace nav/footer/widgets.
- `download-images.mjs` — downloads every URL in `manifest.json` to
  `images/files/<hash>-<filename>` and updates the manifest with
  `localPath`/`bytes`/`contentType`.

To refresh content (only if the user explicitly asks), copy these scripts
back into the repo and re-run.

---

## Next steps (Phase 1)

With Phase 0 complete, the build can begin:

1. Install Tailwind CSS v4, wire `@theme` to `design.md` tokens.
2. Set `consts.ts` with `BOOKING_URL`, phone, email, address, social.
3. Build `BaseHead`, `Header`, `Footer`, `Container`, `Button`, `Card`.
4. Define content collections for services, team, testimonials, insights.
5. Build the home page from `content-cache/pages/home.md` + `testimonials.json`.

See `AGENT.md` §10 for the build sequence.
