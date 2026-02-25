import type { Lang } from "@/content/i18n";

export type ContactContent = {
  title: string;
  intro: string;
  availability: string;
  scope: string[];
  emailLabel: string;
  closing: string;
};

export const contactContent: Record<Lang, ContactContent> = {
  en: {
    title: "Contact",
    intro:
      "The easiest way to reach me is email. Tell me about your context, what you're building, and where reliability matters.",
    availability: "Available for:",
    scope: [
      "architecture design",
      "system audits",
      "reliability hardening",
      "backend implementation",
    ],
    emailLabel: "Email",
    closing:
      "You can also find me on GitHub and LinkedIn.",
  },
  it: {
    title: "Contatti",
    intro:
      "Il modo più semplice per contattarmi è via email. Raccontami il contesto, cosa stai costruendo e dove serve affidabilità.",
    availability: "Disponibile per:",
    scope: [
      "architettura",
      "audit",
      "hardening",
      "implementazione backend",
    ],
    emailLabel: "Email",
    closing:
      "Puoi trovarmi anche su GitHub e LinkedIn.",
  },
};