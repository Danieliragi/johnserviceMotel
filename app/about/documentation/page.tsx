import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Info, CheckCircle, Coffee, Wifi, Car, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Documentation | John Services Motel",
  description: "Découvrez le John Services Motel, votre havre de paix et de confort au cœur de la ville de Goma.",
}

export default function DocumentationPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <Link href="/" className="text-sm text-gray-500 hover:text-primary">
                Accueil
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/about" className="text-sm text-gray-500 hover:text-primary">
                À propos
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-sm text-gray-700">Documentation</span>
            </div>

            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Documentation</h1>
              <div className="w-20 h-1 bg-[#8c3d0e] mx-auto rounded-full"></div>
            </div>

            <Card className="mb-10 overflow-hidden border-none shadow-lg">
              <div className="relative h-64 md:h-80">
                <Image src="/motel-day-1.jpeg" alt="John Services Motel" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h2 className="text-2xl md:text-3xl font-bold">À propos de nous</h2>
                  </div>
                </div>
              </div>
              <CardContent className="p-6 md:p-8">
                <div className="prose max-w-none">
                  <p className="text-lg leading-relaxed mb-6">
                    Bienvenue au John services Motel, votre havre de paix et de confort au cœur de la ville de Goma sur
                    l'avenue le Messager dans le quartier les volcans.
                  </p>

                  <p className="mb-6">
                    Que vous soyez en voyage d'affaires, en couple ou en famille, notre établissement vous accueille
                    dans un cadre chaleureux et sécurisé.
                  </p>

                  <p className="mb-6">
                    Nous mettons un point d'honneur à offrir un service de qualité, des chambres propres et bien
                    équipées, ainsi qu'un personnel attentif à vos besoins. Avec 22 chambres modernes et un restaurant
                    sur place, nous nous assurons que votre séjour soit agréable, reposant et mémorable.
                  </p>

                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Info className="h-5 w-5 text-[#8c3d0e]" />
                    Nos atouts
                  </h3>

                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#8c3d0e] mt-0.5 flex-shrink-0" />
                      <span>Chambres climatisées avec télévision et Wi-Fi</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#8c3d0e] mt-0.5 flex-shrink-0" />
                      <span>Restaurant avec menu varié</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#8c3d0e] mt-0.5 flex-shrink-0" />
                      <span>Service de réception attentif</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#8c3d0e] mt-0.5 flex-shrink-0" />
                      <span>Sécurité 24h/24</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#8c3d0e] mt-0.5 flex-shrink-0" />
                      <span>Parking gratuit</span>
                    </li>
                  </ul>

                  <p className="text-lg font-medium text-center mt-8">
                    Au John services Motel, votre confort est notre priorité.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="text-center p-6 hover:shadow-md transition-shadow">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Wifi className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Wi-Fi Gratuit</h3>
                <p className="text-gray-600 text-sm">Restez connecté pendant votre séjour</p>
              </Card>

              <Card className="text-center p-6 hover:shadow-md transition-shadow">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Coffee className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Restaurant</h3>
                <p className="text-gray-600 text-sm">Savourez notre cuisine locale et internationale</p>
              </Card>

              <Card className="text-center p-6 hover:shadow-md transition-shadow">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Parking</h3>
                <p className="text-gray-600 text-sm">Stationnement gratuit et sécurisé</p>
              </Card>

              <Card className="text-center p-6 hover:shadow-md transition-shadow">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Sécurité</h3>
                <p className="text-gray-600 text-sm">Surveillance 24h/24 pour votre tranquillité</p>
              </Card>
            </div>

            <div className="text-center">
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/chambres">Découvrir nos chambres</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
