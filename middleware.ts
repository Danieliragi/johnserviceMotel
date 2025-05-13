import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // For demonstration purposes only - in a real app, you would validate a JWT or session cookie
  const user = request.cookies.get("user")?.value
  const isAuthenticated = !!user

  // Protected routes that require authentication
  if (request.nextUrl.pathname.startsWith("/admin") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // Admin-only routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    try {
      const userData = user ? JSON.parse(decodeURIComponent(user)) : null
      const isAdmin = userData?.role === "admin"

      if (!isAdmin) {
        return NextResponse.redirect(new URL("/", request.url))
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*", "/profile/:path*"],
}
