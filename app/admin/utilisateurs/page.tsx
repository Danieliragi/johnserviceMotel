import type { Metadata } from "next"
import UsersManager from "@/components/admin/users-manager"

export const metadata: Metadata = {
  title: "Gestion des Utilisateurs - JohnService Motel",
  description: "Gérer les utilisateurs du système JohnService Motel",
}

export default function UsersPage() {
  return (
    <div className="container mx-auto py-8">
      <UsersManager />
    </div>
  )
}
