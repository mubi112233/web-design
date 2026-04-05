import {
  ArrowRight,
  MessageCircle,
  Sparkles,
  Clock,
  CheckCircle2,
  Users,
  TrendingUp,
  Award,
} from "lucide-react";
import {
  siteConfig,
  localizedPath,
  getWhatsAppUrl,
  type SiteLocale,
} from "@/lib/site-config";
import { fetchFinalCtaSectionData, type FinalCtaSectionPayload } from "@/lib/data-fetching";

const fallbackCopy = {
  en: {
    badge: "Ready to Scale?",
    headlineLine1: "Start with",
    headlineLine2: "DON VA Today",
    subheading:
      "Book a free consultation and see how we can transform your operations in 48 hours.",
    benefits: ["No setup fees", "14-day trial", "Native managers", "24/7 support"],
    stats: { activeClients: "200+", avgRoi: "3.5x", satisfaction: "98%", fastStart: "48h" },
    statsLabels: {
      activeClients: "Active Clients",
      avgRoi: "Avg. ROI",
      satisfaction: "Satisfaction",
      fastStart: "Fast Start",
    },
    trust: {
      consultationTime: "30 min",
      consultationLabel: "Free consultation",
      responseTime: "Online now",
      responseLabel: "Response in < 1h",
      noCommitment: "No commitment",
      noCommitmentLabel: "Cancel anytime",
      footer: "No credit card required. Start your free consultation today.",
    },
    primaryCta: "Book Free Consultation",
    secondaryCta: "Chat on WhatsApp",
  },
  ge: {
    badge: "Bereit zu skalieren?",
    headlineLine1: "Starten Sie noch heute",
    headlineLine2: "mit DON VA",
    subheading:
      "Buchen Sie eine kostenlose Beratung und erleben Sie, wie wir Ihre Abläufe in 48 Stunden transformieren.",
    benefits: ["Keine Einrichtungsgebühren", "14-Tage-Test", "Native Manager", "24/7 Support"],
    stats: { activeClients: "200+", avgRoi: "3.5x", satisfaction: "98%", fastStart: "48h" },
    statsLabels: {
      activeClients: "Aktive Kunden",
      avgRoi: "Ø ROI",
      satisfaction: "Zufriedenheit",
      fastStart: "Schnellstart",
    },
    trust: {
      consultationTime: "30 Min.",
      consultationLabel: "Kostenlose Beratung",
      responseTime: "Jetzt online",
      responseLabel: "Antwort in < 1 Std.",
      noCommitment: "Keine Bindung",
      noCommitmentLabel: "Jederzeit kündbar",
      footer: "Keine Kreditkarte erforderlich. Starten Sie noch heute Ihre kostenlose Beratung.",
    },
    primaryCta: "Kostenlose Beratung buchen",
    secondaryCta: "Per WhatsApp chatten",
  },
};

function mergeFinalCta(
  locale: SiteLocale,
  api: FinalCtaSectionPayload | null
): {
  badge: string;
  headlineLine1: string;
  headlineLine2: string;
  subheading: string;
  benefits: string[];
  stats: { activeClients: string; avgRoi: string; satisfaction: string; fastStart: string };
  trust: (typeof fallbackCopy.en)["trust"];
  primaryCta: string;
  primaryHref: string;
  secondaryCta: string;
  secondaryHref: string;
  statsLabels: (typeof fallbackCopy.en)["statsLabels"];
} {
  const fb = fallbackCopy[locale] || fallbackCopy.en;
  return {
    badge: api?.badge ?? fb.badge,
    headlineLine1: api?.headlineLine1 ?? fb.headlineLine1,
    headlineLine2: api?.headlineLine2 ?? fb.headlineLine2,
    subheading: api?.subheading ?? fb.subheading,
    benefits: api?.benefits?.length ? api.benefits : fb.benefits,
    stats: { ...fb.stats, ...api?.stats },
    trust: { ...fb.trust, ...api?.trust },
    primaryCta: api?.ctas?.primaryLabel ?? fb.primaryCta,
    primaryHref:
      api?.ctas?.primaryHref ?? localizedPath(locale, siteConfig.routes.bookMeeting),
    secondaryCta: api?.ctas?.secondaryLabel ?? fb.secondaryCta,
    secondaryHref:
      api?.ctas?.secondaryHref ??
      getWhatsAppUrl(api?.whatsAppNumber || siteConfig.external.whatsappNumber) ??
      "#",
    statsLabels: fb.statsLabels,
  };
}

