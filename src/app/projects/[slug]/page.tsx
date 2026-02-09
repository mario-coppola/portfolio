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
import { Figure } from "@/components/ui/Figure";
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
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return { title: "Project not found" };

  const title = project.title;
  const description = project.summary;
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
  const siteUrl = getSiteUrl();
  const personId = `${siteUrl}/#person`;
  const websiteId = `${siteUrl}/#website`;
  const inLanguage = lang === "it" ? "it-IT" : "en-US";
  const canonicalUrl = `${siteUrl}/projects/${slug}`;
  const sameAsLinks = project.links?.map((link) => link.href) ?? [];
  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: canonicalUrl,
    author: { "@id": personId },
    keywords: project.stack,
    sameAs: sameAsLinks,
    ...(project.year ? { dateCreated: `${project.year}-01-01` } : {}),
  };
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: project.title,
    description: project.summary,
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
          <Badge>{project.role}</Badge>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight">{project.title}</h1>
        <p className="max-w-2xl text-[var(--muted)]">{project.summary}</p>

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
          <div className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <div className="space-y-5">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-[var(--foreground)]">
                  {ui.sectionContent.eventFlow.ingest.title}
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  {ui.sectionContent.eventFlow.ingest.content}
                </p>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-[var(--foreground)]">
                  {ui.sectionContent.eventFlow.ledgerJob.title}
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  {ui.sectionContent.eventFlow.ledgerJob.content}
                </p>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-[var(--foreground)]">
                  {ui.sectionContent.eventFlow.worker.title}
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  {ui.sectionContent.eventFlow.worker.content}
                </p>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-[var(--foreground)]">
                  {ui.sectionContent.eventFlow.effect.title}
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  {ui.sectionContent.eventFlow.effect.content}
                </p>
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
            <Figure
              src="/case-studies/reliable-event-processing/flow-diagram.svg"
              alt="Flow diagram showing ingest, ledger and job creation, worker execution, and effect with admin loop."
              caption="Event flow diagram."
              priority
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            {ui.sectionTitles.jobStates}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="space-y-2">
              <h3 className="text-sm font-semibold text-[var(--foreground)]">
                {ui.sectionContent.jobStates.queued.title}
              </h3>
              <p className="text-sm text-[var(--muted)]">
                {ui.sectionContent.jobStates.queued.description}
              </p>
            </Card>
            <Card className="space-y-2">
              <h3 className="text-sm font-semibold text-[var(--foreground)]">
                {ui.sectionContent.jobStates.inProgress.title}
              </h3>
              <p className="text-sm text-[var(--muted)]">
                {ui.sectionContent.jobStates.inProgress.description}
              </p>
            </Card>
            <Card className="space-y-2">
              <h3 className="text-sm font-semibold text-[var(--foreground)]">
                {ui.sectionContent.jobStates.done.title}
              </h3>
              <p className="text-sm text-[var(--muted)]">
                {ui.sectionContent.jobStates.done.description}
              </p>
            </Card>
            <Card className="space-y-2">
              <h3 className="text-sm font-semibold text-[var(--foreground)]">
                {ui.sectionContent.jobStates.failed.title}
              </h3>
              <p className="text-sm text-[var(--muted)]">
                {ui.sectionContent.jobStates.failed.description}
              </p>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            {ui.sectionTitles.failureStories}
          </h2>
          <div className="space-y-8">
            <CaseStudyScenario
              title={ui.sectionContent.failureStories.scenario1.title}
              scenario={ui.sectionContent.failureStories.scenario1.scenario}
              systemBehavior={ui.sectionContent.failureStories.scenario1.systemBehavior}
              outcome={ui.sectionContent.failureStories.scenario1.outcome}
              labels={ui.labels}
              images={[
                {
                  src: "/case-studies/reliable-event-processing/s1-01-ingest-duplicate.png",
                  alt: "Terminal output showing duplicate ingest requests returning accepted responses.",
                  caption: "Duplicate ingest.",
                },
                {
                  src: "/case-studies/reliable-event-processing/s1-02-two-jobs-same-event.png",
                  alt: "Job list showing two jobs created for the same event id.",
                  caption: "Two jobs created.",
                },
                {
                  src: "/case-studies/reliable-event-processing/s1-03-one-effect.png",
                  alt: "Ledger view indicating a single effect applied after deduplication.",
                  caption: "Only one effect.",
                },
              ]}
            />
            <CaseStudyScenario
              title={ui.sectionContent.failureStories.scenario2.title}
              scenario={ui.sectionContent.failureStories.scenario2.scenario}
              systemBehavior={ui.sectionContent.failureStories.scenario2.systemBehavior}
              outcome={ui.sectionContent.failureStories.scenario2.outcome}
              labels={ui.labels}
              images={[
                {
                  src: "/case-studies/reliable-event-processing/s2-01-event-malformed-job-queued.png",
                  alt: "Malformed event payload queued with missing required fields.",
                  caption: "Malformed payload.",
                },
                {
                  src: "/case-studies/reliable-event-processing/s2-02-job-failed.png",
                  alt: "Failed job entry with a recorded error reason.",
                  caption: "Job failed.",
                },
              ]}
            />
            <CaseStudyScenario
              title={ui.sectionContent.failureStories.scenario3.title}
              scenario={ui.sectionContent.failureStories.scenario3.scenario}
              systemBehavior={ui.sectionContent.failureStories.scenario3.systemBehavior}
              outcome={ui.sectionContent.failureStories.scenario3.outcome}
              labels={ui.labels}
              images={[
                {
                  src: "/case-studies/reliable-event-processing/s3-01-job-failed.png",
                  alt: "Failed job awaiting operator review before requeue.",
                  caption: "Job failed.",
                },
                {
                  src: "/case-studies/reliable-event-processing/s3-02-manual-requeue.png",
                  alt: "Operator action showing manual requeue of a failed job.",
                  caption: "Manual requeue.",
                },
                {
                  src: "/case-studies/reliable-event-processing/s3-03-intervention-audit.png",
                  alt: "Audit record showing intervention actor and reason.",
                  caption: "Intervention audit.",
                },
                {
                  src: "/case-studies/reliable-event-processing/s3-04-job-failed-again.png",
                  alt: "Job failed again after manual requeue attempt.",
                  caption: "Failed again.",
                },
              ]}
            />
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