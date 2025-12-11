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
    <div className="space-y-6 pb-8 md:pb-12 border-b border-gray-100">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Product Title & Category */}
      <div className="space-y-4">
        {/* Category Link (if available) */}
        {category && categorySlug && (
          <Link
            href={`/products?category=${categorySlug}`}
            className="inline-flex items-center text-xs font-bold text-gray-600 uppercase tracking-wider hover:text-gray-900 transition-colors mb-2"
          >
            {category}
            <ArrowRight className="ml-1.5 h-3 w-3" />
          </Link>
        )}

        {/* Product Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
          {productName}
        </h1>

        {/* Product Code / SKU - Minimal Badge */}
        <div className="flex items-center gap-3 pt-2">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            SKU
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded-md text-sm font-bold text-gray-900 border border-gray-200">
            {productCode}
          </span>
        </div>
      </div>
    </div>
  );
}
