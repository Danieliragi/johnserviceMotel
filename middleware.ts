import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(request: NextRequest) {
  // Create a Supabase client configured to use cookies
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })

  // Refresh session if expired - required for Server Components
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Get the pathname
  const pathname = request.nextUrl.pathname

  // Public routes that don't require authentication
  const publicRoutes = [
    "/",
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/chambres",
    "/services",
    "/tarifs",
    "/localisation",
    "/contact",
    "/avis",
  ]

  // Check if the current path is a public route or starts with /api
  const isPublicRoute =
    publicRoutes.some((route) => pathname === route) ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.includes(".") // Static files

  // Protected routes that require authentication
  if (!isPublicRoute && !session) {
    const redirectUrl = new URL("/auth/login", request.url)
    redirectUrl.searchParams.set("redirectTo", pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Admin-only routes
  if (pathname.startsWith("/admin") && session) {
    // Get user profile to check role
    const { data: profile } = await supabase.from("utilisateurs").select("role").eq("auth_id", session.user.id).single()

    const isAdmin = profile?.role === "admin"

    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  // Add security headers
  const requestHeaders = new Headers(request.headers)
  const responseHeaders = res.headers

  // Security headers
  responseHeaders.set("X-Content-Type-Options", "nosniff")
  responseHeaders.set("X-Frame-Options", "DENY")
  responseHeaders.set("X-XSS-Protection", "1; mode=block")
  responseHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin")
  responseHeaders.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co",
  )

  return res
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
