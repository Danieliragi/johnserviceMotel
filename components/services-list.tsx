"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Coffee, Wifi, Utensils, ShowerHead, Car, Shirt } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

type Service = {
  id: string
  nom: string
  prix: number
  disponible: boolean
}

const getServiceIcon = (serviceName: string) => {
  const name = serviceName.toLowerCase()
  if (name.includes("petit-déjeuner") || name.includes("café")) return <Coffee className="h-5 w-5" />
  if (name.includes("wifi") || name.includes("internet")) return <Wifi className="h-5 w-5" />
  if (name.includes("restaurant") || name.includes("repas")) return <Utensils className="h-5 w-5" />
  if (name.includes("douche") || name.includes("bain")) return <ShowerHead className="h-5 w-5" />
  if (name.includes("transport") || name.includes("navette")) return <Car className="h-5 w-5" />
  if (name.includes("blanchisserie") || name.includes("linge")) return <Shirt className="h-5 w-5" />
  return <Coffee className="h-5 w-5" /> // Default icon
}

export default function ServicesList() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch("/api/services")
        const data = await response.json()

        if (data.services) {
          setServices(data.services)
        }
      } catch (error) {
        console.error("Erreur lors du chargement des services:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (services.length === 0) {
    return <p className="text-center py-8">Aucun service disponible pour le moment.</p>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <Card key={service.id} className="overflow-hidden transition-all hover:shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {getServiceIcon(service.nom)}
                </div>
                <div>
                  <h3 className="font-medium">{service.nom}</h3>
                  <p className="text-sm text-gray-500">${service.prix}</p>
                </div>
              </div>
              <Badge className="bg-green-500">Disponible</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
