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

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ecodailysupplies.com";

export const metadata: Metadata = {
  title: "FAQ - Packaging Supplies Questions Answered | EcoDailySupplies UK",
  description:
    "Get answers to common questions about UK packaging supplies, next-day delivery, returns policy, wholesale orders, and eco-friendly materials. EcoDailySupplies help centre.",
  keywords: [
    "packaging supplies FAQ UK",
    "bubble wrap shipping questions",
    "wholesale packaging questions",
    "eco-friendly packaging FAQ",
    "UK delivery questions",
    "packaging returns policy",
  ],
  openGraph: {
    title: "FAQ - Packaging Supplies Questions Answered | EcoDailySupplies UK",
    description:
      "Get answers to common questions about UK packaging supplies, next-day delivery, returns, and wholesale orders.",
    url: `${siteUrl}/faq`,
    siteName: "EcoDailySupplies",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "FAQ - Packaging Supplies Questions | EcoDailySupplies UK",
    description: "Get answers to common questions about UK packaging supplies and delivery.",
  },
  alternates: {
    canonical: `${siteUrl}/faq`,
  },
};

const faqData = [
  {
    category: "UK Delivery & Shipping",
    questions: [
      {
        question: "What are your UK delivery options?",
        answer:
          "We offer free standard UK delivery (2-3 business days) on orders over £50. Next-day delivery is available across mainland Britain for orders placed before 2pm. Express same-day delivery is available in select areas including Manchester, Birmingham, and London.",
      },
      {
        question: "Do you deliver across the whole UK?",
        answer:
          "Yes! We deliver to all UK mainland addresses including Scotland, Wales, and England. We also ship to Northern Ireland, the Channel Islands, and Isle of Man with slightly longer delivery times. Highlands and Islands deliveries may take an extra 1-2 days.",
      },
      {
        question: "Can I track my packaging order?",
        answer:
          "Absolutely! Once your order is dispatched from our Blackburn warehouse, you'll receive a tracking number via email and SMS. You can track your delivery in real-time through our website or the courier's app.",
      },
      {
        question: "What is your returns policy?",
        answer:
          "We offer a 30-day money-back guarantee on all unopened packaging supplies. Simply contact our UK support team to arrange a free collection. Custom printed products are non-returnable. Full refunds are processed within 5-7 business days.",
      },
    ],
  },
  {
    category: "Pricing & Wholesale Discounts",
    questions: [
      {
        question: "How does bulk pricing work?",
        answer:
          "Our automatic bulk pricing applies discounts based on quantity ordered. As you increase quantity, the price per unit decreases—you'll see the savings on each product page. Bulk discounts are applied automatically at checkout, no code needed.",
      },
      {
        question: "Do you offer wholesale pricing for businesses?",
        answer:
          "Yes! For orders over 500 units or £500, we offer additional wholesale discounts up to 25% off. UK businesses can request a custom quote through our B2B request form. We supply packaging to thousands of UK e-commerce businesses, retailers, and warehouses.",
      },
      {
        question: "Do you offer trade accounts?",
        answer:
          "We welcome trade customers! UK businesses can apply for a trade account to receive preferential pricing, dedicated account management, and flexible payment terms. Contact our B2B team at sales@ecodailysupplies.com for more information.",
      },
      {
        question: "Are prices shown inclusive of VAT?",
        answer:
          "All prices displayed on our website include VAT at the current UK rate. VAT invoices are provided with every order. For VAT-exempt orders or exports, please contact our team.",
      },
    ],
  },
  {
    category: "Products & Eco-Friendly Materials",
    questions: [
      {
        question: "What packaging materials do you supply?",
        answer:
          "We supply a complete range of packaging materials including cardboard boxes (single and double wall), bubble wrap, packing peanuts, void fill, tape, mailing bags, stretch wrap, and protective foam. All products are sourced from trusted UK and European manufacturers.",
      },
      {
        question: "Are your products eco-friendly?",
        answer:
          "Sustainability is at our core! We offer recyclable cardboard boxes, biodegradable bubble wrap, compostable mailing bags, and FSC-certified paper products. Our eco-friendly range uses recycled materials and is designed to minimise environmental impact without compromising protection.",
      },
      {
        question: "Can I order custom printed packaging?",
        answer:
          "Yes, we offer custom printed boxes, tape, and mailing bags with your logo and branding. Minimum order quantities apply. Custom orders typically take 2-3 weeks to produce. Request a quote through our contact form.",
      },
      {
        question: "What box sizes do you stock?",
        answer:
          "We stock over 50 standard box sizes from small postal boxes (152x152x152mm) to large removal boxes (610x457x457mm). Each product page shows all available dimensions. Need a specific size? Contact us for custom sizing options.",
      },
    ],
  },
  {
    category: "Account & UK Support",
    questions: [
      {
        question: "Do I need to create an account to order?",
        answer:
          "No account required! You can checkout as a guest for quick ordering. However, creating a free account lets you track orders, save delivery addresses, view order history, and reorder with one click.",
      },
      {
        question: "How can I contact your UK support team?",
        answer:
          "Our friendly UK-based team is here to help! Call us on 07397 057703 (Mon-Fri, 9am-5pm), email sales@ecodailysupplies.com, or use our contact form. We typically respond to emails within 2 hours during business hours.",
      },
      {
        question: "Can I cancel or modify my order?",
        answer:
          "Orders can be modified or cancelled within 1 hour of placement. After that, orders are processed for dispatch and cannot be changed. Contact our support team immediately if you need to make changes—we'll do our best to help.",
      },
      {
        question: "Where are you located?",
        answer:
          "EcoDailySupplies is based in Blackburn, Lancashire (BB1 5QF). Our central UK location means fast delivery across Britain. We're proud to be a British business supporting UK jobs and the local economy.",
      },
    ],
  },
];

// Generate FAQ structured data for Google Rich Results
function generateFAQStructuredData() {
  const allQuestions = faqData.flatMap((category) =>
    category.questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    }))
  );

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allQuestions,
  };
}

export default function FAQPage() {
  const faqStructuredData = generateFAQStructuredData();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* FAQ Structured Data for Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

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
