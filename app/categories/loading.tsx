export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs Skeleton */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] py-5">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] py-10 sm:py-12">
        {/* Header Skeleton */}
        <div className="mb-8 sm:mb-10">
          <div className="h-6 w-28 bg-gray-200 rounded-full animate-pulse" />
          <div className="mt-4 h-10 w-[340px] max-w-full bg-gray-200 rounded animate-pulse" />
          <div className="mt-3 h-5 w-[520px] max-w-full bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
            >
              <div className="aspect-[16/10] bg-gray-200 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
