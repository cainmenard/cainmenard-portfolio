# CLAUDE.md — Cain Menard Portfolio

## Project Overview

Personal portfolio website for Cain Menard — Digital Operations Leader. A single-page portfolio with additional secondary pages, deployed on Vercel at cainmenard.com.

## Tech Stack

- **Framework:** Next.js 14 (App Router) with React 18
- **Styling:** Tailwind CSS 3.4 + custom global CSS (`src/app/globals.css`)
- **Fonts:** Google Fonts — loaded via `<link>` in `layout.js`
- **Analytics:** Vercel Analytics (`@vercel/analytics`)
- **Deployment:** Vercel (auto-deploys on push to `main`)
- **Node runtime:** No backend/API routes — purely client-rendered pages

## Commands

```bash
npm run dev      # Start local dev server (next dev)
npm run build    # Production build (next build)
npm start        # Serve production build (next start)
```

No test runner, linter, or formatter is currently configured.

## Directory Structure

```
src/
├── app/
│   ├── layout.js              # Root layout — metadata, fonts, JSON-LD, ThemeProvider
│   ├── page.js                # Main portfolio page (hero, about, projects, experience, skills, contact)
│   ├── globals.css            # Global styles, design tokens, component CSS classes
│   ├── not-found.js           # Custom 404 page
│   ├── lagniappe/page.js      # Personal "about me" page (projects, recipes, photos)
│   └── honeymoon-demo/page.js # Honeymoon planning app demo
├── components/
│   ├── Nav.js                 # Fixed header nav with active section tracking
│   ├── MobileNav.js           # Mobile navigation overlay
│   ├── Footer.js              # Footer with social links
│   ├── ThemeProvider.js       # Dark/light mode context (localStorage-backed)
│   ├── ThemeToggle.js         # Theme toggle button
│   ├── BackToTop.js           # Floating back-to-top button (appears after 600px scroll)
│   ├── TableauEmbed.js        # Lazy-loading Tableau iframe (IntersectionObserver)
│   ├── RecipeCard.js          # Collapsible recipe card component
│   └── ErrorBoundary.js       # Error boundary for embed failures
├── hooks/
│   ├── useScrollPosition.js   # Detects if scrolled > 40px (nav glass effect trigger)
│   ├── useSectionObserver.js  # Active section detection for nav highlight
│   └── useFadeOnScroll.js     # IntersectionObserver fade-in animation trigger
└── data/
    ├── navItems.js            # Navigation link labels and IDs
    ├── experience.js          # 6 career positions
    ├── education.js           # 3 degrees
    ├── skills.js              # 5 skill categories with individual skills
    ├── certifications.js      # 6 professional certifications
    ├── publications.js        # 4 articles/speaking engagements
    ├── tableauDashboards.js   # 3 Tableau dashboard embed configs
    ├── webApps.js             # 3 personal web app projects
    └── recipes.js             # 8 Cajun family recipes
```

### Public Assets

```
public/
├── headshot.jpg, og-image.png
├── favicon.svg, favicon.ico, apple-touch-icon.png
├── robots.txt, sitemap.xml
├── Cain_Menard_Resume.pdf
├── Certification badge images (6 files)
├── lagniappe/ (banner + 4 personal photos)
└── bachelor-trip-demo.html
```

## Configuration Files

| File | Purpose |
|---|---|
| `tailwind.config.js` | Dark mode via `class`, custom slate colors (750, 850, 950), scans `src/**` |
| `jsconfig.json` | Path alias `@/*` maps to `./src/*` |
| `next.config.js` | `reactStrictMode: true`, AVIF/WebP image optimization |
| `postcss.config.js` | Tailwind + Autoprefixer |

## Architecture Patterns

- **All pages are client components** (`'use client'`) — no server components or SSR data fetching
- **Data is static** — all content lives in `src/data/*.js` as exported arrays/objects
- **Styling is hybrid** — Tailwind utility classes in JSX + custom CSS classes in `globals.css`
- **Theme toggle** — class-based dark mode via `ThemeProvider` context, persisted in `localStorage`
- **Scroll animations** — `useFadeOnScroll` hook + `.fade-section` / `.stagger-child` CSS classes
- **Contact form** — Formspree integration (POST to external endpoint)

## Key CSS Classes (defined in globals.css)

| Class | Purpose |
|---|---|
| `.nav-glass` | Frosted glass navigation bar |
| `.fade-section` / `.visible` | Scroll-triggered fade-in animation |
| `.stagger-child` | Staggered nth-child animation delays |
| `.hero-gradient` | Hero section background gradient |
| `.section-label` | Eyebrow label (uppercase, accent color) |
| `.section-heading` | Display font section heading |
| `.btn-primary` / `.btn-outline` | Button styles with hover/active states |
| `.project-card` | Card with hover lift + shadow |
| `.pub-card` | Publication card with left accent border |
| `.skill-tag` | Skill badge with hover animation |
| `.timeline-line` / `.timeline-dot` | Experience timeline visualization |
| `.headshot-ring` | Circular gradient border for headshot |
| `.tableau-container` | Responsive Tableau embed container |

---

# Design System — Target Aesthetic

**Design Vision:** Blend Palantir's structured precision with Rivian's warm, earthy, textural modernism. The result should feel like a high-end consulting portfolio built by someone who spends weekends outdoors — technical authority with natural warmth. Not dark like Palantir. Think warm neutrals, natural textures, and confident whitespace.

