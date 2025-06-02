"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "FR" | "EN"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  FR: {
    // Navigation
    "nav.about": "À propos",
    "nav.documentation": "Documentation",
    "nav.gallery": "Galerie",
    "nav.pricing": "Tarifs",
    "nav.services": "Services",
    "nav.accommodation": "Hébergement",
    "nav.standardRoom": "Chambre Standard",
    "nav.deluxeRoom": "Chambre De Luxe",
    "nav.vipRoom": "Chambre VIP",
    "nav.restaurant": "Salle & Restaurant",
    "nav.contact": "Contact",
    "nav.address": "Adresse",
    "nav.location": "Localisation",

    // Authentication
    "auth.myAccount": "Mon compte",
    "auth.myProfile": "Mon profil",
    "auth.administration": "Administration",
    "auth.signOut": "Se déconnecter",
    "auth.signIn": "Se connecter",
    "auth.login": "Login",

    // Common
    "common.reserve": "Réserver",
    "common.reserveNow": "Réserver maintenant",
  },
  EN: {
    // Navigation
    "nav.about": "About",
    "nav.documentation": "Documentation",
    "nav.gallery": "Gallery",
    "nav.pricing": "Pricing",
    "nav.services": "Services",
    "nav.accommodation": "Accommodation",
    "nav.standardRoom": "Standard Room",
    "nav.deluxeRoom": "Deluxe Room",
    "nav.vipRoom": "VIP Room",
    "nav.restaurant": "Hall & Restaurant",
    "nav.contact": "Contact",
    "nav.address": "Address",
    "nav.location": "Location",

    // Authentication
    "auth.myAccount": "My Account",
    "auth.myProfile": "My Profile",
    "auth.administration": "Administration",
    "auth.signOut": "Sign Out",
    "auth.signIn": "Sign In",
    "auth.login": "Login",

    // Common
    "common.reserve": "Reserve",
    "common.reserveNow": "Reserve Now",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("FR")

  useEffect(() => {
    // Load language from localStorage on mount
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "FR" || savedLanguage === "EN")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
