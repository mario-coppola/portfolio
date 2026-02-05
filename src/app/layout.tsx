import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { SiteHeader } from "@/components/blocks/SiteHeader";
import { SiteFooter } from "@/components/blocks/SiteFooter";
import { site } from "@/content/site";

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || site.url || "http://localhost:3000";

const siteUrl =
  rawSiteUrl.startsWith("http://") || rawSiteUrl.startsWith("https://")
    ? rawSiteUrl.replace(/\/$/, "")
    : `https://${rawSiteUrl.replace(/\/$/, "")}`;

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
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get("lang")?.value;
  const lang = cookieLang === "it" || cookieLang === "en" ? cookieLang : "en";

  return (
    <html lang={lang}>
      <body className="min-h-dvh bg-white text-[var(--foreground)] antialiased flex flex-col">
        <SiteHeader />
        <main className="mx-auto w-full max-w-4xl px-4 py-10 flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}