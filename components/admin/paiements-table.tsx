"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { CreditCard, Banknote, Smartphone, ShoppingCartIcon as PaypalIcon } from "lucide-react"

type Paiement = {
  id: string
  client_id: string
  reservation_id: string
  type: string
  montant: number
  mode_paiement: string
  date_paiement: string
  clients: {
    nom: string
  }
  reservations: {
    code_reservation: string
  }
}

export default function PaiementsTable() {
  const [paiements, setPaiements] = useState<Paiement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPaiements() {
      try {
        const response = await fetch("/api/paiements")
        const data = await response.json()

        if (data.paiements) {
          setPaiements(data.paiements)
        }
      } catch (error) {
        console.error("Erreur lors du chargement des paiements:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPaiements()
  }, [])

  // Fonction pour obtenir l'icône du mode de paiement
  const getPaymentIcon = (mode: string) => {
    switch (mode) {
      case "carte-visa":
        return <CreditCard className="h-4 w-4" />
      case "cash":
        return <Banknote className="h-4 w-4" />
      case "mobile money":
        return <Smartphone className="h-4 w-4" />
      case "paypal":
        return <PaypalIcon className="h-4 w-4" />
      default:
        return null
    }
  }

  // Fonction pour obtenir le libellé du type de service
  const getServiceTypeLabel = (type: string) => {
    switch (type) {
      case "chambre":
        return "Chambre"
      case "restauration":
        return "Restaurant"
      case "salle de reunion":
        return "Salle de réunion"
      default:
        return type
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    )
  }

  if (paiements.length === 0) {
    return <p className="text-center py-8">Aucun paiement enregistré.</p>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Réservation</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Mode</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paiements.map((paiement) => (
            <TableRow key={paiement.id}>
              <TableCell>
                {new Date(paiement.date_paiement).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell>{paiement.clients.nom}</TableCell>
              <TableCell>{paiement.reservations.code_reservation}</TableCell>
              <TableCell>
                <Badge variant="outline">{getServiceTypeLabel(paiement.type)}</Badge>
              </TableCell>
              <TableCell className="font-medium">{paiement.montant.toFixed(2)} $</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getPaymentIcon(paiement.mode_paiement)}
                  <span className="capitalize">{paiement.mode_paiement}</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
