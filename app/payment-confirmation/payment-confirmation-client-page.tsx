"use client"

import { Suspense } from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase"
import PaymentConfirmationClient from "./payment-confirmation-client"

export default function PaymentConfirmationPage({
  searchParams,
}: {
  searchParams: { payment_intent: string; payment_intent_client_secret: string; redirect_status: string }
}) {
  const { payment_intent, redirect_status } = searchParams

  if (!payment_intent || !redirect_status) {
    redirect("/")
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Confirmation de Paiement</h1>
      <Suspense fallback={<PaymentConfirmationSkeleton />}>
        <PaymentConfirmationContent paymentIntentId={payment_intent} status={redirect_status} />
      </Suspense>
    </main>
  )
}

async function PaymentConfirmationContent({ paymentIntentId, status }: { paymentIntentId: string; status: string }) {
  const supabase = createClient()

  if (!supabase) {
    return <div>Erreur de connexion à la base de données</div>
  }

  // Get payment details from the database
  const { data: payment, error: paymentError } = await supabase
    .from("paiements")
    .select("*, reservations(*)")
    .eq("reference", paymentIntentId)
    .single()

  // If payment not found in database, we'll use client-side fetching
  const useClientSideFetching = !payment || paymentError

  return (
    <PaymentConfirmationClient
      paymentIntentId={paymentIntentId}
      status={status}
      paymentData={payment || null}
      useClientSideFetching={useClientSideFetching}
    />
  )
}

function PaymentConfirmationSkeleton() {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="h-8 bg-gray-200 rounded mb-4"></div>
      <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-2 w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded mb-6 w-2/3"></div>
      <div className="h-10 bg-gray-200 rounded mb-4"></div>
      <div className="h-20 bg-gray-200 rounded"></div>
    </div>
  )
}
