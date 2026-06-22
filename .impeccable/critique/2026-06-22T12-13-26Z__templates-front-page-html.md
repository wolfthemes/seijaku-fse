---
target: templates/front-page.html
total_score: 30
p0_count: 0
p1_count: 0
timestamp: 2026-06-22T12-13-26Z
slug: templates-front-page-html
---
## Score: 30/40 (unchanged from previous run)

Recent edits (✦ separator, 22ch title, tagline break, 36k count) are quality-of-life refinements — no structural changes, no new issues introduced, no resolved P2s.

### Minor new finding
.wolf-testimonials__byline in _testimonials.scss is orphaned dead code — pattern now uses an H2, not a .byline paragraph. Safe to remove.

### Open items (unchanged)
- [P2] Music CTA breaks editorial register (deferred)
- [P2] No pricing signal — resolved by design (prices in cards, discount at checkout strategy confirmed)
- [P3] Help/docs: no license clarity on homepage (structural)

## Theme Card Tagline Suggestions

Goal: signal deal without revealing price. 4–6 words, brand voice (direct, unhyped).

Ranked by fit:
1. "Sale price at checkout" — recommended. Factual, clean, no hype. 20% is already in the marquee.
2. "Launch price in cart" — campaign-specific, more immediate.
3. "Discounted — see in cart" — editorial dash rhythm.
4. "20% off · unlocks at checkout" — surfaces %, redundant with marquee.
5. "Price reveals at checkout" — slight curiosity pull.
