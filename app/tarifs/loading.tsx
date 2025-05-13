import { Skeleton } from "@/components/ui/skeleton"

export default function TarifsLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <div className="relative bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 relative z-10">
          <Skeleton className="h-12 w-64 mx-auto mb-4 bg-white/20" />
          <Skeleton className="h-6 w-full max-w-3xl mx-auto bg-white/10" />
        </div>
      </div>

      {/* Price Highlights Skeleton */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-64 mx-auto mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg overflow-hidden">
                <div className="p-6 bg-gray-100">
                  <Skeleton className="h-7 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <div className="p-6">
                  <Skeleton className="h-10 w-1/3 mx-auto mb-6" />
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                </div>
                <div className="p-6 border-t">
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Seasonal Pricing Skeleton */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-64 mx-auto mb-2" />
          <Skeleton className="h-4 w-full max-w-2xl mx-auto mb-12" />

          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-12 w-full mb-8" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>

      {/* Special Offers Skeleton */}
      <div className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-64 mx-auto mb-2 bg-white/20" />
          <Skeleton className="h-4 w-full max-w-2xl mx-auto mb-12 bg-white/10" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-white/20 rounded-lg overflow-hidden bg-white/5">
                <div className="p-6">
                  <Skeleton className="h-6 w-1/4 mb-4 bg-white/20" />
                  <Skeleton className="h-7 w-3/4 mb-2 bg-white/20" />
                  <Skeleton className="h-4 w-1/2 mb-6 bg-white/10" />
                  <Skeleton className="h-20 w-full mb-4 bg-white/10" />
                  <Skeleton className="h-4 w-3/4 bg-white/10" />
                </div>
                <div className="p-6 border-t border-white/10">
                  <Skeleton className="h-10 w-full bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
