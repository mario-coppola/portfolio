import { site } from "@/content/site";

const SUPPORTED_LANGS = ["en", "it"] as const;

export type Lang = (typeof SUPPORTED_LANGS)[number];

export type SearchParams =
  | URLSearchParams
  | Record<string, string | string[] | undefined>
  | undefined;

const isLang = (value: string | undefined | null): value is Lang =>
  value != null && SUPPORTED_LANGS.includes(value as Lang);

const DEFAULT_LANG: Lang = isLang(site.locale) ? site.locale : "en";

const getParamValue = (
  searchParams: SearchParams,
  key: string,
): string | undefined => {
  if (!searchParams) {
    return undefined;
  }

  if (searchParams instanceof URLSearchParams) {
    const value = searchParams.get(key);
    return value ?? undefined;
  }

  const raw = searchParams[key];
  return Array.isArray(raw) ? raw[0] : raw;
};

export const getLangFromSearchParams = (searchParams?: SearchParams): Lang => {
  const value = getParamValue(searchParams, "lang");
  return isLang(value) ? value : DEFAULT_LANG;
};

export const t = <T>(content: Record<Lang, T>, lang: Lang = DEFAULT_LANG): T =>
  content[lang];
