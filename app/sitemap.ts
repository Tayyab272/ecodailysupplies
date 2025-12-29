import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

/**
 * Dynamic Sitemap Generation for EcoDailySupplies UK
 * Generates sitemap.xml for all products, categories, and static pages
 * Optimized for Google Search Console indexing
 *
 * Best Practices:
 * - Only include pages that actually exist and return 200 status
 * - Use accurate lastModified dates where possible
 * - Priority is a hint, not a directive (Google may ignore it)
 * - Keep sitemap under 50,000 URLs and 50MB uncompressed
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://ecodailysupplies.com";
  const currentDate = new Date();

  // Static pages - only include pages that actually exist
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/products`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/categories`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/b2b-request`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/returns-policy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Fetch all active products from Sanity
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const products = await client.fetch<
      Array<{ slug: string; _updatedAt: string }>
    >(
      groq`*[_type == "product" && isActive == true] | order(name asc) {
        "slug": slug.current,
        _updatedAt
      }`,
      {},
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (products && products.length > 0) {
      productPages = products
        .filter((product) => product.slug) // Only include products with valid slugs
        .map((product) => ({
          url: `${siteUrl}/products/${product.slug}`,
          lastModified: product._updatedAt
            ? new Date(product._updatedAt)
            : currentDate,
          changeFrequency: "weekly" as const,
          priority: 0.8,
        }));
    }
  } catch (error) {
    console.error("Sitemap: Error fetching products:", error);
  }

  // Fetch all active categories from Sanity
  let categoryPages: MetadataRoute.Sitemap = [];
  try {
    const categories = await client.fetch<
      Array<{ slug: string; _updatedAt: string }>
    >(
      groq`*[_type == "category" && isActive == true] | order(sortOrder asc, name asc) {
        "slug": slug.current,
        _updatedAt
      }`,
      {},
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (categories && categories.length > 0) {
      categoryPages = categories
        .filter((category) => category.slug) // Only include categories with valid slugs
        .map((category) => ({
          url: `${siteUrl}/products?category=${category.slug}`,
          lastModified: category._updatedAt
            ? new Date(category._updatedAt)
            : currentDate,
          changeFrequency: "weekly" as const,
          priority: 0.7,
        }));
    }
  } catch (error) {
    console.error("Sitemap: Error fetching categories:", error);
  }

  // Combine all pages
  const allPages = [...staticPages, ...productPages, ...categoryPages];

  // Sort by priority (descending) for better organization
  allPages.sort((a, b) => (b.priority || 0) - (a.priority || 0));

  return allPages;
}
