import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "./product-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types/product";

interface RelatedProductsProps {
  products: Product[];
  categoryName?: string;
  categorySlug?: string;
  currentProductId?: string;
}

export function RelatedProducts({
  products,
  categoryName,
  categorySlug,
  currentProductId,
}: RelatedProductsProps) {
  // Filter out current product and limit to 4 products
  const relatedProducts = products
    .filter((p) => p.id !== currentProductId)
    .slice(0, 4);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 md:mt-12 lg:mt-14 border-t border-gray-300 pt-8 md:pt-10">
      <div className="flex items-start justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1.5">
            Related Products
          </h2>
          {categoryName && (
            <p className="text-sm text-gray-600">
              More {categoryName.toLowerCase()} products you might like
            </p>
          )}
        </div>
        {categorySlug && (
          <Button asChild variant="outline" className="hidden sm:flex rounded-xl">
            <Link href={`/products?category=${categorySlug}`}>
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {categorySlug && (
        <div className="mt-8 text-center sm:hidden">
          <Button asChild variant="outline" className="w-full sm:w-auto rounded-xl">
            <Link href={`/products?category=${categorySlug}`}>
              View All {categoryName || "Products"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </section>
  );
}

