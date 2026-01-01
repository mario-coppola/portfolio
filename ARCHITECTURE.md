# Architecture

## Purpose
This portfolio is intentionally designed to showcase architectural thinking, clarity of reasoning, and product awareness — not just technical output.
This repository is a developer portfolio that demonstrates:
- Full-stack competence (frontend + light backend integration when needed)
- Clear thinking and decision making (tradeoffs, constraints)
- Product mindset (performance, UX, SEO, maintainability)

Primary goals:
- Fast, accessible, SEO-friendly site
- Easy to update (projects/case studies without friction)
- Clean, understandable codebase that scales to future projects

Non-goals (for v1):
- No complex CMS integration
- No heavy animations or “wow for wow”
- No over-engineering (keep scope small and ship)

## High-level stack
- Framework: Next.js (App Router) + React + TypeScript
- Styling: Tailwind CSS
- Content: local content (MD/MDX or typed data modules) stored in repo
- Deploy: Vercel (or equivalent) with preview deployments

## Architecture principles
### 1) Simplicity by default
- Prefer the simplest solution that is easy to explain.
- Avoid clever abstractions. If it needs a long explanation, it’s probably wrong.

### 2) Server-first, client-only when necessary
- Prefer Server Components by default.
- Use Client Components only for interactivity (state, event handlers, browser APIs).
- Keep client boundaries small.

### 3) Thin route handlers, explicit boundaries
- Route handlers (API routes) are adapters: validate input, call services, return response.
- Business logic lives in dedicated modules (services/use-cases), not in routes.

### 4) Predictable code organization
- Use `src/` to keep app code separate from config.
- Keep “feature” code close to where it is used, but centralize shared primitives.
- Avoid deep nesting and “utils dumping ground”.

### 5) Composition over inheritance (UI)
- Prefer small, composable components.
- Prefer data-down/actions-up.

## Project structure (target)
- `src/app/` — routes, layouts, metadata files
- `src/components/` — UI components (design-system-ish)
- `src/features/` — feature modules (projects, contact, etc.)
- `src/lib/` — shared utilities (small, pure, well-named)
- `src/server/` — server-only logic (services, integrations) if needed
- `content/` — MD/MDX or structured content (case studies, writing)
- `public/` — static assets

## Quality bars (definition of “done”)
- Readable code: consistent naming, small functions, few side effects
- Consistent formatting (prettier) + lint rules
- Basic tests only when they pay off (utility/service logic)
- SEO baseline: metadata, OG, sitemap, robots, canonical where needed
- Performance: no unnecessary client JS, optimized images, good Lighthouse basics