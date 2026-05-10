# design.md — London Harley Street Practice

> Source of truth for the visual design system. Loosely follows the
> [Stitch DESIGN.md](https://stitch.withgoogle.com/docs/design-md/overview) spec.
> Tailwind v4 `@theme` config in `website/src/styles/global.css` mirrors this file
> token-for-token. Don't introduce visual values that don't exist here.

---

## 1. Brand

**Name:** London Harley Street Practice
**One-liner:** Same-day private GP and multidisciplinary care on Harley Street, London.

**Positioning:** A trusted, doctor-led private practice that combines the prestige of
Harley Street with modern, friction-free access to care. Premium without being cold;
clinical without being sterile.

**Personality**

| Is                        | Is not                       |
| ------------------------- | ---------------------------- |
| Authoritative             | Stuffy or paternalistic      |
| Calm, reassuring          | Clinical or hospital-like    |
| Premium                   | Luxury or pretentious        |
| Plainspoken               | Jargon-heavy                 |
| Modern and digital-first  | Trendy or gimmicky           |

**Voice & tone**

- Use plain English. "Same-day GP appointments" not "expedited primary-care consultations."
- Lead with patient benefit, then credentials. ("See a doctor today, in person on Harley Street.")
- Numbers and concrete facts beat adjectives. ("30-minute appointments" not "thorough appointments.")
- Sentence case in headings. Avoid ALL CAPS except for very small labels.
- British English spelling throughout.

---

## 2. Color tokens

The palette is a muted navy primary with a restrained gold accent on a warm off-white
canvas. Contrast pairs are designed for WCAG AA at 16px body and AAA at large text.

### Brand

| Token              | Hex       | Usage                                          |
| ------------------ | --------- | ---------------------------------------------- |
| `--color-navy-50`  | `#F2F4F8` | Subtle navy-tinted surfaces                    |
| `--color-navy-100` | `#D9DEE8` | Hover states, dividers on navy                 |
| `--color-navy-300` | `#7C8AAA` | Disabled text on navy                          |
| `--color-navy-500` | `#3A4D75` | Secondary text, icons                          |
| `--color-navy-700` | `#1E2F54` | Primary buttons, links, headings               |
| `--color-navy-900` | `#0F1B36` | Hero backgrounds, footer                       |

| Token              | Hex       | Usage                                          |
| ------------------ | --------- | ---------------------------------------------- |
| `--color-gold-100` | `#F5EDD8` | Subtle accent backgrounds                      |
| `--color-gold-400` | `#C9A961` | Primary accent (decorative rules, highlights)  |
| `--color-gold-600` | `#8C7335` | Accent text on light backgrounds               |

### Neutrals (warm)

| Token                 | Hex       | Usage                                       |
| --------------------- | --------- | ------------------------------------------- |
| `--color-bg`          | `#FBFAF7` | Default page background (warm off-white)    |
| `--color-surface`     | `#FFFFFF` | Cards, elevated surfaces                    |
| `--color-surface-alt` | `#F5F2EB` | Section bands, subtle stripes               |
| `--color-border`      | `#E5E0D5` | Hairline borders, dividers                  |
| `--color-muted`       | `#6B6F77` | Captions, helper text                       |
| `--color-text`        | `#1A1F2C` | Body text                                   |
| `--color-text-strong` | `#0F1B36` | Headings (= navy-900)                       |
| `--color-text-invert` | `#FBFAF7` | Text on navy-900 backgrounds                |

### Semantic

| Token              | Hex       | Usage                  |
| ------------------ | --------- | ---------------------- |
| `--color-success`  | `#2F7D5B` | Success messages       |
| `--color-warning`  | `#B8862A` | Cautions               |
| `--color-error`    | `#A8341E` | Form errors            |
| `--color-info`     | `#2D5F8F` | Informational notices  |

### Approved contrast pairs (WCAG AA)

| Foreground          | Background          | Ratio  |
| ------------------- | ------------------- | ------ |
| `--color-text`      | `--color-bg`        | 14.6:1 |
| `--color-text`      | `--color-surface`   | 16.4:1 |
| `--color-text-invert` | `--color-navy-900` | 14.7:1 |
| `--color-navy-700`  | `--color-bg`        | 9.8:1  |
| `--color-gold-600`  | `--color-bg`        | 5.6:1  |
| `--color-muted`     | `--color-bg`        | 5.4:1  |

Avoid: gold-400 on white (fails AA for body), navy-500 on navy-50 (fails for body).

---

## 3. Typography

### Families

- **Display / headings**: `'Fraunces', 'Source Serif Pro', Georgia, serif` — modern
  serif with quiet character, used for h1–h3.
- **Body / UI**: `'Inter', system-ui, -apple-system, sans-serif` — neutral, highly
  legible at small sizes, used for everything else.
- **Mono** (rarely): `'JetBrains Mono', ui-monospace, monospace` — for codes,
  reference numbers (e.g. GMC numbers in bios if needed).

Both fonts loaded via `astro:assets` font providers, `display: swap`, with the
weights below.

### Weights

- Fraunces: 400, 500, 600
- Inter: 400, 500, 600, 700

### Type scale (Major Third, base 16px)

| Token                | Size / line-height | Element        |
| -------------------- | ------------------ | -------------- |
| `--text-display-1`   | 64 / 1.05          | Hero h1        |
| `--text-display-2`   | 52 / 1.08          | Page h1        |
| `--text-h1`          | 40 / 1.15          | Section h1     |
| `--text-h2`          | 32 / 1.2           | Subsection h2  |
| `--text-h3`          | 24 / 1.25          | h3             |
| `--text-h4`          | 20 / 1.3           | h4 / lead      |
| `--text-body-lg`     | 18 / 1.6           | Article body   |
| `--text-body`        | 16 / 1.6           | Default body   |
| `--text-body-sm`     | 14 / 1.5           | Secondary      |
| `--text-caption`     | 13 / 1.45          | Captions, meta |
| `--text-overline`    | 12 / 1.3 (uppercase, tracking 0.08em) | Eyebrow labels |

Mobile (`<768px`) scales down: display-1 → 44, display-2 → 36, h1 → 28, h2 → 24.

### Rules

- One h1 per page.
- Body copy max measure: 65 characters (`max-w-prose` ≈ 65ch).
- Use Fraunces for h1–h3; h4 onwards uses Inter 600.
- Don't use weight as the only visual differentiator — pair with size or color.
- Avoid letter-spacing changes outside of `--text-overline`.

---

## 4. Spacing & layout

4px base unit. Token names match Tailwind's default scale where possible.

| Token       | Value | Token       | Value |
| ----------- | ----- | ----------- | ----- |
| `--space-1` | 4px   | `--space-8` | 32px  |
| `--space-2` | 8px   | `--space-10`| 40px  |
| `--space-3` | 12px  | `--space-12`| 48px  |
| `--space-4` | 16px  | `--space-16`| 64px  |
| `--space-5` | 20px  | `--space-20`| 80px  |
| `--space-6` | 24px  | `--space-24`| 96px  |
| `--space-7` | 28px  | `--space-32`| 128px |

### Container widths

| Token             | Value   | Use                              |
| ----------------- | ------- | -------------------------------- |
| `--container-sm`  | 640px   | Narrow article body              |
| `--container-md`  | 768px   | Default article / form           |
| `--container-lg`  | 1024px  | Standard content                 |
| `--container-xl`  | 1200px  | Page max-width (default)         |
| `--container-2xl` | 1440px  | Hero / wide layouts only         |

Page gutters: 16px (mobile), 24px (tablet), 48px (desktop).
Vertical section rhythm: 64px mobile, 96px desktop. Hero adds +32px on top.

### Breakpoints

| Token | min-width | Notes               |
| ----- | --------- | ------------------- |
| `sm`  | 640px     | Large phones        |
| `md`  | 768px     | Tablets / small lap |
| `lg`  | 1024px    | Standard desktop    |
| `xl`  | 1280px    | Wide desktop        |
| `2xl` | 1536px    | Very wide           |

Mobile-first. Don't write `max-width` queries unless absolutely necessary.

### Grid

12-column grid with 24px gutter on desktop, 16px on mobile.
Service grid uses `auto-fit, minmax(280px, 1fr)` so it adapts without breakpoints.

---

## 5. Radii, borders, shadows

### Radius

| Token            | Value | Use                          |
| ---------------- | ----- | ---------------------------- |
| `--radius-sm`    | 4px   | Inputs, small chips          |
| `--radius-md`    | 8px   | Buttons, small cards         |
| `--radius-lg`    | 12px  | Cards, modals                |
| `--radius-xl`    | 20px  | Hero panels, image frames    |
| `--radius-full`  | 9999px| Pills, avatars               |

### Borders

- Default border: `1px solid var(--color-border)`
- Focus border: `2px solid var(--color-navy-700)` (always with 2px offset ring)
- Heavy divider: `1px solid var(--color-navy-100)` for navy sections

### Shadows (elevation)

| Token            | Value                                           | Use                          |
| ---------------- | ----------------------------------------------- | ---------------------------- |
| `--shadow-xs`    | `0 1px 2px rgb(15 27 54 / 0.04)`                | Inputs                       |
| `--shadow-sm`    | `0 1px 3px rgb(15 27 54 / 0.06), 0 1px 2px rgb(15 27 54 / 0.04)` | Default cards          |
| `--shadow-md`    | `0 4px 16px rgb(15 27 54 / 0.08)`               | Hovered cards, dropdowns     |
| `--shadow-lg`    | `0 16px 40px rgb(15 27 54 / 0.10)`              | Modals, sticky CTAs          |
| `--shadow-focus` | `0 0 0 4px rgb(30 47 84 / 0.20)`                | Focus ring                   |

Shadows use the navy hue (not pure black) so they read as "warm" against the off-white bg.

---

## 6. Motion

- **Durations**: `--motion-fast` 120ms, `--motion-base` 200ms, `--motion-slow` 360ms.
- **Easings**: `--ease-standard` `cubic-bezier(0.2, 0.8, 0.2, 1)`,
  `--ease-emphasized` `cubic-bezier(0.3, 0, 0, 1)`.
- Use motion to confirm interaction (button press, menu open) — never to draw
  attention to passive content.
- Honour `prefers-reduced-motion`: collapse all transitions to ≤80ms and disable
  parallax / autoplay carousels.
- No bounces, no overshoots. Quiet, confident transitions only.

---

## 7. Iconography

- **Library**: [Phosphor Icons](https://phosphoricons.com) — MIT licensed, copied
  inline as SVG into a single `Icon.astro` component. No icon-runtime dependency.
- **Weight**: `regular` for most UI; `bold` for emphasis (eyebrows, badges).
  Avoid `duotone` and `fill` styles for consistency.
- **Sizes**: 16, 20, 24, 32 px (set via `size` prop or `w-*`/`h-*` classes).
- **Color**: inherits from text color (`currentColor`); never use raw red/green/blue.
- Standard icons (referenced by short name; `<Icon name="phone" />`):
  - Phone → `phone`
  - Email → `envelope`
  - Location → `map-pin`
  - Hours → `clock`
  - Book → `calendar-check`
  - External → `arrow-up-right`
  - Chevrons → `caret-right` / `caret-down`
  - Check → `check`
  - Quote → `quotes`
  - Stethoscope → `stethoscope`
  - Heart → `heart`
  - Shield/trust → `shield-check`
  - Menu/close → `list` / `x`

To add a new icon: copy the SVG path data from
https://phosphoricons.com (Regular weight) into the `Icon.astro` switch.

---

## 8. Components

Each component lists: purpose, anatomy, states, accessibility notes.
Implementation lives in `website/src/components/`.

### 8.1 Button

Variants: `primary`, `secondary`, `ghost`, `link`.
Sizes: `sm` (36px), `md` (44px default), `lg` (52px).

**Primary** — main CTA. Solid navy-700 bg, text-invert, no border.
Hover: navy-900 bg. Focus: focus ring. Active: 1px translateY.

**Secondary** — alternate CTA. Surface bg, navy-700 text, 1px navy-100 border.
Hover: navy-50 bg.

**Ghost** — tertiary action. Transparent bg, navy-700 text. Hover: navy-50 bg.

**Link** — inline text link. Underlined, navy-700; hover navy-900.

Hit target ≥44px on touch. Loading state shows `Loader2` icon spinning.
External-link buttons append the `arrow-up-right` icon.

### 8.2 Card

Base: surface bg, `--shadow-sm`, `--radius-lg`, padding `--space-6`.
Hover (when interactive): `--shadow-md`, translate -2px, 200ms ease-standard.
Cards never use border AND shadow simultaneously.

### 8.3 Header (sticky)

Anatomy:
- Top bar (desktop only): phone, address, hours — caption text on navy-50.
- Main bar: logo (left), primary nav (center, 5 items max), CTA cluster (right): "Call" + "Book Appointment" (primary button).
- On scroll past 80px: top bar collapses, main bar gains `--shadow-sm`.

Mobile: logo + hamburger + Book CTA. Drawer slides from right with full nav, phone link prominent.

Accessibility: skip link to `#main`, aria-current on active link, focus-visible.

### 8.4 Footer

Three-column desktop / stacked mobile.
- Column 1: Logo, tagline, address, phone, email, social icons.
- Column 2–3: Sitemap groups (About, Services, Resources, Legal).
- Bottom bar: copyright, regulatory line ("Registered with the Care Quality Commission"), GMC ref if applicable.

Background: navy-900. Text: text-invert. Links: text-invert with gold-400 on hover.

### 8.5 Service tile

Used in service grids on Home and `/services`.
Anatomy: image (16:10 ratio, rounded-lg), eyebrow (overline, gold-600), title (h3 Fraunces),
2-line summary (body-sm muted), CTA chevron link.
Hover: card lifts, image zooms 1.03 (200ms), title color → navy-900.
Whole card is clickable (uses `<a>` wrapping with stretched-link pattern).

### 8.6 Trust strip

Horizontal band shown on Home and key landing pages.
Items: small icon + label + value.
Examples: "30-min appointments", "Same-day availability", "FCO-registered", "CQC-regulated", "Harley Street, W1G".
Background: surface-alt. Divides into equal columns ≥md, stacks into 2-cols on mobile.

### 8.7 Testimonial

Variants: card (in carousel) and pull-quote (full-bleed).
Card: opening quote glyph (gold-400, 48px), quote (h4 Fraunces italic), attribution (caption muted).
No fake-realism star ratings unless we have a verified review source.

### 8.8 Form fields

Input height 48px (matching button md), 1px border, radius-md, focus ring.
Label above field, helper text below in caption muted, error text in `--color-error`.
Required fields marked with `*` after label, never with color alone.
Turnstile widget anchored bottom-left of form.

### 8.9 FAQ accordion

`<details>`/`<summary>` semantic, no JS required.
Chevron rotates 180° on open. Each FAQ generates a `Question` entry in `FAQPage` JSON-LD.

### 8.10 Sticky mobile CTA bar

On `<lg` viewports only. Fixed bottom, two equal buttons:
"Call" (secondary) | "Book" (primary). Hidden on contact and book pages.
Honours safe-area-inset-bottom.

### 8.11 Section heading

Eyebrow (overline gold-600) → h2 Fraunces → optional 1-line lead body-lg.
Centered or left-aligned per layout. Spacing below: `--space-12`.

### 8.12 Eyebrow / chip / badge

Pill, radius-full, padding 6×12, text-overline, navy-50 bg, navy-700 text.
Used for service categories, "Same-day", "Members only" labels.

### 8.13 Stat block

Number (display-1 Fraunces gold-600), label (body-sm muted) below.
Used in About and Membership pages.

### 8.14 Image frame

Default radius-xl. Above-the-fold hero images get a subtle 1px navy-100 border
to anchor against warm bg.

---

## 9. Page templates

### Home

1. Hero (h1, subhead, two CTAs, hero image) — full-bleed, ~80vh on desktop, ~60vh on mobile.
2. Trust strip (5 items).
3. "Our services" — grid of 6 service tiles.
4. "Why London Harley Street Practice" — 3-column feature list with icons.
5. Testimonials carousel (3 visible desktop, 1 mobile).
6. Insights teaser — 3 latest articles.
7. Location & hours block with map.
8. Final CTA band — navy-900 bg, headline + book button.

### Service detail (`/services/[slug]`)

1. Breadcrumb.
2. Hero — eyebrow (category), h1, lead, two CTAs, supporting image right.
3. "What's included" / overview.
4. "How it works" — 3-step strip.
5. Pricing block (if applicable).
6. FAQ.
7. Related services (3 tiles).
8. Final CTA band.

### Team (`/team`)

Grid of practitioner cards: photo (1:1, radius-xl), name, role, qualifications, link to bio.

### Article (`/insights/[slug]`)

Container-md, body-lg type, generous spacing.
Above article: breadcrumb, h1, byline + date.
Below article: tags, share buttons, "Related insights" 3-tile grid, final CTA band.

### Contact

Two-column desktop: form (left, 7 cols) | location card with map + hours + phone (right, 5 cols).
Mobile: form first, then location.

---

## 10. Imagery direction

- **Photography style**: warm natural light, real practitioners and the actual
  Harley Street premises preferred over stock. Avoid blue clinical lighting.
- **People**: candid moments — listening, examining, reassuring. Avoid posed
  group shots with crossed arms.
- **Composition**: leave breathing room for text overlays where needed.
- **Color treatment**: subtle warm grade. No heavy filters. Skin tones natural.
- **File specs**: hero images ≥2400px wide, served via Astro `<Image />` in
  AVIF/WebP, max 200KB rendered.
- **Alt text**: descriptive of the *meaning* not just the content. "Doctor
  reviewing test results with patient" not "Two people at a desk".

---

## 11. Accessibility

- WCAG 2.1 AA minimum on every page; aim for AAA on critical CTAs.
- Color is never the only signal (errors include icon + text, not just red).
- Focus styles: `2px navy-700` outline + `4px shadow-focus` ring, offset 2px.
- All non-decorative images have meaningful alt text.
- All interactive elements reachable via keyboard in source order.
- Forms: visible labels (no placeholder-as-label), `aria-describedby` for help/error.
- Motion: honour `prefers-reduced-motion`.
- Skip-to-content link as first focusable element.
- Hit targets ≥44×44 px on touch.
- Language attributes on `<html lang="en-GB">`.

---

## 12. Open questions / design backlog

- Logo: currently a wordmark in gold from the existing site. May need a redrawn
  vector from the practice for crisp display; flag at QA.
- Photography: existing site uses obvious stock. Worth budgeting for a half-day
  shoot of the team and premises post-launch.
- Membership tier visualisation: consider a comparison table component once
  pricing structure is finalised.
