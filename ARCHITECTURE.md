# Architecture

## Purpose
This portfolio is intentionally designed to showcase architectural thinking,
clarity of reasoning, and product awareness — not just technical output.

It demonstrates:
- Full-stack competence (frontend + light backend integration when needed)
- Clear decision making (trade-offs, constraints)
- Product mindset (performance, UX, SEO, maintainability)

Primary goals:
- Fast, accessible, SEO-friendly site
- Easy to update (projects/case studies without friction)
- Clean, understandable codebase that scales to future projects

Non-goals (v1):
- No CMS
- No heavy animations
- No over-engineering

---

## High-level stack
- Framework: Next.js (App Router) + React + TypeScript
- Styling: Tailwind CSS
- Content: typed local modules in repo
- Deploy: Vercel (or equivalent)

---

## Architecture principles

### 1) Simplicity by default
Prefer the simplest solution that is easy to explain.
Avoid clever abstractions.

### 2) Server-first
- Server Components by default
- Client Components only when interactivity is required
- Keep client boundaries small

### 3) Explicit boundaries
- Route handlers are thin adapters
- Business logic lives outside routes

### 4) Predictable organization
- `src/app` → routes and layouts
- `src/components/ui` → shared UI primitives
- `src/components/blocks` → composed blocks
- `src/content` → typed content
- `src/lib` → small shared utilities

### 5) Composition over inheritance
Prefer small composable components.

---

## Quality bar
- Readable code
- Small functions
- Minimal side effects
- SEO baseline (metadata, sitemap, robots)
- No unnecessary client JS

---

## Operational notes
This document explains *why* the architecture is shaped this way.

Operational constraints and rules live in:
- `docs/PROJECT_RULES.md`

AI operational usage is defined in:
- `docs/AGENT_PLAYBOOK.md`