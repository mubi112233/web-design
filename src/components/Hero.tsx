"use client";

import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, Calendar, Sparkles, Users, Award, Loader2, TrendingUp, Star } from "lucide-react";
import { fetchHero, HeroData } from "@/lib/api";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export const Hero = () => {
  const ref = useRef<HTMLElement | null>(null);
  const router = useRouter();
  // Use global scroll progress to avoid target hydration issues in DEV/strict mode
  const { scrollYProgress } = useScroll();
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

  const [currentLang, setCurrentLang] = useState<string>('en');
  const abortControllerRef = useRef<AbortController | null>(null);

  const getLangFromPath = () => {
    if (typeof window === 'undefined') return 'en';
    const match = window.location.pathname.match(/^\/(en|ge|de)\b/i);
    const raw = match?.[1]?.toLowerCase() || "en";
    return raw === "de" ? "ge" : raw;
  };

  // Set language on mount and when path changes
  useEffect(() => {
    setCurrentLang(getLangFromPath());
  }, []);

  const isGe = currentLang === 'ge';

  const fallbackData: HeroData = isGe ? {
    title: "Skalieren Sie Ihr Unternehmen mit dedizierten virtuellen Assistenten",
    subtitle: "Stellen Sie geprüfte, deutschsprachige virtuelle Assistenten für 80% weniger als lokale Einstellungen ein. Skalieren Sie Ihr Team in Tagen, nicht Monaten.",
    tagline: "Von 200+ wachsenden Unternehmen vertraut",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=900&fit=crop&q=80",
    ctaPrimary: "Jetzt starten",
    urgency: "Begrenztes Angebot",
    stats: { clients: "200+", costSaved: "70%", rating: "4.9/5" },
  } : {
    title: "Scale Your Business with Dedicated Virtual Assistants",
    subtitle: "Hire pre-vetted, German-speaking virtual assistants for 80% less than local hires. Scale your team in days, not months.",
    tagline: "Trusted by 200+ Growing Businesses",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=900&fit=crop&q=80",
    ctaPrimary: "Get Started Today",
    urgency: "Limited Offer",
    stats: { clients: "200+", costSaved: "70%", rating: "4.9/5" },
  };

  const [heroData, setHeroData] = useState<HeroData | null>(fallbackData);
  const [loading, setLoading] = useState(false);

  // Fetch hero data from API with cleanup
  useEffect(() => {
    const fetchHeroData = async () => {
      // Cancel previous request if exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      const controller = new AbortController();
      abortControllerRef.current = controller;
      
      try {
        setLoading(true);
        const data = await fetchHero(currentLang);
        if (!controller.signal.aborted) {
          setHeroData(data || fallbackData);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error('Failed to fetch hero data:', error);
          setHeroData(fallbackData);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };
    
    if (currentLang) {
      fetchHeroData();
    }
    
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [currentLang]);

  // Use fetched data or fallback
  const title = heroData?.title || fallbackData.title;
  const subtitle = heroData?.subtitle || fallbackData.subtitle;
  const tagline = heroData?.tagline || fallbackData.tagline;
  const heroImage = heroData?.image || fallbackData.image;
  const ctaPrimary = heroData?.ctaPrimary || fallbackData.ctaPrimary;
  const urgency = heroData?.urgency || fallbackData.urgency;
  const stats = heroData?.stats || fallbackData.stats;
  const statsLabels = isGe
    ? { clients: "Kunden", costSaved: "Kosten gespart", rating: "Bewertung" }
    : { clients: "Clients", costSaved: "Cost Saved", rating: "Rating" };

  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </section>
    );
  }

  return (
    <motion.section 
      ref={ref as unknown as React.Ref<HTMLElement>}
      className={`relative min-h-screen flex items-center bg-background text-foreground overflow-hidden pt-16 sm:pt-20 md:pt-0`}
      style={{ opacity }}
    >
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"
          animate={{
            background: [
              "linear-gradient(to bottom right, hsl(var(--background)), hsl(var(--background)), hsl(220 100% 50% / 0.05))",
              "linear-gradient(to bottom right, hsl(var(--background)), hsl(var(--background)), hsl(45 80% 55% / 0.08))",
              "linear-gradient(to bottom right, hsl(var(--background)), hsl(var(--background)), hsl(45 80% 55% / 0.05))"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating orbs in background - simplified for performance */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </motion.div>
      
      <div className="container mx-auto px-0 py-12 sm:py-16 md:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-14 md:gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center gap-2 mb-4 sm:mb-5 md:mb-6 px-4 sm:px-5 py-2 sm:py-2.5 bg-primary/10 backdrop-blur-sm border border-primary/30 rounded-full text-primary text-xs sm:text-sm font-semibold shadow-lg shadow-primary/10 hover:bg-primary/20 transition-all duration-300"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </motion.div>
              {tagline}
            </motion.div>
            
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold mb-5 sm:mb-6 md:mb-7 leading-[1.15] sm:leading-[1.12] md:leading-[1.1] tracking-tight">
              <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                {title}
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-7 md:mb-8 leading-relaxed max-w-xl">
              {subtitle}
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-3"
            >
              <Button 
                variant="default" 
                size="lg"
                onClick={() => {
                  router.push(`/${currentLang}${siteConfig.routes.bookMeeting}`);
                }}
                className="group relative w-full sm:w-auto text-sm sm:text-base md:text-lg px-8 sm:px-10 md:px-12 py-4 sm:py-6 md:py-7 h-auto font-semibold shadow-[0_16px_40px_-18px_hsl(220_100%_50%/0.7)] hover:shadow-[0_24px_60px_-18px_hsl(220_100%_50%/0.9)] transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden rounded-2xl"
                aria-label="Get started with Don VA virtual assistant services"
              >
                {/* Subtle shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                  animate={{
                    x: ["-150%", "150%"]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 1.5
                  }}
                  aria-hidden="true"
                />
                
                {/* Enhanced hover glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-primary to-primary rounded-xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300" aria-hidden="true" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" aria-hidden="true" />
                  <span className="font-semibold group-hover:tracking-wide transition-all duration-300">{ctaPrimary}</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" aria-hidden="true" />
                </span>
              </Button>
              
              {/* Urgency indicator */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm"
              >
                <motion.div
                  className="relative"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" aria-hidden="true" />
                  <motion.div
                    className="absolute inset-0 bg-primary/30 rounded-full blur-md"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
                <span className="font-semibold text-foreground">{urgency}</span>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="relative lg:ml-auto mt-8 sm:mt-10 lg:mt-0"
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 z-20"
            >
              <motion.div
                animate={{
                  y: [-5, 5, -5],
                  rotate: [-2, 2, -2]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="bg-gradient-to-br from-primary via-primary to-primary text-background px-3 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-lg border-2 border-background flex items-center gap-1.5 sm:gap-2"
              >
                <Award className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                <span className="text-[10px] sm:text-xs font-bold whitespace-nowrap">{isGe ? 'Top Bewertet' : 'Top Rated'}</span>
              </motion.div>
            </motion.div>
            
            <div className="relative rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] sm:shadow-[0_25px_80px_-18px_rgba(0,0,0,0.75)] md:shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)] border-2 border-primary/40 hover:border-primary/80 group transition-all duration-700 aspect-[4/3]">
              <Image
                src={heroImage}
                alt={isGe ? "Virtueller Assistent am Arbeiten" : "Virtual Assistant Working"}
                width={1200}
                height={900}
                className="w-full h-full object-cover"
                priority
              />
              
              {/* Floating stats overlay - positioned outside image area */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 backdrop-blur-2xl bg-card/98 border-2 border-primary/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] group-hover:border-primary/60 group-hover:shadow-[0_25px_80px_-15px_hsl(220_100%_50%/0.4)] transition-all duration-500 z-30"
              >
                <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center group/stat cursor-default"
                  >
                    <motion.div
                      animate={{ y: [-3, 3, -3] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-primary/70 group-hover/stat:text-primary transition-colors" aria-hidden="true" />
                      <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">{stats.clients}</div>
                      <div className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground font-medium">{statsLabels.clients}</div>
                    </motion.div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.3, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center group/stat cursor-default border-x border-border/50"
                  >
                    <motion.div
                      animate={{ y: [-3, 3, -3] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                    >
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-primary/70 group-hover/stat:text-primary transition-colors" aria-hidden="true" />
                      <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">{stats.costSaved}</div>
                      <div className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground font-medium">{statsLabels.costSaved}</div>
                    </motion.div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center group/stat cursor-default"
                  >
                    <motion.div
                      animate={{ y: [-3, 3, -3] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                    >
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-primary/70 group-hover/stat:text-primary transition-colors fill-primary/20" aria-hidden="true" />
                      <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">{stats.rating}</div>
                      <div className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground font-medium">{statsLabels.rating}</div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
            
            {/* Animated decorative elements */}
            <motion.div 
              className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-primary/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              aria-hidden="true"
            />
            <motion.div 
              className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-primary/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              aria-hidden="true"
            />
            <motion.div 
              className="absolute top-1/2 -left-4 w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full blur-2xl"
              animate={{
                x: [-10, 10, -10],
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator - hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, repeat: Infinity, repeatType: "reverse" }}
        className="hidden md:flex absolute bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 text-primary"
      >
      
      </motion.div>
    </motion.section>
  );
};
