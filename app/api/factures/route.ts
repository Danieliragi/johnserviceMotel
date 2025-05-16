import { NextResponse } from "next/server"
import { getSupabaseClient } from "@/lib/supabase"
import { generateInvoiceNumber } from "@/lib/invoice-utils"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const clientId = searchParams.get("clientId")
    const paiementId = searchParams.get("paiementId")
    const statut = searchParams.get("statut")

    const supabase = getSupabaseClient()

    if (!supabase) {
      return NextResponse.json(
        {
          error: "Supabase client is not initialized. Please check your environment variables.",
          factures: [],
        },
        { status: 503 },
      )
    }

    let query = supabase
      .from("factures")
      .select("*, clients(nom_complet, email), paiements(mode_paiement, reservation_id)")
      .order("date_emission", { ascending: false })

    // Appliquer les filtres si présents
    if (clientId) {
      query = query.eq("client_id", clientId)
    }

    if (paiementId) {
      query = query.eq("paiement_id", paiementId)
    }

    if (statut) {
      query = query.eq("statut", statut)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message, factures: [] }, { status: 500 })
    }

    return NextResponse.json({ factures: data })
  } catch (error) {
    console.error("Error fetching factures:", error)
    return NextResponse.json({ error: "Internal Server Error", factures: [] }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseClient()

    if (!supabase) {
      return NextResponse.json({ error: "Supabase client is not initialized." }, { status: 503 })
    }

    const body = await request.json()

    // Vérifier que tous les champs requis sont présents
    if (!body.paiement_id || !body.montant_total || !body.devise || !body.type_service || !body.client_id) {
      return NextResponse.json({ error: "Tous les champs requis doivent être fournis" }, { status: 400 })
    }

    // Générer un numéro de facture unique si non fourni
    const numeroFacture = body.numero_facture || (await generateInvoiceNumber())

    // Créer la facture
    const { data, error } = await supabase
      .from("factures")
      .insert({
        paiement_id: body.paiement_id,
        numero_facture: numeroFacture,
        date_emission: body.date_emission || new Date().toISOString(),
        montant_total: body.montant_total,
        devise: body.devise,
        type_service: body.type_service,
        client_id: body.client_id,
        statut: body.statut || "Payée",
        lien_pdf: body.lien_pdf || null,
      })
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ facture: data[0] })
  } catch (error) {
    console.error("Error creating facture:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
