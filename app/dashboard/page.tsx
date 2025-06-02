import { redirect } from "next/navigation"
import { requireAuth, getUserProfile } from "@/lib/auth-utils"

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
