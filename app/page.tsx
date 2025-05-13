import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPinIcon, StarIcon, WifiIcon, CarIcon, CoffeeIcon, ChevronRight } from "lucide-react"
import BookingForm from "@/components/booking-form"
import TestimonialCard from "@/components/testimonial-card"
import MapLocation from "@/components/map-location"
import ScrollAnimation from "@/components/scroll-animation"
import CountUp from "@/components/count-up"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/cozy-motel-room.png"
            alt="JohnService Motel"
            fill
            className="object-cover brightness-[0.65] scale-105 animate-slow-zoom"
            priority
          />
        </div>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10"
          style={{
            transform: "translateY(0px)",
            transition: "transform 0.5s ease-out",
          }}
          id="parallax-hero"
        >
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-md">JohnService Motel</h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl drop-shadow-md">
              Votre hébergement idéal pour une étape confortable sur la route
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-slate-800 hover:bg-slate-900 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Réserver maintenant
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20 shadow-lg transition-all duration-300"
              >
                Découvrir nos chambres
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent"></div>
      </section>

      {/* Booking Section */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-xl shadow-xl -mt-20 relative z-10 p-6 md:p-8 border border-gray-100 animate-slide-up">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center mr-3 text-lg">
              1
            </span>
            Réservez votre séjour
          </h2>
          <BookingForm />
        </div>
      </section>

      {/* Promotions Section */}
      <section className="section-padding container-padding max-w-7xl mx-auto w-full">
        <ScrollAnimation>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <h2 className="text-3xl font-bold">Offres Spéciales</h2>
            <Link href="/offres" className="text-slate-800 hover:text-slate-600 flex items-center mt-2 md:mt-0 group">
              <span>Voir toutes nos offres</span>
              <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollAnimation>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ScrollAnimation delay={100}>
            <Card className="overflow-hidden card-hover border-gray-200">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/cozy-motel-room.png"
                  alt="Offre Week-end"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
                <Badge className="absolute top-3 right-3 bg-slate-800">-15%</Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Offre Week-end</h3>
                <p className="text-gray-600 mb-4">
                  Profitez de 15% de réduction pour tout séjour de 2 nuits le week-end
                </p>
                <Button className="w-full btn-primary">Voir l'offre</Button>
              </CardContent>
            </Card>
          </ScrollAnimation>

          <ScrollAnimation delay={200}>
            <Card className="overflow-hidden card-hover border-gray-200">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/road-trip-map.png"
                  alt="Pack Road Trip"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
                <Badge className="absolute top-3 right-3 bg-amber-500">Populaire</Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Pack Road Trip</h3>
                <p className="text-gray-600 mb-4">Chambre + petit-déjeuner + carte des attractions locales</p>
                <Button className="w-full btn-primary">Voir l'offre</Button>
              </CardContent>
            </Card>
          </ScrollAnimation>

          <ScrollAnimation delay={300}>
            <Card className="overflow-hidden card-hover border-gray-200">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/business-traveler-motel-laptop.png"
                  alt="Offre Affaires"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Offre Affaires</h3>
                <p className="text-gray-600 mb-4">
                  Wi-Fi premium et petit-déjeuner offerts pour les voyageurs d'affaires
                </p>
                <Button className="w-full btn-primary">Voir l'offre</Button>
              </CardContent>
            </Card>
          </ScrollAnimation>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding container-padding bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-sm font-medium mb-3">
                Nos Services
              </span>
              <h2 className="text-3xl font-bold">Tout pour votre confort</h2>
              <div className="w-20 h-1 bg-slate-800 mx-auto mt-4 rounded-full"></div>
            </div>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollAnimation direction="up" delay={100}>
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover-scale">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                  <WifiIcon className="h-8 w-8 text-slate-800" />
                </div>
                <h3 className="font-bold mb-2">Wi-Fi Gratuit</h3>
                <p className="text-gray-600">Connexion haut débit dans tout l'établissement</p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={200}>
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover-scale">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                  <CarIcon className="h-8 w-8 text-slate-800" />
                </div>
                <h3 className="font-bold mb-2">Parking Gratuit</h3>
                <p className="text-gray-600">Stationnement sécurisé pour tous nos clients</p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={300}>
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover-scale">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                  <CoffeeIcon className="h-8 w-8 text-slate-800" />
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
                  src="/standard-motel-room.png"
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
                <div className="flex items-center gap-1 mb-4">
                  <StarIcon className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <StarIcon className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <StarIcon className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <StarIcon className="h-4 w-4 text-gray-300 fill-gray-300" />
                  <StarIcon className="h-4 w-4 text-gray-300 fill-gray-300" />
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
                <Button className="w-full btn-primary">Réserver</Button>
              </CardContent>
            </Card>
          </ScrollAnimation>

          <ScrollAnimation direction="left" delay={200}>
            <Card className="overflow-hidden card-hover border-gray-200">
              <div className="relative h-64 overflow-hidden group">
                <Image
                  src="/family-motel-room.png"
                  alt="Chambre Familiale"
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
                  <h3 className="text-xl font-bold">Chambre Familiale</h3>
                  <p className="font-bold text-slate-800">À partir de $89</p>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  <StarIcon className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <StarIcon className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <StarIcon className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <StarIcon className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <StarIcon className="h-4 w-4 text-gray-300 fill-gray-300" />
                </div>
                <ul className="mb-4 text-gray-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>1 Lit Queen + 2 Lits Simples
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
                    Salle de bain spacieuse
                  </li>
                </ul>
                <Button className="w-full btn-primary">Réserver</Button>
              </CardContent>
            </Card>
          </ScrollAnimation>

          <ScrollAnimation direction="left" delay={300}>
            <Card className="overflow-hidden card-hover border-gray-200">
              <div className="relative h-64 overflow-hidden group">
                <Image
                  src="/premium-motel-room.png"
                  alt="Chambre Premium"
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
                  <h3 className="text-xl font-bold">Chambre Premium</h3>
                  <p className="font-bold text-slate-800">À partir de $99</p>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  <StarIcon className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <StarIcon className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <StarIcon className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <StarIcon className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <StarIcon className="h-4 w-4 text-amber-500 fill-amber-500" />
                </div>
                <ul className="mb-4 text-gray-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                    Lit King Size
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                    Coin salon
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                    Minibar
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                    Douche à l'italienne
                  </li>
                </ul>
                <Button className="w-full btn-primary">Réserver</Button>
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
                Le JohnService Motel est situé en ville pres de la rond en face de la maison orange. Notre emplacement
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

      {/* Testimonials Section */}
      <section className="section-padding container-padding max-w-7xl mx-auto">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-sm font-medium mb-3">
              Témoignages
            </span>
            <h2 className="text-3xl font-bold">Ce que disent nos clients</h2>
            <div className="w-20 h-1 bg-slate-800 mx-auto mt-4 rounded-full"></div>
          </div>
        </ScrollAnimation>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ScrollAnimation direction="up" delay={100}>
            <TestimonialCard
              name="Marie L."
              date="Août 2023"
              rating={5}
              text="Parfait pour une étape sur la route des vacances. Chambre propre, personnel accueillant et petit-déjeuner copieux. Nous reviendrons !"
            />
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={200}>
            <TestimonialCard
              name="Thomas D."
              date="Juillet 2023"
              rating={4}
              text="Bon rapport qualité-prix. L'emplacement est idéal pour une pause sur la route. Le Wi-Fi fonctionne très bien, ce qui est rare dans ce type d'établissement."
            />
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={300}>
            <TestimonialCard
              name="Sophie M."
              date="Septembre 2023"
              rating={5}
              text="Nous avons séjourné avec notre chien et tout s'est très bien passé. La chambre était spacieuse et le personnel très attentionné. Je recommande !"
            />
          </ScrollAnimation>
        </div>
        <ScrollAnimation delay={400}>
          <div className="text-center mt-8">
            <Link href="#" className="text-slate-800 hover:underline font-medium inline-flex items-center group">
              <span>Voir tous les avis sur TripAdvisor</span>
              <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollAnimation>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 md:px-8 bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimation>
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 bg-white/10 text-white rounded-full text-sm font-medium mb-3">
                Nos chiffres
              </span>
              <h2 className="text-3xl font-bold text-white">JohnService Motel en chiffres</h2>
            </div>
          </ScrollAnimation>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <ScrollAnimation direction="up" delay={100}>
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">
                  <CountUp end={12} suffix="+" />
                </p>
                <p className="text-gray-300">Chambres</p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={200}>
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">
                  <CountUp end={92} suffix="%" />
                </p>
                <p className="text-gray-300">Clients satisfaits</p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={300}>
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">
                  <CountUp end={850} separator=" " suffix="+" />
                </p>
                <p className="text-gray-300">Nuitées depuis l'ouverture</p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={400}>
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">
                  <CountUp end={1.5} suffix=" ans" decimals={1} />
                </p>
                <p className="text-gray-300">D'expérience</p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à réserver votre séjour ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Profitez de nos tarifs avantageux et de notre emplacement idéal pour votre prochain voyage
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-slate-800 hover:bg-gray-100">
              Réserver maintenant
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-slate-700 transition-all duration-300"
            >
              Contactez-nous
            </Button>
          </div>
        </div>
      </section>

      {/* Parallax Effect Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const parallaxHero = document.getElementById('parallax-hero');
              
              window.addEventListener('scroll', function() {
                const scrollPosition = window.scrollY;
                if (parallaxHero && scrollPosition < window.innerHeight) {
                  parallaxHero.style.transform = 'translateY(' + scrollPosition * 0.4 + 'px)';
                }
              });
            });
          `,
        }}
      />
    </main>
  )
}
