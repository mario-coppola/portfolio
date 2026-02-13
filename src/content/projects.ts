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
  caseStudy?: boolean;
};
  
export const projects: Project[] = [
  
  {
    slug: "reliable-eventing-saas",
    title: "Reliable Event Processing (B2B SaaS)",
    summary:
      "Backend system for business-critical external events: reliable webhooks, idempotency, controlled retries, and observable state transitions.",
    role: "Architecture + Backend Engineering",
    year: "2026",
    stack: ["Node.js", "PostgreSQL", "NestJS", "Queues", "Observability"],
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
    caseStudy: true,
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getCaseStudy(): Project | undefined {
  return projects.find((p) => p.caseStudy);
}