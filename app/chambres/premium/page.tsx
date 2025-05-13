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
  Wine,
  Laptop,
  Dumbbell,
} from "lucide-react"
import BookingForm from "@/components/booking-form"
import RoomGallery from "@/components/room-gallery"
import TestimonialCard from "@/components/testimonial-card"
import Refrigerator from "@/components/icons/refrigerator"

export const metadata: Metadata = {
  title: "Chambre Premium - JohnService Motel",
  description:
    "Découvrez notre chambre Premium avec lit king size, coin salon et minibar. Le summum du confort pour votre séjour au JohnService Motel.",
}

export default function PremiumRoomPage() {
  // Images for the room gallery
  const roomImages = [
    {
      src: "/premium-motel-room.png",
      alt: "Vue d'ensemble de la chambre Premium",
    },
    {
      src: "/premium-motel-bathroom.png",
      alt: "Salle de bain de la chambre Premium",
    },
    {
      src: "/premium-motel-seating.png",
      alt: "Coin salon de la chambre Premium",
    },
    {
      src: "/premium-motel-detail.png",
      alt: "Détails de la chambre Premium",
    },
  ]

  // Amenities included in the room
  const amenities = [
    { name: "Wi-Fi haut débit", icon: <Wifi className="h-5 w-5" />, included: true },
    { name: 'TV écran plat 42"', icon: <Tv className="h-5 w-5" />, included: true },
    { name: "Climatisation", icon: <Snowflake className="h-5 w-5" />, included: true },
    { name: "Salle de bain luxueuse", icon: <Bath className="h-5 w-5" />, included: true },
    { name: "Petit-déjeuner inclus", icon: <Coffee className="h-5 w-5" />, included: true },
    { name: "Parking gratuit", icon: <ParkingCircle className="h-5 w-5" />, included: true },
    { name: "Minibar", icon: <Refrigerator className="h-5 w-5" />, included: true },
    { name: "Coin salon", icon: <Laptop className="h-5 w-5" />, included: true },
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
            <span className="text-slate-800 font-medium">Chambre Premium</span>
          </div>
        </div>
      </div>

      {/* Room Details Section */}
      <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Room Gallery */}
          <div className="order-2 lg:order-1">
            <RoomGallery images={roomImages} />
          </div>

          {/* Room Info */}
          <div className="order-1 lg:order-2">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
              <h1 className="text-3xl md:text-4xl font-bold">Chambre Premium</h1>
              <Badge className="bg-purple-500">Premium</Badge>
            </div>

            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-5 w-5 ${i < 5 ? "text-amber-500 fill-amber-500" : "text-gray-300 fill-gray-300"}`}
                />
              ))}
              <span className="text-sm text-gray-600 ml-2">(56 avis)</span>
            </div>

            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <BedDouble className="h-5 w-5 text-slate-800" />
                <span>Lit King Size</span>
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
              Notre chambre Premium offre une expérience de séjour supérieure avec des équipements haut de gamme. Dotée
              d'un lit king size ultra-confortable, d'un coin salon élégant et d'un minibar bien approvisionné, cette
              chambre est idéale pour les voyageurs exigeants en quête de confort et de raffinement.
            </p>

            <div className="flex items-center gap-2 mb-6">
              <CalendarRange className="h-5 w-5 text-slate-800" />
              <span className="font-medium">Check-in: 14h00</span>
              <span className="mx-2">|</span>
              <CalendarRange className="h-5 w-5 text-slate-800" />
              <span className="font-medium">Check-out: 12h00</span>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-bold">Prix par nuit</span>
                <span className="text-2xl font-bold text-slate-800">99€</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">Petit-déjeuner inclus</p>
              <Button className="w-full bg-primary hover:bg-primary/90">Réserver maintenant</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
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
                Notre chambre Premium est conçue pour offrir une expérience de séjour exceptionnelle. Avec ses 25m²,
                elle offre un espace généreux pour se détendre dans un cadre élégant et raffiné.
              </p>
              <p>
                Le lit king size est équipé d'un matelas haut de gamme, de linge de lit en coton égyptien et d'oreillers
                premium pour vous garantir une nuit de sommeil parfaite. Le coin salon comprend un fauteuil confortable
                et une table basse, idéal pour travailler ou se détendre.
              </p>
              <p>
                La salle de bain luxueuse est dotée d'une douche à l'italienne spacieuse, de serviettes moelleuses et de
                produits de toilette de qualité supérieure. Un sèche-cheveux puissant est également à votre disposition.
              </p>
              <p>
                Chaque chambre Premium est équipée d'une télévision à écran plat 42", d'une connexion Wi-Fi haut débit,
                d'un minibar bien approvisionné et d'une machine à café Nespresso. Un bureau ergonomique est également
                disponible pour les voyageurs d'affaires.
              </p>
              <p>
                La climatisation individuelle vous permet de régler la température selon vos préférences, assurant ainsi
                votre confort quelle que soit la saison. Les fenêtres à double vitrage garantissent une isolation
                phonique optimale pour un séjour paisible.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="amenities" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
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
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Équipements premium exclusifs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Lit King Size avec matelas haut de gamme</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Linge de lit en coton égyptien</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Oreillers premium à mémoire de forme</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Douche à l'italienne</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Produits de toilette haut de gamme</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Peignoirs et chaussons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Machine à café Nespresso</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Minibar avec sélection de boissons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Bureau ergonomique</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Fenêtres à double vitrage</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Check-out tardif jusqu'à 12h00</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Service de réveil</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="rules" className="mt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-3">Horaires</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CalendarRange className="h-5 w-5 text-slate-800" />
                      <span className="font-medium">Check-in</span>
                    </div>
                    <p>De 14h00 à 22h00</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Arrivée tardive possible (prévenir la réception à l'avance)
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CalendarRange className="h-5 w-5 text-slate-800" />
                      <span className="font-medium">Check-out</span>
                    </div>
                    <p>Jusqu'à 12h00</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Check-out tardif jusqu'à 14h00 possible avec supplément (selon disponibilité)
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Règles de la chambre</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>Non-fumeur (des frais de nettoyage supplémentaires s'appliquent en cas de non-respect)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>
                      Animaux acceptés (supplément de 15€ par nuit et par animal, maximum 1 animal par chambre)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>Pas de fête ni d'événement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Service en chambre disponible de 7h00 à 22h00</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Politique d'annulation</h3>
                <p className="mb-2">
                  Annulation gratuite jusqu'à 48 heures avant l'arrivée. Après cette période, le montant de la première
                  nuit sera facturé.
                </p>
                <p>
                  En cas de non-présentation, le montant total de la réservation sera facturé. Nous vous recommandons de
                  souscrire une assurance voyage.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Avis des clients</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-5 w-5 ${i < 5 ? "text-amber-500 fill-amber-500" : "text-gray-300 fill-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="font-medium">4.8/5</span>
                  <span className="text-sm text-gray-600">(56 avis)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TestimonialCard
                  name="Michel R."
                  date="Septembre 2023"
                  rating={5}
                  text="Chambre exceptionnelle ! Le lit king size est d'un confort incroyable, et j'ai particulièrement apprécié le coin salon pour travailler. Le petit-déjeuner inclus était délicieux."
                />
                <TestimonialCard
                  name="Isabelle L."
                  date="Août 2023"
                  rating={5}
                  text="Une chambre qui porte bien son nom : Premium ! Tout était parfait, de la qualité de la literie aux produits de toilette. Le minibar bien garni est un vrai plus."
                />
                <TestimonialCard
                  name="Thomas B."
                  date="Juillet 2023"
                  rating={4}
                  text="Très belle chambre, spacieuse et bien équipée. La douche à l'italienne est superbe. Seul petit bémol : le bruit de la climatisation un peu trop présent la nuit."
                />
                <TestimonialCard
                  name="Sophie M."
                  date="Juin 2023"
                  rating={5}
                  text="Séjour parfait ! La chambre Premium vaut vraiment son prix. J'ai adoré la machine à café Nespresso et les peignoirs. Le personnel est aux petits soins."
                />
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

      {/* Premium Benefits Section */}
      <section className="py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Avantages Premium</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm hover-scale">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Wine className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Minibar inclus</h3>
              <p className="text-gray-600">
                Profitez d'une sélection de boissons et snacks premium dans votre minibar, inclus dans le prix de la
                chambre.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover-scale">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Coffee className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Petit-déjeuner inclus</h3>
              <p className="text-gray-600">
                Commencez votre journée avec notre petit-déjeuner buffet complet, inclus dans le tarif de votre chambre
                Premium.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover-scale">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Check-out tardif</h3>
              <p className="text-gray-600">
                Profitez de votre chambre jusqu'à midi sans frais supplémentaires, et possibilité d'extension jusqu'à
                14h (selon disponibilité).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Room Comparison */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Comparez nos chambres</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="p-4 text-left">Type de chambre</th>
                  <th className="p-4 text-center">Taille</th>
                  <th className="p-4 text-center">Capacité</th>
                  <th className="p-4 text-center">Lit</th>
                  <th className="p-4 text-center">Prix</th>
                  <th className="p-4 text-center">Action</th>
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
                  <td className="p-4 text-center font-bold">59€</td>
                  <td className="p-4 text-center">
                    <Link href="/chambres/standard">
                      <Button size="sm" variant="outline" className="w-full">
                        Voir
                      </Button>
                    </Link>
                  </td>
                </tr>
                <tr className="bg-white border-b border-gray-200">
                  <td className="p-4 font-medium">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500">Familiale</Badge>
                      Chambre Familiale
                    </div>
                  </td>
                  <td className="p-4 text-center">30m²</td>
                  <td className="p-4 text-center">4 personnes</td>
                  <td className="p-4 text-center">1 lit Queen + 2 lits simples</td>
                  <td className="p-4 text-center font-bold">89€</td>
                  <td className="p-4 text-center">
                    <Link href="/chambres/familiale">
                      <Button size="sm" variant="outline" className="w-full">
                        Voir
                      </Button>
                    </Link>
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="p-4 font-medium">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-500">Premium</Badge>
                      Chambre Premium
                    </div>
                  </td>
                  <td className="p-4 text-center">25m²</td>
                  <td className="p-4 text-center">2 personnes</td>
                  <td className="p-4 text-center">1 lit King Size</td>
                  <td className="p-4 text-center font-bold">99€</td>
                  <td className="p-4 text-center">
                    <Button size="sm" className="w-full">
                      Sélectionner
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Réservez votre chambre Premium</h2>
          <BookingForm />
        </div>
      </section>

      {/* Other Rooms Section */}
      <section className="py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Autres chambres qui pourraient vous intéresser</h2>
            <Link href="/chambres" className="text-slate-800 hover:text-slate-600 flex items-center mt-2 md:mt-0 group">
              <span>Voir toutes nos chambres</span>
              <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="overflow-hidden card-hover border-gray-200">
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
                  <p className="font-bold text-slate-800">À partir de 59€</p>
                </div>
                <p className="text-gray-600 mb-4">
                  Chambre confortable avec lit queen size et salle de bain privée, idéale pour 2 personnes.
                </p>
                <Link href="/chambres/standard" className="w-full">
                  <Button className="w-full">Voir les détails</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="overflow-hidden card-hover border-gray-200">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/family-motel-room.png"
                  alt="Chambre Familiale"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
                <Badge className="absolute top-3 right-3 bg-amber-500">Populaire</Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Chambre Familiale</h3>
                  <p className="font-bold text-slate-800">À partir de 89€</p>
                </div>
                <p className="text-gray-600 mb-4">
                  Spacieuse chambre familiale avec un lit queen size et deux lits simples, idéale pour les familles.
                </p>
                <Link href="/chambres/familiale" className="w-full">
                  <Button className="w-full">Voir les détails</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Business Traveler Section */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Idéal pour les voyageurs d'affaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4">Équipements pour professionnels</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Laptop className="h-4 w-4 text-slate-800" />
                  </div>
                  <div>
                    <p className="font-medium">Bureau ergonomique</p>
                    <p className="text-sm text-gray-600">
                      Espace de travail confortable avec prises électriques et port USB.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Wifi className="h-4 w-4 text-slate-800" />
                  </div>
                  <div>
                    <p className="font-medium">Wi-Fi haut débit</p>
                    <p className="text-sm text-gray-600">
                      Connexion internet rapide et stable pour vos visioconférences et travail en ligne.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Coffee className="h-4 w-4 text-slate-800" />
                  </div>
                  <div>
                    <p className="font-medium">Machine à café Nespresso</p>
                    <p className="text-sm text-gray-600">
                      Restez productif avec un café de qualité à tout moment de la journée.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4">Services pour professionnels</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="h-4 w-4 text-slate-800" />
                  </div>
                  <div>
                    <p className="font-medium">Check-out tardif</p>
                    <p className="text-sm text-gray-600">
                      Profitez de votre chambre jusqu'à midi, idéal pour les départs en fin de matinée.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ParkingCircle className="h-4 w-4 text-slate-800" />
                  </div>
                  <div>
                    <p className="font-medium">Parking sécurisé</p>
                    <p className="text-sm text-gray-600">
                      Stationnement gratuit et sécurisé pour votre véhicule pendant toute la durée de votre séjour.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Dumbbell className="h-4 w-4 text-slate-800" />
                  </div>
                  <div>
                    <p className="font-medium">Accès salle de fitness</p>
                    <p className="text-sm text-gray-600">
                      Accès gratuit à notre partenaire fitness à 5 minutes à pied (sur présentation de votre carte de
                      chambre).
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
