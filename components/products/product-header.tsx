import Link from "next/link";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { ArrowRight } from "lucide-react";

interface ProductHeaderProps {
  productName: string;
  productCode: string;
  category?: string;
  categorySlug?: string;
}

export function ProductHeader({
  productName,
  productCode,
  category,
  categorySlug,
}: ProductHeaderProps) {
  const breadcrumbItems = [
    { label: "Products", href: "/products" },
    ...(category && categorySlug
      ? [{ label: category, href: `/products?category=${categorySlug}` }]
      : []),
    { label: productName },
  ];

  return (
    <div className="space-y-3 pb-4 md:pb-5 border-b border-gray-300">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Product Title & Category */}
      <div className="space-y-3">
        {/* Category Link (if available) */}
        {category && categorySlug && (
          <Link
            href={`/products?category=${categorySlug}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-bold text-gray-700 uppercase tracking-wider hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            {category}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}

        {/* Product Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
          {productName}
        </h1>

        {/* Product Code / SKU - Minimal Badge */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            SKU
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-bold text-gray-900 border border-gray-300">
            {productCode}
          </span>
        </div>
      </div>
    </div>
  );
}
