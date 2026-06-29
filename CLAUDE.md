# Seijaku FSE — Claude Code Context

## What this is
FSE child theme of wolf-blank. Redesigns wolfthemes.com — the WolfThemes storefront.
Author: Constantin Saguin (WolfThemes, Power Elite ThemeForest author, 14 years experience).

## Knowledge base
Main KB: `/mnt/c/Users/Constantin/wolfthemes-dev/wolf-claude-memory/`
Read relevant wiki pages before starting work. Key pages:
- `wiki/products/seijaku-fse/README.md` — this theme's current state
- `wiki/projects/wolfthemes-redesign/README.md` — redesign progress
- `wiki/concepts/` — architecture, CSS contract, brand rationale

## Parent theme
wolf-blank at ../wolf-blank/ — read its CLAUDE.md before touching any shared files.

## Design direction
- Current site: Seijaku + Elementor (being replaced entirely)
- Target: Clean editorial with artisan human touch. Light skin, big negative space,
  beautiful typography. The "artisan" quality comes from small handcrafted accents
  (the brushstroke logo is the north star) — one or two per surface, never stacked.
  No gradients, no shadows unless purposeful — let space do the work.
- Palette: black and white. CTAs and interactive elements use black on white / white
  on black. Gold #D3A043 is the sole accent — used very punctually (one element per
  section at most). The brushstroke logo is the primary brand texture — don't compete with it.
- Reference energy: editorial warmth of the brushstroke logo; spacing + type treatment
  from Linear.app / Stripe / Rauno.me. NOT a cold SaaS aesthetic.
- Fonts: Urbanist (headings, title case) + Rethink Sans (body). Loaded via Google
  Fonts in functions.php (seijaku_fse_google_fonts_url).
- Reference images: ../../.claude/images/reference/ (if present)
- NOT: corporate, generic, template-looking, decorative, cold/purely minimal SaaS

## Token locations
- Colors: theme.json → settings.color.palette
  - Palette must keep wolf-blank's 8 slots (primary, primary-light, secondary, accent,
    base, base-2, contrast, contrast-2) — a child palette replaces the parent's array,
    and parent block styles reference primary-light. `border` and `border-alt` are
    extra seijaku slots (10 total).
  - Current (dev branch, light skin): primary `#000000` (button bg), primary-light
    `#f1f1f1` (button hover), secondary `#14110e`, accent `#D3A043` (gold — punctual
    use only), base `#F5F5F7`, base-2 `#ffffff`, contrast `#1d1d1f`, contrast-2
    `#6b6b6b`, border `rgba(0,0,0,0.10)`, border-alt `rgba(255,255,255,0.15)`.
  - Type: font sizes are a true Major-Third scale (×1.25) anchored at base 1rem.
    Heading map: h6=base, h5=md, h4=lg, h3=xl, h2=`2-xl` (2.441rem), h1=`3-xl`
    (3.052rem); `display` (3.815rem) = inner-page hero titles, `hero` (4.768rem) =
    full-cover hero. NOTE: the big size slugs are hyphenated — `2-xl`/`3-xl`, not
    `2xl`/`3xl` (must match the `has-2-xl-font-size` classes WP emits and the SCSS
    `fs('2-xl')` token). Headings carry a per-level line-height + negative letter-
    spacing gradient (theme.json styles.elements.h1..h6). Spacing adds `11`/`12`
    clamp section steps. Root side padding (gutter) in styles.spacing.padding.
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

## Guty DSL files (`*.guty.tsx`)
- Guty is a LOCAL DEV TOOL only — not installed in CI. The build script uses `|| true` so CI skips it gracefully.
- `*.guty.tsx` files use a custom DSL (plain JSX, no module wrapper). They are NOT standard TypeScript/TSX.
- **NEVER run formatters (Prettier) or linters (ESLint) on `*.guty.tsx` files** — formatters add semicolons (`;` after `</Page>`) that break guty's parser. Files are excluded via `.eslintignore` and `.prettierignore`.
- Correct format: file starts directly with `<Page>` (no `export default`, no imports) and ends with `</Page>` — NO trailing semicolon.
- Exception: `reference-coverage.guty.tsx` uses `export default (\n  <Page>...\n);` — that's intentional, matches the guty examples.
- The guty tool lives at `tools/guty/`. See its README for DSL reference.

## Design tooling (skills, personal scope ~/.claude/skills)
- `frontend-design` and `ui-ux-pro-max` are installed — use them for UI/visual
  decisions (styles, palettes, type pairing, UX review).

## Git branch rules — CRITICAL
- **NEVER commit, merge, or push to `master` unless the user explicitly asks.** This should be rare and always requires confirmation before acting.
- Branch flow: `feature/*` → `dev` → `stage` → `master`
- `dev` is the integration branch. `stage` is pre-production. `master` is production.

## Commands (from workspace root)
n/a — this is a theme, no build step. Edit files directly, reload browser.

## Reuse note
This child theme is specific to wolfthemes.com.
For new client projects, create a new child theme from wolf-blank instead.

Git remote: git@github.com:wolfthemes/seijaku-fse.git — this repo only.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
