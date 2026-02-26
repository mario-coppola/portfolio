import { site } from "@/content/site";

export function getSiteUrl() {
  // 1) hard source (committata) — ideale per portfolio
  if (site.url) return site.url.replace(/\/$/, "");

  // 2) optional env override (server-only)
  const env = process.env.SITE_URL;
  if (env) return env.replace(/\/$/, "");

  // 3) Vercel fallback (preview/prod)
  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`.replace(/\/$/, "");

  return "http://localhost:3000";
}

export function absoluteUrl(path: string) {
  const base = getSiteUrl();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}