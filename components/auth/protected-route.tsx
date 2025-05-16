"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "admin" | "user" | string
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, loading, profile } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        // Redirect to login if not authenticated
        router.push(`/auth/login?redirectTo=${encodeURIComponent(pathname)}`)
        return
      }

      // Check role if required
      if (requiredRole && profile) {
        if (profile.role !== requiredRole && !(requiredRole === "admin" && profile.role === "superadmin")) {
          setIsAuthorized(false)
          router.push("/") // Redirect to home if not authorized
          return
        }
      }

      setIsAuthorized(true)
    }
  }, [isAuthenticated, loading, profile, requiredRole, router, pathname])

  if (loading || isAuthorized === null) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-red-500">Vous n'êtes pas autorisé à accéder à cette page.</p>
      </div>
    )
  }

  return <>{children}</>
}
