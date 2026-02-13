import type { Metadata } from "next";
import Link from "next/link";
import { getLangFromSearchParams, t, type SearchParams } from "@/content/i18n";
import { getFeaturedCaseStudies } from "@/content/caseStudies";
import { projectsIndexContent } from "@/content/projectsIndex";
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
  const content = t(projectsIndexContent, lang);
  const caseStudyContentLang = t(caseStudyContent, lang);
  const projectMeta = caseStudyContentLang.projectMeta;
  const featured = getFeaturedCaseStudies();
  const first = featured[0];
  const inLanguage = lang === "it" ? "it-IT" : "en-US";
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: content.pageTitle,
    description: content.pageDescription,
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
          <TextLink href="/">{content.backToHome}</TextLink>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">{content.pageTitle}</h1>
        <p className="max-w-2xl text-[var(--muted)]">{content.pageDescription}</p>

      </header>

      {featured.length ? (
    <div className="space-y-3">
      {featured.map((cs) => {
        // meta “hardcoded” in caseStudyContent (projectMeta) solo per questo case study.
        // Quando ce ne saranno altri, estendere caseStudyContent con una mappa per slug.
        const meta =
          cs.slug === "reliable-eventing-saas"
            ? projectMeta
            : { title: cs.slug, summary: "", role: "" };

        return (
          <Card key={cs.slug} className="space-y-3">
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-[var(--foreground)]">
                {meta.title}
              </h3>
              {meta.summary ? (
                <p className="text-sm text-[var(--muted)]">{meta.summary}</p>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2">
              {cs.stack.slice(0, 6).map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>

            <div>
              <TextLink href={`/projects/${first.slug}`}>{content.viewCaseStudy}</TextLink>
            </div>
          </Card>
        );
      })}
    </div>
  ) : null}

    </Container>
  );
}