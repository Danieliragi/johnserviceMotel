import { Skeleton } from "@/components/ui/skeleton"

export default function LocalisationLoading() {
  return (
    <main className="min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden bg-slate-800">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center">
          <Skeleton className="h-12 w-64 mb-4 bg-slate-700" />
          <Skeleton className="h-6 w-full max-w-md bg-slate-700" />
        </div>
      </section>

      {/* Map Section Skeleton */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <Skeleton className="rounded-xl h-[400px] md:h-[500px] bg-slate-200" />
            <div className="space-y-6">
              <div>
                <Skeleton className="h-10 w-48 mb-4 bg-slate-200" />
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Skeleton className="h-9 w-9 rounded-full bg-slate-200" />
                      <div className="w-full">
                        <Skeleton className="h-6 w-32 mb-2 bg-slate-200" />
                        <Skeleton className="h-4 w-full bg-slate-200" />
                        <Skeleton className="h-4 w-2/3 mt-1 bg-slate-200" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-4">
                <Skeleton className="h-12 w-40 bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comment nous rejoindre Skeleton */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-64 mx-auto mb-12 bg-slate-200" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-md">
                <Skeleton className="h-12 w-12 rounded-full mb-4 bg-slate-200" />
                <Skeleton className="h-6 w-40 mb-3 bg-slate-200" />
                <Skeleton className="h-4 w-full mb-2 bg-slate-200" />
                <Skeleton className="h-4 w-full mb-2 bg-slate-200" />
                <Skeleton className="h-4 w-2/3 bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* À proximité Skeleton */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-48 mx-auto mb-12 bg-slate-200" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center text-center p-6">
                <Skeleton className="h-12 w-12 rounded-full mb-4 bg-slate-200" />
                <Skeleton className="h-6 w-32 mb-2 bg-slate-200" />
                <Skeleton className="h-4 w-full mb-1 bg-slate-200" />
                <Skeleton className="h-4 w-full mb-1 bg-slate-200" />
                <Skeleton className="h-4 w-2/3 bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Skeleton */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-64 mx-auto mb-12 bg-slate-200" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <Skeleton className="h-9 w-9 rounded-full bg-slate-200" />
                  <Skeleton className="h-6 w-48 bg-slate-200" />
                </div>
                <Skeleton className="h-4 w-full ml-10 mb-1 bg-slate-200" />
                <Skeleton className="h-4 w-2/3 ml-10 bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Skeleton */}
      <section className="py-16 md:py-24 bg-slate-800">
        <div className="container mx-auto px-4 text-center">
          <Skeleton className="h-10 w-64 mx-auto mb-6 bg-slate-700" />
          <Skeleton className="h-6 w-full max-w-2xl mx-auto mb-8 bg-slate-700" />
          <Skeleton className="h-12 w-48 mx-auto bg-slate-700" />
        </div>
      </section>
    </main>
  )
}
