import { MetadataRoute } from "next";

/**
 * Robots.txt Configuration for EcoDailySupplies
 *
 * 2026 SEO Best Practices:
 * - Clear rules for all major crawlers including AI bots
 * - Specific rules for Google, Bing, and AI search agents
 * - Crawl-delay for responsible bot behavior
 * - Multiple sitemap references for better discovery
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://ecodailysupplies.com";

  return {
    rules: [
      {
        // Default rules for all bots
        userAgent: "*",
        allow: [
          "/",
          "/products",
          "/products/*",
          "/categories",
          "/about",
          "/contact",
          "/faq",
          "/b2b-request",
          "/terms",
          "/privacy",
          "/returns-policy",
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
          "/api/webhooks/",
        ],
      },
      {
        // Specific rules for Googlebot
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/account/",
          "/checkout/",
          "/cart",
          "/auth/",
          "/studio/",
        ],
      },
      {
        // Specific rules for Bingbot
        userAgent: "Bingbot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/account/",
          "/checkout/",
          "/cart",
          "/auth/",
          "/studio/",
        ],
      },
      {
        // AI Search Bots (GPTBot, Claude, Perplexity, etc.)
        // Allow them to index public content for AI-powered search
        // Crawl-delay ensures responsible bot behavior
        userAgent: "GPTBot",
        allow: ["/", "/products", "/products/*", "/about", "/faq"],
        disallow: ["/api/", "/admin/", "/account/", "/checkout/", "/cart", "/auth/"],
        crawlDelay: 2,
      },
      {
        userAgent: "Claude-Web",
        allow: ["/", "/products", "/products/*", "/about", "/faq"],
        disallow: ["/api/", "/admin/", "/account/", "/checkout/", "/cart", "/auth/"],
        crawlDelay: 2,
      },
      {
        userAgent: "PerplexityBot",
        allow: ["/", "/products", "/products/*", "/about", "/faq"],
        disallow: ["/api/", "/admin/", "/account/", "/checkout/", "/cart", "/auth/"],
        crawlDelay: 2,
      },
      {
        userAgent: "Amazonbot",
        allow: ["/", "/products", "/products/*"],
        disallow: ["/api/", "/admin/", "/account/", "/checkout/", "/cart", "/auth/"],
        crawlDelay: 2,
      },
      {
        // Google Extended - AI training data crawler
        userAgent: "Google-Extended",
        allow: ["/", "/products", "/products/*", "/about", "/faq"],
        disallow: ["/api/", "/admin/", "/account/", "/checkout/", "/cart", "/auth/"],
        crawlDelay: 2,
      },
      {
        // CCBot - Common Crawl bot used for AI training
        userAgent: "CCBot",
        allow: ["/", "/products", "/products/*", "/about", "/faq"],
        disallow: ["/api/", "/admin/", "/account/", "/checkout/", "/cart", "/auth/"],
        crawlDelay: 3,
      },
    ],
    sitemap: [
      `${siteUrl}/sitemap.xml`,
    ],
    host: siteUrl,
  };
}
