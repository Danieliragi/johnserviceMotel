"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Users, BedDouble, CreditCard } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"

export default function BookingForm() {
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [adults, setAdults] = useState("2")
  const [children, setChildren] = useState("0")
  const [roomType, setRoomType] = useState("standard")
  const [nom, setNom] = useState("")
  const [countryCode, setCountryCode] = useState("+243") // Default to DRC
  const [telephone, setTelephone] = useState("")
  const [email, setEmail] = useState("")
  const [localisation, setLocalisation] = useState("")
  const [moyenPaiement, setMoyenPaiement] = useState("cash")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { user } = useAuth()

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
  }, [user])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Format dates for WhatsApp message
    const formattedCheckIn = checkIn ? format(checkIn, "dd/MM/yyyy", { locale: fr }) : ""
    const formattedCheckOut = checkOut ? format(checkOut, "dd/MM/yyyy", { locale: fr }) : ""

    // Get room type label
    const roomTypeLabel =
      roomType === "standard"
        ? "Chambre Standard"
        : roomType === "family"
          ? "Chambre Familiale"
          : roomType === "premium"
            ? "Chambre Premium"
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
Moyen de paiement préféré: ${moyenPaiement === "cash" ? "Cash" : moyenPaiement === "mobile" ? "Mobile Money" : "Carte bancaire"}

Merci de confirmer la disponibilité et les détails de ma réservation.
`

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message)

    // WhatsApp number from contact page
    const whatsappNumber = "243998691478"

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank")
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
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
          <Label htmlFor="email">Email (optionnel)</Label>
          <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="votre@email.com" />
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
              <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} initialFocus locale={fr} />
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
              <SelectItem value="family">Chambre Familiale</SelectItem>
              <SelectItem value="premium">Chambre Premium</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Users className="h-4 w-4 text-slate-800" />
            Voyageurs
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Select value={adults} onValueChange={setAdults}>
              <SelectTrigger className="transition-all hover:border-slate-800">
                <SelectValue placeholder="Adultes" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "Adulte" : "Adultes"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={children} onValueChange={setChildren}>
              <SelectTrigger className="transition-all hover:border-slate-800">
                <SelectValue placeholder="Enfants" />
              </SelectTrigger>
              <SelectContent>
                {[0, 1, 2, 3].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "Enfant" : "Enfants"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-slate-800" />
          Moyen de paiement
        </label>
        <Select value={moyenPaiement} onValueChange={setMoyenPaiement}>
          <SelectTrigger className="transition-all hover:border-slate-800">
            <SelectValue placeholder="Sélectionner" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cash">Cash</SelectItem>
            <SelectItem value="mobile">Mobile Money</SelectItem>
            <SelectItem value="card">Carte bancaire</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        type="button"
        onClick={handleSubmit}
        className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 hover:shadow-md flex items-center justify-center gap-2"
        disabled={isSubmitting || !checkIn || !checkOut || !nom || !telephone || !localisation}
      >
        {isSubmitting ? (
          "Traitement en cours..."
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="#ffffff"
              className="mr-1"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Réserver via WhatsApp
          </>
        )}
      </Button>
    </form>
  )
}
