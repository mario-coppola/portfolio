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
    body: string;
  };
  cta: {
    title: string;
    body: string;
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
  otherProjects: {
    title: string;
  };
};

export const homeContent: Record<Lang, HomeContent> = {
  en: {
    hero: {
      eyebrow: "Backend Engineer — Event Processing & Reliability",
      title: "I build reliable backend systems for B2B products.",
      subtitle:
        "External events, webhooks, idempotency, and observable state—designed to stay correct under real conditions.",
      primaryCta: { label: "View projects", href: "/projects" },
      secondaryCta: { label: "Get in touch", href: "/contact" },
    },
    caseStudy: {
      title: "Case studies",
      body:
        "Each project is treated like a flagship: clear goals, strict scope, and measurable outcomes.",
    },
    cta: {
      title: "Have a product to build?",
      body:
        "If you want a reliable web application that stays lean as it grows, let's talk.",
      primary: { label: "Start a project", href: "/contact" },
      secondary: { label: "See the work", href: "/projects" },
    },
    otherProjects: {
      title: "Other projects",
    },
  },
  it: {
    hero: {
      eyebrow: "Backend Engineer — Event Processing & Reliability",
      title: "Costruisco sistemi backend affidabili per prodotti B2B.",
      subtitle:
        "Eventi esterni, webhook, idempotenza, failure esplicite — progettati per restare corretti in produzione.",
      primaryCta: { label: "Vedi progetti", href: "/projects" },
      secondaryCta: { label: "Contattami", href: "/contact" },
    },
    caseStudy: {
      title: "Case studies",
      body:
        "Ogni progetto è documentato come case study: problema, garanzie, scelte progettuali e risultati.",
    },
    cta: {
      title: "Hai un prodotto da costruire?",
      body:
        "Se vuoi una web app affidabile che resta snella mentre cresce, parliamone.",
      primary: { label: "Inizia un progetto", href: "/contact" },
      secondary: { label: "Guarda i lavori", href: "/projects" },
    },
    otherProjects: {
      title: "Altri progetti",
    },
  },
};
