import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">
        <div className="grid lg:grid-cols-2 min-h-[500px] overflow-hidden">

          {/* Left Side - Content */}
          <div className="bg-primary flex flex-col justify-center p-12 md:p-16 lg:p-20 order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 tracking-tight leading-[1.1]">
              Ready to deliver exceptional service with <br />
              <span className="text-white">Bubble Wrap Shop?</span>
            </h2>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Button asChild className="bg-gray-900 text-white hover:bg-gray-800 rounded-full px-8 py-6 text-base font-bold transition-all duration-300 shadow-lg">
                <Link href="/products">
                  Shop All Products
                </Link>
              </Button>

              <Button asChild variant="outline" className="bg-transparent border-gray-900 text-gray-900 hover:bg-white hover:text-gray-900 hover:border-primary rounded-full px-8 py-6 text-base font-bold transition-all duration-300">
                <Link href="/contact">
                  Contact Sales
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Side - Image & Floating UI */}
          <div className="relative bg-gray-100 order-1 lg:order-2 h-[400px] lg:h-auto">
            <Image
              src="https://images.unsplash.com/photo-1758351507026-71ad3645cb43?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Business Packaging Team"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            {/* Floating Notification Card */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 lg:-translate-x-0 lg:left-12 lg:bottom-12 bg-white/10 backdrop-blur-md p-4 shadow-xl border border-white/50 flex items-center gap-4 max-w-sm w-[90%] lg:w-auto animate-in slide-in-from-bottom-4 duration-700 fade-in">
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Order #8834 Shipped</p>
                <p className="text-xs text-white/50">Next day delivery confirmed</p>
              </div>
              <div className="ml-auto">
                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                  Sent
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
