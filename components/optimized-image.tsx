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
      setImgSrc(src)
      setHasError(false)
      setIsLoading(true)
    }
  }, [src])

  const handleError = () => {
    console.error(`Erreur de chargement d'image: ${imgSrc}`)
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc)
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
    // Vérifier si l'URL est relative ou absolue
    return url.startsWith("/") || url.startsWith("http")
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
