"use client"

import { useState, useEffect } from "react"
import TestimonialCard from "@/components/testimonial-card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Star, Filter } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Avis = {
  id: string
  client_id: string
  service_type: string
  note: number
  commentaire: string
  date: string
  statut: string
  clients: {
    nom: string
  }
}

export default function AvisClient() {
  const [avis, setAvis] = useState<Avis[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [ratingFilter, setRatingFilter] = useState("")
  const [sortOrder, setSortOrder] = useState("newest")

  useEffect(() => {
    async function fetchAvis() {
      try {
        setLoading(true)
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

  // Filtrer les avis selon les critères
  const filteredAvis = avis
    .filter((item) => activeTab === "all" || item.service_type === activeTab)
    .filter(
      (item) =>
        item.commentaire.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.clients.nom.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((item) => ratingFilter === "" || item.note === Number.parseInt(ratingFilter))
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      } else if (sortOrder === "oldest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      } else if (sortOrder === "highest") {
        return b.note - a.note
      } else {
        return a.note - b.note
      }
    })

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-lg border p-6">
            <div className="flex items-center gap-3 mb-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="h-4 w-24 mb-3" />
            <Skeleton className="h-20 w-full" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 w-full justify-start overflow-x-auto">
          <TabsTrigger value="all">Tous les avis</TabsTrigger>
          <TabsTrigger value="chambre">Chambres</TabsTrigger>
          <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
          <TabsTrigger value="salle de reunion">Salles de réunion</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Rechercher dans les avis..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select value={ratingFilter} onValueChange={setRatingFilter}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Star size={16} className="text-amber-500" />
                <SelectValue placeholder="Note" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les notes</SelectItem>
              <SelectItem value="5">5 étoiles</SelectItem>
              <SelectItem value="4">4 étoiles</SelectItem>
              <SelectItem value="3">3 étoiles</SelectItem>
              <SelectItem value="2">2 étoiles</SelectItem>
              <SelectItem value="1">1 étoile</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Filter size={16} />
                <SelectValue placeholder="Trier par" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Plus récents</SelectItem>
              <SelectItem value="oldest">Plus anciens</SelectItem>
              <SelectItem value="highest">Meilleures notes</SelectItem>
              <SelectItem value="lowest">Notes les plus basses</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredAvis.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">Aucun avis ne correspond à vos critères de recherche.</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("")
              setRatingFilter("")
              setActiveTab("all")
            }}
          >
            Réinitialiser les filtres
          </Button>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">{filteredAvis.length} avis trouvés</p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAvis.map((item) => (
              <TestimonialCard
                key={item.id}
                name={item.clients.nom}
                date={new Date(item.date).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                rating={item.note}
                text={item.commentaire}
                serviceType={item.service_type}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
