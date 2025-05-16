import type { Metadata } from "next"
import ReservationsList from "@/components/client/reservations-list"

export const metadata: Metadata = {
  title: "Mes Réservations | John Services Motel",
  description: "Consultez et gérez vos réservations au John Services Motel",
}

export default function ReservationsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mes Réservations</h1>
      <p className="text-gray-600 mb-8">
        Consultez et gérez vos réservations au John Services Motel. Vous pouvez voir les détails de vos réservations,
        les annuler ou en faire de nouvelles.
      </p>

      <ReservationsList />
    </main>
  )
}
