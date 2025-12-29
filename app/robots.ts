import { MetadataRoute } from "next";

/**
 * Robots.txt Configuration for EcoDailySupplies
 * Controls search engine crawling and indexing
 *
 * Best Practices:
 * - Keep rules simple and clear
 * - Don't over-specify allowed paths (they're allowed by default)
 * - Block sensitive/private areas
 * - Single sitemap reference is sufficient
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://ecodailysupplies.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
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
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
