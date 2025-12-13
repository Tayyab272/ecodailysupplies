import { Breadcrumbs } from "@/components/common";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] py-5">
          <Breadcrumbs
            items={[{ label: "Refund Policy", href: "/refund-policy" }]}
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] py-10 sm:py-12">
        <div className="mx-auto max-w-4xl">
          {/* Page Header */}
          <div className="mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary border border-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.5} />
              Returns & refunds
            </div>
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
              Refund policy
            </h1>
            <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl">
              Our commitment to your satisfaction — clear, fair, and transparent
              returns.
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-6 sm:space-y-8">
            {/* Refund Policy Section */}
            <section className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-gray-200">
              <h2 className="mb-5 text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                Refund policy
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-600 md:text-lg">
                <p>
                  We have a 14-day return policy, which means you have 30 days
                  after receiving your item to request a return.
                </p>
                <p>
                  To be eligible for a return, your item must be in the same
                  condition that you received it, unworn or unused, with tags,
                  and in its original packaging. You&apos;ll also need the
                  receipt or proof of purchase.
                </p>
                <p>
                  To start a return, you can contact us at{" "}
                  <a
                    href="mailto:sales@bubblewrapshop.co.uk"
                    className="text-primary underline hover:text-primary/80 font-medium"
                  >
                    sales@bubblewrapshop.co.uk
                  </a>
                  . Please note that returns will need to be sent to the
                  following address:{" "}
                  <strong className="text-gray-900">
                    Unit BR16 Blakewater Road, Blackburn, England, BB1 5QF
                  </strong>
                </p>
                <p>
                  If your return is accepted, we&apos;ll send you a return
                  shipping label, as well as instructions on how and where to
                  send your package. Items sent back to us without first
                  requesting a return will not be accepted.
                </p>
                <p>
                  You can always contact us for any return question at{" "}
                  <a
                    href="mailto:sales@bubblewrapshop.co.uk"
                    className="text-primary underline hover:text-primary/80 font-medium"
                  >
                    sales@bubblewrapshop.co.uk
                  </a>
                  .
                </p>
              </div>
            </section>

            {/* Damages and Issues Section */}
            <section className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-gray-200">
              <h2 className="mb-5 text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                Damages and issues
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-600 md:text-lg">
                <p>
                  Please inspect your order upon reception and contact us
                  immediately if the item is defective, damaged or if you
                  receive the wrong item, so that we can evaluate the issue and
                  make it right.
                </p>
              </div>
            </section>

            {/* Exceptions Section */}
            <section className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-gray-200">
              <h2 className="mb-5 text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                Exceptions / non-returnable items
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-600 md:text-lg">
                <p>
                  Certain types of items cannot be returned, like perishable
                  goods (such as food, flowers, or plants), custom products
                  (such as special orders or personalized items), and personal
                  care goods (such as beauty products). We also do not accept
                  returns for hazardous materials, flammable liquids, or gases.
                  Please get in touch if you have questions or concerns about
                  your specific item.
                </p>
                <p>
                  Unfortunately, we cannot accept returns on sale items or gift
                  cards.
                </p>
              </div>
            </section>

            {/* Exchanges Section */}
            <section className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-gray-200">
              <h2 className="mb-5 text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                Exchanges
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-600 md:text-lg">
                <p>
                  The fastest way to ensure you get what you want is to return
                  the item you have, and once the return is accepted, make a
                  separate purchase for the new item.
                </p>
              </div>
            </section>

            {/* European Union Section */}
            <section className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-gray-200">
              <h2 className="mb-5 text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                European Union 14 day cooling off period
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-600 md:text-lg">
                <p>
                  Notwithstanding the above, if the merchandise is being shipped
                  into the European Union, you have the right to cancel or
                  return your order within 14 days, for any reason and without a
                  justification. As above, your item must be in the same
                  condition that you received it, unworn or unused, with tags,
                  and in its original packaging. You&apos;ll also need the
                  receipt or proof of purchase.
                </p>
              </div>
            </section>

            {/* Refunds Section */}
            <section className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-gray-200">
              <h2 className="mb-5 text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                Refunds
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-600 md:text-lg">
                <p>
                  We will notify you once we&apos;ve received and inspected your
                  return, and let you know if the refund was approved or not. If
                  approved, you&apos;ll be automatically refunded on your
                  original payment method within 10 business days. Please
                  remember it can take some time for your bank or credit card
                  company to process and post the refund too.
                </p>
                <p>
                  If more than 15 business days have passed since we&apos;ve
                  approved your return, please contact us at{" "}
                  <a
                    href="mailto:sales@bubblewrapshop.co.uk"
                    className="text-primary underline hover:text-primary/80 font-medium"
                  >
                    sales@bubblewrapshop.co.uk
                  </a>
                  .
                </p>
              </div>
            </section>
          </div>

          {/* CTA */}
          <div className="mt-10 sm:mt-12">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                    Need help with a return or refund?
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Our support team is ready to assist with returns, refunds, or
                    exchanges.
                  </p>
                </div>
                <Button asChild className="rounded-full bg-gray-900 hover:bg-black">
                  <Link href="/contact" className="inline-flex items-center gap-2">
                    Contact support
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
