import type { Metadata } from "next"
import { requireAdmin } from "@/lib/auth-utils"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export const metadata: Metadata = {
  title: "Tableau de bord | Admin",
  description: "Tableau de bord d'administration",
}

export default async function AdminDashboardPage() {
  // This will redirect if not admin
  await requireAdmin()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Tableau de bord d'administration</h1>
      <AdminDashboard />
    </div>
  )
}
