import { Skeleton } from "@/components/ui/skeleton"

export default function ContactLoading() {
  return (
    <main className="min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Skeleton className="h-12 w-3/4 mx-auto mb-4 bg-slate-700" />
            <Skeleton className="h-6 w-2/3 mx-auto bg-slate-700" />
          </div>
        </div>
      </section>

      {/* Contact Information Skeleton */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-slate-50 p-8 rounded-lg shadow-md">
              <Skeleton className="h-10 w-2/3 mb-6 bg-slate-200" />

              <div className="space-y-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-start">
                    <Skeleton className="h-12 w-12 rounded-full mr-4 bg-slate-200" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-1/3 mb-2 bg-slate-200" />
                      <Skeleton className="h-4 w-2/3 mb-1 bg-slate-200" />
                      <Skeleton className="h-4 w-1/2 bg-slate-200" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Skeleton className="h-5 w-1/3 mb-4 bg-slate-200" />
                <div className="flex space-x-4">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-11 w-11 rounded-full bg-slate-200" />
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-lg shadow-md">
              <Skeleton className="h-10 w-2/3 mb-6 bg-slate-200" />

              <div className="space-y-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-5 w-1/4 mb-1 bg-slate-200" />
                    <Skeleton className="h-10 w-full bg-slate-200" />
                  </div>
                ))}

                <Skeleton className="h-12 w-full bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section Skeleton */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Skeleton className="h-10 w-1/3 mx-auto mb-8 bg-slate-200" />

            <div className="space-y-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                  <Skeleton className="h-6 w-2/3 mb-2 bg-slate-200" />
                  <Skeleton className="h-4 w-full mb-1 bg-slate-200" />
                  <Skeleton className="h-4 w-full mb-1 bg-slate-200" />
                  <Skeleton className="h-4 w-3/4 bg-slate-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <Skeleton className="h-10 w-2/3 mx-auto mb-4 bg-slate-700" />
          <Skeleton className="h-6 w-3/4 mx-auto mb-2 bg-slate-700" />
          <Skeleton className="h-6 w-3/4 mx-auto mb-8 bg-slate-700" />
          <Skeleton className="h-12 w-40 mx-auto bg-slate-700" />
        </div>
      </section>
    </main>
  )
}
