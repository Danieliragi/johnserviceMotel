"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPinIcon, WifiIcon, CarIcon, CoffeeIcon, ChevronRight } from "lucide-react"
import BookingForm from "@/components/booking-form"
import MapLocation from "@/components/map-location"
import ScrollAnimation from "@/components/scroll-animation"
import HeroCarousel from "@/components/hero-carousel"
import Image from "next/image"
import ParallaxEffect from "@/components/parallax-effect"
import { useState } from "react"

export default function Home() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [isTableReservationModalOpen, setIsTableReservationModalOpen] = useState(false)
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <HeroCarousel />
        </div>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10"
          style={{
            transform: "translateY(0px)",
            transition: "transform 0.5s ease-out",
          }}
          id="parallax-hero"
        ></div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent"></div>
      </section>

      {/* Booking Section */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 border border-gray-100 relative">
            <button
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center mr-3 text-lg">
                1
              </span>
              Réservez votre séjour
            </h2>
            <BookingForm />
          </div>
        </div>
      )}

      {/* Table Reservation Modal */}
      {isTableReservationModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 border border-gray-100 relative">
            <button
              onClick={() => setIsTableReservationModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center mr-3 text-lg">
                🍽️
              </span>
              Réserver une table
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target as HTMLFormElement)
                const data = {
                  nom: formData.get("nom"),
                  telephone: formData.get("telephone"),
                  email: formData.get("email"),
                  date: formData.get("date"),
                  heure: formData.get("heure"),
                  personnes: formData.get("personnes"),
                  demandes: formData.get("demandes"),
                }

                const message =
                  `🍽️ *RÉSERVATION DE TABLE*\n\n` +
                  `👤 *Client:* ${data.nom}\n` +
                  `📞 *Téléphone:* ${data.telephone}\n` +
                  `📧 *Email:* ${data.email}\n\n` +
                  `📅 *Date:* ${data.date}\n` +
                  `🕐 *Heure:* ${data.heure}\n` +
                  `👥 *Nombre de personnes:* ${data.personnes}\n\n` +
                  `💬 *Demandes spéciales:* ${data.demandes || "Aucune"}\n\n` +
                  `Merci de confirmer cette réservation.`

                const whatsappUrl = `https://wa.me/243997163443?text=${encodeURIComponent(message)}`
                window.open(whatsappUrl, "_blank")
                setIsTableReservationModalOpen(false)
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-800 focus:border-slate-800 transition-colors"
                    placeholder="Votre nom complet"
                  />
                </div>

                <div>
                  <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-800 focus:border-slate-800 transition-colors"
                    placeholder="+243 xxx xxx xxx"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-800 focus:border-slate-800 transition-colors"
                  placeholder="votre@email.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-800 focus:border-slate-800 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="heure" className="block text-sm font-medium text-gray-700 mb-2">
                    Heure *
                  </label>
                  <select
                    id="heure"
                    name="heure"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-800 focus:border-slate-800 transition-colors"
                  >
                    <option value="">Choisir l'heure</option>
                    <option value="12:00">12:00</option>
                    <option value="12:30">12:30</option>
                    <option value="13:00">13:00</option>
                    <option value="13:30">13:30</option>
                    <option value="14:00">14:00</option>
                    <option value="18:00">18:00</option>
                    <option value="18:30">18:30</option>
                    <option value="19:00">19:00</option>
                    <option value="19:30">19:30</option>
                    <option value="20:00">20:00</option>
                    <option value="20:30">20:30</option>
                    <option value="21:00">21:00</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="personnes" className="block text-sm font-medium text-gray-700 mb-2">
                    Personnes *
                  </label>
                  <select
                    id="personnes"
                    name="personnes"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-800 focus:border-slate-800 transition-colors"
                  >
                    <option value="">Nombre</option>
                    <option value="1">1 personne</option>
                    <option value="2">2 personnes</option>
                    <option value="3">3 personnes</option>
                    <option value="4">4 personnes</option>
                    <option value="5">5 personnes</option>
                    <option value="6">6 personnes</option>
                    <option value="7">7 personnes</option>
                    <option value="8">8 personnes</option>
                    <option value="8+">Plus de 8</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="demandes" className="block text-sm font-medium text-gray-700 mb-2">
                  Demandes spéciales
                </label>
                <textarea
                  id="demandes"
                  name="demandes"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-slate-800 focus:border-slate-800 transition-colors resize-none"
                  placeholder="Allergies, préférences de table, occasion spéciale..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl py-3"
                  onClick={() => setIsTableReservationModalOpen(false)}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-white rounded-xl py-3 font-semibold transition-colors"
                >
                  Envoyer la réservation
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Services Section */}
      <section className="section-padding container-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Tout pour votre confort</h2>
              <div className="w-20 h-1 bg-primary-950 mx-auto mt-4 rounded-full"></div>
            </div>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollAnimation direction="up" delay={100}>
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover-scale">
                <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                  <WifiIcon className="h-8 w-8 text-primary-950" />
                </div>
                <h3 className="font-bold mb-2">Wi-Fi Gratuit</h3>
                <p className="text-gray-600">Connexion haut débit dans tout l'établissement</p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={200}>
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover-scale">
                <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                  <CarIcon className="h-8 w-8 text-primary-950" />
                </div>
                <h3 className="font-bold mb-2">Parking Gratuit</h3>
                <p className="text-gray-600">Stationnement sécurisé pour tous nos clients</p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={300}>
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover-scale">
                <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                  <CoffeeIcon className="h-8 w-8 text-primary-950" />
                </div>
                <h3 className="font-bold mb-2">Petit-déjeuner</h3>
                <p className="text-gray-600">Service de petit-déjeuner continental dès 6h</p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="section-padding container-padding max-w-7xl mx-auto">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Chambres</h2>
              <div className="w-20 h-1 bg-primary-950 mx-auto mb-6 rounded-full"></div>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Découvrez nos chambres confortables et modernes, conçues pour répondre à tous vos besoins. Du standard
                au VIP, chaque espace offre le confort et les équipements nécessaires pour un séjour parfait.
              </p>
              <Link
                href="/chambres"
                className="inline-flex items-center gap-2 bg-primary-950 text-white px-6 py-3 rounded-xl hover:bg-primary-900 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span>Voir toutes nos chambres</span>
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </ScrollAnimation>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ScrollAnimation direction="left" delay={100}>
            <Card className="overflow-hidden card-hover border-gray-200">
              <div className="relative h-64 overflow-hidden group">
                <Image
                  src="/standard-room-1.jpeg"
                  alt="Chambre Standard"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <Button className="w-full">Voir les détails</Button>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Chambre Standard</h3>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 font-medium">À partir de</p>
                    <p className="text-2xl font-bold text-primary-950 bg-primary-50 px-3 py-1 rounded-lg border border-primary-200">
                      $30
                    </p>
                  </div>
                </div>
                <ul className="mb-4 text-gray-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                    Lit Standard
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                    wifi gratuit
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                    TV écran plat
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                    Salle de bain privée
                  </li>
                </ul>
                <Button className="w-full btn-primary" onClick={() => setIsBookingModalOpen(true)}>
                  Réserver
                </Button>
              </CardContent>
            </Card>
          </ScrollAnimation>

          <ScrollAnimation direction="left" delay={200}>
            <Card className="overflow-hidden card-hover border-gray-200">
              <div className="relative h-64 overflow-hidden group">
                <Image
                  src="/deluxe-room-1.jpeg"
                  alt="Chambre De Luxe"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <Badge className="absolute top-3 right-3 bg-amber-500">Populaire</Badge>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <Button className="w-full">Voir les détails</Button>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Chambre De Luxe</h3>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 font-medium">À partir de</p>
                    <p className="text-2xl font-bold text-primary-950 bg-primary-50 px-3 py-1 rounded-lg border border-primary-200">
                      $40
                    </p>
                  </div>
                </div>
                <ul className="mb-4 text-gray-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>1 Lit de Luxe
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                    wifi gratuit
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                    TV écran plat
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                    Coin salon avec fauteuil
                  </li>
                </ul>
                <Button className="w-full btn-primary" onClick={() => setIsBookingModalOpen(true)}>
                  Réserver
                </Button>
              </CardContent>
            </Card>
          </ScrollAnimation>

          <ScrollAnimation direction="left" delay={300}>
            <Card className="overflow-hidden card-hover border-gray-200">
              <div className="relative h-64 overflow-hidden group">
                <Image
                  src="/vip1.jpeg"
                  alt="Chambre VIP avec décoration en serviettes"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <Button className="w-full">Voir les détails</Button>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Chambre VIP</h3>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 font-medium">À partir de</p>
                    <p className="text-2xl font-bold text-primary-950 bg-primary-50 px-3 py-1 rounded-lg border border-primary-200">
                      $70
                    </p>
                  </div>
                </div>
                <ul className="mb-4 text-gray-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                    Lit VIP
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                    Coin salon avec table
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                    Décoration élégante
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                    Service de chambre
                  </li>
                </ul>
                <Button className="w-full btn-primary" onClick={() => setIsBookingModalOpen(true)}>
                  Réserver
                </Button>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </section>

      {/* Restaurant Section */}
      <section className="section-padding container-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Notre Restaurant</h2>
              <div className="w-20 h-1 bg-primary-950 mx-auto mt-4 rounded-full"></div>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <ScrollAnimation direction="left">
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
                <Image
                  src="/motel-restaurant.jpeg"
                  alt="Restaurant du John Services Motel"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <Badge className="absolute top-3 right-3 bg-primary-950 text-white">Ouvert 7j/7</Badge>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="right" delay={200}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Une cuisine authentique</h3>
                  <div className="w-16 h-1 bg-primary-600 rounded-full mb-4"></div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Notre restaurant vous propose une carte variée mettant à l'honneur les produits locaux et les
                  spécialités régionales, dans un cadre moderne et convivial.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-2">Petit-déjeuner</h4>
                    <p className="text-gray-600 text-sm">6h00 - 10h30</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-2">Déjeuner & Dîner</h4>
                    <p className="text-gray-600 text-sm">12h00 - 22h00</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="outline"
                    className="border-2 border-primary-950 text-primary-950 hover:bg-primary-50"
                    onClick={() => setIsTableReservationModalOpen(true)}
                  >
                    Réserver une table
                  </Button>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {/* Restaurant Features */}
          <ScrollAnimation delay={400}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover-scale">
                <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                  <CoffeeIcon className="h-8 w-8 text-primary-950" />
                </div>
                <h4 className="font-bold mb-2">Cuisine Locale</h4>
                <p className="text-gray-600">Spécialités régionales préparées avec des ingrédients frais</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover-scale">
                <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                  <WifiIcon className="h-8 w-8 text-primary-950" />
                </div>
                <h4 className="font-bold mb-2">Ambiance Conviviale</h4>
                <p className="text-gray-600">Cadre chaleureux et moderne pour tous vos repas</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover-scale">
                <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                  <CarIcon className="h-8 w-8 text-primary-950" />
                </div>
                <h4 className="font-bold mb-2">Service de Qualité</h4>
                <p className="text-gray-600">Équipe professionnelle à votre service tous les jours</p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding container-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold mb-8">Notre Emplacement</h2>
          </ScrollAnimation>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <ScrollAnimation direction="right">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Idéalement situé</h3>
                  <div className="w-16 h-1 bg-primary-600 rounded-full mb-4"></div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Le John Services Motel est implanté au cœur de la ville, dans le quartier le Volcan, au 13-B de
                  l'avenue le Messager. Sa localisation est très pratique : directement en diagonal de l'Eco-Bank, et à
                  seulement 3 minutes à pied de cette banque.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center mt-1 mr-3">
                      <span className="w-2 h-2 rounded-full bg-primary-600"></span>
                    </span>
                    <span>Accès facile aux transports</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center mt-1 mr-3">
                      <span className="w-2 h-2 rounded-full bg-primary-600"></span>
                    </span>
                    <span>Quartier calme et sécurisé</span>
                  </li>
                </ul>
                <Button
                  className="flex items-center gap-2 btn-primary mt-2"
                  onClick={() => {
                    const coordinates = "-1.677700,29.228500"
                    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coordinates}`
                    window.open(googleMapsUrl, "_blank")
                  }}
                >
                  <MapPinIcon className="h-4 w-4" />
                  Itinéraire via Google Maps
                </Button>
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="left" delay={200}>
              <div className="h-[400px] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
                <MapLocation />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-primary-950 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à réserver votre séjour ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Profitez de nos tarifs avantageux et de notre emplacement idéal pour votre prochain voyage
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-slate-800 hover:bg-gray-100"
              onClick={() => setIsBookingModalOpen(true)}
            >
              Réserver maintenant
            </Button>
            <Button
              size="lg"
              className="bg-primary-950 text-white border-2 border-white hover:bg-primary-900 transition-all duration-300"
              onClick={() => (window.location.href = "/contact")}
            >
              Contactez-nous
            </Button>
          </div>
        </div>
      </section>
      <ParallaxEffect />
    </main>
  )
}
