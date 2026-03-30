"use client";

import { motion } from "framer-motion";
import { Shield, Users, Clock, Lock } from "lucide-react";
import { usePathname } from "next/navigation";
import { SPACING } from "@/lib/constants";

const cards = {
  en: [
    {
      icon: Shield,
      title: "Up to 70% Cost Reduction",
      description: "Save on salaries, overhead, and training while maintaining top quality.",
    },
    {
      icon: Users,
      title: "Native Quality Control",
      description: "Every deliverable is reviewed by a native-level supervisor for accuracy.",
    },
    {
      icon: Clock,
      title: "24h Replacement Guarantee",
      description: "If something isn't the right fit, we'll replace your VA within 24 hours.",
    },
    {
      icon: Lock,
      title: "Confidential & Secure",
      description: "Strict NDAs and secure processes to protect your business data.",
    },
  ],
  ge: [
    {
      icon: Shield,
      title: "Bis zu 70% Kosteneinsparung",
      description: "Sparen Sie bei Gehältern, Gemeinkosten und Schulungen bei gleichbleibend hoher Qualität.",
    },
    {
      icon: Users,
      title: "Native Qualitätskontrolle",
      description: "Jede Lieferung wird von einem muttersprachlichen Supervisor auf Genauigkeit geprüft.",
    },
    {
      icon: Clock,
      title: "24h Ersatzgarantie",
      description: "Wenn etwas nicht passt, ersetzen wir Ihren VA innerhalb von 24 Stunden.",
    },
    {
      icon: Lock,
      title: "Vertraulich & Sicher",
      description: "Strenge NDAs und sichere Prozesse zum Schutz Ihrer Geschäftsdaten.",
    },
  ],
};

export const WhyChooseUsCards = () => {
  const pathname = usePathname();
  const isGe = pathname.startsWith("/ge") || pathname.startsWith("/de");
  const lang = isGe ? "ge" : "en";
  const items = cards[lang];

  return (
    <motion.section
      className={`relative ${SPACING.section} ${SPACING.sideMargin} bg-background`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      <div className={`container mx-auto ${SPACING.container}`}>
        {/* Heading */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-10 md:mb-12 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {isGe ? (
            <>Warum <span className="text-gold">uns wählen</span></>
          ) : (
            <>Why <span className="text-gold">Choose Us</span></>
          )}
        </motion.h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className="relative bg-card border border-border/60 rounded-2xl p-6 sm:p-7 hover:border-gold/50 hover:shadow-[0_20px_60px_-15px_hsl(45_80%_55%/0.2)] transition-all duration-500 group overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                <div className="relative z-10">
                  {/* Icon box */}
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 leading-snug group-hover:text-gold transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Corner accent */}
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gold/0 group-hover:border-gold/30 rounded-br-2xl transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};
