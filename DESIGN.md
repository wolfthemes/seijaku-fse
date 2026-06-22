---
name: Seijaku FSE — WolfThemes Storefront
description: Editorial black-and-white storefront with a single gold accent. Craft over decoration. The brushstroke earns the silence around it.
colors:
  ink: "#1d1d1f"
  ink-deep: "#000000"
  ink-near: "#14110e"
  page-bg: "#F5F5F7"
  surface: "#ffffff"
  muted: "#6b6b6b"
  gold: "#D3A043"
  cta-bg: "#000000"
  cta-hover-bg: "#f1f1f1"
typography:
  hero:
    fontFamily: "Urbanist, sans-serif"
    fontSize: "clamp(3rem, 7vw, 4.768rem)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.02em"
  display:
    fontFamily: "Urbanist, sans-serif"
    fontSize: "clamp(2.625rem, 5.5vw, 3.815rem)"
    fontWeight: 700
    lineHeight: 0.96
    letterSpacing: "-0.02em"
  h1:
    fontFamily: "Urbanist, sans-serif"
    fontSize: "clamp(2.25rem, 4.5vw, 3.052rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  h2:
    fontFamily: "Urbanist, sans-serif"
    fontSize: "clamp(1.953rem, 3.5vw, 2.441rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.018em"
  h3:
    fontFamily: "Urbanist, sans-serif"
    fontSize: "clamp(1.625rem, 2.8vw, 1.953rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Rethink Sans, sans-serif"
    fontSize: "clamp(1rem, 1.1vw, 1.0625rem)"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Rethink Sans, sans-serif"
    fontSize: "clamp(0.75rem, 0.9vw, 0.8125rem)"
    fontWeight: 600
    letterSpacing: "0.14em"
  nav:
    fontFamily: "Rethink Sans, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "-0.01em"
rounded:
  none: "0"
  sm: "2px"
  md: "4px"
  lg: "8px"
  pill: "999em"
spacing:
  "1": "0.25rem"
  "2": "0.5rem"
  "3": "0.75rem"
  "4": "1rem"
  "5": "1.5rem"
  "6": "2rem"
  "7": "3rem"
  "8": "4rem"
  "9": "6rem"
  "10": "8rem"
  section: "clamp(6rem, 10vw, 10rem)"
  section-xl: "clamp(8rem, 14vw, 14rem)"
components:
  button-primary:
    backgroundColor: "{colors.cta-bg}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "0.3rem 1.75rem"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.cta-hover-bg}"
    textColor: "{colors.ink-near}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.3rem 1.75rem"
  button-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
---

# Design System: Seijaku FSE

## 1. Overview

**Creative North Star: "The Editor's Archive"**

A private design archive where 14 years of work lives on the walls. Nothing is labeled. Quality announces itself. The space is spare — not because it's empty, but because every object that didn't earn its place was removed. The brushstroke wordmark is the signature piece. It has warmth and weight; the system around it must give it room.

This system operates at the intersection of editorial restraint and artisan warmth. It isn't cold SaaS minimalism — that lane has no texture, no maker-energy. It isn't decorative either. The warmth comes from craft: the handwritten quality of the brushstroke mark, the gold used like a drop of wax on an envelope, the type set with the precision of a printer who knows what letter-spacing does to a headline at 4rem. Visitors who work with type, color, and layout for a living will feel the difference. That is the audience.

