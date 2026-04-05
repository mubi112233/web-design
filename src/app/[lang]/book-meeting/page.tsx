import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BookMeetingClient from "./BookMeetingClient";
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
  const title = isDE ? "Termin buchen — Kostenlose Beratung | DON VA" : "Book a Meeting — Free Consultation | DON VA";
  const description = isDE
    ? "Vereinbaren Sie eine kostenlose Beratung mit DON VA und erfahren Sie, wie deutschsprachige virtuelle Assistenten Ihr Team entlasten."
    : "Schedule a free consultation with DON VA and learn how our virtual assistants can help scale your business.";
  const { languages } = hreflangAlternates("book-meeting");
  const canonical = absoluteUrl(`/${seg}/book-meeting`);

  return {
    title,
    description,
    keywords: isDE
      ? ["beratung termin", "virtuelle assistenz gespräch", "DON VA termin"]
      : ["book consultation", "VA discovery call", "DON VA meeting"],
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

export default async function BookMeetingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (!SUPPORTED_LANGS.includes(rawLang?.toLowerCase())) notFound();
  return <BookMeetingClient />;
}