export async function FinalCTA({ lang }: { lang: string }) {
  const locale: SiteLocale = lang === "ge" ? "ge" : "en";
  const apiData = await fetchFinalCtaSectionData(lang);
  const c = mergeFinalCta(locale, apiData);

  const statsItems = [
    { Icon: Users, value: c.stats.activeClients, label: c.statsLabels.activeClients },
    { Icon: TrendingUp, value: c.stats.avgRoi, label: c.statsLabels.avgRoi },
    { Icon: Award, value: c.stats.satisfaction, label: c.statsLabels.satisfaction },
    { Icon: Clock, value: c.stats.fastStart, label: c.statsLabels.fastStart },
  ];

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-gradient-to-br from-gold via-primary to-gold">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-primary/20 rounded-full blur-3xl" />
      </div>

      <div className="w-full px-0 relative z-10">
        <div className="max-w-6xl mx-auto text-center px-4 sm:px-6">
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="px-5 py-2.5 bg-white/25 backdrop-blur-lg rounded-full text-sm font-bold text-white flex items-center gap-2 border border-white/40 shadow-xl">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{c.badge}</span>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </div>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 sm:mb-8 text-white leading-[1.1]">
            <span className="block drop-shadow-lg">{c.headlineLine1}</span>
            <span className="relative inline-block mt-2">
              <span className="relative z-10 bg-gradient-to-r from-white via-amber-50 to-white bg-clip-text text-transparent drop-shadow-2xl">
                {c.headlineLine2}
              </span>
            </span>
          </h2>

          <div className="mb-10 sm:mb-12 max-w-4xl mx-auto">
            <p className="text-xl sm:text-2xl text-white/95 mb-8 leading-relaxed font-semibold">
              {c.subheading}
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {c.benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-full px-4 py-2 border border-white/30 hover:bg-white/25 transition-all duration-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />
                  <span className="text-white text-sm font-semibold whitespace-nowrap">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href={c.primaryHref}
              className="inline-flex items-center justify-center gap-3 bg-white text-gold hover:bg-white/95 hover:scale-[1.08] px-8 sm:px-12 py-6 sm:py-8 text-base sm:text-lg font-extrabold rounded-2xl shadow-xl transition-all duration-300 border-2 border-white w-full sm:w-auto"
            >
              <span>{c.primaryCta}</span>
              <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href={c.secondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-white/10 border-2 border-white text-white hover:bg-white hover:text-gold hover:scale-[1.08] px-6 sm:px-10 py-6 sm:py-8 text-base sm:text-lg font-bold rounded-2xl backdrop-blur-lg transition-all duration-300 w-full sm:w-auto"
            >
              <MessageCircle className="h-5 w-5" />
              <span>{c.secondaryCta}</span>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto mb-12">
            {statsItems.map((stat, i) => (
              <div
                key={i}
                className="bg-white/15 backdrop-blur-lg border border-white/30 rounded-2xl p-4 sm:p-6 hover:bg-white/25 transition-all duration-300 group"
              >
                <stat.Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white mb-2 mx-auto group-hover:scale-110 transition-transform duration-300" />
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 text-white/90 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="p-2 bg-green-400/20 rounded-lg">
                <Clock className="w-5 h-5 text-green-400 flex-shrink-0" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-base">{c.trust.consultationTime}</div>
                <div className="text-sm text-white/80">{c.trust.consultationLabel}</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 text-white/90 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="p-2 bg-green-400/20 rounded-lg">
                <div className="w-5 h-5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-base">{c.trust.responseTime}</div>
                <div className="text-sm text-white/80">{c.trust.responseLabel}</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 text-white/90 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="p-2 bg-green-400/20 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-base">{c.trust.noCommitment}</div>
                <div className="text-sm text-white/80">{c.trust.noCommitmentLabel}</div>
              </div>
            </div>
          </div>

          <p className="mt-8 text-white/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            <span className="flex items-center justify-center gap-2 flex-wrap">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              {c.trust.footer}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
