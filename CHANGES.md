# pyon.dev Audit

Audit date: 2026-03-27

Scope reviewed:
- `src/`
- `index.html`
- build/lint/config files
- `scripts/card-gen/`
- referenced public assets

## Fixes Applied

- Added a route-aware metadata hook in [src/hooks/usePageMeta.js](/Users/michaelpyon/Documents/pyon-dev/src/hooks/usePageMeta.js) and wired it into [src/pages/Home.jsx](/Users/michaelpyon/Documents/pyon-dev/src/pages/Home.jsx), [src/pages/Playground.jsx](/Users/michaelpyon/Documents/pyon-dev/src/pages/Playground.jsx), and [src/pages/NotFound.jsx](/Users/michaelpyon/Documents/pyon-dev/src/pages/NotFound.jsx).
- Improved base SEO metadata in [index.html](/Users/michaelpyon/Documents/pyon-dev/index.html): stronger title/description, `robots`, `theme-color`, `og:site_name`, `og:locale`, canonical normalization, and Person JSON-LD.
- Added missing mono font support by defining `--font-mono` and loading JetBrains Mono in [src/index.css](/Users/michaelpyon/Documents/pyon-dev/src/index.css) and [index.html](/Users/michaelpyon/Documents/pyon-dev/index.html).
- Disabled Lenis when `prefers-reduced-motion` is enabled and replaced the unbounded top-level scroll loop with a managed setup/cleanup flow in [src/main.jsx](/Users/michaelpyon/Documents/pyon-dev/src/main.jsx).
- Converted the custom cursor from width/height animation to scale animation in [src/components/CustomCursor.jsx](/Users/michaelpyon/Documents/pyon-dev/src/components/CustomCursor.jsx) to keep hover motion on compositor-friendly properties.
- Lazy-loaded the playground route in [src/App.jsx](/Users/michaelpyon/Documents/pyon-dev/src/App.jsx), which split `Playground` into its own chunk and reduced the initial main bundle.
- Switched the shell container from `min-h-screen` to `min-h-dvh` in [src/App.jsx](/Users/michaelpyon/Documents/pyon-dev/src/App.jsx) to avoid mobile viewport-height issues.
- Added safe-area-aware positioning and `aria-pressed` to the theme toggle in [src/pages/Home.jsx](/Users/michaelpyon/Documents/pyon-dev/src/pages/Home.jsx).
- Improved loading behavior for portfolio images in [src/pages/Home.jsx](/Users/michaelpyon/Documents/pyon-dev/src/pages/Home.jsx): featured image stays eager/high-priority, other images now lazy-load and decode asynchronously.
- Replaced several low-contrast tiny labels with stronger text colors and added keyboard-visible hover-equivalent affordances in [src/pages/Home.jsx](/Users/michaelpyon/Documents/pyon-dev/src/pages/Home.jsx), [src/pages/Playground.jsx](/Users/michaelpyon/Documents/pyon-dev/src/pages/Playground.jsx), and [src/pages/NotFound.jsx](/Users/michaelpyon/Documents/pyon-dev/src/pages/NotFound.jsx).
- Removed one dead in-file component path by deleting the unused `GameCard` block from [src/pages/Home.jsx](/Users/michaelpyon/Documents/pyon-dev/src/pages/Home.jsx).
- Fixed the ESLint false-positive setup in [eslint.config.js](/Users/michaelpyon/Documents/pyon-dev/eslint.config.js) so `no-unused-vars` no longer breaks on every JSX component/import.

## Findings

### Links

Portfolio grid URLs currently defined in [src/pages/Home.jsx](/Users/michaelpyon/Documents/pyon-dev/src/pages/Home.jsx):

- `ShooterDigest` -> `https://shooter.michaelpyon.com`
- `The Low Line` -> `https://subway.michaelpyon.com`
- `Random Pin Cuisine` -> `https://random-pin.michaelpyon.com`
- `VintageMap` -> `https://vintage.michaelpyon.com`
- `Concert Prep` -> `https://concert.michaelpyon.com`
- `Market Pulse` -> `https://menswear.michaelpyon.com`
- `Pollen Season` -> `https://pollen-season.vercel.app`
- `Air Composer` -> `https://air-composer.michaelpyon.com`
- `Popup Beat Panic` -> `https://michaelpyon.github.io/popup-beat-panic/`
- `Keyboard Drummer` -> `https://michaelpyon.github.io/keyboard-drummer/`

