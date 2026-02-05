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
      canonical: `${siteUrl}/contact`,
      languages: {
        "en-US": `${siteUrl}/contact?lang=en`,
        "it-IT": `${siteUrl}/contact?lang=it`,
      },
    },
    openGraph: {
      url: absoluteUrl("/contact"),
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

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const lang = getLangFromSearchParams(resolvedSearchParams);
  const inLanguage = lang === "it" ? "it-IT" : "en-US";
  const pageDescription =
    "If you want to discuss a project, collaboration, or just exchange ideas, feel free to reach out.";
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Contact",
    description: pageDescription,
    url: `${siteUrl}/contact`,
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
        <h1 className="text-2xl font-semibold tracking-tight">Contact</h1>
      </header>

      <div className="space-y-4">
        <p className="max-w-2xl text-[var(--muted)]">
          If you want to discuss a project, collaboration, or just exchange ideas,
          feel free to reach out.
        </p>

        <p className="max-w-2xl text-[var(--muted)]">
          Contact details and links will be added here once the public identity
          is fully defined.
        </p>
      </div>
    </Container>
  );
}