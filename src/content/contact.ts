import type { Lang } from "@/content/i18n";

export type ContactContent = {
  backToHome: string;
  pageTitle: string;
  pageDescription: string;

  emailLabel: string;
  emailValue: string;
  primaryCta: {
    label: string;
  };

  whatToInclude: {
    title: string;
    bullets: [string, string, string];
  };

  availability: {
    title: string;
    line: string;
  };

  links: {
    title: string;
    github: string;
    linkedin: string;
  };
};

export const contactContent: Record<Lang, ContactContent> = {
  en: {
    backToHome: "← Back to home",
    pageTitle: "Get in touch",
    pageDescription:
      "Email is the fastest way. Share a bit of context and I’ll reply with the next steps.",

    emailLabel: "Email",
    emailValue: "mariocoppo91@gmail.com",
    primaryCta: {
      label: "Email me",
    },

    whatToInclude: {
      title: "What to include",
      bullets: [
        "What you’re building (product / company)",
        "Which external events you handle (payments, webhooks, provider X)",
        "What’s going wrong today (retries, duplicates, inconsistent state, observability)",
      ],
    },

    availability: {
      title: "Availability / scope",
      line: "Available for: architecture, audit, hardening, implementation.",
    },

    links: {
      title: "Links",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
  },

  it: {
    backToHome: "← Torna alla home",
    pageTitle: "Contatti",
    pageDescription:
      "La mail è il modo più veloce. Raccontami due righe di contesto e ti rispondo con i prossimi step.",

    emailLabel: "Email",
    emailValue: "mariocoppo91@gmail.com",
    primaryCta: {
      label: "Scrivimi",
    },

    whatToInclude: {
      title: "Cosa includere",
      bullets: [
        "Cosa stai costruendo (prodotto / azienda)",
        "Quali eventi esterni gestisci (pagamenti, webhooks, provider X)",
        "Cosa sta andando storto oggi (retry, duplicati, stato incoerente, osservabilità)",
      ],
    },

    availability: {
      title: "Disponibilità / ambito",
      line: "Disponibile per: architettura, audit, hardening, implementazione.",
    },

    links: {
      title: "Link",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
  },
};