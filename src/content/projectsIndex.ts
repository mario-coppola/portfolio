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
    pageTitle: "Projects",
    pageDescription:
      "Projects on backend architecture, system guarantees, and design decisions.",
    caseStudiesTitle: "Projects",
    viewCaseStudy: "View project",
  },
  it: {
    backToHome: "Torna alla home",
    pageTitle: "Progetti",
    pageDescription:
      "Progetti focalizzati su architettura backend, garanzie di sistema e decisioni progettuali.",
    caseStudiesTitle: "Progetti",
    viewCaseStudy: "Vedi progetto",
  },
};
