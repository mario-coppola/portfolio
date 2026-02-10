import { getLangLocales } from "@/lib/seo";

export function buildCaseStudyJsonLd(args: {
  siteUrl: string;
  lang: "en" | "it";
  canonicalUrl: string;
  title: string;
  description: string;
  stack: string[];
  year?: string;
  links?: string[];
}): object[] {
  const personId = `${args.siteUrl}/#person`;
  const websiteId = `${args.siteUrl}/#website`;
  const { htmlLang } = getLangLocales(args.lang);
  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: args.title,
    description: args.description,
    url: args.canonicalUrl,
    author: { "@id": personId },
    keywords: args.stack,
    sameAs: args.links ?? [],
    ...(args.year ? { dateCreated: `${args.year}-01-01` } : {}),
  };
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: args.title,
    description: args.description,
    url: args.canonicalUrl,
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
    inLanguage: htmlLang,
  };

  return [creativeWorkJsonLd, webPageJsonLd];
}
