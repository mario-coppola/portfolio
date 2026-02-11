import type { Metadata } from "next";
import { homeContent } from "@/content/home";
import { getLangFromSearchParams, t, type SearchParams } from "@/content/i18n";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TextLink } from "@/components/ui/TextLink";
import { absoluteUrl, getSiteUrl } from "@/lib/siteUrl";
import { caseStudyContent } from "@/content/caseStudy";
import { getCaseStudy, getProjectBySlug } from "@/content/projects";

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
      canonical: siteUrl,
      languages: {
        "en-US": `${siteUrl}/?lang=en`,
        "it-IT": `${siteUrl}/?lang=it`,
      },
    },
    openGraph: {
      url: absoluteUrl("/"),
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

export default async function Home({ searchParams }: { searchParams?: SearchParams }) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const lang = getLangFromSearchParams(resolvedSearchParams);
  const content = t(homeContent, lang);
  const caseStudy = t(caseStudyContent, lang);
  const projectMeta = caseStudy.projectMeta;
  const project = getCaseStudy();

  return (
    <Container className="space-y-12 py-10">
      <section className="space-y-4">
        <p className="text-sm text-[var(--muted-foreground)]">
          {content.hero.eyebrow}
        </p>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {content.hero.title}
        </h1>

        <p className="max-w-2xl text-[var(--muted)]">
          {content.hero.subtitle}
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <ButtonLink href={content.hero.primaryCta.href} variant="secondary">
            {content.hero.primaryCta.label}
          </ButtonLink>
          <ButtonLink href={content.hero.secondaryCta.href} variant="primary">
            {content.hero.secondaryCta.label}
          </ButtonLink>
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">{content.caseStudy.title}</h2>
          <p className="max-w-2xl text-[var(--muted)]">
            {content.caseStudy.body}
          </p>
        </div>

        {caseStudy ? (
          <Card className="space-y-3">
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-[var(--foreground)]">
                <TextLink href={`/projects/${project?.slug}`}>
                  {projectMeta.title}
                </TextLink>
              </h3>
              <p className="text-sm text-[var(--muted)]">{projectMeta.summary}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project?.stack.slice(0, 5).map((stackItem: string) => (
                <Badge key={stackItem}>{stackItem}</Badge>
              ))}
            </div>
          </Card>
        ) : null}
      </section>

    </Container>
  );
}