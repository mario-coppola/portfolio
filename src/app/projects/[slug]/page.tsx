import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudyContent } from "@/content/caseStudy";
import { getLangFromSearchParams, t, type SearchParams } from "@/content/i18n";
import { getProjectBySlug } from "@/content/projects";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { CaseStudyScenario } from "@/components/blocks/CaseStudyScenario";
import { absoluteUrl, getSiteUrl } from "@/lib/siteUrl";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<SearchParams> | SearchParams;
}): Promise<Metadata> {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const lang = getLangFromSearchParams(resolvedSearchParams);
  const ui = t(caseStudyContent, lang);
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return { title: "Project not found" };

  const projectMeta =
    project.slug === "reliable-eventing-saas"
      ? ui.projectMeta
      : { title: project.title, summary: project.summary, role: project.role };
  const title = projectMeta.title;
  const description = projectMeta.summary;
  const canonicalUrl = `${getSiteUrl()}/projects/${slug}`;
  const ogImageUrl = absoluteUrl(`/projects/${slug}/opengraph-image`);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": `${canonicalUrl}?lang=en`,
        "it-IT": `${canonicalUrl}?lang=it`,
      },
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/projects/${slug}`),
      type: "article",
      locale: lang === "it" ? "it_IT" : "en_US",
      images: [ogImageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function ProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<SearchParams> | SearchParams;
}) {
  const { slug } = await params;
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const lang = getLangFromSearchParams(resolvedSearchParams);
  const ui = t(caseStudyContent, lang);
  const project = getProjectBySlug(slug);
  if (!project) return notFound();
  const projectMeta =
    project.slug === "reliable-eventing-saas"
      ? ui.projectMeta
      : { title: project.title, summary: project.summary, role: project.role };
  const siteUrl = getSiteUrl();
  const personId = `${siteUrl}/#person`;
  const websiteId = `${siteUrl}/#website`;
  const inLanguage = lang === "it" ? "it-IT" : "en-US";
  const canonicalUrl = `${siteUrl}/projects/${slug}`;
  const sameAsLinks = project.links?.map((link) => link.href) ?? [];
  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: projectMeta.title,
    description: projectMeta.summary,
    url: canonicalUrl,
    author: { "@id": personId },
    keywords: project.stack,
    sameAs: sameAsLinks,
    ...(project.year ? { dateCreated: `${project.year}-01-01` } : {}),
  };
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: projectMeta.title,
    description: projectMeta.summary,
    url: canonicalUrl,
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
    inLanguage,
  };
  const pageJsonLd = [creativeWorkJsonLd, webPageJsonLd];

  return (
    <Container className="space-y-8 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <TextLink href="/projects">{ui.backToProjects}</TextLink>
          {project.year ? <Badge>{project.year}</Badge> : null}
          <Badge>{projectMeta.role}</Badge>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight">{projectMeta.title}</h1>
        <p className="max-w-2xl text-[var(--muted)]">{projectMeta.summary}</p>

        <div className="flex flex-wrap gap-2">
          {project.stack.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>

        {project.links?.length ? (
          <div className="flex flex-wrap gap-3 pt-2">
            {project.links.map((l) => (
              <ButtonLink key={l.href} href={l.href} external variant="secondary" size="sm">
                {l.label}
              </ButtonLink>
            ))}
          </div>
        ) : null}
      </header>

      <div className="space-y-10">
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            {ui.sectionTitles.whatItIs}
          </h2>
          <p className="text-[var(--muted)]">{ui.sectionContent.whatItIs}</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            {ui.sectionTitles.whyThisIsHard}
          </h2>
          <p className="text-[var(--muted)]">{ui.sectionContent.whyThisIsHard}</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            {ui.sectionTitles.safetyDesign}
          </h2>
          <ol className="list-decimal space-y-1 pl-5 text-[var(--muted)]">
            <li>{ui.sectionContent.safetyDesign.line1}</li>
            <li>{ui.sectionContent.safetyDesign.line2}</li>
            <li>{ui.sectionContent.safetyDesign.line3}</li>
            <li>{ui.sectionContent.safetyDesign.line4}</li>
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            {ui.sectionTitles.eventFlow}
          </h2>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="rounded-md border-2 border-[var(--border)] bg-[var(--card)] p-4 text-center">
                <h3 className="text-sm font-semibold text-[var(--foreground)]">
                  {ui.sectionContent.eventFlow.ingest.title}
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  {ui.sectionContent.eventFlow.ingest.content}
                </p>
              </div>
              <div className="text-center text-sm text-[var(--muted)]">↓</div>
              <div className="rounded-md border-2 border-[var(--border)] bg-[var(--card)] p-4 text-center">
                <h3 className="text-sm font-semibold text-[var(--foreground)]">
                  {ui.sectionContent.eventFlow.ledgerJob.title}
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  {ui.sectionContent.eventFlow.ledgerJob.content}
                </p>
              </div>
              <div className="text-center text-sm text-[var(--muted)]">↓</div>
              <div className="rounded-md border-2 border-[var(--border)] bg-[var(--card)] p-4 text-center">
                <h3 className="text-sm font-semibold text-[var(--foreground)]">
                  {ui.sectionContent.eventFlow.worker.title}
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  {ui.sectionContent.eventFlow.worker.content}
                </p>
              </div>
              <div className="text-center text-sm text-[var(--muted)]">↓</div>
              <div className="rounded-md border-2 border-[var(--border)] bg-[var(--card)] p-4 text-center">
                <h3 className="text-sm font-semibold text-[var(--foreground)]">
                  {ui.sectionContent.eventFlow.effect.title}
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  {ui.sectionContent.eventFlow.effect.content}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-[var(--foreground)]">
                {ui.sectionContent.eventFlow.mentalModel.title}
              </h3>
              <ul className="list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
                <li>{ui.sectionContent.eventFlow.mentalModel.line1}</li>
                <li>{ui.sectionContent.eventFlow.mentalModel.line2}</li>
                <li>{ui.sectionContent.eventFlow.mentalModel.line3}</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            {ui.sectionTitles.jobStates}
          </h2>
          <div className="space-y-3">
            <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] md:gap-6">
              <div className="text-sm font-semibold text-[var(--foreground)]">
                {ui.sectionContent.jobStates.queued.title}
              </div>
              <div className="text-sm text-[var(--muted)] md:border-l md:border-[var(--border)] md:pl-6">
                {ui.sectionContent.jobStates.queued.description}
              </div>
            </div>
            <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] md:gap-6">
              <div className="text-sm font-semibold text-[var(--foreground)]">
                {ui.sectionContent.jobStates.inProgress.title}
              </div>
              <div className="text-sm text-[var(--muted)] md:border-l md:border-[var(--border)] md:pl-6">
                {ui.sectionContent.jobStates.inProgress.description}
              </div>
            </div>
            <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] md:gap-6">
              <div className="text-sm font-semibold text-[var(--foreground)]">
                {ui.sectionContent.jobStates.done.title}
              </div>
              <div className="text-sm text-[var(--muted)] md:border-l md:border-[var(--border)] md:pl-6">
                {ui.sectionContent.jobStates.done.description}
              </div>
            </div>
            <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] md:gap-6">
              <div className="text-sm font-semibold text-[var(--foreground)]">
                {ui.sectionContent.jobStates.failed.title}
              </div>
              <div className="text-sm text-[var(--muted)] md:border-l md:border-[var(--border)] md:pl-6">
                {ui.sectionContent.jobStates.failed.description}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            {ui.sectionTitles.failureStories}
          </h2>
          <div className="space-y-6">
            <Card className="space-y-6">
              <CaseStudyScenario
                title={ui.sectionContent.failureStories.scenario1.title}
                scenario={ui.sectionContent.failureStories.scenario1.scenario}
                systemBehavior={ui.sectionContent.failureStories.scenario1.systemBehavior}
                outcome={ui.sectionContent.failureStories.scenario1.outcome}
                labels={
                  ui.labels ?? {
                    scenario: "Scenario",
                    systemBehavior: "System behavior",
                    outcome: "Outcome",
                  }
                }
                scenarioImages={[
                  {
                    src: "/case-studies/reliable-event-processing/s1-01-ingest-duplicate.png",
                    alt: "Terminal output showing duplicate ingest requests returning accepted responses.",
                  },
                ]}
                systemBehaviorImages={[
                  {
                    src: "/case-studies/reliable-event-processing/s1-02-two-jobs-same-event.png",
                    alt: "Job list showing two jobs created for the same event id.",
                  },
                ]}
                outcomeImages={[
                  {
                    src: "/case-studies/reliable-event-processing/s1-03-one-effect.png",
                    alt: "Ledger view indicating a single effect applied after deduplication.",
                  },
                ]}
              />
            </Card>
            <Card className="space-y-6">
              <CaseStudyScenario
                title={ui.sectionContent.failureStories.scenario2.title}
                scenario={ui.sectionContent.failureStories.scenario2.scenario}
                systemBehavior={ui.sectionContent.failureStories.scenario2.systemBehavior}
                outcome={ui.sectionContent.failureStories.scenario2.outcome}
                labels={
                  ui.labels ?? {
                    scenario: "Scenario",
                    systemBehavior: "System behavior",
                    outcome: "Outcome",
                  }
                }
                scenarioImages={[
                  {
                    src: "/case-studies/reliable-event-processing/s2-01-event-malformed-job-queued.png",
                    alt: "Malformed event payload queued with missing required fields.",
                  },
                ]}
                systemBehaviorImages={[
                  {
                    src: "/case-studies/reliable-event-processing/s2-02-job-failed.png",
                    alt: "Failed job entry with a recorded error reason.",
                  },
                ]}
                outcomeImages={[]}
              />
            </Card>
            <Card className="space-y-6">
              <CaseStudyScenario
                title={ui.sectionContent.failureStories.scenario3.title}
                scenario={ui.sectionContent.failureStories.scenario3.scenario}
                systemBehavior={ui.sectionContent.failureStories.scenario3.systemBehavior}
                outcome={ui.sectionContent.failureStories.scenario3.outcome}
                labels={
                  ui.labels ?? {
                    scenario: "Scenario",
                    systemBehavior: "System behavior",
                    outcome: "Outcome",
                  }
                }
                scenarioImages={[
                  {
                    src: "/case-studies/reliable-event-processing/s3-01-job-failed.png",
                    alt: "Failed job awaiting operator review before requeue.",
                  },
                ]}
                systemBehaviorImages={[
                  {
                    src: "/case-studies/reliable-event-processing/s3-02-manual-requeue.png",
                    alt: "Operator action showing manual requeue of a failed job.",
                  },
                  {
                    src: "/case-studies/reliable-event-processing/s3-03-intervention-audit.png",
                    alt: "Audit record showing intervention actor and reason.",
                  },
                ]}
                outcomeImages={[
                  {
                    src: "/case-studies/reliable-event-processing/s3-04-job-failed-again.png",
                    alt: "Job failed again after manual requeue attempt.",
                  },
                ]}
              />
            </Card>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            {ui.sectionTitles.tradeOffs}
          </h2>
          <p className="text-[var(--muted)]">{ui.sectionContent.tradeOffs}</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            {ui.sectionTitles.whatYouGet}
          </h2>
          <p className="text-[var(--muted)]">{ui.sectionContent.whatYouGet}</p>
        </section>
      </div>

      <Card>
        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            {ui.cta.title}
          </h2>
          <p className="text-[var(--muted)]">
            {ui.cta.body}
          </p>
          <ButtonLink href={"/contact"} variant="primary">
            {ui.cta.linkLabel}
          </ButtonLink>
        </section>
      </Card>
    </Container>
  );
}