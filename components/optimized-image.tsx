"use client"

import { useState, useEffect } from "react"
import Image, { type ImageProps } from "next/image"

interface OptimizedImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string
  quality?: number
}

export default function OptimizedImage({
  src,
  alt,
  fallbackSrc = "/placeholder.svg",
  className,
  quality = 85,
  sizes = "100vw",
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(typeof src === "string" ? src : fallbackSrc)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (typeof src === "string") {
      setImgSrc(src)
      setHasError(false)
    }
  }, [src])

  return (
    <div className="relative">
      {isLoading && <div className={`absolute inset-0 bg-gray-200 animate-pulse ${className}`} aria-hidden="true" />}
      {hasError ? (
        <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
          <span className="text-sm text-gray-500">Image unavailable</span>
        </div>
      ) : (
        <Image
          src={imgSrc || "/placeholder.svg"}
          alt={alt}
          className={className}
          quality={quality}
          sizes={sizes}
          {...props}
          onError={() => {
            if (imgSrc !== fallbackSrc) {
              setImgSrc(fallbackSrc)
            } else {
              setHasError(true)
            }
          }}
          onLoad={() => setIsLoading(false)}
        />
      )}
    </div>
  )
}
