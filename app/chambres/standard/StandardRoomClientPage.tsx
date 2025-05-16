"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import {
  Wifi,
  Tv,
  Bath,
  Snowflake,
  Coffee,
  ParkingCircle,
  Check,
  X,
  ChevronRight,
  CalendarRange,
  Heart,
  Share2,
} from "lucide-react"
import BookingForm from "@/components/booking-form"
import RoomGallery from "@/components/room-gallery"
import TestimonialCard from "@/components/testimonial-card"
import ScrollAnimation from "@/components/scroll-animation"

export default function StandardRoomClientPage() {
  const router = useRouter()

  // Function to handle booking via WhatsApp
  const handleBookNow = () => {
    // Format the message for WhatsApp
    const message = `Bonjour, je souhaite réserver une Chambre Standard au JohnService Motel avec les informations suivantes:
    
- Type de chambre: Standard
- Prix: $59 par nuit
- Capacité: 2 personnes
- Lit: Queen Size

Merci de me confirmer la disponibilité.`

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message)

    // WhatsApp phone number from contact page
    const phoneNumber = "+243998691478"

    // Generate WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank")
  }

  // Images for the room gallery - Updated with new images
  const roomImages = [
    {
      src: "/standard-room-1.jpeg",
      alt: "Vue d'ensemble de la chambre Standard",
    },
    {
      src: "/standard-room-2.jpeg",
      alt: "Vue de la chambre Standard avec lit confortable",
    },
    {
      src: "/standard-room-3.jpeg",
      alt: "Vue latérale de la chambre Standard",
    },
    {
      src: "/standard-room-4.jpeg",
      alt: "Vue du lit de la chambre Standard",
    },
    {
      src: "/standard-room-5.jpeg",
      alt: "Vue détaillée de la chambre Standard",
    },
    {
      src: "/standard-room-6.jpeg",
      alt: "Détails de la décoration de la chambre Standard",
    },
    {
      src: "/standard-room-7.jpeg",
      alt: "Vue supplémentaire de la chambre Standard",
    },
  ]

  // Amenities included in the room
  const amenities = [
    { name: "Wi-Fi gratuit", icon: <Wifi className="h-5 w-5" />, included: true },
    { name: "TV écran plat", icon: <Tv className="h-5 w-5" />, included: true },
    { name: "Climatisation", icon: <Snowflake className="h-5 w-5" />, included: true },
    { name: "Salle de bain privée", icon: <Bath className="h-5 w-5" />, included: true },
    { name: "Petit-déjeuner inclus", icon: <Coffee className="h-5 w-5" />, included: false },
    { name: "Parking gratuit", icon: <ParkingCircle className="h-5 w-5" />, included: true },
  ]

  return (
    <main className="flex min-h-screen flex-col">
      {/* Room Details Section */}
      <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Room Gallery */}
          <ScrollAnimation direction="left" className="order-2 lg:order-1">
            <RoomGallery images={roomImages} />
          </ScrollAnimation>

          {/* Room Info */}
          <ScrollAnimation direction="right" className="order-1 lg:order-2">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
              <h1 className="text-3xl md:text-4xl font-bold">Chambre Standard</h1>
              <Badge className="bg-blue-500">Standard</Badge>
            </div>

            <p className="text-gray-700 mb-6">
              Notre chambre Standard offre tout le confort nécessaire pour un séjour agréable. Équipée d'un lit queen
              size confortable, d'une salle de bain privée et de toutes les commodités essentielles, elle est idéale
              pour les voyageurs en quête d'un bon rapport qualité-prix.
            </p>

            <div className="flex items-center gap-2 mb-6">
              <CalendarRange className="h-5 w-5 text-slate-800" />
              <span className="font-medium">Check-in: 24h/24</span>
              <span className="mx-2">|</span>
              <CalendarRange className="h-5 w-5 text-slate-800" />
              <span className="font-medium">Check-out: 10h00</span>
            </div>

            <div className="flex gap-4 mb-6">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Heart className="h-4 w-4" /> Sauvegarder
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" /> Partager
              </Button>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-lg mb-6 shadow-sm border border-slate-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-bold">Prix par nuit</span>
                <div className="flex items-end">
                  <span className="text-sm text-gray-500 line-through mr-2">$79</span>
                  <span className="text-3xl font-bold text-slate-800">$59</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">Petit-déjeuner non inclus (+$9 par personne)</p>
              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-primary hover:bg-primary/90 flex items-center justify-center gap-2"
                  onClick={handleBookNow}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a7.29.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                  </svg>
                  Réserver maintenant
                </Button>
                <Button
                  variant="outline"
                  className="border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white"
                >
                  Contacter
                </Button>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Tabs Section */}
      <ScrollAnimation>
        <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto w-full">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start overflow-auto">
              <TabsTrigger value="description" className="text-sm md:text-base">
                Description
              </TabsTrigger>
              <TabsTrigger value="amenities" className="text-sm md:text-base">
                Équipements
              </TabsTrigger>
              <TabsTrigger value="rules" className="text-sm md:text-base">
                Règles
              </TabsTrigger>
              <TabsTrigger value="reviews" className="text-sm md:text-base">
                Avis
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div className="space-y-4">
                <p>
                  Notre chambre Standard est conçue pour offrir confort et fonctionnalité à un prix abordable. Avec une
                  superficie de 20m², elle dispose de tout l'espace nécessaire pour se détendre après une longue journée
                  de route ou de travail.
                </p>
                <p>
                  Le lit queen size est équipé d'un matelas de qualité et de linge de lit doux pour vous garantir une
                  nuit reposante. La salle de bain privée comprend une douche, des serviettes propres et des produits de
                  toilette de base.
                </p>
                <p>
                  Chaque chambre Standard est également équipée d'une télévision à écran plat, d'une connexion Wi-Fi
                  gratuite, d'un petit bureau et d'un espace de rangement pour vos affaires.
                </p>
                <p>
                  La climatisation individuelle vous permet de régler la température selon vos préférences, assurant
                  ainsi votre confort quelle que soit la saison.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="amenities" className="mt-6">
              <ScrollAnimation direction="up" delay={100}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                    >
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-800">
                        {amenity.icon}
                      </div>
                      <div className="flex-1">
                        <span className="font-medium">{amenity.name}</span>
                      </div>
                      {amenity.included ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <X className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  ))}
                </div>
              </ScrollAnimation>

              <ScrollAnimation direction="up" delay={200}>
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Équipements supplémentaires</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    <div className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-md transition-colors">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Serviettes</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-md transition-colors">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Produits de toilette</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-md transition-colors">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Bureau</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-md transition-colors">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Prises électriques</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-md transition-colors">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Miroir</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-md transition-colors">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Porte-bagages</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-md transition-colors">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Volets occultants</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-md transition-colors">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Insonorisation</span>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </TabsContent>

            <TabsContent value="rules" className="mt-6">
              <div className="space-y-6">
                <ScrollAnimation direction="up" delay={100}>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Horaires</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-white rounded-lg shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 mb-2">
                          <CalendarRange className="h-5 w-5 text-slate-800" />
                          <span className="font-medium">Check-in</span>
                        </div>
                        <p>24h/24</p>
                        <p className="text-sm text-gray-600 mt-1">Arrivée possible à toute heure</p>
                      </div>
                      <div className="p-4 bg-white rounded-lg shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 mb-2">
                          <CalendarRange className="h-5 w-5 text-slate-800" />
                          <span className="font-medium">Check-out</span>
                        </div>
                        <p>Jusqu'à 10h00</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Départ tardif possible avec supplément (selon disponibilité)
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation direction="up" delay={200}>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Règles de la chambre</h3>
                    <ul className="space-y-2 bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                      <li className="flex items-start gap-2 p-2 border-b border-slate-100">
                        <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>
                          Non-fumeur (des frais de nettoyage supplémentaires s'appliquent en cas de non-respect)
                        </span>
                      </li>
                      <li className="flex items-start gap-2 p-2 border-b border-slate-100">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>
                          Animaux acceptés (supplément de $15 par nuit et par animal, maximum 1 animal par chambre)
                        </span>
                      </li>
                      <li className="flex items-start gap-2 p-2 border-b border-slate-100">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Lit bébé disponible sur demande (gratuit)</span>
                      </li>
                      <li className="flex items-start gap-2 p-2">
                        <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Pas de fête ni d'événement</span>
                      </li>
                    </ul>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation direction="up" delay={300}>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Politique d'annulation</h3>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                      <p className="mb-2">
                        Annulation gratuite jusqu'à 24 heures avant l'arrivée. Après cette période, le montant de la
                        première nuit sera facturé.
                      </p>
                      <p>
                        En cas de non-présentation, le montant total de la réservation sera facturé. Nous vous
                        recommandons de souscrire une assurance voyage.
                      </p>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Avis des clients</h3>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">3.2/5</span>
                    <span className="text-sm text-gray-600">(32 avis)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ScrollAnimation direction="up" delay={100}>
                    <TestimonialCard
                      name="Pierre D."
                      date="Avril 2023"
                      rating={4}
                      text="Chambre propre et confortable. Idéale pour une étape sur la route. Le personnel est accueillant et le parking sécurisé est un plus."
                    />
                  </ScrollAnimation>
                  <ScrollAnimation direction="up" delay={200}>
                    <TestimonialCard
                      name="Sophie M."
                      date="Mars 2023"
                      rating={3}
                      text="Bon rapport qualité-prix. La chambre est basique mais fonctionnelle. Le Wi-Fi fonctionne bien, ce qui est appréciable."
                    />
                  </ScrollAnimation>
                  <ScrollAnimation direction="up" delay={300}>
                    <TestimonialCard
                      name="Jean L."
                      date="Février 2023"
                      rating={2}
                      text="Chambre correcte mais l'insonorisation laisse à désirer. On entend beaucoup les voitures qui passent sur la route."
                    />
                  </ScrollAnimation>
                  <ScrollAnimation direction="up" delay={400}>
                    <TestimonialCard
                      name="Marie T."
                      date="Janvier 2023"
                      rating={4}
                      text="Parfait pour une nuit d'étape. Lit confortable et douche chaude. Le petit-déjeuner est un peu cher pour ce qui est proposé."
                    />
                  </ScrollAnimation>
                </div>

                <div className="mt-6 text-center">
                  <Button
                    variant="outline"
                    className="border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white"
                  >
                    Voir tous les avis
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </ScrollAnimation>

      {/* Room Comparison */}
      <ScrollAnimation direction="up">
        <section className="py-12 px-4 md:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Comparez nos chambres</h2>
            <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-800 text-white">
                    <th className="p-4 text-left rounded-tl-xl">Type de chambre</th>
                    <th className="p-4 text-center">Taille</th>
                    <th className="p-4 text-center">Capacité</th>
                    <th className="p-4 text-center">Lit</th>
                    <th className="p-4 text-center">Prix</th>
                    <th className="p-4 text-center rounded-tr-xl">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b border-gray-200">
                    <td className="p-4 font-medium">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-500">Standard</Badge>
                        Chambre Standard
                      </div>
                    </td>
                    <td className="p-4 text-center">20m²</td>
                    <td className="p-4 text-center">2 personnes</td>
                    <td className="p-4 text-center">1 lit Queen Size</td>
                    <td className="p-4 text-center font-bold">$59</td>
                    <td className="p-4 text-center">
                      <Button size="sm" className="w-full">
                        Sélectionner
                      </Button>
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray-200">
                    <td className="p-4 font-medium">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-500">De Luxe</Badge>
                        Chambre De Luxe
                      </div>
                    </td>
                    <td className="p-4 text-center">25m²</td>
                    <td className="p-4 text-center">2 personnes</td>
                    <td className="p-4 text-center">1 lit Double</td>
                    <td className="p-4 text-center font-bold">$89</td>
                    <td className="p-4 text-center">
                      <Link href="/chambres/deluxe">
                        <Button size="sm" variant="outline" className="w-full">
                          Voir
                        </Button>
                      </Link>
                    </td>
                  </tr>
                  <tr className="bg-white rounded-b-xl">
                    <td className="p-4 font-medium rounded-bl-xl">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-purple-500">VIP</Badge>
                        Chambre VIP
                      </div>
                    </td>
                    <td className="p-4 text-center">20m²</td>
                    <td className="p-4 text-center">2 personnes</td>
                    <td className="p-4 text-center">1 lit Double</td>
                    <td className="p-4 text-center font-bold">$99</td>
                    <td className="p-4 text-center rounded-br-xl">
                      <Link href="/chambres/vip">
                        <Button size="sm" variant="outline" className="w-full">
                          Voir
                        </Button>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Booking Section */}
      <ScrollAnimation direction="up">
        <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto w-full">
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-gray-200">
            <h2 className="text-2xl font-bold mb-6">Réservez votre chambre Standard</h2>
            <BookingForm />
          </div>
        </section>
      </ScrollAnimation>

      {/* Other Rooms Section */}
      <ScrollAnimation direction="up">
        <section className="py-12 px-4 md:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Autres chambres qui pourraient vous intéresser</h2>
              <Link
                href="/chambres"
                className="text-slate-800 hover:text-slate-600 flex items-center mt-2 md:mt-0 group"
              >
                <span>Voir toutes nos chambres</span>
                <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ScrollAnimation direction="left" delay={100}>
                <Card className="overflow-hidden card-hover border-gray-200">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src="/deluxe-room-1.jpeg"
                      alt="Chambre De Luxe"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <Badge className="absolute top-3 right-3 bg-amber-500">Populaire</Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold">Chambre De Luxe</h3>
                      <p className="font-bold text-slate-800">À partir de $89</p>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Chambre de luxe avec lit double confortable et coin salon avec fauteuil en rotin.
                    </p>
                    <Link href="/chambres/deluxe" className="w-full">
                      <Button className="w-full">Voir les détails</Button>
                    </Link>
                  </CardContent>
                </Card>
              </ScrollAnimation>

              <ScrollAnimation direction="right" delay={200}>
                <Card className="overflow-hidden card-hover border-gray-200">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src="/vip1.jpeg"
                      alt="Chambre VIP"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold">Chambre VIP</h3>
                      <p className="font-bold text-slate-800">À partir de $99</p>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Chambre VIP avec lit double, coin salon et décoration élégante pour un séjour raffiné.
                    </p>
                    <Link href="/chambres/vip" className="w-full">
                      <Button className="w-full">Voir les détails</Button>
                    </Link>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            </div>
          </div>
        </section>
      </ScrollAnimation>
    </main>
  )
}
