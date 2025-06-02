"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function RestaurantHeroCarousel() {
  const restaurantImages = [
    { src: "/motel-restaurant.jpeg", alt: "Restaurant principal - Vue d'ensemble" },
    { src: "/motel-restaurant-2.jpeg", alt: "Restaurant - Salle à manger élégante" },
    { src: "/motel-reception.jpeg", alt: "Réception et espace d'accueil" },
  ]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % restaurantImages.length)
    }, 7000)

    return () => clearInterval(interval)
  }, [restaurantImages.length, isPaused])

  return (
    <div
      className="absolute inset-0 group cursor-pointer"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {restaurantImages.map((image, index) => (
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
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
            quality={85}
          />
        </div>
      ))}

      {/* Carousel indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {restaurantImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? "bg-white scale-110" : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Aller à l'image ${index + 1}`}
          />
        ))}
      </div>

      {isPaused && (
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm z-30">
          Carrousel en pause
        </div>
      )}
    </div>
  )
}
