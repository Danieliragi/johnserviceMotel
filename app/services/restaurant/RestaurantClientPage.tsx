"use client"

import ScrollAnimation from "@/components/scroll-animation"
import OptimizedImage from "@/components/optimized-image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import Breadcrumb from "@/components/breadcrumb"
import RelatedServices from "@/components/related-services"
import RestaurantHeroCarousel from "@/components/restaurant-hero-carousel"

export default function RestaurantClientPage() {
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
                <h2 className="text-3xl font-bold mb-12 text-center">Nos Menus & Cartes</h2>
                <Tabs defaultValue="breakfast" className="w-full">
                  <TabsList className="grid w-full grid-cols-5 mb-8">
                    <TabsTrigger value="breakfast">Petit-déjeuner</TabsTrigger>
                    <TabsTrigger value="menu">Plats Principaux</TabsTrigger>
                    <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
                    <TabsTrigger value="drinks1">Boissons</TabsTrigger>
                    <TabsTrigger value="drinks2">Carte des Vins</TabsTrigger>
                  </TabsList>

                  {/* Petit-déjeuner */}
                  <TabsContent value="breakfast" className="border rounded-lg p-6 bg-white shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold mb-6 text-green-700">Petit-déjeuner</h3>

                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-gray-800">Boissons chaudes</h4>
                          <ul className="space-y-2 text-gray-700">
                            <li>• Café</li>
                            <li>• Thé</li>
                            <li>• Lait</li>
                          </ul>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-gray-800">Œufs</h4>
                          <ul className="space-y-2 text-gray-700">
                            <li>• Œuf sur plat</li>
                            <li>• Œuf brouillés</li>
                            <li>• Omelette (Nature, Fromage, Oignons, Tomate, Jambon)</li>
                          </ul>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-gray-800">Accompagnements</h4>
                          <ul className="space-y-2 text-gray-700">
                            <li>• Pomme de terre</li>
                            <li>• Saucisson</li>
                            <li>• Oignons</li>
                            <li>• Tomate</li>
                            <li>• Jambon</li>
                          </ul>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-red-600">Cake du jour</h4>
                          <ul className="space-y-2 text-gray-700">
                            <li>• Salade de fruits</li>
                            <li>• Bananes</li>
                          </ul>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-gray-800">Jus frais</h4>
                          <ul className="space-y-2 text-gray-700">
                            <li>• Gingembre & ananas</li>
                            <li>• Pastèque & prune</li>
                            <li>• Maracuja</li>
                          </ul>
                        </div>
                      </div>

                      <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg">
                        <OptimizedImage
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/johnserviceMotelPtitDejune.jpg-qL70Cn3DK2bs4j1CDgB2ajAp3TCycP.jpeg"
                          alt="Menu Petit-déjeuner"
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                          onClick={() =>
                            window.open(
                              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/johnserviceMotelPtitDejune.jpg-qL70Cn3DK2bs4j1CDgB2ajAp3TCycP.jpeg",
                              "_blank",
                            )
                          }
                        />
                      </div>
                    </div>
                  </TabsContent>

                  {/* Plats Principaux */}
                  <TabsContent value="menu" className="border rounded-lg p-6 bg-white shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold mb-6 text-green-700">Nos Plats</h3>

                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-red-600">Nos Pâtes</h4>
                          <p className="text-sm text-gray-600 italic">Spaghetti, tagliatelle ou penne</p>
                          <ul className="space-y-2 text-gray-700">
                            <li>
                              • Sauce tomate, crème, basilic jambon, pesto{" "}
                              <span className="float-right font-semibold">8$</span>
                            </li>
                            <li>
                              • Sauce bolognaise <span className="float-right font-semibold">10$</span>
                            </li>
                            <li>
                              • Sauce tomate et thon <span className="float-right font-semibold">6$</span>
                            </li>
                            <li>
                              • Huile d&apos;olive, ail et champignons{" "}
                              <span className="float-right font-semibold">10$</span>
                            </li>
                            <li>
                              • Aux légumes de kibumba <span className="float-right font-semibold">6$</span>
                            </li>
                          </ul>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-red-600">Nos Potages</h4>
                          <ul className="space-y-2 text-gray-700">
                            <li>
                              • Crème de carottes parfumée au curry et gingembre{" "}
                              <span className="float-right font-semibold">4$</span>
                            </li>
                            <li>
                              • Soupe de légumes verts <span className="float-right font-semibold">4$</span>
                            </li>
                            <li>
                              • Soupe de makoso John Services Motel{" "}
                              <span className="float-right font-semibold">5$</span>
                            </li>
                          </ul>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-red-600">Nos Grillades</h4>
                          <ul className="space-y-2 text-gray-700">
                            <li>
                              • Capitaine grillée (Frites) <span className="float-right font-semibold">10$</span>
                            </li>
                            <li>
                              • Filet de thilapia grillée (frites){" "}
                              <span className="float-right font-semibold">10$</span>
                            </li>
                            <li>
                              • Côte de porc grillée <span className="float-right font-semibold">14$</span>
                            </li>
                            <li>
                              • Steack de bœuf grillée <span className="float-right font-semibold">15$</span>
                            </li>
                            <li>
                              • Mixed grill (1/4Poulet, Steak, Côte de porc){" "}
                              <span className="float-right font-semibold">15$</span>
                            </li>
                            <li>
                              • Les sauces aux choix (Champignons, poivre vert, roquefort, provençal){" "}
                              <span className="float-right font-semibold">2$</span>
                            </li>
                          </ul>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-red-600">Nos Desserts</h4>
                          <ul className="space-y-2 text-gray-700">
                            <li>
                              • Salade de fruits frais <span className="float-right font-semibold">5$</span>
                            </li>
                            <li>
                              • Crêpe Suzette aux fruits de la passion{" "}
                              <span className="float-right font-semibold">6$</span>
                            </li>
                            <li>
                              • Crêpe au chocolat <span className="float-right font-semibold">5$</span>
                            </li>
                            <li>
                              • Crêpe Nutella <span className="float-right font-semibold">5$</span>
                            </li>
                            <li>
                              • Crêpe au miel citron <span className="float-right font-semibold">5$</span>
                            </li>
                            <li>
                              • Glace : (Chocolat & Vanille) Toutes nos glaces sont faites maison{" "}
                              <span className="float-right font-semibold">5$</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="relative h-[600px] rounded-lg overflow-hidden shadow-lg">
                        <OptimizedImage
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/menu.jpg-4xQNXK7PoFKnvm1sNSRzwNY0rFsUgp.jpeg"
                          alt="Menu Principal"
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                          onClick={() =>
                            window.open(
                              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/menu.jpg-4xQNXK7PoFKnvm1sNSRzwNY0rFsUgp.jpeg",
                              "_blank",
                            )
                          }
                        />
                      </div>
                    </div>
                  </TabsContent>

                  {/* Restaurant */}
                  <TabsContent value="restaurant" className="border rounded-lg p-6 bg-white shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold mb-6 text-green-700">Restaurant</h3>

                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-red-600">Sur le Pouce</h4>
                          <p className="text-sm text-gray-600 italic">Conseillé à nos amis végétariens</p>
                          <ul className="space-y-2 text-gray-700">
                            <li>
                              • Assiette de sambazas <span className="float-right font-semibold">4$</span>
                            </li>
                            <li>
                              • Assiette de saucisse pili <span className="float-right font-semibold">5$</span>
                            </li>
                            <li>
                              • Assiette de fromage de masisi <span className="float-right font-semibold">4$</span>
                            </li>
                            <li>
                              • Assiette &apos;John Services Motel&apos; (Sambaza, fromage, saucisse, sambusas){" "}
                              <span className="float-right font-semibold">4$</span>
                            </li>
                            <li>
                              • Assiette de sambusas bœuf ou de légume{" "}
                              <span className="float-right font-semibold">4$</span>
                            </li>
                            <li>
                              • Quesadillas au bœuf (Galettes tortillas, bœuf, sauce mexicaine){" "}
                              <span className="float-right font-semibold">8$</span>
                            </li>
                            <li>
                              • Quesadillas au poulet (Galettes tortillas, poulet, sauce mexicaine){" "}
                              <span className="float-right font-semibold">6$</span>
                            </li>
                            <li>
                              • Quesadillas au légumes (Galettes tortillas, légumes, sauce mexicaine){" "}
                              <span className="float-right font-semibold">6$</span>
                            </li>
                          </ul>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-red-600">La Terre</h4>
                          <ul className="space-y-2 text-gray-700">
                            <li>
                              • Filet de bœuf sauce roquefort (Pomme sauté){" "}
                              <span className="float-right font-semibold">15$</span>
                            </li>
                            <li>
                              • Pavé de bœuf sauce aux poivres (Pomme nature, Épinard){" "}
                              <span className="float-right font-semibold">15$</span>
                            </li>
                            <li>
                              • Émincé de poulet au champignon (Riz Blanc){" "}
                              <span className="float-right font-semibold">12$</span>
                            </li>
                            <li>
                              • Émincé de poulet au curry et coco (Riz-Thaï){" "}
                              <span className="float-right font-semibold">12$</span>
                            </li>
                            <li>
                              • Émincé de poulet légume de kibumba (Pomme nature){" "}
                              <span className="float-right font-semibold">10$</span>
                            </li>
                            <li>
                              • Tripe de bœuf sauce tomate (Butumbu, Foufou, lenga lenga){" "}
                              <span className="float-right font-semibold">10$</span>
                            </li>
                          </ul>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-red-600">Poissons</h4>
                          <ul className="space-y-2 text-gray-700">
                            <li>
                              • Tilapia Géant <span className="float-right font-semibold">12$</span>
                            </li>
                            <li>
                              • Tilapia à la congolaise et foufou <span className="float-right font-semibold">10$</span>
                            </li>
                            <li>
                              • Filets de tilapia (Paume sauté, Légume mixte){" "}
                              <span className="float-right font-semibold">12$</span>
                            </li>
                            <li>
                              • Filet de tilapia à la provençale (légumes, pomme rissolé){" "}
                              <span className="float-right font-semibold">12$</span>
                            </li>
                            <li>
                              • Pavé de capitaine sauce curry et coco (Riz){" "}
                              <span className="float-right font-semibold">15$</span>
                            </li>
                            <li>
                              • Pavé de capitaine au citron <span className="float-right font-semibold">15$</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="relative h-[600px] rounded-lg overflow-hidden shadow-lg">
                        <OptimizedImage
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/menu2.jpg-XQAkcKerBkFz6HLNMsFBWs0g6fsVzO.jpeg"
                          alt="Menu Restaurant"
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                          onClick={() =>
                            window.open(
                              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/menu2.jpg-XQAkcKerBkFz6HLNMsFBWs0g6fsVzO.jpeg",
                              "_blank",
                            )
                          }
                        />
                      </div>
                    </div>
                  </TabsContent>

                  {/* Boissons 1 */}
                  <TabsContent value="drinks1" className="border rounded-lg p-6 bg-white shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold mb-6 text-green-700">Carte des Boissons</h3>

                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-red-600">Canettes</h4>
                          <ul className="space-y-2 text-gray-700">
                            <li>
                              • Red bull <span className="float-right font-semibold">3$</span>
                            </li>
                            <li>
                              • Smirnoff <span className="float-right font-semibold">3$</span>
                            </li>
                            <li>
                              • Skol <span className="float-right font-semibold">4$</span>
                            </li>
                            <li>
                              • Bavaria <span className="float-right font-semibold">3$</span>
                            </li>
                          </ul>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-red-600">Bières Locales</h4>
                          <ul className="space-y-2 text-gray-700">
                            <li>
                              • Heineken <span className="float-right font-semibold">3$</span>
                            </li>
                            <li>
                              • KingFisher <span className="float-right font-semibold">3$</span>
                            </li>
                            <li>
                              • Savana <span className="float-right font-semibold">3$</span>
                            </li>
                            <li>
                              • Leffe <span className="float-right font-semibold">3$</span>
                            </li>
                            <li>
                              • Guinness <span className="float-right font-semibold">5$</span>
                            </li>
                            <li>
                              • Doppel <span className="float-right font-semibold">4$</span>
                            </li>
                            <li>
                              • Turbo Gf <span className="float-right font-semibold">4$</span>
                            </li>
                            <li>
                              • Turbo Pf <span className="float-right font-semibold">3$</span>
                            </li>
                            <li>
                              • Legend <span className="float-right font-semibold">3$</span>
                            </li>
                            <li>
                              • Tembo <span className="float-right font-semibold">5$</span>
                            </li>
                            <li>
                              • Booster <span className="float-right font-semibold">3$</span>
                            </li>
                            <li>
                              • Royal <span className="float-right font-semibold">4$</span>
                            </li>
                            <li>
                              • Castel <span className="float-right font-semibold">3$</span>
                            </li>
                            <li>
                              • Club <span className="float-right font-semibold">4$</span>
                            </li>
                            <li>
                              • Amstel Beer <span className="float-right font-semibold">5$</span>
                            </li>
                            <li>
                              • Beaufort <span className="float-right font-semibold">3$</span>
                            </li>
                            <li>
                              • Simba <span className="float-right font-semibold">4$</span>
                            </li>
                            <li>
                              • 33/Export <span className="float-right font-semibold">4$</span>
                            </li>
                            <li>
                              • Class Gf <span className="float-right font-semibold">3$</span>
                            </li>
                            <li>
                              • Class Pf <span className="float-right font-semibold">2$</span>
                            </li>
                            <li>
                              • Primus Gf <span className="float-right font-semibold">3$</span>
                            </li>
                            <li>
                              • Primus Pf <span className="float-right font-semibold">3$</span>
                            </li>
                            <li>
                              • Super book <span className="float-right font-semibold">4$</span>
                            </li>
                            <li>
                              • Mitzig Gf <span className="float-right font-semibold">4$</span>
                            </li>
                            <li>
                              • Mitzig Pf <span className="float-right font-semibold">3$</span>
                            </li>
                          </ul>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-red-600">Bralirwa</h4>
                          <ul className="space-y-2 text-gray-700">
                            <li>
                              • Heineken <span className="float-right font-semibold">3$</span>
                            </li>
                            <li>
                              • Gatano <span className="float-right font-semibold">3$</span>
                            </li>
                            <li>
                              • Virunga Gf <span className="float-right font-semibold">3$</span>
                            </li>
                            <li>
                              • Virunga Pf <span className="float-right font-semibold">2$</span>
                            </li>
                            <li>
                              • Mitzig Gf <span className="float-right font-semibold">3$</span>
                            </li>
                            <li>
                              • Mitzig Pf <span className="float-right font-semibold">2$</span>
                            </li>
                            <li>
                              • Primus Gf <span className="float-right font-semibold">3$</span>
                            </li>
                            <li>
                              • Primus Pf <span className="float-right font-semibold">2$</span>
                            </li>
                            <li>
                              • Turbo Gf <span className="float-right font-semibold">3$</span>
                            </li>
                            <li>
                              • Turbo Pf <span className="float-right font-semibold">2$</span>
                            </li>
                            <li>
                              • Skol Gf <span className="float-right font-semibold">3$</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="relative h-[600px] rounded-lg overflow-hidden shadow-lg">
                        <OptimizedImage
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Boissons.jpg-WchdWyhyiKpDTPdmd301GalYXk91sz.jpeg"
                          alt="Carte des Boissons"
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                          onClick={() =>
                            window.open(
                              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Boissons.jpg-WchdWyhyiKpDTPdmd301GalYXk91sz.jpeg",
                              "_blank",
                            )
                          }
                        />
                      </div>
                    </div>
                  </TabsContent>

                  {/* Boissons 2 */}
                  <TabsContent value="drinks2" className="border rounded-lg p-6 bg-white shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold mb-6 text-green-700">Carte des Boissons</h3>

                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-red-600">Boissons Chaudes</h4>
                          <ul className="space-y-2 text-gray-700">
                            <li>
                              • Thé au gingembre citron miel <span className="float-right font-semibold">2$</span>
                            </li>
                            <li>
                              • African TEA <span className="float-right font-semibold">2$</span>
                            </li>
                            <li>
                              • Thé mixte à la menthe <span className="float-right font-semibold">2$</span>
                            </li>
                            <li>
                              • Café <span className="float-right font-semibold">2$</span>
                            </li>
                            <li>
                              • Capouchino fait maison <span className="float-right font-semibold">4$</span>
                            </li>
                            <li>
                              • Espresso <span className="float-right font-semibold">3$</span>
                            </li>
                            <li>
                              • Chocolat chaud <span className="float-right font-semibold">3$</span>
                            </li>
                          </ul>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-red-600">Sans Alcool</h4>
                          <ul className="space-y-2 text-gray-700">
                            <li>
                              • Fanta <span className="float-right font-semibold">2$</span>
                            </li>
                            <li>
                              • Vitalo <span className="float-right font-semibold">2$</span>
                            </li>
                            <li>
                              • Coca zéro <span className="float-right font-semibold">1$</span>
                            </li>
                            <li>
                              • XXL <span className="float-right font-semibold">2$</span>
                            </li>
                            <li>
                              • Djino <span className="float-right font-semibold">2$</span>
                            </li>
                            <li>
                              • Energy Malt <span className="float-right font-semibold">1.5$</span>
                            </li>
                            <li>
                              • Jus Afia <span className="float-right font-semibold">2$</span>
                            </li>
                            <li>
                              • Eau <span className="float-right font-semibold">1$</span>
                            </li>
                          </ul>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-red-600">Jus Frais</h4>
                          <ul className="space-y-2 text-gray-700">
                            <li>
                              • Jus de gingembre & Ananas <span className="float-right font-semibold">3$</span>
                            </li>
                            <li>
                              • Jus de pastèque & Prune <span className="float-right font-semibold">3$</span>
                            </li>
                            <li>
                              • Jus de maracuja <span className="float-right font-semibold">3$</span>
                            </li>
                          </ul>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-red-600">Apéritifs</h4>
                          <ul className="space-y-2 text-gray-700">
                            <li>
                              • Martini <span className="float-right font-semibold">5$</span>
                            </li>
                            <li>
                              • Malibu <span className="float-right font-semibold">5$</span>
                            </li>
                            <li>
                              • Amarula <span className="float-right font-semibold">5$</span>
                            </li>
                            <li>
                              • Vins <span className="float-right font-semibold">5$</span>
                            </li>
                          </ul>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-red-600">Shorts</h4>
                          <ul className="space-y-2 text-gray-700">
                            <li>
                              • Absolute <span className="float-right font-semibold">4$</span>
                            </li>
                            <li>
                              • Black label <span className="float-right font-semibold">5$</span>
                            </li>
                            <li>
                              • Double black <span className="float-right font-semibold">6$</span>
                            </li>
                            <li>
                              • Hennessy <span className="float-right font-semibold">6$</span>
                            </li>
                            <li>
                              • Jack Daniel <span className="float-right font-semibold">5$</span>
                            </li>
                            <li>
                              • JB <span className="float-right font-semibold">4$</span>
                            </li>
                            <li>
                              • Red label <span className="float-right font-semibold">3$</span>
                            </li>
                            <li>
                              • Tequila <span className="float-right font-semibold">6$</span>
                            </li>
                            <li>
                              • Gordon <span className="float-right font-semibold">3$</span>
                            </li>
                          </ul>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-red-600">Bouteilles</h4>
                          <ul className="space-y-2 text-gray-700">
                            <li>
                              • Moet <span className="float-right font-semibold">100$</span>
                            </li>
                            <li>
                              • La cuvée <span className="float-right font-semibold">100$</span>
                            </li>
                            <li>
                              • Castel <span className="float-right font-semibold">25$</span>
                            </li>
                            <li>
                              • Belaire <span className="float-right font-semibold">100$</span>
                            </li>
                            <li>
                              • Muscador <span className="float-right font-semibold">7$</span>
                            </li>
                            <li>
                              • Chamdor <span className="float-right font-semibold">8$</span>
                            </li>
                            <li>
                              • Malibu <span className="float-right font-semibold">25$</span>
                            </li>
                            <li>
                              • Hennessy <span className="float-right font-semibold">80$</span>
                            </li>
                            <li>
                              • Jack Daniel <span className="float-right font-semibold">60$</span>
                            </li>
                            <li>
                              • Double black <span className="float-right font-semibold">60$</span>
                            </li>
                            <li>
                              • Black label <span className="float-right font-semibold">40$</span>
                            </li>
                            <li>
                              • Absolute <span className="float-right font-semibold">25$</span>
                            </li>
                            <li>
                              • Amarula 100cl <span className="float-right font-semibold">30$</span>
                            </li>
                            <li>
                              • Amarula 70cl <span className="float-right font-semibold">15$</span>
                            </li>
                            <li>
                              • Red label <span className="float-right font-semibold">25$</span>
                            </li>
                            <li>
                              • CELLAR 5l <span className="float-right font-semibold">35$</span>
                            </li>
                            <li>
                              • CELLAR 75cl <span className="float-right font-semibold">20$</span>
                            </li>
                            <li>
                              • Don-Simo <span className="float-right font-semibold">5$</span>
                            </li>
                            <li>
                              • Gordon <span className="float-right font-semibold">25$</span>
                            </li>
                            <li>
                              • Drostdy 5L <span className="float-right font-semibold">30$</span>
                            </li>
                            <li>
                              • Drostdy 75CL <span className="float-right font-semibold">15$</span>
                            </li>
                            <li>
                              • Vin <span className="float-right font-semibold">25$</span>
                            </li>
                            <li>
                              • JB <span className="float-right font-semibold">30$</span>
                            </li>
                            <li>
                              • Tequila <span className="float-right font-semibold">30$</span>
                            </li>
                            <li>
                              • Martini <span className="float-right font-semibold">30$</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="relative h-[600px] rounded-lg overflow-hidden shadow-lg">
                        <OptimizedImage
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/boissons2.jpg-gzPspK7wG0ZngetSGHUMs4ZZQ0MaH4.jpeg"
                          alt="Carte des Vins et Spiritueux"
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                          onClick={() =>
                            window.open(
                              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/boissons2.jpg-gzPspK7wG0ZngetSGHUMs4ZZQ0MaH4.jpeg",
                              "_blank",
                            )
                          }
                        />
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
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m- 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
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
