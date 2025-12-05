"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/products/product-card";
import { Product } from "@/types/product";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ProductShowcaseProps {
    featuredProducts: Product[];
    bestSellingProducts: Product[];
    salesProducts: Product[];
}

type Tab = "featured" | "bestSelling" | "sales";

export function ProductShowcase({
    featuredProducts,
    bestSellingProducts,
    salesProducts,
}: ProductShowcaseProps) {
    const [activeTab, setActiveTab] = useState<Tab>("featured");

    const tabs: { id: Tab; label: string; products: Product[] }[] = [
        { id: "featured", label: "Featured", products: featuredProducts },
        { id: "bestSelling", label: "Best Selling", products: bestSellingProducts },
        { id: "sales", label: "On Sale", products: salesProducts },
    ];

    const activeProducts = tabs.find((t) => t.id === activeTab)?.products || [];

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">
                {/* Header & Tabs */}
                <div className="flex flex-col items-center justify-center mb-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 tracking-tight">
                        Product Showcase
                    </h2>

                    {/* Sliding Pill Tabs */}
                    <div className="relative inline-flex bg-white p-1.5 rounded-full shadow-sm border border-gray-300">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "relative z-10 px-8 py-3 text-sm font-bold rounded-full transition-colors duration-300",
                                    activeTab === tab.id ? "text-white" : "text-gray-900 hover:text-gray-600"
                                )}
                            >
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-primary rounded-full -z-10"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid Layout */}
                <div className="min-h-[400px]">
                    {activeProducts.length > 0 ? (
                        <motion.div
                            layout
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
                        >
                            <AnimatePresence mode="popLayout">
                                {activeProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-2xl"
                        >
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No products found
                            </h3>
                            <p className="text-gray-500">
                                Check back soon for updates in this collection.
                            </p>
                        </motion.div>
                    )}
                </div>

                {/* View All Link */}
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
