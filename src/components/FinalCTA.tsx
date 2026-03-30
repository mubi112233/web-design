"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Sparkles, Clock, CheckCircle2, Users, TrendingUp, Award, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { SPACING } from "@/lib/constants";
import { usePathname } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://api.don-va.com';

const fallbackCopy = {
  en: {
    badge: "Ready to Scale?",
    headlineLine1: "Start with",
    headlineLine2: "DON VA Today",
    subheading: "Book a free consultation and see how we can transform your operations in 48 hours.",
    benefits: ["No setup fees", "14-day trial", "Native managers", "24/7 support"],
    stats: { activeClients: "200+", avgRoi: "3.5x", satisfaction: "98%", fastStart: "48h" },
    statsLabels: { activeClients: "Active Clients", avgRoi: "Avg. ROI", satisfaction: "Satisfaction", fastStart: "Fast Start" },
    trust: {
      consultationTime: "30 min", consultationLabel: "Free consultation",
      responseTime: "Online now", responseLabel: "Response in < 1h",
      noCommitment: "No commitment", noCommitmentLabel: "Cancel anytime",
      footer: "No credit card required. Start your free consultation today.",
    },
    primaryCta: "Book Free Consultation",
    secondaryCta: "Chat on WhatsApp",
  },
  ge: {
    badge: "Bereit zu skalieren?",
    headlineLine1: "Starten Sie noch heute",
    headlineLine2: "mit DON VA",
    subheading: "Buchen Sie eine kostenlose Beratung und erleben Sie, wie wir Ihre Abläufe in 48 Stunden transformieren.",
    benefits: ["Keine Einrichtungsgebühren", "14-Tage-Test", "Native Manager", "24/7 Support"],
    stats: { activeClients: "200+", avgRoi: "3.5x", satisfaction: "98%", fastStart: "48h" },
    statsLabels: { activeClients: "Aktive Kunden", avgRoi: "Ø ROI", satisfaction: "Zufriedenheit", fastStart: "Schnellstart" },
    trust: {
      consultationTime: "30 Min.", consultationLabel: "Kostenlose Beratung",
      responseTime: "Jetzt online", responseLabel: "Antwort in < 1 Std.",
      noCommitment: "Keine Bindung", noCommitmentLabel: "Jederzeit kündbar",
      footer: "Keine Kreditkarte erforderlich. Starten Sie noch heute Ihre kostenlose Beratung.",
    },
    primaryCta: "Kostenlose Beratung buchen",
    secondaryCta: "Per WhatsApp chatten",
  },
};

const getLangFromPath = (): string => {
  if (typeof window === "undefined") return "en";
  const match = window.location.pathname.match(/^\/(en|ge|de)\b/i);
  const raw = match?.[1]?.toLowerCase() || "en";
  return raw === "de" ? "ge" : raw;
};

interface FinalCTAData {
  badge: string;
  headlineLine1: string;
  headlineLine2: string;
  subheading: string;
  benefits: string[];
  stats: { activeClients: string; avgRoi: string; satisfaction: string; fastStart: string };
  trust: {
    consultationTime: string; consultationLabel: string;
    responseTime: string; responseLabel: string;
    noCommitment: string; noCommitmentLabel: string;
    footer: string;
  };
  ctas: { primaryLabel: string; primaryHref: string; secondaryLabel: string; secondaryHref: string };
  whatsAppNumber: string;
}

