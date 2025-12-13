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
      className="group relative flex flex-col h-full border border-primary overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.slug}`} className="flex flex-col h-full">
        {/* Image Container - Fixed Square Aspect Ratio */}
        <div className="relative w-full aspect-square bg-white overflow-hidden">
          {/* Primary Image */}
          <div className="absolute inset-0 transition-transform duration-700 ease-out">
            <Image
              src={primaryImage}
              alt={product.imageAlt || product.name}
              fill
              className={`object-cover object-center transition-opacity duration-500 ${
                isHovered && secondaryImage ? "opacity-0" : "opacity-100"
              }`}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />

            {/* Secondary Image (Hover) */}
            {secondaryImage && (
              <Image
                src={secondaryImage}
                alt={product.imageAlt || product.name}
                fill
                className={`object-cover object-center transition-opacity duration-500 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
            )}
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 z-10">
            {Number(product.discount) > 0 && (
              <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm">
                Sale
              </span>
            )}
          </div>

          {/* Floating View Details Button */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold text-sm shadow-xl hover:bg-gray-100 cursor-pointer pointer-events-auto">
                <Eye className="h-4 w-4" />
                View Details
              </span>
            </div>
          </div>
        </div>

        {/* Product Info - Primary Background */}
        <div className="bg-primary p-4 text-center z-20 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-xs lg:text-base font-bold text-gray-900 mb-1 group-hover:underline decoration-white/50 underline-offset-4">
              {product.name}
            </h3>

            <div className="flex items-center justify-center gap-2 text-white/90">
              {shouldShowPrice ? (
                <>
                  <span className="text-md font-bold text-white">
                    £{displayPrice.toFixed(2)}
                  </span>
                  {Number(product.discount) > 0 && (
                    <span className="text-xs text-white/60 line-through">
                      £
                      {(
                        displayPrice /
                        (1 - Number(product.discount) / 100)
                      ).toFixed(2)}
                    </span>
                  )}
                </>
              ) : (
                <span className="text-sm font-medium italic">View Price</span>
              )}
            </div>
          </div>

          {/* Variant Count */}
          {hasVariants && (
            <p className="text-[10px] text-white/90 mt-3 text-left uppercase tracking-wider">
              {product.variants!.length} Options
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
