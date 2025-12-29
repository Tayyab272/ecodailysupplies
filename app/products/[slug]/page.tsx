// PERFORMANCE: Dynamic import for heavy ProductGallery component
import dynamic from "next/dynamic";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { ProductGallerySkeleton } from "@/components/products/product-gallery-loader";
import { ProductHeader, RelatedProducts } from "@/components/products";
import ProductPageContent from "@/components/products/product-page-content";
import {
  getProductBySlug,
  getProductsByCategorySlug,
} from "@/services/products/product.service";
import { getProductSlugs } from "@/sanity/lib/api";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";

const BRAND_NAME = "EcoDailySupplies";
const DEFAULT_SITE_URL = "https://ecodailysupplies.co.uk";

// PERFORMANCE: Code split ProductGallery (heavy image component)
const ProductGallery = dynamic(
  () =>
    import("@/components/products").then((mod) => ({
      default: mod.ProductGallery,
    })),
  {
    loading: () => <ProductGallerySkeleton />,
    ssr: true,
  }
);

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate dynamic metadata for product pages
 * Includes SEO title, description, Open Graph tags, and structured data
 */
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you're looking for doesn't exist.",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || DEFAULT_SITE_URL;
  const productUrl = `${siteUrl}/products/${slug}`;
  const productImage = product.images?.[0] || product.image;
  const productPrice = product.basePrice.toFixed(2);

  // Use custom SEO fields if available, otherwise generate from product data
  const seoTitle =
    product.seoTitle ||
    `${product.name} UK | Buy Online | Packaging Supplies | ${BRAND_NAME}`;
  const seoDescription =
    product.seoDescription ||
    `Buy ${product.name} online in the UK. Professional packaging supplies with bulk pricing. Starting from £${productPrice}. Next day delivery available. ${product.category ? `Part of our ${product.category} range.` : ""}`;

  // Generate comprehensive keywords based on product
  const productKeywords = [
    product.name,
    `${product.name} UK`,
    "packaging supplies",
    "packaging supplies UK",
    product.category || "packaging",
    `${product.category || "packaging"} UK`,
    "bulk packaging",
    "wholesale packaging",
    "wholesale packaging UK",
    "next day delivery",
    "UK packaging supplier",
    "buy packaging online",
    "packaging materials UK",
  ];

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: productKeywords,
    openGraph: {
      type: "website",
      title: seoTitle,
      description: seoDescription,
      url: productUrl,
      siteName: `${BRAND_NAME} - Premium Packaging Supplies`,
      images: [
        {
          url: productImage,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [productImage],
    },
    alternates: {
      canonical: productUrl,
    },
    other: {
      "product:price:amount": productPrice,
      "product:price:currency": "GBP",
      "product:availability": "in stock",
      "product:condition": "new",
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Fetch related products from the same category
  const relatedProducts = product.categorySlug
    ? await getProductsByCategorySlug(product.categorySlug)
    : [];

  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || DEFAULT_SITE_URL;
  const productUrl = `${siteUrl}/products/${slug}`;
  const productPrice = product.basePrice.toFixed(2);

  // Structured Data (JSON-LD) for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description:
      product.description || `${product.name} - Premium packaging supplies`,
    image: product.images || [product.image],
    sku: product.product_code,
    brand: {
      "@type": "Brand",
      name: BRAND_NAME,
    },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "GBP",
      price: productPrice,
      priceValidUntil: new Date(
        new Date().getTime() + 365 * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split("T")[0],
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: BRAND_NAME,
      },
    },
    category: product.category || "Packaging Supplies",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      reviewCount: "10",
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] py-5 sm:py-7 md:py-8">
        <div className="mx-auto max-w-6xl">
          {/* Top Actions (compact) */}
          <div className="mb-4 flex items-center justify-between gap-4">
            <Link href="/products">
              <Button
                variant="ghost"
                size="sm"
                className="-ml-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                <ArrowLeft className="mr-2 h-4 w-4" strokeWidth={2} />
                Back to Products
              </Button>
            </Link>
          </div>

          {/* Product Header */}
          <ProductHeader
            productName={product.name}
            productCode={product.product_code}
            category={product.category}
            categorySlug={product.categorySlug}
          />

          {/* Main Content: Compact premium 2-column layout */}
          <div className="mt-5 md:mt-6 grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-2 lg:gap-8">
            {/* Left Column: Gallery */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-gray-300 bg-white p-3 sm:p-4 shadow-sm">
                <ProductGallery
                  images={product.images || [product.image]}
                  productName={product.name}
                  imagesAlt={product.imagesAlt}
                  mainImageAlt={product.imageAlt}
                />
              </div>
            </div>

            {/* Right Column: Purchase + Info */}
            <ProductPageContent
              product={product}
              description={product.description}
              specifications={product.specifications}
              delivery={product.delivery}
            />
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <RelatedProducts
              products={relatedProducts}
              categoryName={product.category}
              categorySlug={product.categorySlug}
              currentProductId={product.id}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Revalidation strategy: On-demand revalidation via Sanity webhooks
// Pages will only revalidate when content changes in Sanity CMS
// For development, use `npm run dev` which has hot reloading
export const revalidate = false;

export async function generateStaticParams() {
  const slugs = (await getProductSlugs()) || [];
  return slugs.slice(0, 200).map((slug) => ({ slug }));
}
