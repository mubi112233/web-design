import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ContactClient from "./ContactClient";

const SUPPORTED_LANGS = ["en", "ge", "de"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isDE = lang === "ge" || lang === "de";
  const title = isDE ? "Kontakt - Donva" : "Contact Us - Donva";
  const description = isDE
    ? "Nehmen Sie Kontakt mit Donva auf. Wir helfen Ihnen, den richtigen virtuellen Assistenten zu finden."
    : "Get in touch with Donva. We'll help you find the right virtual assistant for your business needs.";
  return {
    title,
    description,
    alternates: { canonical: "https://don-va.com/contact" },
    openGraph: { title, description, url: "https://don-va.com/contact", type: "website" },
    twitter: { card: "summary", title, description },
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
