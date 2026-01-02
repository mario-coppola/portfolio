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
  },
];