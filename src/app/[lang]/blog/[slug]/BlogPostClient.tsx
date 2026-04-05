"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getCopy } from "@/lib/copy";
import { SPACING } from "@/lib/constants";
import { Breadcrumb } from "@/components/Breadcrumb";

interface BlogPost {
  blogId: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

export default function BlogPostClient({
  post,
  lang,
}: {
  post: BlogPost;
  lang: string;
}) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const copy = getCopy(lang, "blog");
  const isGe = lang === "ge";

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: typeof window !== "undefined" ? window.location.href : "",
    };
    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== "AbortError") copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`min-h-screen ${SPACING.sideMargin} bg-background`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8"
      >
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: isGe ? "Startseite" : "Home", href: `/${lang}` },
            { label: "Blog", href: `/${lang}/blog` },
            { label: post.title, href: `/${lang}/blog/${post.title}` },
          ]}
        />

        {/* Back button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 mb-6 sm:mb-8 text-sm text-muted-foreground hover:text-gold transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline">{isGe ? "Zurück zum Blog" : "Back to Blog"}</span>
          <span className="sm:hidden">{isGe ? "Zurück" : "Back"}</span>
        </motion.button>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8 sm:mb-10"
        >
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-gold/10 text-gold text-xs sm:text-sm font-bold rounded-full">
              {post.category}
            </span>
            <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                <time dateTime={post.date}>{post.date}</time>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold text-base sm:text-lg flex-shrink-0">
                {post.author.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm sm:text-base">{post.author}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{copy.by}</div>
              </div>
            </div>
            <button
              onClick={handleShare}
              className="relative p-2.5 sm:p-3 rounded-full bg-gold/10 text-gold hover:bg-gold/20 transition-colors self-start sm:self-auto group"
              aria-label="Share"
            >
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
              {copied && (
                <span className="absolute -top-10 right-0 bg-foreground text-background text-xs px-2 py-1 rounded whitespace-nowrap">
                  {isGe ? "Link kopiert!" : "Link copied!"}
                </span>
              )}
            </button>
          </div>
        </motion.header>

        {/* Featured image */}
        {post.image && (
          <motion.figure
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-8 sm:mb-12"
          >
            <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
              <Image src={post.image} alt={post.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1024px" className="object-cover" priority />
            </div>
          </motion.figure>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="prose prose-base sm:prose-lg max-w-none mb-10 sm:mb-14
              prose-headings:font-bold
              prose-h2:text-amber-500 prose-h2:text-2xl sm:prose-h2:text-3xl lg:prose-h2:text-4xl prose-h2:mb-6 prose-h2:mt-14 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-gradient-to-r prose-h2:from-amber-500 prose-h2:to-yellow-600
              prose-h3:text-yellow-500 prose-h3:text-xl sm:prose-h3:text-2xl lg:prose-h3:text-3xl prose-h3:mb-4 prose-h3:mt-10
              prose-h4:text-yellow-400 prose-h4:text-lg sm:prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-8
              prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:mb-5 prose-p:text-base sm:prose-p:text-lg lg:prose-p:text-[1.05rem]
              prose-strong:text-amber-500 prose-strong:font-semibold prose-strong:text-base sm:prose-strong:text-lg
              prose-ul:my-6 prose-ul:space-y-3
              prose-ol:my-6 prose-ol:space-y-3
              prose-li:text-foreground/85 prose-li:text-base sm:prose-li:text-lg lg:prose-li:text-[1.05rem] prose-li:leading-relaxed prose-li:pl-2
              [&_ul]:list-none [&_ul]:pl-0
              [&_ul>li]:relative [&_ul>li]:pl-8 [&_ul>li]:before:content_['▸'] [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:text-amber-500 [&_ul>li]:before:font-bold [&_ul>li]:before:text-xl
              [&_ol]:list-none [&_ol]:pl-0 [&_ol]:counter-reset-[item]
              [&_ol>li]:relative [&_ol>li]:pl-8 [&_ol>li]:counter-increment-[item] [&_ol>li]:before:content-[counter(item)] [&_ol>li]:before:absolute [&_ol>li]:before:left-0 [&_ol>li]:before:text-amber-500 [&_ol>li]:before:font-bold [&_ol>li]:before:text-lg [&_ol>li]:before:bg-amber-500/10 [&_ol>li]:before:w-6 [&_ol>li]:before:h-6 [&_ol>li]:before:rounded-full [&_ol>li]:before:flex [&_ol>li]:before:items-center [&_ol>li]:before:justify-center
              [&_li>strong]:text-amber-500
              [&_br]:my-2"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Category */}
        {post.category && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-8 sm:mt-10 pb-6 sm:pb-8 border-b border-border/50">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              {isGe ? "Kategorie" : "Category"}
            </h3>
            <span className="px-4 py-2 bg-gold/10 text-gold text-sm font-medium rounded-lg">{post.category}</span>
          </motion.div>
        )}

        {/* Author bio */}
        <motion.aside
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 sm:mt-10 p-5 sm:p-6 lg:p-8 bg-gradient-to-br from-gold/5 via-gold/10 to-transparent border border-gold/20 rounded-xl sm:rounded-2xl shadow-sm"
        >
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center text-gold font-bold text-xl sm:text-2xl flex-shrink-0">
              {post.author.charAt(0)}
            </div>
            <div>
              <div className="font-bold text-foreground text-base sm:text-lg mb-1">{post.author}</div>
              <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {isGe
                  ? "Experte für virtuelle Assistenten und Remote-Arbeit."
                  : "Expert in virtual assistance and remote work. Sharing insights and best practices for efficient team collaboration."}
              </div>
            </div>
          </div>
        </motion.aside>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 sm:mt-10 p-6 sm:p-8 bg-gradient-to-br from-gold/10 via-gold/5 to-transparent border-2 border-gold/30 rounded-2xl text-center"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
            {isGe ? "Bereit, Ihr Team zu skalieren?" : "Ready to Scale Your Team?"}
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-2xl mx-auto">
            {isGe ? "Entdecken Sie, wie virtuelle Assistenten Ihr Unternehmen transformieren können." : "Discover how virtual assistants can transform your business."}
          </p>
          <button
            onClick={() => router.push(`/${lang}/book-meeting`)}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gold text-foreground text-sm sm:text-base font-bold rounded-xl hover:bg-gold/90 transition-all hover:shadow-xl hover:scale-105"
          >
            {isGe ? "Jetzt starten" : "Get Started"}
          </button>
        </motion.div>

        {/* Back to blog */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-border/50 text-center"
        >
          <button
            onClick={() => router.push(`/${lang}/blog`)}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-card border border-border/50 text-foreground text-sm sm:text-base font-semibold rounded-xl hover:border-gold/50 hover:bg-card/80 transition-all hover:shadow-lg group"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">{isGe ? "Alle Blog-Artikel ansehen" : "View All Blog Posts"}</span>
            <span className="sm:hidden">{isGe ? "Alle Artikel" : "All Posts"}</span>
          </button>
        </motion.footer>
      </motion.article>
    </div>
  );
}
