import { NextResponse } from "next/server"
import { getSupabaseClient } from "@/lib/supabase"
import { verifierDisponibiliteChambre, generateReservationCode } from "@/lib/reservation-utils"
import { sendReservationConfirmationEmail } from "@/lib/email-service"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const clientId = searchParams.get("clientId")
    const chambreId = searchParams.get("chambreId")
    const statut = searchParams.get("statut")

    const supabase = getSupabaseClient()

    if (!supabase) {
      return NextResponse.json(
        {
          error: "Supabase client is not initialized. Please check your environment variables.",
          reservations: [],
        },
        { status: 503 },
      )
    }

    let query = supabase
      .from("reservations")
      .select("*, clients(nom_complet, telephone, email), chambres(nom, prix, photo_url)")
      .order("date_arrivee", { ascending: false })

    // Appliquer les filtres si présents
    if (clientId) {
      query = query.eq("client_id", clientId)
    }

    if (chambreId) {
      query = query.eq("chambre_id", chambreId)
    }

    if (statut) {
      query = query.eq("statut", statut)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message, reservations: [] }, { status: 500 })
    }

    return NextResponse.json({ reservations: data })
  } catch (error) {
    console.error("Error fetching reservations:", error)
    return NextResponse.json({ error: "Internal Server Error", reservations: [] }, { status: 500 })
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
    if (!body.client_id || !body.chambre_id || !body.date_arrivee || !body.date_depart || !body.mode_paiement) {
      return NextResponse.json({ error: "Tous les champs requis doivent être fournis" }, { status: 400 })
    }

    // Vérifier la disponibilité avant de créer la réservation
    const estDisponible = await verifierDisponibiliteChambre(
      body.chambre_id,
      new Date(body.date_arrivee),
      new Date(body.date_depart),
    )

    if (!estDisponible) {
      return NextResponse.json({ error: "La chambre n'est pas disponible pour ces dates" }, { status: 400 })
    }

    // Générer un code de réservation unique
    const codeReservation = body.code_reservation || generateReservationCode()

    // Récupérer les informations du client pour l'email
    const { data: clientData, error: clientError } = await supabase
      .from("clients")
      .select("nom_complet, email")
      .eq("id", body.client_id)
      .single()

    if (clientError) {
      return NextResponse.json({ error: clientError.message }, { status: 500 })
    }

    // Récupérer les informations de la chambre pour l'email
    const { data: chambreData, error: chambreError } = await supabase
      .from("chambres")
      .select("nom, prix")
      .eq("id", body.chambre_id)
      .single()

    if (chambreError) {
      return NextResponse.json({ error: chambreError.message }, { status: 500 })
    }

    // Créer la réservation si la chambre est disponible
    const { data, error } = await supabase
      .from("reservations")
      .insert({
        client_id: body.client_id,
        chambre_id: body.chambre_id,
        date_arrivee: body.date_arrivee,
        date_depart: body.date_depart,
        statut: "attente", // Par défaut, les réservations sont en attente
        code_reservation: codeReservation,
        mode_paiement: body.mode_paiement,
      })
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Envoyer un email de confirmation avec le code de réservation
    await sendReservationConfirmationEmail({
      to: clientData.email,
      clientName: clientData.nom_complet,
      reservationCode: codeReservation,
      chambreName: chambreData.nom,
      dateArrivee: new Date(body.date_arrivee).toLocaleDateString("fr-FR"),
      dateDepart: new Date(body.date_depart).toLocaleDateString("fr-FR"),
      prix: chambreData.prix,
      modePaiement: body.mode_paiement,
    })

    return NextResponse.json({ reservation: data[0] })
  } catch (error) {
    console.error("Error creating reservation:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