export const FinalCTA = () => {
  const pathname = usePathname();
  const currentLang = pathname.startsWith('/ge') || pathname.startsWith('/de') ? 'ge' : 'en';
  const [apiData, setApiData] = useState<FinalCTAData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/final-cta?lang=${currentLang}`);
        if (!res.ok) throw new Error("fetch failed");
        const data = await res.json();
        setApiData(data.finalCta || null);
      } catch {
        setApiData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentLang]);

  const fb = fallbackCopy[currentLang as keyof typeof fallbackCopy] || fallbackCopy.en;

  const badge = apiData?.badge || fb.badge;
  const headlineLine1 = apiData?.headlineLine1 || fb.headlineLine1;
  const headlineLine2 = apiData?.headlineLine2 || fb.headlineLine2;
  const subheading = apiData?.subheading || fb.subheading;
  const benefits = apiData?.benefits?.length ? apiData.benefits : fb.benefits;
  const stats = apiData?.stats || fb.stats;
  const trust = apiData?.trust || fb.trust;
  const primaryCta = apiData?.ctas?.primaryLabel || fb.primaryCta;
  const primaryHref = apiData?.ctas?.primaryHref || `/${currentLang}/book-meeting`;
  const secondaryCta = apiData?.ctas?.secondaryLabel || fb.secondaryCta;
  const secondaryHref = apiData?.ctas?.secondaryHref || (apiData?.whatsAppNumber ? `https://wa.me/${apiData.whatsAppNumber}` : '#');

  const statsItems = [
    { icon: Users, value: stats.activeClients, label: fb.statsLabels.activeClients },
    { icon: TrendingUp, value: stats.avgRoi, label: fb.statsLabels.avgRoi },
    { icon: Award, value: stats.satisfaction, label: fb.statsLabels.satisfaction },
    { icon: Clock, value: stats.fastStart, label: fb.statsLabels.fastStart },
  ];

  if (loading) {
    return (
      <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gold via-amber-500 to-yellow-600 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </section>
    );
  }

  return (
    <motion.section
      className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-gradient-to-br from-gold via-amber-500 to-yellow-600"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <motion.div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute -bottom-16 -left-16 w-60 h-60 bg-amber-300/20 rounded-full blur-3xl" animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
      </div>

      <div className={`container mx-auto ${SPACING.container} relative z-10`}>
        <motion.div className="max-w-6xl mx-auto text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>

          <motion.div className="flex justify-center mb-6 sm:mb-8" initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, type: "spring" }}>
            <div className="px-5 py-2.5 bg-white/25 backdrop-blur-lg rounded-full text-sm font-bold text-white flex items-center gap-2 border border-white/40 shadow-xl">
              <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
              <span>{badge}</span>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </div>
          </motion.div>

          <motion.h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 sm:mb-8 text-white leading-[1.1]" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
            <span className="block drop-shadow-lg">{headlineLine1}</span>
            <span className="relative inline-block mt-2">
              <span className="relative z-10 bg-gradient-to-r from-white via-amber-50 to-white bg-clip-text text-transparent drop-shadow-2xl">{headlineLine2}</span>
            </span>
          </motion.h2>

          <motion.div className="mb-10 sm:mb-12 max-w-4xl mx-auto" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
            <p className="text-xl sm:text-2xl text-white/95 mb-8 leading-relaxed font-semibold">{subheading}</p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {benefits.map((benefit, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.1 }} className="flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-full px-4 py-2 border border-white/30 hover:bg-white/25 transition-all duration-300">
                  <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />
                  <span className="text-white text-sm font-semibold whitespace-nowrap">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}>
            <Button size="lg" onClick={() => window.location.href = primaryHref} className="bg-white text-gold hover:bg-white/95 hover:scale-[1.08] group px-8 sm:px-12 py-6 sm:py-8 text-base sm:text-lg font-extrabold rounded-2xl shadow-xl transition-all duration-300 border-2 border-white relative overflow-hidden cursor-pointer w-full sm:w-auto">
              <span className="relative flex items-center gap-3">
                <span>{primaryCta}</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.open(secondaryHref, '_blank')} className="bg-white/10 border-2 border-white text-white hover:bg-white hover:text-gold hover:scale-[1.08] px-6 sm:px-10 py-6 sm:py-8 text-base sm:text-lg font-bold rounded-2xl backdrop-blur-lg transition-all duration-300 cursor-pointer w-full sm:w-auto">
              <span className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5" />
                <span>{secondaryCta}</span>
              </span>
            </Button>
          </motion.div>

          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.35 }}>
            {statsItems.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.1 }} whileHover={{ scale: 1.05, y: -5 }} className="bg-white/15 backdrop-blur-lg border border-white/30 rounded-2xl p-4 sm:p-6 hover:bg-white/25 transition-all duration-300 group">
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white mb-2 mx-auto group-hover:scale-110 transition-transform duration-300" />
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.4 }}>
            {[
              { icon: Clock, time: trust.consultationTime, label: trust.consultationLabel },
              { icon: () => <div className="w-5 h-5 rounded-full bg-green-400 animate-pulse" />, time: trust.responseTime, label: trust.responseLabel },
              { icon: CheckCircle2, time: trust.noCommitment, label: trust.noCommitmentLabel },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-center gap-3 text-white/90 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="p-2 bg-green-400/20 rounded-lg">
                  <item.icon className="w-5 h-5 text-green-400 flex-shrink-0" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-white text-base">{item.time}</div>
                  <div className="text-sm text-white/80">{item.label}</div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.p className="mt-8 text-white/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}>
            <span className="flex items-center justify-center gap-2 flex-wrap">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              {trust.footer}
            </span>
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
};
