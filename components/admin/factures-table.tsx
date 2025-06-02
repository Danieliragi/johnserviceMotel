"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, Search, FileDown, Trash2 } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface Facture {
  id: string
  numero: string
  client_nom: string
  montant_total: number
  date_emission: string
  statut: string
}

export default function FacturesTable() {
  const [factures, setFactures] = useState<Facture[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFactures = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/factures")
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des factures")
        }
        const data = await response.json()
        setFactures(data)
      } catch (err) {
        console.error("Erreur:", err)
        setError("Impossible de charger les factures. Veuillez réessayer plus tard.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchFactures()
  }, [])

  const filteredFactures =
    factures?.filter(
      (facture) =>
        facture.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
        facture.client_nom.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || []

  const handleDeleteFacture = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette facture ?")) {
      try {
        const response = await fetch(`/api/factures/${id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("Erreur lors de la suppression")
        }

        setFactures(factures.filter((facture) => facture.id !== id))
      } catch (err) {
        console.error("Erreur:", err)
        alert("Erreur lors de la suppression de la facture")
      }
    }
  }

  if (isLoading) {
    return <div className="text-center py-10">Chargement des factures...</div>
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm">
          <FileDown className="mr-2 h-4 w-4" />
          Exporter
        </Button>
      </div>

      {filteredFactures.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          {searchTerm ? "Aucune facture ne correspond à votre recherche" : "Aucune facture disponible"}
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Numéro</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFactures.map((facture) => (
                <TableRow key={facture.id}>
                  <TableCell className="font-medium">{facture.numero}</TableCell>
                  <TableCell>{facture.client_nom}</TableCell>
                  <TableCell>{format(new Date(facture.date_emission), "dd MMMM yyyy", { locale: fr })}</TableCell>
                  <TableCell>{facture.montant_total.toFixed(2)} €</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        facture.statut === "payée"
                          ? "bg-green-100 text-green-800"
                          : facture.statut === "en attente"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {facture.statut}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/factures/${facture.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Voir</span>
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteFacture(facture.id)}>
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
      )}
    </div>
  )
}
