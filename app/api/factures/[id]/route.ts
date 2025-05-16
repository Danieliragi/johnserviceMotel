import { NextResponse } from "next/server"
import { getSupabaseClient } from "@/lib/supabase"

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const supabase = getSupabaseClient()

    if (!supabase) {
      return NextResponse.json({ error: "Supabase client is not initialized." }, { status: 503 })
    }

    const { data, error } = await supabase
      .from("factures")
      .select("*, clients(nom_complet, email, telephone), paiements(mode_paiement, reservation_id, type)")
      .eq("id", params.id)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: "Facture non trouvée" }, { status: 404 })
    }

    return NextResponse.json({ facture: data })
  } catch (error) {
    console.error("Error fetching facture:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const supabase = getSupabaseClient()

    if (!supabase) {
      return NextResponse.json({ error: "Supabase client is not initialized." }, { status: 503 })
    }

    const body = await request.json()

    // Vérifier que l'ID est valide
    if (!params.id) {
      return NextResponse.json({ error: "ID de facture invalide" }, { status: 400 })
    }

    // Mettre à jour la facture
    const { data, error } = await supabase.from("factures").update(body).eq("id", params.id).select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (data.length === 0) {
      return NextResponse.json({ error: "Facture non trouvée" }, { status: 404 })
    }

    return NextResponse.json({ facture: data[0] })
  } catch (error) {
    console.error("Error updating facture:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const supabase = getSupabaseClient()

    if (!supabase) {
      return NextResponse.json({ error: "Supabase client is not initialized." }, { status: 503 })
    }

    // Vérifier que l'ID est valide
    if (!params.id) {
      return NextResponse.json({ error: "ID de facture invalide" }, { status: 400 })
    }

    // Supprimer la facture
    const { error } = await supabase.from("factures").delete().eq("id", params.id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting facture:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
