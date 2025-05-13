import Image from "next/image"
import Link from "next/link"
import {
  Wifi,
  Utensils,
  Car,
  Dumbbell,
  Briefcase,
  ShowerHead,
  Coffee,
  Tv,
  Clock,
  Shirt,
  Baby,
  Phone,
} from "lucide-react"

import ScrollAnimation from "@/components/scroll-animation"
import CountUp from "@/components/count-up"

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <Image
          src="/comfortable-motel-beds.png"
          alt="Services du motel"
          fill
          className="object-cover animate-slow-zoom"
          priority
        />
        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-center text-center text-white px-4">
          <ScrollAnimation>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Nos Services</h1>
          </ScrollAnimation>
          <ScrollAnimation delay={200}>
            <p className="text-xl md:text-2xl max-w-2xl">
              Découvrez tous les services premium que nous proposons pour rendre votre séjour inoubliable
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <ScrollAnimation direction="up" delay={100}>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-4xl font-bold text-primary mb-2">
                  <CountUp end={24} duration={2} />h
                </p>
                <p className="text-gray-600">Réception</p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={200}>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-4xl font-bold text-primary mb-2">
                  <CountUp end={100} duration={2} />%
                </p>
                <p className="text-gray-600">Satisfaction</p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={300}>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-4xl font-bold text-primary mb-2">
                  <CountUp end={15} duration={2} />+
                </p>
                <p className="text-gray-600">Services</p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={400}>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-4xl font-bold text-primary mb-2">
                  <CountUp end={5} duration={2} />
                  <span className="text-2xl">/5</span>
                </p>
                <p className="text-gray-600">Note moyenne</p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Services Inclus</h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ScrollAnimation direction="up" delay={100}>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Wifi className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Wi-Fi Haut Débit</h3>
                </div>
                <p className="text-gray-600">
                  Connexion Wi-Fi gratuite et ultra-rapide dans toutes les chambres et espaces communs.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={150}>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Car className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Parking Gratuit</h3>
                </div>
                <p className="text-gray-600">
                  Stationnement sécurisé et gratuit pour tous nos clients pendant toute la durée du séjour.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={200}>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Tv className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">TV Écran Plat</h3>
                </div>
                <p className="text-gray-600">
                  Télévision à écran plat avec chaînes premium et service de streaming dans chaque chambre.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={250}>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <ShowerHead className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Produits de Toilette</h3>
                </div>
                <p className="text-gray-600">
                  Ensemble complet de produits de toilette de qualité supérieure dans chaque salle de bain.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={300}>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Réception 24h/24</h3>
                </div>
                <p className="text-gray-600">
                  Notre équipe est à votre disposition 24h/24 et 7j/7 pour répondre à tous vos besoins.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={350}>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Espace de Travail</h3>
                </div>
                <p className="text-gray-600">
                  Bureau confortable et ergonomique dans chaque chambre pour vos besoins professionnels.
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Premium Services */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Services Premium</h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <ScrollAnimation direction="left">
              <div className="bg-slate-800 p-8 rounded-lg hover:bg-slate-700 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-white/10 p-4 rounded-full mr-4">
                    <Utensils className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold">Petit-déjeuner Continental</h3>
                    <p className="text-slate-300 mt-1">$12 par personne</p>
                  </div>
                </div>
                <p className="text-slate-300 mb-6">
                  Commencez votre journée avec notre petit-déjeuner continental comprenant des viennoiseries fraîches,
                  des fruits de saison, des céréales, des yaourts, des jus frais et du café de qualité.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Servi de 6h30 à 10h30</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Options végétariennes disponibles</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Service en chambre disponible</span>
                  </li>
                </ul>
                <button className="bg-white text-slate-900 hover:bg-slate-100 py-2 px-6 rounded-full font-medium transition-colors duration-300">
                  Réserver
                </button>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="right">
              <div className="bg-slate-800 p-8 rounded-lg hover:bg-slate-700 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-white/10 p-4 rounded-full mr-4">
                    <Dumbbell className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold">Accès Salle de Sport</h3>
                    <p className="text-slate-300 mt-1">$8 par jour</p>
                  </div>
                </div>
                <p className="text-slate-300 mb-6">
                  Maintenez votre routine d'exercice pendant votre séjour avec notre salle de sport entièrement équipée,
                  comprenant des équipements cardio et de musculation modernes.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Ouvert 24h/24</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Serviettes et eau fournies</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Équipements de dernière génération</span>
                  </li>
                </ul>
                <button className="bg-white text-slate-900 hover:bg-slate-100 py-2 px-6 rounded-full font-medium transition-colors duration-300">
                  Réserver
                </button>
              </div>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollAnimation direction="up" delay={100}>
              <div className="bg-slate-800 p-6 rounded-lg hover:bg-slate-700 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-white/10 p-3 rounded-full mr-3">
                    <Shirt className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Service de Blanchisserie</h3>
                    <p className="text-slate-300 text-sm mt-1">À partir de $15</p>
                  </div>
                </div>
                <p className="text-slate-300 text-sm">
                  Service de nettoyage et repassage de vos vêtements avec retour sous 24h.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={200}>
              <div className="bg-slate-800 p-6 rounded-lg hover:bg-slate-700 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-white/10 p-3 rounded-full mr-3">
                    <Baby className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Service de Garde d'Enfants</h3>
                    <p className="text-slate-300 text-sm mt-1">$25/heure</p>
                  </div>
                </div>
                <p className="text-slate-300 text-sm">
                  Personnel qualifié pour s'occuper de vos enfants pendant que vous vous détendez.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={300}>
              <div className="bg-slate-800 p-6 rounded-lg hover:bg-slate-700 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-white/10 p-3 rounded-full mr-3">
                    <Car className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Service de Navette</h3>
                    <p className="text-slate-300 text-sm mt-1">$20 par trajet</p>
                  </div>
                </div>
                <p className="text-slate-300 text-sm">
                  Transport vers/depuis l'aéroport ou la gare, disponible sur réservation.
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Business Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Services d'Affaires</h2>
          </ScrollAnimation>
          <ScrollAnimation delay={100}>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
              Que vous soyez en voyage d'affaires ou que vous ayez besoin de rester connecté, nous proposons une gamme
              complète de services professionnels.
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollAnimation direction="left">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src="/business-traveler-motel-laptop.png"
                  alt="Services d'affaires"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="right">
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Centre d'Affaires</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Accès à notre centre d'affaires entièrement équipé avec ordinateurs, imprimantes et scanners.
                  </p>
                  <p className="text-primary font-medium">$10 par heure</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Coffee className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Salle de Réunion</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Salle de réunion professionnelle pouvant accueillir jusqu'à 12 personnes, équipée de matériel
                    audiovisuel.
                  </p>
                  <p className="text-primary font-medium">$50 par heure</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Service de Conciergerie</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Assistance personnalisée pour vos besoins professionnels : réservations, organisation de transport,
                    etc.
                  </p>
                  <p className="text-primary font-medium">Service gratuit</p>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Forfaits Services</h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollAnimation direction="up" delay={100}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-blue-600 text-white p-6 text-center">
                  <h3 className="text-2xl font-bold">Forfait Essentiel</h3>
                  <p className="text-4xl font-bold mt-4 mb-2">$25</p>
                  <p className="text-sm opacity-80">par séjour</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Petit-déjeuner continental (1 jour)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Wi-Fi premium haute vitesse</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Check-out tardif (jusqu'à 14h)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Bouteilles d'eau quotidiennes</span>
                    </li>
                  </ul>
                  <button className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors duration-300">
                    Choisir ce forfait
                  </button>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={200}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ring-2 ring-primary">
                <div className="bg-primary text-white p-6 text-center relative">
                  <div className="absolute top-0 right-0 bg-yellow-400 text-primary text-xs font-bold px-3 py-1 transform translate-y-2 rotate-45">
                    POPULAIRE
                  </div>
                  <h3 className="text-2xl font-bold">Forfait Confort</h3>
                  <p className="text-4xl font-bold mt-4 mb-2">$45</p>
                  <p className="text-sm opacity-80">par séjour</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Petit-déjeuner continental (tous les jours)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Wi-Fi premium haute vitesse</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Check-out tardif (jusqu'à 16h)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Accès salle de sport (1 jour)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Service de blanchisserie (2 articles)</span>
                    </li>
                  </ul>
                  <button className="w-full bg-primary text-white py-3 rounded-md font-medium hover:bg-primary/90 transition-colors duration-300">
                    Choisir ce forfait
                  </button>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={300}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-slate-800 text-white p-6 text-center">
                  <h3 className="text-2xl font-bold">Forfait Premium</h3>
                  <p className="text-4xl font-bold mt-4 mb-2">$75</p>
                  <p className="text-sm opacity-80">par séjour</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Petit-déjeuner continental (tous les jours)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Wi-Fi premium haute vitesse</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Check-out tardif (jusqu'à 18h)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Accès salle de sport (tous les jours)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Service de blanchisserie (5 articles)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Navette aéroport (aller-retour)</span>
                    </li>
                  </ul>
                  <button className="w-full bg-slate-800 text-white py-3 rounded-md font-medium hover:bg-slate-700 transition-colors duration-300">
                    Choisir ce forfait
                  </button>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Besoin d'un service personnalisé?</h2>
          </ScrollAnimation>
          <ScrollAnimation delay={100}>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Notre équipe est à votre disposition pour créer une expérience sur mesure adaptée à vos besoins
              spécifiques.
            </p>
          </ScrollAnimation>
          <ScrollAnimation delay={200}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="bg-white text-primary hover:bg-slate-100 py-3 px-8 rounded-full font-medium transition-colors duration-300"
              >
                Nous contacter
              </Link>
              <Link
                href="/chambres"
                className="bg-transparent border-2 border-white hover:bg-white/10 py-3 px-8 rounded-full font-medium transition-colors duration-300"
              >
                Voir nos chambres
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </main>
  )
}
