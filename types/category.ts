import type { SEOFields, FAQItem } from "./seo";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  imageAlt?: string; // Alt text for category image (SEO)
  isActive?: boolean;
  sortOrder?: number;
  // SEO fields from Sanity
  seo?: SEOFields;
  // FAQ items for structured data
  faq?: FAQItem[];
}
