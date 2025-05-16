import { NextResponse } from "next/server"
import { getSupabaseClient } from "@/lib/supabase"
import { sendReservationStatusUpdateEmail } from "@/lib/email-service"

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
      .from("reservations")
      .select("*, clients(nom_complet, telephone, email), chambres(nom, prix, photo_url)")
      .eq("id", params.id)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: "Réservation non trouvée" }, { status: 404 })
    }

    return NextResponse.json({ reservation: data })
  } catch (error) {
    console.error("Error fetching reservation:", error)
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
      return NextResponse.json({ error: "ID de réservation invalide" }, { status: 400 })
    }

    // Récupérer la réservation actuelle pour vérifier si le statut a changé
    const { data: currentReservation, error: fetchError } = await supabase
      .from("reservations")
      .select("statut, client_id")
      .eq("id", params.id)
      .single()

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 })
    }

    // Mettre à jour la réservation
    const { data, error } = await supabase.from("reservations").update(body).eq("id", params.id).select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (data.length === 0) {
      return NextResponse.json({ error: "Réservation non trouvée" }, { status: 404 })
    }

    // Si le statut a changé, envoyer un email de notification
    if (body.statut && body.statut !== currentReservation.statut) {
      // Récupérer les informations du client pour l'email
      const { data: clientData, error: clientError } = await supabase
        .from("clients")
        .select("nom_complet, email")
        .eq("id", currentReservation.client_id)
        .single()

      if (!clientError && clientData) {
        // Récupérer les détails complets de la réservation mise à jour
        const { data: updatedReservation, error: reservationError } = await supabase
          .from("reservations")
          .select("*, chambres(nom)")
          .eq("id", params.id)
          .single()

        if (!reservationError && updatedReservation) {
          await sendReservationStatusUpdateEmail({
            to: clientData.email,
            clientName: clientData.nom_complet,
            reservationCode: updatedReservation.code_reservation,
            chambreName: updatedReservation.chambres.nom,
            dateArrivee: new Date(updatedReservation.date_arrivee).toLocaleDateString("fr-FR"),
            dateDepart: new Date(updatedReservation.date_depart).toLocaleDateString("fr-FR"),
            nouveauStatut: body.statut,
          })
        }
      }
    }

    return NextResponse.json({ reservation: data[0] })
  } catch (error) {
    console.error("Error updating reservation:", error)
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
      return NextResponse.json({ error: "ID de réservation invalide" }, { status: 400 })
    }

    // Supprimer la réservation
    const { error } = await supabase.from("reservations").delete().eq("id", params.id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting reservation:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
