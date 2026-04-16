import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { DesignSystemProvider } from "@/components/DesignSystemProvider";
import { SITE_URL, absoluteUrl } from "@/lib/site-url";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: {
    google: "vX_t407Cag7AMUBJknopyYEdRElcHuZL_cjKFrBHXH8",
  },
  title: {
    default: "DON Recruitment - Professional Talent Acquisition | Hire Top Talent",
    template: "%s | DON Recruitment",
  },
  description:
    "Professional recruitment services connecting businesses with top talent. Specialized in executive search, permanent placement, and talent acquisition across industries.",
  keywords: [
    "recruitment services",
    "talent acquisition",
    "executive search",
    "staffing solutions",
    "hiring agency",
    "DON Recruitment",
    "Recruiting Agentur",
    "Personalvermittlung",
    "top talent hiring",
    "professional placement",
  ],
  authors: [{ name: "DON Recruitment", url: SITE_URL }],
  creator: "DON Recruitment",
  publisher: "DON Recruitment",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "DON Recruitment",
    title: "DON Recruitment - Professional Talent Acquisition | Hire Top Talent",
    description:
      "Professional recruitment services connecting businesses with top talent. Specialized in executive search, permanent placement, and talent acquisition.",
    url: absoluteUrl("/en"),
    locale: "en_US",
    alternateLocale: ["de_DE"],
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "DON Recruitment — Professional Talent Acquisition" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DON Recruitment - Professional Talent Acquisition | Hire Top Talent",
    description:
      "Professional recruitment services connecting businesses with top talent. Specialized in executive search, permanent placement, and talent acquisition.",
    images: [absoluteUrl("/og-image.jpg")],
  },
  alternates: {
    canonical: absoluteUrl("/en"),
    languages: {
      en: absoluteUrl("/en"),
      de: absoluteUrl("/de"),
      "x-default": absoluteUrl("/en"),
    },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DON Recruitment",
  url: SITE_URL,
  logo: absoluteUrl("/favicon.ico"),
  description:
    "Professional recruitment services connecting businesses with top talent. Specialized in executive search, permanent placement, and talent acquisition.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English", "German"],
  },
  areaServed: [
    { "@type": "Country", name: "Germany" },
    { "@type": "Country", name: "Austria" },
    { "@type": "Country", name: "Switzerland" },
    { "@type": "Place", name: "Worldwide" },
  ],
  sameAs: ["https://linkedin.com/company/don-recruitment", "https://twitter.com/don_recruitment"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DON Recruitment",
  url: SITE_URL,
  inLanguage: ["en-US", "de-DE"],
  publisher: { "@type": "Organization", name: "DON Recruitment" },
};

// Service schema for recruitment services
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Recruitment Services",
  provider: {
    "@type": "Organization",
    name: "DON Recruitment",
    url: SITE_URL,
  },
  areaServed: [
    { "@type": "Country", name: "Germany" },
    { "@type": "Country", name: "Austria" },
    { "@type": "Country", name: "Switzerland" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Recruitment Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Executive Search",
          description: "High-level executive and leadership recruitment",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Permanent Placement",
          description: "Direct hire recruitment for permanent positions",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Talent Acquisition",
          description: "Comprehensive talent sourcing and acquisition services",
        },
      },
    ],
  },
};

// LocalBusiness schema
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "DON Recruitment",
  url: SITE_URL,
  logo: absoluteUrl("/favicon.ico"),
  image: absoluteUrl("/og-image.jpg"),
  description: "Professional recruitment services connecting businesses with top talent",
  sameAs: [
    "https://linkedin.com/company/don-recruitment",
    "https://twitter.com/don_recruitment",
  ],
  priceRange: "€€€",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const headersList = await headers();
  const htmlLang = headersList.get("x-html-lang") || "en";

  return (
    <html lang={htmlLang} suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Performance: Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Security */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-LNDGNQ7Z74" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-LNDGNQ7Z74');
            `,
          }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-C78GJVDGR6" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-C78GJVDGR6');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <DesignSystemProvider defaultTheme="blue">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </DesignSystemProvider>
      </body>
    </html>
  );
}
