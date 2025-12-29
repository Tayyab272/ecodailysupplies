import type { Metadata } from "next";
import { ProductFilters } from "@/components/products/product-filters";
import { ProductSort } from "@/components/products/product-sort";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { ProductGridWrapper } from "@/components/products/product-grid-wrapper";
import { getAllCategories } from "@/sanity/lib";

// Revalidation strategy: On-demand revalidation via Sanity webhooks
export const revalidate = false;

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ecodailysupplies.co.uk";

export const metadata: Metadata = {
  title: "Buy Packaging Supplies Online UK | Boxes, Bubble Wrap & More | EcoDailySupplies",
  description:
    "Shop quality packaging supplies online in the UK. Cardboard boxes, bubble wrap, mailing bags, tape & more. Free delivery over £50, next-day shipping available. Wholesale prices.",
  keywords: [
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
    title: "Buy Packaging Supplies Online UK | EcoDailySupplies",
    description: "Quality packaging supplies with free UK delivery over £50. Cardboard boxes, bubble wrap, mailing bags & more.",
    url: `${siteUrl}/products`,
    siteName: "EcoDailySupplies",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Packaging Supplies UK | EcoDailySupplies",
    description: "Quality packaging supplies with free UK delivery over £50.",
  },
  alternates: {
    canonical: `${siteUrl}/products`,
  },
};

export default async function ProductsPage({
  searchParams,
}: {
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
}) {
  const [sp, categoriesList] = await Promise.all([
    searchParams,
    getAllCategories(),
  ]);

  const categoryOptions = (categoriesList || []).map(
    (c: { slug: string; name: string }) => ({
      value: c.slug,
      label: c.name,
    })
  );

  const category = sp.category;
  const categoryDisplayName = category
    ? category
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
    : null;

  const searchQuery = sp.search?.trim();

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* Header Section */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] pt-8 pb-12">

          <Breadcrumbs
            items={[
              { label: "Products", href: "/products" },
              ...(categoryDisplayName
                ? [{ label: categoryDisplayName, href: `/products?category=${category}` }]
                : []),
            ]}
          />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                {searchQuery ? `Search: "${searchQuery}"` : categoryDisplayName || "All Products"}
              </h1>
              <p className="text-lg text-gray-500 font-medium leading-relaxed">
                {searchQuery
                  ? "Found the following results for your search."
                  : "Quality UK packaging supplies with free delivery over £50 and next-day shipping available."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-8">
              <ProductFilters categories={categoryOptions} />
            </div>
          </div>

          {/* Grid Area */}
          <div className="lg:col-span-3">
            <div className="flex justify-end mb-8">
              <ProductSort currentSort={sp.sort || "newest"} />
            </div>
            <ProductGridWrapper searchParams={sp} />
          </div>
        </div>
      </div>
    </div>
  );
}
