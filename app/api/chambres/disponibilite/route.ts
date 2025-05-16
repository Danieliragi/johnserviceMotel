import { NextResponse } from "next/server"
import { verifierDisponibiliteChambre, getDatesIndisponibles } from "@/lib/reservation-utils"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const chambreId = searchParams.get("chambreId")
    const dateArrivee = searchParams.get("dateArrivee")
    const dateDepart = searchParams.get("dateDepart")

    // Si on demande juste les dates indisponibles
    if (chambreId && !dateArrivee && !dateDepart) {
      const datesIndisponibles = await getDatesIndisponibles(chambreId)
      return NextResponse.json({ datesIndisponibles })
    }

    // Si on vérifie la disponibilité pour des dates spécifiques
    if (chambreId && dateArrivee && dateDepart) {
      const estDisponible = await verifierDisponibiliteChambre(chambreId, new Date(dateArrivee), new Date(dateDepart))

      return NextResponse.json({ disponible: estDisponible })
    }

    return NextResponse.json({ error: "Paramètres manquants ou invalides" }, { status: 400 })
  } catch (error) {
    console.error("Erreur lors de la vérification de disponibilité:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
