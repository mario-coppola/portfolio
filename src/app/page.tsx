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
import { getFeaturedCaseStudies } from "@/content/caseStudies";

const siteUrl = getSiteUrl();
const globalOgImageUrl = absoluteUrl("/opengraph-image");

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
        "en-US": `${siteUrl}?lang=en`,
        "it-IT": `${siteUrl}?lang=it`,
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
  const caseStudyContentLang = t(caseStudyContent, lang);
  const projectMeta = caseStudyContentLang.projectMeta;
  const featured = getFeaturedCaseStudies();
  const first = featured[0];

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
  </div>

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
              <TextLink href={`/projects/${first.slug}`}>{content.caseStudy.viewCaseStudy}</TextLink>
            </div>
          </Card>
        );
      })}
    </div>
  ) : null}

</section>

    </Container>
  );
}