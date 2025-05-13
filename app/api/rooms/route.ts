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
          rooms: [],
        },
        { status: 503 },
      )
    }

    const { data, error } = await supabase.from("chambres").select("*").order("prix", { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message, rooms: [] }, { status: 500 })
    }

    return NextResponse.json({ rooms: data })
  } catch (error) {
    console.error("Error fetching rooms:", error)
    return NextResponse.json({ error: "Internal Server Error", rooms: [] }, { status: 500 })
  }
}
