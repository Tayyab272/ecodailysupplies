"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/types/category";

interface CategoryListProps {
  categories: Category[] | null;
}

export function CategoryList({ categories }: CategoryListProps) {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">
        {/* Section Header - Matches Product Showcase style */}
        <div className="flex flex-col items-center justify-center mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Shop by Category
          </h2>
          <p className="text-gray-500 max-w-lg">
            Find the perfect packaging solution for your needs
          </p>
        </div>

        {/* Category Grid - Responsive Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 max-w-4xl mx-auto">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex justify-center"
            >
              <Link
                href={`/products?category=${category.slug}`}
                className="group flex flex-col items-center text-center w-full max-w-[140px] sm:max-w-[160px]"
              >
                {/* Circular Image Container */}
                <div className="relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px] mb-3 rounded-full overflow-hidden bg-white border-2 border-gray-300 group-hover:border-primary transition-all duration-300 shadow-sm group-hover:shadow-lg">
                  <div className="absolute inset-1.5 sm:inset-2 rounded-full overflow-hidden bg-gray-100">
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.imageAlt || category.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100px, (max-width: 768px) 120px, 140px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                        <span className="text-2xl sm:text-3xl">📦</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Category Name */}
                <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 line-clamp-2 px-1">
                  {category.name}
                </h3>

                {/* Subtle Arrow on Hover */}
                <div className="flex items-center gap-1 mt-1 text-[10px] sm:text-xs text-gray-400 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                  <span>Explore</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Link - Matches site style */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center text-sm font-bold text-gray-900 uppercase tracking-wider hover:text-gray-600 transition-colors border-b border-gray-900 pb-1"
          >
            View All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
