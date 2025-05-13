"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface GalleryImage {
  src: string
  alt: string
  blurDataUrl?: string
}

interface OptimizedGalleryProps {
  images: GalleryImage[]
  className?: string
}

export default function OptimizedGallery({ images, className = "" }: OptimizedGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [loadedImages, setLoadedImages] = useState<number[]>([0]) // Précharger la première image
  const [visibleThumbnails, setVisibleThumbnails] = useState<number[]>([0, 1, 2, 3])

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
    preloadImage(newIndex)
  }

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1
    const newIndex = isLastImage ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
    preloadImage(newIndex)
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
    preloadImage(index)
  }

  const preloadImage = (index: number) => {
    if (!loadedImages.includes(index)) {
      setLoadedImages([...loadedImages, index])

      // Précharger aussi l'image suivante
      const nextIndex = index === images.length - 1 ? 0 : index + 1
      if (!loadedImages.includes(nextIndex)) {
        setLoadedImages((prev) => [...prev, nextIndex])
      }
    }
  }

  // Observer pour le lazy loading des miniatures
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            if (!loadedImages.includes(index)) {
              setLoadedImages((prev) => [...prev, index])
            }
          }
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll("[data-index]").forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [loadedImages])

  // Précharger les images visibles dans la galerie
  useEffect(() => {
    const newVisibleThumbnails = []
    for (let i = 0; i < 4 && i < images.length; i++) {
      newVisibleThumbnails.push(i)
      if (!loadedImages.includes(i)) {
        setLoadedImages((prev) => [...prev, i])
      }
    }
    setVisibleThumbnails(newVisibleThumbnails)
  }, [images.length])

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden group">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-300 ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {(loadedImages.includes(index) || index === currentIndex) && (
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
                placeholder={image.blurDataUrl ? "blur" : "empty"}
                blurDataURL={image.blurDataUrl}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
          </div>
        ))}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
          aria-label="Image précédente"
        >
          <ChevronLeft className="h-6 w-6 text-slate-800" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
          aria-label="Image suivante"
        >
          <ChevronRight className="h-6 w-6 text-slate-800" />
        </button>
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute right-2 top-2 bg-white/80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
          aria-label="Voir en plein écran"
        >
          <Maximize2 className="h-5 w-5 text-slate-800" />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            data-index={index}
            onClick={() => goToImage(index)}
            className={`relative h-20 rounded-md overflow-hidden ${
              index === currentIndex ? "ring-2 ring-slate-800" : "opacity-70 hover:opacity-100"
            }`}
            aria-label={`Voir image ${index + 1}`}
          >
            {(loadedImages.includes(index) || visibleThumbnails.includes(index)) && (
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 10vw"
                loading="lazy"
              />
            )}
          </button>
        ))}
      </div>

      {/* Fullscreen Gallery Dialog */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-5xl p-0 bg-black/95 border-none">
          <div className="relative h-[80vh]">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-300 ${
                  index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                {(loadedImages.includes(index) || index === currentIndex) && (
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                )}
              </div>
            ))}
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
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
              onClick={goToNext}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
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
