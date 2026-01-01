# Decisions (ADR-lite)

Format:
- Date
- Decision
- Rationale
- Consequences
- Status: Accepted / Superseded

---

## 2026-01-01 — Use Next.js App Router + TypeScript
Decision:
- Use Next.js (App Router) with TypeScript for the portfolio.

Rationale:
- Server-first rendering for SEO/performance.
- Modern routing/layout conventions and strong ecosystem.

Consequences:
- Prefer Server Components, keep client boundaries small.
Status: Accepted

---

## 2026-01-01 — Styling: Tailwind CSS
Decision:
- Use Tailwind CSS for styling.

Rationale:
- Fast iteration, consistent design tokens via utility conventions.
- Avoid bespoke CSS sprawl early.

Consequences:
- Create reusable UI primitives to avoid unreadable long class strings.
Status: Accepted

---

## 2026-01-01 — Content strategy: local content in repo (no CMS in v1)
Decision:
- Store case studies and content locally (MD/MDX or typed modules) in the repo.

Rationale:
- Portfolio needs reliability and simplicity.
- CMS adds complexity and vendor coupling for low benefit early.

Consequences:
- Content updates require a PR/commit.
- Revisit CMS only if update frequency or scale demands it.
Status: Accepted

---

## 2026-01-01 — SEO-first baseline
Decision:
- Implement SEO basics early: metadata API, OG images, sitemap, robots.txt.

Rationale:
- SEO is a core requirement for a portfolio.
- Easy to do early, expensive to retrofit late.

Consequences:
- Maintain consistent metadata patterns per route.
Status: Accepted

---

## 2026-01-01 — Component methodology: “atomic-ish, pragmatic”
Decision:
- Use a pragmatic component system:
  - UI primitives (atoms) in `src/components/ui`
  - composed blocks in `src/components/blocks`
  - page/route composition in `src/app`

Rationale:
- Encourages reuse and consistent naming without over-formal process.

Consequences:
- Avoid “one-off” components inside pages unless truly unique.
Status: Accepted