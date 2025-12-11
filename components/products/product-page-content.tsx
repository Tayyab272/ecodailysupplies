"use client";

import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import {
  ProductPurchaseSection,
  ProductInfoAccordion,
} from "@/components/products";
import type { Product } from "@/types/product";

/**
 * Product Page Content Wrapper
 * Wraps client components with error boundary
 * Premium Shopify theme styling with enhanced visual hierarchy
 */
function ProductPageContent({
  product,
  description,
  specifications,
  delivery,
}: {
  product: Product;
  description?: string;
  specifications?: Record<string, string>;
  delivery?: string;
}) {
  return (
    <ErrorBoundary
      title="Unable to Load Product Details"
      description="We encountered an error while loading product information. Please try again or go back to browse other products."
      showBackButton
      backUrl="/products"
      showHomeButton
    >
      <div className="space-y-8 md:space-y-10 lg:space-y-12">
        {/* Purchase Section - Premium Card */}
        <div className="relative">
          {/* Decorative accent line - Premium Style */}
          <div className="absolute -top-4 left-0 right-0 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent hidden md:block" />

          <ErrorBoundary
            title="Unable to Load Purchase Options"
            description="There was an error loading the purchase section. Please refresh the page or try again."
            showBackButton
            backUrl="/products"
          >
            <ProductPurchaseSection product={product} />
          </ErrorBoundary>
        </div>

        {/* Product Info Accordion - Premium Card */}
        <div className="relative">
          {/* Visual separator with subtle animation */}
          <div className="absolute -top-6 left-0 right-0 flex items-center justify-center md:hidden">
            <div className="h-px w-16 bg-gray-300" />
          </div>

          <ErrorBoundary
            title="Unable to Load Product Information"
            description="There was an error loading product details. Please refresh the page or try again."
          >
            <ProductInfoAccordion
              description={description}
              specifications={specifications}
              delivery={delivery}
            />
          </ErrorBoundary>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default ProductPageContent;
