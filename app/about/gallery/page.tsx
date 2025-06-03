"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ScrollAnimation from "@/components/scroll-animation"

interface GalleryImage {
  src: string
  alt: string
  category: string
}

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const galleryImages: GalleryImage[] = [
    // Chambres Standard
    { src: "/standard-room-1.jpeg", alt: "Chambre Standard - Vue d'ensemble", category: "standard" },
    { src: "/standard-room-2.jpeg", alt: "Chambre Standard - Lit confortable", category: "standard" },
    { src: "/standard-room-4.jpeg", alt: "Chambre Standard - Salle de bain", category: "standard" },

    // Chambres Deluxe
    { src: "/deluxe-room-1.jpeg", alt: "Chambre Deluxe - Suite spacieuse", category: "deluxe" },
    { src: "/deluxe-room-2.jpeg", alt: "Chambre Deluxe - Salon privé", category: "deluxe" },

    // Chambres VIP
    { src: "/vip1.jpeg", alt: "Suite VIP - Luxe et confort", category: "vip" },
    { src: "/vip2.jpeg", alt: "Suite VIP - Salon exécutif", category: "vip" },
    { src: "/vip4.jpeg", alt: "Suite VIP - Salle de bain spa", category: "vip" },
    { src: "/vip5.jpeg", alt: "Suite VIP - Espace détente", category: "vip" },

    // Extérieur et Bâtiment
    { src: "/motel-night.jpeg", alt: "Motel de nuit - Ambiance nocturne", category: "exterior" },
    { src: "/motel-day-1.jpeg", alt: "Motel de jour - Vue d'ensemble", category: "exterior" },
    { src: "/motel-sign-night.jpeg", alt: "Enseigne illuminée", category: "exterior" },

    // Services et Espaces Communs
    { src: "/motel-reception.jpeg", alt: "Réception - Accueil chaleureux", category: "services" },
    { src: "/motel-restaurant.jpeg", alt: "Restaurant - Salle à manger", category: "services" },
    { src: "/motel-bar.jpeg", alt: "Bar - Ambiance conviviale", category: "services" },
  ]

  const categories = [
    { id: "all", label: "Toutes les photos", count: galleryImages.length },
    {
      id: "standard",
      label: "Chambres Standard",
      count: galleryImages.filter((img) => img.category === "standard").length,
    },
    { id: "deluxe", label: "Chambres Deluxe", count: galleryImages.filter((img) => img.category === "deluxe").length },
    { id: "vip", label: "Suites VIP", count: galleryImages.filter((img) => img.category === "vip").length },
    { id: "exterior", label: "Extérieur", count: galleryImages.filter((img) => img.category === "exterior").length },
    { id: "services", label: "Services", count: galleryImages.filter((img) => img.category === "services").length },
  ]

  const filteredImages =
    selectedCategory === "all" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1)
    }
  }

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === filteredImages.length - 1 ? 0 : selectedImage + 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Hero Section */}
      <section className="relative h-[40vh] bg-gradient-to-r from-primary-950 to-primary-800 flex items-center justify-center">
        <div className="absolute inset-0 bg-primary-950/20"></div>
        <div className="relative z-10 text-center text-white px-4">
          <ScrollAnimation direction="up">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Galerie Photos</h1>
            <p className="text-xl md:text-2xl text-green-200 max-w-2xl mx-auto">
              Découvrez nos espaces et installations à travers notre collection de photos
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimation direction="up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-950 mb-4">Explorez John Services Motel</h2>
              <p className="text-lg text-primary-700 max-w-3xl mx-auto">
                Parcourez notre galerie pour découvrir nos chambres confortables, nos espaces communs et l'ambiance
                unique de notre établissement.
              </p>
            </div>
          </ScrollAnimation>

          {/* Category Filters */}
          <ScrollAnimation direction="up" delay={0.2}>
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 bg-white shadow-lg border border-primary-200 rounded-xl p-2">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex flex-col items-center gap-1 py-3 px-2 data-[state=active]:bg-primary-950 data-[state=active]:text-white rounded-lg transition-all"
                  >
                    <span className="font-medium text-sm">{category.label}</span>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </ScrollAnimation>

          {/* Image Grid */}
          <ScrollAnimation direction="up" delay={0.4}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image, index) => (
                <div
                  key={`${image.src}-${index}`}
                  className="group relative aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </ScrollAnimation>

          {/* Empty State */}
          {filteredImages.length === 0 && (
            <div className="text-center py-16">
              <p className="text-primary-500 text-lg">Aucune image trouvée pour cette catégorie.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <Dialog open={selectedImage !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-primary-950/95 border-none">
          {selectedImage !== null && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 rounded-full"
                onClick={closeLightbox}
              >
                <X className="h-6 w-6" />
              </Button>

              {/* Navigation Buttons */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 text-white hover:bg-white/20 rounded-full"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 text-white hover:bg-white/20 rounded-full"
                onClick={goToNext}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>

              {/* Main Image */}
              <div className="relative w-full h-full">
                <Image
                  src={filteredImages[selectedImage].src || "/placeholder.svg"}
                  alt={filteredImages[selectedImage].alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Image Info */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-primary-950/60 backdrop-blur-sm rounded-lg px-6 py-3 text-center">
                <p className="text-white font-medium mb-1">{filteredImages[selectedImage].alt}</p>
                <p className="text-green-300 text-sm">
                  {selectedImage + 1} / {filteredImages.length}
                </p>
              </div>

              {/* Thumbnail Navigation */}
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-md overflow-x-auto">
                {filteredImages.map((image, index) => (
                  <button
                    key={`thumb-${index}`}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 ${
                      index === selectedImage ? "ring-2 ring-white" : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
