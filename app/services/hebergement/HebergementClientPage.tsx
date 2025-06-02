"use client"

import ScrollAnimation from "@/components/scroll-animation"
import OptimizedImage from "@/components/optimized-image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import Breadcrumb from "@/components/breadcrumb"
import RelatedServices from "@/components/related-services"
import { useState, useEffect } from "react"
import { Check, ChevronRight, Calendar, Users, Star, Coffee, Wifi, Tv, Bath } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function HebergementClientPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const heroImages = [
    { src: "/john-motel-service-home.jpeg", alt: "John Services Motel - Accueil" },
    { src: "/motel-day-1.jpeg", alt: "Motel pendant la journée" },
    { src: "/motel-day-2.jpeg", alt: "Vue extérieure du motel" },
    { src: "/motel-day-3.jpeg", alt: "Façade du motel" },
    { src: "/motel-reception.jpeg", alt: "Réception du motel" },
    { src: "/standard-room-1.jpeg", alt: "Chambre Standard" },
    { src: "/deluxe-room-1.jpeg", alt: "Chambre De Luxe" },
  ]

  const testimonials = [
    {
      name: "Sophie Martin",
      role: "Voyageuse d'affaires",
      comment: "La chambre Standard était parfaite pour mon voyage d'affaires. Propre, confortable et bien équipée.",
      rating: 4.5,
      image: "/placeholder.svg?height=100&width=100&text=SM",
    },
    {
      name: "Thomas Dubois",
      role: "Couple en vacances",
      comment: "Nous avons adoré notre séjour dans la chambre De Luxe. Le lit était incroyablement confortable!",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100&text=TD",
    },
    {
      name: "Marie Leclerc",
      role: "Séjour en famille",
      comment: "La chambre VIP était spacieuse et luxueuse, parfaite pour notre famille. Le service était impeccable.",
      rating: 4.8,
      image: "/placeholder.svg?height=100&width=100&text=ML",
    },
  ]

  const roomFeatures = {
    standard: [
      { icon: <Wifi className="h-5 w-5" />, text: "Wi-Fi gratuit" },
      { icon: <Tv className="h-5 w-5" />, text: "TV écran plat" },
      { icon: <Bath className="h-5 w-5" />, text: "Salle de bain privée" },
      { icon: <Users className="h-5 w-5" />, text: "Pour 1-2 personnes" },
    ],
    deluxe: [
      { icon: <Wifi className="h-5 w-5" />, text: "Wi-Fi haut débit" },
      { icon: <Tv className="h-5 w-5" />, text: "Smart TV 4K" },
      { icon: <Bath className="h-5 w-5" />, text: "Salle de bain spacieuse" },
      { icon: <Coffee className="h-5 w-5" />, text: "Machine à café" },
      { icon: <Users className="h-5 w-5" />, text: "Pour 2-3 personnes" },
    ],
    vip: [
      { icon: <Wifi className="h-5 w-5" />, text: "Wi-Fi premium" },
      { icon: <Tv className="h-5 w-5" />, text: "Smart TV 4K + Streaming" },
      { icon: <Bath className="h-5 w-5" />, text: "Salle de bain luxueuse avec baignoire" },
      { icon: <Coffee className="h-5 w-5" />, text: "Machine à café Nespresso" },
      { icon: <Users className="h-5 w-5" />, text: "Pour 2-4 personnes" },
    ],
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 5000)

    // Preload all hero images
    heroImages.forEach((image, index) => {
      const img = new Image()
      img.onload = () => console.log(`Hero image ${index + 1} loaded successfully: ${image.src}`)
      img.onerror = () => console.error(`Failed to load hero image ${index + 1}: ${image.src}`)
      img.src = image.src
    })

    return () => clearInterval(interval)
  }, [heroImages])

  return (
    <div className="bg-gray-50">
      {/* Hero Section with Parallax Effect */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={image.src}
              className={`absolute inset-0 transition-all duration-1500 ease-in-out ${
                index === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              style={{ transform: index === currentImageIndex ? "scale(1)" : "scale(1.05)" }}
            >
              <OptimizedImage
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="100vw"
                fallbackSrc="/john-motel-service-home.jpeg"
                onError={() => {
                  console.error(`Failed to load hero image: ${image.src}`)
                }}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-20" />
        </div>

        <div className="relative h-full flex items-center justify-center text-center px-4 z-30 container mx-auto">
          <div className="max-w-3xl">
            <ScrollAnimation className="stagger-animation" animateClass="animate">
              <Badge className="mb-4 bg-primary/90 text-white hover:bg-primary px-4 py-1.5 text-sm">
                Service Premium
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Un Hébergement <span className="text-primary-foreground">Exceptionnel</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Découvrez nos chambres élégantes et confortables, conçues pour répondre à tous vos besoins et vous
                offrir une expérience inoubliable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white font-medium px-8"
                  onClick={() => setIsBookingOpen(true)}
                >
                  Réserver maintenant
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  <Link href="/chambres">Voir toutes nos chambres</Link>
                </Button>
              </div>
            </ScrollAnimation>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? "bg-primary scale-110" : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 py-8">
        <Breadcrumb />

        {/* Quick Booking Form */}
        <div
          className={`transition-all duration-500 overflow-hidden ${isBookingOpen ? "max-h-[500px] opacity-100 mb-8" : "max-h-0 opacity-0"}`}
        >
          <Card className="border-primary/20 shadow-lg">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Réservation rapide</h3>
                <Button variant="ghost" size="sm" onClick={() => setIsBookingOpen(false)}>
                  Fermer
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Date d'arrivée</label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none h-4 w-4" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Date de départ</label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none h-4 w-4" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Personnes</label>
                  <div className="relative">
                    <select className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary appearance-none">
                      <option>1 personne</option>
                      <option>2 personnes</option>
                      <option>3 personnes</option>
                      <option>4 personnes</option>
                    </select>
                    <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none h-4 w-4" />
                  </div>
                </div>
                <div className="flex items-end">
                  <Button className="w-full bg-primary hover:bg-primary/90">Vérifier disponibilité</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <main className="flex-1">
          {/* Overview Section with Stats */}
          <section className="py-16 bg-white rounded-xl shadow-sm mb-16">
            <div className="container mx-auto">
              <ScrollAnimation>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1">
                      Notre engagement
                    </Badge>
                    <h2 className="text-3xl font-bold mb-6">Un hébergement de qualité pour tous</h2>
                    <p className="text-gray-700 mb-4 text-lg">
                      Au John Services Motel, nous proposons une gamme complète d&apos;options d&apos;hébergement pour
                      répondre à tous les besoins et tous les budgets. Que vous soyez en voyage d&apos;affaires, en
                      vacances ou à la recherche d&apos;un séjour luxueux, nous avons la chambre parfaite pour vous.
                    </p>
                    <p className="text-gray-700 mb-6">
                      Toutes nos chambres sont équipées de commodités modernes, d&apos;une literie de qualité et
                      d&apos;un service attentionné pour garantir votre confort et votre satisfaction.
                    </p>
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div className="border-l-4 border-primary pl-4">
                        <p className="text-3xl font-bold text-primary">24/7</p>
                        <p className="text-sm text-gray-600">Service de réception</p>
                      </div>
                      <div className="border-l-4 border-primary pl-4">
                        <p className="text-3xl font-bold text-primary">3</p>
                        <p className="text-sm text-gray-600">Types de chambres</p>
                      </div>
                      <div className="border-l-4 border-primary pl-4">
                        <p className="text-3xl font-bold text-primary">22</p>
                        <p className="text-sm text-gray-600">Chambres disponibles</p>
                      </div>
                    </div>
                    <Button asChild className="bg-primary hover:bg-primary/90 mt-2">
                      <Link href="/about">
                        En savoir plus <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="relative">
                    <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
                      <OptimizedImage
                        src="/john-motel-service-home.jpeg"
                        alt="John Services Motel - Vue d'ensemble"
                        fill
                        className="object-cover"
                        fallbackSrc="/motel-day-1.jpeg"
                      />
                    </div>
                    <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg w-40 hidden md:block">
                      <div className="flex items-center justify-center mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-center text-sm font-medium">Noté excellent par nos clients</p>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </section>

          {/* Room Types Section with Enhanced UI */}
          <section className="py-16">
            <div className="container mx-auto">
              <ScrollAnimation>
                <div className="text-center mb-12">
                  <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 px-3 py-1">Nos chambres</Badge>
                  <h2 className="text-3xl font-bold mb-4">Découvrez nos types de chambres</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Nous proposons différentes catégories de chambres pour répondre à tous vos besoins, du confort
                    essentiel au luxe absolu.
                  </p>
                </div>

                <Tabs defaultValue="standard" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-100 p-1 rounded-lg">
                    <TabsTrigger
                      value="standard"
                      className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-md"
                    >
                      Chambre Standard
                    </TabsTrigger>
                    <TabsTrigger
                      value="deluxe"
                      className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-md"
                    >
                      Chambre De Luxe
                    </TabsTrigger>
                    <TabsTrigger
                      value="vip"
                      className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-md"
                    >
                      Chambre VIP
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="standard" className="border rounded-xl p-0 bg-white shadow-sm overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="relative h-[400px] md:h-auto">
                        <OptimizedImage
                          src="/standard-room-1.jpeg"
                          alt="Chambre Standard"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          fallbackSrc="/john-motel-service-home.jpeg"
                          onError={() => {
                            console.error("Failed to load standard room image")
                          }}
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                          <p className="text-sm font-medium flex items-center">
                            <span className="text-amber-500 mr-1">$</span>79 / nuit
                          </p>
                        </div>
                      </div>
                      <div className="p-8">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-2xl font-bold">Chambre Standard</h3>
                          <Badge className="bg-gray-200 text-gray-700 hover:bg-gray-300">Économique</Badge>
                        </div>
                        <div className="flex items-center mb-4">
                          {[1, 2, 3, 4].map((star) => (
                            <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                          ))}
                          <Star className="h-4 w-4 fill-amber-200 text-amber-200" />
                          <span className="ml-2 text-sm text-gray-600">4.0/5</span>
                        </div>
                        <p className="text-gray-700 mb-6">
                          Notre chambre Standard offre un excellent rapport qualité-prix avec tout le confort nécessaire
                          pour un séjour agréable. Idéale pour les voyageurs d&apos;affaires ou les courts séjours.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                          {roomFeatures.standard.map((feature, index) => (
                            <div key={index} className="flex items-center">
                              <div className="mr-3 text-primary">{feature.icon}</div>
                              <span className="text-gray-700">{feature.text}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button asChild className="bg-primary hover:bg-primary/90 flex-1">
                            <Link href="/chambres/standard">Voir les détails</Link>
                          </Button>
                          <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 flex-1">
                            Réserver maintenant
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="deluxe" className="border rounded-xl p-0 bg-white shadow-sm overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="relative h-[400px] md:h-auto">
                        <OptimizedImage
                          src="/deluxe-room-1.jpeg"
                          alt="Chambre De Luxe"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          fallbackSrc="/john-motel-service-home.jpeg"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                          <p className="text-sm font-medium flex items-center">
                            <span className="text-amber-500 mr-1">$</span>129 / nuit
                          </p>
                        </div>
                      </div>
                      <div className="p-8">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-2xl font-bold">Chambre De Luxe</h3>
                          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Confort</Badge>
                        </div>
                        <div className="flex items-center mb-4">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                          ))}
                          <span className="ml-2 text-sm text-gray-600">4.7/5</span>
                        </div>
                        <p className="text-gray-700 mb-6">
                          Notre chambre De Luxe offre un espace plus généreux et des équipements supplémentaires pour un
                          séjour encore plus confortable. Parfaite pour les couples ou les séjours prolongés.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                          {roomFeatures.deluxe.map((feature, index) => (
                            <div key={index} className="flex items-center">
                              <div className="mr-3 text-primary">{feature.icon}</div>
                              <span className="text-gray-700">{feature.text}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button asChild className="bg-primary hover:bg-primary/90 flex-1">
                            <Link href="/chambres/deluxe">Voir les détails</Link>
                          </Button>
                          <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 flex-1">
                            Réserver maintenant
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="vip" className="border rounded-xl p-0 bg-white shadow-sm overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="relative h-[400px] md:h-auto">
                        <OptimizedImage
                          src="/vip1.jpeg"
                          alt="Chambre VIP"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          fallbackSrc="/john-motel-service-home.jpeg"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                          <p className="text-sm font-medium flex items-center">
                            <span className="text-amber-500 mr-1">$</span>199 / nuit
                          </p>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-amber-500 text-white hover:bg-amber-600">Premium</Badge>
                        </div>
                      </div>
                      <div className="p-8">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-2xl font-bold">Chambre VIP</h3>
                          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">Luxe</Badge>
                        </div>
                        <div className="flex items-center mb-4">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                          ))}
                          <span className="ml-2 text-sm text-gray-600">4.9/5</span>
                        </div>
                        <p className="text-gray-700 mb-6">
                          Notre chambre VIP représente le summum du luxe et du confort. Avec son espace généreux et ses
                          équipements haut de gamme, elle est idéale pour les occasions spéciales ou pour ceux qui
                          recherchent une expérience exceptionnelle.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                          {roomFeatures.vip.map((feature, index) => (
                            <div key={index} className="flex items-center">
                              <div className="mr-3 text-primary">{feature.icon}</div>
                              <span className="text-gray-700">{feature.text}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button asChild className="bg-primary hover:bg-primary/90 flex-1">
                            <Link href="/chambres/vip">Voir les détails</Link>
                          </Button>
                          <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 flex-1">
                            Réserver maintenant
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </ScrollAnimation>
            </div>
          </section>

          {/* Enhanced CTA Section */}
          <section className="py-16 bg-primary rounded-xl shadow-lg mb-16 overflow-hidden relative">
            <div className="absolute inset-0 opacity-10">
              <OptimizedImage
                src="/motel-night.jpeg"
                alt="Motel at night"
                fill
                className="object-cover"
                fallbackSrc="/motel-day-1.jpeg"
              />
            </div>
            <div className="container mx-auto text-center relative z-10">
              <ScrollAnimation>
                <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30 px-3 py-1">Offre spéciale</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                  Prêt à vivre une expérience inoubliable?
                </h2>
                <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto">
                  Réservez directement sur notre site pour bénéficier des meilleurs tarifs et d&apos;avantages
                  exclusifs. Utilisez le code <span className="font-bold">WELCOME10</span> pour obtenir 10% de réduction
                  sur votre première réservation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                    <Link href="/chambres">Réserver maintenant</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
                    <Link href="/contact">Nous contacter</Link>
                  </Button>
                </div>
                <div className="mt-8 flex flex-wrap justify-center gap-6">
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-white mr-2" />
                    <span className="text-white">Annulation gratuite</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-white mr-2" />
                    <span className="text-white">Meilleur prix garanti</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-white mr-2" />
                    <span className="text-white">Service 24/7</span>
                  </div>
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
