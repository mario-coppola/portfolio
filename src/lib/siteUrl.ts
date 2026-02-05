import { site } from "@/content/site";

export function getSiteUrl(): string {
  const rawSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || site.url || "http://localhost:3000";

  const normalized = rawSiteUrl.startsWith("http://") || rawSiteUrl.startsWith("https://")
    ? rawSiteUrl
    : `https://${rawSiteUrl}`;

  return normalized.replace(/\/$/, "");
}

export function absoluteUrl(pathWithQuery: string): string {
  if (pathWithQuery.startsWith("http://") || pathWithQuery.startsWith("https://")) {
    return pathWithQuery;
  }

  const baseUrl = getSiteUrl();
  const normalizedPath = pathWithQuery.startsWith("/") ? pathWithQuery : `/${pathWithQuery}`;
  return `${baseUrl}${normalizedPath}`;
}
