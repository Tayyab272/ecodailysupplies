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

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ecodailysupplies.co.uk";

/**
 * Homepage Metadata
 * SEO optimization for the homepage with comprehensive UK-focused keywords
 * Targeting both B2C and B2B customers with emphasis on eco-friendly and sustainable packaging
 */
export const metadata: Metadata = {
  title:
    "Eco-Friendly Packaging Supplies UK | Sustainable Bubble Wrap, Boxes & Biodegradable Packaging | EcoDailySupplies",
  description:
    "UK's premier eco-friendly packaging supplier. Buy sustainable bubble wrap, recyclable cardboard boxes, biodegradable packing materials, and compostable packaging online. Wholesale eco packaging with carbon-neutral delivery across the UK. Environmentally responsible packaging solutions for businesses and consumers.",
  keywords: [
    "eco-friendly packaging UK",
    "sustainable packaging supplies UK",
    "biodegradable bubble wrap UK",
    "recyclable packaging UK",
    "green packaging solutions UK",
    "compostable packaging UK",
    "eco packaging wholesale UK",
    "sustainable cardboard boxes UK",
    "environmentally friendly packaging UK",
    "plastic-free packaging UK",
    "carbon-neutral packaging delivery",
    "recycled packaging materials UK",
    "eco bubble wrap UK",
    "sustainable shipping supplies UK",
    "biodegradable packing tape UK",
    "FSC certified boxes UK",
    "zero waste packaging UK",
    "eco-conscious packaging supplier",
    "green business packaging UK",
    "sustainable B2B packaging UK",
    "eco packaging materials online",
    "renewable packaging resources UK",
    "ethical packaging supplies UK",
    "earth-friendly packaging UK",
    "eco daily supplies",
    "EDS packaging UK",
    "sustainable packaging next day delivery",
    "bulk eco packaging UK",
    "wholesale sustainable packaging",
    "eco-friendly packaging Blackburn",
    "Lancashire sustainable packaging",
  ],
  openGraph: {
    title:
      "Eco-Friendly Packaging Supplies UK | Sustainable Solutions | EcoDailySupplies",
    description:
      "UK's leading eco-friendly packaging supplier. Sustainable bubble wrap, recyclable boxes, and biodegradable materials. Wholesale pricing with carbon-neutral delivery across the UK.",
    url: siteUrl,
    siteName: "EcoDailySupplies (EDS) - Premium Sustainable Packaging UK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Eco-Friendly Packaging Supplies UK | Sustainable Solutions | EcoDailySupplies",
    description:
      "UK's premier sustainable packaging supplier. Eco-friendly materials, wholesale pricing, carbon-neutral delivery nationwide.",
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
      email: "sales@ecodailysupplies.co.uk",
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
    email: "sales@ecodailysupplies.co.uk",
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
    email: "sales@ecodailysupplies.co.uk",
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