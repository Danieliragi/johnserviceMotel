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
  title: "Service d'Hébergement | John Services Motel",
  description:
    "Découvrez nos options d'hébergement confortables et élégantes pour tous les budgets et toutes les occasions.",
}

export default function HebergementPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <div className="absolute inset-0">
            <OptimizedImage
              src="/motel-night.jpeg"
              alt="John Services Motel de nuit"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative h-full flex items-center justify-center text-center px-4">
            <div className="max-w-3xl">
              <ScrollAnimation>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Service d&apos;Hébergement</h1>
                <p className="text-lg md:text-xl text-white/90 mb-8">
                  Des chambres confortables et élégantes pour tous les budgets et toutes les occasions
                </p>
                <Button asChild size="lg">
                  <Link href="/chambres">Découvrir nos chambres</Link>
                </Button>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-16 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <ScrollAnimation>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Un hébergement de qualité pour tous</h2>
                  <p className="text-gray-700 mb-4">
                    Au John Services Motel, nous proposons une gamme complète d&apos;options d&apos;hébergement pour
                    répondre à tous les besoins et tous les budgets. Que vous soyez en voyage d&apos;affaires, en
                    vacances en famille ou à la recherche d&apos;un séjour luxueux, nous avons la chambre parfaite pour
                    vous.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Toutes nos chambres sont équipées de commodités modernes, d&apos;une literie de qualité et d&apos;un
                    service attentionné pour garantir votre confort et votre satisfaction.
                  </p>
                  <p className="text-gray-700">
                    Notre équipe dévouée est disponible 24h/24 pour répondre à vos besoins et faire de votre séjour une
                    expérience mémorable.
                  </p>
                </div>
                <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                  <OptimizedImage
                    src="/motel-reception.jpeg"
                    alt="Réception du John Services Motel"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* Room Types Section */}
        <section className="py-16 px-4 md:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <ScrollAnimation>
              <h2 className="text-3xl font-bold mb-12 text-center">Nos types de chambres</h2>
              <Tabs defaultValue="standard" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="standard">Chambre Standard</TabsTrigger>
                  <TabsTrigger value="deluxe">Chambre De Luxe</TabsTrigger>
                  <TabsTrigger value="vip">Chambre VIP</TabsTrigger>
                </TabsList>
                <TabsContent value="standard" className="border rounded-lg p-6 bg-white shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="relative h-[300px] rounded-lg overflow-hidden">
                      <OptimizedImage
                        src="/standard-room-1.jpeg"
                        alt="Chambre Standard"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Chambre Standard</h3>
                      <p className="text-gray-700 mb-4">
                        Notre chambre Standard offre un excellent rapport qualité-prix avec tout le confort nécessaire
                        pour un séjour agréable. Idéale pour les voyageurs d&apos;affaires ou les courts séjours.
                      </p>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-center">
                          <span className="mr-2">✓</span>
                          <span>Lit double confortable</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">✓</span>
                          <span>Salle de bain privée</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">✓</span>
                          <span>Wi-Fi gratuit</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">✓</span>
                          <span>Télévision à écran plat</span>
                        </li>
                      </ul>
                      <Button asChild>
                        <Link href="/chambres/standard">Voir les détails</Link>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="deluxe" className="border rounded-lg p-6 bg-white shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="relative h-[300px] rounded-lg overflow-hidden">
                      <OptimizedImage src="/deluxe-room-1.jpeg" alt="Chambre De Luxe" fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Chambre De Luxe</h3>
                      <p className="text-gray-700 mb-4">
                        Notre chambre De Luxe offre un espace plus généreux et des équipements supplémentaires pour un
                        séjour encore plus confortable. Parfaite pour les couples ou les séjours prolongés.
                      </p>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-center">
                          <span className="mr-2">✓</span>
                          <span>Grand lit queen-size</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">✓</span>
                          <span>Salle de bain spacieuse</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">✓</span>
                          <span>Coin salon</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">✓</span>
                          <span>Mini-réfrigérateur</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">✓</span>
                          <span>Service de chambre</span>
                        </li>
                      </ul>
                      <Button asChild>
                        <Link href="/chambres/deluxe">Voir les détails</Link>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="vip" className="border rounded-lg p-6 bg-white shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="relative h-[300px] rounded-lg overflow-hidden">
                      <OptimizedImage src="/vip3.jpeg" alt="Chambre VIP" fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Chambre VIP</h3>
                      <p className="text-gray-700 mb-4">
                        Notre chambre VIP représente le summum du luxe et du confort. Avec son espace généreux et ses
                        équipements haut de gamme, elle est idéale pour les occasions spéciales ou pour ceux qui
                        recherchent une expérience exceptionnelle.
                      </p>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-center">
                          <span className="mr-2">✓</span>
                          <span>Lit king-size de luxe</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">✓</span>
                          <span>Salle de bain avec baignoire jacuzzi</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">✓</span>
                          <span>Salon séparé</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">✓</span>
                          <span>Minibar garni</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">✓</span>
                          <span>Service de conciergerie</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">✓</span>
                          <span>Petit-déjeuner inclus</span>
                        </li>
                      </ul>
                      <Button asChild>
                        <Link href="/chambres/vip">Voir les détails</Link>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </ScrollAnimation>
          </div>
        </section>

        {/* Amenities Section */}
        <section className="py-16 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <ScrollAnimation>
              <h2 className="text-3xl font-bold mb-12 text-center">Équipements et services</h2>
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3">Confort moderne</h3>
                    <p className="text-gray-700">
                      Toutes nos chambres sont équipées de climatisation, Wi-Fi haut débit, télévision à écran plat et
                      literie de qualité supérieure pour votre confort.
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
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3">Services additionnels</h3>
                    <p className="text-gray-700">
                      Profitez de nos services additionnels comme le service de chambre, le nettoyage quotidien, la
                      blanchisserie et l&apos;assistance 24h/24.
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
                    <h3 className="text-xl font-bold mb-3">Installations communes</h3>
                    <p className="text-gray-700">
                      Accédez à nos installations communes comme le restaurant, le bar, le parking gratuit et les
                      espaces de détente extérieurs.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </ScrollAnimation>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 md:px-8 bg-blue-50">
          <div className="max-w-7xl mx-auto text-center">
            <ScrollAnimation>
              <h2 className="text-3xl font-bold mb-6">Prêt à réserver votre séjour?</h2>
              <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
                Réservez directement sur notre site pour bénéficier des meilleurs tarifs et d&apos;avantages exclusifs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/chambres">Voir toutes nos chambres</Link>
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
  )
}
