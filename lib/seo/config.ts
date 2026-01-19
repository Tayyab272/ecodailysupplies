/**
 * Default SEO Configuration for EcoDailySupplies
 *
 * Centralized SEO constants used throughout the application.
 * Provides consistent fallbacks when Sanity SEO fields are not set.
 */

export const DEFAULT_SEO_CONFIG = {
  // Brand & Site Identity
  siteName: "EcoDailySupplies",
  siteNameFull: "EcoDailySupplies - Eco-Friendly Packaging UK",
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || "https://ecodailysupplies.com",

  // Default Meta Tags
  defaultTitle:
    "Eco-Friendly Packaging Supplies UK | Sustainable Boxes & Bubble Wrap | EcoDailySupplies",
  titleTemplate: "%s | EcoDailySupplies - Eco Packaging UK",
  defaultDescription:
    "Buy eco-friendly packaging supplies in the UK. Shop sustainable bubble wrap, recyclable cardboard boxes, biodegradable packing materials & compostable packaging. Free UK delivery over £50. Wholesale prices available.",

  // Default Images
  defaultImage: "/og-image.webp",
  defaultImageAlt: "EcoDailySupplies - UK's Leading Eco-Friendly Packaging Supplier",
  logoUrl: "/logo.webp",
  logoWidth: 160,
  logoHeight: 50,

  // Social Media
  twitterHandle: "@ecodailysupplies",
  facebookUrl: "https://www.facebook.com/ecodailysupplies",
  instagramUrl: "https://www.instagram.com/ecodailysupplies",
  linkedinUrl: "https://www.linkedin.com/company/ecodailysupplies",

  // Locale & Region
  locale: "en_GB",
  language: "en-GB",
  country: "GB",
  countryName: "United Kingdom",
  currency: "GBP",

  // Business Information
  businessName: "EcoDailySupplies Ltd",
  email: "info@ecodailysupplies.com",
  phone: "+447397057703",
  address: {
    street: "Unit CW10, Challenge Way",
    city: "Blackburn",
    region: "Lancashire",
    postalCode: "BB1 5QF",
    country: "GB",
  },
  geo: {
    latitude: 53.75,
    longitude: -2.4833,
  },

  // Theme & Branding
  themeColor: "#10b981",
  backgroundColor: "#ffffff",

  // SEO Defaults
  defaultRobots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1 as const,
      "max-image-preview": "large" as const,
      "max-snippet": -1 as const,
    },
  },

  // Shipping Defaults (for structured data)
  shipping: {
    freeThreshold: 50,
    currency: "GBP",
    handlingDays: { min: 0, max: 1 },
    transitDays: { min: 1, max: 3 },
  },
} as const;

/**
 * Default keywords for the site
 * Used when page-specific keywords are not available
 */
export const DEFAULT_KEYWORDS = [
  "eco-friendly packaging UK",
  "sustainable packaging UK",
  "biodegradable packaging UK",
  "recyclable packaging supplies",
  "packaging supplies UK",
  "cardboard boxes UK",
  "bubble wrap UK",
  "wholesale packaging UK",
  "next day delivery packaging",
  "EcoDailySupplies",
] as const;

/**
 * Social media links for structured data
 */
export const SOCIAL_LINKS = [
  "https://www.facebook.com/ecodailysupplies",
  "https://www.instagram.com/ecodailysupplies",
  "https://twitter.com/ecodailysupplies",
  "https://www.linkedin.com/company/ecodailysupplies",
] as const;

export type SEOConfig = typeof DEFAULT_SEO_CONFIG;
