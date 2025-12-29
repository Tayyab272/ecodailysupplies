import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/common";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Package,
  TrendingUp,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { B2BRequestForm } from "@/components/b2b/b2b-request-form";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL || "https://ecodailysupplies.co.uk";

export const metadata: Metadata = {
  title: "Wholesale Packaging UK | B2B Bulk Order Quote | EcoDailySupplies",
  description:
    "Request a wholesale packaging quote from EcoDailySupplies UK. Bulk pricing for businesses. Competitive rates on large orders of eco-friendly boxes, bubble wrap & packaging materials. Next-day delivery available.",
  keywords: [
    "wholesale packaging UK",
    "B2B packaging supplier",
    "bulk packaging supplies UK",
    "corporate packaging",
    "business packaging supplies",
    "wholesale bubble wrap UK",
    "bulk cardboard boxes UK",
    "packaging wholesale UK",
    "B2B eco packaging",
    "trade packaging UK",
    "bulk order packaging",
    "wholesale packaging prices",
    "business packaging solutions UK",
  ],
  openGraph: {
    title: "Wholesale Packaging UK | B2B Bulk Quote | EcoDailySupplies",
    description:
      "Request a wholesale quote for eco-friendly packaging supplies. Bulk pricing for UK businesses. Competitive rates on large orders.",
    url: `${siteUrl}/b2b-request`,
    siteName: "EcoDailySupplies",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Wholesale Packaging UK | EcoDailySupplies",
    description: "Request a bulk packaging quote for your UK business.",
  },
  alternates: {
    canonical: `${siteUrl}/b2b-request`,
  },
};

export default function B2BRequestPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="relative z-10 border-b border-gray-300 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] py-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "B2B Request", href: "/b2b-request" },
            ]}
          />
        </div>
      </div>

      {/* Hero Section - Premium Style */}
      <div className="relative w-full overflow-hidden bg-white">
        <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
          <Image
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="B2B Business Solutions - Professional wholesale packaging"
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
                    B2B Solutions
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tight leading-[1.1]">
                  Request a Custom Quote
                </h1>

                {/* Description */}
                <p className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl">
                  Need bulk packaging supplies? Get competitive wholesale
                  pricing for your business. Fill out the form below and our
                  team will provide a custom quote within 1-2 business days.
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

      {/* Main Content */}
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

          {/* Link to Wholesale Page - Premium Style */}
          {/* <div className="mb-12 bg-white rounded-lg border border-gray-300 shadow-sm p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm md:text-base text-gray-700 mb-1">
                  <strong className="font-bold text-gray-900">
                    New to wholesale?
                  </strong>{" "}
                  Learn more about our bulk pricing, benefits, and how it works.
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="shrink-0 border-gray-300 hover:bg-gray-50"
              >
                <Link
                  href="/wholesale"
                  className="inline-flex items-center gap-2"
                >
                  Visit Wholesale Page
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div> */}

          {/* Benefits Section - Premium Style */}
          <div className="grid gap-6 md:grid-cols-3 mb-16">
            <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-6 md:p-8 group hover:shadow-md transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 shrink-0 group-hover:bg-primary transition-colors">
                  <TrendingUp
                    className="h-6 w-6 text-primary group-hover:text-white transition-colors"
                    strokeWidth={2}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                    Save Up to 40%
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Competitive bulk pricing for large orders
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-6 md:p-8 group hover:shadow-md transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 shrink-0 group-hover:bg-primary transition-colors">
                  <Package
                    className="h-6 w-6 text-primary group-hover:text-white transition-colors"
                    strokeWidth={2}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                    Custom Solutions
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Tailored packaging solutions for your needs
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-6 md:p-8 group hover:shadow-md transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 shrink-0 group-hover:bg-primary transition-colors">
                  <CheckCircle
                    className="h-6 w-6 text-primary group-hover:text-white transition-colors"
                    strokeWidth={2}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                    Fast Response
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Get a quote within 1-2 business days
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section - Premium Style */}
          <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-8 md:p-10 mb-12">
            <div className="mb-8">
              <div className="mb-4">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Request Form
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                Get Your Custom Quote
              </h2>
            </div>
            <B2BRequestForm />
          </div>

          {/* Additional Info - Premium Style */}
          <div className="text-center bg-gray-50 rounded-lg border border-gray-200 p-6 md:p-8">
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Have questions?{" "}
              <Link
                href="/contact"
                className="text-primary hover:text-gray-900 font-bold underline transition-colors"
              >
                Contact our sales team
              </Link>{" "}
              or call us at{" "}
              <a
                href="tel:01254916167"
                className="text-primary hover:text-gray-900 font-bold transition-colors"
              >
                01254 916167
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
