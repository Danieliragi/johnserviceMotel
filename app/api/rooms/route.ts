import { NextResponse } from "next/server"
import { supabase, hasSupabaseCredentials } from "@/lib/supabase"

export async function GET() {
  try {
    // Check if Supabase credentials are available
    if (!hasSupabaseCredentials || !supabase) {
      return NextResponse.json({ error: "Supabase credentials not configured" }, { status: 503 })
    }

    const { data, error } = await supabase.from("chambres").select("*")

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ rooms: data })
  } catch (error) {
    console.error("Error fetching rooms:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nom, prix, capacite, description, photo_url, disponible = true } = body

    if (!nom || !prix || !capacite || !description || !photo_url) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("chambres")
      .insert([{ nom, prix, capacite, description, photo_url, disponible }])
      .select()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ room: data[0] }, { status: 201 })
  } catch (error) {
    console.error("Error creating room:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
