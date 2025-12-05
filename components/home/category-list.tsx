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
        <section className="py-12 md:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">
                {/* Minimalist Header */}
                <div className="flex items-center justify-between mb-8 md:mb-12 border-b border-gray-100 pb-4">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 uppercase tracking-wider">
                        Shop by Category
                    </h2>
                    <Link
                        href="/products"
                        className="hidden md:flex items-center text-xs font-bold text-gray-900 uppercase tracking-wider hover:text-gray-600 transition-colors"
                    >
                        View All
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>

                {/* Compact Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                            <Link
                                href={`/products?category=${category.slug}`}
                                className="group block h-full"
                            >
                                <div className="relative h-full flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 group-hover:border-black group-hover:shadow-md">
                                    {/* Image Container */}
                                    <div className="relative aspect-square w-full bg-gray-50">
                                        <div className="absolute inset-0 p-4 flex items-center justify-center">
                                            {category.image ? (
                                                <div className="relative w-full h-full">
                                                    <Image
                                                        src={category.image}
                                                        alt={category.imageAlt || category.name}
                                                        fill
                                                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                    <span className="text-[10px] uppercase font-bold">
                                                        No Image
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Content - Compact & Sharp */}
                                    <div className="p-3 md:p-4 text-center bg-white">
                                        <h3 className="text-xs md:text-sm font-bold text-gray-900 uppercase tracking-wide group-hover:text-black transition-colors line-clamp-1">
                                            {category.name}
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile View All Link */}
                <div className="mt-8 md:hidden text-center">
                    <Link
                        href="/products"
                        className="inline-flex items-center justify-center w-full px-6 py-3 border border-gray-200 text-xs font-bold text-gray-900 uppercase tracking-wider rounded-lg hover:bg-black hover:text-white transition-colors"
                    >
                        View All Categories
                    </Link>
                </div>
            </div>
        </section>
    );
}
