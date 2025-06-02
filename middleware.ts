import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define which routes are public (don't require authentication)
const publicRoutes = [
  "/",
  "/auth/login",
  "/auth/confirm",
  "/auth/callback",
  "/about",
  "/about/documentation",
  "/about/gallery",
  "/services",
  "/services/hebergement",
  "/services/restaurant",
  "/services/salles-reunion",
  "/chambres",
  "/chambres/standard",
  "/chambres/deluxe",
  "/chambres/vip",
  "/tarifs",
  "/contact",
  "/contact/address",
  "/localisation",
  "/client-register",
]

// Define which routes are admin-only
const adminRoutes = [
  "/admin",
  "/admin/dashboard",
  "/admin/utilisateurs",
  "/admin/factures",
  "/admin/factures/nouvelle",
  "/admin/paiements",
  "/admin/analytics/payments",
  "/admin/emails",
  "/admin/notifications",
  "/admin/test-supabase",
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is an API route
  if (pathname.startsWith("/api/")) {
    return NextResponse.next()
  }

  // Check if the path is for static files
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/manifest.json") ||
    pathname.startsWith("/sw.js") ||
    pathname.startsWith("/icons/") ||
    pathname.includes(".") // This catches most static files like images, fonts, etc.
  ) {
    return NextResponse.next()
  }

  // Get the user session from the cookie
  const sessionCookie = request.cookies.get("supabase-auth-session")
  const isAuthenticated = !!sessionCookie?.value

  // Check if the path is public
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || (route.endsWith("*") && pathname.startsWith(route.slice(0, -1))),
  )

  // Check if the path is admin-only
  const isAdminRoute = adminRoutes.some(
    (route) => pathname === route || (route.endsWith("*") && pathname.startsWith(route.slice(0, -1))),
  )

  // If the user is not authenticated and the route is not public, redirect to login
  if (!isAuthenticated && !isPublicRoute) {
    const redirectUrl = new URL("/auth/login", request.url)
    redirectUrl.searchParams.set("redirectTo", pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If the user is authenticated but trying to access login page, redirect to home
  if (isAuthenticated && pathname === "/auth/login") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // For admin routes, we would need to check if the user is an admin
  // This would typically be done by checking a role in the session
  // For now, we'll just let authenticated users through

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
