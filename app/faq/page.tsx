import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/common";
import Link from "next/link";
import { ArrowRight, ArrowLeft, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://bubblewrapshop.co.uk";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions | Bubble Wrap Shop",
  description:
    "Find answers to common questions about our packaging supplies, shipping, returns, bulk orders, and more. Get help with your packaging needs at Bubble Wrap Shop.",
  openGraph: {
    title: "FAQ - Frequently Asked Questions | Bubble Wrap Shop",
    description:
      "Find answers to common questions about our packaging supplies, shipping, returns, bulk orders, and more.",
    url: `${siteUrl}/faq`,
  },
  alternates: {
    canonical: `${siteUrl}/faq`,
  },
};

const faqData = [
  {
    category: "Ordering & Shipping",
    questions: [
      {
        question: "What are your shipping options?",
        answer:
          "We offer standard shipping (3-5 business days) and express shipping (1-2 business days). Orders over £100 qualify for free standard shipping. Express shipping is available for an additional fee.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Currently, we ship within the United States and Canada. International shipping options are being evaluated for future expansion.",
      },
      {
        question: "Can I track my order?",
        answer:
          "Yes! Once your order ships, you'll receive a tracking number via email. You can also track your order status in your account dashboard.",
      },
      {
        question: "What is your return policy?",
        answer:
          "We accept returns within 30 days of purchase for unopened items in original packaging. Custom printed products are non-returnable. Please contact our support team to initiate a return.",
      },
    ],
  },
  {
    category: "Pricing & Discounts",
    questions: [
      {
        question: "How does bulk pricing work?",
        answer:
          "Our automatic bulk pricing applies discounts based on quantity ordered. As you increase quantity, the price per unit decreases. You can see pricing tiers on each product page, and the discount is automatically applied at checkout.",
      },
      {
        question: "Are there volume discounts for large orders?",
        answer:
          "Yes! For orders over 500 units, we offer additional volume discounts. Please contact our sales team for a custom quote on large orders.",
      },
      {
        question: "Do you offer business accounts?",
        answer:
          "We automatically handle both B2B and B2C pricing. Bulk discounts apply automatically based on quantity—no separate business account needed. Larger orders automatically receive better pricing.",
      },
    ],
  },
  {
    category: "Products & Quality",
    questions: [
      {
        question: "What materials do you use?",
        answer:
          "We use high-quality corrugated cardboard, eco-friendly bubble wrap, recycled materials, and FSC-certified products. All our packaging meets industry standards for protection and durability.",
      },
      {
        question: "Do you offer eco-friendly options?",
        answer:
          "Yes! We have a dedicated eco-friendly product line featuring recyclable materials, biodegradable options, and compostable packaging. Look for the eco-friendly badge on product pages.",
      },
      {
        question: "Can products be customized?",
        answer:
          "Yes, we offer custom printing on boxes and mailers. Custom orders typically take 2-3 weeks to produce. Contact our support team for custom quote requests.",
      },
      {
        question: "What sizes are available?",
        answer:
          "We offer a wide range of sizes across all product categories. Each product page shows available size variants. If you need a specific size not listed, please contact us.",
      },
    ],
  },
  {
    category: "Account & Support",
    questions: [
      {
        question: "Do I need to create an account to order?",
        answer:
          "No! You can check out as a guest. However, creating an account allows you to track orders, save addresses, and download invoices for easier reordering.",
      },
      {
        question: "How can I contact customer support?",
        answer:
          "You can reach us via email at support@volle.com, phone at 1-800-BUBBLE-WRAP, or through our contact form. Our support team is available Monday-Friday, 9 AM - 6 PM EST.",
      },
      {
        question: "Can I cancel or modify my order?",
        answer:
          "Orders can be modified or cancelled within 2 hours of placement. After that, orders enter the fulfillment process and cannot be changed. Please contact support immediately if you need to cancel.",
      },
      {
        question: "How do I download an invoice?",
        answer:
          "Registered users can download invoices from their account dashboard under Order History. Guest orders receive invoices via email.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] py-5">
          <Breadcrumbs items={[{ label: "FAQ", href: "/faq" }]} />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] py-10 sm:py-12">
        <div className="mx-auto max-w-4xl">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2.5} />
              Back to home
            </Link>
          </div>

          {/* Page Header */}
          <div className="mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary border border-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="h-3.5 w-3.5" strokeWidth={2.5} />
              Help Center
            </div>
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
              Frequently asked questions
            </h1>
            <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl">
              Quick answers about shipping, returns, bulk pricing, and account
              support.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-6 sm:space-y-8">
            {faqData.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-gray-200"
              >
                <h2 className="mb-5 sm:mb-6 text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`${categoryIndex}-${faqIndex}`}
                      className="border-b border-gray-200 last:border-0"
                    >
                      <AccordionTrigger className="py-4 text-left text-base font-semibold text-gray-900 hover:text-gray-900 data-[state=open]:text-gray-900">
                        <span className="pr-4">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-5 pt-1">
                        <p className="text-sm sm:text-base leading-relaxed text-gray-600">
                          {faq.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 sm:mt-12">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                    Still have questions?
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Contact our team and we&apos;ll help you choose the right
                    packaging.
                  </p>
                </div>
                <Button asChild className="rounded-full bg-gray-900 hover:bg-black">
                  <Link href="/contact" className="inline-flex items-center gap-2">
                    Contact us
                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
