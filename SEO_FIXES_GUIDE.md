# SEO Fixes - Code Implementation Guide

## 🔧 CRITICAL FIX #1: Fix Canonical URL in Blog Posts

**File:** [src/app/[lang]/blog/[slug]/page.tsx](src/app/[lang]/blog/[slug]/page.tsx)

**Problem:** Wrong domain in canonical URL
```tsx
// ❌ CURRENT (WRONG)
const canonical = `https://don-va.com/${lang}/blog/${slug}`;

// ✅ SHOULD BE
const canonical = `https://don-seo.com/${lang}/blog/${slug}`;
```

**Implementation:**
```tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = await getBlogPost(lang, slug);

  if (!post) return {};

  const title = `${post.title} | DON VA`;
  const description = post.excerpt?.substring(0, 160) || "";
  const canonical = `https://don-seo.com/${lang}/blog/${slug}`; // ✅ FIXED

  return {
    title,
    description,
    alternates: { canonical },
    // ... rest of metadata
  };
}
```

---

## 🔧 CRITICAL FIX #2: Add Image Alt Text

**Files Affected:**
- [src/components/Hero.tsx](src/components/Hero.tsx)
- [src/components/Services.tsx](src/components/Services.tsx)
- [src/components/Blog.tsx](src/components/Blog.tsx)
- [src/components/CaseStudies.tsx](src/components/CaseStudies.tsx)

**Example - Hero Component:**
```tsx
// ❌ CURRENT (NO ALT TEXT)
<Image 
  src={heroData.image} 
  alt="" // ❌ EMPTY ALT TEXT
  width={1200}
  height={900}
/>

// ✅ SHOULD BE
<Image
  src={heroData.image}
  alt={heroData.title || "Virtual assistants team working on project"} // ✅ DESCRIPTIVE
  width={1200}
  height={900}
  priority
/>
```

**For Dynamic Content from API:**
```tsx
// Ensure API returns alt text
interface HeroData {
  title: string;
  subtitle: string;
  image: string;
  imageAlt?: string; // Add this field
  // ... other fields
}

// Use fallback if not provided
<Image
  src={heroData.image}
  alt={heroData.imageAlt || heroData.title || "DON VA virtual assistants"}
  width={1200}
  height={900}
  priority
/>
```

---

## 🔧 CRITICAL FIX #3: Render Structured Data in HTML

**File:** [src/components/Blog.tsx](src/components/Blog.tsx) or create new post layout

**Problem:** Structured data is generated but not rendered

**Solution:**
```tsx
import { generateBlogStructuredData } from "@/lib/structured-data";

export async function BlogPostPage({ 
  post, 
  url 
}: { 
  post: BlogPost; 
  url: string; 
}) {
  const structuredData = generateBlogStructuredData({
    title: post.title,
    description: post.excerpt,
    author: post.author,
    publishedAt: post.date,
    updatedAt: post.updatedAt,
    image: post.image,
    url: url,
  });

  return (
    <>
      {/* ✅ ADD THIS SCRIPT */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      {/* Rest of your component */}
      <article>
        <h1>{post.title}</h1>
        <p>{post.excerpt}</p>
        {/* ... */}
      </article>
    </>
  );
}
```

---

## 🔧 FIX #4: Add FAQ Schema

**File:** [src/lib/structured-data.ts](src/lib/structured-data.ts)

**Add New Function:**
```tsx
interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      }
    }))
  };
}
```

**Usage in FAQ Component:**
```tsx
"use client";

import { useEffect } from "react";
import { generateFAQSchema } from "@/lib/structured-data";

const faqs = [
  {
    question: "How quickly can I hire a virtual assistant?",
    answer: "You can hire within days of signing up. Our pre-vetted team means zero recruitment overhead.",
  },
  {
    question: "What languages do your VAs speak?",
    answer: "All our virtual assistants are German-speaking. Many also speak English and other languages.",
  },
  // ... more FAQs
];

