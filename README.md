# Wolf Blank

A minimal **Full Site Editing (FSE)** WordPress boilerplate theme by [WolfThemes](https://wolfthemes.com).

Wolf Blank is a radical blank slate: a valid, activatable WordPress block theme that renders a
clean white canvas with **zero WordPress default styling**. All design decisions (colors, fonts,
spacing) are exposed as clearly-labeled placeholder tokens in `theme.json`, ready to be filled
per project. It is the foundation for the wolfthemes.com redesign and future builds.

## When to use it
- Starting a new WolfThemes FSE project from scratch.
- You want full control over styling with no WP default noise to override.
- You're working with Claude Code (see `CLAUDE.md`).

## Install
1. Copy this folder into `wp-content/themes/` (e.g. `wp-content/themes/wolf-blank`).
2. In WP admin → **Appearance → Themes**, activate **Wolf Blank**.
3. Requires WordPress 6.5+ and PHP 8.0+.

> Add a `screenshot.png` (1200×900) to the theme root before shipping — it's intentionally omitted here.

## Fill the design tokens
Everything visual is driven by `theme.json`:

| Token group | Location |
|-------------|----------|
| Colors (8 slots) | `settings.color.palette` |
| Fonts (heading + body) | `settings.typography.fontFamilies` |
| Fluid type scale (xs→3xl) | `settings.typography.fontSizes` |
| Spacing scale (1→10) | `settings.spacing.spacingSizes` |
| Layout widths | `settings.layout` (740 / 1200) |
| Block & element styles | `styles` |

Project-level CSS custom props (transition speed, radius, shadow, header height) live in
`assets/css/global.css` **section 6**.

> **Note:** `theme.json` is strict JSON — no comments allowed. Don't add `//` or `/* */`
> inside it or WordPress will fail to parse the theme.

## Use with Claude Code
Open the theme folder in Claude Code. `CLAUDE.md` is loaded automatically and contains the
design direction, file map, token locations, and the step-by-step redesign workflow.

## File structure
```
wolf-blank/
├── style.css            # theme header only
├── functions.php        # supports + asset enqueue (<60 lines)
├── theme.json           # all design tokens (v3, valid JSON, no comments)
├── index.php            # silence is golden
├── CLAUDE.md            # context for Claude Code sessions
├── README.md
├── templates/
│   ├── front-page.html  # hero · themes grid · stats · CTA
│   ├── index.html       # blog listing
│   ├── single.html      # single post + comments
│   ├── page.html        # static page
│   └── 404.html
├── parts/
│   ├── header.html      # logo · nav · CTA
│   └── footer.html      # brand · nav · newsletter · bottom bar
└── assets/
    ├── css/global.css   # reset + utilities + design slots
    └── js/              # empty (no jQuery, no third-party JS)
```

## Development & linting
The theme ships with a full WordPress-compliant linting toolchain.

**PHP — PHPCS with WordPress + WordPress VIP standards** (`.phpcs.xml.dist`):
```bash
composer install      # one-time
composer lint         # check (WordPress, WordPress-VIP-Go, WordPressVIPMinimum, PHPCompatibilityWP)
composer lint:fix     # auto-fix
```

**JS / CSS / package.json — `@wordpress/scripts`:**
```bash
npm install           # one-time
npm run lint          # eslint + stylelint + pkg-json
npm run format        # Prettier (WordPress config)
npm run build         # compile assets/ (only once block JS/CSS is added)
npm run start         # watch build
```

Config files: `.phpcs.xml.dist`, `.eslintrc.js`, `.stylelintrc.json`, `.prettierrc.js`,
`.editorconfig`, plus matching `*ignore` files. `vendor/`, `node_modules/`, and `build/`
are gitignored.

## Plugin dependencies
**None.** The theme is fully self-contained. The `wolf-store` plugin is optional — when present,
wire its CPT into the front-page query loop (see `CLAUDE.md`).

## License & contact
GNU GPL v2 or later. © [WolfThemes](https://wolfthemes.com) — Constantin Saguin.
