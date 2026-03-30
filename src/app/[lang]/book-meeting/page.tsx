import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BookMeetingClient from "./BookMeetingClient";

const SUPPORTED_LANGS = ["en", "ge", "de"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  await params;
  const description =
    "Schedule a free consultation with Donva. Find out how our virtual assistants can help scale your business.";
  return {
    title: "Book a Meeting - Donva",
    description,
    alternates: { canonical: "https://don-va.com/book-meeting" },
    openGraph: {
      title: "Book a Meeting - Donva",
      description,
      url: "https://don-va.com/book-meeting",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: "Book a Meeting - Donva",
      description,
    },
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
