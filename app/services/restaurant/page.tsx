import type { Metadata } from "next"
import ScrollAnimation from "@/components/scroll-animation"
import OptimizedImage from "@/components/optimized-image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import Breadcrumb from "@/components/breadcrumb"
import RelatedServices from "@/components/related-services"
import RestaurantHeroCarousel from "@/components/restaurant-hero-carousel"

export const metadata: Metadata = {
  title: "Restaurant | John Services Motel",
  description: "Découvrez notre restaurant proposant une cuisine délicieuse dans un cadre élégant et confortable.",
}

export default function RestaurantPage() {
  return (
    <div className="px-4 md:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
            <RestaurantHeroCarousel />
            <div className="absolute inset-0 bg-black/40 z-10" />
            <div className="relative h-full flex items-center justify-center text-center px-4 z-20">
              <div className="max-w-3xl">
                <ScrollAnimation>
                  <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Notre Restaurant</h1>
                  <p className="text-lg md:text-xl text-white/90 mb-8">
                    Une expérience culinaire exceptionnelle dans un cadre élégant et confortable
                  </p>
                  <Button asChild size="lg">
                    <Link href="/contact">Réserver une table</Link>
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
                    <h2 className="text-3xl font-bold mb-6">Une cuisine raffinée pour tous les goûts</h2>
                    <p className="text-gray-700 mb-4">
                      Notre restaurant propose une cuisine délicieuse et variée, préparée avec soin par notre chef
                      talentueux et son équipe. Nous utilisons des ingrédients frais et de saison pour créer des plats
                      savoureux qui satisferont tous les palais.
                    </p>
                    <p className="text-gray-700 mb-4">
                      Que vous soyez résident de l&apos;hôtel ou simplement de passage, notre restaurant vous accueille
                      dans un cadre chaleureux et élégant pour un petit-déjeuner énergisant, un déjeuner d&apos;affaires
                      ou un dîner romantique.
                    </p>
                    <p className="text-gray-700">
                      Notre équipe attentionnée est là pour vous offrir un service impeccable et faire de votre repas un
                      moment mémorable.
                    </p>
                  </div>
                  <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                    <OptimizedImage
                      src="/motel-restaurant-2.jpeg"
                      alt="Intérieur du restaurant"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </section>

          {/* Menu Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <ScrollAnimation>
                <h2 className="text-3xl font-bold mb-12 text-center">Notre Menu</h2>
                <Tabs defaultValue="breakfast" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="breakfast">Petit-déjeuner</TabsTrigger>
                    <TabsTrigger value="lunch">Déjeuner</TabsTrigger>
                    <TabsTrigger value="dinner">Dîner</TabsTrigger>
                  </TabsList>
                  <TabsContent value="breakfast" className="border rounded-lg p-6 bg-white shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-2xl font-bold mb-6">Petit-déjeuner</h3>
                        <p className="text-gray-700 mb-6">
                          Servi de 6h30 à 10h30, notre petit-déjeuner propose un large choix d&apos;options pour bien
                          commencer la journée.
                        </p>
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-lg font-semibold mb-2">Continental</h4>
                            <p className="text-gray-600 mb-1">
                              Sélection de viennoiseries, pain frais, confitures, miel, beurre
                            </p>
                            <p className="text-gray-600 mb-1">Yaourts, fruits frais, céréales</p>
                            <p className="text-gray-600">Jus de fruits, café, thé, chocolat chaud</p>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold mb-2">Américain</h4>
                            <p className="text-gray-600 mb-1">Œufs au choix (brouillés, au plat, à la coque)</p>
                            <p className="text-gray-600 mb-1">Bacon, saucisses, pommes de terre rissolées</p>
                            <p className="text-gray-600">Toast, beurre, confiture</p>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold mb-2">Healthy</h4>
                            <p className="text-gray-600 mb-1">Smoothie bowl aux fruits et graines</p>
                            <p className="text-gray-600 mb-1">Avocado toast sur pain complet</p>
                            <p className="text-gray-600">Jus de fruits frais pressés</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative h-[400px] rounded-lg overflow-hidden">
                        <OptimizedImage
                          src="/motel-restaurant.jpeg"
                          alt="Petit-déjeuner"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="lunch" className="border rounded-lg p-6 bg-white shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-2xl font-bold mb-6">Déjeuner</h3>
                        <p className="text-gray-700 mb-6">
                          Servi de 12h à 14h30, notre menu déjeuner propose des plats légers et savoureux, parfaits pour
                          une pause repas.
                        </p>
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-lg font-semibold mb-2">Entrées</h4>
                            <p className="text-gray-600 mb-1">Salade César au poulet grillé</p>
                            <p className="text-gray-600 mb-1">Velouté de légumes de saison</p>
                            <p className="text-gray-600">Carpaccio de saumon aux agrumes</p>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold mb-2">Plats</h4>
                            <p className="text-gray-600 mb-1">Burger gourmet, frites maison</p>
                            <p className="text-gray-600 mb-1">Pâtes fraîches aux légumes grillés</p>
                            <p className="text-gray-600">Filet de poisson du jour, purée de patate douce</p>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold mb-2">Desserts</h4>
                            <p className="text-gray-600 mb-1">Tarte fine aux pommes, glace vanille</p>
                            <p className="text-gray-600 mb-1">Mousse au chocolat</p>
                            <p className="text-gray-600">Salade de fruits frais</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative h-[400px] rounded-lg overflow-hidden">
                        <OptimizedImage src="/motel-restaurant-2.jpeg" alt="Déjeuner" fill className="object-cover" />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="dinner" className="border rounded-lg p-6 bg-white shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-2xl font-bold mb-6">Dîner</h3>
                        <p className="text-gray-700 mb-6">
                          Servi de 19h à 22h30, notre menu dîner propose une cuisine raffinée dans une ambiance élégante
                          et chaleureuse.
                        </p>
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-lg font-semibold mb-2">Entrées</h4>
                            <p className="text-gray-600 mb-1">Foie gras maison, chutney de figues</p>
                            <p className="text-gray-600 mb-1">Tartare de thon aux saveurs asiatiques</p>
                            <p className="text-gray-600">Risotto aux champignons</p>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold mb-2">Plats</h4>
                            <p className="text-gray-600 mb-1">Filet de bœuf, sauce au poivre, gratin dauphinois</p>
                            <p className="text-gray-600 mb-1">
                              Magret de canard, sauce aux fruits rouges, légumes de saison
                            </p>
                            <p className="text-gray-600">
                              Dos de cabillaud, écrasé de pommes de terre à l&apos;huile d&apos;olive
                            </p>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold mb-2">Desserts</h4>
                            <p className="text-gray-600 mb-1">Crème brûlée à la vanille</p>
                            <p className="text-gray-600 mb-1">Fondant au chocolat, glace caramel</p>
                            <p className="text-gray-600">Assiette de fromages affinés</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative h-[400px] rounded-lg overflow-hidden">
                        <OptimizedImage src="/motel-bar.jpeg" alt="Dîner" fill className="object-cover" />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </ScrollAnimation>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <ScrollAnimation>
                <h2 className="text-3xl font-bold mb-12 text-center">Nos engagements</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-3">Produits locaux</h3>
                      <p className="text-gray-700">
                        Nous privilégions les produits locaux et de saison pour soutenir les producteurs de la région et
                        vous offrir des plats frais et savoureux.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-green-600"
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
                      <h3 className="text-xl font-bold mb-3">Fait maison</h3>
                      <p className="text-gray-700">
                        Tous nos plats sont préparés sur place par notre équipe de cuisine passionnée, garantissant
                        qualité et authenticité dans chaque assiette.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-green-600"
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
                      <h3 className="text-xl font-bold mb-3">Options pour tous</h3>
                      <p className="text-gray-700">
                        Nous proposons des options végétariennes, véganes et sans gluten pour répondre à tous les
                        régimes alimentaires et préférences.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </ScrollAnimation>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-green-50">
            <div className="max-w-7xl mx-auto text-center">
              <ScrollAnimation>
                <h2 className="text-3xl font-bold mb-6">Réservez votre table</h2>
                <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
                  Pour une expérience culinaire inoubliable, réservez votre table dès maintenant. Notre équipe se fera
                  un plaisir de vous accueillir.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg">
                    <Link href="/contact">Réserver une table</Link>
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
