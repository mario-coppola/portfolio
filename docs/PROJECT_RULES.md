# PROJECT_RULES

Non-negotiable rules for this project.

If a change violates these rules, it must be justified in `DECISIONS.md`.

---

## Scope
Personal portfolio.
Not a SaaS. Not a CMS.

---

## Data
- No database
- No CMS
- Typed content in `src/content`

---

## Architecture
- Next.js App Router
- Server-first
- Minimal client state

Rationale: see `ARCHITECTURE.md`.

---

## UI & Styling
- Editorial minimal
- Mobile-first
- System dark mode only
- CSS tokens as source of truth

---

## Dependencies
- Minimize
- Explicit justification required

---

## Type Safety
- TypeScript mandatory
- No `any` without reason

---

## SEO & Performance
- Server metadata
- Sitemap & robots
- No client-side SEO hacks

---

## AI usage
- Agents follow `docs/AGENT_PLAYBOOK.md`
- Humans own decisions