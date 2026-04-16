import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { HomeBelowFold } from "@/components/HomeBelowFold.hybrid";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchApiData, API_ENDPOINTS, normalizeLanguage, fetchFAQ } from "@/lib/api";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/structured-data";
import { SITE_URL, absoluteUrl, hreflangAlternates, publicLocalePathSegment } from "@/lib/site-url";

export const revalidate = 3600;

const SUPPORTED_LANGS = ['en', 'ge', 'de'];

async function getHeroMeta(lang: string) {
  try {
    const data = await fetchApiData<{ hero: any | any[] }>(API_ENDPOINTS.HERO, normalizeLanguage(lang));
    if (!data?.hero) return null;

    // Handle array response (multiple heroes)
    if (Array.isArray(data.hero)) {
      // Sort by _id (newest first - MongoDB ObjectId contains timestamp)
      const sorted = data.hero.sort((a, b) => {
        const idA = a._id || '';
        const idB = b._id || '';
        return idB.localeCompare(idA);
      });
      console.log(`[getHeroMeta] Found ${sorted.length} heroes, using newest:`, sorted[0]?._id);
      return sorted[0] || null;
    }

    return data.hero;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = rawLang === 'de' || rawLang === 'ge' ? 'ge' : 'en';
  const hero = await getHeroMeta(lang);

  const title =
    hero?.metaTitle ||
    (lang === "ge"
      ? "DON Recruitment – Professionelle Personalvermittlung & Executive Search | Recruiting Agentur"
      : "DON Recruitment – Professional Talent Acquisition | Hire Top Talent");
  const description =
    hero?.metaDescription ||
    (lang === "ge"
      ? "Professionelle Personalvermittlung und Executive Search für Unternehmen. Spezialisiert auf die Vermittlung von Top-Talenten in der DACH-Region."
      : "Professional recruitment services connecting businesses with top talent. Specialized in executive search, permanent placement, and talent acquisition.");
  const keywordsFromHero = hero?.metaKeywords
    ? hero.metaKeywords.split(",").map((k: string) => k.trim())
    : null;
  const defaultDeKeywords = [
    "Recruiting Agentur",
    "Personalvermittlung",
    "Executive Search",
    "Headhunting",
    "Talent Acquisition",
    "Personalberatung",
    "DON Recruitment",
    "Fachkräfte Vermittlung",
    "Direktansprache",
    "Top Kandidaten",
  ];
  const defaultEnKeywords = [
    "recruitment services",
    "talent acquisition",
    "executive search",
    "staffing solutions",
    "headhunting",
    "DACH recruitment",
    "DON Recruitment",
    "professional placement",
    "direct approach",
    "top talent hiring",
  ];
  const keywords = keywordsFromHero ?? (lang === "ge" ? defaultDeKeywords : defaultEnKeywords);
  const pathSeg = publicLocalePathSegment(lang);
  const canonical = absoluteUrl(`/${pathSeg}`);
  const { languages } = hreflangAlternates("");

  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: "DON Recruitment",
      locale: lang === "ge" ? "de_DE" : "en_US",
      alternateLocale: lang === "ge" ? "en_US" : "de_DE",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: lang === "ge" ? "DON Recruitment — Professionelle Personalvermittlung" : "DON Recruitment — Professional Talent Acquisition",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/og-image.jpg")],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
  };
}

const pageJsonLd = (baseUrl: string) => ({
  en: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "DON Recruitment — Professional Talent Acquisition",
    provider: { "@type": "Organization", name: "DON Recruitment" },
    description:
      "Professional recruitment services connecting businesses with top talent. Specialized in executive search, permanent placement, and talent acquisition across the DACH region.",
    areaServed: [
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "Austria" },
      { "@type": "Country", name: "Switzerland" },
    ],
    availableLanguage: ["English", "German"],
    url: `${baseUrl}/en`,
    inLanguage: "en-US",
  },
  ge: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "DON Recruitment — Professionelle Personalvermittlung",
    provider: { "@type": "Organization", name: "DON Recruitment" },
    description:
      "Professionelle Personalvermittlung und Executive Search für Unternehmen in der DACH-Region. Spezialisiert auf die Vermittlung von Top-Talenten.",
    areaServed: [
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "Austria" },
      { "@type": "Country", name: "Switzerland" },
    ],
    availableLanguage: ["Deutsch", "Englisch"],
    url: `${baseUrl}/de`,
    inLanguage: "de-DE",
  },
});

export default async function HomeLangPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLangValue } = await params;
  const rawLang = rawLangValue?.toLowerCase();

  if (!SUPPORTED_LANGS.includes(rawLang)) {
    notFound();
  }

  const lang = rawLang === 'de' || rawLang === 'ge' ? 'ge' : 'en';
  const jsonLd = pageJsonLd(SITE_URL)[lang];

  // Fetch FAQ data for structured data
  const faqData = await fetchFAQ(lang);
  const faqs = faqData?.faqs?.slice(0, 10) || []; // Limit to 10 FAQs for schema

  // Generate FAQ schema
  const faqSchema = faqs.length > 0
    ? generateFAQSchema(faqs.map((f: any) => ({ question: f.question, answer: f.answer })))
    : null;

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: lang === 'ge' ? 'Startseite' : 'Home', href: `/${lang}` },
  ]);

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <Navbar />
      <main id="main-content" className="overflow-x-hidden">
        <Hero />
        <HomeBelowFold lang={lang} />
      </main>
    </div>
  );
}
