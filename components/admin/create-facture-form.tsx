"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateInvoiceNumber } from "@/lib/invoice-utils"
import { useRouter } from "next/navigation"

type Client = {
  id: string
  nom_complet: string
}

type Paiement = {
  id: string
  client_id: string
  type: string
  montant: number
  mode_paiement: string
  date_paiement: string
  clients: {
    nom_complet: string
  }
}

export default function CreateFactureForm() {
  const router = useRouter()
  const [clients, setClients] = useState<Client[]>([])
  const [paiements, setPaiements] = useState<Paiement[]>([])
  const [filteredPaiements, setFilteredPaiements] = useState<Paiement[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    client_id: "",
    paiement_id: "",
    numero_facture: "",
    montant_total: 0,
    devise: "USD",
    type_service: "",
    statut: "Payée",
  })

  useEffect(() => {
    async function fetchData() {
      try {
        // Charger les clients
        const clientsResponse = await fetch("/api/clients")
        const clientsData = await clientsResponse.json()

        if (clientsData.clients) {
          setClients(clientsData.clients)
        }

        // Charger les paiements
        const paiementsResponse = await fetch("/api/paiements")
        const paiementsData = await paiementsResponse.json()

        if (paiementsData.paiements) {
          setPaiements(paiementsData.paiements)
        }

        // Générer un numéro de facture
        const invoiceNumber = await generateInvoiceNumber()
        setFormData((prev) => ({ ...prev, numero_facture: invoiceNumber }))
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filtrer les paiements lorsque le client change
  useEffect(() => {
    if (formData.client_id) {
      const filtered = paiements.filter((p) => p.client_id === formData.client_id)
      setFilteredPaiements(filtered)
    } else {
      setFilteredPaiements([])
    }
  }, [formData.client_id, paiements])

  // Mettre à jour les détails lorsque le paiement change
  useEffect(() => {
    if (formData.paiement_id) {
      const selectedPaiement = paiements.find((p) => p.id === formData.paiement_id)
      if (selectedPaiement) {
        setFormData((prev) => ({
          ...prev,
          montant_total: selectedPaiement.montant,
          type_service: selectedPaiement.type,
        }))
      }
    }
  }, [formData.paiement_id, paiements])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch("/api/factures", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        alert("Facture créée avec succès!")
        router.push("/admin/factures")
      } else {
        alert(`Erreur: ${data.error || "Échec de la création de la facture"}`)
      }
    } catch (error) {
      console.error("Erreur lors de la création de la facture:", error)
      alert("Une erreur est survenue lors de la création de la facture")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <p>Chargement...</p>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="client_id">Client</Label>
            <Select
              value={formData.client_id}
              onValueChange={(value) => handleSelectChange("client_id", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.nom_complet}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paiement_id">Paiement associé</Label>
            <Select
              value={formData.paiement_id}
              onValueChange={(value) => handleSelectChange("paiement_id", value)}
              required
              disabled={!formData.client_id}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un paiement" />
              </SelectTrigger>
              <SelectContent>
                {filteredPaiements.map((paiement) => (
                  <SelectItem key={paiement.id} value={paiement.id}>
                    {new Date(paiement.date_paiement).toLocaleDateString()} - {paiement.montant} USD
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="numero_facture">Numéro de facture</Label>
            <Input
              id="numero_facture"
              name="numero_facture"
              value={formData.numero_facture}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="statut">Statut</Label>
            <Select value={formData.statut} onValueChange={(value) => handleSelectChange("statut", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Payée">Payée</SelectItem>
                <SelectItem value="Partielle">Partielle</SelectItem>
                <SelectItem value="Annulée">Annulée</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="montant_total">Montant total</Label>
            <Input
              id="montant_total"
              name="montant_total"
              type="number"
              step="0.01"
              value={formData.montant_total}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="devise">Devise</Label>
            <Select value={formData.devise} onValueChange={(value) => handleSelectChange("devise", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une devise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="CDF">CDF</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Button type="submit" disabled={submitting}>
        {submitting ? "Création en cours..." : "Créer la facture"}
      </Button>
    </form>
  )
}
