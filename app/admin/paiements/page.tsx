import type { Metadata } from "next"
import PaiementsClientPage from "./PaiementsClientPage"

export const metadata: Metadata = {
  title: "Gestion des Paiements | John Services Motel",
  description: "Tableau de bord administrateur pour la gestion des paiements",
}

export default function PaiementsPage() {
  return <PaiementsClientPage />
}
