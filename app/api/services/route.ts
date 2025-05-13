import { NextResponse } from "next/server"
import { supabase, hasSupabaseCredentials } from "@/lib/supabase"

export async function GET() {
  try {
    // Check if Supabase credentials are available
    if (!hasSupabaseCredentials) {
      return NextResponse.json({ error: "Supabase credentials not configured" }, { status: 503 })
    }

    const { data, error } = await supabase.from("services").select("*")

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ services: data })
  } catch (error) {
    console.error("Error fetching services:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
