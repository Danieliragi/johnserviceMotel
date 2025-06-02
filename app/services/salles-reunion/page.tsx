import type { Metadata } from "next"
import ScrollAnimation from "@/components/scroll-animation"
import OptimizedImage from "@/components/optimized-image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import Breadcrumb from "@/components/breadcrumb"
import RelatedServices from "@/components/related-services"

export const metadata: Metadata = {
  title: "Salles de Réunion | John Services Motel",
  description:
    "Découvrez nos salles de réunion et de conférence modernes et fonctionnelles pour vos événements professionnels.",
}

export default function SallesReunionPage() {
  return (
    <div className="px-4 md:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
            <div className="absolute inset-0">
              <OptimizedImage
                src="/motel-day-2.jpeg"
                alt="Salles de réunion du John Services Motel"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>
            <div className="relative h-full flex items-center justify-center text-center px-4">
              <div className="max-w-3xl">
                <ScrollAnimation>
                  <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Salles de Réunion et Conférence</h1>
                  <p className="text-lg md:text-xl text-white/90 mb-8">
                    Des espaces modernes et fonctionnels pour vos événements professionnels
                  </p>
                  <Button asChild size="lg">
                    <Link href="/contact">Demander un devis</Link>
                  </Button>
                </ScrollAnimation>
              </div>
            </div>
          </section>

          {/* Overview Section */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto">
              <ScrollAnimation>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl font-bold mb-6">Des espaces adaptés à vos besoins</h2>
                    <p className="text-gray-700 mb-4">
                      Le John Services Motel met à votre disposition des salles de réunion et de conférence modernes et
                      fonctionnelles pour tous vos événements professionnels : réunions d&apos;affaires, séminaires,
                      formations, conférences ou ateliers.
                    </p>
                    <p className="text-gray-700 mb-4">
                      Nos espaces modulables peuvent accueillir de 10 à 100 personnes et sont équipés des dernières
                      technologies pour garantir le succès de vos événements.
                    </p>
                    <p className="text-gray-700">
                      Notre équipe dédiée vous accompagne dans l&apos;organisation de votre événement, de la réservation
                      à la mise en place, en passant par la restauration et les services annexes.
                    </p>
                  </div>
                  <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                    <OptimizedImage
                      src="/motel-day-1.jpeg"
                      alt="Salle de réunion moderne"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </section>

          {/* Room Types Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <ScrollAnimation>
                <h2 className="text-3xl font-bold mb-12 text-center">Nos espaces de réunion</h2>
                <Tabs defaultValue="boardroom" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="boardroom">Salle de conseil</TabsTrigger>
                    <TabsTrigger value="conference">Salle de conférence</TabsTrigger>
                    <TabsTrigger value="workshop">Espace atelier</TabsTrigger>
                  </TabsList>
                  <TabsContent value="boardroom" className="border rounded-lg p-6 bg-white shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div className="relative h-[300px] rounded-lg overflow-hidden">
                        <OptimizedImage src="/motel-day-3.jpeg" alt="Salle de conseil" fill className="object-cover" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-4">Salle de conseil</h3>
                        <p className="text-gray-700 mb-4">
                          Notre salle de conseil est idéale pour les réunions de direction, les entretiens ou les
                          petites réunions d&apos;équipe. Avec sa table centrale et ses fauteuils confortables, elle
                          offre un cadre professionnel et intimiste.
                        </p>
                        <ul className="space-y-2 mb-6">
                          <li className="flex items-center">
                            <span className="mr-2">✓</span>
                            <span>Capacité : 10-12 personnes</span>
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">✓</span>
                            <span>Écran de projection</span>
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">✓</span>
                            <span>Système de visioconférence</span>
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">✓</span>
                            <span>Wi-Fi haut débit</span>
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">✓</span>
                            <span>Machine à café et rafraîchissements</span>
                          </li>
                        </ul>
                        <Button asChild>
                          <Link href="/contact">Demander un devis</Link>
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="conference" className="border rounded-lg p-6 bg-white shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div className="relative h-[300px] rounded-lg overflow-hidden">
                        <OptimizedImage
                          src="/motel-day-1.jpeg"
                          alt="Salle de conférence"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-4">Salle de conférence</h3>
                        <p className="text-gray-700 mb-4">
                          Notre salle de conférence spacieuse est parfaite pour les séminaires, les présentations et les
                          formations. Elle peut être configurée en différentes dispositions selon vos besoins.
                        </p>
                        <ul className="space-y-2 mb-6">
                          <li className="flex items-center">
                            <span className="mr-2">✓</span>
                            <span>Capacité : 50-100 personnes</span>
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">✓</span>
                            <span>Système audio-visuel complet</span>
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">✓</span>
                            <span>Scène et podium</span>
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">✓</span>
                            <span>Micros sans fil</span>
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">✓</span>
                            <span>Éclairage réglable</span>
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">✓</span>
                            <span>Espace pause-café</span>
                          </li>
                        </ul>
                        <Button asChild>
                          <Link href="/contact">Demander un devis</Link>
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="workshop" className="border rounded-lg p-6 bg-white shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div className="relative h-[300px] rounded-lg overflow-hidden">
                        <OptimizedImage src="/motel-day-2.jpeg" alt="Espace atelier" fill className="object-cover" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-4">Espace atelier</h3>
                        <p className="text-gray-700 mb-4">
                          Notre espace atelier est conçu pour favoriser la créativité et la collaboration. Idéal pour
                          les sessions de brainstorming, les ateliers de travail ou les formations interactives.
                        </p>
                        <ul className="space-y-2 mb-6">
                          <li className="flex items-center">
                            <span className="mr-2">✓</span>
                            <span>Capacité : 20-30 personnes</span>
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">✓</span>
                            <span>Mobilier modulable</span>
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">✓</span>
                            <span>Tableaux blancs et paperboards</span>
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">✓</span>
                            <span>Matériel de facilitation</span>
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">✓</span>
                            <span>Écrans tactiles interactifs</span>
                          </li>
                          <li className="flex items-center">
                            <span className="mr-2">✓</span>
                            <span>Espace détente</span>
                          </li>
                        </ul>
                        <Button asChild>
                          <Link href="/contact">Demander un devis</Link>
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </ScrollAnimation>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto">
              <ScrollAnimation>
                <h2 className="text-3xl font-bold mb-12 text-center">Nos services complémentaires</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-3">Restauration</h3>
                      <p className="text-gray-700">
                        Nous proposons différentes formules de restauration pour vos événements : petit-déjeuner
                        d&apos;affaires, pause-café, déjeuner, cocktail ou dîner de gala.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-3">Équipement technique</h3>
                      <p className="text-gray-700">
                        Nous mettons à votre disposition tout l&apos;équipement technique nécessaire : vidéoprojecteur,
                        écran, système de sonorisation, micros, visioconférence, etc.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-3">Hébergement</h3>
                      <p className="text-gray-700">
                        Nous proposons des tarifs préférentiels pour l&apos;hébergement des participants à votre
                        événement dans notre motel, avec des chambres confortables et modernes.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </ScrollAnimation>
            </div>
          </section>

          {/* Packages Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <ScrollAnimation>
                <h2 className="text-3xl font-bold mb-12 text-center">Nos forfaits</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-3">Forfait Demi-journée</h3>
                      <p className="text-gray-700 mb-4">
                        Idéal pour les réunions courtes ou les ateliers de quelques heures.
                      </p>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-center">
                          <span className="mr-2">✓</span>
                          <span>Location de salle (4h)</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">✓</span>
                          <span>Équipement de base</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">✓</span>
                          <span>Une pause-café</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">✓</span>
                          <span>Eau minérale</span>
                        </li>
                      </ul>
                      <p className="text-xl font-bold mb-6">À partir de 25€ / personne</p>
                      <Button asChild className="w-full">
                        <Link href="/contact">Demander un devis</Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-white shadow-md hover:shadow-lg transition-shadow border-blue-500 border-2">
                    <CardContent className="p-6">
                      <div className="bg-blue-500 text-white text-center py-1 px-4 rounded-full text-sm font-medium mb-4 w-fit mx-auto">
                        Populaire
                      </div>
                      <h3 className="text-xl font-bold mb-3">Forfait Journée</h3>
                      <p className="text-gray-700 mb-4">
                        Notre formule la plus demandée pour les séminaires et formations d&apos;une journée.
                      </p>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-center">
                          <span className="mr-2">✓</span>
                          <span>Location de salle (8h)</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">✓</span>
                          <span>Équipement complet</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">✓</span>
                          <span>Deux pauses-café</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">✓</span>
                          <span>Déjeuner</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">✓</span>
                          <span>Eau minérale et boissons soft</span>
                        </li>
                      </ul>
                      <p className="text-xl font-bold mb-6">À partir de 45€ / personne</p>
                      <Button asChild className="w-full">
                        <Link href="/contact">Demander un devis</Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-3">Forfait Résidentiel</h3>
                      <p className="text-gray-700 mb-4">
                        La solution complète pour les séminaires de plusieurs jours avec hébergement.
                      </p>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-center">
                          <span className="mr-2">✓</span>
                          <span>Location de salle</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">✓</span>
                          <span>Équipement complet</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">✓</span>
                          <span>Pauses-café</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">✓</span>
                          <span>Repas (déjeuner et dîner)</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">✓</span>
                          <span>Hébergement</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">✓</span>
                          <span>Petit-déjeuner</span>
                        </li>
                      </ul>
                      <p className="text-xl font-bold mb-6">À partir de 120€ / personne</p>
                      <Button asChild className="w-full">
                        <Link href="/contact">Demander un devis</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </ScrollAnimation>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto">
              <ScrollAnimation>
                <h2 className="text-3xl font-bold mb-12 text-center">Ce que nos clients disent</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <Card className="bg-white shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="text-yellow-400 flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4 italic">
                        "Nous avons organisé notre séminaire annuel au John Services Motel et tout était parfait. Les
                        salles sont spacieuses et bien équipées, le service est impeccable et la restauration
                        excellente. Nous reviendrons l&apos;année prochaine !"
                      </p>
                      <div className="flex items-center">
                        <div className="mr-4">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-gray-600 font-semibold">MB</span>
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold">Marie Bertrand</p>
                          <p className="text-sm text-gray-600">Directrice RH, Entreprise XYZ</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="text-yellow-400 flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4 italic">
                        "La salle de conférence était parfaitement adaptée à notre événement. L'équipement technique
                        fonctionnait parfaitement et le personnel était très réactif. Je recommande vivement."
                      </p>
                      <div className="flex items-center">
                        <div className="mr-4">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-gray-600 font-semibold">TD</span>
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold">Thomas Dubois</p>
                          <p className="text-sm text-gray-600">Chef de projet, Société ABC</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="text-yellow-400 flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4 italic">
                        "Nous avons organisé un atelier de formation dans l'espace atelier et c'était parfait. L'espace
                        est lumineux, le mobilier modulable nous a permis d'adapter la salle à nos besoins. Le service
                        de restauration était excellent."
                      </p>
                      <div className="flex items-center">
                        <div className="mr-4">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-gray-600 font-semibold">SL</span>
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold">Sophie Laurent</p>
                          <p className="text-sm text-gray-600">Formatrice, Institut DEF</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ScrollAnimation>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-blue-50">
            <div className="max-w-7xl mx-auto text-center">
              <ScrollAnimation>
                <h2 className="text-3xl font-bold mb-6">Organisez votre prochain événement avec nous</h2>
                <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
                  Contactez-nous dès maintenant pour discuter de votre projet et obtenir un devis personnalisé. Notre
                  équipe est à votre disposition pour répondre à toutes vos questions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg">
                    <Link href="/contact">Demander un devis</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/contact">Nous contacter</Link>
                  </Button>
                </div>
              </ScrollAnimation>
            </div>
          </section>
        </main>
        <RelatedServices />
      </div>
    </div>
  )
}
