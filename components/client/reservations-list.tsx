"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { CalendarDays, BedDouble, Clock } from "lucide-react"

type Reservation = {
  id: string
  client_id: string
  chambre_id: string
  date_arrivee: string
  date_depart: string
  statut: string
  code_reservation: string
  created_at: string
  clients: {
    nom_complet: string
    telephone: string
    email: string
  }
  chambres: {
    nom: string
    prix: number
    photo_url: string
  }
}

interface ReservationsListProps {
  clientId?: string
}

export default function ReservationsList({ clientId }: ReservationsListProps) {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchReservations() {
      try {
        const url = clientId ? `/api/reservations?clientId=${clientId}` : "/api/reservations"

        const response = await fetch(url)
        const data = await response.json()

        if (data.reservations) {
          setReservations(data.reservations)
        }
      } catch (error) {
        console.error("Erreur lors du chargement des réservations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchReservations()
  }, [clientId])

  // Fonction pour obtenir la couleur du badge selon le statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmé":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "En attente":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "Annulé":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="w-full">
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent className="pb-2">
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-20 w-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (reservations.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-gray-500">Aucune réservation trouvée.</p>
        <Button className="mt-4" variant="outline">
          Réserver maintenant
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {reservations.map((reservation) => (
        <Card key={reservation.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">{reservation.chambres.nom}</CardTitle>
              <Badge className={getStatusColor(reservation.statut)}>{reservation.statut}</Badge>
            </div>
            <CardDescription>
              Code de réservation: <span className="font-medium">{reservation.code_reservation}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative h-48 rounded-md overflow-hidden">
                <img
                  src={reservation.chambres.photo_url || "/placeholder.svg"}
                  alt={reservation.chambres.nom}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-slate-500" />
                  <div>
                    <p className="text-sm font-medium">Arrivée:</p>
                    <p>{format(new Date(reservation.date_arrivee), "PPP", { locale: fr })}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-slate-500" />
                  <div>
                    <p className="text-sm font-medium">Départ:</p>
                    <p>{format(new Date(reservation.date_depart), "PPP", { locale: fr })}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <BedDouble className="h-4 w-4 text-slate-500" />
                  <div>
                    <p className="text-sm font-medium">Chambre:</p>
                    <p>
                      {reservation.chambres.nom} - {reservation.chambres.prix}$ / nuit
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-500" />
                  <div>
                    <p className="text-sm font-medium">Réservé le:</p>
                    <p>{format(new Date(reservation.created_at), "PPP", { locale: fr })}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              Voir les détails
            </Button>
            {reservation.statut === "En attente" && (
              <Button variant="destructive" size="sm">
                Annuler
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
