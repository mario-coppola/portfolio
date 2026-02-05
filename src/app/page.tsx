import type { Metadata } from "next";
import { homeContent } from "@/content/home";
import { getLangFromSearchParams, t, type SearchParams } from "@/content/i18n";
import { getFlagshipProject } from "@/content/projects";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TextLink } from "@/components/ui/TextLink";
import { absoluteUrl, getSiteUrl } from "@/lib/siteUrl";

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
  const flagship = getFlagshipProject();
  const portfolioBuiltWith = content.portfolioBuiltWith;
  const inLanguage = lang === "it" ? "it-IT" : "en-US";
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: site.title,
    description: site.description,
    url: siteUrl,
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
    inLanguage,
  };

  return (
    <Container className="space-y-12 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
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

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">{content.problem.title}</h2>
        <p className="max-w-2xl text-[var(--muted)]">{content.problem.body}</p>
      </section>

      <section className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">{content.flagship.title}</h2>
          <p className="max-w-2xl text-[var(--muted)]">
            {content.flagship.body}
          </p>
        </div>

        {flagship ? (
          <Card className="space-y-3">
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-[var(--foreground)]">
                <TextLink href={`/projects/${flagship.slug}`}>
                  {flagship.title}
                </TextLink>
              </h3>
              <p className="text-sm text-[var(--muted)]">{flagship.summary}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {flagship.stack.slice(0, 5).map((stackItem) => (
                <Badge key={stackItem}>{stackItem}</Badge>
              ))}
            </div>
          </Card>
        ) : null}
      </section>

      <section className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="space-y-3">
            <h3 className="text-base font-semibold">{content.guarantees.title}</h3>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              {content.guarantees.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
          <Card className="space-y-3">
            <h3 className="text-base font-semibold">{content.nonScope.title}</h3>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              {content.nonScope.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {portfolioBuiltWith ? (
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">{portfolioBuiltWith.title}</h2>
            <p className="max-w-2xl text-[var(--muted)]">
              {portfolioBuiltWith.body}
            </p>
          </div>
          <div>
            <TextLink href="/projects/portfolio">
              {portfolioBuiltWith.linkLabel}
            </TextLink>
          </div>
        </section>
      ) : null}
    </Container>
  );
}