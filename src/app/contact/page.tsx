import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { getLangFromSearchParams, t, type SearchParams } from "@/content/i18n";
import { contactContent } from "@/content/contact";
import { absoluteUrl, getSiteUrl } from "@/lib/siteUrl";
import { site } from "@/content/site";
import { Mail, Github, Linkedin, ArrowLeft } from "lucide-react";
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
  const content = t(contactContent, lang);

  const canonicalUrl = `${siteUrl}/contact`;

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
      url: absoluteUrl("/contact"),
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

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams> | SearchParams;
}) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const lang = getLangFromSearchParams(resolvedSearchParams);
  const content = t(contactContent, lang);

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

      {/* EMAIL */}
      <section className="space-y-3 max-w-2xl">
        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-[var(--muted-foreground)]" />
          <a
            href="mailto:mariocoppo91@gmail.com"
            className="text-[var(--foreground)] hover:underline"
          >
            mariocoppo91@gmail.com
          </a>
        </div>
      </section>

      {/* AVAILABILITY */}
      <section className="space-y-3 max-w-2xl">
        <p className="text-sm text-[var(--muted-foreground)]">
          {content.availability}
        </p>
        <ul className="list-disc pl-5 space-y-1 text-[var(--muted)]">
          {content.scope.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      {/* SOCIAL */}
      <section className="space-y-3 max-w-2xl">
        <p className="text-sm text-[var(--muted-foreground)]">
          {content.closing}
        </p>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/mario-coppola"
            target="_blank"
            className="flex items-center gap-2 hover:underline"
          >
            <Github className="h-5 w-5 text-[var(--muted-foreground)]" />
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/mariocoppola91"
            target="_blank"
            className="flex items-center gap-2 hover:underline"
          >
            <Linkedin className="h-5 w-5 text-[var(--muted-foreground)]" />
            LinkedIn
          </a>
        </div>
      </section>
    </Container>
  );
}