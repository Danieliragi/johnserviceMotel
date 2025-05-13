"use client"

import { useEffect } from "react"

interface FontLoaderProps {
  fontFamily: string
  fontWeight?: string | number
  fontStyle?: string
  fontDisplay?: "auto" | "block" | "swap" | "fallback" | "optional"
  preload?: boolean
}

export default function FontLoader({
  fontFamily,
  fontWeight = "normal",
  fontStyle = "normal",
  fontDisplay = "swap",
  preload = true,
}: FontLoaderProps) {
  useEffect(() => {
    // Create a font-face CSS rule
    const fontFace = `
      @font-face {
        font-family: '${fontFamily}';
        font-weight: ${fontWeight};
        font-style: ${fontStyle};
        font-display: ${fontDisplay};
        src: local('${fontFamily}');
      }
    `

    // Create a style element and append the font-face rule
    const style = document.createElement("style")
    style.appendChild(document.createTextNode(fontFace))
    document.head.appendChild(style)

    // Preload the font if specified
    if (preload) {
      const link = document.createElement("link")
      link.rel = "preload"
      link.as = "font"
      link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(
        / /g,
        "+",
      )}:wght@${fontWeight}&display=${fontDisplay}`
      link.crossOrigin = "anonymous"
      document.head.appendChild(link)
    }

    return () => {
      document.head.removeChild(style)
      if (preload) {
        const link = document.querySelector(`link[href*="${fontFamily.replace(/ /g, "+")}"]`)
        if (link) document.head.removeChild(link)
      }
    }
  }, [fontFamily, fontWeight, fontStyle, fontDisplay, preload])

  return null
}
