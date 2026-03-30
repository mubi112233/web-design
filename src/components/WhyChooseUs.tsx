"use client";

import { motion } from "framer-motion";
import { Award, Target, Zap, Shield, HeartHandshake, TrendingUp, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import { fetchWhyChooseUs } from "@/lib/api";
import { SPACING } from "@/lib/constants";
import { usePathname } from "next/navigation";

interface WhyChooseUsItem {
  icon: string;
  title: string;
  description: string;
}

interface WhyChooseUsData {
  badge: string;
  heading: string;
  description: string;
  items: WhyChooseUsItem[];
}

// Icon mapping helper
const getIconComponent = (iconName: string) => {
  const IconComponent = (LucideIcons as any)[iconName];
  return IconComponent || Award; // Fallback to Award if icon not found
};

export const WhyChooseUs = () => {
  const [whyChooseUsData, setWhyChooseUsData] = useState<WhyChooseUsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

const pathname = usePathname();
  const currentLang = pathname.startsWith('/ge') || pathname.startsWith('/de') ? 'ge' : 'en';

  const isGe = currentLang === 'ge';

  const fallbackData: WhyChooseUsData = isGe ? {
    badge: "Warum wir",
    heading: "Was uns <span class=\"text-gold\">auszeichnet</span>",
    description: "Deutschsprachige Talente, native Qualitätskontrolle, schnelles Onboarding und eine Null‑Risiko‑Garantie.",
    items: [
      { icon: "Target", title: "Sorgfältig geprüfte Fachkräfte", description: "Jeder virtuelle Assistent wird sorgfältig geprüft und getestet, um unsere hohen Qualitätsstandards zu erfüllen." },
      { icon: "Shield", title: "Sicher & vertraulich", description: "Ihre Daten und Geschäftsinformationen sind durch Sicherheitsmaßnahmen auf Unternehmensebene geschützt." },
      { icon: "Zap", title: "Blitzschnelles Onboarding", description: "Starten Sie innerhalb von 24 Stunden. Unser optimierter Prozess stellt sicher, dass Sie schnell den richtigen Assistenten haben." },
      { icon: "HeartHandshake", title: "Dedizierter Support", description: "Unser Team ist immer verfügbar, um eine reibungslose Zusammenarbeit zu gewährleisten und Anliegen zu klären." },
      { icon: "TrendingUp", title: "Skalierbare Lösungen", description: "Skalieren Sie flexibel nach oben oder unten, ohne den Aufwand traditioneller Einstellungen." },
      { icon: "Award", title: "Bewährte Erfolgsbilanz", description: "Von 200+ Unternehmen vertraut mit einer Kundenzufriedenheitsrate von 95%." },
    ]
  } : {
    badge: "Why Choose Us",
    heading: "The Perfect Virtual Assistant Solution",
    description: "Experience the difference with our professional virtual assistants who are trained to deliver exceptional results.",
    items: [
      { icon: "Target", title: "Expertly Vetted Professionals", description: "Every virtual assistant is carefully screened and tested to ensure they meet our high standards of excellence." },
      { icon: "Shield", title: "Secure & Confidential", description: "Your data and business information are protected with enterprise-grade security measures." },
      { icon: "Zap", title: "Lightning Fast Onboarding", description: "Get started within 24 hours. Our streamlined process ensures you have the right assistant quickly." },
      { icon: "HeartHandshake", title: "Dedicated Support", description: "Our team is always available to ensure smooth collaboration and address any concerns." },
      { icon: "TrendingUp", title: "Scalable Solutions", description: "Easily scale up or down based on your business needs without the overhead of traditional hiring." },
      { icon: "Award", title: "Proven Track Record", description: "Trusted by 200+ businesses with a 95% client satisfaction rate." },
    ]
  };

  // Fetch Why Choose Us data from API
  useEffect(() => {
    const fetchWhyChooseUsData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchWhyChooseUs(currentLang);
        setWhyChooseUsData(data || fallbackData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
        setWhyChooseUsData(fallbackData);
      } finally {
        setLoading(false);
      }
    };
    fetchWhyChooseUsData();
  }, []);

  if (loading) {
    return (
      <section className="py-8 sm:py-10 md:py-14 lg:py-16 bg-background text-foreground z-30 overflow-hidden min-h-[500px]">
        <div className={`container mx-auto ${SPACING.container}`}>

          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-gold" />
          </div>
        </div>
      </section>
    );
  }

  if (!whyChooseUsData) return null;

  const badge = whyChooseUsData.badge;
  const heading = whyChooseUsData.heading;
  const description = whyChooseUsData.description;
  const items = whyChooseUsData.items;

  return (
    <motion.section 
      className="relative py-8 sm:py-10 md:py-12 lg:py-14 bg-gradient-to-b from-background via-muted/30 to-background z-40"
      initial={{ opacity: 0, y: 200 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      <div className={`container mx-auto ${SPACING.container}`}>
        <motion.div 
          className="mb-10 sm:mb-12 md:mb-16 lg:mb-20 text-left"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-gold text-foreground text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">
            {badge}
          </span>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5 md:mb-6 text-foreground px-2"
            dangerouslySetInnerHTML={{ __html: heading }}
          />
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed px-2">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
          {items.map((item, index) => {
            const IconComponent = getIconComponent(item.icon);
            return (
            <motion.div 
              key={index}
              className="relative bg-card border-2 border-gold/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 hover:border-gold hover:shadow-[0_25px_80px_-20px_hsl(45_80%_55%/0.4)] transition-all duration-700 group overflow-hidden"
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.6, -0.05, 0.01, 0.99] }}
              whileHover={{ y: -8, scale: 1.03 }}
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10">
                <motion.div 
                  className="mb-4 sm:mb-5 md:mb-6 inline-flex p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-foreground group-hover:scale-110 transition-all duration-500 shadow-[0_10px_30px_-10px_hsl(45_80%_55%/0.4)]"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <IconComponent className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground group-hover:text-gold transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
              
              {/* Corner decoration */}
              <div className="absolute bottom-0 right-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-b-2 border-r-2 border-gold/0 group-hover:border-gold/50 rounded-br-xl sm:rounded-br-2xl transition-all duration-700" />
            </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};
