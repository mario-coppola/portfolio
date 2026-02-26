import { site } from "@/content/site";

export function getSiteUrl(): string {
  // Server-only canonical URL
  const siteUrl = process.env.SITE_URL;
  if (siteUrl) return stripTrailingSlash(siteUrl);

  // Fallback in client-side contexts
  const publicUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (publicUrl) return stripTrailingSlash(publicUrl);

  // Vercel fallback 
  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`;

  return "http://localhost:3000";
}

export function absoluteUrl(pathWithQuery: string): string {
  const baseUrl = getSiteUrl();
  if (!pathWithQuery.startsWith("/")) pathWithQuery = `/${pathWithQuery}`;
  return `${baseUrl}${pathWithQuery}`;
}

function stripTrailingSlash(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}