"use client"

import { useState, useEffect } from "react"
import { getSupabaseClient } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SupabaseTest() {
  const [rooms, setRooms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRooms() {
      try {
        setLoading(true)
        const supabase = getSupabaseClient()

        if (!supabase) {
          throw new Error("Supabase client is not initialized. Please check your environment variables.")
        }

        const { data, error } = await supabase.from("chambres").select("*")

        if (error) {
          throw error
        }

        setRooms(data || [])
      } catch (err: any) {
        console.error("Error fetching rooms:", err)
        setError(err.message || "Failed to fetch rooms")
      } finally {
        setLoading(false)
      }
    }

    fetchRooms()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test de connexion Supabase</CardTitle>
        <CardDescription>Vérification de la connexion à la base de données</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Chargement des données...</p>
        ) : error ? (
          <div className="text-red-500">
            <p>Erreur: {error}</p>
            <p className="text-sm mt-2">Vérifiez vos variables d'environnement et la connexion à Supabase.</p>
          </div>
        ) : rooms.length === 0 ? (
          <p>Aucune chambre trouvée. Ajoutez des données à votre table chambres.</p>
        ) : (
          <div>
            <p className="text-green-500 mb-4">Connexion réussie! {rooms.length} chambres trouvées.</p>
            <ul className="space-y-2">
              {rooms.map((room) => (
                <li key={room.id} className="p-2 bg-slate-100 rounded">
                  {room.nom} - {room.prix}$ - {room.capacite} personnes
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
