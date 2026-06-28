# Architecture Decision Record — Engineering Portfolio

## Overview

This is the living architecture document for the engineering portfolio.  
Update this file when making decisions that affect the structural integrity of the project.

---

## Project Structure

```
portfolio/
├── index.html          # Entry point (meta, fonts, app div)
├── vite.config.js      # Build config (GitHub Pages: base: './')
├── public/             # Static assets served as-is
├── src/
│   ├── main.js         # App orchestrator — only file that knows section order
│   ├── data/           # ALL content — never in component markup
│   ├── styles/         # Design system (tokens → reset → type → animations → utils)
│   ├── components/     # One folder per component, each with .js + .css
│   ├── rendering/      # 3D layer abstraction (Three.js slots in here)
│   └── lib/            # Pure utility modules (no UI, no side effects)
└── docs/
    └── ARCHITECTURE.md (this file)
```

---

## Core Principles

### 1. Data is separate from layout
Content lives in `src/data/*.js`. Components receive data objects. They never hardcode copy.  
To update any content, edit only the data files.

### 2. Components have one responsibility
Each component renders one thing. `Projects.js` orchestrates — `ProjectCard.js` renders one card.  
No component talks to another component directly.

### 3. The rendering layer is decoupled from the UI
`RenderingLayer.js` defines the contract for any WebGL/Three.js scene.  
UI components never import Three.js. They expose `getMountPoint()` methods.  
Adding 3D: extend `RenderingLayer`, mount to `getMountPoint()`, zero UI changes.

### 4. The token system is the single source of truth
No color, spacing, duration, or font value appears outside `tokens.css`.  
To change the visual language, change `tokens.css` — everything updates automatically.

### 5. Animations never compete with content
`data-reveal` system is driven by `IntersectionObserver`.  
All animations respect `prefers-reduced-motion` (see `animations.css`).  
No animation is decorative — every animation reveals or guides.

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Build | Vite | Fast dev server, optimised builds, ES module native |
| Language | Vanilla JS (ES Modules) | No framework overhead, full control |
| Styling | Vanilla CSS with custom properties | Zero runtime, full token system |
| 3D (future) | Three.js | Industry standard, slots into `rendering/` layer |
| Hosting | GitHub Pages | Static, free, no backend |

---

## Adding a New Section

1. Create `src/components/MySection/` with `MySection.js` and `MySection.css`
2. Export a function `MySection()` that returns a DOM element
3. If data-driven, add a data file to `src/data/` and import it in the component
4. Import and call `MySection()` in `src/main.js` at the correct position
5. Append to `main` element
6. Add `[data-reveal]` attributes to elements that should animate on scroll

No other files need to change.

---

## Adding Content to Existing Sections

### Projects
Edit `src/data/projects.js` — add an entry following the schema in the file comments.

### Timeline
Edit `src/data/timeline.js` — new entries automatically sort by year.

### Awards
Edit `src/data/awards.js` — section auto-appears when at least one entry exists.

### Skills / Disciplines
Edit `src/data/skills.js` — categories render in the order defined.

### Identity / Philosophy / Contact
Edit `src/data/site.js` — single source for all site-wide copy.

---

## GitHub Pages Deployment

```bash
npm run build           # Outputs to dist/
# Deploy dist/ to gh-pages branch
```

`vite.config.js` uses `base: './'` for relative asset paths.  
Change to `base: '/portfolio/'` if deploying to a project page (not a root domain).

---

## Security

This repository is public. The following rules are permanent:

- No API keys in any frontend file
- No credentials or secrets
- No private endpoint URLs
- Assume every line of client-side code is publicly visible

---

## What Is NOT in This Project (v1.0)

- No React, Vue, or Svelte
- No Tailwind CSS
- No GSAP or ScrollTrigger  
- No Three.js (architecture is ready, not installed)
- No backend, database, or server
- No form submission endpoint
- No analytics (add client-side only, no PII)
- No real project content (awaiting specification Book II)
