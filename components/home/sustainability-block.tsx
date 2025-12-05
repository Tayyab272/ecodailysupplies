import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Box, Gem, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SustainabilityBlock() {
  return (
    <section className="py-24 bg-primary text-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Section */}
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight leading-tight">
              Elevate Your <br />
              <span className="text-zinc-900">Unboxing Experience</span>
            </h2>

            <p className="text-lg text-zinc-900 mb-12 leading-relaxed max-w-xl">
              Packaging is the first physical touchpoint with your customer. Make it count with our premium, durable, and aesthetically pleasing solutions designed to protect and impress.
            </p>

            <div className="grid sm:grid-cols-2 gap-8 mb-12">
              <div className="flex flex-col gap-3">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Gem className="h-6 w-6 text-white/80" />
                </div>
                <h3 className="text-xl font-bold">Premium Quality</h3>
                <p className="text-sm text-zinc-900">
                  Industrial-grade materials that ensure your products arrive safely and stylishly.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Box className="h-6 w-6 text-white/80" />
                </div>
                <h3 className="text-xl font-bold">Custom Solutions</h3>
                <p className="text-sm text-zinc-900">
                  Tailored packaging options to fit your brand's unique identity and requirements.
                </p>
              </div>
            </div>

            <Button asChild className="bg-white text-black hover:bg-zinc-300 rounded-full px-8 py-6 text-lg font-bold transition-all duration-300">
              <Link href="/products">
                Shop Premium Packaging
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Image Section */}
          <div className="order-1 lg:order-2 relative h-[500px] lg:h-[700px] w-full">
            <div className="absolute inset-0 bg-gray-900 rounded-2xl overflow-hidden">
              {/* Placeholder for a premium packaging image - Using a dark/abstract one or a box image */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-50 z-10" />
              <Image
                src="https://images.unsplash.com/photo-1605647540924-852290f6b0d5?q=80&w=2000&auto=format&fit=crop"
                alt="Premium Packaging"
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
