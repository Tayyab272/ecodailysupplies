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
      <div className="space-y-5 md:space-y-6">
        {/* Purchase Section */}
        <div>
          <ErrorBoundary
            title="Unable to Load Purchase Options"
            description="There was an error loading the purchase section. Please refresh the page or try again."
            showBackButton
            backUrl="/products"
          >
            <ProductPurchaseSection product={product} />
          </ErrorBoundary>
        </div>

        {/* Product Info */}
        <div>
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
