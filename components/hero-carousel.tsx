"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

type HeroImage = {
  src: string
  alt: string
  isNight: boolean
}

export default function HeroCarousel() {
  const heroImages: HeroImage[] = [
    { src: "/motel-day-1.jpeg", alt: "John Services Motel - Vue extérieure", isNight: false },
    { src: "/motel-night.jpeg", alt: "John Services Motel - Vue nocturne", isNight: true },
    { src: "/motel-day-2.jpeg", alt: "John Services Motel - Vue de la rue", isNight: false },
    { src: "/motel-sign-night.jpeg", alt: "John Services Motel - Enseigne illuminée", isNight: true },
    { src: "/motel-day-3.jpeg", alt: "John Services Motel - Vue générale", isNight: false },
  ]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 7000)

    return () => clearInterval(interval)
  }, [heroImages.length, isPaused])

  const currentImage = heroImages[currentImageIndex]

  return (
    <div
      ref={carouselRef}
      className="relative h-full w-full overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {heroImages.map((image, index) => (
        <div
          key={image.src}
          className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
            index === currentImageIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
          } group-hover:scale-110 transform transition-transform duration-3000`}
        >
          <Image
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            fill
            className="object-cover brightness-[0.65]"
            priority={index === 0}
            sizes="100vw" // This tells Next.js how to optimize the image based on viewport
            quality={85} // Adjust quality (default is 75)
          />
          {image.isNight && (
            <div className="absolute top-6 right-6 z-10">
              <Badge className="bg-slate-900/80 text-white px-4 py-2 text-sm backdrop-blur-sm border border-white/20">
                John Services Motel By Night
              </Badge>
            </div>
          )}
        </div>
      ))}
      {isPaused && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
          Carrousel en pause
        </div>
      )}
    </div>
  )
}
