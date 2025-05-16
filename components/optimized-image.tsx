"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"

interface OptimizedImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string
}

export default function OptimizedImage({ src, alt, fallbackSrc, className, ...props }: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && <div className={`absolute inset-0 bg-gray-200 animate-pulse ${className}`} aria-hidden="true" />}
      <Image
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        className={className}
        {...props}
        onError={() => {
          if (fallbackSrc) {
            setImgSrc(fallbackSrc)
          }
        }}
        onLoad={() => setIsLoading(false)}
      />
    </>
  )
}
