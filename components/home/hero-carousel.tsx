"use client";
import { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Truck,
  ShieldCheck,
  Leaf,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Banner {
  id: string;
  title?: string;
  description?: string;
  mediaType?: "image" | "video";
  image?: string;
  alt?: string;
  video?: string;
  videoPoster?: string;
  videoSettings?: {
    autoplay: boolean;
    loop: boolean;
    muted: boolean;
    showControls: boolean;
  };
  ctaButton?: {
    text?: string;
    link?: string;
  };
}

interface HeroCarouselProps {
  banners: Banner[];
}

export function HeroCarousel({ banners }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    if (!banners || banners.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  }, [banners]);

  const prevSlide = () => {
    if (!banners || banners.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (!banners || banners.length === 0 || !isAutoPlaying) return;
    const interval = setInterval(nextSlide, 3000); // Fast interval (3s)
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, banners]);

  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full flex flex-col">
      {/* Main Carousel Area */}
      <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden ">
        <div
          className="relative w-full h-full"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }} // Fast transition (0.3s)
            >
              {/* Background Media */}
              <div className="absolute inset-0 w-full h-full">
                {banners[currentSlide].mediaType === "video" &&
                  banners[currentSlide].video ? (
                  <video
                    src={banners[currentSlide].video}
                    poster={banners[currentSlide].videoPoster}
                    autoPlay={
                      banners[currentSlide].videoSettings?.autoplay !== false
                    }
                    loop={banners[currentSlide].videoSettings?.loop !== false}
                    muted={banners[currentSlide].videoSettings?.muted !== false}
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={banners[currentSlide].image || ""}
                    alt={
                      banners[currentSlide].alt || `Banner ${currentSlide + 1}`
                    }
                    fill
                    className="object-contain"
                    priority
                  />
                )}
                {/* Professional Gradient Overlay - Centered Focus */}
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Content Overlay - Centered */}
              <div className="absolute inset-0 flex items-center justify-center px-6 sm:px-12 lg:px-24">
                <div className="max-w-4xl w-full text-center">
                  {banners[currentSlide].title && (
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }} // Fast text entrance
                      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary mb-6 leading-tight tracking-tight uppercase drop-shadow-lg"
                    >
                      {banners[currentSlide].title}
                    </motion.h2>
                  )}
                  {banners[currentSlide].description && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.15 }} // Fast text entrance
                      className="text-lg sm:text-xl text-white font-medium mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md"
                    >
                      {banners[currentSlide].description}
                    </motion.p>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }} // Fast button entrance
                  >
                    {banners[currentSlide].ctaButton?.text &&
                      banners[currentSlide].ctaButton?.link ? (
                      <Link
                        href={banners[currentSlide].ctaButton.link}
                        className="inline-flex items-center justify-center px-10 py-4 bg-primary text-white font-bold text-lg rounded-md hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-lg group"
                      >
                        {banners[currentSlide].ctaButton.text}
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    ) : (
                      <Link
                        href={"/products"}
                        className="inline-flex items-center justify-center px-10 py-4 bg-primary text-white font-bold text-lg rounded-md hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-lg group"
                      >
                        Shop Now
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows - Left and Right Sides */}
          {banners.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 h-12 w-12 md:h-14 md:w-14 rounded-full border border-white/30 bg-black/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 z-20 touch-manipulation min-h-[44px] min-w-[44px]"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 h-12 w-12 md:h-14 md:w-14 rounded-full border border-white/30 bg-black/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 z-20 touch-manipulation min-h-[44px] min-w-[44px]"
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6 md:h-7 md:w-7" />
              </button>
            </>
          )}

          {/* Progress Indicators - Simple Dots */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="group py-2"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${index === currentSlide
                      ? "bg-white scale-125"
                      : "bg-white/40 hover:bg-white/60"
                    }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Bar - Professional & Clean */}
      <div className="w-full bg-primary border-b border-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div className="flex items-center justify-center gap-4 py-2">
              <div className="p-3 rounded-full bg-primary/5 text-white">
                <Truck className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                  Fast Delivery
                </h3>
                <p className="text-sm text-gray-100">
                  Free shipping on orders over $50
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 py-2">
              <div className="p-3 rounded-full bg-primary/5 text-white">
                <ShieldCheck className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                  Quality Guarantee
                </h3>
                <p className="text-sm text-gray-100">
                  30-day money back guarantee
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 py-2">
              <div className="p-3 rounded-full bg-primary/5 text-white">
                <Leaf className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                  Eco-Friendly
                </h3>
                <p className="text-sm text-gray-100">
                  100% sustainable materials
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
