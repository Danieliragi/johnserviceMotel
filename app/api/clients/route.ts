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
          clients: [],
        },
        { status: 503 },
      )
    }

    const { data, error } = await supabase.from("clients").select("*").order("nom", { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message, clients: [] }, { status: 500 })
    }

    return NextResponse.json({ clients: data })
  } catch (error) {
    console.error("Error fetching clients:", error)
    return NextResponse.json({ error: "Internal Server Error", clients: [] }, { status: 500 })
  }
}
