import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Exchange the code for a session
    await supabase.auth.exchangeCodeForSession(code)

    // Get the user session
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session?.user) {
      // Check if user profile exists
      const { data: existingProfile } = await supabase
        .from("utilisateurs")
        .select("*")
        .eq("auth_id", session.user.id)
        .single()

      // If profile doesn't exist, create one
      if (!existingProfile) {
        const userData = {
          auth_id: session.user.id,
          email: session.user.email,
          nom_complet:
            session.user.user_metadata.full_name || session.user.email?.split("@")[0] || "Utilisateur Google",
          role: "user",
          date_creation: new Date().toISOString(),
          derniere_connexion: new Date().toISOString(),
          provider: "google",
        }

        await supabase.from("utilisateurs").insert(userData)
      } else {
        // Update last login time
        await supabase
          .from("utilisateurs")
          .update({ derniere_connexion: new Date().toISOString() })
          .eq("auth_id", session.user.id)
      }
    }
  }

  // Redirect to the home page
  return NextResponse.redirect(new URL("/", request.url))
}
