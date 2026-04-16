"use client";

import { motion } from "framer-motion";
import { Calendar, UserCheck, Rocket, LineChart, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { fetchHowItWorks, type Step } from "@/lib/api";

const iconMap = {
  Calendar,
  UserCheck,
  Rocket,
  LineChart
};

const sectionCopy = {
  en: {
    badge: "Simple 4-Step Process",
    heading: "How We Build Your Team",
    description: "From your requirements to talent placement in just 7 days. Simple, transparent, and hassle-free recruitment.",
  },
  ge: {
    badge: "4-Schritte Prozess",
    heading: "So bauen wir Ihr Team auf",
    description: "Von Ihren Anforderungen zur Personalplatzierung in nur 7 Tagen. Einfache, transparente und problemlose Rekrutierung.",
  },
};

export const HowItWorks = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const currentLang = pathname.startsWith('/ge') || pathname.startsWith('/de') ? 'ge' : 'en';
  const copy = sectionCopy[currentLang as keyof typeof sectionCopy] || sectionCopy.en;

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const data = await fetchHowItWorks(currentLang);
        setSteps(data?.steps || []);
      } catch {
        setSteps([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSteps();
  }, [currentLang]);

  if (loading) {
    return (
      <section id="how-it-works" className="relative py-4 sm:py-6 md:py-8 lg:py-10 z-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      id="how-it-works"
      className="relative py-4 sm:py-6 md:py-8 lg:py-10 z-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="mb-10 sm:mb-16 md:mb-20 text-left"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold rounded-full mb-4 shadow-lg">
            {copy.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-slate-900 dark:text-white">
            {copy.heading.split(' ').slice(0, -2).join(' ')} <span className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">{copy.heading.split(' ').slice(-2).join(' ')}</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            {copy.description}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const IconComponent = iconMap[step.icon as keyof typeof iconMap] || Calendar;
            return (
              <motion.div
                key={step._id || index}
                className="relative mb-12 sm:mb-16 last:mb-0"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, rotateY: 0 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: [0.6, -0.05, 0.01, 0.99] }}
              >
                <div className={`flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <motion.div
                    className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-gold via-blue-400 to-gold flex items-center justify-center shadow-[0_20px_60px_-15px_hsl(215_80%_55%/0.6)] relative group"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl group-hover:blur-2xl transition-all duration-500" />
                    <IconComponent className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-black relative z-10" />
                    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-7 h-7 sm:w-8 sm:h-8 bg-foreground text-gold rounded-full flex items-center justify-center text-xs sm:text-sm font-bold border-2 border-gold">
                      {step.stepNumber || index + 1}
                    </div>
                  </motion.div>

                  <motion.div
                    className={`relative flex-1 bg-white dark:bg-blue-900/30 border border-gray-200 dark:border-blue-600/30 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 hover:bg-gray-50 dark:hover:bg-blue-800/40 hover:border-gray-300 dark:hover:border-blue-500/50 hover:shadow-lg transition-all duration-500 group overflow-hidden ${index % 2 === 1 ? 'md:text-right' : ''}`}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <p className="text-blue-600 dark:text-cyan-300 font-bold text-sm uppercase tracking-wider mb-3 inline-block px-3 py-1 bg-blue-100 dark:bg-cyan-500/20 rounded-full">
                      {step.stepLabel || `Step ${index + 1}`}
                    </p>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base md:text-lg">
                      {step.description}
                    </p>

                    {/* Decorative corner */}
                    <div className={`absolute ${index % 2 === 1 ? 'top-0 left-0 border-t-2 border-l-2 rounded-tl-xl sm:rounded-tl-2xl' : 'bottom-0 right-0 border-b-2 border-r-2 rounded-br-xl sm:rounded-br-2xl'} w-12 h-12 sm:w-16 sm:h-16 border-blue-400/0 dark:border-cyan-400/0 group-hover:border-blue-400/50 dark:group-hover:border-cyan-400/50 transition-all duration-500`} />
                  </motion.div>
                </div>

                {index < steps.length - 1 && (
                  <motion.div
                    className="absolute left-16 top-32 w-0.5 h-16 bg-gradient-to-b from-gold via-gold/50 to-transparent hidden md:block"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};
