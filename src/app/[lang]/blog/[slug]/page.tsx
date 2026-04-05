import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchApiData, API_ENDPOINTS, normalizeLanguage } from "@/lib/api";
import BlogPostClient from "./BlogPostClient";
import { generateBlogStructuredData } from "@/lib/structured-data";
import { absoluteUrl, hreflangAlternates, localePathSegment } from "@/lib/site-url";

interface BlogPost {
  blogId: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

async function getBlogPost(lang: string, slug: string): Promise<BlogPost | null> {
  try {
    const postId = Number(slug.split("-").pop());
    if (isNaN(postId)) return null;
    const data = await fetchApiData<any>(API_ENDPOINTS.BLOGS, normalizeLanguage(lang));
    const posts: BlogPost[] = Array.isArray(data?.posts) ? data.posts : Array.isArray(data?.blogs) ? data.blogs : [];
    return posts.find((p) => p.blogId === postId) ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = await getBlogPost(lang, slug);

  if (!post) return {};

  const title = `${post.title} | DON VA`;
  const description = post.excerpt?.substring(0, 160) || "";
  const seg = localePathSegment(lang);
  const pathAfterLocale = `blog/${slug}`;
  const canonical = absoluteUrl(`/${seg}/${pathAfterLocale}`);
  const { languages } = hreflangAlternates(pathAfterLocale);

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      locale: seg === "ge" ? "de_DE" : "en_US",
      alternateLocale: seg === "ge" ? "en_US" : "de_DE",
      siteName: "DON VA",
      images: post.image ? [{ url: post.image, width: 1200, height: 630, alt: post.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: rawLang, slug } = await params;
  const lang = rawLang === "de" || rawLang === "ge" ? "ge" : "en";
  const post = await getBlogPost(lang, slug);

  if (!post) notFound();

  const structuredData = generateBlogStructuredData({
    title: post.title,
    description: post.excerpt,
    publishedAt: post.date,
    updatedAt: post.date,
    image: post.image,
    url: absoluteUrl(`/${localePathSegment(lang)}/blog/${slug}`),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <BlogPostClient post={post} lang={lang} />
    </>
  );
}
