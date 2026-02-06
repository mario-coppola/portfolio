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
  sectionContent: {
    whatItIs: string;
    whyThisIsHard: string;
    safetyDesign: {
      line1: string;
      line2: string;
      line3: string;
      line4: string;
    };
    tradeOffs: string;
    eventFlow: {
      title: string;
      ingest: {
        title: string;
        content: string;
      };
      ledgerJob: {
        title: string;
        content: string;
      };
      worker: {
        title: string;
        content: string;
      };
      effect: {
        title: string;
        content: string;
      };
    };
    mentalModel: {
      title: string;
      line1: string;
      line2: string;
      line3: string;
    };
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
    sectionContent: {
      whatItIs: "This project is a minimal event processing system designed for safe operation under failure. It treats incoming events as untrusted input, persists every event immutably before processing, executes work asynchronously, and makes all failures explicit and operable—including audited manual intervention.",
      whyThisIsHard: "External providers—billing systems, payment gateways, third-party integrations—don’t behave like perfect APIs. They retry aggressively, send duplicate events, and occasionally deliver malformed payloads. For B2B backends, these behaviors create real financial risk: duplicate charges, inconsistent state, silent data loss.",
      safetyDesign: {
        line1: "Events are accepted asynchronously; ingestion performs no side effects.",
        line2: "Every accepted event is persisted immutably before processing begins.",
        line3: "Each event produces at most one effective side effect (idempotent processing).",
        line4: "Failed jobs can be retried only via explicit, audited human intervention.",
      },
      tradeOffs: "The system is designed to bedeliberately small, understandable, and safe. More features can be added later when operational needs justify the complexity.",
      whatYouGet: "Predictable behavior when things go wrong, with enough visibility for operators to understand and control the system.",
      eventFlow: {
        title: "Event flow",
        ingest: {
          title: "Ingest",
          content: "External systems send events to the API. The API validates input and acknowledges receipt immediately.em accepts events asynchronously, without performing any side effects. Each event is persisted immutably before processing begins."
        },
        ledgerJob: {
          title: "Ledger + Job",
          content: "Each event is persisted immutably in the event ledger. A corresponding job is created to represent the work."
        },
        worker: {
          title: "Worker",
          content: "A background worker picks up jobs asynchronously. The worker executes the business effect in a controlled, retry-safe way."
        },
        effect: {
          title: "Effect + Admin Loop",
          content: "The effect is applied exactly once, or the job transitions to failed. Operators can inspect failures and manually requeue jobs with full audit visibility."
        },
      },
        mentalModel: {
          title: "Mental model",
          line1: "Ingest never performs side effects.",
          line2: "Workers never accept untracked input.",
          line3: "Operators intervene only when something went wrong.",
        }
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
    sectionContent: {
      whatItIs: "Questo progetto è un sistema minimale di event processing progettato per operare in sicurezza in presenza di failure. Tratta ogni evento in ingresso come input non affidabile, persiste ogni evento in modo immutabile prima del processing, esegue il lavoro in modo asincrono, e rende tutti i fallimenti espliciti e operabili—incluso l’intervento umano auditato.",
      whyThisIsHard: "I sistemi esterni—billing, payment gateway, integrazioni di terze parti—non si comportano come API ideali. Ritentano in modo aggressivo, inviano eventi duplicati, e talvolta producono payload malformati o incompleti. In un backend B2B questo si traduce in rischio finanziario reale: addebiti duplicati, stati inconsistenti, corruzione silenziosa dei dati.",
      safetyDesign: {
        line1: "Gli eventi vengono accettati in modo asincrono; l’ingestione non produce effetti diretti.",
        line2: "Ogni evento accettato viene persistito in modo immutabile prima di qualsiasi processing.",
        line3: "Ogni evento produce al massimo un solo effetto applicativo (idempotenza).",
        line4: "I job falliti possono essere ritentati solo tramite intervento umano esplicito e auditato.",
      },
      tradeOffs: "Il sistema è costruito per essere volutamente snello, comprensibile e sicuro. Altre funzionalità potranno essere introdotte in seguito, quando le esigenze operative reali giustificheranno l'aumento di complessità.",
      whatYouGet: "Comportamento prevedibile quando le cose vanno male, con visibilità sufficiente per permettere agli operatori di capire e controllare il sistema.",
      eventFlow: {
        title: "Flusso eventi",
        ingest: {
          title: "Ingest",
          content: "I sistemi esterni inviano eventi all’API. L’API valida l’input e risponde immediatamente."
        },
        ledgerJob: {
          title: "Ledger + Job",
          content: "Ogni evento viene persistito in modo immutabile nell’event ledger. Viene creato un job che rappresenta il lavoro da eseguire."
        },
        worker: {
          title: "Worker",
          content: "Un worker in background processa i job in modo asincrono. Il worker applica l’effetto in modo controllato e idempotente."
        },
        effect: {
          title: "Effect + Admin Loop",
          content: "L’effetto viene applicato una sola volta oppure il job fallisce. Gli operatori possono ispezionare i fallimenti e fare requeue manuale con audit completo."
        },
      },
        mentalModel: {
          title: "Modello mentale",
          line1: "L’ingest non produce effetti.",
          line2: "I worker non processano input non tracciato.",
          line3: "Gli operatori intervengono solo quando qualcosa va storto.",
        }
    },
    cta: {
      title: "Webhook o eventi esterni in produzione?",
      body:
        "Se hai bisogno di webhook o eventi esterni che restino corretti con retry, duplicati e consegna fuori ordine, posso aiutarti.",
      linkLabel: "Contattami",
    },
  },
};
