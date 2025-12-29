import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import { WebsiteLayoutWrapper } from "@/components/common/website-layout-wrapper";
import { SanityLiveWrapper } from "@/components/common/sanity-live-wrapper";
import { AuthProvider } from "@/components/auth/auth-provider";
import { CartProvider } from "@/components/cart/cart-provider";
import { getAllCategories } from "@/sanity/lib";
// import Chatbot from "@/components/common/Chatbot";
// PERFORMANCE: Vercel Speed Insights & Analytics
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

/**
 * Inter Font Configuration
 *
 * Why Inter is the best choice for this e-commerce site:
 * - Designed specifically for user interfaces and screens
 * - Excellent readability at all sizes (critical for product descriptions, prices, checkout)
 * - Professional and modern aesthetic (aligns with "Immersive Minimalism & Performant Luxury")
 * - Versatile: works perfectly for headings, body text, and UI elements
 * - Optimized for digital screens with high legibility
 * - Used by many successful e-commerce platforms
 * - Great performance with font-display: swap
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Get base URL for metadata
const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL || "https://ecodailysupplies.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Eco-Friendly Packaging Supplies UK | Sustainable Boxes & Bubble Wrap | EcoDailySupplies",
    template: "%s | EcoDailySupplies - Eco Packaging UK",
  },
  description:
    "Buy eco-friendly packaging supplies in the UK. Shop sustainable bubble wrap, recyclable cardboard boxes, biodegradable packing materials & compostable packaging. Free UK delivery over £50. Wholesale prices available. Next-day delivery across Britain.",
  keywords: [
    // HIGH-PRIORITY UK SEARCH TERMS (Primary Keywords)
    "eco-friendly packaging UK",
    "sustainable packaging UK",
    "biodegradable packaging UK",
    "recyclable packaging supplies",
    "eco packaging supplies UK",
    "green packaging UK",
    "environmentally friendly packaging",

    // PRODUCT-SPECIFIC KEYWORDS (High Search Volume)
    "bubble wrap UK",
    "cardboard boxes UK",
    "packing materials UK",
    "shipping supplies UK",
    "packaging boxes UK",
    "mailing bags UK",
    "packing tape UK",
    "protective packaging UK",

    // ECO-SPECIFIC PRODUCT KEYWORDS
    "biodegradable bubble wrap",
    "recyclable cardboard boxes",
    "compostable packaging",
    "FSC certified boxes",
    "kraft paper packaging",
    "paper tape eco-friendly",
    "biodegradable packing peanuts",
    "recycled cardboard boxes",

    // B2B & WHOLESALE KEYWORDS (High-Value)
    "wholesale packaging UK",
    "bulk packaging supplies",
    "trade packaging UK",
    "business packaging supplies",
    "commercial packaging UK",
    "packaging supplier UK",
    "wholesale boxes UK",
    "bulk bubble wrap",

    // LOCAL SEO KEYWORDS (UK Regions)
    "packaging supplies London",
    "packaging supplies Manchester",
    "packaging supplies Birmingham",
    "packaging supplies Leeds",
    "packaging supplies Liverpool",
    "packaging Blackburn",
    "packaging Lancashire",
    "packaging North West",

    // LONG-TAIL KEYWORDS (Featured Snippets Opportunity)
    "cheap packaging supplies UK",
    "best eco-friendly packaging",
    "where to buy cardboard boxes UK",
    "sustainable packaging for small business",
    "eco packaging free delivery",
    "next day packaging delivery UK",
    "affordable biodegradable packaging",
    "plastic-free packaging alternatives",

    // BUYING INTENT KEYWORDS
    "buy packaging supplies online UK",
    "order cardboard boxes UK",
    "packaging supplies near me",
    "packaging shop online UK",
    "eco packaging online",

    // BRAND KEYWORDS
    "EcoDailySupplies",
    "eco daily supplies UK",
    "EDS packaging",
  ],
  authors: [{ name: "EcoDailySupplies", url: baseUrl }],
  creator: "EcoDailySupplies",
  publisher: "EcoDailySupplies Ltd",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: baseUrl,
    siteName: "EcoDailySupplies - Eco-Friendly Packaging UK",
    title: "Eco-Friendly Packaging Supplies UK | Free Delivery Over £50 | EcoDailySupplies",
    description:
      "Shop sustainable packaging supplies online. Biodegradable bubble wrap, recyclable boxes, eco-friendly packing materials. Wholesale prices. Next-day UK delivery. Trusted by 10,000+ businesses.",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "EcoDailySupplies - UK's Leading Eco-Friendly Packaging Supplier",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ecodailysupplies",
    creator: "@ecodailysupplies",
    title: "Eco-Friendly Packaging Supplies UK | EcoDailySupplies",
    description:
      "Sustainable packaging supplies with free UK delivery over £50. Biodegradable, recyclable & compostable options. Next-day delivery available.",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "EcoDailySupplies - Sustainable Packaging UK",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your Google Search Console verification code
    // google: "your-google-verification-code",
    // Add Bing Webmaster Tools verification
    // other: { "msvalidate.01": "your-bing-verification-code" },
  },
  category: "E-commerce",
  classification: "Packaging Supplies",
  alternates: {
    canonical: baseUrl,
    languages: {
      "en-GB": baseUrl,
    },
  },
  other: {
    "geo.region": "GB",
    "geo.placename": "United Kingdom",
    "geo.position": "53.7500;-2.4833",
    "ICBM": "53.7500, -2.4833",
    "distribution": "UK",
    "rating": "General",
    "revisit-after": "7 days",
  },
};

// PERFORMANCE: Removed force-dynamic to enable static generation
// SanityLive is only used in specific dynamic pages that need real-time updates
// Static pages (home, products, etc.) will use ISR with revalidation

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // PERFORMANCE: Only fetch categories for header (not all products)
  // Products are loaded on-demand by search/category pages
  const categories = await getAllCategories();

  return (
    <html
      lang="en-GB"
      className={`${inter.variable} font-sans`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnects for image/CDN origins to improve LCP */}
        <link
          rel="preconnect"
          href="https://cdn.sanity.io"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="//cdn.sanity.io" />
        <link
          rel="preconnect"
          href="https://pub-20f982007aa54df4849bcd969b89a1bf.r2.dev"
          crossOrigin="anonymous"
        />
        <link
          rel="dns-prefetch"
          href="//pub-20f982007aa54df4849bcd969b89a1bf.r2.dev"
        />
        <link
          rel="preconnect"
          href="https://images.unsplash.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="//images.unsplash.com" />

        {/* Geo tag for UK targeting */}
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />

        {/* Additional SEO meta tags */}
        <meta name="theme-color" content="#10b981" />
        <meta name="application-name" content="EcoDailySupplies" />
        <meta name="apple-mobile-web-app-title" content="EcoDailySupplies" />

        {/* Organization & LocalBusiness Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${baseUrl}/#organization`,
                  name: "EcoDailySupplies",
                  alternateName: ["Eco Daily Supplies", "EcoDailySupplies Ltd", "EDS Packaging"],
                  url: baseUrl,
                  logo: {
                    "@type": "ImageObject",
                    url: `${baseUrl}/logo.webp`,
                    width: 160,
                    height: 50,
                  },
                  image: `${baseUrl}/og-image.webp`,
                  description: "UK's trusted supplier of eco-friendly packaging. Sustainable bubble wrap, recyclable cardboard boxes, and biodegradable packing materials with free delivery over £50.",
                  email: "sales@ecodailysupplies.com",
                  telephone: "+447397057703",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "Unit CW10, Challenge Way",
                    addressLocality: "Blackburn",
                    addressRegion: "Lancashire",
                    postalCode: "BB1 5QF",
                    addressCountry: "GB",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: 53.7500,
                    longitude: -2.4833,
                  },
                  areaServed: {
                    "@type": "Country",
                    name: "United Kingdom",
                  },
                  sameAs: [
                    "https://www.facebook.com/ecodailysupplies",
                    "https://www.instagram.com/ecodailysupplies",
                    "https://twitter.com/ecodailysupplies",
                    "https://www.linkedin.com/company/ecodailysupplies",
                  ],
                  contactPoint: [
                    {
                      "@type": "ContactPoint",
                      telephone: "+447397057703",
                      contactType: "sales",
                      email: "sales@ecodailysupplies.com",
                      areaServed: "GB",
                      availableLanguage: "English",
                    },
                    {
                      "@type": "ContactPoint",
                      telephone: "+447397057703",
                      contactType: "customer service",
                      email: "sales@ecodailysupplies.com",
                      areaServed: "GB",
                      availableLanguage: "English",
                    },
                  ],
                },
                {
                  "@type": "LocalBusiness",
                  "@id": `${baseUrl}/#localbusiness`,
                  name: "EcoDailySupplies",
                  image: `${baseUrl}/og-image.webp`,
                  url: baseUrl,
                  telephone: "+447397057703",
                  email: "sales@ecodailysupplies.com",
                  priceRange: "£",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "Unit CW10, Challenge Way",
                    addressLocality: "Blackburn",
                    addressRegion: "Lancashire",
                    postalCode: "BB1 5QF",
                    addressCountry: "GB",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: 53.7500,
                    longitude: -2.4833,
                  },
                  openingHoursSpecification: [
                    {
                      "@type": "OpeningHoursSpecification",
                      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                      opens: "09:00",
                      closes: "17:00",
                    },
                  ],
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "4.8",
                    reviewCount: "150",
                    bestRating: "5",
                    worstRating: "1",
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": `${baseUrl}/#website`,
                  url: baseUrl,
                  name: "EcoDailySupplies",
                  description: "UK's trusted supplier of eco-friendly packaging supplies",
                  publisher: {
                    "@id": `${baseUrl}/#organization`,
                  },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: `${baseUrl}/products?search={search_term_string}`,
                    },
                    "query-input": "required name=search_term_string",
                  },
                  inLanguage: "en-GB",
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className="min-h-screen bg-background font-sans antialiased"
        suppressHydrationWarning
      >
        {/* Silence noisy console logs in production to reduce JS overhead */}
        <Script id="silence-console" strategy="beforeInteractive">
          {`(function(){try{if(process&&process.env&&process.env.NODE_ENV==='production'){['log','info','debug','trace'].forEach(function(m){if(console&&console[m]){console[m]=function(){}}})}}catch(e){}})();`}
        </Script>
        <AuthProvider>
          <CartProvider>
            {/* WebsiteLayoutWrapper conditionally renders header/footer based on route */}
            {/* For /studio routes, it only renders children (no header/footer) */}
            <WebsiteLayoutWrapper categories={categories || []}>
              {children}
            </WebsiteLayoutWrapper>

            {/* Enable real-time Sanity content updates - Server Component only */}
            {/* Safe to render everywhere - SanityLive only activates on pages that use sanityFetch */}
            <SanityLiveWrapper />
          </CartProvider>
        </AuthProvider>
        {/* PERFORMANCE: Real-time performance monitoring */}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}