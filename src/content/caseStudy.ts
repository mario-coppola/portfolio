import type { Lang } from "@/content/i18n";

export type CaseStudyContent = {
  backToProjects: string;
  sectionTitles: {
    whatItIs: string;
    whyThisIsHard: string;
    safetyDesign: string;
    tradeOffs: string;
    whatYouGet: string;
  };
  cta: {
    title: string;
    body: string;
    linkLabel: string;
  };
};

export const caseStudyContent: Record<Lang, CaseStudyContent> = {
  en: {
    backToProjects: "← Back to projects",
    sectionTitles: {
      whatItIs: "What it is",
      whyThisIsHard: "Why this is hard",
      safetyDesign: "Safety design",
      tradeOffs: "Trade-offs",
      whatYouGet: "What you get",
    },
    cta: {
      title: "Working with webhooks and external events?",
      body:
        "If you need webhook or external event processing that stays correct under retries, duplicates, and out-of-order delivery, I can help.",
      linkLabel: "Get in touch",
    },
  },
  it: {
    backToProjects: "← Torna ai progetti",
    sectionTitles: {
      whatItIs: "Che cos'è",
      whyThisIsHard: "Perché è difficile",
      safetyDesign: "Progettazione per l'affidabilità",
      tradeOffs: "Compromessi",
      whatYouGet: "Cosa ottieni",
    },
    cta: {
      title: "Webhook o eventi esterni in produzione?",
      body:
        "Se hai bisogno di webhook o eventi esterni che restino corretti con retry, duplicati e consegna fuori ordine, posso aiutarti.",
      linkLabel: "Contattami",
    },
  },
};
