import { NextResponse } from "next/server"
import { getSupabaseClient } from "@/lib/supabase"

// Ajoutez cette fonction de secours pour les cas où aucune chambre n'est trouvée
function getDefaultRooms() {
  return [
    {
      id: "default-standard",
      nom: "Chambre Standard",
      prix: 30,
      capacite: 2,
      disponible: true,
      description: "Chambre standard confortable avec lit queen size",
      photo_url: "/standard-room-1.jpeg",
    },
    {
      id: "default-deluxe",
      nom: "Chambre De Luxe",
      prix: 40,
      capacite: 2,
      disponible: true,
      description: "Chambre de luxe avec lit double et coin salon",
      photo_url: "/deluxe-room-1.jpeg",
    },
    {
      id: "default-vip",
      nom: "Chambre VIP",
      prix: 70,
      capacite: 2,
      disponible: true,
      description: "Chambre VIP avec lit double et décoration élégante",
      photo_url: "/vip1.jpeg",
    },
  ]
}

// Dans la fonction GET, ajoutez une gestion d'erreur améliorée:
export async function GET(request: Request) {
  const supabaseClient = getSupabaseClient()

  try {
    if (!supabaseClient) {
      console.error("Supabase client is not initialized.")
      return NextResponse.json(getDefaultRooms())
    }

    const { data, error } = await supabaseClient.from("chambres").select("*").order("prix", { ascending: true })

    if (error) {
      console.error("Erreur lors de la récupération des chambres:", error)
      // Retourner des données par défaut en cas d'erreur
      return NextResponse.json(getDefaultRooms())
    }

    if (!data || data.length === 0) {
      console.warn("Aucune chambre trouvée dans la base de données")
      // Retourner des données par défaut si aucune chambre n'est trouvée
      return NextResponse.json(getDefaultRooms())
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Exception lors de la récupération des chambres:", error)
    return NextResponse.json(getDefaultRooms())
  }
}
