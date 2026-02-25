# CLAUDE.md — AI Assistant Guide for cainmenard-portfolio

## Project Overview

Personal portfolio website for Cain Menard — a data analytics professional showcasing certifications, publications, case studies, and personal projects. Built with **Next.js 14** (App Router), **React 18**, and **Tailwind CSS**, deployed on **Vercel** at `cainmenard.com`.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** JavaScript (JSX) — no TypeScript
- **Styling:** Tailwind CSS 3.4 + custom global CSS with CSS variables
- **Analytics:** @vercel/analytics
- **Hosting:** Vercel (auto-deploys from `main` branch)
- **DNS:** AWS Route 53 with CNAME to Vercel
- **Contact Form:** Formspree (external, no API routes)

## Quick Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Serve production build
```

There is no test runner, linter, or formatter configured.

## Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.js           # Root layout (metadata, ThemeProvider, ErrorBoundary, Analytics)
│   ├── globals.css         # All styles: Tailwind base + custom component classes
│   ├── page.js             # Home/portfolio page
│   ├── not-found.js        # Custom 404
│   ├── ai-evolution/       # Case study: Tableau-to-React migration
│   ├── honeymoon-demo/     # Trip planner interactive demo
│   └── lagniappe/          # Personal interests + Cajun recipes
├── components/             # Reusable React components
│   ├── Nav.js              # Responsive top navigation with dropdown
│   ├── MobileNav.js        # Full-screen mobile nav overlay
│   ├── Footer.js           # Footer (full/simple variants)
│   ├── BackToTop.js        # Scroll-to-top button (appears after 600px)
│   ├── SideNav.js          # Side navigation with progress rail
│   ├── RecipeCard.js       # Expandable recipe accordion
│   ├── TableauEmbed.js     # Lazy-loaded Tableau iframe wrapper
│   ├── ThemeProvider.js    # Dark mode context + localStorage persistence
│   ├── ThemeToggle.js      # Dark/light mode toggle button
│   └── ErrorBoundary.js    # React error boundary (class component)
├── hooks/                  # Custom React hooks
│   ├── useFadeOnScroll.js  # IntersectionObserver fade-in animation
│   ├── useSectionObserver.js # Track active section for nav highlighting
│   └── useScrollPosition.js  # Detect scroll position
└── data/                   # Static data files (no API, no database)
    ├── certifications.js   # Professional certifications with Credly links
    ├── education.js        # Degrees
    ├── experience.js       # Work history
    ├── navItems.js         # Navigation config per page
    ├── publications.js     # Articles and keynotes
    ├── recipes.js          # Cajun recipes
    ├── skills.js           # Categorized technical skills
    ├── tableauDashboards.js # Tableau public embeds
    └── webApps.js          # Personal dev projects
```

`public/` contains static assets: images, resume PDF, favicon, robots.txt, sitemap.xml, and OG image.

## Routing

All routes use the Next.js App Router (`src/app/`):

| Route              | File                          | Description                    |
| ------------------ | ----------------------------- | ------------------------------ |
| `/`                | `src/app/page.js`             | Main portfolio (sections: about, projects, writing, experience, skills, contact) |
| `/ai-evolution`    | `src/app/ai-evolution/page.js`| Featured case study article    |
| `/honeymoon-demo`  | `src/app/honeymoon-demo/page.js` | Trip planner demo           |
| `/lagniappe`       | `src/app/lagniappe/page.js`   | Personal interests + recipes   |

Within-page navigation uses anchor-based smooth scrolling (`#about`, `#projects`, etc.).

## Code Conventions

### File Naming
- **Components:** PascalCase (`Nav.js`, `BackToTop.js`, `ThemeProvider.js`)
- **Hooks:** camelCase with `use` prefix (`useFadeOnScroll.js`)
- **Data files:** camelCase (`navItems.js`, `certifications.js`)

### Data Exports
Data files export UPPER_SNAKE_CASE arrays/objects:
```js
export const NAV_ITEMS = [...]
export const EXPERIENCE = [...]
```

### Component Pattern
Functional components with default exports. Interactive components use `'use client'` directive at the top. Props use destructuring with default values:
```js
'use client'
export default function ComponentName({ prop1, prop2 = defaultValue }) { ... }
```

### Styling
- **Tailwind utility classes** inline on JSX elements
- **Conditional classes** via template literals (no `clsx` or `classnames` library)
- **Custom component classes** defined in `globals.css` (e.g., `.nav-glass`, `.btn-primary`, `.skill-tag`, `.fade-section`)
- **Dark mode** via Tailwind `dark:` variant, toggled by `class` strategy on `<html>`
- **CSS variables** for brand colors and fonts: `--navy`, `--accent` (#d97706 amber), `--font-body` (Plus Jakarta Sans), `--font-display` (Fraunces)

### State Management
- Local state via `useState` only — no global state library
- Theme state via React Context (`ThemeProvider` → `useTheme` hook)
- Theme persisted in `localStorage`
- No Redux, Zustand, or similar

### Data Flow
- All content lives in `src/data/*.js` static files
- Data is imported directly into pages/components — no API calls or database
- Props are drilled down (no complex state lifting)

## Path Alias

Configured in `jsconfig.json`:
```
@/* → ./src/*
```
Use `@/components/Nav` instead of `../../components/Nav`.

## Dark Mode

Managed by `ThemeProvider.js` using React Context and `localStorage`:
- Adds/removes `dark` class on `<html>` element
- Respects system preference on first visit via `prefers-color-scheme`
- Toggle via `ThemeToggle` component in the nav
- All dark styles use Tailwind's `dark:` variant

## Image Optimization

Configured in `next.config.js` to use AVIF and WebP formats. Use Next.js `<Image>` component for optimized loading where applicable.

## External Services

- **Formspree** (`https://formspree.io/f/mgollvll`) — contact form submission
- **Tableau Public** — embedded dashboards via lazy-loaded iframes
- **Vercel Analytics** — page view tracking
- **Credly** — certification badge links

## Things to Know

- No `.env` variables are required for local development
- No test suite exists — verify changes by running `npm run build` to catch build errors
- The `portfolio/` directory at the root appears to be an older/alternate build — the active source is in `src/`
- Pages can be large single files (the AI evolution case study is ~1250 lines) — this is intentional for self-contained articles
- The site is SEO-optimized with JSON-LD structured data in `layout.js`
