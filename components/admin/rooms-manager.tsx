"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAppDispatch } from "@/lib/redux/hooks"
import { showToast } from "@/lib/redux/slices/uiSlice"
import { useGetRoomsQuery, useCreateRoomMutation, useUpdateRoomMutation, useDeleteRoomMutation } from "@/lib/redux/api"

export default function RoomsManager() {
  const dispatch = useAppDispatch()
  const { data: rooms, isLoading, refetch } = useGetRoomsQuery()
  const [createRoom, { isLoading: isCreating }] = useCreateRoomMutation()
  const [updateRoom, { isLoading: isUpdating }] = useUpdateRoomMutation()
  const [deleteRoom, { isLoading: isDeleting }] = useDeleteRoomMutation()

  const [selectedRoom, setSelectedRoom] = useState<any>(null)
  const [formData, setFormData] = useState({
    room_number: "",
    room_type: "",
    price_per_night: "",
    capacity: "",
    description: "",
    amenities: "",
    status: "available",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectRoom = (room: any) => {
    setSelectedRoom(room)
    setFormData({
      room_number: room.room_number,
      room_type: room.room_type,
      price_per_night: room.price_per_night.toString(),
      capacity: room.capacity.toString(),
      description: room.description || "",
      amenities: room.amenities || "",
      status: room.status,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const roomData = {
        room_number: formData.room_number,
        room_type: formData.room_type,
        price_per_night: Number.parseFloat(formData.price_per_night),
        capacity: Number.parseInt(formData.capacity),
        description: formData.description,
        amenities: formData.amenities,
        status: formData.status,
      }

      if (selectedRoom) {
        await updateRoom({ id: selectedRoom.id, ...roomData }).unwrap()
        dispatch(showToast({ message: "Chambre mise à jour avec succès", type: "success" }))
      } else {
        await createRoom(roomData).unwrap()
        dispatch(showToast({ message: "Chambre créée avec succès", type: "success" }))
      }

      // Reset form
      setSelectedRoom(null)
      setFormData({
        room_number: "",
        room_type: "",
        price_per_night: "",
        capacity: "",
        description: "",
        amenities: "",
        status: "available",
      })

      // Refresh rooms list
      refetch()
    } catch (error) {
      dispatch(
        showToast({
          message: "Erreur lors de l'enregistrement de la chambre",
          type: "error",
        }),
      )
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette chambre?")) {
      try {
        await deleteRoom(id).unwrap()
        dispatch(showToast({ message: "Chambre supprimée avec succès", type: "success" }))

        // Reset selected room if it was deleted
        if (selectedRoom && selectedRoom.id === id) {
          setSelectedRoom(null)
          setFormData({
            room_number: "",
            room_type: "",
            price_per_night: "",
            capacity: "",
            description: "",
            amenities: "",
            status: "available",
          })
        }

        // Refresh rooms list
        refetch()
      } catch (error) {
        dispatch(
          showToast({
            message: "Erreur lors de la suppression de la chambre",
            type: "error",
          }),
        )
      }
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{selectedRoom ? "Modifier la chambre" : "Ajouter une chambre"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="room_number">Numéro de chambre</Label>
                <Input
                  id="room_number"
                  name="room_number"
                  value={formData.room_number}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="room_type">Type de chambre</Label>
                <select
                  id="room_type"
                  name="room_type"
                  value={formData.room_type}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Sélectionner un type</option>
                  <option value="standard">Standard</option>
                  <option value="deluxe">Deluxe</option>
                  <option value="vip">VIP</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price_per_night">Prix par nuit (€)</Label>
                <Input
                  id="price_per_night"
                  name="price_per_night"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price_per_night}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacité</Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  min="1"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="amenities">Équipements</Label>
                <Textarea
                  id="amenities"
                  name="amenities"
                  rows={2}
                  value={formData.amenities}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Statut</Label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="available">Disponible</option>
                  <option value="occupied">Occupée</option>
                  <option value="maintenance">En maintenance</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              {selectedRoom && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setSelectedRoom(null)
                    setFormData({
                      room_number: "",
                      room_type: "",
                      price_per_night: "",
                      capacity: "",
                      description: "",
                      amenities: "",
                      status: "available",
                    })
                  }}
                >
                  Annuler
                </Button>
              )}
              <Button type="submit" disabled={isCreating || isUpdating}>
                {selectedRoom
                  ? isUpdating
                    ? "Mise à jour..."
                    : "Mettre à jour"
                  : isCreating
                    ? "Création..."
                    : "Ajouter"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Liste des chambres</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Chargement des chambres...</p>
          ) : rooms && rooms.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left">Numéro</th>
                    <th className="p-2 text-left">Type</th>
                    <th className="p-2 text-left">Prix</th>
                    <th className="p-2 text-left">Capacité</th>
                    <th className="p-2 text-left">Statut</th>
                    <th className="p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room) => (
                    <tr key={room.id} className="border-t">
                      <td className="p-2">{room.room_number}</td>
                      <td className="p-2">{room.room_type}</td>
                      <td className="p-2">{room.price_per_night}€</td>
                      <td className="p-2">{room.capacity}</td>
                      <td className="p-2">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            room.status === "available"
                              ? "bg-green-100 text-green-800"
                              : room.status === "occupied"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {room.status === "available"
                            ? "Disponible"
                            : room.status === "occupied"
                              ? "Occupée"
                              : "Maintenance"}
                        </span>
                      </td>
                      <td className="p-2">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleSelectRoom(room)}>
                            Modifier
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(room.id)}
                            disabled={isDeleting}
                          >
                            Supprimer
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Aucune chambre trouvée.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
