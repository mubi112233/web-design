import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { HomeBelowFold } from "@/components/HomeBelowFold.hybrid";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchApiData, API_ENDPOINTS, normalizeLanguage } from "@/lib/api";
import { SPACING } from "@/lib/constants";
import { SITE_URL, absoluteUrl, hreflangAlternates } from "@/lib/site-url";

export const revalidate = 3600;

const SUPPORTED_LANGS = ['en', 'ge', 'de'];

async function getHeroMeta(lang: string) {
  try {
    const data = await fetchApiData<any>(API_ENDPOINTS.HERO, normalizeLanguage(lang));
    return data?.hero ?? null;
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
      ? "DON VA – Virtuelle Assistenten & Remote-Teams | Geprüfte VAs"
      : "DON VA – Virtual Assistant Services | German-Speaking VAs");
  const description =
    hero?.metaDescription ||
    (lang === "ge"
      ? "Geprüfte, deutschsprachige virtuelle Assistenten für deutlich weniger als lokale Einstellungen. Skalieren Sie Ihr Team schnell und sicher — ideal für DACH."
      : "Hire pre-vetted, German-speaking virtual assistants for far less than local hires. Scale your team in days with quality control built in.");
  const keywordsFromHero = hero?.metaKeywords
    ? hero.metaKeywords.split(",").map((k: string) => k.trim())
    : null;
  const defaultDeKeywords = [
    "virtuelle assistenz",
    "virtueller assistent deutsch",
    "deutschsprachiger VA",
    "remote assistent",
    "outsourcing deutschland",
    "virtuelle assistenz agentur",
    "DON VA",
  ];
  const defaultEnKeywords = [
    "virtual assistant",
    "German speaking VA",
    "remote assistant",
    "outsource admin",
    "DACH business support",
    "DON VA",
  ];
  const keywords = keywordsFromHero ?? (lang === "ge" ? defaultDeKeywords : defaultEnKeywords);
  const pathSeg = lang === "ge" ? "ge" : "en";
  const canonical = absoluteUrl(`/${pathSeg}`);
  const { languages } = hreflangAlternates("");

  return {
    title,
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
      siteName: "DON VA",
      locale: lang === "ge" ? "de_DE" : "en_US",
      alternateLocale: lang === "ge" ? "en_US" : "de_DE",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: lang === "ge" ? "DON VA — Virtuelle Assistenten" : "DON VA — Virtual assistant services",
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
    name: "DON VA Virtual Assistant Services",
    provider: { "@type": "Organization", name: "DON VA" },
    description:
      "Pre-vetted, German-speaking virtual assistants for growing teams — strong fit for DACH and global companies.",
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
    name: "DON VA Virtuelle Assistenten",
    provider: { "@type": "Organization", name: "DON VA" },
    description:
      "Geprüfte, deutschsprachige virtuelle Assistenten für Unternehmen in DACH — schnelle Einarbeitung und laufende Qualitätskontrolle.",
    areaServed: [
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "Austria" },
      { "@type": "Country", name: "Switzerland" },
    ],
    availableLanguage: ["Deutsch", "Englisch"],
    url: `${baseUrl}/ge`,
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

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main id="main-content">
        <div className={SPACING.container}>
          <Hero />
        </div>
        <HomeBelowFold lang={lang} />
      </main>
    </div>
  );
}
