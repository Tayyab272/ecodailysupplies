import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllCategories } from "@/sanity/lib";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { Category } from "@/types/category";
import { ArrowRight, Grid3X3 } from "lucide-react";

// Revalidation strategy: On-demand revalidation via Sanity webhooks
// Pages will only revalidate when content changes in Sanity CMS
// For development, use `npm run dev` which has hot reloading
export const revalidate = false;

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ecodailysupplies.co.uk";

export const metadata: Metadata = {
  title: "Packaging Categories UK | Boxes, Bubble Wrap & Mailing Bags | EcoDailySupplies",
  description:
    "Browse packaging categories at EcoDailySupplies UK. Cardboard boxes, bubble wrap, mailing bags, tape & protective materials. Free delivery over £50. Next-day shipping available.",
  keywords: [
    "packaging categories UK",
    "cardboard boxes category",
    "bubble wrap UK",
    "mailing bags category",
    "packing tape UK",
    "protective packaging category",
    "packaging supplies UK",
    "packaging materials UK",
    "eco-friendly packaging",
    "packaging solutions UK",
  ],
  openGraph: {
    title: "Packaging Categories UK | EcoDailySupplies",
    description:
      "Browse packaging categories at EcoDailySupplies. Boxes, bubble wrap, mailing bags & more. Free UK delivery over £50.",
    url: `${siteUrl}/categories`,
    siteName: "EcoDailySupplies",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Packaging Categories UK | EcoDailySupplies",
    description: "Browse packaging categories. Free UK delivery over £50.",
  },
  alternates: {
    canonical: `${siteUrl}/categories`,
  },
};

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] py-5">
          <Breadcrumbs items={[{ label: "Categories", href: "/categories" }]} />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] py-10 sm:py-12">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary border border-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider">
            <Grid3X3 className="h-3.5 w-3.5" strokeWidth={2.5} />
            Categories
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
            Browse packaging categories
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl">
            Find the right packaging supplies faster. Free UK delivery over £50, next-day shipping available.
          </p>
        </div>

        {/* Category Grid */}
        {categories && categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((category: Category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="group rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden"
              >
                <div className="relative aspect-[16/10] bg-gray-50">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.imageAlt || category.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      placeholder="empty"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Grid3X3 className="h-6 w-6 text-primary" strokeWidth={2.5} />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold text-gray-900 truncate">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                          {category.description}
                        </p>
                      )}
                    </div>
                    <div className="shrink-0 mt-0.5 text-gray-400 group-hover:text-primary transition-colors">
                      <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">
              No categories found
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Check back later for product categories.
            </p>
          </div>
        )}

        {/* Lower CTA */}
        <div className="mt-10 sm:mt-12">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                  Prefer browsing everything?
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  View all products and filter by what matters to you.
                </p>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-black transition-colors"
              >
                View all products
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
