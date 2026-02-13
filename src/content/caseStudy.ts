import type { Lang } from "@/content/i18n";

export type CaseStudyContent = {
  backToProjects: string;
  projectMeta: {
    title: string;
    summary: string;
    role: string;
  };
  sectionTitles: {
    context: string;
    failureModes: string;
    safetyDesign: string;
    tradeOffs: string;
    whatYouGet: string;
    whatIBuild: string;
    jobStates: string;
    eventFlow: string;
    failureStories: string;
    keyGuarantees: string;
    deepDive: string;
  };
  sectionContent: {
    context: string;
    failureModes: string;
    whatIBuild: string;
    keyGuarantees: {
      g1: { title: string; body: string; how: string };
      g2: { title: string; body: string; how: string };
      g3: { title: string; body: string; how: string };
    };
    safetyDesign: {
      line1: string;
      line2: string;
      line3: string;
      line4: string;
    };
    tradeOffs: string;
    eventFlow: {
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
    jobStates: {
      queued: {
        title: string;
        description: string;
      };
      inProgress: {
        title: string;
        description: string;
      };
      done: {
        title: string;
        description: string;
      };
      failed: {
        title: string;
        description: string;
      };
    };
    failureStories: {
      scenario1: {
        title: string;
        scenario: string;
        systemBehavior: string;
        outcome: string;
      };
      scenario2: {
        title: string;
        scenario: string;
        systemBehavior: string;
        outcome: string;
      };
      scenario3: {
        title: string;
        scenario: string;
        systemBehavior: string;
        outcome: string;
      };
    };
    whatYouGet: string;
  };
  labels: {
    scenario: string;
    systemBehavior: string;
    outcome: string;
    openFullSize: string;
    skipToArchitecture: string;
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
    projectMeta: {
      title: "Reliable Event Processing (B2B SaaS)",
      summary:
        "A reliable webhook & integration layer for SaaS: process external events safely, avoid duplicates, and keep operations observable.",
      role: "Architecture + Backend Engineering",
    },
    sectionTitles: {
      context: "Context",
      failureModes: "Failure modes",
      safetyDesign: "Core guarantees",
      tradeOffs: "Trade-offs",
      whatYouGet: "What you get",
      whatIBuild: "What it is",
      eventFlow: "Event flow",
      jobStates: "Job states",
      failureStories: "Failure stories",
      keyGuarantees: "Key guarantees",
      deepDive: "Architecture details",
    },
    sectionContent: {
      context: "External events (webhooks, payments, integrations) are unreliable input. Processing them directly turns retries and duplicates into inconsistent state and financial risk.",
      failureModes: "Providers retry aggressively, payloads arrive malformed, delivery order is not guaranteed. The system must remain correct even with noisy input.",
      whatIBuild:
        "A small, production-ready service that receives webhooks, persists events, processes them asynchronously, and applies effects exactly once — even when providers retry, duplicate, or send bad payloads.",
      keyGuarantees: {
        g1: {
          title: "No duplicate effects",
          body: "Retries and duplicate webhooks won't double-charge or double-activate.",
          how: "Idempotency keys + effects ledger.",
        },
        g2: {
          title: "Safe failures, no partial state",
          body: "Malformed events fail safely and the reason is recorded.",
          how: "Deterministic validation + persisted failure reason.",
        },
        g3: {
          title: "Operational control",
          body: "Retries are deliberate and auditable — humans stay in control.",
          how: "Manual requeue with actor/reason/timestamp.",
        },
      },
      safetyDesign: {
        line1: "Ingest responds immediately and produces no side effects.",
        line2: "Each accepted event is persisted before processing.",
        line3: "Effects are idempotent: one event produces at most one change.",
        line4: "Retries are explicit and audited (full operational control).",
      },
      tradeOffs: "Intentionally minimal system: no aggressive automatic retries, no complex scheduling, no automatic recovery. Features are added only when necessary, without compromising correctness and auditability.",
      whatYouGet: "Predictable behavior with retries, duplicates, and malformed input. Full visibility to operate the system. When something fails: see the reason, decide the action, maintain consistent state.",
      eventFlow: {
        ingest: {
          title: "Ingest",
          content: "Validates and persists the event. Responds 202 immediately."
        },
        ledgerJob: {
          title: "Ledger + Job",
          content: "Append the event to the immutable ledger and creates a job."
        },
        worker: {
          title: "Worker",
          content: "Processes jobs asynchronously with idempotency guarantees."
        },
        effect: {
          title: "Effect + Admin Loop",
          content: "Applies the effect once or moves the job to failed for auditable manual intervention."
        },
      },
      jobStates: {
        queued: {
          title: "queued",
          description: "Persisted, waiting to be processed.",
        },
        inProgress: {
          title: "in_progress",
          description: "Executing on a worker.",
        },
        done: {
          title: "done",
          description: "Effect applied successfully. Will not be repeated.",
        },
        failed: {
          title: "failed",
          description: "Permanent error. Requires manual operational intervention.",
        },
      },
      failureStories: {
        scenario1: {
        title: "Duplicate Event",
        scenario: "The provider sends the same event multiple times.",
        systemBehavior: "Idempotency keys prevent duplicate processing. Only the first event produces an effect.",
        outcome: "State changes once. Duplicates remain visible in the ledger for audit.",
        },
        scenario2: {
        title: "Malformed Payload",
        scenario: "A webhook arrives with missing required fields.",
        systemBehavior: "Processing fails deterministically. The failure reason is persisted.",
        outcome: "No partial effects. The job is visible in failed state and operable.",
        },
        scenario3: {
        title: "Manual Requeue",
        scenario: "An operator requeues a failed job after investigation.",
        systemBehavior: "The requeue creates an audit record (actor + reason + timestamp) and reinserts the job.",
        outcome: "Manual intervention is fully traceable. The system remains explainable.",
        },
      },
    },
    labels: {
      scenario: "Scenario",
      systemBehavior: "Behavior",
      outcome: "Outcome",
      openFullSize: "Open full size",
      skipToArchitecture: "Skip to architecture details ↓",
    },
    cta: {
      title: "Reliable event processing in production?",
      body:
        "If your product depends on external events and requires operational correctness with retries, duplicates, and out-of-order delivery, I can help you design it.",
      linkLabel: "Get in touch",
    },
  },
  it: {
    backToProjects: "← Torna ai progetti",
    projectMeta: {
      title: "Event Processing Affidabile (B2B SaaS)",
      summary:
        "Un layer affidabile per webhook e integrazioni SaaS: processa eventi esterni in sicurezza, evita duplicazioni e mantiene osservabilità operativa.",
      role: "Architettura + Backend Engineering",
    },
    sectionTitles: {
      context: "Contesto",
      failureModes: "Failure modes",
      safetyDesign: "Garanzie fondamentali",
      tradeOffs: "Scelte progettuali",
      whatYouGet: "Cosa garantisce",
      whatIBuild: "Cos'è",
      jobStates: "Stati del job",
      eventFlow: "Flusso operativo",
      failureStories: "Scenari di failure",
      keyGuarantees: "Garanzie chiave",
      deepDive: "Dettagli di architettura",
    },
    sectionContent: {
      context: "Eventi esterni (webhook, pagamenti, integrazioni) sono input non affidabili. Processarli direttamente trasforma retry e duplicati in stato inconsistente e rischio finanziario.",
      failureModes: "I provider ritentano in modo aggressivo, i payload arrivano malformati, l'ordine di consegna non è garantito. Il sistema deve restare corretto anche con input rumoroso.",
      whatIBuild:
        "Un servizio piccolo ma production-ready che riceve webhook, persiste gli eventi, li processa in asincrono e applica gli effetti una sola volta — anche quando il provider ritenta, duplica o invia payload errati.",
      keyGuarantees: {
        g1: {
          title: "Niente duplicazioni",
          body: "Retry e duplicati non causano doppie attivazioni o doppie operazioni.",
          how: "Chiavi di idempotenza + ledger degli effetti.",
        },
        g2: {
          title: "Fail sicuro, zero stato parziale",
          body: "Eventi malformati falliscono in modo sicuro e il motivo resta registrato.",
          how: "Validazione deterministica + reason persistita.",
        },
        g3: {
          title: "Controllo operativo",
          body: "I retry sono manuali e tracciati: l'operatore resta in controllo.",
          how: "Requeue manuale con actor/reason/timestamp.",
        },
      },
      safetyDesign: {
        line1: "L'ingest risponde immediatamente e non produce side effect.",
        line2: "Ogni evento accettato viene persistito prima del processing.",
        line3: "Gli effetti sono idempotenti: un evento produce al massimo un cambiamento.",
        line4: "I retry sono espliciti e auditati (controllo operativo completo).",
      },
      tradeOffs: "Sistema volutamente minimale: niente retry automatici aggressivi, niente scheduling complesso, niente recupero automatico. Le feature vengono aggiunte solo quando necessarie, senza compromettere correttezza e auditabilità.",
      whatYouGet: "Comportamento prevedibile con retry, duplicati e input malformato. Visibilità completa per operare il sistema. Quando qualcosa fallisce: vedi il motivo, decidi l'azione, mantieni lo stato consistente.",
      eventFlow: {
        ingest: {
          title: "Ingest",
          content: "Valida e persiste l'evento. Risponde 202 immediatamente."
        },
        ledgerJob: {
          title: "Ledger + Job",
          content: "Aggiunge l'evento al ledger immutabile e crea un job."
        },
        worker: {
          title: "Worker",
          content: "Processa job in modo asincrono con garanzie di idempotenza."
        },
        effect: {
          title: "Effect + Admin Loop",
          content: "Applica l'effetto una sola volta oppure porta il job in failed per intervento operativo manuale auditato."
        },
      },
      jobStates: {
        queued: {
          title: "queued",
          description: "Persistito, in attesa di essere processato.",
        },
        inProgress: {
          title: "in_progress",
          description: "In esecuzione su un worker.",
        },
        done: {
          title: "done",
          description: "Effetto applicato con successo. Non verrà ripetuto.",
        },
        failed: {
          title: "failed",
          description: "Errore permanente. Richiede intervento operativo manuale.",
        },
      },
      failureStories: {
        scenario1: {
        title: "Evento duplicato",
        scenario: "Il provider invia lo stesso evento più volte.",
        systemBehavior: "Le chiavi di idempotenza prevengono l'elaborazione duplicata. Solo il primo evento produce effetto.",
        outcome: "Lo stato cambia una sola volta. I duplicati restano visibili nel ledger per audit.",
        },
        scenario2: {
        title: "Payload malformato",
        scenario: "Arriva un webhook con campi obbligatori mancanti.",
        systemBehavior: "Il processing fallisce in modo deterministico. Il motivo del fallimento viene persistito.",
        outcome: "Nessun effetto parziale. Il job è visibile in stato failed e operabile.",
        },
        scenario3: {
        title: "Requeue Manuale",
        scenario: "Un operatore rimette in coda un job fallito dopo verifica.",
        systemBehavior: "Il requeue crea un record di audit (actor + reason + timestamp) e reinserisce il job.",
        outcome: "L'intervento manuale è completamente tracciabile. Il sistema resta spiegabile.",
        },
      },
    },
    labels: {
      scenario: "Scenario",
      systemBehavior: "Comportamento",
      outcome: "Risultato",
      openFullSize: "Apri a dimensione piena",
      skipToArchitecture: "Vai ai dettagli architetturali ↓",
    },
    cta: {
      title: "Event processing affidabile in produzione?",
      body:
        "Se il tuo prodotto dipende da eventi esterni e serve correttezza operativa con retry, duplicati e consegna fuori ordine, posso aiutarti a progettarlo.",
      linkLabel: "Contattami",
    },
  },
};
