import type { Metadata } from "next"
import FactureDetails from "@/components/admin/facture-details"

export const metadata: Metadata = {
  title: "Détails de la Facture | John Services Motel",
  description: "Voir les détails d'une facture",
}

export default function FactureDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <FactureDetails factureId={params.id} />
    </div>
  )
}
