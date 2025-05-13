import type { Metadata } from "next"
import MapLocation from "@/components/map-location"
import { Button } from "@/components/ui/button"
import ScrollAnimation from "@/components/scroll-animation"
import {
  MapPin,
  Car,
  Plane,
  Bus,
  Coffee,
  Utensils,
  ShoppingBag,
  ParkingCircle,
  BusIcon,
  PlaneIcon,
  Waves,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Localisation | JohnService Motel",
  description:
    "Découvrez comment nous rejoindre facilement. Situé au cœur de Bukavu, notre motel est idéalement placé pour explorer la ville et ses environs.",
}

export default function LocalisationPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden hero-gradient">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center z-20">
          <h1 className="text-white mb-4 animate-fade-in">Notre Localisation</h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl animate-slide-up">
            Idéalement situé au cœur de Bukavu, à proximité des principales attractions et commodités
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="rounded-xl overflow-hidden shadow-lg h-[400px] md:h-[500px]">
                <MapLocation />
              </div>
              <div className="space-y-6">
                <div>
                  <h2 className="text-slate-800 mb-4">Nous Trouver</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-2 rounded-full bg-primary/10">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800">Adresse</h3>
                        <p className="text-slate-600">
                          123 Avenue Patrice Lumumba
                          <br />
                          Bukavu, Sud-Kivu
                          <br />
                          République Démocratique du Congo
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-2 rounded-full bg-primary/10">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800">Coordonnées GPS</h3>
                        <p className="text-slate-600">Latitude: -2.4917, Longitude: 28.8428</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-2 rounded-full bg-primary/10">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800">Contact</h3>
                        <p className="text-slate-600">
                          Téléphone: +243 998 691 478
                          <br />
                          Email: info@johnservicemotel.com
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <Button className="bg-primary hover:bg-primary/90" size="lg">
                    Obtenir l'itinéraire
                  </Button>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Comment nous rejoindre */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <h2 className="text-center text-slate-800 mb-12">Comment Nous Rejoindre</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">En Voiture</h3>
                <p className="text-slate-600">
                  Depuis le centre-ville, prenez l'Avenue Patrice Lumumba en direction du lac Kivu. Après le marché
                  central, tournez à droite sur la rue des Palmiers. Le motel se trouve à 200 mètres sur votre gauche.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
                  <Plane className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Depuis l'Aéroport</h3>
                <p className="text-slate-600">
                  L'aéroport de Kavumu se trouve à environ 30 km. Prenez un taxi ou notre service de navette (sur
                  réservation) pour rejoindre le motel. Le trajet dure environ 45 minutes.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
                  <Bus className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">En Transport Public</h3>
                <p className="text-slate-600">
                  Plusieurs lignes de bus et taxis collectifs desservent notre quartier. Descendez à l'arrêt "Marché
                  Central" et marchez 5 minutes en direction du lac.
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* À proximité */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <h2 className="text-center text-slate-800 mb-12">À Proximité</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-6">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <Coffee className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Cafés</h3>
                <p className="text-slate-600">
                  Plusieurs cafés locaux se trouvent à moins de 5 minutes à pied, offrant des vues imprenables sur le
                  lac Kivu.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <Utensils className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Restaurants</h3>
                <p className="text-slate-600">
                  Découvrez la cuisine congolaise et internationale dans les nombreux restaurants situés à proximité du
                  motel.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6">
                <div className="p-3 rounded-full bg-primary/10 mb-4">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Boutiques & Marchés</h3>
                <p className="text-slate-600">
                  Le marché central de Bukavu est à 10 minutes à pied, offrant artisanat local et produits frais.
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <h2 className="text-center text-slate-800 mb-12">Questions Fréquentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <ParkingCircle className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">Y a-t-il un parking disponible?</h3>
                </div>
                <p className="text-slate-600 ml-10">
                  Oui, nous disposons d'un parking privé et sécurisé gratuit pour tous nos clients.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <BusIcon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">Est-ce accessible en transport en commun?</h3>
                </div>
                <p className="text-slate-600 ml-10">
                  Oui, plusieurs lignes de bus et taxis collectifs s'arrêtent à proximité du motel.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <PlaneIcon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">Proposez-vous un service de navette?</h3>
                </div>
                <p className="text-slate-600 ml-10">
                  Oui, nous proposons un service de navette depuis l'aéroport de Kavumu sur réservation.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Waves className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">Quelle est la distance jusqu'au lac Kivu?</h3>
                </div>
                <p className="text-slate-600 ml-10">
                  Le lac Kivu est à seulement 5 minutes à pied du motel. Vous pouvez profiter de magnifiques vues et
                  activités nautiques.
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à Séjourner Chez Nous?</h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Réservez dès maintenant et profitez de notre emplacement idéal pour explorer Bukavu et ses environs.
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Réserver une Chambre
            </Button>
          </ScrollAnimation>
        </div>
      </section>
    </main>
  )
}
