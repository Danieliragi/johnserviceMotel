"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface RoomAvailabilityProps {
  roomId: string
  onDateChange?: (dateRange: { from: Date; to: Date } | undefined) => void
}

interface UnavailablePeriod {
  dateArrivee: string
  dateDepart: string
}

export default function RoomAvailability({ roomId, onDateChange }: RoomAvailabilityProps) {
  const [date, setDate] = useState<{ from: Date; to: Date } | undefined>()
  const [unavailableDates, setUnavailableDates] = useState<UnavailablePeriod[]>([])
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Charger les dates indisponibles au chargement du composant
  useEffect(() => {
    async function fetchUnavailableDates() {
      try {
        const response = await fetch(`/api/chambres/disponibilite?chambreId=${roomId}`)
        const data = await response.json()

        if (data.datesIndisponibles) {
          setUnavailableDates(data.datesIndisponibles)
        }
      } catch (error) {
        console.error("Erreur lors du chargement des dates indisponibles:", error)
      }
    }

    fetchUnavailableDates()
  }, [roomId])

  // Vérifier la disponibilité lorsque les dates changent
  useEffect(() => {
    if (date?.from && date?.to) {
      checkAvailability(date.from, date.to)

      if (onDateChange) {
        onDateChange(date)
      }
    } else {
      setIsAvailable(null)
    }
  }, [date, roomId, onDateChange])

  // Fonction pour vérifier la disponibilité
  async function checkAvailability(from: Date, to: Date) {
    setIsLoading(true)

    try {
      const response = await fetch(
        `/api/chambres/disponibilite?chambreId=${roomId}&dateArrivee=${from.toISOString()}&dateDepart=${to.toISOString()}`,
      )
      const data = await response.json()

      setIsAvailable(data.disponible)
    } catch (error) {
      console.error("Erreur lors de la vérification de disponibilité:", error)
      setIsAvailable(null)
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour déterminer si une date est indisponible
  function isDateUnavailable(date: Date) {
    return unavailableDates.some((period) => {
      const start = new Date(period.dateArrivee)
      const end = new Date(period.dateDepart)
      return date >= start && date <= end
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Disponibilité</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="range"
          selected={date}
          onSelect={setDate}
          disabled={isDateUnavailable}
          className="rounded-md border"
        />

        {isLoading && (
          <div className="mt-4 flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
            <span className="ml-2">Vérification...</span>
          </div>
        )}

        {!isLoading && isAvailable === true && (
          <Alert className="mt-4 bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Disponible</AlertTitle>
            <AlertDescription className="text-green-700">
              Cette chambre est disponible pour les dates sélectionnées.
            </AlertDescription>
          </Alert>
        )}

        {!isLoading && isAvailable === false && (
          <Alert className="mt-4 bg-red-50 border-red-200">
            <XCircle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">Indisponible</AlertTitle>
            <AlertDescription className="text-red-700">
              Cette chambre n'est pas disponible pour les dates sélectionnées.
            </AlertDescription>
          </Alert>
        )}

        {!isLoading && date?.from && date?.to && isAvailable === null && (
          <Alert className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>Impossible de vérifier la disponibilité. Veuillez réessayer.</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
