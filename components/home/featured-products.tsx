import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/products/product-card";
import { getFeaturedProductsList } from "@/services/products/product.service";

export async function FeaturedProducts() {
  const featuredProducts = await getFeaturedProductsList();

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">
        {/* Minimalist Header - Matching Category Section */}
        <div className="flex items-center justify-between mb-8 md:mb-12 border-b border-gray-100 pb-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 uppercase tracking-wider">
            Featured Collection
          </h2>
          <Link
            href="/products"
            className="hidden md:flex items-center text-xs font-bold text-gray-900 uppercase tracking-wider hover:text-gray-600 transition-colors"
          >
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {/* Grid Layout */}
        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-lg border border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">
              No featured products
            </h3>
            <p className="text-xs text-gray-500">
              Check back soon for our curated selection.
            </p>
          </div>
        )}

        {/* Mobile View All Link */}
        <div className="mt-8 md:hidden text-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center w-full px-6 py-3 border border-gray-200 text-xs font-bold text-gray-900 uppercase tracking-wider rounded-lg hover:bg-black hover:text-white transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
