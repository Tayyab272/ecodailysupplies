// PERFORMANCE: Loading skeleton for ProductGallery dynamic import
export function ProductGallerySkeleton() {
  return (
    <div className="space-y-5 md:space-y-6 animate-pulse">
      {/* Main Image Skeleton */}
      <div className="aspect-square w-full bg-white rounded-lg border border-gray-200 shadow-sm" />
      
      {/* Thumbnail Skeletons */}
      <div className="space-y-3">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-square w-20 md:w-24 shrink-0 bg-white rounded-lg border-2 border-gray-200"
            />
          ))}
        </div>
        
        {/* Counter Skeleton */}
        <div className="flex items-center justify-center gap-2 pt-1">
          <div className="h-px flex-1 bg-gray-200" />
          <div className="h-3 w-16 bg-gray-200 rounded" />
          <div className="h-px flex-1 bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

