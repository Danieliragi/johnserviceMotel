"use client"

import { useEffect, useState } from "react"
import TestimonialCard from "./testimonial-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Avis = {
  id: string
  client_id: string
  service_type: string // Nouveau champ
  note: number
  commentaire: string
  date: string
  statut: string // Nouveau champ
  clients: {
    nom: string
  }
}

export default function AvisList() {
  const [avis, setAvis] = useState<Avis[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    async function fetchAvis() {
      try {
        const response = await fetch("/api/avis")
        const data = await response.json()

        if (data.avis) {
          setAvis(data.avis)
        }
      } catch (error) {
        console.error("Erreur lors du chargement des avis:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAvis()
  }, [])

  // Filtrer les avis selon le type de service sélectionné
  const filteredAvis = activeTab === "all" ? avis : avis.filter((item) => item.service_type === activeTab)

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg border p-6">
            <div className="flex items-center gap-3 mb-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="h-20 w-full" />
          </div>
        ))}
      </div>
    )
  }

  if (avis.length === 0) {
    return <p className="text-center py-8">Aucun avis pour le moment.</p>
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="all">Tous les avis</TabsTrigger>
          <TabsTrigger value="chambre">Chambres</TabsTrigger>
          <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
          <TabsTrigger value="salle de reunion">Salles de réunion</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredAvis.map((item) => (
          <TestimonialCard
            key={item.id}
            name={item.clients.nom}
            date={new Date(item.date).toLocaleDateString("fr-FR")}
            rating={item.note}
            text={item.commentaire}
            serviceType={item.service_type} // Nouveau prop
          />
        ))}
      </div>
    </div>
  )
}
