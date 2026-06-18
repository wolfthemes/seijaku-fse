# Seijaku FSE

The **Full Site Editing (FSE)** child theme that powers the [wolfthemes.com](https://wolfthemes.com)
redesign — a child of [Wolf Blank](https://github.com/wolfthemes/wolf-blank) by
[WolfThemes](https://wolfthemes.com) (Constantin Saguin).

Seijaku replaces the old Seijaku + Elementor site with a pure block theme: no page builders,
no third-party JS. The design is **light, editorial, and minimal** — big negative space, bold
typography (Lexend + Rethink Sans), and one strong electric-blue accent used sparingly.
Reference energy: Linear, Stripe, Rauno.me.

## Requirements
- WordPress 6.5+ and PHP 8.0+
- Parent theme **wolf-blank** installed (handles theme supports + global.css enqueue)
- Optional: the **wolf-store** plugin (provides the `wolf-store/theme-index` block used on the front page)

## Install & activate
1. Place both `wolf-blank` (parent) and `seijaku-fse` (this theme) in `wp-content/themes/`.
2. In WP admin → **Appearance → Themes**, activate **Seijaku FSE**.
3. After editing any `templates/` or `parts/` file, go to **Appearance → Editor → Templates**
   and **Clear customizations** so the file versions load (FSE caches templates in the DB).

> Local dev runs in `wolf-store-docker` — site at `http://localhost:8080`.

## What's built

### Templates
| Template | File | Notes |
|----------|------|-------|
| Front page | `templates/front-page.html` | Hero · themes grid · about · placeholders for stats + testimonials |
| Page (default) | `templates/page.html` | Constrained layout |
| Page (full-width) | `templates/page-fullwidth.html` | No content width constraint |
| About | `templates/about.html` | Intro · story · values · CTA sections via patterns |
| Services | `templates/services.html` | Hero · intro · how it works · process · pricing · FAQ · CTA |
| Contact | `templates/contact.html` | Intro · form · options sections via patterns |
| Music themes | `templates/music-themes.html` | Landing page for the music niche |
| Theme archive | `templates/archive-wolf_theme.html` | `wolf-store/theme-index` grid |
| Single theme | `templates/single-wolf_theme.html` | Individual theme product page |

### Template parts
| Part | File | Notes |
|------|------|-------|
| Header | `parts/header.html` | Wordmark left, nav + CTA right |
| Header (overlay) | `parts/header-overlay.html` | Transparent over hero, used on front-page + music-themes |
| Footer | `parts/footer.html` | Minimal 3-column layout |

### Patterns (PHP)
Reusable section patterns registered in `patterns/` — consumed by templates above.

| Category | Patterns |
|----------|---------|
| Hero | `hero.php`, `music-themes-hero.php`, `services-hero.php` |
| About | `about-intro.php`, `about-story.php`, `about-values.php`, `about-cta.php`, `about.php` |
| Services | `services-intro.php`, `services-how-it-works.php`, `services-process.php`, `services-pricing.php`, `services-tweaks-faq.php`, `services-project-cta.php` |
| Contact | `contact-intro.php`, `contact-form.php`, `contact-options.php` |
| Social proof | `testimonials.php`, `stats.php`, `why-wolfthemes.php`, `audience.php` |
| Global | `cta.php`, `marquee.php`, `sale-marquee.php`, `latest-themes.php` |
| Brand | `logo-mark-dark.php`, `logo-mark-light.php` |

Data-driven / repeatable sections (stats counter, testimonials, pricing) are currently implemented
as static patterns and will later be superseded by the **wolf-blocks** plugin.

## Design tokens
Everything visual is driven by `theme.json` (strict JSON — **no comments**):

| Token group | Location |
|-------------|----------|
| Colors (8 slots + `border`) | `settings.color.palette` |
| Fonts (Lexend / Rethink Sans) | `settings.typography.fontFamilies` |
| Fluid type scale (xs→3xl + `display`) | `settings.typography.fontSizes` |
| Spacing scale (1→10 + `11`/`12` section clamps) | `settings.spacing.spacingSizes` |
| Layout widths (720 / 1280) + root gutter | `settings.layout`, `styles.spacing.padding` |
| Wolf contract vars (radius, border, button, shadow, transition) | `settings.custom.wolf` |

The `--wolf-*` contract is aliased in `wolf-blank/assets/css/global.css` section 6 — set values
here in `theme.json`, don't edit the parent's aliases. Spacing/layout primitives inherit from
the parent; the child palette and font/size/spacing arrays **replace** the parent's arrays.

## Build & linting
Assets live in `src/` (JS + SCSS), compiled to `build/` via `@wordpress/scripts` / webpack.

```bash
npm install && npm run build        # production build
npm run start                       # watch mode

npm run lint                        # JS + CSS + package.json
npm run lint:php                    # PHP (WordPress + VIP standards)
npm run format                      # Prettier (WordPress config)
```

### CI / deploy
GitHub Actions (`.github/workflows/deploy.yml`) runs on every push to `master` or `stage`:
1. Lint JS, CSS, PHP (PHP lint on `master` only)
2. Build assets
3. Deploy to SiteGround via SSH rsync

## Use with Claude Code
`CLAUDE.md` is loaded automatically and holds the design direction, token map, dev-environment
notes, and front-page section plan. Read the parent `wolf-blank/CLAUDE.md` before touching shared
files. The `frontend-design` and `ui-ux-pro-max` skills are installed for UI/visual work.

## License & contact
GNU GPL v2 or later. © [WolfThemes](https://wolfthemes.com) — Constantin Saguin.
