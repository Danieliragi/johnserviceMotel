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

  // Modifier la liste des routes publiques pour inclure les pages de services spécifiques
  const publicRoutes = [
    "/",
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/chambres",
    "/chambres/standard",
    "/chambres/deluxe",
    "/chambres/vip",
    "/services",
    "/services/hebergement",
    "/services/restaurant",
    "/services/salles-reunion",
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

  // For debugging purposes only, you can temporarily use a more permissive CSP:

  responseHeaders.set(
    "Content-Security-Policy",
    "default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src *; style-src * 'unsafe-inline';",
  )

  // Note: This is NOT recommended for production use. Once you've confirmed the authentication works,
  // you should revert to a more restrictive policy that only allows the specific domains you need.

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
