# Seijaku FSE

The **Full Site Editing (FSE)** block theme that powers the [wolfthemes.com](https://wolfthemes.com)
redesign — a child of [Wolf Blank](https://github.com/wolfthemes/wolf-blank) by
[WolfThemes](https://wolfthemes.com) (Constantin Saguin).

Seijaku replaces the previous Elementor-based site with a pure block theme: no page builders,
no third-party front-end frameworks. The design is **light, editorial, and minimal** — big
negative space, bold typography (Urbanist + Rethink Sans), black-and-white with a single gold
accent used sparingly. Reference energy: Linear, Stripe, Rauno.me.

## How templates are authored

Templates, template parts, and patterns are **not hand-written block markup**. They are
authored as JSX in `src/` and compiled into WordPress block grammar by **guty**, an in-house
compiler (`tools/guty` in the workspace):

```
src/templates/*.guty.tsx   →   templates/*.html      (block templates)
src/parts/*.guty.tsx       →   parts/*.html          (template parts)
src/patterns/*.guty.tsx    →   patterns/*.php        (registered patterns)
```

A template reads like a component tree instead of serialized block comments:

```jsx
<Page>
	<Header slug="header" />
	<Main pt="var(--wp--preset--spacing--12)" layoutType="constrained">
		<Heading level={ 1 } fontSize="hero">404</Heading>
		<Buttons layoutJustifyContent="center">
			<Button url="/">Back to home</Button>
		</Buttons>
	</Main>
	<Footer slug="footer" />
</Page>
```

The compiler emits the exact `<!-- wp:... -->` serialized output WordPress expects, including
the save output of third-party blocks (block roots configured in `guty.config.json`), so the
generated files round-trip cleanly through the Site Editor.

**Source of truth is `src/` — never edit the compiled `templates/`, `parts/`, or
`patterns/` files directly; they are overwritten on every build.** guty is a local dev tool
only: the build script degrades gracefully (`|| true`) so CI and any environment without it
still build assets from the committed compiled output.

## Requirements
- WordPress 6.5+ and PHP 8.0+
- Parent theme **wolf-blank** installed (handles theme supports + global.css enqueue)
- Optional: the **wolf-store** plugin (provides the `wolf-store/theme-index` block used on the front page)

## Install & activate
1. Place both `wolf-blank` (parent) and `seijaku-fse` (this theme) in `wp-content/themes/`.
2. In WP admin → **Appearance → Themes**, activate **Seijaku FSE**.
3. After a rebuild changes any `templates/` or `parts/` file, go to **Appearance → Editor →
   Templates** and **Clear customizations** so the file versions load (FSE caches templates in the DB).

> Local dev runs in `wolf-store-docker` — site at `http://localhost:8080`.

## What's built

### Templates (`src/templates/`)
| Template | Notes |
|----------|-------|
| Front page | Hero · themes grid · about · placeholders for stats + testimonials |
| Page / Page (full-width) | Constrained and unconstrained layouts |
| About | Intro · story · values · CTA sections via patterns |
| Services | Hero · intro · how it works · process · pricing · FAQ · CTA |
| Contact | Intro · form · options sections via patterns |
| Music themes | Landing page for the music niche |
| Theme archive | `wolf-store/theme-index` grid (`archive-wolf_theme`) |
| Single theme | Individual theme product page (`single-wolf_theme`) |
| Blog / Single / 404 / Coming soon | Standard hierarchy coverage |

### Template parts (`src/parts/`)
Header (wordmark left, nav + CTA right), overlay header (transparent over hero), minimal
3-column footer.

### Patterns (`src/patterns/`)
Reusable section patterns compiled to `patterns/*.php` — hero variants, about/services/contact
sections, testimonials, stats, CTAs, marquees, brand marks. Data-driven sections (stats
counter, testimonials, pricing) are static patterns for now, to be superseded by the
**wolf-blocks** plugin.

## Design tokens
Everything visual is driven by `theme.json` (strict JSON — **no comments**):

| Token group | Location |
|-------------|----------|
| Colors (8 parent slots + `border`/`border-alt`) | `settings.color.palette` |
| Fonts (Urbanist / Rethink Sans) | `settings.typography.fontFamilies` |
| Major-third type scale (xs→`3-xl`, `display`, `hero`) | `settings.typography.fontSizes` |
| Spacing scale (1→10 + `11`/`12` section clamps) | `settings.spacing.spacingSizes` |
| Layout widths + root gutter | `settings.layout`, `styles.spacing.padding` |
| Wolf contract vars (radius, border, button, shadow, transition) | `settings.custom.wolf` |

The `--wolf-*` contract is aliased in `wolf-blank/assets/css/global.css` section 6 — set values
here in `theme.json`, don't edit the parent's aliases. Spacing/layout primitives inherit from
the parent; the child palette and font/size/spacing arrays **replace** the parent's arrays.

## Build & tooling
Front-end assets (JS + SCSS) live in `src/scripts` and `src/styles`, compiled to `build/` via
`@wordpress/scripts` / webpack. Interactions use GSAP + Lenis + SplitType.

```bash
npm install
npm run build        # guty compile (if available) + production asset build
npm run start        # watch everything: guty + wp-scripts + browser-sync, concurrently

npm run guty:theme   # compile src/ templates/parts/patterns into the theme root
npm run lint         # JS + CSS + package.json
npm run lint:php     # PHP (WordPress + VIP standards)
npm run format       # Prettier (WordPress config) — .guty.tsx files are excluded
```

> `*.guty.tsx` files are a compiler DSL, not standard TSX — they're excluded from
> ESLint/Prettier (`.eslintignore` / `.prettierignore`) because formatters break the parser.

### CI / deploy
GitHub Actions (`.github/workflows/deploy.yml`) runs on every push to `master` or `stage`:
1. Lint JS, CSS, PHP (PHP lint on `master` only)
2. Build assets (guty step skipped — compiled output is committed)
3. Deploy to SiteGround via SSH rsync

Branch flow: `feature/*` → `dev` → `stage` → `master`.

## Use with Claude Code
`CLAUDE.md` is loaded automatically and holds the design direction, token map, dev-environment
notes, and front-page section plan. Read the parent `wolf-blank/CLAUDE.md` before touching shared
files.

## License & contact
GNU GPL v2 or later. © [WolfThemes](https://wolfthemes.com) — Constantin Saguin.
