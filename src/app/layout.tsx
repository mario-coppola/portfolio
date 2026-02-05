import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { SiteHeader } from "@/components/blocks/SiteHeader";
import { SiteFooter } from "@/components/blocks/SiteFooter";
import { site } from "@/content/site";
import { absoluteUrl, getSiteUrl } from "@/lib/siteUrl";

const siteUrl = getSiteUrl();
const globalOgImageUrl = absoluteUrl("/opengraph-image");
const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;
const globalJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: "Mario Coppola",
    jobTitle: "Backend Engineer / Backend-focused",
    url: siteUrl,
    sameAs: [],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: site.title,
    url: siteUrl,
    inLanguage: "en-US",
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    type: "website",
    url: siteUrl,
    siteName: site.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [globalOgImageUrl],
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get("lang")?.value;
  const lang = cookieLang === "it" || cookieLang === "en" ? cookieLang : "en";

  return (
    <html lang={lang}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalJsonLd) }}
        />
      </head>
      <body className="min-h-dvh bg-white text-[var(--foreground)] antialiased flex flex-col">
        <SiteHeader />
        <main className="mx-auto w-full max-w-4xl px-4 py-10 flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}