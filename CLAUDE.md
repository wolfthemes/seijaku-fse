# Seijaku FSE — Claude Code Context

## What this is
FSE child theme of wolf-blank. Redesigns wolfthemes.com — the WolfThemes storefront.
Author: Constantin Saguin (WolfThemes, Power Elite ThemeForest author, 14 years experience).

## Parent theme
wolf-blank at ../wolf-blank/ — read its CLAUDE.md before touching any shared files.

## Design direction
- Current site: Seijaku + Elementor (being replaced entirely)
- Target: Awwwards-level. Light skin, editorial, big negative space. Beautiful
  typography, one strong accent (electric blue #0c10ff used sparingly). No
  gradients, no shadows unless purposeful — let space do the work.
- Reference energy: Linear.app, Stripe, Rauno.me (spacing + type treatment).
- Fonts: Lexend (headings) + Rethink Sans (body).
- Reference images: ../../.claude/images/reference/ (if present)
- NOT: corporate, generic, template-looking, decorative

## Token locations
- Colors: theme.json → settings.color.palette
  - Palette must keep wolf-blank's 8 slots (primary, primary-light, secondary, accent,
    base, base-2, contrast, contrast-2) — a child palette replaces the parent's array,
    and parent block styles reference primary-light. `border` is an extra seijaku slot.
  - Finalized (light skin): primary/accent `#0c10ff`, primary-light `#0a0bd1` (button
    hover), secondary `#111111`, base `#ffffff`, base-2 `#f4f4f2`, contrast `#141414`,
    contrast-2 `#6b6b6b`, border `rgba(0,0,0,0.10)`.
  - Type adds a `display` size (hero) above 3xl; spacing adds `11`/`12` clamp section
    steps. Root side padding (gutter) set in styles.spacing.padding.
- Fonts: theme.json → settings.typography.fontFamilies
- Spacing/layout: inherited from wolf-blank/theme.json
- Wolf contract vars: theme.json → settings.custom.wolf
  → aliased to --wolf-* in wolf-blank/assets/css/global.css section 6 (body-scoped,
    with standalone fallbacks). Set values here; don't edit the parent's aliases.

## Active plugins (wolf-store docker container)
- wolf-store: themes marketplace plugin. REST API + React island blocks.
  Read: ../../plugins/wolf-store/CLAUDE.md before styling any store block.
  Themes grid block: `wolf-store/theme-index` (attrs: perPage, pagination
  "none|numbers", orderby — incl. `featured` via REST posts_clauses — order,
  taxonomy/termId, offset). No `align` support, so size it via the wrapper's
  constrained `contentSize`.
- wolf-blocks (planned): reusable Gutenberg blocks — pricing table, testimonials, stats

## Page sections (front-page.html)
Built with pure WP core blocks; the three data-driven sections are deferred to
wolf-blocks and marked with `<!-- WOLF-BLOCKS: ... -->` placeholder comments.
1. Hero — full viewport (core/cover, no image), display heading, tagline, two CTAs ✅
2. Themes grid — `wolf-store/theme-index` block, featured-first, in
   `.wolf-themes-section` constrained group ✅
3. Stats band — `WOLF-BLOCKS: stats-counter block` (placeholder; $2M · 14 years · 36k)
4. Testimonials — `WOLF-BLOCKS: testimonials block` (placeholder)
5. About/brand story — asymmetric core columns, text left + pull quote right ✅
6. Footer (parts/footer.html) — minimal 3 cols, core blocks ✅
- header (parts/header.html) — wordmark left, nav + one CTA right ✅

## Dev environment
- Docker (wolf-store-docker): site at http://localhost:8080, adminer at :8081.
- Theme lives at wolf-store-docker/themes/seijaku-fse (this repo, bind-mounted).
- IMPORTANT: the theme must be ACTIVATED (Appearance → Themes → Seijaku FSE) for
  any of this to render — until then the site shows the parent wolf-blank header.
- FSE caches templates in the DB: after editing templates/parts, do Appearance →
  Editor → Templates → "Clear customizations" so the file versions load.
- wp-cli is not in the WP image; the sandbox blocks writing the shared DB and
  downloading binaries — ask the user to activate / verify in the browser.

## Design tooling (skills, personal scope ~/.claude/skills)
- `frontend-design` and `ui-ux-pro-max` are installed — use them for UI/visual
  decisions (styles, palettes, type pairing, UX review).

## Commands (from workspace root)
n/a — this is a theme, no build step. Edit files directly, reload browser.

## Reuse note
This child theme is specific to wolfthemes.com.
For new client projects, create a new child theme from wolf-blank instead.

Git remote: git@github.com:wolfthemes/seijaku-fse.git — this repo only.
