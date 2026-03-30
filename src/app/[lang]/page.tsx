import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Navbar } from "@/components/Navbar";
import { HomeBelowFold } from "@/components/HomeBelowFold.client";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchApiData, API_ENDPOINTS, normalizeLanguage } from "@/lib/api";

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

  const title = hero?.metaTitle || (lang === 'ge' ? 'DON VA – Virtuelle Assistenten' : 'DON VA – Virtual Assistant Services');
  const description = hero?.metaDescription || (lang === 'ge'
    ? 'Geprüfte, deutschsprachige virtuelle Assistenten für 80% weniger als lokale Einstellungen.'
    : 'Hire pre-vetted, German-speaking virtual assistants for 80% less than local hires.');
  const keywords = hero?.metaKeywords || '';
  const canonical = `https://don-va.com/${lang === 'ge' ? 'ge' : 'en'}`;

  return {
    title,
    description,
    ...(keywords && { keywords: keywords.split(',').map((k: string) => k.trim()) }),
    alternates: {
      canonical,
      languages: { en: 'https://don-va.com/en', de: 'https://don-va.com/ge' },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      locale: lang === 'ge' ? 'de_DE' : 'en_US',
      alternateLocale: lang === 'ge' ? 'en_US' : 'de_DE',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

const pageJsonLd = {
  en: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "DON VA Virtual Assistant Services",
    provider: { "@type": "Organization", name: "DON VA" },
    description: "Pre-vetted, German-speaking virtual assistants for 80% less than local hires.",
    areaServed: "Worldwide",
    availableLanguage: ["English", "German"],
    url: "https://don-va.com/en",
  },
  ge: {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "DON VA Virtuelle Assistenten",
    provider: { "@type": "Organization", name: "DON VA" },
    description: "Geprüfte, deutschsprachige virtuelle Assistenten für 80% weniger als lokale Einstellungen.",
    areaServed: "Worldwide",
    availableLanguage: ["Deutsch", "Englisch"],
    url: "https://don-va.com/ge",
  },
};

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
  const jsonLd = pageJsonLd[lang];

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main id="main-content">
        <div className="px-[50px] max-sm:px-4">
          <Hero />
        </div>
        <HomeBelowFold lang={lang} />
      </main>
    </div>
  );
}
