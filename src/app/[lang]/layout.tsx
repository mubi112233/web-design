/**
 * Locale segment layout. Per-page SEO (canonical, hreflang) lives in each route’s
 * generateMetadata so nested URLs are not forced to the homepage.
 */
export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  await params;
  return <>{children}</>;
}
