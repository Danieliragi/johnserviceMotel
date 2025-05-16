import type { Metadata } from "next"
import PaiementsTable from "@/components/admin/paiements-table"

export const metadata: Metadata = {
  title: "Gestion des Paiements | John Services Motel",
  description: "Tableau de bord administrateur pour la gestion des paiements",
}

export default function PaiementsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gestion des Paiements</h1>
        <p className="text-muted-foreground">Consultez et gérez tous les paiements effectués par les clients.</p>
      </div>

      <PaiementsTable />
    </div>
  )
}
