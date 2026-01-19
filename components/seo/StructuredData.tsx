import type {
  ProductSchema,
  BreadcrumbListSchema,
  FAQPageSchema,
  FAQItem,
  CollectionPageSchema,
} from "@/types/seo";
import type { Product } from "@/types/product";

const BRAND_NAME = "EcoDailySupplies";
const DEFAULT_SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://ecodailysupplies.com";

/**
 * Structured Data Component for JSON-LD
 *
 * Generates Schema.org structured data for:
 * - Products (with offers, pricing, availability)
 * - BreadcrumbList (navigation path)
 * - FAQPage (frequently asked questions)
 * - CollectionPage (category pages)
 *
 * Designed for 2026 AI search readiness and traditional SERP rich snippets.
 */

/** Extended product type with timestamps and eco credentials */
interface ProductWithMeta extends Product {
  _updatedAt?: string;
  _createdAt?: string;
  ecologicalCredentials?: {
    isRecyclable?: boolean;
    isBiodegradable?: boolean;
    isCompostable?: boolean;
    recycledContentPercent?: number;
    certifications?: string[];
    carbonFootprintReduction?: string;
  };
}

interface ProductStructuredDataProps {
  product: ProductWithMeta;
  url: string;
  customStructuredData?: string;
}

/**
 * Generates Product structured data with comprehensive offer details
 * Includes dateModified for AI crawlers and eco credentials
 */
export function ProductStructuredData({
  product,
  url,
  customStructuredData,
}: ProductStructuredDataProps) {
  const productPrice = product.basePrice.toFixed(2);

  // Calculate price valid until (1 year from now)
  // Use a fixed date calculation that doesn't rely on Date.now() for React purity
  const currentYear = new Date().getFullYear();
  const priceValidUntil = `${currentYear + 1}-12-31`;

  // Build additional properties for eco credentials
  const additionalProperties: Array<{
    "@type": "PropertyValue";
    name: string;
    value: string | number | boolean;
  }> = [];

  if (product.ecologicalCredentials) {
    const eco = product.ecologicalCredentials;
    if (eco.isRecyclable) {
      additionalProperties.push({
        "@type": "PropertyValue",
        name: "Recyclable",
        value: true,
      });
    }
    if (eco.isBiodegradable) {
      additionalProperties.push({
        "@type": "PropertyValue",
        name: "Biodegradable",
        value: true,
      });
    }
    if (eco.isCompostable) {
      additionalProperties.push({
        "@type": "PropertyValue",
        name: "Compostable",
        value: true,
      });
    }
    if (eco.recycledContentPercent !== undefined && eco.recycledContentPercent > 0) {
      additionalProperties.push({
        "@type": "PropertyValue",
        name: "Recycled Content",
        value: `${eco.recycledContentPercent}%`,
      });
    }
    if (eco.certifications && eco.certifications.length > 0) {
      eco.certifications.forEach((cert) => {
        additionalProperties.push({
          "@type": "PropertyValue",
          name: "Certification",
          value: cert,
        });
      });
    }
  }

  const structuredData: ProductSchema & {
    dateModified?: string;
    additionalProperty?: typeof additionalProperties;
  } = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.name,
    description:
      product.description || `${product.name} - Premium eco-friendly packaging supplies from ${BRAND_NAME}`,
    image: product.images || [product.image],
    sku: product.product_code,
    mpn: product.product_code,
    brand: {
      "@type": "Brand",
      name: BRAND_NAME,
    },
    offers: {
      "@type": "Offer",
      url: url,
      priceCurrency: "GBP",
      price: productPrice,
      priceValidUntil: priceValidUntil,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: BRAND_NAME,
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "GBP",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "GB",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 3,
            unitCode: "DAY",
          },
        },
      },
    },
    category: product.category || "Packaging Supplies",
    // Add dateModified for AI crawlers to determine content freshness
    ...(product._updatedAt && {
      dateModified: new Date(product._updatedAt).toISOString(),
    }),
    // Add eco credentials as additional properties
    ...(additionalProperties.length > 0 && {
      additionalProperty: additionalProperties,
    }),
  };

  // Merge custom structured data if provided
  let finalData = structuredData;
  if (customStructuredData) {
    try {
      const customData = JSON.parse(customStructuredData);
      finalData = { ...structuredData, ...customData };
    } catch {
      // Invalid JSON, use default
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(finalData) }}
    />
  );
}

interface BreadcrumbStructuredDataProps {
  items: Array<{
    name: string;
    url?: string;
  }>;
}

/**
 * Generates BreadcrumbList structured data for navigation paths
 */
export function BreadcrumbStructuredData({
  items,
}: BreadcrumbStructuredDataProps) {
  const structuredData: BreadcrumbListSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url && index < items.length - 1 ? { item: item.url } : {}),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface FAQStructuredDataProps {
  items: FAQItem[];
}

/**
 * Generates FAQPage structured data for FAQ sections
 */
export function FAQStructuredData({ items }: FAQStructuredDataProps) {
  if (!items || items.length === 0) return null;

  const structuredData: FAQPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface CategoryStructuredDataProps {
  categoryName: string;
  categorySlug: string;
  description?: string;
  products: Array<{
    name: string;
    slug: string;
  }>;
}

/**
 * Generates CollectionPage structured data for category pages
 */
export function CategoryStructuredData({
  categoryName,
  categorySlug,
  description,
  products,
}: CategoryStructuredDataProps) {
  const categoryUrl = `${DEFAULT_SITE_URL}/products?category=${categorySlug}`;

  const structuredData: CollectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${categoryUrl}#collection`,
    url: categoryUrl,
    name: `${categoryName} | Eco-Friendly Packaging UK`,
    description:
      description ||
      `Shop ${categoryName} at ${BRAND_NAME}. Eco-friendly packaging supplies with free UK delivery over £50.`,
    isPartOf: {
      "@id": `${DEFAULT_SITE_URL}/#website`,
    },
    inLanguage: "en-GB",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.slice(0, 20).map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${DEFAULT_SITE_URL}/products/${product.slug}`,
        name: product.name,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface CombinedStructuredDataProps {
  product?: Product;
  productUrl?: string;
  breadcrumbs?: Array<{ name: string; url?: string }>;
  faq?: FAQItem[];
  category?: {
    name: string;
    slug: string;
    description?: string;
    products: Array<{ name: string; slug: string }>;
  };
  customStructuredData?: string;
}

/**
 * Combined structured data component that renders all relevant schemas
 * Use this when you need multiple structured data types on a single page
 */
export function CombinedStructuredData({
  product,
  productUrl,
  breadcrumbs,
  faq,
  category,
  customStructuredData,
}: CombinedStructuredDataProps) {
  return (
    <>
      {product && productUrl && (
        <ProductStructuredData
          product={product}
          url={productUrl}
          customStructuredData={customStructuredData}
        />
      )}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <BreadcrumbStructuredData items={breadcrumbs} />
      )}
      {faq && faq.length > 0 && <FAQStructuredData items={faq} />}
      {category && (
        <CategoryStructuredData
          categoryName={category.name}
          categorySlug={category.slug}
          description={category.description}
          products={category.products}
        />
      )}
    </>
  );
}

export default CombinedStructuredData;
