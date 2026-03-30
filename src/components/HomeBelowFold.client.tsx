"use client";

import dynamic from "next/dynamic";
import { Services } from "@/components/Services";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { WhyChooseUsCards } from "@/components/WhyChooseUsCards";

const HowItWorksDynamic = dynamic(
  () => import("@/components/HowItWorksDynamic").then((m) => m.HowItWorksDynamic),
  { ssr: false }
);

const PricingDynamic = dynamic(
  () => import("@/components/PricingDynamic").then((m) => m.PricingDynamic),
  { ssr: false }
);

const ToolsIntegration = dynamic(
  () => import("@/components/ToolsIntegration").then((m) => m.ToolsIntegration),
  { ssr: false }
);

const Testimonials = dynamic(
  () => import("@/components/Testimonials").then((m) => m.Testimonials),
  { ssr: false }
);

const CaseStudies = dynamic(
  () => import("@/components/CaseStudies").then((m) => m.CaseStudies),
  { ssr: false }
);

const Blog = dynamic(() => import("@/components/Blog").then((m) => m.Blog), {
  ssr: false,
});

const FAQ = dynamic(() => import("@/components/FAQ").then((m) => m.FAQ), {
  ssr: false,
});

const FinalCTA = dynamic(
  () => import("@/components/FinalCTA").then((m) => m.FinalCTA),
  { ssr: false }
);

const Footer = dynamic(() => import("@/components/Footer").then((m) => m.Footer), {
  ssr: false,
});

export function HomeBelowFold({ lang }: { lang: string }) {
  return (
    <>
      <div className="px-[50px] max-sm:px-4">
        <WhyChooseUsCards />
        <HowItWorksDynamic />
        <Services />
        <WhyChooseUs />
        <PricingDynamic lang={lang} />
        <CaseStudies />
        <Blog />
        <ToolsIntegration />
        <Testimonials />
        <FAQ />
      </div>
      <Footer />
    </>
  );
}
