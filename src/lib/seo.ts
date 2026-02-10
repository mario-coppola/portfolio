import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/siteUrl";

export type LangLocale = { htmlLang: string; ogLocale: string };

export function getLangLocales(lang: "en" | "it"): LangLocale {
  return lang === "it"
    ? { htmlLang: "it-IT", ogLocale: "it_IT" }
    : { htmlLang: "en-US", ogLocale: "en_US" };
}

export function buildAlternates(canonicalUrl: string): Metadata["alternates"] {
  return {
    canonical: canonicalUrl,
    languages: {
      "en-US": `${canonicalUrl}?lang=en`,
      "it-IT": `${canonicalUrl}?lang=it`,
    },
  };
}

export function buildSocialMeta(args: {
  title: string;
  description: string;
  canonicalPath: string;
  ogImagePath: string;
  lang: "en" | "it";
}): Pick<Metadata, "openGraph" | "twitter"> {
  const { ogLocale } = getLangLocales(args.lang);
  const ogImageUrl = absoluteUrl(args.ogImagePath);
  const canonicalUrl = absoluteUrl(args.canonicalPath);

  return {
    openGraph: {
      title: args.title,
      description: args.description,
      url: canonicalUrl,
      type: "article",
      locale: ogLocale,
      images: [ogImageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: args.title,
      description: args.description,
      images: [ogImageUrl],
    },
  };
}
