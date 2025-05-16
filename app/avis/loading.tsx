import { Skeleton } from "@/components/ui/skeleton"

export default function AvisLoading() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <Skeleton className="h-10 w-64 mb-4" />
        <Skeleton className="h-6 w-full max-w-2xl mb-8" />
      </div>

      <Skeleton className="h-12 w-full max-w-md mb-8" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array(9)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="rounded-lg border p-6">
              <div className="flex items-center gap-3 mb-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <div className="ml-auto">
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
              <Skeleton className="h-4 w-24 mb-3" />
              <Skeleton className="h-20 w-full" />
            </div>
          ))}
      </div>
    </div>
  )
}
