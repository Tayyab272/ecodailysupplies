import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL || "https://ecodailysupplies.com";

/**
 * Contact Page Metadata - SEO Optimized for UK Local Search
 * Targets: "packaging supplier contact", "packaging company Blackburn"
 * Includes local business signals for Google UK rankings
 */
export const metadata: Metadata = {
  title: "Contact EcoDailySupplies: UK Wholesale Eco Packaging",
  description:
    "Get in touch with EcoDailySupplies for enquiries about eco packaging, paper products, cleaning supplies, safety supplies and wholesale requests. Fast UK support.",
  keywords: [
    "contact eco supplies UK",
    "contact packaging supplier UK",
    "packaging company Blackburn",
    "Lancashire packaging supplier",
    "wholesale packaging enquiry",
    "bulk packaging order UK",
    "eco-friendly packaging contact",
  ],
  openGraph: {
    title: "Contact EcoDailySupplies | UK Packaging Supplier",
    description:
      "Get in touch for eco-friendly packaging supplies. Call 07397 057703 or email us. Blackburn-based, serving all of UK. Free quotes available.",
    url: `${siteUrl}/contact`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact EcoDailySupplies | UK Packaging",
    description:
      "Contact us for packaging supplies UK. Call 07397 057703. Based in Blackburn, Lancashire.",
  },
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
