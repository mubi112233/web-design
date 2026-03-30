"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { SPACING } from "@/lib/constants";

const tools = [
  { name: "Slack", category: "Communication" },
  { name: "Trello", category: "Project Management" },
  { name: "Asana", category: "Project Management" },
  { name: "Google Workspace", category: "Productivity" },
  { name: "Microsoft 365", category: "Productivity" },
  { name: "Canva", category: "Design" },
  { name: "Adobe Suite", category: "Design" },
  { name: "HubSpot", category: "CRM" },
  { name: "Salesforce", category: "CRM" },
  { name: "Zendesk", category: "Support" },
  { name: "Intercom", category: "Support" },
  { name: "Monday.com", category: "Project Management" },
  { name: "ClickUp", category: "Project Management" },
  { name: "WordPress", category: "CMS" },
  { name: "Shopify", category: "E-commerce" },
  { name: "Mailchimp", category: "Marketing" },
  { name: "SEMrush", category: "SEO" },
  { name: "Hootsuite", category: "Social Media" },
];

const categoryLabels: Record<string, { en: string; ge: string }> = {
  Communication:        { en: "Communication",       ge: "Kommunikation" },
  "Project Management": { en: "Project Management",  ge: "Projektmanagement" },
  Productivity:         { en: "Productivity",         ge: "Produktivität" },
  Design:               { en: "Design",               ge: "Design" },
  CRM:                  { en: "CRM",                  ge: "CRM" },
  Support:              { en: "Support",              ge: "Support" },
  CMS:                  { en: "CMS",                  ge: "CMS" },
  "E-commerce":         { en: "E-commerce",           ge: "E-Commerce" },
  Marketing:            { en: "Marketing",            ge: "Marketing" },
  SEO:                  { en: "SEO",                  ge: "SEO" },
  "Social Media":       { en: "Social Media",         ge: "Social Media" },
};

export const ToolsIntegration = () => {
  const pathname = usePathname();
  const isGe = pathname.startsWith("/ge") || pathname.startsWith("/de");

  const getCategory = (category: string) =>
    categoryLabels[category]?.[isGe ? "ge" : "en"] ?? category;

  return (
    <motion.section
      className="relative py-8 sm:py-10 md:py-12 lg:py-14 bg-gradient-to-b from-background via-muted/30 to-background"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      <div className={`container mx-auto ${SPACING.container}`}>
        {/* Header */}
        <motion.div
          className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            {isGe ? (
              <>Funktioniert mit Ihren <span className="text-gold">vorhandenen Tools</span></>
            ) : (
              <>Works With Your <span className="text-gold">Existing Tools</span></>
            )}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl">
            {isGe
              ? "Unsere VAs sind in den meisten gängigen Business-Tools geschult und passen sich Ihrem Workflow an."
              : "Our VAs are trained in most popular business tools and adapt to your existing workflow seamlessly."}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Tools grid */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                className="bg-card border-2 border-border rounded-lg p-3 sm:p-4 text-center hover:border-gold hover:shadow-lg hover:shadow-gold/10 transition-all duration-300 group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.04, ease: "easeOut" }}
              >
                <p className="text-sm sm:text-base font-semibold text-foreground group-hover:text-gold transition-colors">
                  {tool.name}
                </p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                  {getCategory(tool.category)}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Callout */}
          <motion.div
            className="bg-card border-2 border-gold/30 rounded-lg sm:rounded-xl p-5 sm:p-6 md:p-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <p className="text-base sm:text-lg text-foreground mb-3 sm:mb-4">
              <span className="font-bold text-gold">
                {isGe ? "Benötigen Sie ein bestimmtes Tool?" : "Need a specific tool?"}
              </span>{" "}
              {isGe ? "Einfach fragen." : "Just ask."}
            </p>
            <p className="text-sm sm:text-base text-muted-foreground">
              {isGe
                ? "Wir schulen unsere VAs in jedem Tool, das Sie benötigen – ohne zusätzliche Kosten."
                : "We train our VAs on any tool you need — at no extra cost."}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
