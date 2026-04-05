/**
 * Canonical site origin for metadata, sitemap, and JSON-LD.
 * Set NEXT_PUBLIC_SITE_URL in production to match your live domain.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://don-seo.com"
) as string;

export function absoluteUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}

/** Normalize route param to folder prefix (`ge` or `en`). */
export function localePathSegment(lang: string): "en" | "ge" {
  return lang === "ge" || lang === "de" ? "ge" : "en";
}

/**
 * Path after locale, e.g. "" for home, "contact", "blog/post-slug"
 * (no leading slash on segments).
 */
export function hreflangAlternates(pathAfterLocale: string): {
  canonicalEn: string;
  canonicalDe: string;
  languages: Record<string, string>;
} {
  const tail = pathAfterLocale ? `/${pathAfterLocale.replace(/^\//, "")}` : "";
  return {
    canonicalEn: absoluteUrl(`/en${tail}`),
    canonicalDe: absoluteUrl(`/ge${tail}`),
    languages: {
      en: absoluteUrl(`/en${tail}`),
      de: absoluteUrl(`/ge${tail}`),
      "x-default": absoluteUrl(`/en${tail}`),
    },
  };
}
