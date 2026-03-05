# CLAUDE.md — Project Guide for Claude Code

## Project Overview

**pyon-dev** is Michael Pyon's portfolio repo. It currently contains **BlockScore**, an NYC apartment hunting intelligence tool built with React + Vite + Tailwind CSS v4.

## Tech Stack

- **Framework:** React 19 (JSX, no TypeScript)
- **Bundler:** Vite 7
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/postcss`)
- **Linter:** ESLint 9 (flat config)
- **No test framework** is currently configured

## Project Structure

```
src/
  App.jsx              — Main app: search, filters, layout
  main.jsx             — Entry point
  index.css            — Tailwind imports + CSS custom properties (design tokens)
  components/
    BlockCard.jsx      — List card for each block
    BlockDetail.jsx    — Expanded detail panel
    ScoreBar.jsx       — Horizontal score bar component
    ScoreRing.jsx      — Circular score ring component
    SubwayBadge.jsx    — Subway line badge component
  data/
    blocks.js          — Block data (neighborhoods, scores, metadata)
```

## Commands

```bash
npm run dev      # Start dev server (Vite)
npm run build    # Production build
npm run lint     # Run ESLint
```

## Design System

The app uses CSS custom properties defined in `src/index.css` for theming. Key token prefixes:
- `--color-bg`, `--color-surface` — backgrounds
- `--color-text`, `--color-text-muted`, `--color-text-subtle` — text
- `--color-border`, `--color-border-hover` — borders
- `--color-accent` — brand accent

Use Tailwind utility classes referencing these tokens (e.g., `bg-bg`, `text-text`, `border-border`).

## Conventions

- Functional components with hooks (no class components)
- File names match component names in PascalCase (e.g., `BlockCard.jsx`)
- Data files use camelCase (e.g., `blocks.js`)
- Keep components small and focused — extract when a component exceeds ~100 lines
- No TypeScript — plain JSX
