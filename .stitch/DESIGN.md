# pyon-dev Design System (Stitch Extract)

Extracted from Stitch export: 2026-04-01

## Color Palette

### Light Mode
| Token | Hex | Usage |
|-------|-----|-------|
| bg | `#fbf9f4` | Page background |
| surface | `#f5f3ee` | Card backgrounds, subtle containers |
| surface-hover | `#f0eee9` | Hover state for surface |
| surface-high | `#eae8e3` | Filter pills, secondary surface |
| text | `#1b1c19` | Primary text |
| text-muted | `#5d5f57` | Secondary/body text |
| text-subtle | `#88726f` | Tertiary text, outlines |
| primary | `#7c2e25` | Primary accent, active nav, filter active |
| primary-container | `#9a453a` | Accent hover, secondary accent |
| border | `#dbc1bd` | Borders, dividers |
| border-subtle | `#e4e2dd` | Subtle borders, surface variant |

### Dark Mode
| Token | Hex | Usage |
|-------|-----|-------|
| bg | `#1a1a18` | Page background |
| surface | `#252523` | Card backgrounds |
| surface-hover | `#2e2e2b` | Hover states |
| text | `#e8e5dd` | Primary text |
| text-muted | `#a8a49c` | Body text |
| primary | `#ffb4a9` | Accent (inverse primary) |
| primary-container | `#9a453a` | Accent hover |

## Typography

| Role | Family | Weight | Tracking | Case |
|------|--------|--------|----------|------|
| Display (h1) | Newsreader | 400 italic | -0.03em | Sentence |
| Headline (h2-h3) | Newsreader | 400/700 italic | -0.02em | Sentence |
| Body | Inter | 300-400 | 0 | Sentence |
| Label | Inter | 400-600 | 0.1-0.2em | Uppercase |
| Section Label | Inter | 400 | 0.2em | Uppercase |

### Type Scale
| Element | Size (mobile) | Size (desktop) | Line Height |
|---------|--------------|----------------|-------------|
| Hero h1 | 3rem (48px) | 6rem (96px) | 1.1 |
| Section heading | 3rem (48px) | 4.5rem (72px) | 1.1 |
| Flagship title | 1.875rem (30px) | 3rem (48px) | 1.15 |
| Body text | 1rem (16px) | 1.125rem (18px) | 1.6 |
| Label | 0.625-0.75rem | 0.625-0.75rem | 1.2 |
| Section number | 0.65rem | 0.65rem | 1.2 |

## Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| page-x | 2rem / 6rem | Page horizontal padding (mobile/desktop) |
| section-y | 6rem / 12rem | Section vertical spacing |
| card-gap | 6rem | Gap between flagship cards |
| grid-gap-x | 2rem | Archive grid column gap |
| grid-gap-y | 4rem | Archive grid row gap |
| component-gap | 2.5-4rem | Space between component sections |

## Layout

- **Max width**: 80rem (1280px), full-bleed sections allowed
- **Grid**: 12-column on desktop, single column on mobile
- **Flagship**: 1 full-width (8 col image + 4 col text) + 2 staggered (6+6 with offset)
- **Archive grid**: 4 columns on desktop, 3 on tablet, 1 on mobile
- **Border radius**: 0px everywhere (sharp corners)

## Component Patterns

### Navigation (fixed top)
- Fixed, full-width, blur backdrop (#fbf9f4/80%)
- Brand mark left, nav links center-right, CTA button right
- Nav links: uppercase label style, 0.75rem, tracking 0.1rem
- Active link: primary color + bottom border
- CTA: primary bg, white text, uppercase

### Flagship Cards
- Image: grayscale default, color on hover (1000ms transition)
- Section number: "01 / Category" format
- Title: Newsreader italic, large
- CTA: "Read case study" with bottom border, italic

### Archive Cards
- Border-top separator style (not card/container)
- Domain pill: uppercase, primary color
- Title: Newsreader italic
- Description: 2 lines max, font-light

### Filter Pills
- Sharp corners (0px radius)
- Active: primary bg, white text
- Inactive: surface-high bg, on-surface-variant text
- Uppercase label style, tracking 0.2em

### Footer
- Large editorial CTA: "Ready to build something that lasts?"
- Email as large text link with bottom border
- Social links row below
- Brand mark + copyright at bottom

## Motion

- Flagship image hover: grayscale(0) + scale, 1000ms ease
- Card hover: translateY(-4px), 300ms cubic-bezier(0.16,1,0.3,1)
- Section entrance: fade + slideUp, staggered 100ms
- Filter pill hover: translateY(-2px), 300ms
- Scroll progress: vertical bar on left side, tracks scroll position

## Image Treatment

- Default: `filter: grayscale(1)`, `opacity: 0.92`
- Hover: `filter: grayscale(0)`, `opacity: 1`, `scale: 1.02`
- Transition: 1000ms ease-in-out
- Aspect ratios: 16/9 (full-width), 4/5 (staggered cards)
