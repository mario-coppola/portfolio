import type { Lang } from "@/content/i18n";

export type SiteHeaderContent = {
  navLabels: {
    projects: string;
    about: string;
    contact: string;
  }
};

export const siteHeaderContent: Record<Lang, SiteHeaderContent> = {
  en: {
    navLabels: {
      projects: "Projects",
      about: "About",
      contact: "Contact",
    },
  },
  it: {
    navLabels: {
      projects: "Progetti",
      about: "Chi sono",
      contact: "Contatti",
    },
  },
};
