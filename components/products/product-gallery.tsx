"use client";
import { useState } from "react";
import Image from "next/image";
import { ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  imagesAlt?: string[];
  mainImageAlt?: string;
}

export function ProductGallery({
  images,
  productName,
  imagesAlt,
  mainImageAlt,
}: ProductGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const displayImages =
    images.length > 0
      ? images
      : [
          "https://images.unsplash.com/photo-1680034977375-3d83ee017e52?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=800",
        ];

  // Get alt text for current image
  const getImageAlt = (index: number): string => {
    if (index === 0 && mainImageAlt) {
      return mainImageAlt;
    }
    if (imagesAlt && imagesAlt[index]) {
      return imagesAlt[index];
    }
    return `${productName} - Image ${index + 1}`;
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  return (
    <div className="space-y-5 md:space-y-6">
      {/* Main Image Container - Premium Shopify Style */}
      <div className="relative group">
        {/* White background with subtle shadow */}
        <div className="relative aspect-square w-full overflow-hidden bg-white rounded-lg border border-gray-200 shadow-sm transition-all duration-500 group-hover:shadow-xl">
          <Image
            src={displayImages[selectedImageIndex]}
            alt={getImageAlt(selectedImageIndex)}
            fill
            className={`object-contain transition-transform duration-700 ease-out ${
              isZoomed ? "scale-150 cursor-zoom-out" : "group-hover:scale-110 cursor-zoom-in"
            }`}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={selectedImageIndex === 0}
            loading={selectedImageIndex === 0 ? "eager" : "lazy"}
            placeholder="empty"
            onClick={() => setIsZoomed(!isZoomed)}
          />
          
          {/* Zoom Indicator */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-primary/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-md flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
              <ZoomIn className="h-3.5 w-3.5" />
              Click to Zoom
            </div>
          </div>

          {/* Navigation Arrows - Premium Style */}
          {displayImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/95 backdrop-blur-sm border border-gray-200 text-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary shadow-lg z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/95 backdrop-blur-sm border border-gray-200 text-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary shadow-lg z-10"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Thumbnail Navigation - Premium Style */}
      {displayImages.length > 1 && (
        <div className="space-y-3">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1">
            {displayImages.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedImageIndex(index);
                  setIsZoomed(false);
                }}
                className={`relative aspect-square w-20 md:w-24 shrink-0 overflow-hidden rounded-lg transition-all duration-300 border-2 bg-white ${
                  index === selectedImageIndex
                    ? "border-primary shadow-lg scale-105 ring-2 ring-primary/20"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                }`}
                aria-label={`View ${getImageAlt(index)}`}
              >
                <Image
                  src={image}
                  alt={`${getImageAlt(index)} - Thumbnail`}
                  fill
                  className="object-contain"
                  sizes="96px"
                  placeholder="empty"
                  loading="lazy"
                  priority={false}
                />
                {/* Active Indicator - Primary Color Accent */}
                {index === selectedImageIndex && (
                  <div className="absolute inset-0 border-2 border-primary pointer-events-none" />
                )}
              </button>
            ))}
          </div>

          {/* Image Counter - Premium Style */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider px-3">
              {selectedImageIndex + 1} / {displayImages.length}
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>
        </div>
      )}
    </div>
  );
}
