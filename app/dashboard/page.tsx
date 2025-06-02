import { redirect } from "next/navigation"
import { requireAuth, getUserProfile } from "@/lib/auth-utils"

// Mark this route as dynamic to allow cookies usage
export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const session = await requireAuth()
  const profile = await getUserProfile(session.user.id)

  if (!profile) {
    redirect("/auth/complete-profile")
  }

  if (profile.role === "admin") {
    redirect("/admin/dashboard")
  } else {
    redirect("/reservations")
  }
}
