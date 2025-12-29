import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Recycle, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Sustainability Block - SEO-Optimized Content Section
 * Targets: "sustainable packaging UK", "eco-friendly packaging", "biodegradable packaging"
 * Provides E-E-A-T signals and keyword-rich content
 */
export function SustainabilityBlock() {
  return (
    <section
      className="py-24 bg-primary text-white overflow-hidden"
      aria-labelledby="sustainability-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Section - SEO Optimized */}
          <div className="order-2 lg:order-1">
            <h2
              id="sustainability-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight leading-tight"
            >
              Sustainable Packaging <br />
              <span className="text-zinc-900">for UK Businesses</span>
            </h2>

            <p className="text-lg text-zinc-900 mb-12 leading-relaxed max-w-xl">
              Join thousands of UK businesses choosing eco-friendly packaging solutions. Our 100% recyclable
              and biodegradable packaging materials help reduce your carbon footprint whilst protecting
              your products. Made from sustainable sources, delivered carbon-neutral across Britain.
            </p>

            <div className="grid sm:grid-cols-2 gap-8 mb-12">
              <div className="flex flex-col gap-3">
                <div className="h-12 w-12 rounded-full bg-zinc-900/10 flex items-center justify-center">
                  <Recycle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">100% Recyclable Materials</h3>
                <p className="text-sm text-zinc-900">
                  All our cardboard boxes and paper packaging are fully recyclable. FSC-certified
                  and sourced from responsibly managed forests across Europe.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="h-12 w-12 rounded-full bg-zinc-900/10 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Biodegradable Options</h3>
                <p className="text-sm text-zinc-900">
                  Choose from our range of compostable packaging, biodegradable bubble wrap,
                  and plant-based packing materials that break down naturally.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="h-12 w-12 rounded-full bg-zinc-900/10 flex items-center justify-center">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">UK Quality Standards</h3>
                <p className="text-sm text-zinc-900">
                  Every product meets British packaging standards. Trusted by 10,000+ UK businesses
                  from small retailers to enterprise e-commerce brands.
                </p>
              </div>
            </div>

            <Button asChild className="bg-zinc-900 text-white hover:bg-zinc-800 rounded-full px-8! py-6 text-lg font-bold transition-all duration-300">
              <Link href="/products" title="Browse eco-friendly packaging supplies UK">
                Shop Sustainable Packaging
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Image Section */}
          <div className="order-1 lg:order-2 relative h-[500px] lg:h-[700px] w-full">
            <div className="absolute inset-0 bg-gray-900 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-50 z-10" />
              <Image
                src="https://pub-20f982007aa54df4849bcd969b89a1bf.r2.dev/eco-friendly.png"
                alt="Sustainable eco-friendly packaging supplies - recyclable boxes and biodegradable materials UK"
                fill
                className="object-cover opacity-80"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
