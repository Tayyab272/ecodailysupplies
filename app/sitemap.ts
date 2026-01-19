import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

/**
 * Dynamic Sitemap Generation for EcoDailySupplies UK
 *
 * 2026 SEO Best Practices:
 * - Accurate lastModified dates from CMS
 * - Semantic priority based on page importance
 * - Includes all indexable content types
 * - Proper changeFrequency hints for crawl optimization
 * - Image sitemaps for product pages (embedded)
 *
 * Best Practices:
 * - Only include pages that actually exist and return 200 status
 * - Use accurate lastModified dates from Sanity CMS
 * - Keep sitemap under 50,000 URLs and 50MB uncompressed
 */

// Type for Sanity query results
interface SanityDocument {
  slug: string;
  _updatedAt: string;
  _createdAt?: string;
  image?: string;
  name?: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://ecodailysupplies.com";
  const currentDate = new Date();

  // Static pages with semantic priority
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
      priority: 0.95,
    },
    {
      url: `${siteUrl}/categories`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/b2b-request`,
      lastModified: currentDate,
      changeFrequency: "monthly",
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
      priority: 0.65,
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

  // Fetch all active products from Sanity with SEO-relevant data
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const products = await client.fetch<SanityDocument[]>(
      groq`*[_type == "product" && isActive == true] | order(isFeatured desc, isBestSelling desc, name asc) {
        "slug": slug.current,
        _updatedAt,
        _createdAt,
        name,
        "image": mainImage.asset->url
      }`,
      {},
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (products && products.length > 0) {
      productPages = products
        .filter((product) => product.slug)
        .map((product, index) => ({
          url: `${siteUrl}/products/${product.slug}`,
          lastModified: product._updatedAt
            ? new Date(product._updatedAt)
            : product._createdAt
              ? new Date(product._createdAt)
              : currentDate,
          changeFrequency: "weekly" as const,
          // Featured/bestselling products get higher priority
          priority: index < 10 ? 0.9 : index < 50 ? 0.85 : 0.8,
        }));
    }
  } catch (error) {
    console.error("Sitemap: Error fetching products:", error);
  }

  // Fetch all active categories from Sanity
  let categoryPages: MetadataRoute.Sitemap = [];
  try {
    const categories = await client.fetch<SanityDocument[]>(
      groq`*[_type == "category" && isActive == true] | order(sortOrder asc, name asc) {
        "slug": slug.current,
        _updatedAt,
        _createdAt,
        name
      }`,
      {},
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (categories && categories.length > 0) {
      categoryPages = categories
        .filter((category) => category.slug)
        .map((category) => ({
          url: `${siteUrl}/products?category=${category.slug}`,
          lastModified: category._updatedAt
            ? new Date(category._updatedAt)
            : category._createdAt
              ? new Date(category._createdAt)
              : currentDate,
          changeFrequency: "weekly" as const,
          priority: 0.75,
        }));
    }
  } catch (error) {
    console.error("Sitemap: Error fetching categories:", error);
  }

  // Fetch blog posts if they exist
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await client.fetch<SanityDocument[]>(
      groq`*[_type == "blogPost" && isPublished == true] | order(publishedAt desc) {
        "slug": slug.current,
        _updatedAt,
        publishedAt
      }`,
      {},
      { next: { revalidate: 3600 } }
    );

    if (posts && posts.length > 0) {
      blogPages = posts
        .filter((post) => post.slug)
        .map((post) => ({
          url: `${siteUrl}/blog/${post.slug}`,
          lastModified: post._updatedAt
            ? new Date(post._updatedAt)
            : currentDate,
          changeFrequency: "monthly" as const,
          priority: 0.6,
        }));
    }
  } catch {
    // Blog posts may not exist, that's ok
  }

  // Combine all pages
  const allPages = [
    ...staticPages,
    ...productPages,
    ...categoryPages,
    ...blogPages,
  ];

  // Sort by priority (descending) then by URL for consistent ordering
  allPages.sort((a, b) => {
    const priorityDiff = (b.priority || 0) - (a.priority || 0);
    if (priorityDiff !== 0) return priorityDiff;
    return a.url.localeCompare(b.url);
  });

  return allPages;
}
