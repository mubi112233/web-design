import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Sets `x-html-lang` so the root `<html lang>` matches the visible locale (de for /ge, en for /en).
 * Helps German SERP snippets and screen readers.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const htmlLang =
    pathname.startsWith("/ge") || pathname.startsWith("/de") ? "de" : "en";
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-html-lang", htmlLang);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