## Color Palette

Shift away from cold slate/navy toward Rivian-inspired warm neutrals.

### Light Surfaces

| Token | Hex | Usage |
|---|---|---|
| Primary background | `#FAF8F5` | Main page background (slight parchment warmth, not sterile white) |
| Secondary surface | `#F2EFEB` | Alternate section backgrounds (warm light gray, like sandstone) |
| Tertiary surface | `#E8E4DE` | Card backgrounds (muted khaki-stone) |

### Dark Surfaces

| Token | Hex | Usage |
|---|---|---|
| Dark section bg | `#2C2A27` | Hero, footer, feature blocks (warm charcoal — earthy, not blue-black) |
| Dark surface layer | `#3A3835` | Depth within dark sections |
| Dark deepest layer | `#1F1D1B` | Deepest dark background |

### Accent Colors

| Token | Hex | Usage |
|---|---|---|
| Primary accent | `#4E8AF7` | CTAs, links, interactive elements (Palantir blue) |
| Secondary accent | `#2B5945` | Tags, labels, success states, subtle highlights (forest green) |

### Text Colors

| Context | Primary | Secondary | Tertiary |
|---|---|---|---|
| On light | `#1E2124` | `#636363` | `#767676` |
| On dark | `#FFFFFF` | `#F2F2F2` | `#CBCBCB` |

## Typography System (3-Font Hierarchy)

**Base font size:** `18px` on `<html>` (Palantir's rem system). Scale headlines responsively using `rem` units.

### Display / Headlines — Inter

- Tight letter-spacing (`-0.02em`), weights 600-700
- Used for: section titles, hero text, navigation
- Character: clean, authoritative, geometric

### Body / UI — Inter

- Weight 400, line-height 1.4-1.5
- Used for: body copy, form labels, buttons, metadata

### Editorial / Serif Accent — Lora

- Weight 400, line-height 1.7
- Italic for pull quotes
- Used for: case study descriptions, methodology narrative paragraphs, testimonial quotes, insight block body text
- This is the warmth layer — use sparingly and intentionally

### Eyebrow Labels / Captions — Inter

- Weight 600, `text-transform: uppercase`, `letter-spacing: 0.05em`, size ~`0.75rem`

## Spacing and Layout

- **Rem-based spacing** with 18px base
- **Full-bleed containment:**
  ```css
  --h-contain: max(calc((100% - var(--max-width)) / 2), var(--h-spacing));
  --max-width: 80rem;
  ```
- **Section vertical spacing:** ~5.5rem desktop, ~4.4rem tablet, ~3.3rem mobile
- **12-column grid** with responsive gutters: 1.67rem desktop, 0.83rem tablet, 0.56rem mobile
- Wide, confident breathing room on large screens — let content float in space

## Texture and Atmosphere

These details create the natural, tactile feeling that differentiates the design:

- **Noise/grain overlay:** Subtle repeating SVG or PNG noise pattern at 3-5% opacity on background surfaces
- **Warm box-shadows** (never cold gray):
  ```css
  box-shadow: 0 1px 3px rgba(44, 42, 39, 0.08), 0 4px 12px rgba(44, 42, 39, 0.04);
  ```
- **Section dividers:** Thin 1px lines using `rgba(0, 0, 0, 0.06)` — barely visible, structural only
- **Hover states:** Background warmth shift (e.g., `#FAF8F5` to `#F2EFEB`) with smooth `0.2s ease` transitions
- **Hero gradient:** `linear-gradient(180deg, #FAF8F5 0%, #F2EFEB 100%)`

## Component Patterns (Bain-Inspired Structure)

### Section Header

Eyebrow label (Inter caps, green accent) -> Headline (Inter display) -> Editorial lead paragraph (Lora serif)

### Case Study Card

Eyebrow tag -> Title -> Lora description paragraph -> Metric/stat proof points

### Insight Block

Bordered left-accent strip (green or blue) -> Lora body text -> Attribution

### Stat Component

Large number (Inter display, blue accent) -> Label below (Inter caption)

## Responsive Behavior

- **Mobile-first**, three breakpoints: `35em` (tablet), `60em` (desktop), `80em` (wide)
- Full-bleed hero and feature sections on all sizes
- Cards: single-column on mobile, 2-col tablet, 3-col desktop
- Typography scales down proportionally — headlines should still feel bold on mobile

## General Rendering Principles

- Anti-aliased text: `-webkit-font-smoothing: antialiased`
- `scroll-behavior: smooth`
- No harsh borders — use shadow and background contrast for separation
- Every interactive element gets hover/focus state

---

## Anti-Generic Guardrails

These rules prevent the site from looking like a default template:

- **Colors:** Never use default Tailwind palette (`indigo-500`, `blue-600`, etc.). Use the custom brand colors defined above.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity (warm `rgba(44, 42, 39, ...)` not cold gray).
- **Typography:** Never use the same font for headings and body. Pair Inter (display/body) with Lora (serif editorial). Apply tight tracking (`-0.02em` to `-0.03em`) on large headings, generous line-height (`1.7`) on serif body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Interactive states:** Every clickable element needs `hover`, `focus-visible`, and `active` states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens from the rem system — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base -> elevated -> floating), not all sit at the same z-plane.

## Hard Rules

- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
