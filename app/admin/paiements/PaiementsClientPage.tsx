"use client"

import { useState, useEffect } from "react"
import PaiementsTable from "@/components/admin/paiements-table"

interface Paiement {
  id: string
  montant: number
  date: string
  type: string
  description: string
}

export default function PaiementsClientPage() {
  const [paiements, setPaiements] = useState<Paiement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPaiements()
  }, [])

  const fetchPaiements = async () => {
    try {
      const response = await fetch("/api/paiements")
      const data = await response.json()

      if (response.ok) {
        setPaiements(data.paiements || [])
      } else {
        setError(data.error || "Failed to fetch paiements")
      }
    } catch (err) {
      setError("Failed to fetch paiements")
      console.error("Error fetching paiements:", err)
    } finally {
      setLoading(false)
    }
  }

  const handlePaiementUpdated = (updatedPaiement: Paiement) => {
    setPaiements((prev) => prev.map((p) => (p.id === updatedPaiement.id ? updatedPaiement : p)))
  }

  const handlePaiementDeleted = (paiementId: string) => {
    setPaiements((prev) => prev.filter((p) => p.id !== paiementId))
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestion des Paiements</h1>
          <p className="text-muted-foreground">Consultez et gérez tous les paiements effectués par les clients.</p>
        </div>
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Chargement des paiements...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestion des Paiements</h1>
          <p className="text-muted-foreground">Consultez et gérez tous les paiements effectués par les clients.</p>
        </div>
        <div className="flex items-center justify-center p-8">
          <div className="text-center text-red-600">
            <p>Erreur: {error}</p>
            <button
              onClick={fetchPaiements}
              className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gestion des Paiements</h1>
        <p className="text-muted-foreground">Consultez et gérez tous les paiements effectués par les clients.</p>
      </div>

      <PaiementsTable
        paiements={paiements}
        onPaiementUpdated={handlePaiementUpdated}
        onPaiementDeleted={handlePaiementDeleted}
      />
    </div>
  )
}
