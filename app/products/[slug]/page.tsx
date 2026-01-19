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
import {
  ProductStructuredData,
  BreadcrumbStructuredData,
  FAQStructuredData,
} from "@/components/seo";
import { generateProductMetadata } from "@/lib/seo";

const BRAND_NAME = "EcoDailySupplies";
const DEFAULT_SITE_URL = "https://ecodailysupplies.com";

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
 * Uses centralized SEO utilities for consistent metadata generation
 * Supports both legacy SEO fields and new comprehensive SEO object from Sanity
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

  // Use centralized SEO metadata generation
  return generateProductMetadata(product, slug);
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

  // Build breadcrumb data for structured data
  const breadcrumbs = [
    { name: "Home", url: siteUrl },
    { name: "Products", url: `${siteUrl}/products` },
    ...(product.category && product.categorySlug
      ? [
          {
            name: product.category,
            url: `${siteUrl}/products?category=${product.categorySlug}`,
          },
        ]
      : []),
    { name: product.name },
  ];

  // Get FAQ items if available (from new SEO schema)
  const faqItems = (product as { faq?: Array<{ question: string; answer: string }> }).faq;

  // Get custom structured data from Sanity SEO settings
  const customStructuredData = (product as { seo?: { structuredData?: string } }).seo?.structuredData;

  return (
    <article className="min-h-screen bg-gray-50" itemScope itemType="https://schema.org/Product">
      {/* Structured Data (JSON-LD) - Product */}
      <ProductStructuredData
        product={product}
        url={productUrl}
        customStructuredData={customStructuredData}
      />

      {/* Structured Data (JSON-LD) - Breadcrumbs */}
      <BreadcrumbStructuredData items={breadcrumbs} />

      {/* Structured Data (JSON-LD) - FAQ (if available) */}
      {faqItems && faqItems.length > 0 && (
        <FAQStructuredData items={faqItems} />
      )}

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
    </article>
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
