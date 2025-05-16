"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { FileText, Download, Eye, Trash2 } from "lucide-react"
import { formatServiceType } from "@/lib/invoice-utils"
import Link from "next/link"

type Facture = {
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
  }
}

export default function FacturesTable() {
  const [factures, setFactures] = useState<Facture[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFactures() {
      try {
        const response = await fetch("/api/factures")
        const data = await response.json()

        if (data.factures) {
          setFactures(data.factures)
        }
      } catch (error) {
        console.error("Erreur lors du chargement des factures:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFactures()
  }, [])

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

  const handleDeleteFacture = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette facture ?")) {
      try {
        const response = await fetch(`/api/factures/${id}`, {
          method: "DELETE",
        })

        if (response.ok) {
          // Mettre à jour la liste des factures
          setFactures(factures.filter((facture) => facture.id !== id))
        } else {
          const error = await response.json()
          alert(`Erreur: ${error.error || "Échec de la suppression"}`)
        }
      } catch (error) {
        console.error("Erreur lors de la suppression:", error)
        alert("Une erreur est survenue lors de la suppression")
      }
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

  if (factures.length === 0) {
    return <p className="text-center py-8">Aucune facture enregistrée.</p>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>N° Facture</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {factures.map((facture) => (
            <TableRow key={facture.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {facture.numero_facture}
                </div>
              </TableCell>
              <TableCell>
                {new Date(facture.date_emission).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell>{facture.clients.nom_complet}</TableCell>
              <TableCell>{formatServiceType(facture.type_service)}</TableCell>
              <TableCell>
                {facture.montant_total.toFixed(2)} {facture.devise}
              </TableCell>
              <TableCell>
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
                >
                  {facture.statut}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Link href={`/admin/factures/${facture.id}`}>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Voir</span>
                    </Button>
                  </Link>
                  {facture.lien_pdf && (
                    <a href={facture.lien_pdf} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Télécharger</span>
                      </Button>
                    </a>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteFacture(facture.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                    <span className="sr-only">Supprimer</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
