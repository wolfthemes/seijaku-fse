---
target: templates/front-page.html
total_score: 26
p0_count: 0
p1_count: 3
timestamp: 2026-06-22T11-21-29Z
slug: templates-front-page-html
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Nav has no active state; theme grid loading state unknown |
| 2 | Match System / Real World | 3 | Copy is mostly natural; reviewer handles reduce testimonial authenticity |
| 3 | User Control and Freedom | 3 | Standard nav; no traps |
| 4 | Consistency and Standards | 2 | Music CTA section breaks editorial register set by hero + about |
| 5 | Error Prevention | 2 | Cover image has empty alt text; pull quote contrast fails |
| 6 | Recognition Rather Than Recall | 4 | CTAs are descriptive; nav is labeled |
| 7 | Flexibility and Efficiency | 2 | No header CTA; single conversion path until "Browse Themes" below 9 cards |
| 8 | Aesthetic and Minimalist Design | 3 | Hero and about strong; testimonials and music CTA undermine the system |
| 9 | Error Recovery | 3 | Static page; no error vectors |
| 10 | Help and Documentation | 2 | No pricing signal, no license clarity, no support entry point |
| **Total** | | **26/40** | **Acceptable** |

## Anti-Patterns Verdict
Detector returned zero findings. No gradient text, no side-stripe cards, no eyebrow scaffolding. The markup is clean. Register breaks down in testimonials (4 identical all-5-star cards, generic heading) and music CTA (cover-image promo widget breaks editorial voice).

## Overall Impression
Strong bones. About section copy is genuinely distinctive. Narrative arc is correct. Problems are concentrated in two sections + one confirmed contrast bug on the most important copy on the page.

## What's Working
1. About section copy and asymmetric layout — best editorial moment on the page
2. Hero restraint — single CTA, clean, trusts the headline
3. Zero automated slop — detector clean

## Priority Issues

### [P1] Pull quote text invisible on dark section
`.wolf-about__pullquote p { color: $c-ink }` (#1d1d1f) loaded after `.is-dark p { color: inherit }` (same specificity, earlier position). Later rule wins: near-black text on #14110e. Contrast ≈1.15:1. The best line of copy on the page is unreadable. Fix: change to `color: inherit` or `color: $c-base` in `_about.scss`.

### [P1] Header has no CTA button
`parts/header.html` has logo + nav only. No button. Every visitor sees the header on every scroll. Missing the highest-frequency conversion surface. Fix: add primary button "Browse Themes" to right of nav in wolf-header__inner.

### [P1] Testimonials break the editorial register
4 identical all-5-star cards in forced uniform-height grid. "What our customers say" is the most generic testimonial heading possible. Gold stars across 20 elements violates The Gold Once Rule. Fix: remove min-height, replace heading with a pull-stat ("500+ five-star reviews on ThemeForest"), consider marquee/scroll approach.

### [P2] Music CTA is a promo widget, not an editorial section
Cover block with dim filter, min-height 440px, split columns, upsell copy. Reads as a ThemeForest promotional widget. Breaks voice after careful editorial work. Fix: remove from homepage or redesign as a typographic full-bleed editorial aside.

### [P2] Hero headline doesn't carry the artisan POV
"WordPress Themes for Creative People" could describe 400 other shops. Brand's real differentiator arrives two sections later. Fix copy to carry maker-energy from first sentence.

## Persona Red Flags

### Jordan (First-Timer)
No price signal anywhere on homepage. No "what do I get" entry point. About section is below the full themes grid — late in scroll for a first-timer who may bounce.

### Casey (Distracted mobile user)
No persistent header CTA. 9-card grid loads all at once. 4 testimonials stack to single column = long scroll through uniform content. Music CTA at 440px = nearly full mobile viewport.

### Max (Agency evaluating for a client)
About section answers support question brilliantly but no license info on homepage. Nav has no "Licensing" entry. Music CTA assumes end-user buyer, not proxy.

## Minor Observations
- `wolf-hero_text-line` (single underscore) likely typo — should be `wolf-hero__text-line`
- `wolf-section-pad--big` not found in scanned SCSS — confirm defined in _layout.scss
- Sale marquee above header — ensure it visually recedes and doesn't compete with logo mark
- Testimonial "author titles" are theme names, not job titles — consider "Verified Buyer" label for first-timers
