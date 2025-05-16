"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Loader2, Download, Home } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { generateReceipt } from "@/lib/receipt-generator"

interface PaymentData {
  id: string
  montant: number
  date_paiement: string
  methode: string
  statut: string
  reference: string
  reservations: {
    id: string
    code_reservation: string
    date_arrivee: string
    date_depart: string
    chambres: {
      nom: string
    }
  }
}

export default function PaymentConfirmationClient({
  paymentIntentId,
  status,
  paymentData,
  useClientSideFetching,
}: {
  paymentIntentId: string
  status: string
  paymentData: PaymentData | null
  useClientSideFetching: boolean
}) {
  const router = useRouter()
  const [payment, setPayment] = useState<PaymentData | null>(paymentData)
  const [loading, setLoading] = useState(useClientSideFetching)
  const [error, setError] = useState<string | null>(null)
  const [generatingReceipt, setGeneratingReceipt] = useState(false)

  useEffect(() => {
    if (useClientSideFetching) {
      const fetchPaymentDetails = async () => {
        try {
          const response = await fetch(`/api/payments/${paymentIntentId}`)
          if (!response.ok) {
            throw new Error("Impossible de récupérer les détails du paiement")
          }
          const data = await response.json()
          setPayment(data.payment)
        } catch (err) {
          setError(err instanceof Error ? err.message : "Une erreur est survenue")
        } finally {
          setLoading(false)
        }
      }

      fetchPaymentDetails()
    }
  }, [paymentIntentId, useClientSideFetching])

  const handleDownloadReceipt = async () => {
    if (!payment) return

    setGeneratingReceipt(true)
    try {
      const receiptUrl = await generateReceipt({
        paymentId: payment.id,
        amount: payment.montant,
        date: payment.date_paiement,
        reservationCode: payment.reservations.code_reservation,
        paymentMethod: payment.methode,
        checkIn: payment.reservations.date_arrivee,
        checkOut: payment.reservations.date_depart,
      })

      // Open receipt in new tab
      window.open(receiptUrl, "_blank")
    } catch (err) {
      console.error("Error generating receipt:", err)
      setError("Impossible de générer le reçu. Veuillez réessayer plus tard.")
    } finally {
      setGeneratingReceipt(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p>Chargement des détails du paiement...</p>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-2" />
          <CardTitle>Erreur</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button onClick={() => router.push("/")}>Retour à l'accueil</Button>
        </CardFooter>
      </Card>
    )
  }

  const isSuccess = status === "succeeded" || (payment && payment.statut === "complete")

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        {isSuccess ? (
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
        ) : (
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-2" />
        )}
        <CardTitle>{isSuccess ? "Paiement Réussi" : "Paiement Échoué"}</CardTitle>
        <CardDescription>
          {isSuccess
            ? "Votre paiement a été traité avec succès"
            : "Une erreur est survenue lors du traitement de votre paiement"}
        </CardDescription>
      </CardHeader>

      {payment && (
        <CardContent className="space-y-4">
          <div className="border-t border-b py-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Référence:</div>
              <div className="font-medium">{payment.reference.substring(0, 12)}...</div>

              <div className="text-muted-foreground">Montant:</div>
              <div className="font-medium">${payment.montant.toFixed(2)} USD</div>

              <div className="text-muted-foreground">Date:</div>
              <div className="font-medium">{format(new Date(payment.date_paiement), "PPP", { locale: fr })}</div>

              <div className="text-muted-foreground">Méthode:</div>
              <div className="font-medium">{payment.methode === "carte-visa" ? "Carte Bancaire" : "Mobile Money"}</div>

              {payment.reservations && (
                <>
                  <div className="text-muted-foreground">Réservation:</div>
                  <div className="font-medium">{payment.reservations.code_reservation}</div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      )}

      <CardFooter className="flex flex-col space-y-2">
        {isSuccess && payment && (
          <Button onClick={handleDownloadReceipt} className="w-full" disabled={generatingReceipt} variant="outline">
            {generatingReceipt ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Génération du reçu...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" /> Télécharger le reçu
              </>
            )}
          </Button>
        )}
        <Button onClick={() => router.push("/")} className="w-full">
          <Home className="mr-2 h-4 w-4" /> Retour à l'accueil
        </Button>
      </CardFooter>
    </Card>
  )
}
