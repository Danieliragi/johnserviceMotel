"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import OptimizedImage from "@/components/optimized-image"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface RoomImage {
  src: string
  alt: string
}

interface RoomGalleryProps {
  images: RoomImage[]
}

export default function RoomGallery({ images }: RoomGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [loadedImages, setLoadedImages] = useState<boolean[]>([])
  const [imageErrors, setImageErrors] = useState<boolean[]>([])
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([])
  const thumbnailContainerRef = useRef<HTMLDivElement>(null)
  const mainImageRef = useRef<HTMLDivElement>(null)

  // Initialiser les états de chargement des images
  useEffect(() => {
    setLoadedImages(new Array(images.length).fill(false))
    setImageErrors(new Array(images.length).fill(false))
  }, [images.length])

  // Fonction pour marquer une image comme chargée
  const handleImageLoaded = (index: number) => {
    setLoadedImages((prev) => {
      const newState = [...prev]
      newState[index] = true
      return newState
    })
  }

  // Fonction pour marquer une image comme en erreur
  const handleImageError = (index: number) => {
    console.error(`Erreur de chargement pour l'image ${index}:`, images[index]?.src)
    // Afficher plus d'informations sur l'image en erreur
    if (images[index]) {
      console.log(`Détails de l'image en erreur:`, {
        src: images[index].src,
        alt: images[index].alt,
        exists: !!images[index].src,
        isRelative: images[index].src?.startsWith("/"),
        isAbsolute: images[index].src?.startsWith("http"),
      })
    }

    setImageErrors((prev) => {
      const newState = [...prev]
      newState[index] = true
      return newState
    })
  }

  // Fonction pour faire défiler vers la miniature active
  const scrollToActiveThumbnail = (index: number) => {
    if (thumbnailRefs.current[index] && thumbnailContainerRef.current) {
      const container = thumbnailContainerRef.current
      const thumbnail = thumbnailRefs.current[index]

      // Calculer la position de défilement pour centrer la miniature
      const containerWidth = container.offsetWidth
      const thumbnailLeft = thumbnail.offsetLeft
      const thumbnailWidth = thumbnail.offsetWidth

      const scrollPosition = thumbnailLeft - containerWidth / 2 + thumbnailWidth / 2

      // Faire défiler avec une animation fluide
      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      })
    }
  }

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
    // Faire défiler vers la miniature active après le changement d'index
    setTimeout(() => scrollToActiveThumbnail(newIndex), 50)
  }

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1
    const newIndex = isLastImage ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
    // Faire défiler vers la miniature active après le changement d'index
    setTimeout(() => scrollToActiveThumbnail(newIndex), 50)
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
    // Préchargement de l'image suivante pour une transition plus fluide
    const nextIndex = (index + 1) % images.length
    if (images[nextIndex]?.src) {
      const img = new Image()
      img.src = images[nextIndex].src
    }

    // Ajouter un effet de transition sur l'image principale
    if (mainImageRef.current) {
      mainImageRef.current.classList.add("image-transition")
      setTimeout(() => {
        if (mainImageRef.current) {
          mainImageRef.current.classList.remove("image-transition")
        }
      }, 500)
    }
  }

  // Nouvelle fonction pour ouvrir l'image en plein écran
  const openImageFullscreen = (index: number) => {
    setCurrentIndex(index)
    setIsFullscreen(true)
  }

  // Ajouter cette fonction après goToImage
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      goToPrevious()
    } else if (e.key === "ArrowRight") {
      goToNext()
    }
  }

  // Faire défiler vers la miniature active au chargement et lorsque currentIndex change
  useEffect(() => {
    scrollToActiveThumbnail(currentIndex)
  }, [currentIndex])

  // Fonction pour obtenir l'URL de l'image avec fallback
  const getImageSrc = (index: number) => {
    // Vérifier si l'image existe et si son URL est valide
    if (!images[index] || !images[index].src || imageErrors[index]) {
      console.log(`Image à l'index ${index} non disponible ou en erreur:`, images[index]?.src)

      // Utiliser une image de fallback différente selon le type de chambre
      const pathname = typeof window !== "undefined" ? window.location.pathname : ""
      const isStandard = pathname.includes("standard")
      const isDeluxe = pathname.includes("deluxe")
      const isVIP = pathname.includes("vip")

      if (isStandard) return "/standard-room-1.jpeg"
      if (isDeluxe) return "/deluxe-room-1.jpeg"
      if (isVIP) return "/vip1.jpeg"

      return "/simple-motel-room.png"
    }

    // Vérifier si l'URL est relative ou absolue
    const src = images[index].src
    if (!src.startsWith("/") && !src.startsWith("http")) {
      console.log(`URL d'image invalide à l'index ${index}:`, src)
      return `/standard-room-1.jpeg` // Fallback par défaut
    }

    return src
  }

  // Fonction pour obtenir le texte alternatif de l'image
  const getImageAlt = (index: number) => {
    if (!images[index] || !images[index].alt) {
      return "Image de chambre d'hôtel"
    }
    return images[index].alt
  }

  return (
    <div className="space-y-4" tabIndex={0} onKeyDown={handleKeyDown}>
      <div ref={mainImageRef} className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden group">
        {/* Indicateur de chargement */}
        {!loadedImages[currentIndex] && !imageErrors[currentIndex] && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="text-gray-400">Chargement de l'image...</div>
          </div>
        )}

        <OptimizedImage
          src={getImageSrc(currentIndex)}
          alt={getImageAlt(currentIndex)}
          fill
          className="object-cover cursor-pointer transition-opacity duration-300"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={90}
          onClick={() => setIsFullscreen(true)}
          onLoad={() => handleImageLoaded(currentIndex)}
          onError={() => handleImageError(currentIndex)}
        />

        <div
          className={`absolute inset-0 bg-black/30 transition-opacity duration-300 flex items-center justify-center ${
            loadedImages[currentIndex] && !imageErrors[currentIndex] ? "opacity-0 group-hover:opacity-100" : "hidden"
          }`}
        >
          <div className="bg-white/90 rounded-full p-2 transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Maximize2 className="h-6 w-6 text-slate-800" />
          </div>
          <div className="absolute bottom-2 left-2 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
            Image {currentIndex + 1} / {images.length}
          </div>
        </div>

        {imageErrors[currentIndex] && (
          <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center text-gray-500">
            <div className="text-center p-4">
              <p className="mb-2">Impossible de charger l'image</p>
              <p className="text-sm">Vérifiez que le fichier existe dans le dossier public</p>
              <p className="text-xs mt-1 text-gray-400">{images[currentIndex]?.src || "URL non disponible"}</p>
            </div>
          </div>
        )}

        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-lg opacity-70 hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
          aria-label="Image précédente"
        >
          <ChevronLeft className="h-6 w-6 text-slate-800" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-lg opacity-70 hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
          aria-label="Image suivante"
        >
          <ChevronRight className="h-6 w-6 text-slate-800" />
        </button>
      </div>

      <div ref={thumbnailContainerRef} className="overflow-x-auto pb-2 hide-scrollbar">
        <div className="flex gap-2 min-w-max">
          {images.map((image, index) => (
            <button
              key={index}
              ref={(el) => (thumbnailRefs.current[index] = el)}
              onClick={() => {
                goToImage(index)
                scrollToActiveThumbnail(index)
              }}
              className={`relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden transition-all duration-300 ${
                index === currentIndex
                  ? "ring-2 ring-slate-800 opacity-100 scale-105"
                  : "opacity-70 hover:opacity-100 hover:scale-105"
              }`}
              aria-label={`Voir image ${index + 1}`}
            >
              {/* Indicateur de chargement pour les miniatures */}
              {!loadedImages[index] && !imageErrors[index] && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
              )}

              <OptimizedImage
                src={getImageSrc(index)}
                alt={getImageAlt(index)}
                fill
                className="object-cover transition-transform duration-500"
                sizes="(max-width: 768px) 25vw, 100px"
                priority={index < 4}
                quality={80}
                onLoad={() => handleImageLoaded(index)}
                onError={() => handleImageError(index)}
              />

              <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Maximize2
                  className="h-4 w-4 text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    openImageFullscreen(index)
                  }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Gallery Dialog */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent
          className="max-w-5xl p-0 bg-black/95 border-none"
          onKeyDown={handleKeyDown}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-[80vh]">
            <OptimizedImage
              src={getImageSrc(currentIndex)}
              alt={getImageAlt(currentIndex)}
              fill
              className="object-contain"
              priority
              onLoad={() => handleImageLoaded(currentIndex)}
              onError={() => handleImageError(currentIndex)}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-white hover:bg-white/20"
              onClick={() => setIsFullscreen(false)}
            >
              <Maximize2 className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    goToImage(index)
                  }}
                  className={`w-2 h-2 rounded-full ${
                    index === currentIndex ? "bg-white" : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Aller à l'image ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
