import { NextResponse } from "next/server"
import { headers } from "next/headers"
import Stripe from "stripe"
import { createClient } from "@/lib/supabase"

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

// Webhook secret for verifying the event
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || ""

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("stripe-signature") || ""

  let event: Stripe.Event

  try {
    // Verify the event came from Stripe
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret)
  } catch (err) {
    const error = err as Error
    console.error(`Webhook signature verification failed: ${error.message}`)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  const supabase = createClient()
  if (!supabase) {
    return NextResponse.json({ error: "Database connection failed" }, { status: 500 })
  }

  // Handle the event
  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`)

        // Update reservation status
        if (paymentIntent.metadata.reservationId) {
          await supabase
            .from("reservations")
            .update({ statut: "confirme", payment_status: "paid" })
            .eq("id", paymentIntent.metadata.reservationId)

          // Log the payment in the payments table
          await supabase.from("paiements").insert({
            reservation_id: paymentIntent.metadata.reservationId,
            montant: paymentIntent.amount / 100, // Convert from cents to dollars
            date_paiement: new Date().toISOString(),
            methode: "carte-visa",
            statut: "complete",
            reference: paymentIntent.id,
            details: JSON.stringify(paymentIntent),
          })

          // Log the payment in analytics
          await supabase.from("payment_analytics").insert({
            payment_method: "carte-visa",
            amount: paymentIntent.amount / 100,
            status: "success",
            currency: paymentIntent.currency,
            timestamp: new Date().toISOString(),
          })
        }
        break

      case "payment_intent.payment_failed":
        const failedPaymentIntent = event.data.object as Stripe.PaymentIntent
        console.log(`Payment failed: ${failedPaymentIntent.last_payment_error?.message}`)

        // Update reservation status
        if (failedPaymentIntent.metadata.reservationId) {
          await supabase
            .from("reservations")
            .update({ payment_status: "failed" })
            .eq("id", failedPaymentIntent.metadata.reservationId)

          // Log the failed payment in analytics
          await supabase.from("payment_analytics").insert({
            payment_method: "carte-visa",
            amount: failedPaymentIntent.amount / 100,
            status: "failed",
            currency: failedPaymentIntent.currency,
            error_message: failedPaymentIntent.last_payment_error?.message || "Unknown error",
            timestamp: new Date().toISOString(),
          })
        }
        break

      case "charge.refunded":
        const refund = event.data.object as Stripe.Charge
        console.log(`Charge refunded: ${refund.id}`)

        // Update payment status
        await supabase.from("paiements").update({ statut: "refunded" }).eq("reference", refund.payment_intent)

        // Log the refund in analytics
        await supabase.from("payment_analytics").insert({
          payment_method: "carte-visa",
          amount: refund.amount_refunded / 100,
          status: "refunded",
          currency: refund.currency,
          timestamp: new Date().toISOString(),
        })
        break

      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error(`Error processing webhook: ${error}`)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
