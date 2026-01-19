import type { Metadata } from "next";
import type { SEOFields, SEOKeyword } from "@/types/seo";
import type { Product } from "@/types/product";
import { urlFor, imagePresets } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const BRAND_NAME = "EcoDailySupplies";
const DEFAULT_SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://ecodailysupplies.com";

/**
 * SEO Metadata Utilities for EcoDailySupplies
 *
 * Generates Next.js Metadata objects from Sanity SEO fields.
 * Optimized for 2026 AI-driven search and traditional SERPs.
 */

interface GenerateMetadataOptions {
  /** Page title (used if SEO metaTitle not set) */
  title: string;
  /** Page description (used if SEO metaDescription not set) */
  description: string;
  /** Canonical URL for the page */
  url: string;
  /** SEO fields from Sanity */
  seo?: SEOFields;
  /** Fallback image if no share image set */
  fallbackImage?: string;
  /** Open Graph type - Next.js only supports "website" | "article" */
  type?: "website" | "article";
  /** Additional keywords to merge with SEO keywords */
  additionalKeywords?: string[];
  /** Product-specific metadata (adds product: meta tags) */
  product?: {
    price: string;
    currency: string;
    availability: string;
    condition: string;
  };
}

/**
 * Generates comprehensive metadata for a page
 */
