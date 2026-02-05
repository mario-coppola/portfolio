import type { Metadata } from "next";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || site.url || "http://localhost:3000";

const siteUrl =
  rawSiteUrl.startsWith("http://") || rawSiteUrl.startsWith("https://")
    ? rawSiteUrl.replace(/\/$/, "")
    : `https://${rawSiteUrl.replace(/\/$/, "")}`;

export const metadata: Metadata = {
  alternates: {
    canonical: `${siteUrl}/about`,
    languages: {
      "en-US": `${siteUrl}/about?lang=en`,
      "it-IT": `${siteUrl}/about?lang=it`,
    },
  },
};

export default function AboutPage() {
  return (
    <Container className="space-y-6 py-10">
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