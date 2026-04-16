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
      description: "From consultation to deployment — our process is designed to deliver top talent fast.",
      steps: {
        step1: {
          step: "Step 1",
          title: "Initial Consultation",
          description: "We discuss your needs, workflow, and requirements to understand your ideal VA profile."
        },
        step2: {
          step: "Step 2",
          title: "Talent Sourcing & Vetting",
          description: "We source, screen, and test candidates to find the perfect match for your needs."
        },
        step3: {
          step: "Step 3",
          title: "Onboarding & Training",
          description: "We onboard your VA with your tools, processes, and expectations for seamless integration."
        },
        step4: {
          step: "Step 4",
          title: "Management & Growth",
          description: "Continuous management, quality control, and support to ensure long-term success."
        }
      }
    },

    // Why Choose Us (fallback, API may provide its own)
    whyChooseUs: {
      badge: "Why Choose Us",
      heading: "What makes us <span class=\"text-gold\">different</span>",
      description: "Data-driven strategies, technical excellence, transparent reporting, and measurable ROI.",
    },

    // Testimonials
    testimonials: {
      heading: "Trusted by <span class=\"text-gold\">Growing Businesses</span>",
      subheading: "Real results from real companies growing with TalentSource.",
      caseStudy: {
        badge: "Success Story",
        title: "Case Study: <span class=\"text-gold\">70% Cost Reduction</span>",
        description: "See how a mid-sized e-commerce company scaled their operations with 10 VAs and reduced their operational costs by 60%.",
        cta: "View Full Case Study",
      },
    },

    // Blog
    blog: {
      badge: "Insights",
      heading: "Latest <span class=\"text-gold\">Insights</span>",
      description: "Practical guides and strategies for scaling your team and optimizing your operations.",
      by: "By",
      readMore: "Read more",
      read: "Read",
    },

    // Case Studies
    caseStudies: {
      badge: "Success Stories",
      heading: "Real <span class=\"text-gold\">Success Stories</span>",
      description: "Proven results from companies scaling their teams with TalentSource.",
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
      sectionDescription: "Choose a plan that fits your needs. Scale up or down anytime.",
      vaCountLabel: "How many VAs do you need?",
      vaCountHelper: "Choose the right number of virtual assistants for your team",
      startingFrom: "Starting from €{price}/mo · ~€{hourly}/hr",
      bulkDiscount: "{percent}% bulk discount applied!",
      bulkSavings: "You save €{amount} total",
      bulkHint: "Add {count} more plan{suffix} to unlock {percent}% bulk discount",
      bannerBadge: "Limited Time",
      bannerTitle: "Book a Free Meeting",
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
            "Dedicated Virtual Assistant",
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
      disclaimer: "All prices are per plan. Bulk discounts apply automatically. Setup fees are one-time charges."
    },

    // Final CTA
    finalCTA: {
      badge: "Ready to Scale?",
      title: "Start with <span class=\"text-gold\">DON SEO</span> Today",
      description: "Book a free consultation and see how we can improve your rankings in 30 days.",
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
      description: "Von der Beratung bis zur Einsatzbereitschaft – unser Prozess liefert schnell Top-Talente.",
      steps: {
        step1: {
          step: "Schritt 1",
          title: "Erstberatung",
          description: "Wir besprechen Ihre Bedürfnisse, Workflows und Anforderungen, um Ihr ideales VA-Profil zu verstehen."
        },
        step2: {
          step: "Schritt 2",
          title: "Talent-Sourcing & Prüfung",
          description: "Wir rekrutieren, screenen und testen Kandidaten, um die perfekte Übereinstimmung für Ihre Bedürfnisse zu finden."
        },
        step3: {
          step: "Schritt 3",
          title: "Onboarding & Schulung",
          description: "Wir integrieren Ihren VA mit Ihren Tools, Prozessen und Erwartungen für eine nahtlose Einarbeitung."
        },
        step4: {
          step: "Schritt 4",
          title: "Management & Wachstum",
          description: "Kontinuierliches Management, Qualitätskontrolle und Support für langfristigen Erfolg."
        }
      }
    },

    // Why Choose Us (fallback, API may provide its own)
    whyChooseUs: {
      badge: "Warum wir",
      heading: "Was uns <span class=\"text-gold\">auszeichnet</span>",
      description: "Datengesteuerte Strategien, technische Exzellenz, transparentes Reporting und messbarer ROI.",
    },

    // Testimonials
    testimonials: {
      heading: "Vertrauen von <span class=\"text-gold\">wachsenden Unternehmen</span>",
      subheading: "Echte Ergebnisse von Unternehmen, die mit TalentSource wachsen.",
      caseStudy: {
        badge: "Erfolgsgeschichte",
        title: "Fallstudie: <span class=\"text-gold\">70% Kostensenkung</span>",
        description: "Erfahren Sie, wie ein mittelständisches E-Commerce-Unternehmen mit 10 VAs skalierte und die Betriebskosten um 60% senkte.",
        cta: "Vollständige Fallstudie ansehen",
      },
    },

    // Blog
    blog: {
      badge: "Einblicke",
      heading: "Aktuelle <span class=\"text-gold\">Einblicke</span>",
      description: "Praktische Leitfäden und Strategien zur Skalierung Ihres Teams und Optimierung Ihrer Abläufe.",
      by: "Von",
      readMore: "Weiterlesen",
      read: "Lesen",
    },

    // Case Studies
    caseStudies: {
      badge: "Erfolgsgeschichten",
      heading: "Echte <span class=\"text-gold\">Erfolgsgeschichten</span>",
      description: "Bewährte Ergebnisse von Unternehmen, die ihre Teams mit TalentSource skalieren.",
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
      sectionBadge: "Preise",
      sectionTitle: "Einfache, transparente Preise",
      sectionDescription: "Wählen Sie den perfekten Plan für Ihr Unternehmen. Skalieren Sie jederzeit hoch oder runter.",
      vaCountLabel: "Wie viele VAs brauchen Sie?",
      vaCountHelper: "Wählen Sie die richtige Anzahl virtueller Assistenten für Ihr Team",
      startingFrom: "Ab €{price}/Stunde",
      bulkDiscount: "{percent}% Rabatt - {suffix} mehr!",
      bulkSavings: "Gesamtersparnis: €{amount}",
      bulkHint: "Fügen Sie {count} weitere {suffix} hinzu, um {percent}% Rabatt zu erhalten",
      bannerBadge: "Zeitlich begrenzt",
      bannerTitle: "Meeting buchen",
      bannerSubtitle: "Vereinbaren Sie Ihre kostenlose Beratung und starten Sie noch heute",
      bannerPoints: {
        noCommitment: "Keine Verpflichtung",
        cancelAnytime: "Jederzeit kündbar", 
        fullAccess: "Voller Zugriff"
      },
      plans: {
        starter: {
          name: "Starter",
          hours: "10h / week",
          features: [
            "Dedizierter virtueller Assistent",
            "Qualitätskontrolle durch Muttersprachler",
            "24h Ersatzgarantie", 
            "Slack/Email Support",
            "14 Tage Geld-zurück-Garantie"
          ]
        },
        professional: {
          name: "Professional", 
          hours: "20h / Woche",
          features: [
            "Alles aus Starter",
            "Keine Einrichtungsgebühr",
            "Prioritätsupport",
            "Zweiwöchentliche Fortschrittsberichte",
            "Flexible Stundenübertragung"
          ]
        },
        enterprise: {
          name: "Enterprise",
          hours: "40h / Woche", 
          badge: "Bester Wert",
          features: [
            "Alles aus Professional",
            "Keine Einrichtungsgebühr",
            "Dedizierter Account Manager", 
            "Wöchentliche Strategie-Calls",
            "Individuelle Workflow-Integration"
          ]
        }
      },
      button: "Jetzt starten",
      perMonth: "/Mo.",
      hoursUnit: "Stunden",
      planSetupFee: "+€{fee} Einrichtungsgebühr",
      planNoSetupFee: "Keine Einrichtungsgebühr",
      disclaimer: "Alle Preise gelten pro Plan. Mengenrabatte werden automatisch angewendet. Einrichtungsgebühren sind einmalige Zahlungen."
    },

    // Final CTA
    finalCTA: {
      badge: "Bereit zu skalieren?",
      title: "Starten Sie noch heute mit <span class=\"text-gold\">TalentSource</span>",
      description: "Buchen Sie eine kostenlose Beratung und erleben Sie, wie wir Ihr Team in 30 Tagen aufstocken können."
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
export const getCopy = <K extends keyof typeof copy.en>(lang: string, key: K) => {
  const normalizedLang = lang.toLowerCase().startsWith('ge') || lang.toLowerCase().startsWith('de') ? 'ge' : 'en';
  return copy[normalizedLang as 'en' | 'ge'][key];
};
