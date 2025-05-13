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
import { MoreHorizontal, Search, Edit, Trash2, Plus, ImageIcon, BedDouble } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { supabase } from "@/lib/supabase"

type Room = {
  id: string
  nom: string
  description: string
  prix: number
  capacite: number
  disponible: boolean
  photo_url: string
}

const roomFormSchema = z.object({
  nom: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères.",
  }),
  description: z.string().min(10, {
    message: "La description doit contenir au moins 10 caractères.",
  }),
  prix: z.coerce.number().min(1, {
    message: "Le prix doit être supérieur à 0.",
  }),
  capacite: z.coerce.number().min(1, {
    message: "La capacité doit être d'au moins 1 personne.",
  }),
  photo_url: z.string().url({
    message: "Veuillez entrer une URL d'image valide.",
  }),
  disponible: z.boolean().default(true),
})

export function RoomsManager() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const form = useForm<z.infer<typeof roomFormSchema>>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: {
      nom: "",
      description: "",
      prix: 59,
      capacite: 2,
      photo_url: "",
      disponible: true,
    },
  })

  useEffect(() => {
    async function fetchRooms() {
      try {
        setLoading(true)
        const { data, error } = await supabase.from("chambres").select("*").order("prix", { ascending: true })

        if (error) {
          throw error
        }

        setRooms(data || [])
      } catch (error) {
        console.error("Error fetching rooms:", error)
        toast({
          title: "Erreur",
          description: "Impossible de charger les chambres. Veuillez réessayer.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchRooms()
  }, [])

  useEffect(() => {
    if (selectedRoom && isEditDialogOpen) {
      form.reset({
        nom: selectedRoom.nom,
        description: selectedRoom.description,
        prix: selectedRoom.prix,
        capacite: selectedRoom.capacite,
        photo_url: selectedRoom.photo_url,
        disponible: selectedRoom.disponible,
      })
    }
  }, [selectedRoom, isEditDialogOpen, form])

  const filteredRooms = rooms.filter(
    (room) =>
      room.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const onSubmit = async (values: z.infer<typeof roomFormSchema>) => {
    try {
      if (isEditDialogOpen && selectedRoom) {
        // Update existing room
        const { data, error } = await supabase
          .from("chambres")
          .update({
            nom: values.nom,
            description: values.description,
            prix: values.prix,
            capacite: values.capacite,
            photo_url: values.photo_url,
            disponible: values.disponible,
          })
          .eq("id", selectedRoom.id)
          .select()

        if (error) {
          throw error
        }

        setRooms(rooms.map((room) => (room.id === selectedRoom.id ? data[0] : room)))

        toast({
          title: "Chambre mise à jour",
          description: `La chambre "${values.nom}" a été mise à jour avec succès.`,
        })

        setIsEditDialogOpen(false)
      } else {
        // Add new room
        const { data, error } = await supabase
          .from("chambres")
          .insert([
            {
              nom: values.nom,
              description: values.description,
              prix: values.prix,
              capacite: values.capacite,
              photo_url: values.photo_url,
              disponible: values.disponible,
            },
          ])
          .select()

        if (error) {
          throw error
        }

        setRooms([...rooms, data[0]])

        toast({
          title: "Chambre ajoutée",
          description: `La chambre "${values.nom}" a été ajoutée avec succès.`,
        })

        setIsAddDialogOpen(false)
      }

      form.reset()
    } catch (error) {
      console.error("Error saving room:", error)
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder la chambre. Veuillez réessayer.",
        variant: "destructive",
      })
    }
  }

  const deleteRoom = async (id: string) => {
    try {
      const { error } = await supabase.from("chambres").delete().eq("id", id)

      if (error) {
        throw error
      }

      setRooms(rooms.filter((room) => room.id !== id))

      toast({
        title: "Chambre supprimée",
        description: `La chambre a été supprimée avec succès.`,
      })
    } catch (error) {
      console.error("Error deleting room:", error)
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la chambre. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsDeleteDialogOpen(false)
    }
  }

  const getAvailabilityBadge = (isAvailable: boolean) => {
    return isAvailable ? (
      <Badge className="bg-green-500">Disponible</Badge>
    ) : (
      <Badge className="bg-red-500">Indisponible</Badge>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher par nom, description..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          onClick={() => {
            form.reset()
            setIsAddDialogOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Ajouter une chambre
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Chargement des chambres...</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Capacité</TableHead>
                <TableHead>Disponibilité</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRooms.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    Aucune chambre trouvée.
                  </TableCell>
                </TableRow>
              ) : (
                filteredRooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell className="font-medium">{room.id.substring(0, 8)}...</TableCell>
                    <TableCell>{room.nom}</TableCell>
                    <TableCell>${room.prix}</TableCell>
                    <TableCell>{room.capacite} pers.</TableCell>
                    <TableCell>{getAvailabilityBadge(room.disponible)}</TableCell>
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
                              setSelectedRoom(room)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedRoom(room)
                              setIsDeleteDialogOpen(true)
                            }}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Supprimer
                          </DropdownMenuItem>
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

      {/* Add/Edit Room Dialog */}
      <Dialog
        open={isAddDialogOpen || isEditDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsAddDialogOpen(false)
            setIsEditDialogOpen(false)
          }
        }}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isEditDialogOpen ? "Modifier la chambre" : "Ajouter une nouvelle chambre"}</DialogTitle>
            <DialogDescription>
              {isEditDialogOpen
                ? "Modifiez les détails de la chambre ci-dessous."
                : "Remplissez les informations pour ajouter une nouvelle chambre."}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input placeholder="Chambre Standard 101" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="prix"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prix par nuit ($)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="capacite"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capacité (personnes)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="photo_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL de l'image</FormLabel>
                      <FormControl>
                        <div className="flex gap-2">
                          <Input placeholder="https://example.com/image.jpg" {...field} />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              // In a real implementation, this would open a media library
                              toast({
                                title: "Fonctionnalité à venir",
                                description: "La bibliothèque de médias sera disponible prochainement.",
                              })
                            }}
                          >
                            <ImageIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Description détaillée de la chambre..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="disponible"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Disponibilité</FormLabel>
                        <FormDescription>Définir si la chambre est disponible à la réservation.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAddDialogOpen(false)
                    setIsEditDialogOpen(false)
                  }}
                >
                  Annuler
                </Button>
                <Button type="submit">{isEditDialogOpen ? "Mettre à jour" : "Ajouter"}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Room Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Supprimer la chambre</DialogTitle>
            <DialogDescription>Êtes-vous sûr de vouloir supprimer cette chambre ?</DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2 py-3">
            <BedDouble className="h-6 w-6 text-red-500" />
            <p>
              La chambre "{selectedRoom?.nom}" (ID: {selectedRoom?.id.substring(0, 8)}...) sera définitivement
              supprimée. Cette action est irréversible.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={() => selectedRoom && deleteRoom(selectedRoom.id)} variant="destructive">
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
