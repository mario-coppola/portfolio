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

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h2 className="text-lg font-semibold text-[var(--foreground)]">{title}</h2>
      {children}
    </section>
  );
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

      <div className="grid gap-4">
        {project.context ? (
          <Card>
            <Section title={ui.sectionTitles.whatItIs}>
              <p className="text-[var(--muted)]">{project.context}</p>
            </Section>
          </Card>
        ) : null}

        {project.problem ? (
          <Card>
            <Section title={ui.sectionTitles.whyThisIsHard}>
              <p className="text-[var(--muted)]">{project.problem}</p>
            </Section>
          </Card>
        ) : null}

        {project.decisions?.length ? (
          <Card>
            <Section title={ui.sectionTitles.safetyDesign}>
              <ul className="list-disc space-y-1 pl-5 text-[var(--muted)]">
                {project.decisions.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </Section>
          </Card>
        ) : null}

        {project.tradeoffs?.length ? (
          <Card>
            <Section title={ui.sectionTitles.tradeOffs}>
              <ul className="list-disc space-y-1 pl-5 text-[var(--muted)]">
                {project.tradeoffs.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Section>
          </Card>
        ) : null}

        {project.outcome?.length ? (
          <Card>
            <Section title={ui.sectionTitles.whatYouGet}>
              <ul className="list-disc space-y-1 pl-5 text-[var(--muted)]">
                {project.outcome.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            </Section>
          </Card>
        ) : null}
      </div>

      <Card>
        <Section title={ui.cta.title}>
          <p className="text-[var(--muted)]">
            {ui.cta.body}
          </p>
          <ButtonLink href={"/contact"} variant="primary">
          {ui.cta.linkLabel}
          </ButtonLink>
        </Section>
      </Card>
    </Container>
  );
}