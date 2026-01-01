# Agents Working Agreement

This repo uses AI assistance. The agent must optimize for correctness, clarity, and maintainability.

## Operating mode
- Default to incremental changes with small commits.
- Prefer explicitness over assumptions.
- Always follow ARCHITECTURE.md and DECISIONS.md.

## Allowed
- Refactor for clarity (small steps)
- Add small utilities when clearly justified
- Improve naming and structure
- Add basic tests for pure logic (utilities/services)
- Improve SEO metadata and accessibility when relevant

## Not allowed (must ask first)
- Introducing a new framework, state manager, auth provider, database, CMS, or major library
- Changing routing strategy or major folder structure
- Adding complex build tools or config layers
- Large sweeping refactors without a plan

## When to stop and ask
Stop and ask before proceeding if:
- The requirement is ambiguous or needs a product decision
- There are multiple architectural approaches
- A change would affect more than ~5 files significantly
- A dependency change is suggested
- The agent is unsure about current project conventions

## Definition of good code in this repo
- Naming:
  - Components: PascalCase (e.g., `ProjectCard`)
  - Hooks: `useX`
  - Utilities: camelCase verbs (e.g., `formatDate`)
- Functions:
  - Prefer small, single-purpose functions.
  - Avoid long functions; split if it improves readability.
- Components:
  - Keep UI primitives dumb (presentation-focused).
  - Keep feature logic in feature modules, not in route files.
- Side effects:
  - Minimize and isolate. Prefer pure functions.
- Comments:
  - Explain “why”, not “what”, when needed.

## Delivery checklist for agent changes
Before proposing a final patch:
- Ensure `pnpm lint` and `pnpm typecheck` pass (when configured)
- No unused deps introduced
- No unnecessary client components
- Basic accessibility: semantic HTML, labels, alt text
- SEO: metadata consistent where appropriate