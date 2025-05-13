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

    const { data, error } = await supabase.from("avis").select("*, clients(nom)").order("date", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message, avis: [] }, { status: 500 })
    }

    return NextResponse.json({ avis: data })
  } catch (error) {
    console.error("Error fetching avis:", error)
    return NextResponse.json({ error: "Internal Server Error", avis: [] }, { status: 500 })
  }
}
