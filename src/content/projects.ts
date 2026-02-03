export type Project = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  stack: string[];
  year?: string;
  links?: { label: string; href: string }[];

  // Case study fields (optional for now)
  context?: string;
  problem?: string;
  decisions?: string[];
  tradeoffs?: string[];
  outcome?: string[];
  flagship?: boolean;
};
  
export const projects: Project[] = [
  {
    slug: "portfolio",
    title: "Portfolio (this site)",
    summary:
      "SEO-first and server-first portfolio: clean structure, versioned content, performance, and long-term maintainability.",
    role: "Design + Engineering",
    year: "2026",
    stack: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    links: [{ label: "Repo", href: "https://github.com/mario-coppola/portfolio" }],

    context: "A lightweight portfolio to present my work with an emphasis on architecture and product thinking.",
    problem:
      "Most portfolios show outputs. I wanted to show how I think: trade-offs, constraints, and maintainable execution.",
    decisions: [
      "Next.js App Router with a server-first approach for performance and SEO.",
      "Typed, versioned content in-repo to keep updates simple and auditable.",
      "Minimal UI primitives and predictable structure to reduce complexity.",
    ],
    tradeoffs: [
      "No CMS in v1: updates require commits, but complexity stays low.",
      "No i18n in v1: English-first now, multilingual planned later.",
    ],
    outcome: [
      "Fast baseline and clean architecture ready for new projects.",
      "SEO foundation (metadata, sitemap, robots) from day one.",
    ],
    flagship: false,
  },
  {
    slug: "reliable-eventing-saas",
    title: "Reliable Event Processing (B2B SaaS)",
    summary:
      "Backend system for business-critical external events: reliable webhooks, idempotency, controlled retries, and observable state transitions.",
    role: "Architecture + Backend Engineering",
    year: "2026",
    stack: ["Node.js", "PostgreSQL", "Webhooks", "Queues", "Observability"],
    context:
      "A B2B backend designed around external events that must be processed exactly once (logically), even when deliveries are duplicated, delayed, or out of order.",
    problem:
      "External events are messy: providers retry, deliveries duplicate, and ordering is not guaranteed. Without explicit state and idempotency, systems drift and teams lose trust in the data.",
    decisions: [
      "Idempotency keys and state machine transitions as first-class concepts.",
      "Controlled retry policy with backoff and clear failure modes.",
      "Observability: structured logs + traceable event lifecycle per entity.",
    ],
    tradeoffs: [
      "More upfront design work to avoid fragile quick fixes later.",
      "Requires discipline in modeling state transitions explicitly.",
    ],
    outcome: [
      "Predictable processing under retries and duplicates.",
      "Clear operational visibility: every event is traceable and explainable.",
      "Lower risk of silent data drift and costly manual reconciliation.",
    ],
    flagship: true,
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFlagshipProject(): Project | undefined {
  return projects.find((p) => p.flagship);
}