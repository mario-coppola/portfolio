import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const isItalianPreferred = (acceptLanguage: string | null): boolean => {
  if (!acceptLanguage) {
    return false;
  }

  const lower = acceptLanguage.toLowerCase();
  return lower.startsWith("it") || lower.includes("it-");
};

export function proxy(request: NextRequest) {
  const { nextUrl, headers } = request;
  if (nextUrl.searchParams.has("lang")) {
    return NextResponse.next();
  }

  const acceptLanguage = headers.get("accept-language");
  const lang = isItalianPreferred(acceptLanguage) ? "it" : "en";

  const url = nextUrl.clone();
  url.searchParams.set("lang", lang);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
