import type { Metadata } from "next";
import {
  HeroSection,
  CategoryGrid,
  ProductShowcase,
  SustainabilityBlock,
  NewArrivals,
  FinalCTA,
} from "@/components/home";
import {
  getFeaturedProductsList,
  getBestSellingProductsList,
  getSalesProductsList,
} from "@/services/products/product.service";

// Revalidation strategy: On-demand revalidation via Sanity webhooks
// Pages will only revalidate when content changes in Sanity CMS
// For development, use `npm run dev` which has hot reloading
export const revalidate = false;

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ecodailysupplies.com";

/**
 * Homepage Metadata - Optimized for UK Google Rankings
 * Primary target: "eco-friendly packaging UK", "packaging supplies UK"
 * Secondary: Wholesale, B2B, sustainable packaging
 */
export const metadata: Metadata = {
  title: "Eco Packaging Supplies for Small Businesses ",
  description:
    "Shop eco packaging supplies for small businesses in the UK. Recyclable, biodegradable and bulk packaging, cleaning and safety products with fast UK delivery.",
  keywords: [
    // Primary Keywords (Highest Search Volume UK)
    "eco packaging supplies for small businesses",
    "packaging supplies UK",
    "eco-friendly packaging UK",
    "cardboard boxes UK",
    "bubble wrap UK",
    "packing materials UK",
    "sustainable packaging UK",

    // Product Keywords
    "recyclable boxes UK",
    "biodegradable packaging",
    "compostable packaging UK",
    "shipping boxes UK",
    "mailing boxes UK",
    "packing tape UK",
    "packaging paper UK",

    // Commercial Intent Keywords
    "buy packaging online UK",
    "cheap packaging supplies UK",
    "bulk packaging UK",
    "wholesale packaging UK",
    "packaging supplier UK",
    "trade packaging UK",

    // Long-tail Keywords
    "eco-friendly packaging for small business",
    "sustainable packaging solutions UK",
    "best packaging supplies UK",
    "next day packaging delivery UK",
    "free delivery packaging UK",
    "sustainable packaging supplier UK",
    "recyclable packaging materials",
    "biodegradable packaging options",
    "Wholesale Eco Supplies UK",
    "eco friendly paper products",
    "cleaning and safety supplies UK",


    // Local Keywords
    "packaging supplies near me",
    "packaging Blackburn",
    "packaging Lancashire",
    "packaging North West England",

    // Brand Keywords
    "EcoDailySupplies",
    "eco daily supplies",
  ],
  openGraph: {
    title: "Eco-Friendly Packaging Supplies UK | Free Delivery Over £50 | EcoDailySupplies",
    description:
      "Buy sustainable packaging supplies online. Recyclable boxes, biodegradable bubble wrap, eco-friendly packing materials. Wholesale prices. Next-day UK delivery. Trusted by 10,000+ businesses.",
    url: siteUrl,
    siteName: "EcoDailySupplies - UK's #1 Eco Packaging Supplier",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-homepage.webp`,
        width: 1200,
        height: 630,
        alt: "EcoDailySupplies - Eco-Friendly Packaging Supplies UK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eco-Friendly Packaging Supplies UK | EcoDailySupplies",
    description:
      "Shop sustainable packaging online. Free UK delivery over £50. Recyclable boxes, biodegradable bubble wrap & more. Next-day delivery available.",
    images: [`${siteUrl}/og-homepage.webp`],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function Home() {
  const [featuredProducts, bestSellingProducts, salesProducts] = await Promise.all([
    getFeaturedProductsList(),
    getBestSellingProductsList(),
    getSalesProductsList(),
  ]);

  return (
    <>
      <HeroSection />
      {/* <TrustBar /> */}
      <CategoryGrid />
      <ProductShowcase
        featuredProducts={featuredProducts}
        bestSellingProducts={bestSellingProducts}
        salesProducts={salesProducts}
      />
      <SustainabilityBlock />
      <NewArrivals />
      <FinalCTA />
    </>
  );
}