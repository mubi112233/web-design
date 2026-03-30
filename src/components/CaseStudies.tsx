"use client";

import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchCaseStudies as fetchCaseStudiesApi } from "@/lib/api";
import { getCopy } from "@/lib/copy";

const slugify = (title: string) =>
  title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();

interface CaseStudyFromAPI {
  caseStudyId: number;
  title: string;
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: Array<{ metric: string; value: string; description: string }>;
  testimonial: string;
  testimonialAuthor: string;
  testimonialRole: string;
  image: string;
  stats: { costSaved: string; timeframe: string; vaCount: string };
}

export const CaseStudies = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = pathname.startsWith('/ge') || pathname.startsWith('/de') ? 'ge' : 'en';
  const [studies, setStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const copy = getCopy(currentLang, "caseStudies");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCaseStudiesApi(currentLang);
        if (!data) throw new Error("Failed to fetch case studies");
        const fetchedStudies = Array.isArray((data as any).caseStudies)
          ? (data as any).caseStudies.map((cs: CaseStudyFromAPI) => ({
              id: cs.caseStudyId,
              title: cs.title,
              company: cs.company,
              industry: cs.industry,
              challenge: cs.challenge,
              solution: cs.solution,
              results: cs.results,
              testimonial: cs.testimonial,
              testimonialAuthor: cs.testimonialAuthor,
              testimonialRole: cs.testimonialRole,
              image: cs.image,
              stats: cs.stats,
            })).sort((a: any, b: any) => a.id - b.id)
          : [];
        setStudies(fetchedStudies);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load case studies");
        setStudies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentLang]);

  if (loading) {
    return (
      <motion.section id="case-studies" className="relative py-8 sm:py-10 md:py-12 lg:py-14 bg-gradient-to-b from-background via-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-gold" />
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      id="case-studies"
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-background via-muted/20 to-background"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Background accents */}
      <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gold/5 rounded-full blur-[100px] md:blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gold/5 rounded-full blur-[100px] md:blur-[150px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {(error || studies.length === 0) && (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">
              {error || (currentLang === "ge"
                ? "Keine Fallstudien verfügbar."
                : "No case studies available.")}
            </p>
          </div>
        )}

        {/* Header */}
        <motion.div
          className="mb-12 sm:mb-16 lg:mb-20 text-left max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-2 bg-gold text-foreground text-sm font-bold rounded-full mb-4 shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            {copy.badge}
          </motion.span>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-foreground leading-tight"
            dangerouslySetInnerHTML={{ __html: copy.heading }}
          />
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl leading-relaxed">
            {copy.description}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
          {studies.map((study: any, index: number) => (
            <motion.article
              key={study.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-card border border-border/50 rounded-xl sm:rounded-2xl overflow-hidden hover:border-gold/50 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] transition-all duration-300 cursor-pointer w-full"
              onClick={() => router.push(`/${currentLang}/case-study/${slugify(study.title)}-${study.id}`)}
              whileHover={{ y: -8 }}
            >
              {/* Image */}
              <div className="relative h-44 sm:h-52 md:h-48 lg:h-56 overflow-hidden">
                <Image
                  src={study.image}
                  alt={study.company}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-gold text-foreground text-xs font-bold rounded-full">
                    {study.industry}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 lg:p-6">
                <div className="flex items-center gap-3 sm:gap-4 text-xs text-muted-foreground mb-2 sm:mb-3">
                  <span>{study.company}</span>
                  <span>·</span>
                  <span>{study.stats?.timeframe}</span>
                </div>

                <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 text-foreground group-hover:text-gold transition-colors line-clamp-2">
                  {study.title}
                </h3>

                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                  {study.challenge}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex gap-3 text-xs text-muted-foreground">
                    <span className="text-gold font-semibold">{study.stats?.costSaved}</span>
                    <span>{copy.labels.saved}</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 text-gold font-semibold text-xs sm:text-sm group-hover:gap-2 sm:group-hover:gap-3 transition-all">
                    <span className="hidden sm:inline">{copy.labels.viewFull}</span>
                    <span className="sm:hidden">{copy.labels.viewStudy}</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        {studies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 sm:mt-16 lg:mt-20 text-center"
          >
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
              {currentLang === "ge" ? "Bereit, ähnliche Ergebnisse zu erzielen?" : "Ready to achieve similar results?"}
            </p>
            <a
              href={`/${currentLang}/book-meeting`}
              className="inline-block w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-gold text-foreground font-bold text-base sm:text-lg rounded-2xl hover:bg-gold/90 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              <span className="hidden sm:inline">{currentLang === "ge" ? "Kostenlose Beratung buchen" : "Book a Free Consultation"}</span>
              <span className="sm:hidden">{currentLang === "ge" ? "Jetzt starten" : "Get Started"}</span>
            </a>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};
