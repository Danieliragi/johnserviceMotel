import type { Metadata } from "next"
import CreateFactureForm from "@/components/admin/create-facture-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Nouvelle Facture | John Services Motel",
  description: "Créer une nouvelle facture",
}

export default function NouvelleFacturePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link href="/admin/factures">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Nouvelle Facture</h1>
        <p className="text-gray-500">Créer une nouvelle facture pour un client</p>
      </div>

      <div className="border rounded-lg p-6">
        <CreateFactureForm />
      </div>
    </div>
  )
}
