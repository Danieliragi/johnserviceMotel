"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Calendar, CheckCircle, Clock, User } from "lucide-react"

interface Reservation {
  id: string
  roomType: string
  roomNumber: string
  guestName: string
  checkIn: Date
  checkOut: Date
  status: "confirmed" | "pending" | "cancelled"
  guestCount: number
  totalPrice: number
}

const mockReservations: Reservation[] = [
  {
    id: "res-1",
    roomType: "Premium",
    roomNumber: "201",
    guestName: "Jean Dupont",
    checkIn: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
    checkOut: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // 5 days from now
    status: "confirmed",
    guestCount: 2,
    totalPrice: 450,
  },
  {
    id: "res-2",
    roomType: "Familiale",
    roomNumber: "105",
    guestName: "Famille Martin",
    checkIn: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days from now
    checkOut: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days from now
    status: "confirmed",
    guestCount: 4,
    totalPrice: 680,
  },
  {
    id: "res-3",
    roomType: "Standard",
    roomNumber: "304",
    guestName: "Sophie Bernard",
    checkIn: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1), // 1 day from now
    checkOut: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days from now
    status: "pending",
    guestCount: 1,
    totalPrice: 210,
  },
  {
    id: "res-4",
    roomType: "Premium",
    roomNumber: "205",
    guestName: "Thomas Dubois",
    checkIn: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4), // 4 days from now
    checkOut: new Date(Date.now() + 1000 * 60 * 60 * 24 * 6), // 6 days from now
    status: "confirmed",
    guestCount: 2,
    totalPrice: 380,
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "confirmed":
      return <Badge className="bg-primary text-primary-foreground">Confirmée</Badge>
    case "pending":
      return <Badge variant="warning">En attente</Badge>
    case "cancelled":
      return <Badge variant="destructive">Annulée</Badge>
    default:
      return <Badge variant="outline">Inconnue</Badge>
  }
}

export function UpcomingReservations() {
  const formatDate = (date: Date) => {
    return format(date, "d MMM", { locale: fr })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Réservations à venir</CardTitle>
        <CardDescription>Les prochaines arrivées prévues</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {mockReservations.map((reservation) => (
            <div key={reservation.id} className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{reservation.guestName}</p>
                    <p className="text-xs text-muted-foreground">
                      Chambre {reservation.roomType} #{reservation.roomNumber}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">{getStatusBadge(reservation.status)}</div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs sm:grid-cols-4">
                <div className="flex items-center gap-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {formatDate(reservation.checkIn)} - {formatDate(reservation.checkOut)}
                  </span>
                </div>
                <div className="flex items-center gap-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {Math.round(
                      (reservation.checkOut.getTime() - reservation.checkIn.getTime()) / (1000 * 60 * 60 * 24),
                    )}{" "}
                    nuits
                  </span>
                </div>
                <div className="flex items-center gap-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {reservation.guestCount} personne{reservation.guestCount > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center gap-x-2">
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  <span>{formatPrice(reservation.totalPrice)}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  Détails
                </Button>
                <Button variant="outline" size="sm">
                  Contacter
                </Button>
                {reservation.status === "pending" && (
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Confirmer
                  </Button>
                )}
              </div>
              <hr className="my-2" />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Voir toutes les réservations
        </Button>
      </CardFooter>
    </Card>
  )
}
