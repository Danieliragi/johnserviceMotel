import { getSupabaseClient } from "./supabase"

/**
 * Vérifie si une chambre est disponible pour une période donnée
 * @param chambreId Identifiant de la chambre
 * @param dateArrivee Date d'arrivée
 * @param dateDepart Date de départ
 * @returns true si la chambre est disponible, false sinon
 */
export async function verifierDisponibiliteChambre(
  chambreId: string,
  dateArrivee: Date,
  dateDepart: Date,
): Promise<boolean> {
  const supabase = getSupabaseClient()

  if (!supabase) {
    throw new Error("Client Supabase non initialisé")
  }

  // Convertir les dates en format ISO pour la requête
  const dateArriveeStr = dateArrivee.toISOString()
  const dateDepartStr = dateDepart.toISOString()

  // Vérifier s'il existe des réservations qui se chevauchent pour cette chambre
  const { data, error } = await supabase
    .from("reservations")
    .select("id")
    .eq("chambre_id", chambreId)
    .not("statut", "eq", "Annulé") // Exclure les réservations annulées
    .or(`date_arrivee.lt.${dateDepartStr},date_depart.gt.${dateArriveeStr}`)

  if (error) {
    console.error("Erreur lors de la vérification de disponibilité:", error)
    throw error
  }

  // La chambre est disponible s'il n'y a pas de réservations qui se chevauchent
  return data.length === 0
}

/**
 * Génère un code de réservation unique
 * @returns Code de réservation au format "RES-XXXXX"
 */
export function generateReservationCode(): string {
  const randomPart = Math.floor(10000 + Math.random() * 90000) // Nombre à 5 chiffres
  return `RES-${randomPart}`
}

/**
 * Récupère les dates indisponibles pour une chambre
 * @param chambreId Identifiant de la chambre
 * @returns Tableau de périodes indisponibles (objets avec dateArrivee et dateDepart)
 */
export async function getDatesIndisponibles(chambreId: string) {
  const supabase = getSupabaseClient()

  if (!supabase) {
    throw new Error("Client Supabase non initialisé")
  }

  const { data, error } = await supabase
    .from("reservations")
    .select("date_arrivee, date_depart")
    .eq("chambre_id", chambreId)
    .not("statut", "eq", "Annulé") // Exclure les réservations annulées

  if (error) {
    console.error("Erreur lors de la récupération des dates indisponibles:", error)
    throw error
  }

  return data.map((reservation) => ({
    dateArrivee: new Date(reservation.date_arrivee),
    dateDepart: new Date(reservation.date_depart),
  }))
}
