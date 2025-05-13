import { Skeleton } from "@/components/ui/skeleton"

export default function ServicesLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Skeleton */}
      <div className="h-[50vh] bg-slate-200 animate-pulse"></div>

      {/* Stats Skeleton */}
      <div className="bg-slate-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                <Skeleton className="h-10 w-20 mb-2 mx-auto" />
                <Skeleton className="h-4 w-24 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Services Skeleton */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-64 mx-auto mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Skeleton className="h-12 w-12 rounded-full mr-4" />
                  <Skeleton className="h-6 w-40" />
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Premium Services Skeleton */}
      <div className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-64 mx-auto mb-12 bg-slate-700" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-slate-800 p-8 rounded-lg">
                <div className="flex items-center mb-6">
                  <Skeleton className="h-16 w-16 rounded-full mr-4 bg-slate-700" />
                  <div>
                    <Skeleton className="h-6 w-48 bg-slate-700 mb-2" />
                    <Skeleton className="h-4 w-24 bg-slate-700" />
                  </div>
                </div>
                <Skeleton className="h-4 w-full bg-slate-700 mb-2" />
                <Skeleton className="h-4 w-full bg-slate-700 mb-2" />
                <Skeleton className="h-4 w-3/4 bg-slate-700 mb-6" />

                <div className="space-y-2 mb-6">
                  {[...Array(3)].map((_, j) => (
                    <Skeleton key={j} className="h-4 w-full bg-slate-700" />
                  ))}
                </div>

                <Skeleton className="h-10 w-32 bg-slate-700 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
