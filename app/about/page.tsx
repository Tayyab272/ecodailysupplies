import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/common";
import {
  ArrowRight,
  Leaf,
  Package,
  Users,
  Award,
  TrendingUp,
  Heart,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL || "https://ecodailysupplies.com";

/**
 * About Page Metadata - SEO Optimized for UK
 * Targets: "packaging supplier UK", "eco-friendly packaging company"
 * Enhances E-E-A-T signals for Google rankings
 */
export const metadata: Metadata = {
  title: "About EcoDailySupplies: Eco Supplies for UK Businesses",
  description:
    "Learn about EcoDailySupplies, a UK supplier providing eco packaging, paper, and safety supplies for businesses with reliable delivery and quality service.",
  keywords: [
    "eco supplies for UK businesses",
    "sustainable packaging supplier UK",
    "wholesale eco supplies",
    "packaging supplier UK",
    "responsible business supplies",
    "eco packaging supplier",
    "sustainable business products",
    "eco-friendly packaging company",
    "sustainable packaging supplier",
    "UK packaging company",
    "Blackburn packaging supplier",
    "Lancashire packaging company",
    "wholesale packaging supplier UK",
  ],
  openGraph: {
    title: "About EcoDailySupplies | UK's Leading Packaging Supplier",
    description:
      "Trusted by 10,000+ UK businesses. EcoDailySupplies provides eco-friendly packaging supplies with free delivery, wholesale prices, and next-day shipping across Britain.",
    url: `${siteUrl}/about`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About EcoDailySupplies | UK Packaging Supplier",
    description:
      "UK's trusted eco-friendly packaging supplier. 10,000+ happy customers. Free delivery over £50.",
  },
  alternates: {
    canonical: `${siteUrl}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="relative z-10 border-b border-gray-300 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] py-6">
          <Breadcrumbs items={[{ label: "About", href: "/about" }]} />
        </div>
      </div>

      {/* Hero Section - Premium Style */}
      <div className="relative w-full overflow-hidden bg-white">
        <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
          <Image
            src="https://pub-20f982007aa54df4849bcd969b89a1bf.r2.dev/ecodailysupplies_about.png"
            alt="Professional packaging workspace"
            fill
            className="object-cover"
            priority
          />
          {/* Subtle overlay for text readability */}
          <div className="absolute inset-0 bg-linear-to-b from-gray-900/50 via-gray-900/30 to-gray-900/70" />

          {/* Content Container */}
          <div className="container relative mx-auto h-full px-4 sm:px-6 lg:px-8 max-w-[1600px]">
            <div className="flex h-full items-center">
              <div className="max-w-4xl space-y-6 md:space-y-8">
                {/* Label */}
                <div className="flex items-center gap-3">
                  <div className="h-px w-12 bg-white/40"></div>
                  <span className="text-xs font-bold text-white/80 uppercase tracking-wider">
                    About Us
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tight leading-[1.1]">
                  About EcoDailySupplies
                </h1>

                {/* Description */}
                <p className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl">
                  EcoDailySupplies is a dominant supplier of reliable eco
                  supplies for UK businesses, with its suppliers being
                  London-based businesses. We supply organisations, big or
                  small, with convenient, responsibly obtained products that can
                  be used to facilitate the daily processes and promote more
                  responsible buying choices.
                </p>

                {/* Decorative Line */}
                <div className="pt-4">
                  <div className="h-px w-24 bg-white/40"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl">
          {/* Back Button */}
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="mb-12 text-gray-600 hover:text-gray-900 hover:bg-gray-50 -ml-2 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" strokeWidth={2} />
              Back to Home
            </Button>
          </Link>

          {/* Main Content - Premium Card */}
          <div className="mb-20 bg-white rounded-lg border border-gray-300 shadow-sm p-8 md:p-12">
            <div className="mb-8">
              <div className="mb-4">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Our Story
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
                Who We Are
              </h2>
            </div>
            <div className="space-y-6 text-base leading-relaxed text-gray-600 md:text-lg">
              <p>
                EcoDailySupplies was formed with the aim of satisfying the
                rising pressure of business needs to have some responsible
                performance blends. Most organisations desire to make an
                improved purchasing decision, and yet they cannot identify
                suppliers who provide consistent quality, a fair price, and
                reliable delivery..
              </p>
              <p>
                EcoDailySupplies is the gap that we have created. Through
                collaborating with reputable manufacturers and suppliers of
                logistics, it will be guaranteed that our products are of UK
                standards; at the same time, they will be available to small and
                medium-sized business enterprises and large commercial
                enterprises.
              </p>
            </div>
          </div>

          {/* Stats Grid - Premium Style */}
          <div className="mb-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-6 md:p-8 text-center group hover:shadow-md transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users
                    className="h-7 w-7 md:h-8 md:w-8 text-white"
                    strokeWidth={2}
                  />
                </div>
              </div>
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
                10,000+
              </div>
              <div className="text-xs md:text-sm text-gray-600 uppercase tracking-wider font-medium">
                Happy Customers
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-6 md:p-8 text-center group hover:shadow-md transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Package
                    className="h-7 w-7 md:h-8 md:w-8 text-white"
                    strokeWidth={2}
                  />
                </div>
              </div>
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
                50+
              </div>
              <div className="text-xs md:text-sm text-gray-600 uppercase tracking-wider font-medium">
                Product Categories
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-6 md:p-8 text-center group hover:shadow-md transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp
                    className="h-7 w-7 md:h-8 md:w-8 text-white"
                    strokeWidth={2}
                  />
                </div>
              </div>
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
                15+
              </div>
              <div className="text-xs md:text-sm text-gray-600 uppercase tracking-wider font-medium">
                Years Experience
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-6 md:p-8 text-center group hover:shadow-md transition-all duration-300">
              <div className="flex justify-center mb-4">
                <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Award
                    className="h-7 w-7 md:h-8 md:w-8 text-white"
                    strokeWidth={2}
                  />
                </div>
              </div>
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 tracking-tight">
                99%
              </div>
              <div className="text-xs md:text-sm text-gray-600 uppercase tracking-wider font-medium">
                Satisfaction Rate
              </div>
            </div>
          </div>

          {/* Features Grid - Premium Style */}
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 md:gap-x-8 md:gap-y-8 mb-20">
            <div className="group bg-white rounded-lg border border-gray-300 shadow-sm p-8 hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Heart className="h-6 w-6 text-primary" strokeWidth={2} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                  Our Approach to Responsible Sourcing
                </h3>
              </div>
              {/* <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-sm md:text-base leading-relaxed text-gray-600">
                    Premium quality standards on all products
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-sm md:text-base leading-relaxed text-gray-600">
                    Next-day delivery available nationwide
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-sm md:text-base leading-relaxed text-gray-600">
                    Automatic bulk pricing for best value
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-sm md:text-base leading-relaxed text-gray-600">
                    Sustainable eco-friendly options
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-sm md:text-base leading-relaxed text-gray-600">
                    Exceptional customer service
                  </span>
                </li>
              </ul> */}
              <p className="text-sm md:text-base leading-relaxed text-gray-600">
                At EcoDailySupplies, the process of responsibility begins with
                product selection. Our suppliers are focused on quality
                management, sustainable packaging supplier UK and efficient
                production procedures.
                <br />
                <br />
                Our products utilize recyclable or biodegradable materials a
                lot, and this contributes towards businesses not having to
                compromise performance by reducing their waste. Although we are
                constantly broadening our scope, we are determined to be
                transparent and pragmatic as opposed to trends or greenwashing.
              </p>
            </div>

            <div className="group bg-white rounded-lg border border-gray-300 shadow-sm p-8 hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Leaf className="h-6 w-6 text-primary" strokeWidth={2} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                  Supporting UK Businesses at Every Stage
                </h3>
              </div>
              <p className="text-sm md:text-base leading-relaxed text-gray-600">
                We are aware that there are no two businesses that can run in
                the same manner. This is why we have been assisting
                organisations during all stages of growth, from start-ups when
                they make their first bulk orders, to already existing companies
                with recurring supply requirements.
                <br />
                <br />
                Taking orders in high quantities, buying at good-better-best,
                and constantly replenishing stock; these are the advantages of
                our wholesale eco supplies service, which will enable businesses
                to be environmentally conscious and conscious of their
                operational costs. This will assist in eliminating stress in the
                procurement process, and there will not be any disruption in
                operations.
              </p>
            </div>
          </div>

          {/* CTA Section - Premium Style */}
          <section className="relative bg-gray-900 rounded-lg overflow-hidden">
            <div className="relative z-10 px-8 md:px-12 lg:px-16 py-16 md:py-20 lg:py-24">
              <div className="mx-auto max-w-3xl text-center">
                {/* Heading */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="h-px w-12 bg-white/30"></div>
                  <span className="text-xs font-bold text-white/60 uppercase tracking-wider">
                    Explore
                  </span>
                  <div className="h-px w-12 bg-white/30"></div>
                </div>
                <h2 className="mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
                  Our Complete Product Catalog
                </h2>

                {/* Description */}
                <p className="mb-10 text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
                  Discover our full range of premium packaging solutions, from
                  eco-friendly materials to custom packaging options. Bulk
                  pricing available on all products.
                </p>

                {/* CTA Button */}
                <Button
                  asChild
                  className="group bg-white text-gray-900 hover:bg-gray-100 rounded-full px-8 py-6 text-base font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-3"
                  >
                    View All Products
                    <ArrowRight
                      className="h-5 w-5 transition-transform group-hover:translate-x-1"
                      strokeWidth={2.5}
                    />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
