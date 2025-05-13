"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, MoreHorizontal, Search, Eye, CheckCheck, X, AlertTriangle, CreditCard } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

type Reservation = {
  id: string
  client_id: string
  chambre_id: string
  date_arrivee: string
  date_depart: string
  statut: "Confirmé" | "En attente" | "Annulé"
  moyen_paiement: "Cash" | "Mobile Money" | "Carte"
  code_reservation: string
  client: {
    nom: string
    telephone: string
    email: string | null
    localisation: string
  }
  chambre: {
    nom: string
  }
}

export function ReservationsTable() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)

  useEffect(() => {
    async function fetchReservations() {
      try {
        // In a real implementation, this would be an actual Supabase query
        // For now, we'll use mock data

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        const mockReservations: Reservation[] = [
          {
            id: "1",
            client_id: "101",
            chambre_id: "201",
            date_arrivee: "2023-06-15",
            date_depart: "2023-06-17",
            statut: "Confirmé",
            moyen_paiement: "Cash",
            code_reservation: "MOT-123456",
            client: {
              nom: "Jean Dupont",
              telephone: "+243 123 456 789",
              email: "jean.dupont@example.com",
              localisation: "Bukavu",
            },
            chambre: {
              nom: "Chambre Standard",
            },
          },
          {
            id: "2",
            client_id: "102",
            chambre_id: "202",
            date_arrivee: "2023-06-20",
            date_depart: "2023-06-25",
            statut: "En attente",
            moyen_paiement: "Mobile Money",
            code_reservation: "MOT-234567",
            client: {
              nom: "Marie Lambert",
              telephone: "+243 234 567 890",
              email: null,
              localisation: "Kinshasa",
            },
            chambre: {
              nom: "Chambre Familiale",
            },
          },
          {
            id: "3",
            client_id: "103",
            chambre_id: "203",
            date_arrivee: "2023-07-01",
            date_depart: "2023-07-03",
            statut: "Annulé",
            moyen_paiement: "Carte",
            code_reservation: "MOT-345678",
            client: {
              nom: "Pierre Martin",
              telephone: "+243 345 678 901",
              email: "pierre.martin@example.com",
              localisation: "Goma",
            },
            chambre: {
              nom: "Chambre Premium",
            },
          },
        ]

        setReservations(mockReservations)
      } catch (error) {
        console.error("Error fetching reservations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchReservations()
  }, [])

  const filteredReservations = reservations.filter(
    (reservation) =>
      reservation.client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.client.telephone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.chambre.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.code_reservation.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const confirmReservation = async (id: string) => {
    try {
      // In a real implementation, this would update the reservation in Supabase
      setReservations(reservations.map((res) => (res.id === id ? { ...res, statut: "Confirmé" } : res)))

      toast({
        title: "Réservation confirmée",
        description: `La réservation #${id} a été confirmée avec succès.`,
      })
    } catch (error) {
      console.error("Error confirming reservation:", error)
      toast({
        title: "Erreur",
        description: "Impossible de confirmer la réservation. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setConfirmDialogOpen(false)
    }
  }

  const cancelReservation = async (id: string) => {
    try {
      // In a real implementation, this would update the reservation in Supabase
      setReservations(reservations.map((res) => (res.id === id ? { ...res, statut: "Annulé" } : res)))

      toast({
        title: "Réservation annulée",
        description: `La réservation #${id} a été annulée avec succès.`,
      })
    } catch (error) {
      console.error("Error cancelling reservation:", error)
      toast({
        title: "Erreur",
        description: "Impossible d'annuler la réservation. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setCancelDialogOpen(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Confirmé":
        return <Badge className="bg-green-500">Confirmée</Badge>
      case "En attente":
        return <Badge className="bg-yellow-500">En attente</Badge>
      case "Annulé":
        return <Badge className="bg-red-500">Annulée</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "Cash":
        return <span className="flex items-center gap-1">💵 Cash</span>
      case "Mobile Money":
        return <span className="flex items-center gap-1">📱 Mobile Money</span>
      case "Carte":
        return (
          <span className="flex items-center gap-1">
            <CreditCard className="h-4 w-4" /> Carte
          </span>
        )
      default:
        return method
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher par nom, téléphone, code..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">Exporter</Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Chargement des réservations...</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Chambre</TableHead>
                <TableHead>Arrivée</TableHead>
                <TableHead>Départ</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Paiement</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReservations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    Aucune réservation trouvée.
                  </TableCell>
                </TableRow>
              ) : (
                filteredReservations.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell className="font-medium">{reservation.code_reservation}</TableCell>
                    <TableCell>{reservation.client.nom}</TableCell>
                    <TableCell>{reservation.chambre.nom}</TableCell>
                    <TableCell>{format(new Date(reservation.date_arrivee), "dd MMM yyyy", { locale: fr })}</TableCell>
                    <TableCell>{format(new Date(reservation.date_depart), "dd MMM yyyy", { locale: fr })}</TableCell>
                    <TableCell>{getStatusBadge(reservation.statut)}</TableCell>
                    <TableCell>{getPaymentMethodIcon(reservation.moyen_paiement)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Ouvrir le menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedReservation(reservation)
                              setViewDialogOpen(true)
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Voir les détails
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {reservation.statut === "En attente" && (
                            <>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedReservation(reservation)
                                  setConfirmDialogOpen(true)
                                }}
                              >
                                <CheckCheck className="mr-2 h-4 w-4" />
                                Confirmer
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedReservation(reservation)
                                  setCancelDialogOpen(true)
                                }}
                                className="text-red-600"
                              >
                                <X className="mr-2 h-4 w-4" />
                                Annuler
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* View Reservation Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Détails de la réservation {selectedReservation?.code_reservation}</DialogTitle>
            <DialogDescription>Informations complètes sur la réservation.</DialogDescription>
          </DialogHeader>
          {selectedReservation && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">Client</p>
                  <p className="text-sm">{selectedReservation.client.nom}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Statut</p>
                  <p>{getStatusBadge(selectedReservation.statut)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Téléphone</p>
                  <p className="text-sm">{selectedReservation.client.telephone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Localisation</p>
                  <p className="text-sm">{selectedReservation.client.localisation}</p>
                </div>
                {selectedReservation.client.email && (
                  <div className="col-span-2">
                    <p className="text-sm font-medium mb-1">Email</p>
                    <p className="text-sm">{selectedReservation.client.email}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium mb-1">Type de chambre</p>
                  <p className="text-sm">{selectedReservation.chambre.nom}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Moyen de paiement</p>
                  <p className="text-sm">{getPaymentMethodIcon(selectedReservation.moyen_paiement)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Arrivée</p>
                  <p className="text-sm">
                    {format(new Date(selectedReservation.date_arrivee), "dd MMMM yyyy", { locale: fr })}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Départ</p>
                  <p className="text-sm">
                    {format(new Date(selectedReservation.date_depart), "dd MMMM yyyy", { locale: fr })}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium mb-1">Code de réservation</p>
                  <p className="text-sm font-mono bg-gray-100 p-2 rounded">{selectedReservation.code_reservation}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Reservation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmer la réservation</DialogTitle>
            <DialogDescription>Êtes-vous sûr de vouloir confirmer cette réservation ?</DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2 py-3">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <p>
              La réservation {selectedReservation?.code_reservation} pour {selectedReservation?.client.nom} sera
              confirmée.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
              Annuler
            </Button>
            <Button
              onClick={() => selectedReservation && confirmReservation(selectedReservation.id)}
              className="bg-green-600 hover:bg-green-700"
            >
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Reservation Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Annuler la réservation</DialogTitle>
            <DialogDescription>Êtes-vous sûr de vouloir annuler cette réservation ?</DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2 py-3">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <p>
              La réservation {selectedReservation?.code_reservation} pour {selectedReservation?.client.nom} sera
              annulée. Cette action est irréversible.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
              Retour
            </Button>
            <Button
              onClick={() => selectedReservation && cancelReservation(selectedReservation.id)}
              variant="destructive"
            >
              Annuler la réservation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