export function FAQ() {
  useEffect(() => {
    // Add schema to head
    const schema = generateFAQSchema(faqs);
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);
  }, []);

  return (
    <section>
      <h2>Frequently Asked Questions</h2>
      {faqs.map((faq) => (
        <div key={faq.question}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}
    </section>
  );
}
```

---

## 🔧 FIX #5: Add Breadcrumb Navigation

**File:** Create `src/components/Breadcrumb.tsx`

```tsx
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `https://don-seo.com${item.href}`,
    })),
  };

  return (
    <>
      {/* ✅ Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
      
      {/* ✅ Visual breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center gap-2 text-sm">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && <span className="text-gray-400">/</span>}
              {index === items.length - 1 ? (
                <span className="text-gray-600">{item.label}</span>
              ) : (
                <Link href={item.href} className="text-blue-600 hover:underline">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
```

**Usage in Blog Post:**
```tsx
import { Breadcrumb } from "@/components/Breadcrumb";

export default function BlogPostPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/en" },
          { label: "Blog", href: "/en/blog" },
          { label: "Post Title", href: "/en/blog/post-slug" },
        ]}
      />
      {/* Rest of post */}
    </>
  );
}
```

---

## 🔧 FIX #6: Update Organization Schema with Social Links

**File:** [src/app/layout.tsx](src/app/layout.tsx)

```tsx
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DON VA",
  url: "https://don-seo.com",
  logo: "https://don-seo.com/logo.png",
  description:
    "Pre-vetted, German-speaking virtual assistants for 80% less than local hires.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English", "German"],
  },
  sameAs: [ // ✅ ADD THIS
    "https://linkedin.com/company/don-va", // Update with actual URL
    "https://twitter.com/don_va", // Update with actual URL
    "https://facebook.com/don-va", // Update with actual URL
    "https://instagram.com/don_va", // Update with actual URL
  ],
  areaServed: {
    "@type": "GeoShape",
    addressCountry: ["DE", "AT", "CH"],
  },
  priceRange: "$$$",
};
```

---

## 🔧 FIX #7: Verify H1 Tags on All Pages

**Checklist:**

- [ ] Homepage ([src/app/[lang]/page.tsx](src/app/[lang]/page.tsx)) - ONE H1
- [ ] Blog page ([src/app/[lang]/blog/page.tsx](src/app/[lang]/blog/page.tsx)) - ONE H1
- [ ] Blog post page ([src/app/[lang]/blog/[slug]/page.tsx](src/app/[lang]/blog/[slug]/page.tsx)) - ONE H1 (post title)
- [ ] Case studies page ([src/app/[lang]/case-study/page.tsx](src/app/[lang]/case-study/page.tsx)) - ONE H1
- [ ] Contact page ([src/app/[lang]/contact/page.tsx](src/app/[lang]/contact/page.tsx)) - ONE H1
- [ ] Book meeting page ([src/app/[lang]/book-meeting/page.tsx](src/app/[lang]/book-meeting/page.tsx)) - ONE H1

**Example - Correct H1 Structure:**
```tsx
// ✅ CORRECT
<main>
  <h1>Scale Your Business with Dedicated Virtual Assistants</h1>
  
  <section>
    <h2>Why Choose DON VA?</h2>
    <p>...</p>
  </section>
</main>

// ❌ WRONG (Multiple H1s or Missing H1)
<main>
  <h2>Welcome to DON VA</h2> {/* Should be H1 */}
  <h1>Virtual Assistants</h1>
  <h1>Affordable Services</h1> {/* Second H1 - NO! */}
</main>
```

---

## 🔧 FIX #8: Reduce Meta Keywords

**File:** [src/app/layout.tsx](src/app/layout.tsx)

```tsx
// ❌ TOO MANY (6+ keywords)
keywords: [
  "virtual assistant",
  "VA services",
  "German speaking VA",
  "remote assistant",
  "business scaling",
  "DON VA",
],

// ✅ OPTIMIZED (3-5 keywords)
keywords: [
  "virtual assistants",
  "German speaking VA",
  "business scaling",
],
```

---

## 🧪 TESTING CHECKLIST

After implementing fixes:

```bash
# Test with Next.js built-in testing
npm run build

# Check for warnings/errors
npm run lint

# Test structured data
# Use: https://schema.org/validator or Google Rich Result Tester
```

**Manual Testing:**
1. View page source (Ctrl+U) and look for:
   - `<title>` tags
   - `<meta name="description">`
   - `<link rel="canonical">`
   - `<script type="application/ld+json">` (check it's valid JSON)
   - `<h1>` tags

2. Test with Google Tools:
   - [Google Rich Result Tester](https://search.google.com/test/rich-results)
   - [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
   - [PageSpeed Insights](https://pagespeed.web.dev/)

3. Test structured data:
   - [schema.org Validator](https://validator.schema.org/)

---

## 📋 IMPLEMENTATION ORDER

**Priority 1 (Today):**
1. Fix canonical URL in blog post
2. Add FAQ schema function
3. Add breadcrumb component

**Priority 2 (This Week):**
1. Add image alt text
2. Render structured data in HTML
3. Verify H1 tags

**Priority 3 (Next Week):**
1. Add social links to schema
2. Reduce keyword count
3. Test everything

---

## 🚀 DEPLOYMENT NOTES

Before pushing to production:
1. Build locally: `npm run build`
2. Preview build: `npm run preview`
3. Test with Google Rich Result Tool
4. Test with Lighthouse
5. Verify canonical URLs point to correct domain
6. Ensure all images have alt text
7. Check Core Web Vitals

```bash
# Production build
npm run build
npm run start

# Monitor with Google Search Console
# Add new sitemap: https://www.google.com/webmasters
```

---

**Total Estimated Implementation Time:** 2-4 hours
**Impact on SEO:** +30-50% improvement in search visibility
