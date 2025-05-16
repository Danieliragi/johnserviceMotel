import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const paymentIntentId = params.id

    const supabase = createClient()
    if (!supabase) {
      return NextResponse.json({ error: "Database connection failed" }, { status: 500 })
    }

    // Try to get payment from database first
    const { data: payment, error } = await supabase
      .from("paiements")
      .select("*, reservations(*)")
      .eq("reference", paymentIntentId)
      .single()

    if (payment) {
      return NextResponse.json({ payment })
    }

    // If not in database, fetch from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (!paymentIntent) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 })
    }

    // Create a simplified payment object
    const simplifiedPayment = {
      id: paymentIntentId,
      montant: paymentIntent.amount / 100, // Convert from cents to dollars
      date_paiement: new Date(paymentIntent.created * 1000).toISOString(),
      methode: "carte-visa",
      statut: paymentIntent.status === "succeeded" ? "complete" : paymentIntent.status,
      reference: paymentIntentId,
      reservations: {
        id: paymentIntent.metadata.reservationId || "unknown",
        code_reservation: paymentIntent.metadata.reservationCode || "unknown",
        date_arrivee: paymentIntent.metadata.checkIn || new Date().toISOString(),
        date_depart: paymentIntent.metadata.checkOut || new Date().toISOString(),
      },
    }

    return NextResponse.json({ payment: simplifiedPayment })
  } catch (error) {
    console.error("Error fetching payment:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
