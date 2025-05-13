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
  Baby,
  Heart,
  Share2,
  Refrigerator,
} from "lucide-react"
import BookingForm from "@/components/booking-form"
import RoomGallery from "@/components/room-gallery"
import TestimonialCard from "@/components/testimonial-card"
import ScrollAnimation from "@/components/scroll-animation"
import CountUp from "@/components/count-up"

export const metadata: Metadata = {
  title: "Chambre Familiale - JohnService Motel",
  description:
    "Découvrez notre chambre Familiale spacieuse avec un lit queen size et deux lits simples, idéale pour les familles jusqu'à 4 personnes.",
}

export default function FamilyRoomPage() {
  // Images for the room gallery
  const roomImages = [
    {
      src: "/family-motel-room.png",
      alt: "Vue d'ensemble de la chambre Familiale",
    },
    {
      src: "/family-motel-beds.png",
      alt: "Lits de la chambre Familiale",
    },
    {
      src: "/family-motel-bathroom.png",
      alt: "Salle de bain de la chambre Familiale",
    },
    {
      src: "/family-motel-detail.png",
      alt: "Détails de la chambre Familiale",
    },
  ]

  // Amenities included in the room
  const amenities = [
    { name: "Wi-Fi gratuit", icon: <Wifi className="h-5 w-5" />, included: true },
    { name: "TV écran plat", icon: <Tv className="h-5 w-5" />, included: true },
    { name: "Climatisation", icon: <Snowflake className="h-5 w-5" />, included: true },
    { name: "Salle de bain spacieuse", icon: <Bath className="h-5 w-5" />, included: true },
    { name: "Petit-déjeuner inclus", icon: <Coffee className="h-5 w-5" />, included: false },
    { name: "Parking gratuit", icon: <ParkingCircle className="h-5 w-5" />, included: true },
    { name: "Réfrigérateur", icon: <Refrigerator className="h-5 w-5" />, included: true },
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
            <span className="text-slate-800 font-medium">Chambre Familiale</span>
          </div>
        </div>
      </div>

      {/* Room Details Section */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Room Gallery */}
          <ScrollAnimation direction="left" className="order-2 lg:order-1">
            <RoomGallery images={roomImages} />
          </ScrollAnimation>

          {/* Room Info */}
          <ScrollAnimation direction="right" className="order-1 lg:order-2">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                <h1 className="text-3xl md:text-4xl font-bold">Chambre Familiale</h1>
                <div className="flex gap-2">
                  <Badge className="bg-green-500 hover:bg-green-600">Familiale</Badge>
                  <Badge className="bg-amber-500 hover:bg-amber-600">Populaire</Badge>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${i < 4 ? "text-amber-500 fill-amber-500" : "text-gray-300 fill-gray-300"}`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-2">(48 avis)</span>
              </div>

              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <BedDouble className="h-5 w-5 text-slate-800" />
                  <span>1 lit Queen + 2 lits simples</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-slate-800" />
                  <span>4 personnes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-slate-800" />
                  <span>30m²</span>
                </div>
              </div>

              <p className="text-gray-700 mb-6">
                Notre chambre Familiale est spécialement conçue pour accueillir les familles dans un espace confortable
                et fonctionnel. Avec un lit queen size pour les parents et deux lits simples pour les enfants, cette
                chambre spacieuse offre tout le nécessaire pour un séjour agréable en famille.
              </p>

              <div className="flex items-center gap-2 mb-6">
                <CalendarRange className="h-5 w-5 text-slate-800" />
                <span className="font-medium">Check-in: 14h00</span>
                <span className="mx-2">|</span>
                <CalendarRange className="h-5 w-5 text-slate-800" />
                <span className="font-medium">Check-out: 11h00</span>
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
      </section>

      {/* Tabs Section */}
      <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto w-full">
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
                    Notre chambre Familiale est l'option idéale pour les familles en déplacement. Avec ses 30m², elle
                    offre suffisamment d'espace pour que chacun puisse se détendre confortablement après une journée de
                    voyage.
                  </p>
                  <p>
                    La chambre est équipée d'un lit queen size pour les parents et de deux lits simples pour les
                    enfants, tous dotés de matelas de qualité et de linge de lit doux pour garantir une nuit reposante à
                    toute la famille.
                  </p>
                  <p>
                    La salle de bain spacieuse comprend une douche, des serviettes propres et des produits de toilette
                    de base adaptés aux familles. Un petit réfrigérateur est également disponible pour conserver les
                    collations et boissons des enfants.
                  </p>
                  <p>
                    Chaque chambre Familiale est équipée d'une télévision à écran plat, d'une connexion Wi-Fi gratuite,
                    et d'un espace de rangement suffisant pour les bagages de toute la famille. La climatisation
                    individuelle vous permet de régler la température selon vos préférences.
                  </p>
                  <p>
                    Sur demande, nous pouvons fournir gratuitement un lit bébé et une chaise haute pour les plus petits.
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
                    <h3 className="text-xl font-bold mb-4">Équipements spéciaux pour familles</h3>
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
                        <span>Réfrigérateur</span>
                      </ScrollAnimation>
                      <ScrollAnimation delay={0.35} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Chaînes TV pour enfants</span>
                      </ScrollAnimation>
                      <ScrollAnimation delay={0.4} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Espace de rangement supplémentaire</span>
                      </ScrollAnimation>
                      <ScrollAnimation delay={0.45} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Salle de bain avec baignoire</span>
                      </ScrollAnimation>
                      <ScrollAnimation delay={0.5} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Produits de toilette adaptés aux enfants</span>
                      </ScrollAnimation>
                      <ScrollAnimation delay={0.55} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Possibilité de préparer des repas simples</span>
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
                        <p>De 14h00 à 22h00</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Arrivée tardive possible (prévenir la réception à l'avance)
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2 mb-2">
                          <CalendarRange className="h-5 w-5 text-slate-800" />
                          <span className="font-medium">Check-out</span>
                        </div>
                        <p>Jusqu'à 11h00</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Départ tardif possible avec supplément (selon disponibilité)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3">Règles spéciales pour les familles</h3>
                    <ul className="space-y-2">
                      <ScrollAnimation delay={0.2} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>
                          Les enfants de tout âge sont les bienvenus (maximum 2 adultes et 2 enfants ou 3 adultes et 1
                          enfant)
                        </span>
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
                        name="Famille Martin"
                        date="Juillet 2023"
                        rating={5}
                        text="Parfait pour notre famille de 4 personnes ! Chambre spacieuse, propre et bien équipée. Les enfants ont adoré avoir leurs propres lits. Nous reviendrons !"
                      />
                    </ScrollAnimation>
                    <ScrollAnimation delay={0.3}>
                      <TestimonialCard
                        name="Caroline D."
                        date="Août 2023"
                        rating={4}
                        text="Très bonne option pour une famille. Le réfrigérateur est un vrai plus quand on voyage avec des enfants. Seul bémol : pas de baignoire dans notre salle de bain."
                      />
                    </ScrollAnimation>
                    <ScrollAnimation delay={0.4}>
                      <TestimonialCard
                        name="Laurent B."
                        date="Juin 2023"
                        rating={5}
                        text="Excellente chambre familiale, bien pensée et confortable. Le personnel a été très attentionné avec nos enfants. Rapport qualité-prix imbattable."
                      />
                    </ScrollAnimation>
                    <ScrollAnimation delay={0.5}>
                      <TestimonialCard
                        name="Nathalie F."
                        date="Mai 2023"
                        rating={3}
                        text="Chambre correcte mais un peu bruyante. On entendait les voisins. Sinon l'espace est bien aménagé pour une famille et le lit bébé fourni était de bonne qualité."
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
      </section>

      {/* Family Benefits Section */}
      <section className="py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimation>
            <h2 className="text-2xl font-bold mb-8">Avantages pour les familles</h2>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollAnimation direction="up" delay={0.1}>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Baby className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Équipements pour bébés</h3>
                <p className="text-gray-600">
                  Lit bébé et chaise haute disponibles gratuitement sur demande. Nous pouvons également fournir un
                  chauffe-biberon si nécessaire.
                </p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.2}>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Tv className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Divertissement</h3>
                <p className="text-gray-600">
                  Télévision avec chaînes pour enfants. Sur demande, nous pouvons vous prêter des jeux de société
                  adaptés à l'âge de vos enfants.
                </p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.3}>
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                  <Coffee className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Repas adaptés</h3>
                <p className="text-gray-600">
                  Petit-déjeuner avec options pour enfants à tarif réduit. Réfrigérateur dans la chambre pour conserver
                  les collations et boissons.
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Room Comparison */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimation>
            <h2 className="text-2xl font-bold mb-8">Comparez nos chambres</h2>
          </ScrollAnimation>
          <ScrollAnimation delay={0.1}>
            <div className="overflow-x-auto bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-800 text-white">
                    <th className="p-4 text-left rounded-tl-lg">Type de chambre</th>
                    <th className="p-4 text-center">Taille</th>
                    <th className="p-4 text-center">Capacité</th>
                    <th className="p-4 text-center">Lit</th>
                    <th className="p-4 text-center">Prix</th>
                    <th className="p-4 text-center rounded-tr-lg">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors">
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
                      <Link href="/chambres/standard">
                        <Button size="sm" variant="outline" className="w-full">
                          Voir
                        </Button>
                      </Link>
                    </td>
                  </tr>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <td className="p-4 font-medium">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-500">Familiale</Badge>
                        Chambre Familiale
                      </div>
                    </td>
                    <td className="p-4 text-center">30m²</td>
                    <td className="p-4 text-center">4 personnes</td>
                    <td className="p-4 text-center">1 lit Queen + 2 lits simples</td>
                    <td className="p-4 text-center font-bold">$89</td>
                    <td className="p-4 text-center">
                      <Button size="sm" className="w-full">
                        Sélectionner
                      </Button>
                    </td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium rounded-bl-lg">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-purple-500">Premium</Badge>
                        Chambre Premium
                      </div>
                    </td>
                    <td className="p-4 text-center">25m²</td>
                    <td className="p-4 text-center">2 personnes</td>
                    <td className="p-4 text-center">1 lit King Size</td>
                    <td className="p-4 text-center font-bold">$99</td>
                    <td className="p-4 text-center rounded-br-lg">
                      <Link href="/chambres/premium">
                        <Button size="sm" variant="outline" className="w-full">
                          Voir
                        </Button>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <ScrollAnimation direction="up">
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-gray-200">
            <h2 className="text-2xl font-bold mb-6">Réservez votre chambre Familiale</h2>
            <BookingForm />
          </div>
        </ScrollAnimation>
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
                    src="/standard-motel-room.png"
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
                    src="/premium-motel-room.png"
                    alt="Chambre Premium"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Chambre Premium</h3>
                    <p className="font-bold text-slate-800">À partir de $99</p>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Chambre premium avec lit king size, coin salon et minibar pour un séjour plus luxueux.
                  </p>
                  <Link href="/chambres/premium" className="w-full">
                    <Button className="w-full">Voir les détails</Button>
                  </Link>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Family Travel Tips Section */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimation>
            <h2 className="text-2xl font-bold mb-8">Conseils pour voyager en famille</h2>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollAnimation direction="left" delay={0.1}>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-4">Activités familiales à proximité</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-medium">Parc d'attractions (15 min en voiture)</p>
                      <p className="text-sm text-gray-600">
                        Manèges et attractions pour tous les âges, restauration sur place.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-medium">Zoo (20 min en voiture)</p>
                      <p className="text-sm text-gray-600">
                        Plus de 300 animaux, aire de jeux et spectacles pour enfants.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-medium">Centre commercial (10 min en voiture)</p>
                      <p className="text-sm text-gray-600">Boutiques, restaurants et espace de jeux pour enfants.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="right" delay={0.2}>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-4">Conseils pratiques</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Réservez à l'avance</p>
                      <p className="text-sm text-gray-600">
                        Les chambres familiales sont très demandées, surtout pendant les vacances scolaires.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Précisez vos besoins</p>
                      <p className="text-sm text-gray-600">
                        Indiquez lors de la réservation si vous avez besoin d'un lit bébé ou d'une chaise haute.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Demandez des conseils</p>
                      <p className="text-sm text-gray-600">
                        Notre personnel se fera un plaisir de vous recommander des activités adaptées aux enfants.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 md:px-8 bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimation>
            <h2 className="text-2xl font-bold mb-8 text-center">Pourquoi choisir notre chambre Familiale?</h2>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <ScrollAnimation direction="up" delay={0.1} className="text-center p-6 bg-slate-700/50 rounded-xl">
              <div className="text-4xl font-bold text-amber-400 mb-2">
                <CountUp end={98} suffix="%" />
              </div>
              <p>de satisfaction client</p>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.2} className="text-center p-6 bg-slate-700/50 rounded-xl">
              <div className="text-4xl font-bold text-amber-400 mb-2">
                <CountUp end={30} suffix="m²" />
              </div>
              <p>d'espace confortable</p>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.3} className="text-center p-6 bg-slate-700/50 rounded-xl">
              <div className="text-4xl font-bold text-amber-400 mb-2">
                <CountUp end={4} />
              </div>
              <p>personnes maximum</p>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.4} className="text-center p-6 bg-slate-700/50 rounded-xl">
              <div className="text-4xl font-bold text-amber-400 mb-2">
                <CountUp end={12} prefix="+" />
              </div>
              <p>équipements inclus</p>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </main>
  )
}
