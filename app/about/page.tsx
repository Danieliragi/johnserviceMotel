import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  Wifi,
  Car,
  Coffee,
  Shield,
  Tv,
  Wind,
  Award,
  Heart,
  Target,
} from "lucide-react"

export const metadata: Metadata = {
  title: "À propos | John Services Motel",
  description:
    "Découvrez l'histoire et les valeurs du John Services Motel, votre destination de choix à Goma pour un séjour confortable et mémorable.",
}

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">
              À propos de nous
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Bienvenue au <span className="text-[#8c3d0e]">John Services Motel</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Votre havre de paix et de confort au cœur de la ville de Goma, où l'hospitalité rencontre l'excellence
              depuis notre ouverture.
            </p>
            <div className="w-20 h-1 bg-[#8c3d0e] mx-auto rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Notre Histoire</h2>
                <div className="prose prose-lg">
                  <p className="text-gray-600 mb-6">
                    Situé sur l'avenue le Messager dans le quartier les Volcans, le John Services Motel est né d'une
                    vision simple : offrir un lieu d'accueil chaleureux et authentique aux voyageurs visitant la
                    magnifique ville de Goma.
                  </p>
                  <p className="text-gray-600 mb-6">
                    Depuis notre ouverture, nous nous sommes engagés à créer une expérience unique pour chaque client,
                    alliant confort moderne et hospitalité traditionnelle congolaise. Notre équipe dévouée travaille
                    sans relâche pour faire de votre séjour un moment inoubliable.
                  </p>
                  <p className="text-gray-600">
                    Avec 22 chambres soigneusement aménagées et un restaurant proposant une cuisine savoureuse, nous
                    continuons d'évoluer pour répondre aux attentes de notre clientèle diversifiée.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="/motel-day-1.jpeg"
                    alt="John Services Motel - Vue extérieure"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="font-bold">4.8/5</span>
                    <span className="text-gray-500 text-sm">Avis clients</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nos Valeurs</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Les principes qui guident notre engagement envers l'excellence et votre satisfaction
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                <div className="mx-auto w-16 h-16 rounded-full bg-[#8c3d0e]/10 flex items-center justify-center mb-6">
                  <Heart className="h-8 w-8 text-[#8c3d0e]" />
                </div>
                <h3 className="text-xl font-bold mb-4">Hospitalité</h3>
                <p className="text-gray-600">
                  Nous accueillons chaque client comme un membre de notre famille, avec chaleur et respect.
                </p>
              </Card>

              <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                <div className="mx-auto w-16 h-16 rounded-full bg-[#8c3d0e]/10 flex items-center justify-center mb-6">
                  <Award className="h-8 w-8 text-[#8c3d0e]" />
                </div>
                <h3 className="text-xl font-bold mb-4">Excellence</h3>
                <p className="text-gray-600">
                  Nous nous efforçons constamment d'améliorer nos services pour dépasser vos attentes.
                </p>
              </Card>

              <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                <div className="mx-auto w-16 h-16 rounded-full bg-[#8c3d0e]/10 flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-[#8c3d0e]" />
                </div>
                <h3 className="text-xl font-bold mb-4">Engagement</h3>
                <p className="text-gray-600">
                  Votre confort et votre satisfaction sont au cœur de toutes nos décisions et actions.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nos Installations</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Des équipements modernes et des services de qualité pour votre confort
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
              <div className="text-center p-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <Wifi className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-sm">Wi-Fi Gratuit</h4>
              </div>

              <div className="text-center p-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                  <Car className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-sm">Parking</h4>
              </div>

              <div className="text-center p-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-3">
                  <Coffee className="h-6 w-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-sm">Restaurant</h4>
              </div>

              <div className="text-center p-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-3">
                  <Shield className="h-6 w-6 text-red-600" />
                </div>
                <h4 className="font-semibold text-sm">Sécurité 24h</h4>
              </div>

              <div className="text-center p-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                  <Tv className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-sm">TV Satellite</h4>
              </div>

              <div className="text-center p-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center mb-3">
                  <Wind className="h-6 w-6 text-cyan-600" />
                </div>
                <h4 className="font-semibold text-sm">Climatisation</h4>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image src="/motel-reception.jpeg" alt="Réception du motel" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-lg font-bold">Réception</h3>
                    <p className="text-sm">Service 24h/24</p>
                  </div>
                </div>
              </div>

              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image src="/motel-restaurant.jpeg" alt="Restaurant du motel" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-lg font-bold">Restaurant</h3>
                    <p className="text-sm">Cuisine locale et internationale</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nous Contacter</h2>
              <p className="text-gray-600">Notre équipe est à votre disposition pour toute information</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center p-6">
                <div className="mx-auto w-12 h-12 rounded-full bg-[#8c3d0e]/10 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-[#8c3d0e]" />
                </div>
                <h3 className="font-bold mb-2">Adresse</h3>
                <p className="text-gray-600 text-sm">
                  Avenue le Messager
                  <br />
                  Quartier les Volcans
                  <br />
                  Goma, RDC
                </p>
              </Card>

              <Card className="text-center p-6">
                <div className="mx-auto w-12 h-12 rounded-full bg-[#8c3d0e]/10 flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-[#8c3d0e]" />
                </div>
                <h3 className="font-bold mb-2">Téléphone</h3>
                <p className="text-gray-600 text-sm">
                  +243 123 456 789
                  <br />
                  +243 987 654 321
                </p>
              </Card>

              <Card className="text-center p-6">
                <div className="mx-auto w-12 h-12 rounded-full bg-[#8c3d0e]/10 flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-[#8c3d0e]" />
                </div>
                <h3 className="font-bold mb-2">Email</h3>
                <p className="text-gray-600 text-sm">
                  info@johnservicesmotel.com
                  <br />
                  reservation@johnservicesmotel.com
                </p>
              </Card>

              <Card className="text-center p-6">
                <div className="mx-auto w-12 h-12 rounded-full bg-[#8c3d0e]/10 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-[#8c3d0e]" />
                </div>
                <h3 className="font-bold mb-2">Horaires</h3>
                <p className="text-gray-600 text-sm">
                  Réception: 24h/24
                  <br />
                  Restaurant: 6h - 22h
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#8c3d0e] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Prêt à vivre une expérience unique ?</h2>
            <p className="text-xl mb-8 opacity-90">Réservez dès maintenant votre séjour au John Services Motel</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/chambres">Voir nos chambres</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#8c3d0e]"
              >
                <Link href="/contact">Nous contacter</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
