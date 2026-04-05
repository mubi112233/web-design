import type { MetadataRoute } from "next";
import { fetchBlog, fetchCaseStudies, normalizeLanguage } from "@/lib/api";
import { SITE_URL } from "@/lib/site-url";

const base = SITE_URL;

const slugify = (title: string) =>
  title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/en`, lastModified: now, changeFrequency: "weekly", priority: 1.0, alternates: { languages: { en: `${base}/en`, de: `${base}/ge`, "x-default": `${base}/en` } } },
    { url: `${base}/ge`, lastModified: now, changeFrequency: "weekly", priority: 1.0, alternates: { languages: { en: `${base}/en`, de: `${base}/ge`, "x-default": `${base}/en` } } },
    { url: `${base}/en/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.85, alternates: { languages: { en: `${base}/en/blog`, de: `${base}/ge/blog`, "x-default": `${base}/en/blog` } } },
    { url: `${base}/ge/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.85, alternates: { languages: { en: `${base}/en/blog`, de: `${base}/ge/blog`, "x-default": `${base}/en/blog` } } },
    { url: `${base}/en/book-meeting`, lastModified: now, changeFrequency: "monthly", priority: 0.8, alternates: { languages: { en: `${base}/en/book-meeting`, de: `${base}/ge/book-meeting` } } },
    { url: `${base}/ge/book-meeting`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/en/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7, alternates: { languages: { en: `${base}/en/contact`, de: `${base}/ge/contact` } } },
    { url: `${base}/ge/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  // Blog posts — API returns { posts: BlogPost[] }, BlogPost has blogId + title + slug
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const [enData, geData] = await Promise.all([
      fetchBlog(normalizeLanguage("en")),
      fetchBlog(normalizeLanguage("ge")),
    ]);
    const enPosts = Array.isArray((enData as any)?.posts) ? (enData as any).posts : [];
    const gePosts = Array.isArray((geData as any)?.posts) ? (geData as any).posts : [];
    blogRoutes = [
      ...enPosts.map((p: any) => ({
        url: `${base}/en/blog/${p.slug || `${slugify(p.title)}-${p.blogId}`}`,
        lastModified: p.publishedAt || p.updatedAt ? new Date(p.publishedAt || p.updatedAt) : now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
      ...gePosts.map((p: any) => ({
        url: `${base}/ge/blog/${p.slug || `${slugify(p.title)}-${p.blogId}`}`,
        lastModified: p.publishedAt || p.updatedAt ? new Date(p.publishedAt || p.updatedAt) : now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
    ];
  } catch {}

  // Case studies — API returns { caseStudies: CaseStudy[] }, uses caseStudyId + title
  let caseRoutes: MetadataRoute.Sitemap = [];
  try {
    const [enData, geData] = await Promise.all([
      fetchCaseStudies(normalizeLanguage("en")),
      fetchCaseStudies(normalizeLanguage("ge")),
    ]);
    const enStudies = Array.isArray((enData as any)?.caseStudies) ? (enData as any).caseStudies : [];
    const geStudies = Array.isArray((geData as any)?.caseStudies) ? (geData as any).caseStudies : [];
    caseRoutes = [
      ...enStudies.map((s: any) => ({
        url: `${base}/en/case-study/${slugify(s.title)}-${s.caseStudyId}`,
        lastModified: s.updatedAt ? new Date(s.updatedAt) : now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
      ...geStudies.map((s: any) => ({
        url: `${base}/ge/case-study/${slugify(s.title)}-${s.caseStudyId}`,
        lastModified: s.updatedAt ? new Date(s.updatedAt) : now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ];
  } catch {}

  return [...staticRoutes, ...blogRoutes, ...caseRoutes];
}
