import { getSupabaseClient } from "@/lib/supabase"

/**
 * Génère un numéro de facture unique au format FAC-YYYY-XXXX
 * où YYYY est l'année en cours et XXXX est un numéro séquentiel
 */
export async function generateInvoiceNumber(): Promise<string> {
  const supabase = getSupabaseClient()

  if (!supabase) {
    throw new Error("Supabase client is not initialized")
  }

  const currentYear = new Date().getFullYear()

  // Récupérer la dernière facture de l'année en cours
  const { data, error } = await supabase
    .from("factures")
    .select("numero_facture")
    .like("numero_facture", `FAC-${currentYear}-%`)
    .order("numero_facture", { ascending: false })
    .limit(1)

  if (error) {
    console.error("Error fetching last invoice number:", error)
    throw new Error("Failed to generate invoice number")
  }

  let nextNumber = 1

  if (data && data.length > 0) {
    // Extraire le numéro séquentiel de la dernière facture
    const lastInvoiceNumber = data[0].numero_facture
    const match = lastInvoiceNumber.match(/FAC-\d{4}-(\d{4})/)

    if (match && match[1]) {
      nextNumber = Number.parseInt(match[1], 10) + 1
    }
  }

  // Formater le numéro séquentiel avec des zéros en préfixe
  const formattedNumber = nextNumber.toString().padStart(4, "0")

  return `FAC-${currentYear}-${formattedNumber}`
}

/**
 * Convertit un montant en format texte
 */
export function montantEnLettres(montant: number, devise: string): string {
  // Implémentation simplifiée - à améliorer selon les besoins
  const unites = ["", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"]
  const dizaines = [
    "",
    "dix",
    "vingt",
    "trente",
    "quarante",
    "cinquante",
    "soixante",
    "soixante-dix",
    "quatre-vingt",
    "quatre-vingt-dix",
  ]

  if (montant < 10) return unites[montant]
  if (montant < 100) {
    const unite = montant % 10
    const dizaine = Math.floor(montant / 10)
    return dizaines[dizaine] + (unite > 0 ? "-" + unites[unite] : "")
  }

  // Pour les montants plus élevés, on pourrait ajouter plus de logique
  return `${montant} ${devise}`
}

/**
 * Génère un lien PDF pour une facture (simulation)
 */
export function generatePdfLink(factureId: string): string {
  // Dans une implémentation réelle, cela pourrait appeler un service de génération de PDF
  return `/api/factures/${factureId}/pdf`
}

/**
 * Formate le type de service pour l'affichage
 */
export function formatServiceType(type: string): string {
  switch (type.toLowerCase()) {
    case "chambre":
      return "Hébergement"
    case "restaurant":
      return "Restauration"
    case "reunion":
    case "réunion":
      return "Salle de réunion"
    default:
      return type.charAt(0).toUpperCase() + type.slice(1)
  }
}
