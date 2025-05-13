import { NextResponse } from "next/server"
import { supabase, hasSupabaseCredentials } from "@/lib/supabase"

export async function GET() {
  try {
    // Check if Supabase credentials are available
    if (!hasSupabaseCredentials || !supabase) {
      return NextResponse.json({ error: "Supabase credentials not configured" }, { status: 503 })
    }

    const { data, error } = await supabase.from("clients").select("*")

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ clients: data })
  } catch (error) {
    console.error("Error fetching clients:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // Check if Supabase credentials are available
    if (!hasSupabaseCredentials) {
      return NextResponse.json({ error: "Supabase credentials not configured" }, { status: 503 })
    }

    const body = await request.json()
    const { nom, telephone, email, localisation } = body

    if (!nom || !telephone || !localisation) {
      return NextResponse.json({ error: "Nom, téléphone et localisation sont requis" }, { status: 400 })
    }

    const { data, error } = await supabase.from("clients").insert([{ nom, telephone, email, localisation }]).select()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ client: data[0] }, { status: 201 })
  } catch (error) {
    console.error("Error creating client:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
