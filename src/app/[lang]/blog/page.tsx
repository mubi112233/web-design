import type { Metadata } from "next";
import { BlogListingClient } from "./BlogListingClient";
import { absoluteUrl, hreflangAlternates, localePathSegment } from "@/lib/site-url";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const seg = localePathSegment(raw);
  const { languages } = hreflangAlternates("blog");
  const canonical = absoluteUrl(`/${seg}/blog`);

  const isDe = seg === "ge";
  const title = isDe
    ? "Blog — Tipps zu virtuellen Assistenten & Remote-Teams | DON VA"
    : "Blog — Virtual Assistant Tips & Remote Work | DON VA";
  const description = isDe
    ? "Einblicke, Tipps und Best Practices zu virtuellen Assistenten, Outsourcing und skalierbaren Teams — auf Deutsch."
    : "Insights, tips, and best practices for virtual assistants, outsourcing, and scalable remote teams.";

  return {
    title,
    description,
    keywords: isDe
      ? [
          "virtuelle assistenz blog",
          "virtueller assistent tipps",
          "remote team deutsch",
          "outsourcing VA",
          "DON VA",
        ]
      : [
          "virtual assistant blog",
          "remote team tips",
          "VA outsourcing",
          "scale with VAs",
          "DON VA",
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

export default function BlogPage() {
  return <BlogListingClient />;
}
