export type CaseStudyListing = {
  slug: string;
  stack: string[];
  year?: string;
  links?: { label: string; href: string }[];
};

export const caseStudies: CaseStudyListing[] = [
  {
    slug: "reliable-eventing-saas",
    stack: ["Node.js", "PostgreSQL", "NestJS", "Queues", "Observability"],
    year: "2026",
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudyListing | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getFeaturedCaseStudies(): CaseStudyListing[] {
  return caseStudies;
}
