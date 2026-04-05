import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import { absoluteUrl, hreflangAlternates, localePathSegment } from "@/lib/site-url";

const SUPPORTED_LANGS = ["en", "ge", "de"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const seg = localePathSegment(raw);
  const isDE = seg === "ge";
  const title = isDE ? "Kontakt — DON VA | Virtuelle Assistenten" : "Contact — DON VA | Virtual Assistants";
  const description = isDE
    ? "Kontaktieren Sie DON VA für Beratung zu deutschsprachigen virtuellen Assistenten und Remote-Teams."
    : "Contact DON VA for a consultation about German-speaking virtual assistants and remote team scaling.";
  const { languages } = hreflangAlternates("contact");
  const canonical = absoluteUrl(`/${seg}/contact`);

  return {
    title,
    description,
    keywords: isDE
      ? ["kontakt DON VA", "virtuelle assistenz anfrage", "VA beratung"]
      : ["contact DON VA", "virtual assistant inquiry", "VA consultation"],
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      locale: isDE ? "de_DE" : "en_US",
      alternateLocale: isDE ? "en_US" : "de_DE",
      siteName: "DON VA",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "DON VA" }],
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

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!SUPPORTED_LANGS.includes(rawLang?.toLowerCase())) notFound();
  const lang = rawLang === "ge" || rawLang === "de" ? "ge" : "en";
  return <ContactClient lang={lang} />;
}
