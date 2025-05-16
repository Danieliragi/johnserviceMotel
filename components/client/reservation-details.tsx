"use client"

import { useState } from "react"
import { format, differenceInDays } from "date-fns"
import { fr } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CalendarDays, BedDouble, User, Phone, Mail, AlertTriangle, CreditCard } from "lucide-react"
import { useRouter } from "next/navigation"

type Reservation = {
  id: string
  client_id: string
  chambre_id: string
  date_arrivee: string
  date_depart: string
  statut: string
  code_reservation: string
  mode_paiement: string
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

interface ReservationDetailsProps {
  reservation: Reservation
}

export default function ReservationDetails({ reservation }: ReservationDetailsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Calculer le nombre de nuits
  const nombreNuits = differenceInDays(new Date(reservation.date_depart), new Date(reservation.date_arrivee))

  // Calculer le prix total
  const prixTotal = nombreNuits * reservation.chambres.prix

  // Fonction pour obtenir la couleur du badge selon le statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirme":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "attente":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "annule":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  // Fonction pour formater le statut pour l'affichage
  const formatStatus = (status: string) => {
    switch (status) {
      case "confirme":
        return "Confirmé"
      case "attente":
        return "En attente"
      case "annule":
        return "Annulé"
      default:
        return status
    }
  }

  // Fonction pour formater le mode de paiement pour l'affichage
  const formatPaymentMode = (mode: string) => {
    switch (mode) {
      case "cash":
        return "Cash"
      case "mobile money":
        return "Mobile Money"
      case "carte-visa":
        return "Carte Visa"
      case "paypal":
        return "PayPal"
      default:
        return mode
    }
  }

  // Fonction pour annuler la réservation
  const annulerReservation = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/reservations/${reservation.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ statut: "annule" }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de l'annulation de la réservation")
      }

      // Rediriger vers la page des réservations
      router.push("/reservations")
      router.refresh()
    } catch (error) {
      console.error("Erreur:", error)
    } finally {
      setIsLoading(false)
      setIsDialogOpen(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">{reservation.chambres.nom}</CardTitle>
            <Badge className={getStatusColor(reservation.statut)}>{formatStatus(reservation.statut)}</Badge>
          </div>
          <CardDescription>
            Code de réservation: <span className="font-medium">{reservation.code_reservation}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative h-64 rounded-md overflow-hidden">
              <img
                src={reservation.chambres.photo_url || "/placeholder.svg"}
                alt={reservation.chambres.nom}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="text-sm font-medium">Arrivée:</p>
                    <p>{format(new Date(reservation.date_arrivee), "PPP", { locale: fr })}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="text-sm font-medium">Départ:</p>
                    <p>{format(new Date(reservation.date_depart), "PPP", { locale: fr })}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <BedDouble className="h-5 w-5 text-slate-500" />
                <div>
                  <p className="text-sm font-medium">Chambre:</p>
                  <p>
                    {reservation.chambres.nom} - {reservation.chambres.prix}$ / nuit
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-slate-500" />
                <div>
                  <p className="text-sm font-medium">Mode de paiement:</p>
                  <p>{formatPaymentMode(reservation.mode_paiement)}</p>
                </div>
              </div>

              <div className="pt-2 border-t">
                <p className="text-sm font-medium">Durée du séjour:</p>
                <p className="text-lg">
                  {nombreNuits} nuit{nombreNuits > 1 ? "s" : ""}
                </p>
              </div>

              <div className="pt-2 border-t">
                <p className="text-sm font-medium">Prix total:</p>
                <p className="text-2xl font-bold">{prixTotal}$</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h3 className="text-lg font-medium mb-3">Informations du client</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-slate-500" />
                <div>
                  <p className="text-sm font-medium">Nom:</p>
                  <p>{reservation.clients.nom_complet}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-slate-500" />
                <div>
                  <p className="text-sm font-medium">Téléphone:</p>
                  <p>{reservation.clients.telephone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-slate-500" />
                <div>
                  <p className="text-sm font-medium">Email:</p>
                  <p>{reservation.clients.email}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/reservations")}>
            Retour aux réservations
          </Button>

          {reservation.statut === "attente" && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive">Annuler la réservation</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    Confirmer l'annulation
                  </DialogTitle>
                  <DialogDescription>
                    Êtes-vous sûr de vouloir annuler cette réservation ? Cette action est irréversible.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button variant="destructive" onClick={annulerReservation} disabled={isLoading}>
                    {isLoading ? "Annulation en cours..." : "Confirmer l'annulation"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
