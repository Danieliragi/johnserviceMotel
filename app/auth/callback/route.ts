import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const next = requestUrl.searchParams.get("next") ?? "/"

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    try {
      // Exchange the code for a session
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)

      if (error) {
        console.error("Error exchanging code for session:", error)
        return NextResponse.redirect(new URL("/auth/login?error=auth_error", request.url))
      }

      if (data.session?.user) {
        const user = data.session.user

        // Check if user profile exists
        const { data: existingProfile } = await supabase
          .from("utilisateurs")
          .select("*")
          .eq("auth_id", user.id)
          .single()

        if (!existingProfile) {
          // Create profile for OAuth users
          const userData = {
            auth_id: user.id,
            email: user.email,
            nom_complet:
              user.user_metadata.full_name || user.user_metadata.name || user.email?.split("@")[0] || "Utilisateur",
            role: "user",
            date_creation: new Date().toISOString(),
            derniere_connexion: new Date().toISOString(),
            provider: user.app_metadata.provider || "oauth",
          }

          const { error: profileError } = await supabase.from("utilisateurs").insert(userData)

          if (profileError) {
            console.error("Error creating OAuth profile:", profileError)
            // Still redirect to complete profile if creation fails
            return NextResponse.redirect(new URL("/auth/complete-profile", request.url))
          }

          // Redirect new OAuth users to reservations
          return NextResponse.redirect(new URL("/reservations", request.url))
        } else {
          // Update last login time for existing users
          await supabase
            .from("utilisateurs")
            .update({ derniere_connexion: new Date().toISOString() })
            .eq("auth_id", user.id)

          // Redirect based on role
          if (existingProfile.role === "admin") {
            return NextResponse.redirect(new URL("/admin/dashboard", request.url))
          } else {
            return NextResponse.redirect(new URL(next.startsWith("/") ? next : "/reservations", request.url))
          }
        }
      }
    } catch (error) {
      console.error("Callback error:", error)
      return NextResponse.redirect(new URL("/auth/login?error=callback_error", request.url))
    }
  }

  // Fallback redirect
  return NextResponse.redirect(new URL("/", request.url))
}
