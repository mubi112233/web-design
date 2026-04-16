"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SPACING } from "@/lib/constants";
import { siteConfig, normalizeLocale, localizedPath } from "@/lib/site-config";

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const lang = normalizeLocale(pathname);
  const isGe = lang === "ge";

  const links = {
    en: {
      company: "Company",
      services: "Services",
      resources: "Resources",
      nav: [
        { label: "Home", href: "/en" },
        { label: "Book a Meeting", href: "/en/book-meeting" },
        { label: "Contact Us", href: "/en/contact" },
      ],
      serviceLinks: [
        { label: "Virtual Assistants", href: "/en/#services" },
        { label: "Recruitment Services", href: "/en/#services" },
        { label: "Team Scaling", href: "/en/#services" },
        { label: "Quality Control", href: "/en/#services" },
        { label: "Pricing Plans", href: "/en/#pricing" },
      ],
      resourceLinks: [
        { label: "Blog", href: "/en/blog" },
        { label: "Case Studies", href: "/en/#case-studies" },
        { label: "How It Works", href: "/en/#how-it-works" },
        { label: "FAQ", href: "/en/#faq" },
        { label: "Testimonials", href: "/en/#testimonials" },
      ],
      tagline: "Professional virtual assistant staffing to scale your team and reduce operational costs.",
      rights: "All rights reserved.",
    },
    ge: {
      company: "Unternehmen",
      services: "Dienstleistungen",
      resources: "Ressourcen",
      nav: [
        { label: "Startseite", href: "/de" },
        { label: "Meeting buchen", href: "/de/book-meeting" },
        { label: "Kontakt", href: "/de/contact" },
      ],
      serviceLinks: [
        { label: "Virtuelle Assistenten", href: "/de/#services" },
        { label: "Recruitment-Services", href: "/de/#services" },
        { label: "Team-Skalierung", href: "/de/#services" },
        { label: "Qualitätskontrolle", href: "/de/#services" },
        { label: "Preispläne", href: "/de/#pricing" },
      ],
      resourceLinks: [
        { label: "Blog", href: "/de/blog" },
        { label: "Fallstudien", href: "/de/#case-studies" },
        { label: "So funktioniert es", href: "/de/#how-it-works" },
        { label: "Häufige Fragen", href: "/de/#faq" },
        { label: "Kundenstimmen", href: "/de/#testimonials" },
      ],
      tagline: "Professionelle virtuelle Assistenten zur Skalierung Ihres Teams und Reduzierung der Betriebskosten.",
      rights: "Alle Rechte vorbehalten.",
    },
  };

  const c = links[lang];

  return (
    <footer className="w-full bg-muted/50 border-t border-border mt-8">
      <div className={`container mx-auto ${SPACING.container} py-12 sm:py-16`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href={`/${lang}`} className="flex items-center gap-2 mb-4 group">
              <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-black text-lg">{siteConfig.brandMarkText}</span>
              </div>
              <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{siteConfig.brandName}</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{c.tagline}</p>
            <Link
              href={localizedPath(lang, siteConfig.routes.bookMeeting)}
              className="inline-block px-5 py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors"
            >
              {isGe ? "Jetzt starten" : "Get Started"}
            </Link>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">{c.company}</h3>
            <ul className="space-y-2.5">
              {c.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">{c.services}</h3>
            <ul className="space-y-2.5">
              {c.serviceLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">{c.resources}</h3>
            <ul className="space-y-2.5">
              {c.resourceLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} DON Recruitment. {c.rights}</p>
          <div className="flex items-center gap-4">
            <Link href={localizedPath(lang, siteConfig.routes.blog)} className="hover:text-primary transition-colors">Blog</Link>
            <Link href={localizedPath(lang, siteConfig.routes.contact)} className="hover:text-primary transition-colors">{isGe ? "Kontakt" : "Contact"}</Link>
            <Link href={localizedPath(lang, siteConfig.routes.bookMeeting)} className="hover:text-primary transition-colors">{isGe ? "Meeting buchen" : "Book Meeting"}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
