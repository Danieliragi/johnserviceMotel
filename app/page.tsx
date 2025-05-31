"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPinIcon, WifiIcon, CarIcon, CoffeeIcon, ChevronRight } from "lucide-react"
import BookingForm from "@/components/booking-form"
import MapLocation from "@/components/map-location"
import ScrollAnimation from "@/components/scroll-animation"
import OptimizedImage from "@/components/optimized-image"
import HeroCarousel from "@/components/hero-carousel"
import Image from "next/image"
import ParallaxEffect from "@/components/parallax-effect"
import { useState } from "react"

export default function Home() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
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
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <h2 className="text-3xl font-bold">Nos Chambres</h2>
            <Link href="/chambres" className="text-slate-800 hover:text-slate-600 flex items-center mt-2 md:mt-0 group">
              <span>Voir toutes nos chambres</span>
              <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
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
                  <p className="font-bold text-slate-800">À partir de $59</p>
                </div>
                <ul className="mb-4 text-gray-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                    Lit Queen Size
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                    Climatisation
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
                  <p className="font-bold text-slate-800">À partir de $89</p>
                </div>
                <ul className="mb-4 text-gray-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>1 Lit Double confortable
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                    Climatisation
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
                <OptimizedImage
                  src="/vip1.jpeg"
                  alt="Chambre VIP avec décoration en serviettes"
                  fill
                  fallbackSrc="/vip2.jpeg"
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
                  <p className="font-bold text-slate-800">À partir de $99</p>
                </div>
                <ul className="mb-4 text-gray-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                    Lit Double confortable
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

      {/* Map Section */}
      <section className="section-padding container-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold mb-8">Notre Emplacement</h2>
          </ScrollAnimation>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <ScrollAnimation direction="right">
              <h3 className="text-xl font-bold mb-4">Idéalement situé</h3>
              <p className="text-gray-600 mb-6">
                Le John Services Motel est situé en ville pres de la rond en face de la maison orange. Notre emplacement
                stratégique vous permet de rejoindre rapidement:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 p-3 bg-white rounded-lg shadow-sm hover-scale">
                  <MapPinIcon className="h-5 w-5 text-slate-800 mt-0.5 flex-shrink-0" />
                  <span>À 5 minutes de la sortie d'autoroute</span>
                </li>
                <li className="flex items-start gap-2 p-3 bg-white rounded-lg shadow-sm hover-scale">
                  <MapPinIcon className="h-5 w-5 text-slate-800 mt-0.5 flex-shrink-0" />
                  <span>Station-service et aire de repos à 2 minutes</span>
                </li>
                <li className="flex items-start gap-2 p-3 bg-white rounded-lg shadow-sm hover-scale">
                  <MapPinIcon className="h-5 w-5 text-slate-800 mt-0.5 flex-shrink-0" />
                  <span>Plusieurs restaurants à moins de 10 minutes</span>
                </li>
                <li className="flex items-start gap-2 p-3 bg-white rounded-lg shadow-sm hover-scale">
                  <MapPinIcon className="h-5 w-5 text-slate-800 mt-0.5 flex-shrink-0" />
                  <span>Centre commercial à 15 minutes</span>
                </li>
              </ul>
              <Button className="flex items-center gap-2 btn-primary">
                <MapPinIcon className="h-4 w-4" />
                Itinéraire via Google Maps
              </Button>
            </ScrollAnimation>
            <ScrollAnimation direction="left" delay={200}>
              <div className="h-[400px] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
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
