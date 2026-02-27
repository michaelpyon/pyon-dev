# Sprint 4 Plan — pyon.dev

## Current State Assessment

**What exists:** Single-page React app with 5 project cards in a vertical list. Dark theme, Inter + JetBrains Mono fonts, Tailwind v4 with CSS custom properties. Basic intersection observer fade-in animation. Brief bio blurb at bottom. No hero section, no about, no contact, no OG tags, no favicon.

**Design gap:** Current design is "developer default dark mode." Functional but forgettable. For a portfolio that's the first impression, it needs to feel intentional, editorial, and elevated — closer to Awwwards/Godly.website territory.

**Key issues:**
1. No hero/intro — site opens cold with cards
2. No meta/OG tags — sharing on socials/Slack looks broken
3. No favicon
4. No contact section or social links
5. Card design is generic — no visual hierarchy or personality
6. No responsive refinement (works but not optimized)
7. Bio is buried at the bottom with no name
8. Typography hierarchy is flat
9. No hover microinteractions that feel premium
10. Footer is throwaway

---

## Tasks (ranked by impact)

### T1: Hero Section — Name, Role, One-liner ⭐ HIGHEST
**Files:** `src/App.jsx`
**Changes:** Add a hero section with Michael's name (large, editorial typography), role line, and a confident one-liner. Use dramatic scale contrast (name in ~4-6rem, role in small caps).
**Validation:** Name visible above fold at 375px. Feels like an editorial magazine header.

### T2: Meta Tags, OG Tags, Favicon ⭐ HIGH
**Files:** `index.html`, add `public/favicon.svg`
**Changes:** Add description, OG title/description/image/url, Twitter card meta. Create minimal SVG favicon (monogram "MP" or geometric mark).
**Validation:** Paste URL in Slack/Twitter/iMessage — shows title, description, image preview.

### T3: Elevate Card Design — Editorial Grid ⭐ HIGH
**Files:** `src/App.jsx`, `src/index.css`
**Changes:** Redesign cards: larger project names, accent color as left border or top stripe, better spacing, subtle grain/noise texture on hover, smooth cursor-aware glow effect. Add project numbers (01, 02...).
**Validation:** Cards feel like editorial content blocks, not Bootstrap cards.

### T4: About Section with Contact Links ⭐ HIGH
**Files:** `src/App.jsx`
**Changes:** Replace the buried bio with a proper about section: name, short bio (2-3 sentences), links to GitHub, LinkedIn, email. Style as a distinct section with clear visual separation.
**Validation:** Contact info is findable. Section has visual weight.

### T5: Typography & Spacing Overhaul ⭐ HIGH
**Files:** `src/index.css`, `src/App.jsx`
**Changes:** Add a display/serif font for headings (e.g., instrument serif or just use Inter at dramatic weights). Increase whitespace between sections. Refine font sizes for mobile-first hierarchy.
**Validation:** Type hierarchy passes squint test — clear H1 > H2 > body contrast.

### T6: Smooth Page Entrance Animation
**Files:** `src/App.jsx`, `src/index.css`
**Changes:** Staggered entrance: hero fades/slides in first, then cards sequentially, then about section. Use CSS keyframes, not JS.
**Validation:** Page load feels choreographed, not instant.

### T7: Footer Redesign
**Files:** `src/App.jsx`
**Changes:** Proper footer with copyright, "Built with React + curiosity" or similar, subtle separator.
**Validation:** Footer feels intentional, not afterthought.

### T8: Custom Cursor or Hover Effects
**Files:** `src/index.css`
**Changes:** Subtle cursor dot follower or card glow-on-hover effect.
**Validation:** Interaction feels premium without being gimmicky.

### T9: Mobile Responsive Polish (375px)
**Files:** `src/App.jsx`, `src/index.css`
**Changes:** Test and refine all spacing, font sizes, card padding at 375px. Ensure hero text doesn't overflow.
**Validation:** Screenshot at 375px looks intentional, not squeezed.

### T10: Performance — Preload, Code Split
**Files:** `index.html`, `vite.config.js`
**Changes:** Add font-display: swap, preload critical assets, ensure tree shaking is clean.
**Validation:** Lighthouse performance > 95.

---

## Execution: Top 5 tasks (T1-T5)
