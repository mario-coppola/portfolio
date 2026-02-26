import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { getLangFromSearchParams, t, type SearchParams } from "@/content/i18n";
import { privacyContent } from "@/content/privacy";
import { absoluteUrl, getSiteUrl } from "@/lib/siteUrl";
import { site } from "@/content/site";
import { ArrowLeft } from "lucide-react";

const siteUrl = getSiteUrl();
const globalOgImageUrl = absoluteUrl("/opengraph-image");

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: SearchParams;
}): Promise<Metadata> {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const lang = getLangFromSearchParams(resolvedSearchParams);
  const content = t(privacyContent, lang);

  const canonicalUrl = `${siteUrl}/privacy`;

  return {
    title: content.title + " - " + site.title,
    description: content.intro,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": `${canonicalUrl}?lang=en`,
        "it-IT": `${canonicalUrl}?lang=it`,
      },
    },
    openGraph: {
      url: absoluteUrl("/privacy"),
      locale: lang === "it" ? "it_IT" : "en_US",
      title: content.title + " - " + site.title,
      description: content.intro,
      images: [globalOgImageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: content.title + " - " + site.title,
      description: content.intro,
      images: [globalOgImageUrl],
    },
  };
}

export default async function PrivacyPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams> | SearchParams;
}) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const lang = getLangFromSearchParams(resolvedSearchParams);
  const content = t(privacyContent, lang);

  return (
    <Container className="space-y-8 py-6">
      <section className="space-y-4">
      <div>
          <TextLink href="/">
              <div className="flex items-center gap-1">
              <ArrowLeft size={16} />
              <div>{content.backToHome}</div>
              </div>
          </TextLink>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-8">
          {content.title}
        </h1>

        <p className="text-[var(--muted)]">{content.intro}</p>
      </section>

      <section className="space-y-8 max-w-2xl text-[var(--muted)]">
        {Object.values(content.sections).map((section) => (
          <div key={section.title} className="space-y-2">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              {section.title}
            </h2>
            <p>{section.body}</p>
          </div>
        ))}
      </section>
    </Container>
  );
}