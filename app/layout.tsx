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
  process.env.NEXT_PUBLIC_APP_URL || "https://ecodailysupplies.co.uk";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "EcoDailySupplies - Premium Eco-Friendly Packaging Supplies UK",
    template: "%s | EcoDailySupplies (EDS)",
  },
  description:
    "UK's leading eco-friendly packaging supplier. Buy sustainable bubble wrap, recyclable cardboard boxes, biodegradable packing materials, and compostable packaging online. Wholesale eco packaging with carbon-neutral delivery across the UK. Environmentally responsible solutions for businesses and consumers.",
  keywords: [
    // Primary eco-friendly keywords
    "eco-friendly packaging UK",
    "sustainable packaging supplies",
    "biodegradable packaging UK",
    "recyclable packaging UK",
    "compostable packaging UK",
    "green packaging UK",
    "eco packaging supplies",
    "sustainable bubble wrap",
    "biodegradable bubble wrap UK",
    "recyclable cardboard boxes UK",
    "FSC certified boxes UK",
    "eco-friendly packing tape",
    // Environmental & sustainability keywords
    "carbon-neutral delivery UK",
    "plastic-free packaging UK",
    "zero waste packaging",
    "earth-friendly packaging",
    "renewable packaging materials",
    "sustainable shipping supplies",
    "eco-conscious packaging",
    "environmentally friendly packaging UK",
    "green business packaging",
    "ethical packaging supplies",
    // B2B/Wholesale eco keywords
    "wholesale eco packaging UK",
    "bulk sustainable packaging",
    "B2B eco-friendly packaging",
    "corporate sustainable packaging",
    "business eco packaging supplies",
    "wholesale biodegradable packaging",
    "bulk recyclable packaging",
    "sustainable packaging wholesale",
    // Product-specific eco keywords
    "eco bubble wrap online",
    "sustainable protective packaging",
    "recyclable shipping boxes UK",
    "biodegradable packing materials",
    "compostable mailers UK",
    "eco-friendly packaging materials",
    "sustainable packaging boxes",
    "green packaging solutions",
    // Brand & location keywords
    "eco daily supplies",
    "EDS packaging UK",
    "ecodailysupplies",
    "Blackburn eco packaging",
    "Lancashire sustainable packaging",
    "UK eco packaging supplier",
    // Service & delivery keywords
    "next day eco packaging delivery",
    "carbon-neutral packaging delivery UK",
    "sustainable packaging next day",
    "eco packaging online UK",
    // Long-tail sustainability keywords
    "affordable eco-friendly packaging UK",
    "cheap sustainable packaging supplies",
    "wholesale eco-friendly packaging UK",
    "bulk biodegradable packaging UK",
    "sustainable packaging supplies next day delivery",
    "eco-friendly packaging for small business UK",
    "recyclable packaging materials UK",
    "compostable packaging solutions UK",
  ],
  authors: [{ name: "EcoDailySupplies" }],
  creator: "EcoDailySupplies",
  publisher: "EcoDailySupplies",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: baseUrl,
    siteName: "EcoDailySupplies (EDS) - Premium Eco-Friendly Packaging Supplies UK",
    title: "EcoDailySupplies - Sustainable Packaging Solutions UK",
    description:
      "Premium eco-friendly packaging supplies with automatic bulk pricing. Carbon-neutral next day delivery. 100% sustainable, biodegradable, and recyclable packaging options for environmentally conscious businesses.",
    images: [
      {
        url: "/logo.webp", // Relative URL - metadataBase will resolve it
        width: 1200,
        height: 630,
        alt: "EcoDailySupplies Premium Eco-Friendly Packaging Supplies UK",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EcoDailySupplies - Sustainable Packaging Solutions UK",
    description:
      "Premium eco-friendly packaging supplies with automatic bulk pricing. Carbon-neutral next day delivery. Sustainable, biodegradable, and recyclable options.",
    images: [
      {
        url: "/logo.webp", // Relative URL - metadataBase will resolve it
        width: 1200,
        height: 630,
        alt: "EcoDailySupplies Premium Eco-Friendly Packaging Supplies UK",
      },
    ],
    creator: "@ecodailysupplies",
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
  verification: {
    // Add Google Search Console verification code here when available
    // google: "your-google-verification-code",
  },
  category: "E-commerce",
  classification: "Eco-Friendly Packaging Supplies",
  alternates: {
    canonical: baseUrl,
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
       
        <Analytics />
      </body>
    </html>
  );
}