Palette strategy: **Restrained**. Black and white carry everything. Gold (#D3A043) is a tool of exception — used once per surface, if at all. Its appearance should register as a punctuation mark, not a color system. The closest references are Stripe's restraint and Rauno.me's spacing discipline, but pushed toward warmth by the brushstroke identity.

**Key Characteristics:**
- Black/white type and CTA surfaces; `#F5F5F7` (near-white, trace cool-gray) for page background
- Gold accent once per section at most — decorative rule, a pull-quote marker, a price badge
- Urbanist (geometric, tall x-height, title case) + Rethink Sans (humanist, body) — contrast axis, not similarity
- Major-Third scale (×1.25) with aggressive negative tracking on large headings
- Motion is choreographed scroll-reveal (opacity + translateY), not per-section uniform fade
- `text-wrap: balance` on h1–h3; `text-wrap: pretty` on prose
- No shadows on cards; surface separation via background alternation or border hairlines
- Header frosts with `backdrop-filter: blur(12px)` on scroll — purposeful, not decorative

## 2. Colors: The Ink and the Archive

A two-color system where the palette is a deliberate editorial stance, not a default. Ink and paper. One warm interruption.

### Primary

- **Deep Press Black** (`#000000`): CTA button backgrounds. The darkest ink. Reserved for elements that must have maximum weight — primary buttons, decorative rules used as emphasis. Not for body text; that's `#1d1d1f`.
- **Near-Black** (`#14110e`): Dark section backgrounds — footer, hero overlays, any surface that should feel heavy. Very slightly warm, which keeps it from reading as pure digital black.

### Secondary

- **Archive Gold** (`#D3A043`): The sole accent. Pull-quote markers, price badges, editorial hairlines used as punctuation, the occasional icon. **One occurrence per section, maximum.** Used twice, it becomes a palette; used once, it becomes a signal. Approximately `oklch(72% 0.11 75)`.

### Neutral

- **Quiet Paper** (`#F5F5F7`): Page background. A trace of cool-gray tint — not warm, not white. This is the canvas the brushstroke logo lives on. It must not compete.
- **Clean Surface** (`#ffffff`): Card and component surfaces. Creates the white-on-near-white layering used for theme cards and content wells.
- **Primary Ink** (`#1d1d1f`): All body copy, headings unless overridden by a dark section. The near-black with a faint warm pull that reads as ink rather than screen.
- **Muted Ink** (`#6b6b6b`): Metadata, captions, supporting text. Must hit ≥4.5:1 against `#F5F5F7` — verify: approximately 4.9:1 — acceptable.
- **Hover Gray** (`#f1f1f1`): Button hover background. Lighter than page-bg; a barely-there surface change that signals state without color.

### Named Rules

**The Gold Once Rule.** Archive Gold appears at most once per section. Its rarity is structural — a second gold element on the same surface erases what made the first one matter. When in doubt, remove the second instance.

**The Contrast Floor Rule.** `#6b6b6b` on `#F5F5F7` is at the acceptable floor (~4.9:1). Any lighter muted value is prohibited for body text. Placeholder text and captions must use at least `#6b6b6b`; never lighter.

## 3. Typography

**Display Font:** Urbanist (Google Fonts — `sans-serif` fallback)
**Body Font:** Rethink Sans (Google Fonts — `sans-serif` fallback)

**Character:** Urbanist is a geometric sans with a tall x-height, open apertures, and clean construction — it sets headlines with a typographer's confidence without feeling cold. Rethink Sans is humanist, slightly irregular, warm at text size. The pair works on a contrast axis: geometric versus humanist, not two geometric families competing. Together they carry the brand's editorial precision (Urbanist) and its artisan warmth (Rethink Sans).

Neither is a reflex-reject font. Identity-preservation applies to both — they are the committed brand fonts and should not be substituted.

### Hierarchy

- **Hero** (Urbanist 700, `clamp(3rem, 7vw, 4.768rem)`, lh 0.92, ls −0.02em): Full-cover hero headline only. One instance per page. `text-wrap: balance`.
- **Display** (Urbanist 700, `clamp(2.625rem, 5.5vw, 3.815rem)`, lh 0.96, ls −0.02em): Inner-page hero titles, major section leads. `text-wrap: balance`.
- **H1** (Urbanist 700, `clamp(2.25rem, 4.5vw, 3.052rem)`, lh 1.08, ls −0.02em): Primary page heading per template. `text-wrap: balance`.
- **H2** (Urbanist 700, `clamp(1.953rem, 3.5vw, 2.441rem)`, lh 1.15, ls −0.018em): Section headings. `text-wrap: balance`.
- **H3** (Urbanist 700, `clamp(1.625rem, 2.8vw, 1.953rem)`, lh 1.2, ls −0.015em): Sub-section headings, card titles.
- **H4–H6** (Urbanist 700, 1.5625rem → 1rem, lh 1.3 → 1.45, ls −0.011em → −0.005em): Supporting headings; tracking relaxes as size decreases.
- **Body** (Rethink Sans 400, `clamp(1rem, 1.1vw, 1.0625rem)`, lh 1.55): All prose. Max line length 65–75ch. `text-wrap: pretty`.
- **Label** (Rethink Sans 600, `clamp(0.75rem, 0.9vw, 0.8125rem)`, ls +0.14em, uppercase): Button text, tags, metadata labels. Short runs only — never body copy.
- **Nav** (Rethink Sans 600, 0.75rem, ls −0.01em, uppercase): Header navigation only.

### Named Rules

**The Tracking Gradient Rule.** Negative letter-spacing scales with heading size: −0.005em at h6 (1rem) → −0.02em at h1+ (3rem+). Resist the urge to tighten past −0.04em; letters begin to touch. At display sizes, −0.02em is the floor.

**The Balance Rule.** `text-wrap: balance` on h1–h3. `text-wrap: pretty` on paragraph copy. Never set these individually on long-copy blocks.

## 4. Elevation

This system is flat by default. `shadow-card: none` in theme.json is intentional. Surface separation is achieved through background alternation (`#F5F5F7` page vs. `#ffffff` cards), border hairlines (`rgba(0,0,0,0.10)` at 1px), and negative space — not shadow lift.

The two purposeful exceptions:

- **Button hover glow**: `0 10px 24px -12px color-mix(in srgb, #000000 55%, transparent)` — a compressed, low-spread shadow that creates a halo effect under the primary CTA on hover. It reads as lift without box-shadow noise. Transition: 0.5s ease-out.
- **Frosted header**: `backdrop-filter: saturate(180%) blur(12px)` with a semi-transparent background (`color-mix(in srgb, #F5F5F7 82%, transparent)`). This is the site's only sustained blur effect. It earns its place because the header is always on screen; it must remain readable over any content below it.

### Named Rules

**The Flat-By-Default Rule.** No `box-shadow` on cards, containers, or sections at rest. If you feel the need to add a shadow to create separation, solve it with background color, border, or spacing instead.

## 5. Components

### Buttons

Character: pill-shaped, compact, uppercase label. The primary button is black — maximum contrast, maximum authority.

- **Shape:** Full pill (999em border-radius)
- **Primary:** Black background (`#000000`), white text (`#F5F5F7`). Padding: 0.3rem vertical / 1.75rem horizontal. Label size (0.75rem–0.8125rem), 600 weight, uppercase, ls −0.022em. Border: 1px solid `#000000`.
- **Primary hover:** Background shifts to `#f1f1f1`, text to near-black `#14110e`, border fades to `color-mix(in srgb, #000000 55%, transparent)`. Box shadow: `0 10px 24px -12px color-mix(in srgb, #000000 55%, transparent)`. Transition: 0.5s `cubic-bezier(0.22, 1, 0.36, 1)` on all properties.
- **Outline:** Transparent background, ink border, `backdrop-filter: blur(20px)`. Hover: fills solid ink, text flips white. Transition: color + background only, 0.5s ease-out.
- **Focus ring:** 2px solid `#000000`, offset 3px. Keyboard-only (`:focus-visible`). Radius matches pill.

### Navigation

- **Style:** Body font (Rethink Sans), 0.75rem, 600 weight, uppercase, ls −0.01em.
- **Default:** Ink (`#1d1d1f`). No underline.
- **Hover:** Curtain-roll animation — JS clones the label and translates both −100%/+100% on hover. The original exits upward; the clone rolls up into position. Duration: 0.45s `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Reduced motion fallback:** Curtain clone hidden; original fades to opacity 0.55. No translate.
- **Active/current:** Treated by WordPress navigation block natively; style inherits from hover treatment.
- **Header on scroll:** `padding-block` condenses (4→3 spacing steps). Border hairline appears at bottom. Background increases opacity from 82% to 92%. Duration: 0.5s ease-out.

### Theme Cards (wolf-store/theme-index)

- **Corner style:** Gently curved (8px radius on image container)
- **Background:** White (`#ffffff`) on the page-bg (`#F5F5F7`) — the surface lift provides separation without shadow
- **Shadow strategy:** None at rest per the Flat-By-Default Rule
- **Border:** None; separation achieved by background contrast and negative space
- **Internal padding:** Follow the store block's internal layout; don't override with additional padding layers

### Wolf Arrow Link

A signature inline affordance for "read more" / directional links.

- **Style:** Inline-flex, ink (`#1d1d1f`), 600 weight, no underline, `gap: 0.5em`
- **Arrow:** `→` character as `::after` pseudo-element
- **Hover:** Arrow nudges `translateX(0.35em)`. Duration: 0.22s ease-out.

### Content Links (prose)

- **Style:** Inherit color, no underline at rest
- **Hover:** Animated underline wipes in from left (background-image gradient technique, `background-size: 0% 1px` → `100% 1px`). Color shifts to primary ink. Duration: 0.22s ease-out.

### Text Selection

- **Background:** `#000000` (primary/CTA black)
- **Text:** `#F5F5F7` (page background)

## 6. Do's and Don'ts

### Do:
- **Do** give the brushstroke wordmark room — generous padding, never adjacent to competing display type or decorative elements.
- **Do** use Archive Gold (`#D3A043`) once per section at most: a hairline rule, a pull-quote marker, a price callout. One. Move on.
- **Do** use negative space as a structural element. Section vertical padding: `clamp(6rem, 10vw, 10rem)` minimum.
- **Do** set `text-wrap: balance` on all h1–h3 and `text-wrap: pretty` on prose paragraphs.
- **Do** respect the tracking gradient: tighten letter-spacing as heading size increases (−0.005em at 1rem → −0.02em at 3rem+). Never exceed −0.04em.
- **Do** use `prefers-reduced-motion` on every transition and animation — crossfade or instant as fallback. The curtain-roll nav and scroll-reveals both have explicit reduced-motion overrides; maintain this contract.
- **Do** verify contrast before shipping muted text. `#6b6b6b` on `#F5F5F7` is the acceptable floor (~4.9:1). Nothing lighter for body or caption text.
- **Do** keep buttons pill-shaped and compact. The proportions (0.3rem vertical / 1.75rem horizontal, label size) are deliberate; don't inflate them to signal importance.

### Don't:
- **Don't** use gradient text (`background-clip: text`). Prohibited. Use solid color; emphasis via weight or size.
- **Don't** add side-stripe borders (border-left > 1px as a colored accent). If you need to mark a callout, use a background tint or full border.
- **Don't** use the warm-neutral beige/cream band for backgrounds — the whole sand/paper/parchment territory reads as AI-generated default. The page background is `#F5F5F7`, a trace cool-gray. Don't warm it.
- **Don't** repeat gold on the same screen surface twice. A second gold element cancels the first. Remove one.
- **Don't** use glassmorphism decoratively. The frosted header is the one sanctioned blur on the site — it earns its place through persistent utility. A frosted card or section panel does not.
- **Don't** put uppercase tracked kicker labels above every section heading. One named kicker as a deliberate brand system is voice; an eyebrow on every section is AI grammar.
- **Don't** use numbered section markers (01 / 02 / 03) as default scaffolding. Numbers appear only when the sequence genuinely carries information.
- **Don't** animate CSS layout properties. Scroll reveals use opacity + translateY only. GPU-friendly path only.
- **Don't** let the design feel cold/purely minimal SaaS — zero warmth is wrong for this brand. The warmth comes from craft: the brushstroke logo, the gold accent, the type set with care. If a screen feels sterile, add breathing room before adding decoration.
- **Don't** stack decorative elements: gradients, glassmorphism, large icon arrays, and excessive animation are each individually prohibited. Stacking any two compounds the failure.
- **Don't** use ThemeForest-pattern badge overload, feature grid clutter, or orange CTAs in any form.
