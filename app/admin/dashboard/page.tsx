import type { Metadata } from "next"
import AdminDashboard from "@/components/admin/admin-dashboard"

export const metadata: Metadata = {
  title: "Admin Dashboard - JohnService Motel",
  description: "Tableau de bord administrateur pour la gestion du JohnService Motel",
}

export default function AdminDashboardPage() {
  return <AdminDashboard />
}
