import type { Metadata } from "next";
import Link from "next/link";
import { getLangFromSearchParams, t, type SearchParams } from "@/content/i18n";
import { getCaseStudy, projects } from "@/content/projects";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TextLink } from "@/components/ui/TextLink";
import { absoluteUrl, getSiteUrl } from "@/lib/siteUrl";
import { caseStudyContent } from "@/content/caseStudy";

const siteUrl = getSiteUrl();
const globalOgImageUrl = absoluteUrl("/opengraph-image");
const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: SearchParams;
}): Promise<Metadata> {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const lang = getLangFromSearchParams(resolvedSearchParams);

  return {
    alternates: {
      canonical: `${siteUrl}/projects`,
      languages: {
        "en-US": `${siteUrl}/projects?lang=en`,
        "it-IT": `${siteUrl}/projects?lang=it`,
      },
    },
    openGraph: {
      url: absoluteUrl("/projects"),
      locale: lang === "it" ? "it_IT" : "en_US",
      images: [globalOgImageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: site.title,
      description: site.description,
      images: [globalOgImageUrl],
    },
  };
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const lang = getLangFromSearchParams(resolvedSearchParams);
  const caseStudy = t(caseStudyContent, lang);
  const projectMeta = caseStudy.projectMeta;
  const project = getCaseStudy();
  const pageDescription =
    "Case study focalizzati su architettura backend, garanzie di sistema e decisioni progettuali.";
  const inLanguage = lang === "it" ? "it-IT" : "en-US";
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Projects",
    description: pageDescription,
    url: `${siteUrl}/projects`,
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
    inLanguage,
  };

  return (
    <Container className="space-y-6 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <header className="space-y-2">
        <div>
          <TextLink href="/">Torna alla home</TextLink>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Progetti</h1>
        <p className="max-w-2xl text-[var(--muted)]">{pageDescription}</p>

      </header>

      {caseStudy ? (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Case studies</h2>
          <Card className="space-y-3">
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-[var(--foreground)]">
                <Link
                  href={`/projects/${project?.slug}`}
                  className="hover:underline"
                >
                  {projectMeta.title}
                </Link>
              </h3>

              <p className="text-sm text-[var(--muted)]">{projectMeta.summary}</p>

              <p className="text-xs text-[var(--muted-foreground)]">
                {project?.year ? `${project?.year} • ` : ""}
                {project?.role}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project?.stack.slice(0, 6).map((t: string) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>

            <div>
              <TextLink href={`/projects/${project?.slug}`}>Vedi case study</TextLink>
            </div>
          </Card>
        </section>
      ) : null}

    </Container>
  );
}