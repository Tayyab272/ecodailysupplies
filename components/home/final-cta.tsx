import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://pub-20f982007aa54df4849bcd969b89a1bf.r2.dev/bubble_banner_video.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Ready to Upgrade Your
            <span className="block text-zinc-900 mt-2">Packaging Game?</span>
          </h2>

          <p className="text-lg md:text-xl text-white mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            Join thousands of businesses who trust us for their shipping
            supplies. From startups to enterprise, we have the quality and scale
            you need.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              className="h-auto px-8! py-4 bg-black text-white hover:bg-zinc-800 rounded-full text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl border border-transparent"
            >
              <Link href="/products">
                Shop All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-auto px-8 py-4 bg-white text-black border-2 border-white hover:bg-transparent hover:text-white rounded-full text-lg font-bold transition-all duration-300"
            >
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>

          <p className="mt-8 text-sm text-white/90 font-medium">
            Free shipping on orders over £50 • Next day delivery available
          </p>
        </div>
      </div>
    </section>
  );
}
