import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Vérifier si nous avons un cookie de simulation d'authentification
  const mockAuthCookie = req.cookies.get("mockAuth")
  const isMockAuthenticated = mockAuthCookie?.value === "true"

  // Vérifier la session Supabase si nous ne sommes pas en mode simulation
  let isAuthenticated = isMockAuthenticated
  if (!isAuthenticated) {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    isAuthenticated = !!session
  }

  // Check if the request is for an admin route
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin")

  // If trying to access admin routes without being logged in, redirect to login
  if (isAdminRoute && !isAuthenticated) {
    const redirectUrl = new URL("/auth/login", req.url)
    redirectUrl.searchParams.set("redirect", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If logged in but trying to access auth pages, redirect to profile
  if (
    isAuthenticated &&
    (req.nextUrl.pathname.startsWith("/auth/login") || req.nextUrl.pathname.startsWith("/auth/register"))
  ) {
    return NextResponse.redirect(new URL("/profile", req.url))
  }

  return res
}

export const config = {
  matcher: ["/admin/:path*", "/auth/:path*", "/profile/:path*"],
}
