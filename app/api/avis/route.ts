import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
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
