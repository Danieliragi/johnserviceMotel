"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

type Room = {
  id: number
  name: string
  price: number
  room_type: string
  is_available: boolean
}

export default function RoomAvailability() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRooms() {
      try {
        const { data, error } = await supabase
          .from("rooms")
          .select("id, name, price, room_type, is_available")
          .eq("is_available", true)

        if (error) {
          throw new Error(error.message)
        }

        setRooms(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchRooms()
  }, [])

  if (loading) return <div>Chargement des chambres disponibles...</div>
  if (error) return <div>Erreur: {error}</div>
  if (rooms.length === 0) return <div>Aucune chambre disponible pour le moment.</div>

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Chambres disponibles</h3>
      <ul className="space-y-2">
        {rooms.map((room) => (
          <li key={room.id} className="p-4 border rounded-md">
            <div className="flex justify-between">
              <span className="font-medium">{room.name}</span>
              <span className="font-bold">{room.price}€ / nuit</span>
            </div>
            <div className="text-sm text-gray-600">{room.room_type}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
