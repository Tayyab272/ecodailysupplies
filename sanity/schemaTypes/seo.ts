import { defineType, defineField } from "sanity";

/**
 * SEO Schema Object for Sanity CMS
 *
 * A comprehensive, reusable SEO object that can be embedded in any document type.
 * Designed for 2026 AI-driven search and traditional SERP optimization.
 *
 * Features:
 * - Meta title with character count validation (50-60 chars optimal)
 * - Meta description optimized for semantic relevance (150-160 chars)
 * - Open Graph image for social sharing
 * - Entity-based keywords (not just strings)
 * - Custom canonical URL override
 * - JSON field for custom Schema.org overrides
 * - noIndex/noFollow controls
 */
export const seo = defineType({
  name: "seo",
  title: "SEO Settings",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description:
        "SEO title for search engines. Optimal length: 50-60 characters. Leave blank to use default.",
      validation: (Rule) =>
        Rule.max(70).warning(
          "Meta titles over 60 characters may be truncated in search results"
        ),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description:
        "SEO description for search engines. Optimal length: 150-160 characters. Focus on user intent and semantic relevance.",
      validation: (Rule) =>
        Rule.max(170).warning(
          "Meta descriptions over 160 characters may be truncated in search results"
        ),
    }),
    defineField({
      name: "shareImage",
      title: "Share Image (Open Graph)",
      type: "image",
      description:
        "Image displayed when sharing on social media. Recommended: 1200x630px for optimal display across platforms.",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Describes the image for accessibility and SEO.",
        },
      ],
    }),
    defineField({
      name: "keywords",
      title: "SEO Keywords (Entities)",
      type: "array",
      of: [
        {
          type: "object",
          name: "keyword",
          title: "Keyword Entity",
          fields: [
            {
              name: "term",
              type: "string",
              title: "Keyword Term",
              description: "The keyword or phrase",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "relevance",
              type: "string",
              title: "Relevance",
              description: "How relevant is this keyword to the content?",
              options: {
                list: [
                  { title: "Primary", value: "primary" },
                  { title: "Secondary", value: "secondary" },
                  { title: "Related", value: "related" },
                ],
              },
              initialValue: "secondary",
            },
            {
              name: "entityType",
              type: "string",
              title: "Entity Type",
              description:
                "What type of entity is this? Helps AI search understand context.",
              options: {
                list: [
                  { title: "Product Type", value: "ProductType" },
                  { title: "Material", value: "Material" },
                  { title: "Brand", value: "Brand" },
                  { title: "Location", value: "Location" },
                  { title: "Feature", value: "Feature" },
                  { title: "Use Case", value: "UseCase" },
                  { title: "Industry", value: "Industry" },
                  { title: "Topic", value: "Topic" },
                ],
              },
            },
          ],
          preview: {
            select: {
              term: "term",
              relevance: "relevance",
              entityType: "entityType",
            },
            prepare({ term, relevance, entityType }) {
              return {
                title: term || "Unnamed keyword",
                subtitle: `${relevance || "secondary"} • ${entityType || "Topic"}`,
              };
            },
          },
        },
      ],
      description:
        "Entity-based keywords help AI search engines understand your content's topics and intent.",
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description:
        "Custom canonical URL override. Leave blank to use the page's default URL. Use this to prevent duplicate content issues.",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "structuredData",
      title: "Custom Structured Data (JSON-LD)",
      type: "text",
      rows: 10,
      description:
        "Custom Schema.org JSON-LD override. Must be valid JSON. This will be merged with auto-generated structured data.",
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value) return true;
          try {
            JSON.parse(value);
            return true;
          } catch {
            return "Must be valid JSON";
          }
        }),
    }),
    defineField({
      name: "noIndex",
      title: "No Index",
      type: "boolean",
      description:
        "Prevent search engines from indexing this page. Use sparingly.",
      initialValue: false,
    }),
    defineField({
      name: "noFollow",
      title: "No Follow",
      type: "boolean",
      description:
        "Prevent search engines from following links on this page. Use sparingly.",
      initialValue: false,
    }),
    defineField({
      name: "aiSummary",
      title: "AI Summary",
      type: "text",
      rows: 3,
      description:
        "A concise, factual summary (2-3 sentences) for AI search agents. Focus on: What is it? What's it made of? What's the primary use case? Keep under 300 characters.",
      validation: (Rule) =>
        Rule.max(300).warning(
          "Keep under 300 characters for optimal AI comprehension"
        ),
    }),
  ],
  options: {
    collapsible: true,
    collapsed: false,
  },
});

/**
 * FAQ Item Schema for FAQ structured data
 * Can be embedded in pages that have FAQ sections
 */
export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "object",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      description: "The frequently asked question",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 4,
      description: "The answer to the question",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "question",
      subtitle: "answer",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Untitled question",
        subtitle: subtitle
          ? subtitle.substring(0, 80) + (subtitle.length > 80 ? "..." : "")
          : "",
      };
    },
  },
});
