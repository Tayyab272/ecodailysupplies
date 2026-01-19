import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Define a minimal Image type if needed, or import from the correct Sanity schema types package
export type Image = {
  asset: {
    _ref: string;
    _type: string;
  };
  _type: "image";
  [key: string]: unknown;
};

import { dataset, projectId } from "../env";

// Single builder instance
const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImageSource) => builder.image(source);

/**
 * Build optimized Sanity image URL with automatic format selection
 *
 * @param src - Sanity image source
 * @param opts - Image options (width, height, quality)
 * @returns Optimized image URL with auto format (WebP/AVIF)
 *
 * Core Web Vitals Optimization:
 * - Uses auto format to serve WebP/AVIF based on browser support
 * - Proper sizing to avoid CLS (Cumulative Layout Shift)
 * - Quality optimization for LCP (Largest Contentful Paint)
 */
export function buildSanityImage(
  src: Image,
  opts?: { width?: number; height?: number; quality?: number; format?: "webp" | "jpg" | "png" | "auto" }
) {
  const { width = 800, height, quality = 80, format = "auto" } = opts || {};
  let url = urlFor(src).width(width).fit("max").quality(quality);
  if (height) url = url.height(height);
  // Use auto format for optimal browser-based format selection (WebP/AVIF)
  if (format === "auto") {
    url = url.auto("format");
  } else {
    url = url.format(format);
  }
  return url.url();
}

/**
 * Generate blur placeholder data URL for progressive image loading
 * Improves perceived performance and prevents CLS
 */
export function getBlurDataURL(src: Image) {
  return urlFor(src).width(24).height(24).blur(50).quality(30).auto("format").url();
}

/**
 * Image presets optimized for Core Web Vitals (LCP, CLS)
 *
 * All presets use:
 * - auto("format") for WebP/AVIF based on browser support
 * - Appropriate quality settings for size/quality balance
 * - Fixed dimensions to prevent CLS
 */
export const imagePresets = {
  /** Product card images - 400x400 for consistent grid layout */
  card: (source: SanityImageSource) =>
    urlFor(source).width(400).height(400).fit("crop").quality(80).auto("format"),

  /** Small thumbnails - 100x100 for quick loading */
  thumbnail: (source: SanityImageSource) =>
    urlFor(source).width(100).height(100).fit("crop").quality(70).auto("format"),

  /** Product gallery images - 800x800 for detail view */
  gallery: (source: SanityImageSource) =>
    urlFor(source).width(800).height(800).fit("crop").quality(85).auto("format"),

  /** Full-size gallery - 1200x1200 for lightbox/zoom */
  galleryFull: (source: SanityImageSource) =>
    urlFor(source).width(1200).height(1200).fit("crop").quality(90).auto("format"),

  /** Hero banner images - 1200x600 for above-the-fold */
  hero: (source: SanityImageSource) =>
    urlFor(source).width(1200).height(600).fit("crop").quality(90).auto("format"),

  /** Category images - 600x400 for category grid */
  category: (source: SanityImageSource) =>
    urlFor(source).width(600).height(400).fit("crop").quality(85).auto("format"),

  /** SEO/Open Graph images - 1200x630 for social sharing */
  seo: (source: SanityImageSource) =>
    urlFor(source).width(1200).height(630).fit("crop").quality(90).auto("format"),

  /** Mobile-optimized card - 200x200 for faster mobile loading */
  cardMobile: (source: SanityImageSource) =>
    urlFor(source).width(200).height(200).fit("crop").quality(75).auto("format"),

  /** LCP-optimized hero - High priority above-the-fold image */
  heroLCP: (source: SanityImageSource) =>
    urlFor(source).width(1920).height(800).fit("crop").quality(85).auto("format"),
};

/**
 * Generate responsive image URLs with srcSet for optimal loading
 *
 * @param source - Sanity image source
 * @param sizes - Array of widths for srcSet (default: [400, 800, 1200, 1600])
 * @returns Object with src and srcSet for responsive images
 *
 * Usage in Next.js Image component or native img:
 * ```tsx
 * const { src, srcSet } = getResponsiveImageUrls(image);
 * <img src={src} srcSet={srcSet} sizes="(max-width: 768px) 100vw, 50vw" />
 * ```
 */
export const getResponsiveImageUrls = (
  source: SanityImageSource,
  sizes: number[] = [400, 800, 1200, 1600]
) => {
  if (!source) return { src: "", srcSet: "", sizes: "" };
  const baseUrl = urlFor(source);

  return {
    src: baseUrl.width(sizes[1] || 800).quality(80).auto("format").url(),
    srcSet: sizes
      .map((size) => `${baseUrl.width(size).quality(80).auto("format").url()} ${size}w`)
      .join(", "),
    // Default sizes attribute for common layouts
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  };
};

/**
 * Get image dimensions from Sanity asset metadata
 * Useful for preventing CLS by setting width/height attributes
 */
export function getImageDimensions(source: SanityImageSource & { asset?: { metadata?: { dimensions?: { width: number; height: number } } } }) {
  const dimensions = source?.asset?.metadata?.dimensions;
  return {
    width: dimensions?.width || 800,
    height: dimensions?.height || 800,
    aspectRatio: dimensions ? dimensions.width / dimensions.height : 1,
  };
}

/**
 * Generate placeholder color from image for skeleton loading
 * Uses Sanity's palette extraction if available
 */
export function getPlaceholderColor(source: SanityImageSource & { asset?: { metadata?: { palette?: { dominant?: { background?: string } } } } }) {
  return source?.asset?.metadata?.palette?.dominant?.background || "#f3f4f6";
}