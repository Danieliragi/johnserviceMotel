import { Skeleton } from "@/components/ui/skeleton"

export default function GalleryLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Hero Skeleton */}
      <div className="h-[40vh] bg-primary-200 animate-pulse flex items-center justify-center">
        <div className="text-center">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Title Skeleton */}
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-80 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>

          {/* Tabs Skeleton */}
          <div className="mb-8">
            <Skeleton className="h-16 w-full rounded-xl" />
          </div>

          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
