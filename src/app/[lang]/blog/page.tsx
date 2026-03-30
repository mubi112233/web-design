"use client";

import { Blog } from "@/components/Blog";
import { use } from "react";

export default function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params);
  
  return (
    <>
      <title>{lang === "ge" ? "Blog - DON VA" : "Blog - DON VA"}</title>
      <meta 
        name="description" 
        content={lang === "ge" 
          ? "Entdecken Sie Einblicke, Tipps und Best Practices für virtuelle Assistenten und Remote-Arbeit."
          : "Discover insights, tips, and best practices for virtual assistants and remote work."} 
      />
      <Blog />
    </>
  );
}
