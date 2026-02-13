import type { Lang } from "@/content/i18n";

export type HomeContent = {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  caseStudy: {
    title: string;
    viewCaseStudy: string;
  };
  otherProjects: {
    title: string;
  };
};

export const homeContent: Record<Lang, HomeContent> = {
  en: {
    hero: {
      eyebrow: "Backend Engineer",
      title: "I build reliable backend systems for B2B products.",
      subtitle:
        "Backends designed to stay correct even when external providers, webhooks, and integrations fail.",
      primaryCta: { label: "View projects", href: "/projects" },
      secondaryCta: { label: "Get in touch", href: "/contact" },
    },
    caseStudy: {
      title: "Case studies",
      viewCaseStudy: "View case study",
    },
    otherProjects: {
      title: "Other projects",
    },
  },
  it: {
    hero: {
      eyebrow: "Backend Engineer",
      title: "Costruisco sistemi backend affidabili per prodotti B2B.",
      subtitle:
        "Backend progettati per restare corretti anche quando provider esterni, webhook e integrazioni falliscono.",
      primaryCta: { label: "Vedi progetti", href: "/projects" },
      secondaryCta: { label: "Contattami", href: "/contact" },
    },
    caseStudy: {
      title: "Case study",
      viewCaseStudy: "Vedi case study",
    },
    otherProjects: {
      title: "Altri progetti",
    },
  },
};
