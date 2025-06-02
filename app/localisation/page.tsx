import type { Metadata } from "next"
import MapLocation from "@/components/map-location"
import { Button } from "@/components/ui/button"
import ScrollAnimation from "@/components/scroll-animation"
import { MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Localisation | JohnService Motel",
  description:
    "Découvrez comment nous rejoindre facilement. Situé au cœur de Bukavu, notre motel est idéalement placé pour explorer la ville et ses environs.",
}

export default function LocalisationPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden bg-gradient-to-br from-primary-800 to-primary-900 px-4 md:px-8">
        <div className="absolute inset-0 bg-primary-950/20 z-10"></div>
        <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-center items-center text-center z-20">
          <h1 className="text-white mb-4 animate-fade-in">Notre Localisation</h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl animate-slide-up">Idéalement situé à de Goma</p>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 md:py-16 bg-background px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimation>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="rounded-xl overflow-hidden shadow-lg h-[400px] md:h-[500px]">
                <MapLocation />
              </div>
              <div className="space-y-6">
                <div>
                  <h2 className="text-foreground mb-4">Nous Trouver</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-2 rounded-full bg-primary/10">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Adresse</h3>
                        <p className="text-muted-foreground">
                          Quartier: Le volcan, AV. Le messager, N° 13B
                          <br />
                          Goma, Nord-kivu
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
                        <h3 className="text-lg font-semibold text-foreground">Coordonnées GPS</h3>
                        <p className="text-muted-foreground">Latitude: -2.4917, Longitude: 28.8428</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-2 rounded-full bg-primary/10">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Contact</h3>
                        <p className="text-muted-foreground">
                          Téléphone: +243 997 163 443
                          <br />
                          Email: johnservicesmotel@gmail.com
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

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-800 to-primary-900 text-white px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à Séjourner Chez Nous?</h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Réservez dès maintenant et profitez de notre emplacement idéal pour explorer Bukavu et ses environs.
            </p>
            <Button size="lg" className="bg-white text-primary-900 hover:bg-white/90 font-semibold">
              Réserver une Chambre
            </Button>
          </ScrollAnimation>
        </div>
      </section>
    </main>
  )
}
