import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import "@/styles/main.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { DesignSystemProvider } from "@/components/DesignSystemProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
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
  metadataBase: new URL("https://don-seo.com"),
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
  ],
  authors: [{ name: "DON VA", url: "https://don-seo.com" }],
  creator: "DON VA",
  publisher: "DON VA",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    siteName: "DON VA",
    title: "DON VA - Premium Virtual Assistants | Save 70% on Operations",
    description:
      "Hire pre-vetted, German-speaking virtual assistants for 80% less than local hires.",
    url: "https://don-seo.com",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "SEO Pro" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DON VA - Premium Virtual Assistants | Save 70% on Operations",
    description:
      "Hire pre-vetted, German-speaking virtual assistants for 80% less than local hires.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://don-seo.com/en",
    languages: {
      en: "https://don-seo.com/en",
      de: "https://don-seo.com/ge",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DON VA",
  url: "https://don-seo.com",
  logo: "https://don-seo.com/favicon.ico",
  description:
    "Pre-vetted, German-speaking virtual assistants for 80% less than local hires.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English", "German"],
  },
  sameAs: [
    "https://linkedin.com/company/don-va",
    "https://twitter.com/don_va",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-LNDGNQ7Z74"></script>
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
