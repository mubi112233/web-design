import { Calendar, UserCheck, Rocket, LineChart } from "lucide-react";
import { getCopy } from "@/lib/copy";

const steps = [
  { icon: Calendar, key: "step1" },
  { icon: UserCheck, key: "step2" },
  { icon: Rocket, key: "step3" },
  { icon: LineChart, key: "step4" },
];

export async function HowItWorks({ lang }: { lang: string }) {
  const copy = getCopy(lang, 'howItWorks');

  return (
    <section 
      id="how-it-works"
      className="relative py-8 sm:py-10 md:py-12 lg:py-14 bg-[hsl(220_85%_20%)] z-20 min-h-[600px]"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-10 sm:mb-16 md:mb-20 text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-white">
            {copy.heading}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed">
            {copy.description}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={step.key}
              className={`flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center shadow-[0_20px_60px_-15px_hsl(220_100%_50%/0.6)] relative group">
                <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl group-hover:blur-2xl transition-all duration-500" />
                <step.icon className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white relative z-10" />
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 md:-top-1 md:-right-1 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white text-blue-600 rounded-full flex items-center justify-center text-xs sm:text-sm md:text-base font-bold">
                  {index + 1}
                </div>
              </div>
              
              <div className="flex-1 bg-white/5 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 hover:shadow-[0_25px_60px_-15px_hsl(220_100%_50%/0.4)] transition-all duration-500 group">
                <p className="text-blue-400 font-bold text-sm uppercase tracking-wider mb-3 inline-block px-3 py-1 bg-blue-500/10 rounded-full">
                  {copy.steps[step.key as keyof typeof copy.steps].step}
                </p>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-white group-hover:text-blue-300 transition-colors duration-300">
                  {copy.steps[step.key as keyof typeof copy.steps].title}
                </h3>
                <p className="text-white/60 leading-relaxed text-sm sm:text-base md:text-lg">
                  {copy.steps[step.key as keyof typeof copy.steps].description}
                </p>
                
                {/* Decorative corner */}
                <div className={`absolute ${index % 2 === 1 ? 'top-0 left-0 rounded-tl-xl sm:rounded-tl-2xl' : 'bottom-0 right-0 rounded-bl-xl sm:rounded-bl-2xl'} w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 transition-all duration-500`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
