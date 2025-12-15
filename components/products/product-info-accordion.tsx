import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ProductInfoAccordionProps {
  description?: string;
  specifications?: Record<string, string>;
  delivery?: string;
}

export function ProductInfoAccordion({
  description,
  specifications,
  delivery,
}: ProductInfoAccordionProps) {
  const hasContent = description || specifications || delivery;

  if (!hasContent) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-gray-300 bg-white p-5 shadow-sm sm:p-6">
      <Accordion type="multiple" className="w-full">
        {description && (
          <AccordionItem
            value="description"
            className="border-b border-gray-300"
          >
            <AccordionTrigger className="py-5 text-sm font-bold uppercase tracking-wider text-gray-900 hover:text-primary transition-colors [&[data-state=open]]:text-primary [&[data-state=open]]:border-b [&[data-state=open]]:border-gray-300">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                Description
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6 pt-5">
              <p className="text-sm leading-relaxed text-gray-600 pl-5">
                {description}
              </p>
            </AccordionContent>
          </AccordionItem>
        )}

        {specifications && Object.keys(specifications).length > 0 && (
          <AccordionItem
            value="specifications"
            className="border-b border-gray-300"
          >
            <AccordionTrigger className="py-5 text-sm font-bold uppercase tracking-wider text-gray-900 hover:text-primary transition-colors [&[data-state=open]]:text-primary [&[data-state=open]]:border-b [&[data-state=open]]:border-gray-300">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                Specifications
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6 pt-5">
              <dl className="space-y-4 pl-5">
                {Object.entries(specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex flex-col sm:flex-row sm:justify-between gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                  >
                    <dt className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                      {key}
                    </dt>
                    <dd className="text-sm text-gray-600 sm:text-right font-medium">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </AccordionContent>
          </AccordionItem>
        )}

        {delivery && (
          <AccordionItem
            value="delivery"
            className="border-b border-gray-300 last:border-0"
          >
            <AccordionTrigger className="py-5 text-sm font-bold uppercase tracking-wider text-gray-900 hover:text-primary transition-colors [&[data-state=open]]:text-primary [&[data-state=open]]:border-b [&[data-state=open]]:border-gray-300">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                Shipping & Delivery
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6 pt-5">
              <div className="pl-5 space-y-5">
                <p className="text-sm leading-relaxed text-gray-600">
                  {delivery}
                </p>
                {/* Additional Shipping Info - Premium Style */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-300">
                  <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-300 hover:border-gray-300 transition-colors">
                    <div className="p-2 rounded-md bg-primary/10 shrink-0">
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">
                        Free Shipping
                      </p>
                      <p className="text-xs text-gray-600">
                        On orders over £100
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-300 hover:border-gray-300 transition-colors">
                    <div className="p-2 rounded-md bg-primary/10 shrink-0">
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">
                        Fast Delivery
                      </p>
                      <p className="text-xs text-gray-600">2-3 business days</p>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  );
}
