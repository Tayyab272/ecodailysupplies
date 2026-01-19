import type { Metadata } from "next";
import { ProductFilters } from "@/components/products/product-filters";
import { ProductSort } from "@/components/products/product-sort";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { ProductGridWrapper } from "@/components/products/product-grid-wrapper";
import { getAllCategories, getCategoryBySlug, getProductsByCategorySlug } from "@/sanity/lib";
import { generateCategoryMetadata } from "@/lib/seo";
import {
  BreadcrumbStructuredData,
  FAQStructuredData,
  CategoryStructuredData,
} from "@/components/seo";

// Revalidation strategy: On-demand revalidation via Sanity webhooks
export const revalidate = false;

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL || "https://ecodailysupplies.com";
const BRAND_NAME = "EcoDailySupplies";

interface ProductsPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    size?: string;
    material?: string;
    ecoFriendly?: string;
    priceMin?: string;
    priceMax?: string;
    sort?: string;
  }>;
}

/**
 * Generate dynamic metadata based on category filter
 * When a category is selected, use its SEO settings from Sanity
 */
export async function generateMetadata({
  searchParams,
}: ProductsPageProps): Promise<Metadata> {
  const sp = await searchParams;
  const categorySlug = sp.category;

  // If category is selected, fetch its SEO data
  if (categorySlug) {
    const category = await getCategoryBySlug(categorySlug);

    if (category) {
      return generateCategoryMetadata(
        category.name,
        category.slug,
        category.description,
        category.seo
      );
    }
  }

  // Default metadata for all products page
  return {
    title: `UK Eco Business Supplies & Products: Get Packaging`,
    description:
      "Browse EcoDailySupplies products: eco-packaging, cleaning and safety supplies for UK businesses. Find and get sustainable & quality business essentials.",
    keywords: [
      "eco business supplies UK products",
      "sustainable packaging products",
      "packaging supplies UK",
      "buy packaging online",
      "cardboard boxes UK",
      "bubble wrap UK",
      "mailing bags UK",
      "packing materials",
      "wholesale packaging UK",
      "packaging supplier UK",
      "eco-friendly packaging",
      "next day delivery packaging",
    ],
    openGraph: {
      title: `Buy Packaging Supplies Online UK | ${BRAND_NAME}`,
      description:
        "Quality packaging supplies with free UK delivery over £50. Cardboard boxes, bubble wrap, mailing bags & more.",
      url: `${siteUrl}/products`,
      siteName: BRAND_NAME,
      locale: "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Packaging Supplies UK | ${BRAND_NAME}`,
      description: "Quality packaging supplies with free UK delivery over £50.",
    },
    alternates: {
      canonical: `${siteUrl}/products`,
    },
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const sp = await searchParams;
  const categoriesList = await getAllCategories();

  const categoryOptions = (categoriesList || []).map(
    (c: { slug: string; name: string }) => ({
      value: c.slug,
      label: c.name,
    })
  );

  const categorySlug = sp.category;
  let category = null;
  let categoryDisplayName = null;

  // Fetch full category data if a category is selected
  if (categorySlug) {
    category = await getCategoryBySlug(categorySlug);
    categoryDisplayName = category?.name || categorySlug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  const searchQuery = sp.search?.trim();

  // Build breadcrumb data
  const breadcrumbItems = [
    { name: "Home", url: siteUrl },
    { name: "Products", url: `${siteUrl}/products` },
    ...(categoryDisplayName && categorySlug
      ? [{ name: categoryDisplayName }]
      : []),
  ];

  // Fetch actual products for category structured data (not categories!)
  let categoryProducts: Array<{ name: string; slug: string }> = [];
  if (categorySlug) {
    const products = await getProductsByCategorySlug(categorySlug);
    categoryProducts = (products || []).slice(0, 20).map((p: { name: string; slug: string }) => ({
      name: p.name,
      slug: p.slug,
    }));
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* Structured Data - Breadcrumbs */}
      <BreadcrumbStructuredData items={breadcrumbItems} />

      {/* Structured Data - Category (when filtering by category) */}
      {category && categorySlug && (
        <CategoryStructuredData
          categoryName={category.name}
          categorySlug={categorySlug}
          description={category.description}
          products={categoryProducts}
        />
      )}

      {/* Structured Data - FAQ (if category has FAQ) */}
      {category?.faq && category.faq.length > 0 && (
        <FAQStructuredData items={category.faq} />
      )}

      {/* Header Section */}
      <header className="border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] pt-8 pb-12">
          <Breadcrumbs
            items={[
              { label: "Products", href: "/products" },
              ...(categoryDisplayName
                ? [
                    {
                      label: categoryDisplayName,
                      href: `/products?category=${categorySlug}`,
                    },
                  ]
                : []),
            ]}
          />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                {searchQuery
                  ? `Search: "${searchQuery}"`
                  : categoryDisplayName || "Eco Business Supplies UK Products"}
              </h1>
              <p className="text-lg text-gray-500 font-medium leading-relaxed">
                {searchQuery
                  ? "Found the following results for your search."
                  : category?.description ||
                    "The EcoDailySupplies product catalogue is your place to find eco-friendly business supplies and services, UK-based products that are sustainable and performance-driven at the same time."}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-8">
              <ProductFilters categories={categoryOptions} />
            </div>
          </aside>

          {/* Grid Area */}
          <section className="lg:col-span-3">
            <div className="flex justify-end mb-8">
              <ProductSort currentSort={sp.sort || "newest"} />
            </div>
            <ProductGridWrapper searchParams={sp} />
          </section>
        </div>

        {/* FAQ Section (if category has FAQ) */}
        {category?.faq && category.faq.length > 0 && (
          <section className="mt-16 border-t border-gray-100 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Frequently Asked Questions about {category.name}
            </h2>
            <div className="space-y-6 max-w-3xl">
              {category.faq.map((item, index) => (
                <article key={index} className="border-b border-gray-100 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
