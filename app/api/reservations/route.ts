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
          reservations: [],
        },
        { status: 503 },
      )
    }

    const { data, error } = await supabase
      .from("reservations")
      .select("*, clients(nom, telephone), chambres(nom)")
      .order("date_arrivee", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message, reservations: [] }, { status: 500 })
    }

    return NextResponse.json({ reservations: data })
  } catch (error) {
    console.error("Error fetching reservations:", error)
    return NextResponse.json({ error: "Internal Server Error", reservations: [] }, { status: 500 })
  }
}
