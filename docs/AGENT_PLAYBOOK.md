# AGENT_PLAYBOOK

How AI agents (Cursor) are used in this project.

Goal:
- reduce cognitive load
- preserve architectural control
- avoid AI-generated debt

---

## When to use the agent
- Repetitive, constrained tasks
- Small refactors
- UI consistency fixes
- Pattern replication

---

## When NOT to use the agent
- Architecture
- New abstractions
- New dependencies
- Open-ended “improvements”

---

## Prompt rules
- Always reference files via `@`
- Limit scope explicitly
- Constrain output

## TDD-Assisted Prompt Pattern

For complex features (not trivial refactors), use the following structured pattern:

1. Request test scaffolding
2. Request implementation
3. Request execution of tests
4. Iterate until tests pass

Example:
> "Write unit tests first for `X`, then implement code. Run the test suite (`npm test` / `vitest`) and fix any failures until all tests pass. Output diffs only."

This pattern improves correctness and reduces regressions.

---

## Checkpoints
Use checkpoints before:
- multi-file changes
- shared component edits

---

## Shell commands
Not allowed unless explicitly requested.

---

## Style constraints
- Respect UI primitives
- Respect CSS tokens
- No design invention
- No animations unless requested

---

## Golden path
Delegate only after a reference exists.

---

## Responsibility model
Human decides. Agent executes.