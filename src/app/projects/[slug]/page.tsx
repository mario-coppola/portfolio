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
import { getSiteUrl } from "@/lib/siteUrl";
import { buildAlternates, buildSocialMeta } from "@/lib/seo";
import { buildCaseStudyJsonLd } from "@/lib/jsonLd";
import { reliableEventingFailureSnippets } from "@/content/caseStudySnippets";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<SearchParams> | SearchParams;
}): Promise<Metadata> {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const lang = getLangFromSearchParams(resolvedSearchParams);
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return { title: "Project not found" };

  const title = project.title;
  const description = project.summary;
  const canonicalUrl = `${getSiteUrl()}/projects/${slug}`;

  return {
    title,
    description,
    alternates: buildAlternates(canonicalUrl),
    ...buildSocialMeta({
      title,
      description,
      canonicalPath: `/projects/${slug}`,
      ogImagePath: `/projects/${slug}/opengraph-image`,
      lang,
    }),
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
  const canonicalUrl = `${siteUrl}/projects/${slug}`;
  const sameAsLinks = project.links?.map((link) => link.href) ?? [];
  const pageJsonLd = buildCaseStudyJsonLd({
    siteUrl,
    lang,
    canonicalUrl,
    title: projectMeta.title,
    description: projectMeta.summary,
    stack: project.stack,
    year: project.year,
    links: sameAsLinks,
  });

  return (
    <Container className="space-y-8 py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <section className="space-y-4 mb-20">
        <div className="flex flex-wrap items-center gap-3">
          <TextLink href="/projects">{ui.backToProjects}</TextLink>
          {project.year ? <Badge>{project.year}</Badge> : null}
          <Badge>{projectMeta.role}</Badge>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">{projectMeta.title}</h1>
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
      </section>

      <div className="space-y-10">
        <section className="space-y-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--foreground)]">
            {ui.sectionTitles.whatIBuild}
          </h2>
          <p className="text-[var(--muted)]">{ui.sectionContent.whatIBuild}</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--foreground)]">
            {ui.sectionTitles.context}
          </h2>
          <p className="text-[var(--muted)]">{ui.sectionContent.context}</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--foreground)]">
            {ui.sectionTitles.failureModes}
          </h2>
          <p className="text-[var(--muted)]">{ui.sectionContent.failureModes}</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--foreground)]">
            {ui.sectionTitles.whatYouGet}
          </h2>
          <p className="text-[var(--muted)]">{ui.sectionContent.whatYouGet}</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--foreground)]">
            {ui.sectionTitles.keyGuarantees}
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="space-y-2 p-4">
              <h3 className="text-sm font-semibold text-[var(--foreground)]">
                {ui.sectionContent.keyGuarantees.g1.title}
              </h3>
              <p className="text-sm text-[var(--muted)]">
                {ui.sectionContent.keyGuarantees.g1.body}
              </p>
              <p className="text-xs text-[var(--muted-foreground)]">
                {ui.sectionContent.keyGuarantees.g1.how}
              </p>
            </Card>
            <Card className="space-y-2 p-4">
              <h3 className="text-sm font-semibold text-[var(--foreground)]">
                {ui.sectionContent.keyGuarantees.g2.title}
              </h3>
              <p className="text-sm text-[var(--muted)]">
                {ui.sectionContent.keyGuarantees.g2.body}
              </p>
              <p className="text-xs text-[var(--muted-foreground)]">
                {ui.sectionContent.keyGuarantees.g2.how}
              </p>
            </Card>
            <Card className="space-y-2 p-4">
              <h3 className="text-sm font-semibold text-[var(--foreground)]">
                {ui.sectionContent.keyGuarantees.g3.title}
              </h3>
              <p className="text-sm text-[var(--muted)]">
                {ui.sectionContent.keyGuarantees.g3.body}
              </p>
              <p className="text-xs text-[var(--muted-foreground)]">
                {ui.sectionContent.keyGuarantees.g3.how}
              </p>
            </Card>
          </div>
          <div className="pt-1">
            <TextLink
              href="#architecture"
              className="inline-flex w-fit text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              {ui.labels.skipToArchitecture}
            </TextLink>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--foreground)]">
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
                scenarioCodeBlocks={[
                  { code: reliableEventingFailureSnippets.scenario1.scenario, language: "bash" },
                ]}
                outcomeCodeBlocks={[
                  { code: reliableEventingFailureSnippets.scenario1.outcome, language: "json" },
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
                scenarioCodeBlocks={[
                  { code: reliableEventingFailureSnippets.scenario2.scenario, language: "bash" },
                ]}
                systemBehaviorCodeBlocks={[
                  { code: reliableEventingFailureSnippets.scenario2.systemBehavior, language: "json" },
                ]}
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
                scenarioCodeBlocks={[
                  { code: reliableEventingFailureSnippets.scenario3.scenario, language: "bash" },
                ]}
                systemBehaviorCodeBlocks={[
                  { code: reliableEventingFailureSnippets.scenario3.systemBehavior, language: "json" },
                  ...(reliableEventingFailureSnippets.scenario3.requeueCommand
                    ? [{ code: reliableEventingFailureSnippets.scenario3.requeueCommand, language: "bash" as const }]
                    : []),
                  ...(reliableEventingFailureSnippets.scenario3.requeueResponse
                    ? [{ code: reliableEventingFailureSnippets.scenario3.requeueResponse, language: "json" as const }]
                    : []),
                ]}
                outcomeCodeBlocks={[
                  { code: reliableEventingFailureSnippets.scenario3.outcome, language: "json" },
                ]}
              />
            </Card>
          </div>
        </section>

        <section id="architecture" className="scroll-mt-6 space-y-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--foreground)]">
            {ui.sectionTitles.deepDive}
          </h2>

          <div className="space-y-4">
            <h3 className="text-base font-semibold text-[var(--foreground)]">
              {ui.sectionTitles.eventFlow}
            </h3>
            <div className="space-y-3">
              <div className="rounded-md border-2 border-[var(--border)] bg-[var(--card)] p-4 text-center">
                <h4 className="text-sm font-semibold text-[var(--foreground)]">
                  {ui.sectionContent.eventFlow.ingest.title}
                </h4>
                <p className="text-sm text-[var(--muted)]">
                  {ui.sectionContent.eventFlow.ingest.content}
                </p>
              </div>
              <div className="text-center text-sm text-[var(--muted)]">↓</div>
              <div className="rounded-md border-2 border-[var(--border)] bg-[var(--card)] p-4 text-center">
                <h4 className="text-sm font-semibold text-[var(--foreground)]">
                  {ui.sectionContent.eventFlow.ledgerJob.title}
                </h4>
                <p className="text-sm text-[var(--muted)]">
                  {ui.sectionContent.eventFlow.ledgerJob.content}
                </p>
              </div>
              <div className="text-center text-sm text-[var(--muted)]">↓</div>
              <div className="rounded-md border-2 border-[var(--border)] bg-[var(--card)] p-4 text-center">
                <h4 className="text-sm font-semibold text-[var(--foreground)]">
                  {ui.sectionContent.eventFlow.worker.title}
                </h4>
                <p className="text-sm text-[var(--muted)]">
                  {ui.sectionContent.eventFlow.worker.content}
                </p>
              </div>
              <div className="text-center text-sm text-[var(--muted)]">↓</div>
              <div className="rounded-md border-2 border-[var(--border)] bg-[var(--card)] p-4 text-center">
                <h4 className="text-sm font-semibold text-[var(--foreground)]">
                  {ui.sectionContent.eventFlow.effect.title}
                </h4>
                <p className="text-sm text-[var(--muted)]">
                  {ui.sectionContent.eventFlow.effect.content}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-semibold text-[var(--foreground)]">
              {ui.sectionTitles.jobStates}
            </h3>
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
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-[var(--foreground)]">
              {ui.sectionTitles.tradeOffs}
            </h3>
            <p className="text-[var(--muted)]">{ui.sectionContent.tradeOffs}</p>
          </div>
        </section>
      </div>

      
        <section className="space-y-2 text-center bg-gradient-to-b from-gray-900 to-transparent p-10 rounded-md border-2 border-[var(--border)]">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--foreground)]">
            {ui.cta.title}
          </h2>
          <p className="text-[var(--muted)] mb-8">
            {ui.cta.body}
          </p>
          <ButtonLink href={"/contact"} variant="primary">
            {ui.cta.linkLabel}
          </ButtonLink>
        </section>
    </Container>
  );
}