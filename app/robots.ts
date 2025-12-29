import { MetadataRoute } from "next";

/**
 * Robots.txt Configuration for EcoDailySupplies UK
 * Controls what search engines can crawl and index
 *
 * SEO Best Practices:
 * - Allow all public pages (products, categories, static pages)
 * - Block private pages (admin, account, checkout, cart)
 * - Block API routes and internal pages
 * - Point to sitemap.xml for better indexing
 * - Optimized for Google UK and Bing UK
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ecodailysupplies.co.uk";

  return {
    rules: [
      {
        // Default rules for all search engines
        userAgent: "*",
        allow: [
          "/", // Homepage - eco-friendly packaging UK
          "/products", // Products listing - sustainable packaging supplies
          "/products/*", // Individual product pages
          "/categories", // Categories page
          "/about", // About page - company trust signals
          "/contact", // Contact page - local SEO
          "/faq", // FAQ page - featured snippets opportunity
          "/terms", // Terms page
          "/privacy", // Privacy page
          "/returns-policy", // Returns policy page
          "/b2b-request", // B2B wholesale page
        ],
        disallow: [
          "/api/", // Block all API routes
          "/admin/", // Block admin dashboard
          "/account/", // Block user account pages
          "/checkout/", // Block checkout pages
          "/cart", // Block cart page
          "/auth/", // Block authentication pages
          "/studio/", // Block Sanity Studio
          "/_next/", // Block Next.js internal files
          "/test-supabase/", // Block test pages
          "/*.json$", // Block JSON files
        ],
      },
      {
        // Optimized rules for Googlebot (primary search engine for UK)
        userAgent: "Googlebot",
        allow: [
          "/",
          "/products",
          "/products/*",
          "/categories",
          "/about",
          "/contact",
          "/faq",
          "/terms",
          "/privacy",
          "/returns-policy",
          "/b2b-request",
        ],
        disallow: [
          "/api/",
          "/admin/",
          "/account/",
          "/checkout/",
          "/cart",
          "/auth/",
          "/studio/",
          "/_next/",
          "/test-supabase/",
          "/*.json$",
        ],
      },
      {
        // Rules for Bingbot (second most used in UK)
        userAgent: "Bingbot",
        allow: [
          "/",
          "/products",
          "/products/*",
          "/categories",
          "/about",
          "/contact",
          "/faq",
          "/b2b-request",
        ],
        disallow: [
          "/api/",
          "/admin/",
          "/account/",
          "/checkout/",
          "/cart",
          "/auth/",
          "/studio/",
          "/_next/",
          "/test-supabase/",
        ],
      },
    ],
    sitemap: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/sitemap-images.xml`,
    ],
    host: "ecodailysupplies.co.uk",
  };
}

