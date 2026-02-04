import type { Lang } from "@/content/i18n";

export type HomeContent = {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  problem: {
    title: string;
    body: string;
  };
  flagship: {
    title: string;
    body: string;
  };
  guarantees: {
    title: string;
    items: string[];
  };
  nonScope: {
    title: string;
    items: string[];
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
  portfolioBuiltWith?: {
    title: string;
    body: string;
    linkLabel: string
  };
};

export const homeContent: Record<Lang, HomeContent> = {
  en: {
    hero: {
      eyebrow: "Backend Engineer — Event-driven systems",
      title: "I build reliable backend systems for B2B products.",
      subtitle:
        "External events, webhooks, idempotency, and observable state—designed to stay correct under real conditions.",
      primaryCta: { label: "View projects", href: "/projects" },
      secondaryCta: { label: "Get in touch", href: "/contact" },
    },
    problem: {
      title: "Problem",
      body:
        "Most portfolios show outputs. I focus on decision-making, trade-offs, and clean execution that scales.",
    },
    flagship: {
      title: "Flagship approach",
      body:
        "Each project is treated like a flagship: clear goals, strict scope, and measurable outcomes.",
    },
    guarantees: {
      title: "Guarantees",
      items: [
        "Architecture-first decisions and explicit trade-offs.",
        "Performance, SEO, and accessibility as baseline.",
        "Documentation that keeps future changes cheap.",
      ],
    },
    nonScope: {
      title: "Non-scope",
      items: [
        "No inflated complexity or unnecessary tooling.",
        "No fragile client-side state for simple pages.",
        "No shortcuts that compromise maintainability.",
      ],
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
    portfolioBuiltWith: {
        title: "This portfolio is built with…",
        body:
          "A server-first, SEO-first Next.js app with versioned content and a predictable structure. It’s designed to stay fast, easy to update, and easy to maintain over time.",
        linkLabel: "See how this site is built",
      },
  },
  it: {
    hero: {
      eyebrow: "Backend Engineer — Sistemi event-driven",
      title: "Costruisco backend affidabili per prodotti B2B.",
      subtitle:
        "Eventi esterni, webhook, idempotenza e stati osservabili—progettati per restarecorretti in condizioni reali.",
      primaryCta: { label: "Vedi progetti", href: "/projects" },
      secondaryCta: { label: "Contattami", href: "/contact" },
    },
    problem: {
      title: "Problema",
      body:
        "Molti portfolio mostrano solo l'output. Io metto al centro decisioni, trade-off ed esecuzione pulita che scala.",
    },
    flagship: {
      title: "Approccio flagship",
      body:
        "Ogni progetto e trattato come un flagship: obiettivi chiari, scope rigoroso e risultati misurabili.",
    },
    guarantees: {
      title: "Garanzie",
      items: [
        "Decisioni architetturali esplicite e trade-off chiari.",
        "Performance, SEO e accessibilita come baseline.",
        "Documentazione che rende i cambiamenti futuri economici.",
      ],
    },
    nonScope: {
      title: "Fuori scope",
      items: [
        "Nessuna complessita gonfiata o tooling superfluo.",
        "Nessuno stato client fragile per pagine semplici.",
        "Nessuna scorciatoia che comprometta la mantenibilita.",
      ],
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
    portfolioBuiltWith: {
      title: "Questo portfolio è costruito con…",
      body:
        "Un’app Next.js server-first e SEO-first, con contenuti versionati e una struttura prevedibile. È pensata per restare veloce, facile da aggiornare e semplice da mantenere nel tempo.",
      linkLabel: "Vedi come è costruito questo sito",
    },
  },
};
