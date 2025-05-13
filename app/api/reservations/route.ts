import { NextResponse } from "next/server"
import { supabase, hasSupabaseCredentials } from "@/lib/supabase"

export async function GET() {
  try {
    // Check if Supabase credentials are available
    if (!hasSupabaseCredentials || !supabase) {
      return NextResponse.json({ error: "Supabase credentials not configured" }, { status: 503 })
    }

    const { data, error } = await supabase
      .from("reservations")
      .select("*, clients(nom, telephone), chambres(nom)")
      .order("date_arrivee", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ reservations: data })
  } catch (error) {
    console.error("Error fetching reservations:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { client_id, chambre_id, date_arrivee, date_depart, moyen_paiement } = body

    if (!client_id || !chambre_id || !date_arrivee || !date_depart || !moyen_paiement) {
      return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 })
    }

    // Générer un code de réservation unique
    const code_reservation = `MOT-${Math.floor(100000 + Math.random() * 900000)}`

    const { data, error } = await supabase
      .from("reservations")
      .insert([
        {
          client_id,
          chambre_id,
          date_arrivee,
          date_depart,
          statut: "En attente",
          moyen_paiement,
          code_reservation,
        },
      ])
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ reservation: data[0] })
  } catch (error) {
    console.error("Error creating reservation:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