Status:
- All portfolio-grid links are syntactically valid and internally consistent with the project names/assets in the repo.
- Live HTTP verification could not be completed because outbound network access is blocked in this environment.
- `Pollen Season` is the only featured app still using a `.vercel.app` URL instead of the `michaelpyon.com` subdomain pattern. That may be intentional, but it is the main branding inconsistency in the grid.
- `Market Pulse` points to `menswear.michaelpyon.com`. That also may be intentional, but the visible product name and host slug do not match.

### Responsive Design

- The main layouts are fluid and breakpoint-driven:
  - Home projects: `grid-cols-1` -> `md:grid-cols-12`
  - Home experiments: `grid-cols-1` -> `sm:grid-cols-3`
  - Playground cards: `grid-cols-1` -> `sm:grid-cols-2` -> `lg:grid-cols-3`
- I did not find any remaining fixed-width containers in the current source that would obviously force horizontal overflow.
- I fixed the two highest-probability mobile issues I found in code review:
  - `min-h-screen` on the app shell
  - footer link row not wrapping
- I could not produce browser screenshots in this sandbox because local browser capture failed, so the responsive review was completed from the current buildable source rather than pixel-level screenshots.

### Animation / Motion

- The site was previously running Lenis continuously even when reduced motion was requested. That is now fixed.
- The custom cursor was previously animating `width` and `height`; it now animates `scale`.
- Large image hover transitions were paint-heavy grayscale transitions. They now use shorter opacity/transform motion instead.
- Entry motion still uses custom easing and 500ms to 900ms durations in [src/pages/Home.jsx](/Users/michaelpyon/Documents/pyon-dev/src/pages/Home.jsx) and [src/pages/Playground.jsx](/Users/michaelpyon/Documents/pyon-dev/src/pages/Playground.jsx). They are reasonable, but if you want a tighter feel the next pass would be to shorten the hero reveal timings.

### SEO / Metadata

- Base metadata is now materially better and internally consistent.
- Route changes now update title, description, canonical, OG title/description, Twitter title/description, and `og:url`.
- `NotFound` now sets `noindex,follow`.
- Residual limitation: this is still a client-rendered Vite SPA. Bots that do not execute JavaScript will only see the base `index.html` metadata, not route-specific metadata. Full route-level SEO/OG fidelity would require SSR or prerendering.

### Accessibility

- Contrast improved for small utility text by darkening/lightening `--color-text-subtle` and replacing a few opacity-reduced labels with stronger text colors.
- Theme toggle now exposes pressed state.
- Keyboard users now get focus-visible equivalents for several hover-only arrow motions.
- Footer `X` link now has a clearer accessible name.
- Residual accessibility risk: there is still a lot of very small text across the design. Contrast is improved, but the typography is still visually delicate.

### Dead Code / Unused Assets

- [src/components/Card.jsx](/Users/michaelpyon/Documents/pyon-dev/src/components/Card.jsx) is not imported anywhere. It appears to be a legacy component file.
- `/public/cards/high-roller.png` is not referenced anywhere in the app.
- `/public/cards/originals/*` are backup assets generated by `scripts/card-gen/render.sh`; they are not used by the site runtime.
- `scripts/card-gen/template.html` does not appear to be referenced by the current render flow.
- I did not delete any of these because the instruction was to avoid deleting files.

### Tooling

- The original ESLint config could not reliably evaluate JSX usage, so it flagged every component/import in `.jsx` files as unused.
- The config now avoids those false positives, but note that JSX-level unused-variable detection is still weaker than it would be with a proper JSX usage rule/plugin installed.

## Validation

- `npm run build` ✅
- `npm run lint` ✅

Build output after changes:

- `dist/assets/index-Bp8TTT1C.js` -> `384.02 kB` (`123.00 kB` gzip)
- `dist/assets/Playground-JTMtHG3d.js` -> `7.78 kB` (`2.81 kB` gzip)

## Recommended Next Pass

- Live-verify every external app URL from a network-enabled environment.
- Decide whether `pollen-season.vercel.app` and `menswear.michaelpyon.com` are the intended canonical destinations.
- Remove or archive legacy runtime-unused files/assets once you no longer need them:
  - [src/components/Card.jsx](/Users/michaelpyon/Documents/pyon-dev/src/components/Card.jsx)
  - `/public/cards/high-roller.png`
  - `/public/cards/originals/*`
  - [scripts/card-gen/template.html](/Users/michaelpyon/Documents/pyon-dev/scripts/card-gen/template.html)
- If route-level social previews matter, move the site to SSR/prerendered metadata.
