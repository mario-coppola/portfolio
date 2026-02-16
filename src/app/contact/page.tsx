import type { Metadata } from "next";
import { getLangFromSearchParams, t, type SearchParams } from "@/content/i18n";
import { contactContent } from "@/content/contact";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { absoluteUrl, getSiteUrl } from "@/lib/siteUrl";

const siteUrl = getSiteUrl();
const globalOgImageUrl = absoluteUrl("/opengraph-image");
const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;

const EMAIL = "mariocoppo91@gmail.com";
const GITHUB_URL = "https://github.com/mario-coppola";
const LINKEDIN_URL = "https://www.linkedin.com/in/mariocoppola91";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: SearchParams;
}): Promise<Metadata> {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const lang = getLangFromSearchParams(resolvedSearchParams);

  const canonical = `${siteUrl}/contact`;
  const title = lang === "it" ? "Contatti" : "Get in touch";
  const description =
    lang === "it"
      ? "Scrivimi via email: raccontami due righe di contesto e ti rispondo con i prossimi step."
      : "Email is the fastest way. Share a bit of context and I’ll reply with the next steps.";

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "en-US": `${canonical}?lang=en`,
        "it-IT": `${canonical}?lang=it`,
      },
    },
    openGraph: {
      url: absoluteUrl("/contact"),
      locale: lang === "it" ? "it_IT" : "en_US",
      title,
      description,
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
  const content = t(contactContent, lang);

  const inLanguage = lang === "it" ? "it-IT" : "en-US";
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: content.pageTitle,
    description: content.pageDescription,
    url: `${siteUrl}/contact`,
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
    inLanguage,
  };

  return (
    <Container className="space-y-8 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />

      <header className="space-y-2">
        <div>
          <TextLink href="/">{content.backToHome}</TextLink>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {content.pageTitle}
        </h1>
        <p className="max-w-2xl text-[var(--muted)]">
          {content.pageDescription}
        </p>
      </header>

      <Card className="space-y-5">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-[var(--foreground)]">
            {content.emailLabel}
          </p>
          <p className="font-mono text-sm text-[var(--muted)]">{EMAIL}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <ButtonLink href={`mailto:${EMAIL}`} variant="primary">
            {content.primaryCta.label}
          </ButtonLink>
          <ButtonLink href={GITHUB_URL} external variant="secondary">
            {content.links.github}
          </ButtonLink>
          <ButtonLink href={LINKEDIN_URL} external variant="secondary">
            {content.links.linkedin}
          </ButtonLink>
        </div>
      </Card>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          {content.whatToInclude.title}
        </h2>
        <ul className="list-disc space-y-1 pl-5 text-[var(--muted)]">
          {content.whatToInclude.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          {content.availability.title}
        </h2>
        <p className="text-[var(--muted)]">{content.availability.line}</p>
      </section>
    </Container>
  );
}