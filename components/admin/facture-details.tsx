"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { formatServiceType } from "@/lib/invoice-utils"
import { FileText, Download, Printer, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

type FactureDetails = {
  id: string
  paiement_id: string
  numero_facture: string
  date_emission: string
  montant_total: number
  devise: string
  type_service: string
  client_id: string
  statut: string
  lien_pdf: string | null
  clients: {
    nom_complet: string
    email: string
    telephone: string
  }
  paiements: {
    mode_paiement: string
    reservation_id: string
    type: string
  }
}

export default function FactureDetails({ factureId }: { factureId: string }) {
  const router = useRouter()
  const [facture, setFacture] = useState<FactureDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFactureDetails() {
      try {
        const response = await fetch(`/api/factures/${factureId}`)
        const data = await response.json()

        if (data.facture) {
          setFacture(data.facture)
        }
      } catch (error) {
        console.error("Erreur lors du chargement des détails de la facture:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFactureDetails()
  }, [factureId])

  const handlePrint = () => {
    window.print()
  }

  // Fonction pour obtenir la couleur du badge selon le statut
  const getStatusBadgeVariant = (statut: string) => {
    switch (statut) {
      case "Payée":
        return "success"
      case "Partielle":
        return "warning"
      case "Annulée":
        return "destructive"
      default:
        return "secondary"
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (!facture) {
    return (
      <div className="text-center py-8">
        <p>Facture non trouvée.</p>
        <Button variant="outline" className="mt-4" onClick={() => router.push("/admin/factures")}>
          Retour à la liste
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 print:p-6">
      <div className="flex justify-between items-center print:hidden">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        <div className="flex gap-2">
          {facture.lien_pdf && (
            <a href={facture.lien_pdf} target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Télécharger
              </Button>
            </a>
          )}
          <Button onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Imprimer
          </Button>
        </div>
      </div>

      <Card className="border-2">
        <CardHeader className="border-b">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Facture {facture.numero_facture}
              </CardTitle>
              <CardDescription>
                Émise le{" "}
                {new Date(facture.date_emission).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </CardDescription>
            </div>
            <Badge
              variant={
                getStatusBadgeVariant(facture.statut) as
                  | "default"
                  | "secondary"
                  | "destructive"
                  | "outline"
                  | "success"
                  | "warning"
              }
              className="text-sm px-3 py-1"
            >
              {facture.statut}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Informations client</h3>
              <div className="mt-2">
                <p className="font-medium">{facture.clients.nom_complet}</p>
                <p>{facture.clients.email}</p>
                <p>{facture.clients.telephone}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Détails du paiement</h3>
              <div className="mt-2">
                <p>
                  <span className="font-medium">Service:</span> {formatServiceType(facture.type_service)}
                </p>
                <p>
                  <span className="font-medium">Mode de paiement:</span> {facture.paiements.mode_paiement}
                </p>
                <p>
                  <span className="font-medium">Réservation:</span> {facture.paiements.reservation_id}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Récapitulatif</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between items-center">
                <span>{formatServiceType(facture.type_service)}</span>
                <span>
                  {facture.montant_total.toFixed(2)} {facture.devise}
                </span>
              </div>
              <div className="border-t mt-4 pt-4 flex justify-between items-center font-medium">
                <span>Total</span>
                <span className="text-xl">
                  {facture.montant_total.toFixed(2)} {facture.devise}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t flex justify-between text-sm text-gray-500">
          <p>John Services Motel</p>
          <p>Merci pour votre confiance</p>
        </CardFooter>
      </Card>
    </div>
  )
}
