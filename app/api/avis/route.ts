import { NextResponse } from "next/server"
import { getSupabaseClient } from "@/lib/supabase"

export async function GET() {
  try {
    const supabase = getSupabaseClient()

    // Check if supabase client is available
    if (!supabase) {
      return NextResponse.json(
        {
          error: "Supabase client is not initialized. Please check your environment variables.",
          avis: [],
        },
        { status: 503 },
      )
    }

    // Mise à jour de la requête pour inclure service_type et statut
    const { data, error } = await supabase
      .from("avis")
      .select("*, clients(nom)")
      .eq("statut", "publier") // Ne récupérer que les avis publiés
      .order("date", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message, avis: [] }, { status: 500 })
    }

    return NextResponse.json({ avis: data })
  } catch (error) {
    console.error("Error fetching avis:", error)
    return NextResponse.json({ error: "Internal Server Error", avis: [] }, { status: 500 })
  }
}

// Ajouter une méthode POST pour soumettre de nouveaux avis
export async function POST(request: Request) {
  try {
    const supabase = getSupabaseClient()
    const body = await request.json()

    if (!supabase) {
      return NextResponse.json({ error: "Supabase client is not initialized." }, { status: 503 })
    }

    const { data, error } = await supabase
      .from("avis")
      .insert({
        client_id: body.client_id,
        service_type: body.service_type,
        note: body.note,
        commentaire: body.commentaire,
        date: new Date().toISOString(),
        statut: "en attente", // Par défaut, les avis sont en attente de modération
      })
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ avis: data[0] })
  } catch (error) {
    console.error("Error creating avis:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
