"use client"

import { useState, useEffect } from "react"
import Image, { type ImageProps } from "next/image"

interface OptimizedImageProps extends Omit<ImageProps, "onError" | "onLoad"> {
  fallbackSrc?: string
  quality?: number
  onLoad?: () => void
  onError?: () => void
}

export default function OptimizedImage({
  src,
  alt,
  fallbackSrc = "/placeholder.svg",
  className,
  quality = 85,
  sizes = "100vw",
  onLoad,
  onError,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(typeof src === "string" ? src : fallbackSrc)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (typeof src === "string") {
      console.log(`Loading image: ${src}`)
      setImgSrc(src)
      setHasError(false)
      setIsLoading(true)
    }
  }, [src])

  const handleError = () => {
    console.error(`Erreur de chargement d'image: ${imgSrc}`)

    // Try multiple fallback strategies
    if (imgSrc !== fallbackSrc && fallbackSrc !== "/placeholder.svg") {
      console.log(`Trying fallback image: ${fallbackSrc}`)
      setImgSrc(fallbackSrc)
    } else if (!imgSrc.includes("placeholder.svg")) {
      console.log("Using placeholder as final fallback")
      setImgSrc("/placeholder.svg?height=400&width=600&text=Image+non+disponible")
    } else {
      setHasError(true)
    }

    setIsLoading(false)
    if (onError) onError()
  }

  const handleLoad = () => {
    setIsLoading(false)
    if (onLoad) onLoad()
  }

  // Fonction pour déterminer si l'URL est valide
  const isValidUrl = (url: string) => {
    if (!url) return false
    // Check for relative paths, absolute URLs, or data URLs
    return url.startsWith("/") || url.startsWith("http") || url.startsWith("data:")
  }

  // Si l'URL n'est pas valide, utiliser le fallback
  const finalSrc = isValidUrl(imgSrc) ? imgSrc : fallbackSrc

  return (
    <div className="relative">
      {isLoading && <div className={`absolute inset-0 bg-gray-200 animate-pulse ${className}`} aria-hidden="true" />}
      {hasError ? (
        <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
          <span className="text-sm text-gray-500">Image non disponible</span>
        </div>
      ) : (
        <Image
          src={finalSrc || "/placeholder.svg"}
          alt={alt}
          className={className}
          quality={quality}
          sizes={sizes}
          {...props}
          onError={handleError}
          onLoad={handleLoad}
        />
      )}
    </div>
  )
}
