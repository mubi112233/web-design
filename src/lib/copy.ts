/**
 * Next-safe copy/translation constants (no react-i18next runtime)
 * Mirrors frontend/src/lib/client-i18n.ts for badge/heading/subheading text.
 * Use URL-based language detection (en/ge) to select strings.
 */

export const copy = {
  en: {
    // How It Works
    howItWorks: {
      badge: "How It Works",
      heading: "Get started in <span class=\"text-gold\">4 simple steps</span>",
      description: "From onboarding to measurable results — our process is designed to be fast, clear, and efficient.",
    },

    // Why Choose Us (fallback, API may provide its own)
    whyChooseUs: {
      badge: "Why Choose Us",
      heading: "What makes us <span class=\"text-gold\">different</span>",
      description: "German-speaking talent, native quality control, fast onboarding, and a zero‑risk guarantee.",
    },

    // Testimonials
    testimonials: {
      heading: "Trusted by <span class=\"text-gold\">Growing Businesses</span>",
      subheading: "Real results from real companies scaling with DON VA.",
      caseStudy: {
        badge: "Success Story",
        title: "Case Study: <span class=\"text-gold\">70% Cost Reduction</span>",
        description: "See how a mid-sized e-commerce company reduced their operational costs by €42,000 annually while improving service quality.",
        cta: "View Full Case Study",
      },
    },

    // Blog
    blog: {
      badge: "Insights",
      heading: "Latest <span class=\"text-gold\">Insights</span>",
      description: "Practical guides and strategies for scaling with virtual assistants.",
      by: "By",
      readMore: "Read more",
      read: "Read",
    },

    // Case Studies
    caseStudies: {
      badge: "Success Stories",
      heading: "Real <span class=\"text-gold\">Success Stories</span>",
      description: "Proven results from teams scaling with DON VA.",
      labels: {
        saved: "Saved",
        teamSize: "Team Size",
        timeline: "Timeline",
        viewFull: "View Full Case Study",
        viewStudy: "View Study",
      },
    },

    // FAQ
    faq: {
      badge: "FAQ",
      title: "Frequently Asked Questions",
      description: "Answers to the most common questions about our service, quality control, and security.",
      qualityCardTitle: "Native Quality Control",
      qualityCardText: "Dedicated supervisors review outputs and coach continuously to maintain standards.",
      toolsCardTitle: "Works with Your Tools",
      toolsCardText: "We plug into your existing workflows and platforms without disrupting your operations.",
      stillHaveQuestionsTitle: "Still have questions?",
      stillHaveQuestionsText: "We're here to help you choose the right setup for your needs.",
      contactSupport: "Contact Support",
      viewPricing: "View Pricing",
    },

    // Pricing
    pricing: {
      sectionBadge: "Pricing",
      sectionTitle: "Simple, transparent pricing",
      sectionDescription: "Choose a plan and number of VAs that fits your needs. Scale up or down anytime.",
    },

    // Final CTA
    finalCTA: {
      badge: "Ready to Scale?",
      title: "Start with <span class=\"text-gold\">DON VA</span> Today",
      description: "Book a free consultation and see how we can transform your operations in 48 hours.",
    },

    // Value Proposition (if used)
    valueProposition: {
      heading: "Why <span class=\"text-gold\">Choose Us</span>",
    },
  },

  ge: {
    // How It Works
    howItWorks: {
      badge: "Wie es funktioniert",
      heading: "Starten Sie in <span class=\"text-gold\">4 einfachen Schritten</span>",
      description: "Vom Onboarding bis zu messbaren Ergebnissen – unser Prozess ist schnell, klar und effizient.",
    },

    // Why Choose Us (fallback, API may provide its own)
    whyChooseUs: {
      badge: "Warum wir",
      heading: "Was uns <span class=\"text-gold\">auszeichnet</span>",
      description: "Deutschsprachige Talente, native Qualitätskontrolle, schnelles Onboarding und eine Null‑Risiko‑Garantie.",
    },

    // Testimonials
    testimonials: {
      heading: "Vertrauen von <span class=\"text-gold\">wachsenden Unternehmen</span>",
      subheading: "Echte Ergebnisse von Unternehmen, die mit DON VA skalieren.",
      caseStudy: {
        badge: "Erfolgsgeschichte",
        title: "Fallstudie: <span class=\"text-gold\">70% Kostensenkung</span>",
        description: "Erfahren Sie, wie ein mittelständisches E-Commerce-Unternehmen seine Betriebskosten um 42.000 € jährlich senkte und gleichzeitig die Servicequalität verbesserte.",
        cta: "Vollständige Fallstudie ansehen",
      },
    },

    // Blog
    blog: {
      badge: "Einblicke",
      heading: "Aktuelle <span class=\"text-gold\">Einblicke</span>",
      description: "Praktische Leitfäden und Strategien zur Skalierung mit virtuellen Assistenten.",
      by: "Von",
      readMore: "Weiterlesen",
      read: "Lesen",
    },

    // Case Studies
    caseStudies: {
      badge: "Erfolgsgeschichten",
      heading: "Echte <span class=\"text-gold\">Erfolgsgeschichten</span>",
      description: "Bewährte Ergebnisse von Teams, die mit DON VA skalieren.",
      labels: {
        saved: "Gespart",
        teamSize: "Teamgröße",
        timeline: "Zeitrahmen",
        viewFull: "Vollständige Fallstudie ansehen",
        viewStudy: "Studie ansehen",
      },
    },

    // FAQ
    faq: {
      badge: "FAQ",
      title: "Häufig gestellte Fragen",
      description: "Antworten auf die häufigsten Fragen zu unserem Service, Qualitätskontrolle und Sicherheit.",
      qualityCardTitle: "Native Qualitätskontrolle",
      qualityCardText: "Dedizierte Supervisoren prüfen Ergebnisse und coachen kontinuierlich, um Standards zu halten.",
      toolsCardTitle: "Funktioniert mit Ihren Tools",
      toolsCardText: "Wir integrieren uns in Ihre bestehenden Workflows und Plattformen ohne Unterbrechung.",
      stillHaveQuestionsTitle: "Noch Fragen?",
      stillHaveQuestionsText: "Wir helfen Ihnen gern, das passende Setup zu wählen.",
      contactSupport: "Support kontaktieren",
      viewPricing: "Preise ansehen",
    },

    // Pricing
    pricing: {
      sectionBadge: "Pricing",
      sectionTitle: "Simple, Transparent Pricing",
      sectionDescription: "Choose the perfect plan for your business. Scale up or down anytime.",
      vaCountLabel: "How many VAs do you need?",
      vaCountHelper: "Select the number of virtual assistants",
      startingFrom: "Starting from €{price}/hour",
      bulkDiscount: "{percent}% discount - {suffix} more!",
      bulkSavings: "Save €{amount} total",
      bulkHint: "Add {count} more {suffix} to get {percent}% discount",
      bannerBadge: "Limited Time",
      bannerTitle: "Book a Meeting",
      bannerSubtitle: "Schedule your free consultation and get started today",
      bannerPoints: {
        noCommitment: "No commitment",
        cancelAnytime: "Cancel anytime", 
        fullAccess: "Full access"
      },
      plans: {
        starter: {
          name: "Starter",
          hours: "10h / week",
          features: [
            "Dedicated VA",
            "Native Quality Control",
            "24h Replacement Guarantee", 
            "Slack/Email Support",
            "14 Days Money-Back Warranty"
          ]
        },
        professional: {
          name: "Professional", 
          hours: "20h / week",
          features: [
            "Everything in Starter",
            "No Setup Fee",
            "Priority Support",
            "Bi-weekly Progress Reports",
            "Flexible Hour Rollover"
          ]
        },
        enterprise: {
          name: "Enterprise",
          hours: "40h / week", 
          badge: "Best Value",
          features: [
            "Everything in Professional",
            "No Setup Fee",
            "Dedicated Account Manager", 
            "Weekly Strategy Calls",
            "Custom Workflow Integration"
          ]
        }
      },
      button: "Get Started",
      perMonth: "/mo",
      hoursUnit: "hours",
      planSetupFee: "+€{fee} setup fee",
      planNoSetupFee: "No setup fee",
      disclaimer: "All prices are per VA. Bulk discounts apply automatically. Setup fees are one-time charges."
    },

    // Final CTA
    finalCTA: {
      badge: "Bereit zu skalieren?",
      title: "Starten Sie noch heute mit <span class=\"text-gold\">DON VA</span>",
      description: "Buchen Sie eine kostenlose Beratung und erleben Sie, wie wir Ihre Abläufe in 48 Stunden transformieren können.",
    },

    // Value Proposition (if used)
    valueProposition: {
      heading: "Warum <span class=\"text-gold\">wir</span>?",
    },
  },
} as const;

/**
 * Helper to get copy for a language (en/ge)
 */
export const getCopy = (lang: string, key: keyof typeof copy.en) => {
  const normalizedLang = lang.toLowerCase().startsWith('ge') || lang.toLowerCase().startsWith('de') ? 'ge' : 'en';
  return copy[normalizedLang as keyof typeof copy][key] as any;
};
