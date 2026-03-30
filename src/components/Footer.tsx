"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const isGe = pathname.startsWith("/ge") || pathname.startsWith("/de");
  const lang = isGe ? "ge" : "en";

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
        { label: "Social Media Management", href: "/en/#services" },
        { label: "Customer Support VAs", href: "/en/#services" },
        { label: "Back-Office & Admin", href: "/en/#services" },
        { label: "SEO & Content", href: "/en/#services" },
        { label: "Pricing Plans", href: "/en/#pricing" },
      ],
      resourceLinks: [
        { label: "Blog", href: "/en/blog" },
        { label: "Case Studies", href: "/en/#case-studies" },
        { label: "How It Works", href: "/en/#how-it-works" },
        { label: "FAQ", href: "/en/#faq" },
        { label: "Testimonials", href: "/en/#testimonials" },
      ],
      tagline: "Pre-vetted, German-speaking virtual assistants for 80% less than local hires.",
      rights: "All rights reserved.",
    },
    ge: {
      company: "Unternehmen",
      services: "Dienstleistungen",
      resources: "Ressourcen",
      nav: [
        { label: "Startseite", href: "/ge" },
        { label: "Meeting buchen", href: "/ge/book-meeting" },
        { label: "Kontakt", href: "/ge/contact" },
      ],
      serviceLinks: [
        { label: "Social Media Management", href: "/ge/#services" },
        { label: "Kundensupport VAs", href: "/ge/#services" },
        { label: "Back-Office & Admin", href: "/ge/#services" },
        { label: "SEO & Content", href: "/ge/#services" },
        { label: "Preispläne", href: "/ge/#pricing" },
      ],
      resourceLinks: [
        { label: "Blog", href: "/ge/blog" },
        { label: "Fallstudien", href: "/ge/#case-studies" },
        { label: "So funktioniert es", href: "/ge/#how-it-works" },
        { label: "FAQ", href: "/ge/#faq" },
        { label: "Testimonials", href: "/ge/#testimonials" },
      ],
      tagline: "Geprüfte, deutschsprachige virtuelle Assistenten für 80% weniger als lokale Einstellungen.",
      rights: "Alle Rechte vorbehalten.",
    },
  };

  const c = links[lang];

  return (
    <footer className="w-full bg-card border-t border-border/50 mt-8">
      <div className="container mx-auto px-[50px] max-sm:px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href={`/${lang}`} className="flex items-center gap-2 mb-4 group">
              <div className="w-9 h-9 bg-gold rounded-lg flex items-center justify-center">
                <span className="text-black font-black text-lg">D</span>
              </div>
              <span className="text-xl font-bold text-foreground group-hover:text-gold transition-colors">Don Va</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{c.tagline}</p>
            <Link
              href={`/${lang}/book-meeting`}
              className="inline-block px-5 py-2.5 bg-gold text-black text-sm font-bold rounded-lg hover:bg-yellow-500 transition-colors"
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
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-gold transition-colors">
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
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-gold transition-colors">
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
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-gold transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Don Va. {c.rights}</p>
          <div className="flex items-center gap-4">
            <Link href={`/${lang}/blog`} className="hover:text-gold transition-colors">Blog</Link>
            <Link href={`/${lang}/contact`} className="hover:text-gold transition-colors">{isGe ? "Kontakt" : "Contact"}</Link>
            <Link href={`/${lang}/book-meeting`} className="hover:text-gold transition-colors">{isGe ? "Meeting buchen" : "Book Meeting"}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
