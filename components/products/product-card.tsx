"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Product } from "@/types/product";
import { Eye } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const primaryImage = product.image;
  const secondaryImage = product.images?.[2] || product.image;
  const hasVariants = product.variants && product.variants.length > 1;
  const shouldShowPrice = product.basePrice !== 0;
  const displayPrice = product.basePrice;

  return (
    <div
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.slug}`} className="flex-1 border border-gray-300 hover:border-primary p-3">
        {/* Image Container */}
        <div className="relative aspect-square w-full overflow-hidden rounded-xl">
          {/* Primary Image */}
          <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
            <Image
              src={primaryImage}
              alt={product.imageAlt || product.name}
              fill
              className={`object-contain p-6 transition-opacity duration-500 ${isHovered && secondaryImage ? "opacity-0" : "opacity-100"
                }`}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />

            {/* Secondary Image (Hover) */}
            {secondaryImage && (
              <Image
                src={secondaryImage}
                alt={product.imageAlt || product.name}
                fill
                className={`object-contain p-6 transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"
                  }`}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
            )}
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 z-10">
            {Number(product.discount) > 0 && (
              <span className="bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                Sale
              </span>
            )}
          </div>

          {/* Floating View Details Button */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <button className="flex items-center gap-2 bg-primary text-black px-6 py-3 rounded-full font-medium text-sm shadow-xl hover:bg-white hover:text-black cursor-pointer transition-colors pointer-events-auto">
                <Eye className="h-4 w-4" />
                View Details
              </button>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-4 text-center border-t border-gray-300 pt-4">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-1 group-hover:text-gray-600 transition-colors">
            {product.name}
          </h3>

          <div className="mt-1 flex items-center justify-center gap-2">
            {shouldShowPrice ? (
              <>
                <span className="text-sm font-bold text-primary">
                  £{displayPrice.toFixed(2)}
                </span>
                {Number(product.discount) > 0 && (
                  <span className="text-xs text-gray-400 line-through">
                    £
                    {(
                      displayPrice /
                      (1 - Number(product.discount) / 100)
                    ).toFixed(2)}
                  </span>
                )}
              </>
            ) : (
              <span className="text-sm text-gray-500 italic">
                View Price
              </span>
            )}
          </div>

          {/* Variant Count (Optional - Minimalist) */}
          {hasVariants && (
            <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wide">
              {product.variants!.length} Colors
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
