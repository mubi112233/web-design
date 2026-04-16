import type { Metadata } from "next";
import { BlogListingClient } from "./BlogListingClient";
import { absoluteUrl, hreflangAlternates, publicLocalePathSegment } from "@/lib/site-url";
import { generateBreadcrumbSchema } from "@/lib/structured-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const seg = publicLocalePathSegment(raw);
  const { languages } = hreflangAlternates("blog");
  const canonical = absoluteUrl(`/${seg}/blog`);

  const isDe = seg === "de";
  const title = isDe
    ? "Blog — Recruiting Tipps & HR Insights | DON Recruitment"
    : "Blog — Recruitment Tips & HR Insights | DON Recruitment";
  const description = isDe
    ? "Einblicke, Tipps und Best Practices zu Recruiting, Talent Acquisition und HR-Strategie — auf Deutsch."
    : "Insights, tips, and best practices for recruitment, talent acquisition, and HR strategy.";

  return {
    title,
    description,
    keywords: isDe
      ? [
          "Recruiting Blog",
          "Personalvermittlung Tipps",
          "HR deutsch",
          "Talent Acquisition",
          "DON Recruitment",
          "Executive Search Blog",
        ]
      : [
          "recruitment blog",
          "talent acquisition tips",
          "hiring strategies",
          "HR best practices",
          "DON Recruitment",
          "executive search insights",
        ],
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      locale: isDe ? "de_DE" : "en_US",
      alternateLocale: isDe ? "en_US" : "de_DE",
      siteName: "DON Recruitment",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "DON Recruitment" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/og-image.jpg")],
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang = raw === 'de' || raw === 'ge' ? 'ge' : 'en';
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: lang === 'ge' ? 'Startseite' : 'Home', href: `/${lang}` },
    { label: "Blog", href: `/${lang}/blog` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogListingClient />
    </>
  );
}
