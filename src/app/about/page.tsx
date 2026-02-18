import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { getLangFromSearchParams, t, type SearchParams } from "@/content/i18n";
import { aboutContent } from "@/content/about";
import { absoluteUrl, getSiteUrl } from "@/lib/siteUrl";
import { site } from "@/content/site";
import { TextLink } from "@/components/ui/TextLink";

const siteUrl = getSiteUrl();
const globalOgImageUrl = absoluteUrl("/opengraph-image");

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: SearchParams;
}): Promise<Metadata> {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const lang = getLangFromSearchParams(resolvedSearchParams);
  const content = t(aboutContent, lang);

  const canonicalUrl = `${siteUrl}/about`;

  return {
    title: content.title + " - " + site.title,
    description: content.intro.p1,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": `${canonicalUrl}?lang=en`,
        "it-IT": `${canonicalUrl}?lang=it`,
      },
    },
    openGraph: {
      url: absoluteUrl("/about"),
      locale: lang === "it" ? "it_IT" : "en_US",
      title: content.title + " - " + site.title,
      description: content.intro.p1,
      images: [globalOgImageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: content.title + " - " + site.title,
      description: content.intro.p1,
      images: [globalOgImageUrl],
    },
  };
}

export default async function AboutPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams> | SearchParams;
}) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const lang = getLangFromSearchParams(resolvedSearchParams);
  const content = t(aboutContent, lang);

  return (
    <Container className="space-y-8 py-6">
      <section className="space-y-4">
      <div>
          <TextLink href="/">{content.backToHome}</TextLink>
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-8">{content.title}</h1>
      
      </section>

      <section className="space-y-5 text-[var(--muted)] max-w-2xl">
        <p>{content.intro.p1}</p>
        <p>{content.intro.p2}</p>
        <p>{content.intro.p3}</p>

        <p className="text-[var(--foreground)] font-medium">
          {content.intro.systemGuaranteeIntro}
        </p>

        <ul className="list-disc pl-5 space-y-1">
          {content.intro.guarantees.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-4 max-w-2xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--foreground)]">
          {content.howIWork.title}
        </h2>
        <div className="space-y-4 text-[var(--muted)]">
          <p>{content.howIWork.p1}</p>
          <p>{content.howIWork.p2}</p>
          <p>{content.howIWork.p3}</p>
        </div>
      </section>

      <section className="space-y-4 max-w-2xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--foreground)]">
          {content.whenToReachOut.title}
        </h2>

        <ul className="list-disc pl-5 space-y-2 text-[var(--muted)]">
          {content.whenToReachOut.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-4 max-w-2xl">
      <p className="text-[var(--foreground)]">
          {content.whenToReachOut.closing}
        </p>
      </section>

      <section>
        <ButtonLink href="/contact" variant="primary">
          {content.cta}
        </ButtonLink>
      </section>
    </Container>
  );
}