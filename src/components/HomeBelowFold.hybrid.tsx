"use client";

import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { ToolsIntegration } from "@/components/ToolsIntegration";
import { CaseStudies } from "@/components/CaseStudies";
import { Blog } from "@/components/Blog";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { SPACING } from "@/lib/constants";
import { usePathname } from "next/navigation";

export function HomeBelowFold() {
  const pathname = usePathname();
  const currentLang = pathname.startsWith('/ge') || pathname.startsWith('/de') ? 'ge' : 'en';

  return (
    <>
      <div className={SPACING.container}>
        <HowItWorks />
        <Services />
        <Pricing />
        <ToolsIntegration />
        <Testimonials />
        <Blog />
        <CaseStudies />
        <FAQ />
      </div>
      <FinalCTA />
    </>
  );
}
