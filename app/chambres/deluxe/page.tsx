import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
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
  BedDouble,
  Users,
  Clock,
  CalendarRange,
  StarIcon,
  Heart,
  Share2,
} from "lucide-react"
import BookingForm from "@/components/booking-form"
import RoomGallery from "@/components/room-gallery"
import TestimonialCard from "@/components/testimonial-card"
import ScrollAnimation from "@/components/scroll-animation"
import Refrigerator from "@/components/icons/refrigerator"

export const metadata: Metadata = {
  title: "Chambre De Luxe - JohnService Motel",
  description:
    "Découvrez notre chambre De Luxe spacieuse avec un lit double confortable, idéale pour un séjour relaxant.",
}

export default function DeluxeRoomPage() {
  // Images for the room gallery
  const roomImages = [
    {
      src: "/deluxe-room-1.jpeg",
      alt: "Vue d'ensemble de la chambre De Luxe",
    },
    {
      src: "/deluxe-room-2.jpeg",
      alt: "Lit confortable de la chambre De Luxe",
    },
    {
      src: "/deluxe-room-3.jpeg",
      alt: "Espace détente de la chambre De Luxe",
    },
    {
      src: "/deluxe-room-4.jpeg",
      alt: "Vue latérale de la chambre De Luxe",
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
    { name: "Téléphone", icon: <Refrigerator className="h-5 w-5" />, included: true },
  ]

  return (
    <main className="flex min-h-screen flex-col">
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-slate-800 transition-colors">
              Accueil
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/chambres" className="hover:text-slate-800 transition-colors">
              Chambres
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-slate-800 font-medium">Chambre De Luxe</span>
          </div>
        </div>
      </div>

      {/* Room Details Section */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Room Gallery */}
            <ScrollAnimation direction="left" className="order-2 lg:order-1">
              <RoomGallery images={roomImages} />
            </ScrollAnimation>

            {/* Room Info */}
            <ScrollAnimation direction="right" className="order-1 lg:order-2">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                  <h1 className="text-3xl md:text-4xl font-bold">Chambre De Luxe</h1>
                  <div className="flex gap-2">
                    <Badge className="bg-green-500 hover:bg-green-600">De Luxe</Badge>
                    <Badge className="bg-amber-500 hover:bg-amber-600">Populaire</Badge>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <BedDouble className="h-5 w-5 text-slate-800" />
                    <span>1 lit Double confortable</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-slate-800" />
                    <span>2 personnes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-slate-800" />
                    <span>25m²</span>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">
                  Notre chambre De Luxe de 25m² offre un espace élégant et raffiné avec un lit double confortable et des
                  équipements modernes haut de gamme. Soigneusement décorée dans des tons apaisants, cette chambre
                  spacieuse dispose d'une télévision à écran plat avec chaînes internationales, d'un coin salon avec
                  fauteuil en rotin pour vos moments de détente, d'une climatisation individuelle, et d'une salle de
                  bain privée entièrement équipée. Avec sa connexion Wi-Fi gratuite haut débit, son téléphone direct et
                  ses nombreux espaces de rangement, cette chambre offre tout le confort nécessaire pour un séjour
                  d'affaires ou de loisirs des plus agréables.
                </p>

                <div className="flex items-center gap-2 mb-6">
                  <CalendarRange className="h-5 w-5 text-slate-800" />
                  <span className="font-medium">Check-in: 24h/24</span>
                  <span className="mx-2">|</span>
                  <CalendarRange className="h-5 w-5 text-slate-800" />
                  <span className="font-medium">Check-out: 10h00</span>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold">Prix par nuit</span>
                    <div className="text-right">
                      <span className="text-sm text-gray-500 line-through mr-2">$99</span>
                      <span className="text-2xl font-bold text-slate-800">$89</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Petit-déjeuner non inclus (+$9 par personne)</p>
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-primary hover:bg-primary/90">Réserver maintenant</Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1 text-green-600">
                    <Check className="h-4 w-4" />
                    <span>Annulation gratuite jusqu'à 48h</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <Check className="h-4 w-4" />
                    <span>Paiement à l'arrivée</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <Check className="h-4 w-4" />
                    <span>Équipements pour bébés gratuits</span>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <ScrollAnimation>
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
                <ScrollAnimation delay={0.1}>
                  <div className="space-y-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p>
                      Notre chambre De Luxe est l'option idéale pour les voyageurs exigeants. Avec ses 25m², elle offre
                      un espace confortable et élégant pour vous détendre après une journée de voyage ou de travail.
                    </p>
                    <p>
                      La chambre est équipée d'un lit double confortable avec un matelas de qualité supérieure et du
                      linge de lit doux en coton pour garantir une nuit reposante. La décoration soignée et les tons
                      clairs créent une atmosphère apaisante.
                    </p>
                    <p>
                      Chaque chambre De Luxe dispose d'une télévision à écran plat, d'un coin salon avec fauteuil en
                      rotin, et d'un espace de rangement pour vos affaires. Un téléphone est également disponible pour
                      contacter la réception à tout moment.
                    </p>
                    <p>
                      La connexion Wi-Fi gratuite et de haute vitesse est disponible dans toute la chambre, et la
                      climatisation individuelle vous permet de régler la température selon vos préférences.
                    </p>
                    <p>
                      Pour votre confort, nous fournissons des serviettes de qualité et des produits de toilette. Un
                      service de ménage quotidien est inclus dans votre séjour.
                    </p>
                  </div>
                </ScrollAnimation>
              </TabsContent>

              <TabsContent value="amenities" className="mt-6">
                <ScrollAnimation delay={0.1}>
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {amenities.map((amenity, index) => (
                        <ScrollAnimation
                          key={index}
                          delay={0.1 + index * 0.05}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
                        >
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
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
                        </ScrollAnimation>
                      ))}
                    </div>

                    <div className="mt-8">
                      <h3 className="text-xl font-bold mb-4">Équipements spéciaux</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                        <ScrollAnimation delay={0.2} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Lit bébé disponible (gratuit, sur demande)</span>
                        </ScrollAnimation>
                        <ScrollAnimation delay={0.25} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Chaise haute disponible (gratuit, sur demande)</span>
                        </ScrollAnimation>
                        <ScrollAnimation delay={0.3} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Téléphone</span>
                        </ScrollAnimation>
                        <ScrollAnimation delay={0.35} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Chaînes TV internationales</span>
                        </ScrollAnimation>
                        <ScrollAnimation delay={0.4} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Espace de rangement</span>
                        </ScrollAnimation>
                        <ScrollAnimation delay={0.45} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Salle de bain privée</span>
                        </ScrollAnimation>
                        <ScrollAnimation delay={0.5} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Produits de toilette</span>
                        </ScrollAnimation>
                        <ScrollAnimation delay={0.55} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Service de ménage quotidien</span>
                        </ScrollAnimation>
                      </div>
                    </div>
                  </div>
                </ScrollAnimation>
              </TabsContent>

              <TabsContent value="rules" className="mt-6">
                <ScrollAnimation delay={0.1}>
                  <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div>
                      <h3 className="text-xl font-bold mb-3">Horaires</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-2 mb-2">
                            <CalendarRange className="h-5 w-5 text-slate-800" />
                            <span className="font-medium">Check-in</span>
                          </div>
                          <p>24h/24</p>
                          <p className="text-sm text-gray-600 mt-1">Arrivée possible à toute heure</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
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

                    <div>
                      <h3 className="text-xl font-bold mb-3">Règles générales</h3>
                      <ul className="space-y-2">
                        <ScrollAnimation delay={0.2} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>Les enfants de tout âge sont les bienvenus (maximum 2 adultes et 1 enfant)</span>
                        </ScrollAnimation>
                        <ScrollAnimation delay={0.25} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>
                            Lit bébé et chaise haute disponibles gratuitement sur demande (à préciser lors de la
                            réservation)
                          </span>
                        </ScrollAnimation>
                        <ScrollAnimation delay={0.3} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>
                            Menu enfant disponible au petit-déjeuner ($6 par enfant de moins de 12 ans au lieu de $9)
                          </span>
                        </ScrollAnimation>
                        <ScrollAnimation delay={0.35} className="flex items-start gap-2">
                          <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <span>
                            Non-fumeur (des frais de nettoyage supplémentaires s'appliquent en cas de non-respect)
                          </span>
                        </ScrollAnimation>
                        <ScrollAnimation delay={0.4} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>
                            Animaux acceptés (supplément de $15 par nuit et par animal, maximum 1 animal par chambre)
                          </span>
                        </ScrollAnimation>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3">Politique d'annulation</h3>
                      <p className="mb-2">
                        Annulation gratuite jusqu'à 48 heures avant l'arrivée. Après cette période, le montant de la
                        première nuit sera facturé.
                      </p>
                      <p>
                        En cas de non-présentation, le montant total de la réservation sera facturé. Nous vous
                        recommandons de souscrire une assurance voyage.
                      </p>
                    </div>
                  </div>
                </ScrollAnimation>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <ScrollAnimation delay={0.1}>
                  <div className="mb-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">Avis des clients</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`h-5 w-5 ${i < 4 ? "text-amber-500 fill-amber-500" : "text-gray-300 fill-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="font-medium">4.2/5</span>
                        <span className="text-sm text-gray-600">(48 avis)</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ScrollAnimation delay={0.2}>
                        <TestimonialCard
                          name="Jean et Marie"
                          date="Juillet 2023"
                          rating={5}
                          text="Chambre très confortable et propre. Le lit est excellent et nous avons apprécié le fauteuil en rotin pour se détendre. Personnel accueillant et serviable."
                        />
                      </ScrollAnimation>
                      <ScrollAnimation delay={0.3}>
                        <TestimonialCard
                          name="Caroline D."
                          date="Août 2023"
                          rating={4}
                          text="Très bonne option pour un couple. La chambre est bien équipée et le lit confortable. Seul bémol : le petit-déjeuner n'est pas inclus."
                        />
                      </ScrollAnimation>
                      <ScrollAnimation delay={0.4}>
                        <TestimonialCard
                          name="Laurent B."
                          date="Juin 2023"
                          rating={5}
                          text="Excellente chambre, bien pensée et confortable. Le personnel a été très attentionné. Rapport qualité-prix imbattable."
                        />
                      </ScrollAnimation>
                      <ScrollAnimation delay={0.5}>
                        <TestimonialCard
                          name="Nathalie F."
                          date="Mai 2023"
                          rating={3}
                          text="Chambre correcte mais un peu bruyante. On entendait les voisins. Sinon l'espace est bien aménagé et le lit était de bonne qualité."
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
                </ScrollAnimation>
              </TabsContent>
            </Tabs>
          </ScrollAnimation>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <ScrollAnimation direction="up">
            <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-gray-200">
              <h2 className="text-2xl font-bold mb-6">Réservez votre chambre De Luxe</h2>
              <BookingForm />
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Other Rooms Section */}
      <section className="py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <ScrollAnimation>
              <h2 className="text-2xl font-bold">Autres chambres qui pourraient vous intéresser</h2>
            </ScrollAnimation>
            <ScrollAnimation delay={0.1}>
              <Link
                href="/chambres"
                className="text-slate-800 hover:text-slate-600 flex items-center mt-2 md:mt-0 group"
              >
                <span>Voir toutes nos chambres</span>
                <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollAnimation direction="left" delay={0.2}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-gray-200">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/standard-room-1.jpeg"
                    alt="Chambre Standard"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Chambre Standard</h3>
                    <p className="font-bold text-slate-800">À partir de $59</p>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Chambre confortable avec lit queen size et salle de bain privée, idéale pour 2 personnes.
                  </p>
                  <Link href="/chambres/standard" className="w-full">
                    <Button className="w-full">Voir les détails</Button>
                  </Link>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation direction="right" delay={0.3}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-gray-200">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/vip1.jpeg"
                    alt="Chambre VIP"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <Badge className="absolute top-3 right-3 bg-purple-500">Premium</Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Chambre VIP</h3>
                    <p className="font-bold text-slate-800">À partir de $99</p>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Chambre VIP avec lit king size, coin salon et petit-déjeuner inclus pour un séjour luxueux.
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
    </main>
  )
}
