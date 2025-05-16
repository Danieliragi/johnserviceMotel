"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, BedDouble, CreditCard } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { setAvailabilityDates } from "@/lib/redux/slices/roomsSlice"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/lib/database.types"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

export default function BookingForm() {
  const dispatch = useAppDispatch()
  const { toast } = useToast()
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()

  // Get state from Redux with safe fallbacks
  const roomsState = useAppSelector((state) => state.rooms)
  const availabilityDates = roomsState?.availabilityDates || { checkIn: null, checkOut: null }
  const authState = useAppSelector((state) => state.auth)
  const user = authState?.user || null

  const [checkIn, setCheckIn] = useState<Date | undefined>(
    availabilityDates.checkIn ? new Date(availabilityDates.checkIn) : undefined,
  )
  const [checkOut, setCheckOut] = useState<Date | undefined>(
    availabilityDates.checkOut ? new Date(availabilityDates.checkOut) : undefined,
  )
  const [adults, setAdults] = useState("2")
  const [children, setChildren] = useState("0")
  const [roomType, setRoomType] = useState("standard")
  const [nom, setNom] = useState("")
  const [countryCode, setCountryCode] = useState("+243") // Default to DRC
  const [telephone, setTelephone] = useState("")
  const [email, setEmail] = useState("")
  const [localisation, setLocalisation] = useState("")
  const [moyenPaiement, setMoyenPaiement] = useState("mobile money")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [clientId, setClientId] = useState<string | null>(null)
  const [chambreId, setChambreId] = useState<string | null>(null)
  const [mobileMoneyPhone, setMobileMoneyPhone] = useState("")
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [stripePromise, setStripePromise] = useState<any>(null)
  const [clientSecret, setClientSecret] = useState("")
  const [conversionRate, setConversionRate] = useState(1) // 1 USD to local currency

  useEffect(() => {
    if (user) {
      // Try to get user metadata
      const metadata = user.user_metadata || {}

      // Fetch user data from the utilisateurs table
      const fetchUserData = async () => {
        try {
          const { data, error } = await supabase
            .from("utilisateurs")
            .select("nom_complet, telephone, email")
            .eq("id", user.id)
            .single()

          if (error) {
            console.error("Error fetching user data:", error)
            return
          }

          if (data) {
            setNom(data.nom_complet || metadata.nom_complet || "")
            setTelephone(data.telephone || metadata.telephone || "")
            setEmail(data.email || user.email || "")
          }
        } catch (error) {
          console.error("Error:", error)
        }
      }

      fetchUserData()
    }
  }, [user, supabase])

  // Update Redux state when local state changes
  useEffect(() => {
    if (checkIn || checkOut) {
      dispatch(
        setAvailabilityDates({
          checkIn: checkIn ? checkIn.toISOString() : null,
          checkOut: checkOut ? checkOut.toISOString() : null,
        }),
      )
    }
  }, [checkIn, checkOut, dispatch])

  // Récupérer l'ID de la chambre en fonction du type sélectionné
  useEffect(() => {
    const fetchChambreId = async () => {
      try {
        // Format the room type name to match database format
        let roomTypeName = ""
        if (roomType === "standard") {
          roomTypeName = "Chambre Standard"
        } else if (roomType === "deluxe") {
          roomTypeName = "Chambre De Luxe"
        } else if (roomType === "vip") {
          roomTypeName = "Chambre VIP"
        }

        // Query without using .single() to handle multiple or no results
        const { data, error } = await supabase.from("chambres").select("id").eq("nom", roomTypeName)

        if (error) {
          console.error("Error fetching chambre id:", error)
          return
        }

        if (data && data.length > 0) {
          // Take the first matching room if multiple exist
          setChambreId(data[0].id)
        } else {
          console.log(`No chamber found with name: ${roomTypeName}`)
          setChambreId(null)
        }
      } catch (error) {
        console.error("Error:", error)
      }
    }

    if (roomType) {
      fetchChambreId()
    }
  }, [roomType, supabase])

  // Initialize Stripe
  useEffect(() => {
    // Only load Stripe when payment method is selected as carte-visa
    if (moyenPaiement === "carte-visa") {
      // Load Stripe
      const loadStripeInstance = async () => {
        try {
          // In a real app, this would come from an environment variable
          const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

          if (!stripePublicKey) {
            console.error("Missing Stripe public key")
            toast({
              title: "Configuration error",
              description: "Payment system is not properly configured. Please contact support.",
              variant: "destructive",
            })
            setMoyenPaiement("mobile money")
            return
          }

          const stripeInstance = await loadStripe(stripePublicKey)
          setStripePromise(stripeInstance)

          // Get client secret from server
          try {
            const response = await fetch("/api/create-payment-intent", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                amount: 100, // This would be the actual amount in USD
                currency: "usd",
              }),
            })

            if (!response.ok) {
              const errorText = await response.text()
              console.error(`Server error: ${response.status}`, errorText)
              throw new Error(`Payment service unavailable (${response.status})`)
            }

            const data = await response.json()
            if (data.clientSecret) {
              setClientSecret(data.clientSecret)
            } else {
              throw new Error("No client secret received from server")
            }
          } catch (error) {
            console.error("Error creating payment intent:", error)
            toast({
              title: "Erreur de paiement",
              description:
                "Le système de paiement par carte n'est pas disponible pour le moment. Veuillez choisir un autre mode de paiement.",
              variant: "destructive",
            })
            // Reset payment method to mobile money as fallback
            setMoyenPaiement("mobile money")
          }

          // Get conversion rate (in a real app, this would use a currency API)
          setConversionRate(2000) // Example: 1 USD = 2000 local currency
        } catch (error) {
          console.error("Error initializing Stripe:", error)
          toast({
            title: "Erreur de paiement",
            description:
              "Le système de paiement par carte n'est pas disponible pour le moment. Veuillez choisir un autre mode de paiement.",
            variant: "destructive",
          })
          // Reset payment method to mobile money as fallback
          setMoyenPaiement("mobile money")
        }
      }

      loadStripeInstance()
    }
  }, [moyenPaiement, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Vérifier si les dates sont sélectionnées
      if (!checkIn || !checkOut) {
        toast({
          title: "Erreur",
          description: "Veuillez sélectionner les dates d'arrivée et de départ",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      // Validate payment method specific fields
      if (moyenPaiement === "mobile money" && !mobileMoneyPhone) {
        toast({
          title: "Erreur",
          description: "Veuillez entrer le numéro de téléphone pour le paiement Mobile Money",
          variant: "destructive",
        })
        setIsSubmitting(false)
        return
      }

      // For carte-visa, handle the Stripe payment
      if (moyenPaiement === "carte-visa") {
        if (!stripePromise || !clientSecret) {
          toast({
            title: "Erreur",
            description: "Le système de paiement par carte n'est pas disponible pour le moment",
            variant: "destructive",
          })
          setIsSubmitting(false)
          return
        }

        // We'll handle Stripe payment after creating the reservation
      }

      // Instead of directly inserting into the database, use the API endpoint
      // to create or find a client
      const clientResponse = await fetch("/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom_complet: nom,
          email: email,
          telephone: `${countryCode}${telephone}`,
        }),
      })

      if (!clientResponse.ok) {
        const errorData = await clientResponse.json()
        throw new Error(errorData.error || "Erreur lors de la création du client")
      }

      const clientData = await clientResponse.json()
      const existingClientId = clientData.id

      // Créer la réservation
      if (existingClientId && chambreId) {
        const reservationData = {
          client_id: existingClientId,
          chambre_id: chambreId,
          date_arrivee: checkIn.toISOString(),
          date_depart: checkOut.toISOString(),
          mode_paiement: moyenPaiement,
        }

        const response = await fetch("/api/reservations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reservationData),
        })

        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || "Erreur lors de la création de la réservation")
        }

        // If using Stripe, process the payment now
        // If using Stripe, we'll redirect to payment confirmation
        // The actual payment processing will happen in the StripePaymentForm
        if (moyenPaiement === "carte-visa") {
          // Just redirect to payment confirmation with the reservation ID
          router.push(`/payment-confirmation?reservation_id=${result.reservation.id}`)
          return
        }

        toast({
          title: "Réservation créée",
          description: "Votre réservation a été créée avec succès. Un email de confirmation vous a été envoyé.",
        })

        // Rediriger vers la page de détails de la réservation
        router.push(`/reservations/${result.reservation.id}`)
      }
    } catch (error) {
      console.error("Error submitting reservation:", error)
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Fonction pour le bouton WhatsApp (alternative)
  const handleWhatsAppSubmit = () => {
    // Format dates for WhatsApp message
    const formattedCheckIn = checkIn ? format(checkIn, "dd/MM/yyyy", { locale: fr }) : ""
    const formattedCheckOut = checkOut ? format(checkOut, "dd/MM/yyyy", { locale: fr }) : ""

    // Get room type label
    const roomTypeLabel =
      roomType === "standard"
        ? "Chambre Standard"
        : roomType === "deluxe"
          ? "Chambre De Luxe"
          : roomType === "vip"
            ? "Chambre VIP"
            : ""

    // Format the full phone number with country code
    const fullPhoneNumber = `${countryCode}${telephone}`

    // Create WhatsApp message
    const message = `
*NOUVELLE RÉSERVATION - JOHN SERVICES MOTEL*

*Informations client:*
Nom: ${nom}
Téléphone: ${fullPhoneNumber}
Email: ${email || "Non fourni"}
Ville d'origine: ${localisation}

*Détails de la réservation:*
Arrivée: ${formattedCheckIn}
Départ: ${formattedCheckOut}
Type de chambre: ${roomTypeLabel}
Voyageurs: ${adults} adulte(s), ${children} enfant(s)
Moyen de paiement préféré: ${moyenPaiement === "cash" ? "Cash" : moyenPaiement === "mobile money" ? "Mobile Money" : moyenPaiement === "carte-visa" ? "Carte Visa" : "PayPal"}

Merci de confirmer la disponibilité et les détails de ma réservation.
`

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message)

    // WhatsApp number from contact page
    const whatsappNumber = "243997163443"

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank")
  }

  function StripePaymentForm() {
    const stripe = useStripe()
    const elements = useElements()
    const [error, setError] = useState<string | null>(null)
    const [processing, setProcessing] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      // Set loading to false once Stripe Elements are ready
      if (stripe && elements) {
        setIsLoading(false)
      }
    }, [stripe, elements])

    if (isLoading) {
      return (
        <div className="py-4 text-center">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          <p className="mt-2 text-sm text-slate-600">Chargement du formulaire de paiement...</p>
        </div>
      )
    }

    return (
      <div>
        <PaymentElement />
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="nom">Nom complet</Label>
          <Input
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
            placeholder="Votre nom complet"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telephone">Téléphone</Label>
          <div className="flex gap-2">
            <Select value={countryCode} onValueChange={setCountryCode}>
              <SelectTrigger className="w-[110px] flex-shrink-0">
                <SelectValue placeholder="Code" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="+243">🇨🇩 +243</SelectItem>
                <SelectItem value="+250">🇷🇼 +250</SelectItem>
                <SelectItem value="+257">🇧🇮 +257</SelectItem>
                <SelectItem value="+256">🇺🇬 +256</SelectItem>
                <SelectItem value="+254">🇰🇪 +254</SelectItem>
                <SelectItem value="+255">🇹🇿 +255</SelectItem>
                <SelectItem value="+242">🇨🇬 +242</SelectItem>
                <SelectItem value="+33">🇫🇷 +33</SelectItem>
                <SelectItem value="+32">🇧🇪 +32</SelectItem>
                <SelectItem value="+1">🇺🇸 +1</SelectItem>
              </SelectContent>
            </Select>
            <Input
              id="telephone"
              value={telephone}
              onChange={(e) => {
                // Remove any non-digit characters except for the plus sign
                const cleaned = e.target.value.replace(/[^\d]/g, "")
                setTelephone(cleaned)
              }}
              required
              placeholder="Numéro de téléphone"
              className="flex-1"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="votre.email@exemple.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="localisation">Ville d'origine</Label>
          <Input
            id="localisation"
            value={localisation}
            onChange={(e) => setLocalisation(e.target.value)}
            required
            placeholder="Ex: Bukavu, Kinshasa"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-slate-800" />
            Arrivée
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal transition-all hover:border-slate-800",
                  !checkIn && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkIn ? format(checkIn, "PPP", { locale: fr }) : <span>Sélectionner</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                initialFocus
                locale={fr}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-slate-800" />
            Départ
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal transition-all hover:border-slate-800",
                  !checkOut && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkOut ? format(checkOut, "PPP", { locale: fr }) : <span>Sélectionner</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                initialFocus
                locale={fr}
                disabled={(date) => (checkIn ? date < checkIn : false) || date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <BedDouble className="h-4 w-4 text-slate-800" />
            Type de chambre
          </label>
          <Select value={roomType} onValueChange={setRoomType}>
            <SelectTrigger className="transition-all hover:border-slate-800">
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Chambre Standard</SelectItem>
              <SelectItem value="deluxe">Chambre De Luxe</SelectItem>
              <SelectItem value="vip">Chambre VIP</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-slate-800" />
          Mode de paiement
        </label>
        <Select value={moyenPaiement} onValueChange={setMoyenPaiement}>
          <SelectTrigger className="transition-all hover:border-slate-800">
            <SelectValue placeholder="Sélectionner" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mobile money">Mobile Money</SelectItem>
            <SelectItem value="carte-visa">Carte Bancaire</SelectItem>
          </SelectContent>
        </Select>

        {/* Payment method specific fields */}
        {moyenPaiement === "mobile money" && (
          <div className="mt-4 space-y-2 p-4 border rounded-md bg-slate-50">
            <h3 className="font-medium">Détails Mobile Money</h3>
            <div className="space-y-2">
              <Label htmlFor="mobileMoneyPhone">Numéro de téléphone pour le paiement</Label>
              <Input
                id="mobileMoneyPhone"
                value={mobileMoneyPhone}
                onChange={(e) => setMobileMoneyPhone(e.target.value)}
                placeholder="Ex: 0991234567"
                required={moyenPaiement === "mobile money"}
              />
              <p className="text-xs text-slate-500">
                Le montant sera débité de ce numéro. Assurez-vous qu'il est correctement enregistré et dispose de fonds
                suffisants.
              </p>
            </div>
          </div>
        )}

        {moyenPaiement === "carte-visa" && (
          <div className="mt-4 space-y-2 p-4 border rounded-md bg-slate-50">
            <h3 className="font-medium">Paiement par Carte Bancaire</h3>

            {!clientSecret || !stripePromise ? (
              <div className="py-4">
                <div className="flex items-center justify-center space-x-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                  <p className="text-sm text-slate-600">Chargement du système de paiement...</p>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-2">
                  <p className="text-sm">
                    Montant à payer: <span className="font-bold">${(100).toFixed(2)} USD</span>
                    <span className="text-xs text-slate-500 ml-2">
                      (≈ {(100 * conversionRate).toLocaleString()} monnaie locale)
                    </span>
                  </p>
                </div>
                <Elements stripe={stripePromise} options={{ clientSecret, loader: "auto" }}>
                  <StripePaymentForm />
                </Elements>
              </>
            )}

            <p className="text-xs text-slate-500 mt-2">
              Si le formulaire de paiement ne s'affiche pas, veuillez rafraîchir la page ou choisir un autre mode de
              paiement.
            </p>
          </div>
        )}
      </div>

      <div className="flex">
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-md"
          disabled={isSubmitting || !checkIn || !checkOut || !nom || !telephone || !email || !localisation}
        >
          {isSubmitting ? "Traitement en cours..." : "Réserver maintenant"}
        </Button>
      </div>
    </form>
  )
}
