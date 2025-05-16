import type { Metadata } from "next"
import { ProfileManagement } from "@/components/auth/profile-management"
import { ProtectedRoute } from "@/components/auth/protected-route"

export const metadata: Metadata = {
  title: "Mon Profil | John Services Motel",
  description: "Gérez votre profil et vos préférences sur John Services Motel",
}

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <ProtectedRoute>
        <h1 className="text-3xl font-bold text-center mb-8">Mon Profil</h1>
        <ProfileManagement />
      </ProtectedRoute>
    </div>
  )
}
