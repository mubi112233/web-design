import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import "@/styles/main.css";
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
    google: "l93HxOLqUBDjtuNfHM7OsWQd7i9MfSJo1fV_yaLAZrE",
  },
  title: {
    default: "DON VA - Premium Virtual Assistants | Save 70% on Operations",
    template: "%s | DON VA",
  },
  description:
    "Hire pre-vetted, German-speaking virtual assistants for 80% less than local hires. Scale your team in days, not months.",
  keywords: [
    "virtual assistant",
    "VA services",
    "German speaking VA",
    "remote assistant",
    "business scaling",
    "DON VA",
    "virtuelle assistenz",
    "deutschsprachiger VA",
  ],
  authors: [{ name: "DON VA", url: SITE_URL }],
  creator: "DON VA",
  publisher: "DON VA",
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
    siteName: "DON VA",
    title: "DON VA - Premium Virtual Assistants | Save 70% on Operations",
    description:
      "Hire pre-vetted, German-speaking virtual assistants for 80% less than local hires.",
    url: absoluteUrl("/en"),
    locale: "en_US",
    alternateLocale: ["de_DE"],
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "DON VA — Virtual assistant services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DON VA - Premium Virtual Assistants | Save 70% on Operations",
    description:
      "Hire pre-vetted, German-speaking virtual assistants for 80% less than local hires.",
    images: [absoluteUrl("/og-image.jpg")],
  },
  alternates: {
    canonical: absoluteUrl("/en"),
    languages: {
      en: absoluteUrl("/en"),
      de: absoluteUrl("/ge"),
      "x-default": absoluteUrl("/en"),
    },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DON VA",
  url: SITE_URL,
  logo: absoluteUrl("/favicon.ico"),
  description:
    "Pre-vetted, German-speaking virtual assistants for growing businesses in the DACH region and worldwide.",
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
  sameAs: ["https://linkedin.com/company/don-va", "https://twitter.com/don_va"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DON VA",
  url: SITE_URL,
  inLanguage: ["en-US", "de-DE"],
  publisher: { "@type": "Organization", name: "DON VA" },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const headersList = await headers();
  const htmlLang = headersList.get("x-html-lang") || "en";

  return (
    <html lang={htmlLang} suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <head>
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
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
