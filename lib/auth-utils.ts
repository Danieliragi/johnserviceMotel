import { createServerSupabaseClient } from "@/lib/supabase"
import { redirect } from "next/navigation"

export async function getServerSession() {
  try {
    const supabase = await createServerSupabaseClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error("Error getting server session:", error)
    return null
  }
}

export async function getUserProfile(userId: string) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase.from("utilisateurs").select("*").eq("auth_id", userId).single()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error getting user profile:", error)
    return null
  }
}

export async function requireAuth(redirectTo = "/auth/login") {
  const session = await getServerSession()
  if (!session) {
    redirect(redirectTo)
  }
  return session
}

export async function requireAdmin(redirectTo = "/") {
  const session = await getServerSession()
  if (!session) {
    redirect("/auth/login")
  }

  const profile = await getUserProfile(session.user.id)
  if (!profile || profile.role !== "admin") {
    redirect(redirectTo)
  }

  return { session, profile }
}
