"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useAuth } from "@/contexts/auth-context"

export function AdminGreeting() {
  const { user } = useAuth()
  const [greeting, setGreeting] = useState("")
  const [currentDate, setCurrentDate] = useState("")

  useEffect(() => {
    // Définir le message de salutation en fonction de l'heure
    const hour = new Date().getHours()
    let greetingMessage = ""

    if (hour >= 5 && hour < 12) {
      greetingMessage = "Bonjour"
    } else if (hour >= 12 && hour < 18) {
      greetingMessage = "Bon après-midi"
    } else {
      greetingMessage = "Bonsoir"
    }

    setGreeting(greetingMessage)

    // Formater la date actuelle
    setCurrentDate(
      format(new Date(), "EEEE d MMMM yyyy", { locale: fr }).replace(/^\w/, (c) => c.toUpperCase()), // Première lettre en majuscule
    )
  }, [])

  const displayName = user?.email
    ? user.email
        .split("@")[0]
        .replace(/\./g, " ")
        .replace(/^(.)(.*)$/, (_, first, rest) => first.toUpperCase() + rest)
    : "Administrateur"

  return (
    <div className="space-y-1">
      <h2 className="text-3xl font-bold tracking-tight">
        {greeting}, {displayName} 👋
      </h2>
      <p className="text-muted-foreground">{currentDate} — Voici un aperçu de votre tableau de bord</p>
    </div>
  )
}
