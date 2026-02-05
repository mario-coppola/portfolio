import type { Metadata } from "next";
import { getLangFromSearchParams, type SearchParams } from "@/content/i18n";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
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
      canonical: `${siteUrl}/about`,
      languages: {
        "en-US": `${siteUrl}/about?lang=en`,
        "it-IT": `${siteUrl}/about?lang=it`,
      },
    },
    openGraph: {
      url: absoluteUrl("/about"),
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

export default async function AboutPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const lang = getLangFromSearchParams(resolvedSearchParams);
  const inLanguage = lang === "it" ? "it-IT" : "en-US";
  const pageDescription =
    "I work through small, intentional steps and defensible decisions. My focus is on building web applications that balance technical correctness with product needs.";
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "About",
    description: pageDescription,
    url: `${siteUrl}/about`,
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
          <TextLink href="/">Back to home</TextLink>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">About</h1>
      </header>

      <div className="space-y-4">
        <p className="max-w-2xl text-[var(--muted)]">
          I work through small, intentional steps and defensible decisions.
          My focus is on building web applications that balance technical
          correctness with product needs.
        </p>

        <p className="max-w-2xl text-[var(--muted)]">
          I care deeply about performance, SEO, accessibility, and long-term
          maintainability. Code quality matters, but only insofar as it helps
          deliver a better product and reduces future complexity.
        </p>
      </div>
    </Container>
  );
}