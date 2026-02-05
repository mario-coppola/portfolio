import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const isItalianPreferred = (acceptLanguage: string | null): boolean => {
  if (!acceptLanguage) {
    return false;
  }

  const lower = acceptLanguage.toLowerCase();
  return lower.startsWith("it") || lower.includes("it-");
};

const isValidLang = (value: string | undefined): value is "en" | "it" =>
  value === "en" || value === "it";

export function proxy(request: NextRequest) {
  const { nextUrl, headers } = request;
  const langParam = nextUrl.searchParams.get("lang") ?? undefined;

  const cookieLang = request.cookies.get("lang")?.value;
  const acceptLanguage = headers.get("accept-language");
  const computedLang = isValidLang(cookieLang)
    ? cookieLang
    : isItalianPreferred(acceptLanguage)
      ? "it"
      : "en";

  if (langParam) {
    if (isValidLang(langParam)) {
      const response = NextResponse.next();
      response.cookies.set("lang", langParam, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
      });
      return response;
    }

    const url = nextUrl.clone();
    url.searchParams.set("lang", computedLang);
    return NextResponse.redirect(url, 307);
  }

  const url = nextUrl.clone();
  url.searchParams.set("lang", computedLang);
  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
