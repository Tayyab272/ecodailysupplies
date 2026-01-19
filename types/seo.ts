/**
 * SEO Types for EcoDailySupplies
 *
 * Comprehensive TypeScript definitions for SEO data structures.
 * Used throughout the application for type safety.
 */

/**
 * Share image from Sanity (flexible type for transformed data)
 */
export interface SEOShareImage {
  asset?: {
    _id?: string;
    _ref?: string;
    _type?: string;
    url?: string;
    metadata?: {
      dimensions?: {
        width: number;
        height: number;
      };
    };
  };
  _type?: "image";
  alt?: string;
  [key: string]: unknown;
}

/**
 * Keyword entity with semantic context for AI search
 */
export interface SEOKeyword {
  _key?: string;
  term: string;
  relevance?: "primary" | "secondary" | "related";
  entityType?: string; // Flexible string to match Sanity data
}

/**
 * FAQ Item for FAQ structured data
 */
export interface FAQItem {
  _key?: string;
  question: string;
  answer: string;
}

/**
 * Comprehensive SEO object from Sanity
 */
export interface SEOFields {
  metaTitle?: string;
  metaDescription?: string;
  aiSummary?: string; // AI-optimized summary for AI search agents (GPTBot, Claude-Web, etc.)
  shareImage?: SEOShareImage;
  keywords?: SEOKeyword[];
  canonicalUrl?: string;
  structuredData?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

/**
 * Ecological credentials for sustainability filtering and AI search
 */
export interface EcologicalCredentials {
  isRecyclable?: boolean;
  isBiodegradable?: boolean;
  isCompostable?: boolean;
  recycledContentPercent?: number;
  certifications?: string[];
  carbonFootprintReduction?: string;
}

/**
 * Product with SEO fields
 */
export interface ProductSEO {
  seo?: SEOFields;
  faq?: FAQItem[];
  ecologicalCredentials?: EcologicalCredentials;
  // Legacy fields for backwards compatibility
  seoTitle?: string;
  seoDescription?: string;
}

/**
 * Category with SEO fields
 */
export interface CategorySEO {
  seo?: SEOFields;
  faq?: FAQItem[];
}

/**
 * JSON-LD Structured Data Types
 */
export interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization";
  "@id": string;
  name: string;
  alternateName?: string[];
  url: string;
  logo: {
    "@type": "ImageObject";
    url: string;
    width?: number;
    height?: number;
  };
  image?: string;
  description?: string;
  email?: string;
  telephone?: string;
  address?: PostalAddressSchema;
  geo?: GeoCoordinatesSchema;
  areaServed?: {
    "@type": "Country";
    name: string;
  };
  sameAs?: string[];
  contactPoint?: ContactPointSchema[];
}

export interface PostalAddressSchema {
  "@type": "PostalAddress";
  streetAddress?: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  addressCountry?: string;
}

export interface GeoCoordinatesSchema {
  "@type": "GeoCoordinates";
  latitude: number;
  longitude: number;
}

export interface ContactPointSchema {
  "@type": "ContactPoint";
  telephone?: string;
  contactType: string;
  email?: string;
  areaServed?: string;
  availableLanguage?: string;
}

export interface ProductSchema {
  "@context": "https://schema.org";
  "@type": "Product";
  "@id"?: string;
  name: string;
  description?: string;
  image?: string | string[];
  sku?: string;
  mpn?: string;
  brand?: {
    "@type": "Brand";
    name: string;
  };
  offers: OfferSchema;
  category?: string;
  aggregateRating?: AggregateRatingSchema;
  review?: ReviewSchema[];
}

export interface OfferSchema {
  "@type": "Offer";
  url?: string;
  priceCurrency: string;
  price: string | number;
  priceValidUntil?: string;
  availability: string;
  itemCondition?: string;
  seller?: {
    "@type": "Organization";
    name: string;
  };
  shippingDetails?: ShippingDetailsSchema;
}

export interface ShippingDetailsSchema {
  "@type": "OfferShippingDetails";
  shippingRate?: {
    "@type": "MonetaryAmount";
    value: string | number;
    currency: string;
  };
  shippingDestination?: {
    "@type": "DefinedRegion";
    addressCountry: string;
  };
  deliveryTime?: {
    "@type": "ShippingDeliveryTime";
    handlingTime?: {
      "@type": "QuantitativeValue";
      minValue: number;
      maxValue: number;
      unitCode: string;
    };
    transitTime?: {
      "@type": "QuantitativeValue";
      minValue: number;
      maxValue: number;
      unitCode: string;
    };
  };
}

export interface AggregateRatingSchema {
  "@type": "AggregateRating";
  ratingValue: string | number;
  reviewCount: string | number;
  bestRating?: string | number;
  worstRating?: string | number;
}

export interface ReviewSchema {
  "@type": "Review";
  reviewRating: {
    "@type": "Rating";
    ratingValue: string | number;
    bestRating?: string | number;
  };
  author: {
    "@type": "Person";
    name: string;
  };
  reviewBody?: string;
  datePublished?: string;
}

export interface BreadcrumbListSchema {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: BreadcrumbItemSchema[];
}

export interface BreadcrumbItemSchema {
  "@type": "ListItem";
  position: number;
  name: string;
  item?: string;
}

export interface FAQPageSchema {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: FAQQuestionSchema[];
}

export interface FAQQuestionSchema {
  "@type": "Question";
  name: string;
  acceptedAnswer: {
    "@type": "Answer";
    text: string;
  };
}

export interface WebPageSchema {
  "@context": "https://schema.org";
  "@type": "WebPage";
  "@id"?: string;
  url: string;
  name: string;
  description?: string;
  isPartOf?: {
    "@id": string;
  };
  breadcrumb?: {
    "@id": string;
  };
  inLanguage?: string;
  datePublished?: string;
  dateModified?: string;
}

export interface CollectionPageSchema extends Omit<WebPageSchema, "@type"> {
  "@type": "CollectionPage";
  mainEntity?: {
    "@type": "ItemList";
    itemListElement: Array<{
      "@type": "ListItem";
      position: number;
      url: string;
      name: string;
    }>;
  };
}

/**
 * Metadata generation helpers
 */
export interface GeneratedMetadata {
  title: string;
  description: string;
  keywords?: string[];
  openGraph?: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
    locale: string;
    type: string;
  };
  twitter?: {
    card: string;
    title: string;
    description: string;
    images: string[];
  };
  alternates?: {
    canonical: string;
  };
  robots?: {
    index: boolean;
    follow: boolean;
  };
}
