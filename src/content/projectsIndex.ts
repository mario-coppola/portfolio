import type { Lang } from "@/content/i18n";

export type ProjectsIndexContent = {
  backToHome: string;
  pageTitle: string;
  pageDescription: string;
  caseStudiesTitle: string;
  viewCaseStudy: string;
};

export const projectsIndexContent: Record<Lang, ProjectsIndexContent> = {
  en: {
    backToHome: "Back to home",
    pageTitle: "Case Studies",
    pageDescription:
      "Case studies on backend architecture, system guarantees, and design decisions.",
    caseStudiesTitle: "Case studies",
    viewCaseStudy: "View case study",
  },
  it: {
    backToHome: "Torna alla home",
    pageTitle: "Case Study",
    pageDescription:
      "Case study focalizzati su architettura backend, garanzie di sistema e decisioni progettuali.",
    caseStudiesTitle: "Case study",
    viewCaseStudy: "Vedi case study",
  },
};
