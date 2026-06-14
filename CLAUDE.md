# Seijaku FSE — Claude Code Context

## What this is
FSE child theme of wolf-blank. Redesigns wolfthemes.com — the WolfThemes storefront.
Author: Constantin Saguin (WolfThemes, Power Elite ThemeForest author, 14 years experience).

## Parent theme
wolf-blank at ../wolf-blank/ — read its CLAUDE.md before touching any shared files.

## Design direction
- Current site: Seijaku + Elementor (being replaced entirely)
- Target: Awwwards-level. Dark editorial. Bold typography. Purposeful whitespace.
- Reference images: ../../.claude/images/reference/ (if present)
- NOT: corporate, generic, template-looking

## Token locations
- Colors: theme.json → settings.color.palette
  - Palette must keep wolf-blank's 8 slots (primary, primary-light, secondary, accent,
    base, base-2, contrast, contrast-2) — a child palette replaces the parent's array,
    and parent block styles reference primary-light. `border` is an extra seijaku slot.
  - `primary-light` (#4a4dff) and `secondary` (#0d0d0d) are PLACEHOLDERS — set real
    brand values in the design session.
- Fonts: theme.json → settings.typography.fontFamilies
- Spacing/layout: inherited from wolf-blank/theme.json
- Wolf contract vars: theme.json → settings.custom.wolf
  → aliased to --wolf-* in wolf-blank/assets/css/global.css section 6 (body-scoped,
    with standalone fallbacks). Set values here; don't edit the parent's aliases.

## Active plugins (wolf-store docker container)
- wolf-store: WooCommerce themes marketplace plugin. REST API + React blocks.
  Read: ../../plugins/wolf-store/BOUNDARIES.md before styling any store block.
- wolf-blocks (planned): reusable Gutenberg blocks — pricing table, testimonials, stats

## Page sections to build (front-page.html)
In priority order:
1. Hero — full viewport, large heading, tagline, CTA buttons
2. Themes grid — wolf-store archive block (3 cols, card design)
3. Stats band — $2M sales · 14 years · 36k themes sold
4. About/brand story — text + image
5. CTA band — "Need a theme for musicians?" style
6. Testimonials — 4-col grid
7. Footer — 3 cols, newsletter form

## Commands (from workspace root)
n/a — this is a theme, no build step. Edit files directly, reload browser.

## Reuse note
This child theme is specific to wolfthemes.com.
For new client projects, create a new child theme from wolf-blank instead.
