import Image from "next/image"
import Link from "next/link"
import {
  Wifi,
  Utensils,
  Briefcase,
  ShowerHead,
  Coffee,
  Tv,
  Clock,
  Users,
  Bed,
  ChefHat,
  PresentationIcon as PresentationScreen,
} from "lucide-react"

import ScrollAnimation from "@/components/scroll-animation"
import CountUp from "@/components/count-up"

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-primary z-10"></div>
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
              Découvrez nos trois services principaux : Hébergement, Restaurant et Salles de Réunion/Conférence
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <ScrollAnimation direction="up" delay={100}>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-4xl font-bold text-primary mb-2">
                  <CountUp end={24} duration={2} />h
                </p>
                <p className="text-gray-600">Service d'Accueil</p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={200}>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-4xl font-bold text-primary mb-2">
                  <CountUp end={100} duration={2} />%
                </p>
                <p className="text-gray-600">Satisfaction Client</p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={300}>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-4xl font-bold text-primary mb-2">
                  <CountUp end={3} duration={2} />
                </p>
                <p className="text-gray-600">Services Principaux</p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Hébergement Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Bed className="h-8 w-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-center">Hébergement</h2>
            </div>
          </ScrollAnimation>
          <ScrollAnimation delay={100}>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
              Profitez de nos chambres confortables et élégantes, conçues pour vous offrir un séjour inoubliable.
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <ScrollAnimation direction="up" delay={100}>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Bed className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Chambres Standard</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Nos chambres standard offrent tout le confort nécessaire pour un séjour agréable à un prix abordable.
                </p>
                <Link href="/chambres/standard" className="text-primary font-medium hover:underline">
                  En savoir plus →
                </Link>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={150}>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Bed className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Chambres De Luxe</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Élégantes et spacieuses, nos chambres de luxe offrent un confort supérieur pour un séjour raffiné.
                </p>
                <Link href="/chambres/deluxe" className="text-primary font-medium hover:underline">
                  En savoir plus →
                </Link>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={200}>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Bed className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Chambres VIP</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Luxe et élégance caractérisent nos chambres VIP, pour un séjour d'exception avec des services premium.
                </p>
                <Link href="/chambres/vip" className="text-primary font-medium hover:underline">
                  En savoir plus →
                </Link>
              </div>
            </ScrollAnimation>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollAnimation direction="up" delay={100}>
              <div className="bg-slate-100 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-3">
                    <Wifi className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Wi-Fi Gratuit</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Connexion Wi-Fi haut débit gratuite dans toutes nos chambres et espaces communs.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={150}>
              <div className="bg-slate-100 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-3">
                    <Tv className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">TV Écran Plat</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Télévisions à écran plat avec chaînes premium dans toutes nos chambres.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={200}>
              <div className="bg-slate-100 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-3">
                    <ShowerHead className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Produits de Toilette</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Ensemble complet de produits de toilette de qualité dans chaque salle de bain.
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Restaurant Section */}
      <section className="py-16 bg-primary-950 text-white">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <div className="flex items-center justify-center gap-3 mb-4">
              <ChefHat className="h-8 w-8 text-white" />
              <h2 className="text-3xl md:text-4xl font-bold text-center">Restaurant</h2>
            </div>
          </ScrollAnimation>
          <ScrollAnimation delay={100}>
            <p className="text-center text-primary-100 max-w-3xl mx-auto mb-12">
              Découvrez notre restaurant où nos chefs talentueux préparent des plats délicieux avec des ingrédients
              frais et locaux.
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <ScrollAnimation direction="left">
              <div className="relative overflow-hidden rounded-lg h-[400px]">
                <Image src="/motel-restaurant.jpeg" alt="Restaurant du motel" fill className="object-cover" />
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="right">
              <div className="space-y-6">
                <div className="bg-primary-900 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary-800 p-3 rounded-full mr-4">
                      <Coffee className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">Petit-déjeuner Continental</h3>
                  </div>
                  <p className="text-primary-100 mb-2">
                    Commencez votre journée avec notre petit-déjeuner continental comprenant des viennoiseries fraîches,
                    des fruits de saison, des céréales, des yaourts, des jus frais et du café de qualité.
                  </p>
                  <p className="text-white font-medium">Servi de 6h30 à 10h30</p>
                </div>

                <div className="bg-primary-900 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary-800 p-3 rounded-full mr-4">
                      <Utensils className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">Restaurant Gastronomique</h3>
                  </div>
                  <p className="text-primary-100 mb-2">
                    Notre restaurant propose une cuisine raffinée mettant en valeur les produits locaux et de saison.
                    Menu à la carte et formules du jour disponibles.
                  </p>
                  <p className="text-white font-medium">Déjeuner: 12h-14h30 | Dîner: 19h-22h30</p>
                </div>

                <div className="bg-primary-900 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary-800 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">Service en Chambre</h3>
                  </div>
                  <p className="text-primary-100 mb-2">
                    Profitez de notre service en chambre pour savourer nos délicieux plats dans l'intimité de votre
                    chambre.
                  </p>
                  <p className="text-white font-medium">Disponible de 7h à 22h</p>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Salles de Réunion Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <div className="flex items-center justify-center gap-3 mb-4">
              <PresentationScreen className="h-8 w-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-center">Salles de Réunion & Conférence</h2>
            </div>
          </ScrollAnimation>
          <ScrollAnimation delay={100}>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
              Des espaces professionnels parfaitement équipés pour vos réunions d'affaires, conférences et événements.
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollAnimation direction="left">
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Salle de Réunion Executive</h3>
                      <p className="text-gray-500 text-sm">Capacité: jusqu'à 12 personnes</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Salle de réunion intime et professionnelle, idéale pour les petites réunions d'affaires et les
                    entretiens. Équipée d'un écran de projection, système de visioconférence et connexion Wi-Fi haut
                    débit.
                  </p>
                  <p className="text-primary font-medium">À partir de 150€ / demi-journée</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Salle de Conférence</h3>
                      <p className="text-gray-500 text-sm">Capacité: jusqu'à 50 personnes</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Notre salle de conférence spacieuse est parfaite pour les présentations, formations et séminaires.
                    Équipée d'un système audio-visuel complet, podium et disposition flexible des sièges.
                  </p>
                  <p className="text-primary font-medium">À partir de 300€ / demi-journée</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Services Inclus</h3>
                  </div>
                  <ul className="text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Wi-Fi haut débit</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Équipement audiovisuel</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Eau minérale et bloc-notes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Assistance technique</span>
                    </li>
                  </ul>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="right">
              <div className="relative overflow-hidden rounded-lg h-full min-h-[600px]">
                <Image
                  src="/business-traveler-motel-laptop.png"
                  alt="Salle de réunion"
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Forfaits Événements</h3>
                  <p className="text-white/90 mb-4">
                    Nous proposons des forfaits complets incluant la location de salle, restauration et hébergement pour
                    vos événements d'entreprise.
                  </p>
                  <button className="bg-white text-primary hover:bg-slate-100 py-2 px-6 rounded-full font-medium transition-colors duration-300">
                    Demander un devis
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
