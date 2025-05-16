import type { Metadata } from "next"
import { UserManagement } from "@/components/admin/user-management"
import { ProtectedRoute } from "@/components/auth/protected-route"

export const metadata: Metadata = {
  title: "Gestion des utilisateurs | Admin",
  description: "Gérez les utilisateurs du système",
}

export default function UsersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ProtectedRoute requiredRole="admin">
        <h1 className="text-2xl font-bold mb-6">Gestion des utilisateurs</h1>
        <UserManagement />
      </ProtectedRoute>
    </div>
  )
}