export function generatePageMetadata({
  title,
  description,
  url,
  seo,
  fallbackImage,
  type = "website",
  additionalKeywords = [],
  product,
}: GenerateMetadataOptions): Metadata {
  // Use SEO fields if available, otherwise use provided defaults
  const metaTitle = seo?.metaTitle || title;
  const metaDescription = seo?.metaDescription || description;

  // Build canonical URL
  const canonicalUrl = seo?.canonicalUrl || url;

  // Extract keywords from SEO entities
  const seoKeywords = extractKeywordsFromEntities(seo?.keywords);
  const allKeywords = [...new Set([...seoKeywords, ...additionalKeywords])];

  // Build Open Graph image URL
  let ogImageUrl = fallbackImage || `${DEFAULT_SITE_URL}/og-image.webp`;
  let ogImageAlt = `${BRAND_NAME} - Eco-Friendly Packaging UK`;

  if (seo?.shareImage) {
    try {
      // Try to use urlFor if it's a valid Sanity image
      if (seo.shareImage.asset) {
        ogImageUrl = imagePresets.seo(seo.shareImage as SanityImageSource).url();
      }
      ogImageAlt = seo.shareImage.alt || ogImageAlt;
    } catch {
      // If urlFor fails, try to use the direct URL
      if (seo.shareImage.asset?.url) {
        ogImageUrl = seo.shareImage.asset.url;
      }
    }
  }

  // Build robots directives
  const robotsConfig = {
    index: !seo?.noIndex,
    follow: !seo?.noFollow,
    googleBot: {
      index: !seo?.noIndex,
      follow: !seo?.noFollow,
      noimageindex: false,
      "max-video-preview": -1 as const,
      "max-image-preview": "large" as const,
      "max-snippet": -1 as const,
    },
  };

  const metadata: Metadata = {
    title: metaTitle,
    description: metaDescription,
    keywords: allKeywords.length > 0 ? allKeywords : undefined,
    openGraph: {
      type: type,
      title: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName: `${BRAND_NAME} - Eco-Friendly Packaging UK`,
      locale: "en_GB",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [ogImageUrl],
      site: "@ecodailysupplies",
      creator: "@ecodailysupplies",
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: robotsConfig,
  };

  // Add product-specific metadata
  if (product) {
    metadata.other = {
      "product:price:amount": product.price,
      "product:price:currency": product.currency,
      "product:availability": product.availability,
      "product:condition": product.condition,
    };
  }

  return metadata;
}

/**
 * Generates metadata specifically for product pages
 */
export function generateProductMetadata(
  product: Product & { seo?: SEOFields },
  slug: string
): Metadata {
  const productUrl = `${DEFAULT_SITE_URL}/products/${slug}`;
  const productPrice = product.basePrice.toFixed(2);
  const productImage = product.images?.[0] || product.image;

  // Generate default title and description
  const defaultTitle = `${product.name} | Buy Online | Eco Packaging UK | ${BRAND_NAME}`;
  const defaultDescription = `Buy ${product.name} online in the UK. Professional eco-friendly packaging supplies with bulk pricing. Starting from £${productPrice}. Next day delivery available.${product.category ? ` Part of our ${product.category} range.` : ""}`;

  // Generate comprehensive keywords based on product
  const productKeywords = [
    product.name,
    `${product.name} UK`,
    "eco-friendly packaging",
    "sustainable packaging UK",
    product.category || "packaging",
    `${product.category || "packaging"} UK`,
    "bulk packaging",
    "wholesale packaging UK",
    "next day delivery",
    "UK packaging supplier",
    "buy packaging online",
  ];

  return generatePageMetadata({
    title: product.seoTitle || defaultTitle,
    description: product.seoDescription || defaultDescription,
    url: productUrl,
    seo: product.seo,
    fallbackImage: productImage,
    type: "website", // Use "website" as Next.js OG doesn't support "product"
    additionalKeywords: productKeywords,
    product: {
      price: productPrice,
      currency: "GBP",
      availability: "in stock",
      condition: "new",
    },
  });
}

/**
 * Generates metadata for category pages
 */
export function generateCategoryMetadata(
  categoryName: string,
  categorySlug: string,
  description?: string,
  seo?: SEOFields
): Metadata {
  const categoryUrl = `${DEFAULT_SITE_URL}/products?category=${categorySlug}`;

  const defaultTitle = `${categoryName} | Eco-Friendly Packaging UK | ${BRAND_NAME}`;
  const defaultDescription =
    description ||
    `Shop ${categoryName} at ${BRAND_NAME}. Sustainable, eco-friendly packaging supplies with free UK delivery over £50. Wholesale prices available.`;

  const categoryKeywords = [
    categoryName,
    `${categoryName} UK`,
    `eco-friendly ${categoryName.toLowerCase()}`,
    `sustainable ${categoryName.toLowerCase()}`,
    "packaging supplies UK",
    "eco packaging",
    "wholesale packaging",
    `buy ${categoryName.toLowerCase()} online`,
  ];

  return generatePageMetadata({
    title: defaultTitle,
    description: defaultDescription,
    url: categoryUrl,
    seo: seo,
    type: "website",
    additionalKeywords: categoryKeywords,
  });
}

/**
 * Extracts keyword strings from SEO keyword entities
 */
function extractKeywordsFromEntities(keywords?: SEOKeyword[]): string[] {
  if (!keywords || keywords.length === 0) return [];

  // Sort by relevance (primary first, then secondary, then related)
  const sortedKeywords = [...keywords].sort((a, b) => {
    const order = { primary: 0, secondary: 1, related: 2 };
    return (order[a.relevance || "related"] || 2) - (order[b.relevance || "related"] || 2);
  });

  return sortedKeywords.map((k) => k.term).filter(Boolean);
}

/**
 * Builds an optimized Sanity image URL for SEO (Open Graph)
 */
export function buildSEOImageUrl(image: SanityImageSource): string {
  try {
    return urlFor(image)
      .width(1200)
      .height(630)
      .fit("crop")
      .auto("format")
      .quality(90)
      .url();
  } catch {
    return `${DEFAULT_SITE_URL}/og-image.webp`;
  }
}

/**
 * Builds optimized image URL with AVIF/WebP format for Core Web Vitals
 */
export function buildOptimizedImageUrl(
  image: SanityImageSource,
  options: {
    width?: number;
    height?: number;
    quality?: number;
  } = {}
): string {
  const { width = 800, height, quality = 80 } = options;

  try {
    let builder = urlFor(image)
      .width(width)
      .quality(quality)
      .auto("format"); // Auto selects WebP/AVIF based on browser support

    if (height) {
      builder = builder.height(height);
    }

    return builder.url();
  } catch {
    return "";
  }
}

/**
 * Generates srcset for responsive images
 */
export function generateResponsiveSrcSet(
  image: SanityImageSource,
  sizes: number[] = [400, 800, 1200, 1600]
): string {
  try {
    return sizes
      .map(
        (size) =>
          `${urlFor(image).width(size).auto("format").quality(80).url()} ${size}w`
      )
      .join(", ");
  } catch {
    return "";
  }
}
