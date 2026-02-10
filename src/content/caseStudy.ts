import type { Lang } from "@/content/i18n";

export type CaseStudyContent = {
  backToProjects: string;
  projectMeta: {
    title: string;
    summary: string;
    role: string;
  };
  sectionTitles: {
    whatItIs: string;
    whyThisIsHard: string;
    safetyDesign: string;
    tradeOffs: string;
    whatYouGet: string;
    jobStates: string;
    eventFlow: string;
    failureStories: string;
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
      mentalModel: {
        title: string;
        line1: string;
        line2: string;
        line3: string;
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
        "Backend system for business-critical external events: reliable webhooks, idempotency, controlled retries, and observable state transitions.",
      role: "Architecture + Backend Engineering",
    },
    sectionTitles: {
      whatItIs: "The problem",
      whyThisIsHard: "Failure modes",
      safetyDesign: "Safety invariants",
      tradeOffs: "Trade-offs",
      whatYouGet: "What you get",
      eventFlow: "How it runs",
      jobStates: "Job state machine",
      failureStories: "Failure stories",
    },
    sectionContent: {
      whatItIs: "External events (webhooks, payments, integrations) are untrusted input. If you process them naïvely, duplicates and retries turn into inconsistent state and real financial risk.",
      whyThisIsHard: "Providers retry aggressively, payloads can be malformed, and delivery order is not guaranteed. The system must stay correct even when the input is noisy and adversarial.",
      safetyDesign: {
        line1: "Ingest acknowledges fast and performs no side effects.",
        line2: "Every accepted event is persisted before any processing.",
        line3: "Effects are idempotent: one event → at most one effective change.",
        line4: "Retries are explicit and audited (operator-controlled).",
      },
      tradeOffs: "This is intentionally minimal: no automated retry storms, no complex scheduling, no “magic” recovery. Those features are added only when the operational need justifies the complexity—without weakening correctness or auditability.",
      whatYouGet: "Predictable behavior under retries, duplicates, and bad input—plus the visibility to debug and operate it. When something fails, you can see why, decide what to do, and keep the system consistent.",
      eventFlow: {
        ingest: {
          title: "Ingest",
          content: "Validate and store the event; return 202 immediately."
        },
        ledgerJob: {
          title: "Ledger + Job",
          content: "Append to the ledger and create a job representing the work."
        },
        worker: {
          title: "Worker",
          content: "Workers execute jobs asynchronously with idempotency guarantees."
        },
        effect: {
          title: "Effect + Admin Loop",
          content: "Apply the effect once, or mark the job failed for operator action."
        },
        mentalModel: {
          title: "Mental model",
          line1: "Ingest never mutates state.",
          line2: "Workers only run tracked jobs.",
          line3: "Humans intervene only on failure.",
        }
      },
      jobStates: {
        queued: {
          title: "queued",
          description: "Persisted and waiting for a worker to pick it up.",
        },
        inProgress: {
          title: "in_progress",
          description: "Currently executing; owned by a worker.",
        },
        done: {
          title: "done",
          description: "Effect applied; will not run again.",
        },
        failed: {
          title: "failed",
          description: "Blocked by a permanent error; needs operator decision.",
        },
      },
      failureStories: {
        scenario1: {
        title: "Duplicate Event",
        scenario: "The provider retries the same event multiple times.",
        systemBehavior: "Idempotency keys deduplicate the event so only one effect is applied.",
        outcome: "State changes once; duplicates remain visible in the ledger.",
        },
        scenario2: {
        title: "Malformed Payload",
        scenario: "A webhook arrives with missing required fields.",
        systemBehavior: "Processing fails deterministically and the failure reason is persisted.",
        outcome: "No partial effects; the job is operable in failed state.",
        },
        scenario3: {
        title: "Manual Requeue",
        scenario: "An operator requeues a failed job after investigation.",
        systemBehavior: "Requeue creates an audit record (actor + reason) and re-enters the job.",
        outcome: "Manual intervention is traceable and the system stays explainable.",
        },
      },
    },
    labels: {
      scenario: "Scenario",
      systemBehavior: "System behavior",
      outcome: "Outcome",
      openFullSize: "Open full size",
    },
    cta: {
      title: "Need reliable webhook processing in production?",
      body:
        "If your product depends on external events and you want correctness under retries, duplicates, and out-of-order delivery, I can help you build it.",
      linkLabel: "Get in touch",
    },
  },
  it: {
    backToProjects: "← Torna ai progetti",
    projectMeta: {
      title: "Event Processing Affidabile (B2B SaaS)",
      summary:
        "Sistema backend per eventi esterni business-critical: webhook affidabili, idempotenza, retry controllati e transizioni di stato osservabili.",
      role: "Architettura + Backend Engineering",
    },
    sectionTitles: {
      whatItIs: "Il problema",
      whyThisIsHard: "Failure modes",
      safetyDesign: "Invarianti di sicurezza",
      tradeOffs: "Compromessi",
      whatYouGet: "Cosa ottieni",
      jobStates: "State machine dei job",
      eventFlow: "Come gira",
      failureStories: "Casi di guasto",
    },
    sectionContent: {
      whatItIs: "Gli eventi esterni (webhook, pagamenti, integrazioni) sono input non affidabili. Se li processi “alla buona”, retry e duplicati diventano stato incoerente e rischio finanziario reale.",
      whyThisIsHard: "I provider ritentano in modo aggressivo, i payload possono essere malformati e l’ordine di consegna non è garantito. Il sistema deve restare corretto anche quando l’input è rumoroso.",
      safetyDesign: {
        line1: "L’ingest risponde subito e non produce side effect.",
        line2: "Ogni evento accettato viene persistito prima del processing.",
        line3: "Gli effetti sono idempotenti: un evento → al massimo un solo cambiamento.",
        line4: "I retry sono espliciti e auditati (controllo operativo).",
      },
      tradeOffs: "È volutamente minimale: niente “auto-retry” aggressivo, niente scheduling complesso, niente recupero magico. Le feature si aggiungono solo quando servono davvero, senza indebolire correttezza e audit.",
      whatYouGet: "Comportamento prevedibile con retry, duplicati e input sporco—più la visibilità per operarlo. Se qualcosa fallisce, vedi perché, decidi cosa fare, e mantieni lo stato coerente.",
      eventFlow: {
        ingest: {
          title: "Ingest",
          content: "Valida e persiste l’evento; ritorna 202 immediatamente."
        },
        ledgerJob: {
          title: "Ledger + Job",
          content: "Appende al ledger e crea un job che rappresenta il lavoro."
        },
        worker: {
          title: "Worker",
          content: "I worker eseguono job in async con garanzie di idempotenza."
        },
        effect: {
          title: "Effect + Admin Loop",
          content: "Applica l’effetto una sola volta, o porta il job in failed per azione operativa."
        },
        mentalModel: {
          title: "Modello mentale",
          line1: "L’ingest non muta lo stato.",
          line2: "I worker eseguono solo job tracciati.",
          line3: "L’umano interviene solo su failure.",
        }
      },
      jobStates: {
        queued: {
          title: "queued",
          description: "Persistito e in attesa di un worker.",
        },
        inProgress: {
          title: "in_progress",
          description: "In esecuzione; in carico a un worker.",
        },
        done: {
          title: "done",
          description: "Effetto applicato; non verrà ripetuto.",
        },
        failed: {
          title: "failed",
          description: "Errore permanente; richiede decisione operativa.",
        },
      },
      failureStories: {
        scenario1: {
        title: "Evento duplicato",
        scenario: "Il provider invia lo stesso evento più volte.",
        systemBehavior: "Le chiavi di idempotenza deduplicano e applicano un solo effetto.",
        outcome: "Lo stato cambia una sola volta; i duplicati restano visibili nel ledger.",
        },
        scenario2: {
        title: "Payload malformato",
        scenario: "Arriva un webhook con campi obbligatori mancanti.",
        systemBehavior: "Il processing fallisce in modo deterministico e salva il motivo del fallimento.",
        outcome: "Nessun effetto parziale; il job è operabile in stato failed.",
        },
        scenario3: {
        title: "Requeue Manuale",
        scenario: "Un operatore rimette in coda un job fallito dopo verifica.",
        systemBehavior: "Il requeue crea un record di audit (actor + reason) e reinserisce il job.",
        outcome: "L’intervento manuale è tracciabile e il sistema resta spiegabile.",
        },
      },
    },
    labels: {
      scenario: "Scenario",
      systemBehavior: "Comportamento del sistema",
      outcome: "Risultato",
      openFullSize: "Apri a dimensione piena",
    },
    cta: {
      title: "Webhook affidabili in produzione?",
      body:
        "Se il tuo prodotto dipende da eventi esterni e vuoi correttezza con retry, duplicati e consegna fuori ordine, posso aiutarti a costruirla.",
      linkLabel: "Contattami",
    },
  },
};
