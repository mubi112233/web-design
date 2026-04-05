import { SPACING } from "@/lib/constants";
import { fetchFAQData } from "@/lib/data-fetching";
import { FAQInteractive } from "@/components/FAQInteractive.client";

export async function FAQ({ lang }: { lang: string }) {
  const faqs = await fetchFAQData(lang);

  if (faqs.length === 0) {
    return (
      <section
        id="faq"
        className={`relative py-8 sm:py-10 md:py-12 lg:py-14 bg-gradient-to-b from-background via-muted/30 to-background z-80 overflow-hidden`}
      >
        <div className={`container mx-auto ${SPACING.container} relative z-10`}>
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">
              {lang === "ge"
                ? "Keine FAQs verfügbar. Bitte fügen Sie FAQs im Admin-Panel hinzu."
                : "No FAQs available. Please add FAQs in the admin panel."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return <FAQInteractive faqs={faqs} lang={lang} />;
}
