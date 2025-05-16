import { NextResponse } from "next/server"
import Stripe from "stripe"

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { amount, currency = "usd", reservationId, reservationCode, checkIn, checkOut } = body

    // Validate the amount
    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount. Amount must be greater than 0." }, { status: 400 })
    }

    // Create a PaymentIntent with the specified amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        reservationId,
        reservationCode,
        checkIn,
        checkOut,
      },
    })

    // Return the client secret to the client
    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error("Error creating payment intent:", error)
    return NextResponse.json({ error: "Error creating payment intent" }, { status: 500 })
  }
}
