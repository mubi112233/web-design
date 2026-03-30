/**
 * API Utility Functions for Next.js Application
 * 
 * This utility provides consistent API fetching with proper headers
 * including the X-Tenant-ID header for multi-tenancy support.
 */

// API Configuration
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://api.don-va.com';
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID || '';

/**
 * Creates fetch options with proper headers including X-Tenant-ID
 */
export function createFetchOptions(options: RequestInit = {}): RequestInit {
  const headers = new Headers(options.headers || {});

  // Inject X-Tenant-ID if it's not already there
  if (!headers.has('X-Tenant-ID')) {
    headers.set('X-Tenant-ID', TENANT_ID);
  }

  // Set default content-type if not present and body exists
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  return {
    ...options,
    headers,
  };
}

/**
 * Server-side API fetch function with proper headers
 * Use this in server components and API routes
 */
export async function fetchAPI(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;
  const fetchOptions = createFetchOptions(options);

  return fetch(url, fetchOptions);
}

/**
 * Client-side API fetch function with proper headers
 * Use this in client components
 */
export async function fetchAPIClient(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;
  const fetchOptions = createFetchOptions(options);

  return fetch(url, fetchOptions);
}

/**
 * Common API endpoints used across the application
 */
export const API_ENDPOINTS = {
  HERO: '/api/hero',
  WHY_CHOOSE_US: '/api/why-choose-us',
  SERVICES: '/api/services',
  TESTIMONIALS: '/api/testimonials',
  FAQ: '/api/faq',
  CASE_STUDIES: '/api/case-studies',
  BLOGS: '/api/blogs',
  PRICING: '/api/pricing',
  HOW_IT_WORKS: '/api/how-it-works',
  FINAL_CTA: '/api/final-cta',
} as const;

/**
 * Helper function to build API URLs with language parameter
 */
export function buildApiUrl(endpoint: string, lang: string): string {
  const separator = endpoint.includes('?') ? '&' : '?';
  return `${endpoint}${separator}lang=${lang}`;
}

/**
 * Generic API fetcher for data with language support
 */
export async function fetchApiData<T>(
  endpoint: string,
  lang: string,
  options: RequestInit = {}
): Promise<T | null> {
  try {
    const url = buildApiUrl(endpoint, lang);
    const response = await fetchAPI(url, options);
    
    if (!response.ok) {
      console.warn(`API request failed: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('Failed to fetch API data:', error);
    return null;
  }
}

/**
 * Generic API fetcher for client-side data with language support
 */
export async function fetchApiDataClient<T>(
  endpoint: string,
  lang: string,
  options: RequestInit = {}
): Promise<T | null> {
  try {
    const url = buildApiUrl(endpoint, lang);
    const response = await fetchAPIClient(url, options);
    
    if (!response.ok) {
      console.warn(`API request failed: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('Failed to fetch API data:', error);
    return null;
  }
}

// Language normalization — API stores German data as 'de', not 'ge'
export const normalizeLanguage = (lang: string): string => {
  const normalized = lang.toLowerCase();
  if (normalized.startsWith('de') || normalized.startsWith('ge')) return 'de';
  return 'en';
};

// Hero API
export interface HeroData {
  title: string;
  subtitle: string;
  tagline: string;
  image: string;
  ctaPrimary: string;
  urgency: string;
  stats: {
    clients: string;
    costSaved: string;
    rating: string;
  };
}

export const fetchHero = (lang: string = 'en') => 
  fetchApiDataClient<{ hero: HeroData }>(API_ENDPOINTS.HERO, normalizeLanguage(lang))
    .then(data => data?.hero || null);

// Services API
export interface Service {
  _id?: string;
  order: number;
  title: string;
  description: string;
  benefit: string;
  icon: string;
}

export interface ServicesResponse {
  services: Service[];
}

export const fetchServices = (lang: string = 'en') => 
  fetchApiDataClient<ServicesResponse>(API_ENDPOINTS.SERVICES, normalizeLanguage(lang));

// Why Choose Us API
export interface WhyChooseUsData {
  badge: string;
  heading: string;
  description: string;
  items: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

export const fetchWhyChooseUs = (lang: string = 'en') => 
  fetchApiDataClient<{ whyChooseUs: WhyChooseUsData }>(API_ENDPOINTS.WHY_CHOOSE_US, normalizeLanguage(lang))
    .then(data => data?.whyChooseUs || null);

// Pricing API
export interface PricingPlan {
  planKey: string;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
}

export interface PricingResponse {
  plans: PricingPlan[];
}

export const fetchPricing = (lang: string = 'en') => 
  fetchApiDataClient<PricingResponse>(API_ENDPOINTS.PRICING, normalizeLanguage(lang));

// Testimonials API
export interface Testimonial {
  _id?: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
}

export interface TestimonialsResponse {
  testimonials: Testimonial[];
}

export const fetchTestimonials = (lang: string = 'en') => 
  fetchApiDataClient<TestimonialsResponse>(API_ENDPOINTS.TESTIMONIALS, normalizeLanguage(lang));

// How It Works API
export interface Step {
  _id?: string;
  lang: string;
  stepNumber: number;
  title: string;
  description: string;
  icon: string;
  stepLabel: string;
  createdAt?: string;
  updatedAt?: string;
  metaTitle?: string;
}

export interface HowItWorksData {
  lang: string;
  steps: Step[];
}

export const fetchHowItWorks = (lang: string = 'en') => 
  fetchApiDataClient<HowItWorksData>(API_ENDPOINTS.HOW_IT_WORKS, normalizeLanguage(lang))
    .then(data => data || { lang: normalizeLanguage(lang), steps: [] });

// Final CTA API
export interface FinalCTAData {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
}

export const fetchFinalCTA = (lang: string = 'en') => 
  fetchApiDataClient<FinalCTAData>(API_ENDPOINTS.FINAL_CTA, normalizeLanguage(lang));

// FAQ API
export interface FAQItem {
  _id?: string;
  question: string;
  answer: string;
  category?: string;
  order: number;
}

export interface FAQResponse {
  faqs: FAQItem[];
}

export const fetchFAQ = (lang: string = 'en') => 
  fetchApiDataClient<FAQResponse>(API_ENDPOINTS.FAQ, normalizeLanguage(lang));

// Case Studies API
export interface CaseStudy {
  _id?: string;
  title: string;
  description: string;
  image: string;
  results: string;
  link?: string;
  order: number;
}

export interface CaseStudiesResponse {
  caseStudies: CaseStudy[];
}

export const fetchCaseStudies = (lang: string = 'en') => 
  fetchApiDataClient<CaseStudiesResponse>(API_ENDPOINTS.CASE_STUDIES, normalizeLanguage(lang));

export const fetchCaseStudiesServer = (lang: string = 'en') =>
  fetchApiData<CaseStudiesResponse>(API_ENDPOINTS.CASE_STUDIES, normalizeLanguage(lang));

// Blog API
export interface BlogPost {
  blogId: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  publishedAt: string;
  slug: string;
}

export interface BlogResponse {
  posts: BlogPost[];
}

export const fetchBlog = (lang: string = 'en') => 
  fetchApiDataClient<BlogResponse>(API_ENDPOINTS.BLOGS, normalizeLanguage(lang));
