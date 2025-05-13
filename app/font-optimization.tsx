"use client"

import { useEffect } from "react"

export default function FontOptimization() {
  useEffect(() => {
    // Fonction pour charger les polices de manière optimisée
    const loadFonts = () => {
      // Créer un lien pour précharger la police principale
      const fontPreloadLink = document.createElement("link")
      fontPreloadLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      fontPreloadLink.rel = "preload"
      fontPreloadLink.as = "style"
      document.head.appendChild(fontPreloadLink)

      // Charger la police après le chargement de la page
      setTimeout(() => {
        const fontLink = document.createElement("link")
        fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        fontLink.rel = "stylesheet"
        document.head.appendChild(fontLink)
      }, 500)
    }

    // Charger les polices de manière optimisée
    if (document.readyState === "complete") {
      loadFonts()
    } else {
      window.addEventListener("load", loadFonts)
      return () => window.removeEventListener("load", loadFonts)
    }
  }, [])

  return null
}
