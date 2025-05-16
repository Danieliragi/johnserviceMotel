import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase"
import ReservationDetails from "@/components/client/reservation-details"

interface ReservationPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ReservationPageProps): Promise<Metadata> {
  const supabase = getSupabaseClient()

  if (!supabase) {
    return {
      title: "Réservation | John Services Motel",
    }
  }

  const { data } = await supabase.from("reservations").select("code_reservation").eq("id", params.id).single()

  return {
    title: data ? `Réservation ${data.code_reservation} | John Services Motel` : "Réservation | John Services Motel",
  }
}

export default async function ReservationPage({ params }: ReservationPageProps) {
  const supabase = getSupabaseClient()

  if (!supabase) {
    return <div>Erreur de connexion à la base de données</div>
  }

  const { data, error } = await supabase
    .from("reservations")
    .select("*, clients(nom_complet, telephone, email), chambres(nom, prix, photo_url)")
    .eq("id", params.id)
    .single()

  if (error || !data) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Détails de la Réservation</h1>
      <ReservationDetails reservation={data} />
    </main>
  )
}
