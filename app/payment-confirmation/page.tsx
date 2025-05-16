import PaymentConfirmationClientPage from "./payment-confirmation-client-page"

export const metadata = {
  title: "Confirmation de Paiement | John Services Motel",
  description: "Confirmation de votre paiement et détails de votre réservation",
}

export default function PaymentConfirmationPage({
  searchParams,
}: {
  searchParams: { payment_intent: string; payment_intent_client_secret: string; redirect_status: string }
}) {
  return <PaymentConfirmationClientPage searchParams={searchParams} />
}
