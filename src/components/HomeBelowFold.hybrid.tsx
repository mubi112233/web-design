import { Services } from "@/components/Services.server";
import { Testimonials } from "@/components/Testimonials.server";
import { HowItWorks } from "@/components/HowItWorks.server";
import { Pricing } from "@/components/Pricing.server";
import { ToolsIntegration } from "@/components/ToolsIntegration.server";
import { CaseStudies } from "@/components/CaseStudies.server";
import { Blog } from "@/components/Blog.server";
import { FAQ } from "@/components/FAQ.server";
import { FinalCTA } from "@/components/FinalCTA.server";
import { SPACING } from "@/lib/constants";

export function HomeBelowFold({ lang }: { lang: string }) {
  return (
    <>
      <div className={SPACING.container}>
        <HowItWorks lang={lang} />
        <Services lang={lang} />
        <Pricing lang={lang} />
        <ToolsIntegration lang={lang} />
        <Testimonials lang={lang} />
        <Blog lang={lang} />
        <CaseStudies lang={lang} />
        <FAQ lang={lang} />
      </div>
      <FinalCTA lang={lang} />
    </>
  );
}
