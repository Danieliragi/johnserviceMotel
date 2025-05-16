import { NextResponse } from "next/server"
import { getSupabaseClient } from "@/lib/supabase"

export async function GET() {
  try {
    const supabase = getSupabaseClient()

    if (!supabase) {
      return NextResponse.json(
        {
          error: "Supabase client is not initialized. Please check your environment variables.",
          paiements: [],
        },
        { status: 503 },
      )
    }

    const { data, error } = await supabase
      .from("paiements")
      .select("*, clients(nom), reservations(code_reservation)")
      .order("date_paiement", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message, paiements: [] }, { status: 500 })
    }

    return NextResponse.json({ paiements: data })
  } catch (error) {
    console.error("Error fetching paiements:", error)
    return NextResponse.json({ error: "Internal Server Error", paiements: [] }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseClient()
    const body = await request.json()

    if (!supabase) {
      return NextResponse.json({ error: "Supabase client is not initialized." }, { status: 503 })
    }

    const { data, error } = await supabase
      .from("paiements")
      .insert({
        client_id: body.client_id,
        reservation_id: body.reservation_id,
        type: body.type,
        montant: body.montant,
        mode_paiement: body.mode_paiement,
        date_paiement: new Date().toISOString(),
      })
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ paiement: data[0] })
  } catch (error) {
    console.error("Error creating paiement:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
