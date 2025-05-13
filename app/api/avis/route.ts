import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    // Check if supabase is properly initialized
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json({ error: "Supabase configuration is missing" }, { status: 503 })
    }

    const { data, error } = await supabase.from("avis").select("*, clients(nom)").order("date", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ avis: data })
  } catch (error) {
    console.error("Error fetching avis:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
