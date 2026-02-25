import type { Lang } from "@/content/i18n";

export type AboutContent = {
  title: string;
  backToHome: string;
  intro: {
    p1: string;
    p2: string;
    p3: string;
    systemGuaranteeIntro: string;
    guarantees: string[];
  };
  howIWork: {
    title: string;
    p1: string;
    p2: string;
    p3: string;
  };
  whenToReachOut: {
    title: string;
    points: string[];
    closing: string;
  };
  cta: string;
};

export const aboutContent: Record<Lang, AboutContent> = {
  it: {
    title: "Chi sono",
    backToHome: "Torna alla home",
    intro: {
      p1: "Sono un backend engineer focalizzato su sistemi di integrazione affidabili.",
      p2: "Lavoro su software che deve reagire correttamente a eventi esterni: pagamenti, billing, integrazioni, automazioni. In questi contesti gli errori non sono teorici. Generano costi reali, stati incoerenti e perdita di fiducia.",
      p3: "Il mio lavoro è ridurre quel rischio. Non mi occupo solo di \"far funzionare\" una feature.",
      systemGuaranteeIntro: "Mi occupo di garantire che il sistema:",
      guarantees: [
        "non perda eventi",
        "non produca effetti duplicati",
        "non entri in stati silenziosamente inconsistenti",
        "sia osservabile quando qualcosa va storto",
      ],
    },
    howIWork: {
      title: "Come lavoro",
      p1: "Parto dal comportamento del sistema sotto failure, non dall'happy path.",
      p2: "Definisco confini chiari, esplicito le garanzie, documento le scelte architetturali.",
      p3: "Preferisco sistemi comprensibili e operabili a soluzioni complesse difficili da mantenere.",
    },
    whenToReachOut: {
      title: "Quando ha senso sentirci",
      points: [
        "stai integrando provider esterni e vuoi evitare effetti collaterali nascosti",
        "hai già avuto problemi con retry, webhook o stati incoerenti",
        "vuoi un backend che resti controllabile nel tempo",
      ],
      closing:
        "Se il tuo sistema deve reagire a eventi esterni in modo sicuro, posso aiutarti a progettare l'architettura giusta. Scrivimi e raccontami il contesto.",
    },
    cta: "Contattami",
  },
  en: {
    title: "About",
    backToHome: "Back to home",
    intro: {
      p1: "I'm a backend engineer focused on building reliable integration systems.",
      p2: "I work on software that must react correctly to external events: payments, billing systems, third-party integrations, automation triggers. In these contexts, failures are not theoretical—they cause real financial and operational risk.",
      p3: "My job is to reduce that risk. I don't just make features work.",
      systemGuaranteeIntro: "I make sure the system:",
      guarantees: [
        "doesn't lose events",
        "doesn't duplicate side effects",
        "doesn't drift into inconsistent states",
        "remains observable when something fails",
      ],
    },
    howIWork: {
      title: "How I work",
      p1: "I design for failure before I design for scale.",
      p2: "I define clear boundaries, make guarantees explicit, and document architectural decisions.",
      p3: "I prefer small, understandable, operable systems over complex setups that are hard to reason about.",
    },
    whenToReachOut: {
      title: "When it makes sense to reach out",
      points: [
        "you're integrating external providers and want predictable behavior",
        "you've experienced issues with webhooks, retries, or inconsistent state",
        "you want a backend that remains controllable over time",
      ],
      closing:
        "If your system must react safely to external events, let's discuss your context.",
    },
    cta: "Get in touch",
  },
};