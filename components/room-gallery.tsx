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
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([])
  const thumbnailContainerRef = useRef<HTMLDivElement>(null)
  const mainImageRef = useRef<HTMLDivElement>(null)

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
    const img = new Image()
    img.src = images[nextIndex].src

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

  // S'assurer que l'image principale est toujours synchronisée avec la miniature active
  useEffect(() => {
    // Forcer le rendu de l'image principale lorsque currentIndex change
    if (mainImageRef.current) {
      const img = mainImageRef.current.querySelector("img")
      if (img) {
        img.src = images[currentIndex].src
      }
    }
  }, [currentIndex, images])

  return (
    <div className="space-y-4" tabIndex={0} onKeyDown={handleKeyDown}>
      <div ref={mainImageRef} className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden group">
        <OptimizedImage
          src={images[currentIndex].src || "/placeholder.svg"}
          alt={images[currentIndex].alt}
          fill
          className="object-cover cursor-pointer transition-opacity duration-300"
          priority
          onClick={() => setIsFullscreen(true)}
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white/80 rounded-full p-2 transform scale-0 group-hover:scale-100 transition-transform duration-300">
            <Maximize2 className="h-6 w-6 text-slate-800" />
          </div>
          <div className="absolute bottom-2 left-2 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
            Image {currentIndex + 1} / {images.length}
          </div>
        </div>
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
              <OptimizedImage
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500"
                sizes="(max-width: 768px) 25vw, 100px"
                priority={index < 4}
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
              src={images[currentIndex].src || "/placeholder.svg"}
              alt={images[currentIndex].alt}
              fill
              className="object-contain"
              priority
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
