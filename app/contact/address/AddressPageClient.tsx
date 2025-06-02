"use client"

import { MapPin, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ScrollAnimation from "@/components/scroll-animation"
import MapLocation from "@/components/map-location"

export default function AddressPageClient() {
  const handleDirections = () => {
    const coordinates = "-1.677700,29.228500"
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coordinates}`
    window.open(googleMapsUrl, "_blank")
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-600 text-white py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Notre Adresse</h1>
            <p className="text-xl opacity-90">Trouvez-nous facilement au cœur de Goma</p>
          </div>
        </div>
      </section>

      {/* Address Information */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation direction="up">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-800 mb-4">Informations d'Adresse</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Toutes les informations nécessaires pour nous trouver facilement
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <ScrollAnimation direction="left" delay={0.1}>
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="bg-gradient-to-r from-primary to-primary-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <MapPin className="h-6 w-6" />
                    Adresse Complète
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">John Services Motel</h3>
                      <div className="w-16 h-1 bg-primary mx-auto mb-4"></div>
                    </div>
                    <div className="space-y-3 text-slate-700">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="font-medium">Quartier: Le Volcan</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="font-medium">Avenue du Messager, N° 13B</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="font-medium">Goma, Nord-Kivu</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="font-medium">République Démocratique du Congo</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation direction="up" delay={0.2}>
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="bg-gradient-to-r from-primary to-primary-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <Navigation className="h-6 w-6" />
                    Coordonnées GPS
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-slate-800 mb-4">Position Exacte</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-primary">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600 font-medium">Latitude:</span>
                          <span className="font-mono text-lg text-slate-800 font-bold">-1.677700</span>
                        </div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-primary">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600 font-medium">Longitude:</span>
                          <span className="font-mono text-lg text-slate-800 font-bold">29.228500</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={handleDirections}
                      className="w-full bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Navigation className="h-5 w-5 mr-2" />
                      Obtenir l'itinéraire
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation direction="right" delay={0.3}>
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 md:col-span-2 xl:col-span-1">
                <CardHeader className="bg-gradient-to-r from-primary to-primary-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <MapPin className="h-6 w-6" />
                    Points de Repère
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-slate-800 mb-4">Comment nous trouver</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                        <div className="w-3 h-3 rounded-full bg-primary mt-1 flex-shrink-0"></div>
                        <p className="text-slate-700 font-medium">Directement en face de l'Eco-Bank</p>
                      </div>
                      <div className="flex items-start gap-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                        <div className="w-3 h-3 rounded-full bg-primary mt-1 flex-shrink-0"></div>
                        <p className="text-slate-700 font-medium">À 3 minutes à pied de l'Eco-Bank</p>
                      </div>
                      <div className="flex items-start gap-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                        <div className="w-3 h-3 rounded-full bg-primary mt-1 flex-shrink-0"></div>
                        <p className="text-slate-700 font-medium">Quartier du Volcan, zone centrale</p>
                      </div>
                      <div className="flex items-start gap-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                        <div className="w-3 h-3 rounded-full bg-primary mt-1 flex-shrink-0"></div>
                        <p className="text-slate-700 font-medium">Accès facile depuis tous les quartiers</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>

          {/* Enhanced Address Summary */}
          <ScrollAnimation direction="up" delay={0.4}>
            <div className="mt-16 bg-gradient-to-r from-primary to-primary-600 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
              <div className="text-center max-w-4xl mx-auto">
                <h3 className="text-3xl font-bold mb-6">Adresse Complète pour Navigation</h3>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
                  <p className="text-xl md:text-2xl font-semibold leading-relaxed">
                    John Services Motel
                    <br />
                    Avenue du Messager, N° 13B
                    <br />
                    Quartier Le Volcan, Goma
                    <br />
                    Nord-Kivu, RD Congo
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={handleDirections}
                    size="lg"
                    className="bg-white text-primary hover:bg-slate-100 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Navigation className="h-5 w-5 mr-2" />
                    Naviguer vers nous
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-primary font-semibold"
                    asChild
                  >
                    <a href="/contact">Plus d'informations</a>
                  </Button>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-slate-50 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimation direction="up">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Localisation sur la carte</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Visualisez notre emplacement exact et planifiez votre itinéraire facilement
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-primary/20">
              <MapLocation />
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-600 text-white px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <ScrollAnimation direction="up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à nous rendre visite?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Réservez votre séjour dès maintenant et découvrez l'hospitalité du John Services Motel
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-slate-100" asChild>
                <a href="/chambres">Réserver une chambre</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
                asChild
              >
                <a href="/contact">Nous contacter</a>
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </main>
  )
}
