import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fetchTestimonialsData, Testimonial } from "@/lib/data-fetching";
import { getCopy } from "@/lib/copy";
import { SPACING } from "@/lib/constants";

// Server Component - fetches data on server
export async function Testimonials({ lang }: { lang: string }) {
  // Fetch data on server-side
  const testimonials = await fetchTestimonialsData(lang);
  const copy = getCopy(lang, 'testimonials');

  if (!testimonials || testimonials.length === 0) {
    return (
      <motion.section id="testimonials" className="relative py-8 sm:py-10 md:py-14 lg:py-16 bg-background text-foreground z-30 overflow-hidden">
        <div className={`container mx-auto ${SPACING.container}`}>
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">
              {lang === "ge" ? "Keine Testimonials verfügbar." : "No testimonials available."}
            </p>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section 
      id="testimonials"
      className="relative py-8 sm:py-10 md:py-14 lg:py-16 bg-background text-foreground z-30 overflow-hidden"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gold/5 rounded-full blur-[100px] md:blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-primary/5 rounded-full blur-[100px] md:blur-[150px]" />

      <div className={`container mx-auto ${SPACING.container} relative z-10`}>
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-foreground leading-tight">
            {copy.heading}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {copy.subheading}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial._id || index}
              className="group relative bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-gold/50"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Quote icon */}
              <div className="absolute -top-3 -right-3 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-gold/20">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Stars */}
                <div className="flex mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors duration-300 ${
                        i < 4 ? 'text-gold fill-current' : 'text-gold/30'
                      }`}
                    />
                  ))}
                </div>

                {/* Testimonial */}
                <blockquote className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-sm sm:text-base">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-foreground text-sm sm:text-base mb-1">
                      {testimonial.name}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      {testimonial.role} • {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
