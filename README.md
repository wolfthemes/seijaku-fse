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
| Piece | File | Status |
|-------|------|--------|
| Design tokens (light palette, fluid type incl. `display`, generous spacing) | `theme.json` | ✅ |
| Header — wordmark left, nav + one CTA right | `parts/header.html` | ✅ |
| Hero — full viewport (core/cover, no image), display heading, tagline, two CTAs | `templates/front-page.html` | ✅ |
| Themes grid — `wolf-store/theme-index`, featured-first | `templates/front-page.html` | ✅ |
| About — asymmetric columns, text + pull quote | `templates/front-page.html` | ✅ |
| Footer — minimal 3 columns | `parts/footer.html` | ✅ |
| Stats · Testimonials · Pricing | `<!-- WOLF-BLOCKS: ... -->` placeholders | ⏳ wolf-blocks plugin |

Data-driven / repeatable sections (stats counter, testimonials, pricing) are **not** built into
the theme — they belong to the planned **wolf-blocks** plugin and will inherit these tokens.

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

## Use with Claude Code
`CLAUDE.md` is loaded automatically and holds the design direction, token map, dev-environment
notes, and front-page section plan. Read the parent `wolf-blank/CLAUDE.md` before touching shared
files. The `frontend-design` and `ui-ux-pro-max` skills are installed for UI/visual work.

## Development & linting
```bash
composer install && composer lint      # PHP (WordPress + VIP standards)
npm install && npm run lint            # JS / CSS / package.json
npm run format                         # Prettier (WordPress config)
```

## License & contact
GNU GPL v2 or later. © [WolfThemes](https://wolfthemes.com) — Constantin Saguin.
