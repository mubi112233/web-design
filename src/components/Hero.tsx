"use client";

import { Button } from "@/components/ui/button";
import { motion, useInView, useScroll, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import {
  ArrowRight,
  Calendar,
  Sparkles,
  Award,
  Loader2,
  TrendingUp,
  Search,
  BarChart3,
  CheckCircle2,
  Zap,
  Globe,
} from "lucide-react";
import { fetchHero, HeroData } from "@/lib/api";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { siteConfig, localizedPath, type SiteLocale } from "@/lib/site-config";

export const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const router = useRouter();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  // Mouse tracking for 3D effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const [currentLang, setCurrentLang] = useState<string>("en");
  const abortControllerRef = useRef<AbortController | null>(null);

  const getLangFromPath = () => {
    if (typeof window === "undefined") return "en";
    const match = window.location.pathname.match(/^\/(en|ge|de)\b/i);
    const raw = match?.[1]?.toLowerCase() || "en";
    return raw === "de" ? "ge" : raw;
  };

  useEffect(() => {
    setCurrentLang(getLangFromPath());
  }, []);

  const isGe = currentLang === "ge";

  const fallbackData: HeroData = useMemo(() => isGe
    ? {
        title: "Skalieren Sie Ihr Team mit Top Virtual Assistants",
        subtitle:
          "Professionelle Personalvermittlung für Unternehmen in der DACH-Region. Wir finden und verwalten hochqualifizierte virtuelle Assistenten für Ihr Wachstum.",
        tagline: "Von 200+ wachsenden Unternehmen vertraut",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=900&fit=crop&q=80",
        ctaPrimary: "Jetzt starten",
        urgency: "Begrenztes Angebot",
        stats: { clients: "200+", costSaved: "70%", rating: "4.9/5" },
      }
    : {
        title: "Scale Your Team with Top Virtual Assistants",
        subtitle:
          "Professional staffing solutions for businesses in the DACH region. We find and manage high-quality virtual assistants for your growth.",
        tagline: "Trusted by 200+ Growing Businesses",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=900&fit=crop&q=80",
        ctaPrimary: "Get Started Today",
        urgency: "Limited Offer",
        stats: { clients: "200+", costSaved: "70%", rating: "4.9/5" },
      }, [isGe]);

  const [heroData, setHeroData] = useState<HeroData | null>(fallbackData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHeroData = async () => {
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
          console.error("Failed to fetch hero data:", error);
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
  }, [currentLang, fallbackData]);

  const title = heroData?.title || fallbackData.title;
  const subtitle = heroData?.subtitle || fallbackData.subtitle;
  const tagline = heroData?.tagline || fallbackData.tagline;
  const rawImage = heroData?.image || fallbackData.image;
  // Handle relative image URLs by prepending API base URL
  const heroImage = rawImage?.startsWith('/') && !rawImage.startsWith('http')
    ? `${process.env.NEXT_PUBLIC_API_BASE || 'https://api.don-va.com'}${rawImage}`
    : rawImage;
  const ctaPrimary = heroData?.ctaPrimary || fallbackData.ctaPrimary;
  const urgency = heroData?.urgency || fallbackData.urgency;
  const stats = heroData?.stats || fallbackData.stats;
  const statsLabels = isGe
    ? { clients: "Kunden", costSaved: "Kosten gespart", rating: "Bewertung" }
    : { clients: "Clients", costSaved: "Cost Saved", rating: "Rating" };

  // Floating particles data
  const particles = [
    { x: "10%", y: "20%", delay: 0, duration: 3 },
    { x: "80%", y: "30%", delay: 1, duration: 4 },
    { x: "20%", y: "70%", delay: 2, duration: 3.5 },
    { x: "90%", y: "60%", delay: 0.5, duration: 4.5 },
    { x: "50%", y: "15%", delay: 1.5, duration: 3 },
  ];

  return (
    <motion.section
      ref={ref}
      className="relative min-h-screen flex items-center bg-background text-foreground overflow-hidden pt-16 sm:pt-20 md:pt-0"
      style={{ opacity }}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[2px] text-muted-foreground z-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" aria-hidden />
        </div>
      )}

      {/* Enhanced 3D Background Elements */}
      <motion.div 
        className="absolute top-10 sm:top-20 right-5 sm:right-10 w-48 h-48 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-blue-500/15 to-cyan-500/15 dark:from-gold/20 dark:to-accent/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ transformStyle: "preserve-3d", y: springY }}
        aria-hidden
      />
      <motion.div 
        className="absolute bottom-10 sm:bottom-20 left-5 sm:left-10 w-40 h-40 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-gradient-to-tr from-blue-400/12 to-cyan-400/12 dark:from-primary/20 dark:to-gold/20 rounded-full blur-3xl"
        animate={{
          scale: [1.3, 1, 1.3],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ transformStyle: "preserve-3d", y: springY }}
        aria-hidden
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 w-48 h-48 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-blue-500/8 to-purple-500/8 dark:from-blue-500/10 dark:to-purple-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden
      />

      {/* Floating Particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-500/30 dark:bg-gold/40 rounded-full shadow-sm"
          style={{ left: particle.x, top: particle.y }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
          aria-hidden
        />
      ))}

      <div className="container mx-auto !px-0 relative z-10 max-w-7xl" style={{ perspective: "2000px" }}>
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Content with 3D transforms */}
          <motion.div
            className="text-left"
            initial={{ opacity: 0, x: -50, rotateY: -20 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div 
              className="inline-flex items-center space-x-1.5 sm:space-x-2 bg-gradient-to-r from-blue-50 to-cyan-50 dark:bg-gold/10 border border-blue-200 dark:border-gold/20 text-blue-700 dark:text-gold px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full mb-3 sm:mb-4 md:mb-6 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300"
              initial={{ scale: 0, rotateZ: -180 }}
              animate={{ scale: 1, rotateZ: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05, translateZ: 20 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Globe className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium">{tagline}</span>
            </motion.div>
            
            <motion.h1 
              className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 md:mb-6 leading-tight drop-shadow-[0_2px_24px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {title.split(' ').map((word: string, index: number) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                  className="inline-block"
                  style={{ transform: "translateZ(30px)" }}
                >
                  {word}{' '}
                </motion.span>
              ))}
            </motion.h1>
            
            <motion.p 
              className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 dark:text-slate-200 mb-4 sm:mb-6 md:mb-8 leading-relaxed max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
            >
              {subtitle}
            </motion.p>

            {/* Key Features Pills */}
            <motion.div 
              className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 mb-4 sm:mb-6 md:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {[
                { icon: CheckCircle2, text: stats.costSaved, color: "from-emerald-50 to-green-50 dark:from-emerald-500/30 dark:to-green-500/30 border-emerald-200 dark:border-emerald-400/40", textColor: "text-emerald-700 dark:text-emerald-300" },
                { icon: TrendingUp, text: stats.rating, color: "from-amber-50 to-yellow-50 dark:from-amber-500/30 dark:to-yellow-500/30 border-amber-200 dark:border-amber-400/40", textColor: "text-amber-700 dark:text-amber-300" },
                { icon: Zap, text: urgency, color: "from-blue-50 to-cyan-50 dark:from-blue-500/30 dark:to-cyan-500/30 border-blue-200 dark:border-cyan-400/40", textColor: "text-blue-700 dark:text-cyan-300" },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  className={`inline-flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 bg-gradient-to-r ${feature.color} border backdrop-blur-sm rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300`}
                  whileHover={{ scale: 1.05, translateZ: 25, y: -2 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <feature.icon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0 ${feature.textColor}`} />
                  <span className={`text-xs sm:text-sm font-semibold ${feature.textColor} whitespace-nowrap`}>{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                whileHover={{ scale: 1.05, translateZ: 30 }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: "preserve-3d" }}
                className="w-full sm:w-auto"
              >
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  onClick={() => {
                    router.push(
                      localizedPath((currentLang === "ge" ? "ge" : "en") as SiteLocale, siteConfig.routes.bookMeeting)
                    );
                  }}
                >
                  {ctaPrimary}
                  <ArrowRight className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="flex flex-col xs:flex-row items-start xs:items-center gap-3 xs:gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm text-slate-600 dark:text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div 
                className="flex items-center space-x-1.5 sm:space-x-2 hover:text-blue-600 dark:hover:text-gold transition-colors duration-300"
                whileHover={{ scale: 1.1, translateZ: 20 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 text-blue-600 dark:text-gold flex-shrink-0" />
                <span>{stats.clients} Clients</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Image with 3D Card Effect */}
          <motion.div 
            className="relative z-10 mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 50, rotateY: 20 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
          >
            {/* Main 3D Image Card */}
            <motion.div
              style={{
                rotateX: isHovered ? rotateX : 0,
                rotateY: isHovered ? rotateY : 0,
                transformStyle: "preserve-3d",
              }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              className="relative z-0"
            >
              {/* Enhanced Glow effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-600/20 dark:from-gold/40 dark:via-accent/40 dark:to-blue-500/40 rounded-3xl blur-3xl"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0.6, 0.3],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ transform: "translateZ(-50px)" }}
                aria-hidden
              />

              {/* Additional pulsing rings */}
              <motion.div 
                className="absolute inset-0 rounded-3xl border-4 border-blue-400/40 dark:border-gold/30"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ transform: "translateZ(-20px)" }}
                aria-hidden
              />
              
              {/* Image container with 3D depth */}
              <motion.div
                className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-blue-400/40 dark:border-gold/30 hover:border-blue-500/60 dark:hover:border-gold/50 transition-colors duration-500"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "translateZ(50px)",
                }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <Image
                    src={heroImage}
                    alt={isGe ? "Virtuelle Assistenten bei der Arbeit" : "Virtual Assistant at Work"}
                    width={1600}
                    height={1200}
                    className="w-full h-auto object-cover"
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </motion.div>
                
                {/* Enhanced overlay gradients */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-cyan-500/10 dark:from-gold/20 dark:via-transparent dark:to-blue-500/20 mix-blend-overlay pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-400/5 to-transparent dark:via-purple-500/10 mix-blend-overlay pointer-events-none" />
                
                {/* Shine effect on hover */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full pointer-events-none"
                  animate={isHovered ? {
                    translateX: ["100%", "200%"],
                  } : {}}
                  transition={{
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                />

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-blue-500/60 dark:border-gold/50 rounded-tl-3xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-blue-500/60 dark:border-gold/50 rounded-br-3xl pointer-events-none" />

                {/* Stats Card overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 md:bottom-8 md:left-8 md:right-8 backdrop-blur-xl bg-card/95 border border-blue-400/40 dark:border-gold/30 rounded-2xl p-4 sm:p-5 shadow-2xl"
                  style={{ transform: "translateZ(80px)" }}
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
                        <Search
                          className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-blue-600 dark:text-gold group-hover/stat:text-blue-700 dark:group-hover/stat:text-gold/80 transition-colors"
                          aria-hidden
                        />
                        <div className="text-xs sm:text-sm md:text-base lg:text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-gold dark:to-accent bg-clip-text text-transparent">
                          {stats.clients}
                        </div>
                        <div className="text-[7px] sm:text-[8px] md:text-[9px] text-muted-foreground font-medium">
                          {statsLabels.clients}
                        </div>
                      </motion.div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.3, duration: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                      className="text-center border-x border-border/50 group/stat cursor-default"
                    >
                      <motion.div
                        animate={{ y: [-3, 3, -3] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                      >
                        <TrendingUp
                          className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-blue-600 dark:text-gold group-hover/stat:text-blue-700 dark:group-hover/stat:text-gold/80 transition-colors"
                          aria-hidden
                        />
                        <div className="text-xs sm:text-sm md:text-base lg:text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-gold dark:to-accent bg-clip-text text-transparent">
                          {stats.costSaved}
                        </div>
                        <div className="text-[7px] sm:text-[8px] md:text-[9px] text-muted-foreground font-medium">
                          {statsLabels.costSaved}
                        </div>
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
                        <BarChart3
                          className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 text-blue-600 dark:text-gold group-hover/stat:text-blue-700 dark:group-hover/stat:text-gold/80 transition-colors"
                          aria-hidden
                        />
                        <div className="text-xs sm:text-sm md:text-base lg:text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-gold dark:to-accent bg-clip-text text-transparent">
                          {stats.rating}
                        </div>
                        <div className="text-[7px] sm:text-[8px] md:text-[9px] text-muted-foreground font-medium">
                          {statsLabels.rating}
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Sparkle effects around image */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-500 dark:bg-gold rounded-full shadow-sm"
                  style={{
                    top: `${15 + i * 15}%`,
                    left: i % 2 === 0 ? "-5%" : "105%",
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                  aria-hidden
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
