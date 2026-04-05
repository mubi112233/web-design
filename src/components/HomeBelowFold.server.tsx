import { HowItWorks } from "@/components/HowItWorks";
import { Services } from "@/components/Services.server";
import { Pricing } from "@/components/Pricing";
import { SPACING } from "@/lib/constants";
import { ToolsIntegration } from "@/components/ToolsIntegration";
import { Testimonials } from "@/components/Testimonials.server";
import { CaseStudies } from "@/components/CaseStudies.server";
import { Blog } from "@/components/Blog";
import { FAQ } from "@/components/FAQ.server";
import { FinalCTA } from "@/components/FinalCTA.server";

export function HomeBelowFold({ lang }: { lang: string }) {
  return (
    <>
      <div className={SPACING.container}>
        <HowItWorks />
        <Services lang={lang} />
        <Pricing />
        <ToolsIntegration />
        <Testimonials lang={lang} />
        <Blog />
        <CaseStudies lang={lang} />
        <FAQ lang={lang} />
      </div>
      <FinalCTA lang={lang} />
    </>
  );
}
