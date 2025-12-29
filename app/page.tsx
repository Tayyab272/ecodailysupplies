import type { Metadata } from "next";
import {
  HeroSection,
  CategoryGrid,
  ProductShowcase,
  SustainabilityBlock,
  NewArrivals,
  FinalCTA,
  B2BBanner,
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
  title: "Eco-Friendly Packaging Supplies UK | Buy Boxes, Bubble Wrap & Sustainable Packing | EcoDailySupplies",
  description:
    "Shop eco-friendly packaging supplies online in the UK. Buy sustainable bubble wrap, recyclable cardboard boxes, biodegradable packing materials at wholesale prices. Free delivery over £50. Next-day UK shipping. Trusted by 10,000+ British businesses.",
  keywords: [
    // Primary Keywords (Highest Search Volume UK)
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

  // Organization Structured Data (JSON-LD) for SEO
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "EcoDailySupplies",
    alternateName: "EDS",
    legalName: "EcoDailySupplies Limited",
    url: siteUrl,
    logo: `${siteUrl}/logo.webp`,
    description:
      "UK's leading eco-friendly packaging supplier offering sustainable, biodegradable, and recyclable packaging materials. Carbon-neutral delivery, automatic bulk pricing, and commitment to environmental responsibility.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+44-7882-851632",
      contactType: "Customer Service",
      areaServed: "GB",
      availableLanguage: "English",
      email: "sales@ecodailysupplies.com",
    },
    sameAs: [
      // Add social media links when available
      // "https://www.facebook.com/ecodailysupplies",
      // "https://www.twitter.com/ecodailysupplies",
      // "https://www.linkedin.com/company/ecodailysupplies",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Unit BR16 Blakewater Road",
      addressLocality: "Blackburn",
      addressRegion: "England",
      postalCode: "BB1 5QF",
      addressCountry: "GB",
    },
    foundingDate: "2024",
    slogan: "Sustainable Packaging for a Greener Tomorrow",
    brand: {
      "@type": "Brand",
      name: "EcoDailySupplies",
      slogan: "Eco-Friendly Packaging Solutions",
    },
  };

  // LocalBusiness Structured Data (JSON-LD) for Local SEO
  const localBusinessStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}#organization`,
    name: "EcoDailySupplies",
    alternateName: "EDS",
    legalName: "EcoDailySupplies Limited",
    image: `${siteUrl}/logo.webp`,
    url: siteUrl,
    telephone: "+44-7882-851632",
    email: "sales@ecodailysupplies.com",
    priceRange: "££",
    paymentAccepted: "Credit Card, Debit Card, Bank Transfer, PayPal",
    currenciesAccepted: "GBP",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Unit BR16 Blakewater Road",
      addressLocality: "Blackburn",
      addressRegion: "England",
      postalCode: "BB1 5QF",
      addressCountry: "GB",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "53.7488",
      longitude: "-2.4883",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "09:00",
      closes: "17:00",
    },
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    description:
      "Premium eco-friendly and sustainable packaging supplies with automatic bulk pricing. Carbon-neutral next day delivery across the UK. Biodegradable, recyclable, and compostable packaging solutions for environmentally conscious businesses and consumers.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Eco-Friendly Packaging Products",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Sustainable Bubble Wrap",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Biodegradable Bubble Wrap",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Recyclable Cardboard Boxes",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "FSC Certified Shipping Boxes",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Compostable Packaging Materials",
        },
      ],
    },
  };

  // Website Structured Data (JSON-LD) for SEO
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "EcoDailySupplies - Premium Eco-Friendly Packaging Supplies",
    alternateName: "EDS",
    url: siteUrl,
    description:
      "UK's leading supplier of sustainable, eco-friendly packaging materials including biodegradable bubble wrap, recyclable boxes, and compostable packaging solutions.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/products?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "EcoDailySupplies",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.webp`,
      },
    },
  };

  // Store Structured Data for E-commerce
  const storeStructuredData = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "EcoDailySupplies",
    image: `${siteUrl}/logo.webp`,
    url: siteUrl,
    telephone: "+44-7882-851632",
    email: "sales@ecodailysupplies.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Unit BR16 Blakewater Road",
      addressLocality: "Blackburn",
      addressRegion: "England",
      postalCode: "BB1 5QF",
      addressCountry: "GB",
    },
    priceRange: "££",
    paymentAccepted: "Credit Card, Debit Card, Bank Transfer, PayPal",
  };

  return (
    <>
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(storeStructuredData),
        }}
      />

      {/* <B2BBanner /> */}
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