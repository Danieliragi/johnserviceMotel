"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, CalendarDays, BedDouble } from "lucide-react"

export default function BookingForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    checkIn: "",
    checkOut: "",
    roomType: "standard",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Format the booking information for WhatsApp
    const message = `Nouvelle Reservation - John Services Motel

Informations Client:
- Nom: ${formData.fullName}
- Email: ${formData.email}
- Telephone: ${formData.phone}
- Ville d'origine: ${formData.city}

Details de la reservation:
- Date d'arrivee: ${formData.checkIn}
- Date de depart: ${formData.checkOut}
- Type de chambre: ${formData.roomType === "standard" ? "Chambre Standard" : formData.roomType === "deluxe" ? "Chambre De Luxe" : "Chambre VIP"}

Merci de confirmer la disponibilite et le tarif pour ces dates.`

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message)

    // WhatsApp business number (replace with actual number)
    const whatsappNumber = "243997163443" // Updated to actual WhatsApp business number

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
            Nom complet
          </Label>
          <Input
            id="fullName"
            type="text"
            placeholder="Votre nom complet"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
            required
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Téléphone
          </Label>
          <div className="flex">
            <Select defaultValue="+243">
              <SelectTrigger className="w-24 h-12 bg-gray-50 border-gray-200 rounded-r-none border-r-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="+243">🇨🇩 +243</SelectItem>
                <SelectItem value="+250">🇷🇼 +250</SelectItem>
                <SelectItem value="+256">🇺🇬 +256</SelectItem>
                <SelectItem value="+255">🇹🇿 +255</SelectItem>
              </SelectContent>
            </Select>
            <Input
              id="phone"
              type="tel"
              placeholder="Numéro de téléphone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="h-12 bg-gray-50 border-gray-200 rounded-l-none focus:bg-white transition-colors flex-1"
              required
            />
          </div>
        </div>
      </div>

      {/* Email and City Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="votre.email@exemple.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
            required
          />
        </div>

        {/* City of Origin */}
        <div className="space-y-2">
          <Label htmlFor="city" className="text-sm font-medium text-gray-700">
            Ville d'origine
          </Label>
          <Input
            id="city"
            type="text"
            placeholder="Ex: Bukavu, Kinshasa"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
            required
          />
        </div>
      </div>

      {/* Booking Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Check-in Date */}
        <div className="space-y-2">
          <Label htmlFor="checkIn" className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Arrivée
          </Label>
          <Input
            id="checkIn"
            type="date"
            value={formData.checkIn}
            onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
            className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
            required
          />
        </div>

        {/* Check-out Date */}
        <div className="space-y-2">
          <Label htmlFor="checkOut" className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            Départ
          </Label>
          <Input
            id="checkOut"
            type="date"
            value={formData.checkOut}
            onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
            className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
            required
          />
        </div>

        {/* Room Type */}
        <div className="space-y-2">
          <Label htmlFor="roomType" className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <BedDouble className="h-4 w-4" />
            Type de chambre
          </Label>
          <Select value={formData.roomType} onValueChange={(value) => setFormData({ ...formData, roomType: value })}>
            <SelectTrigger className="h-12 bg-gray-50 border-gray-200 focus:bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Chambre Standard</SelectItem>
              <SelectItem value="deluxe">Chambre De Luxe</SelectItem>
              <SelectItem value="vip">Chambre VIP</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button
          type="submit"
          className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium text-lg transition-colors"
        >
          Réserver maintenant
        </Button>
      </div>
    </form>
  )
}
