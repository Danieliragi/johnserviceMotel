"use client"

import { useState, useEffect, useRef } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin, Navigation } from "lucide-react"
import Script from "next/script"

interface LeafletMapProps {
  address?: string
  detailedAddress?: string
  latitude?: number
  longitude?: number
  zoom?: number
  height?: string
  width?: string
  className?: string
}

export default function LeafletMap({
  address = "John Services Motel",
  detailedAddress = "Quartier: Le volcan, AV. Le messager, N° 13B, Goma, RDC",
  latitude = -1.6777,
  longitude = 29.2285,
  zoom = 15,
  height = "400px",
  width = "100%",
  className = "",
}: LeafletMapProps) {
  const [mapLoaded, setMapLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [leafletLoaded, setLeafletLoaded] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const mapId = `map-${Math.random().toString(36).substring(2, 9)}`

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (mapRef.current) {
      observer.observe(mapRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Initialiser la carte seulement si toutes les conditions sont remplies
    if (isVisible && leafletLoaded && !mapInstanceRef.current && window.L) {
      // Attendre que le DOM soit prêt
      const initializeMap = () => {
        const mapElement = document.getElementById(mapId)
        if (!mapElement) {
          // Si l'élément n'existe pas encore, réessayer après un court délai
          setTimeout(initializeMap, 100)
          return
        }

        try {
          // Vérifier si la carte n'est pas déjà initialisée
          if (mapInstanceRef.current) {
            return
          }

          // Correction pour les icônes Leaflet
          if (window.L.Icon && window.L.Icon.Default) {
            delete window.L.Icon.Default.prototype._getIconUrl
            window.L.Icon.Default.mergeOptions({
              iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
              iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
              shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
            })
          }

          // Créer la carte
          const map = window.L.map(mapId, {
            center: [latitude, longitude],
            zoom: zoom,
            zoomControl: true,
            scrollWheelZoom: true,
            doubleClickZoom: true,
            boxZoom: true,
            keyboard: true,
            dragging: true,
            touchZoom: true,
          })

          // Ajouter la couche OpenStreetMap
          window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
            minZoom: 1,
          }).addTo(map)

          // Créer un contenu HTML personnalisé pour le popup
          const popupContent = `
          <div style="padding: 10px; max-width: 250px; font-family: system-ui, sans-serif;">
            <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">${address}</h3>
            <p style="margin: 0 0 8px 0; font-size: 14px; color: #555;">${detailedAddress}</p>
            <p style="margin: 0; font-size: 12px; color: #777;">Coordonnées: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}</p>
          </div>
        `

          // Ajouter un marqueur avec un popup amélioré
          const marker = window.L.marker([latitude, longitude]).addTo(map).bindPopup(popupContent, {
            maxWidth: 300,
            minWidth: 200,
            autoClose: false,
            closeOnClick: false,
          })

          // Ouvrir le popup par défaut
          marker.openPopup()

          // Stocker l'instance de la carte
          mapInstanceRef.current = map

          // Indiquer que la carte est chargée
          setMapLoaded(true)

          // Forcer un redimensionnement après un court délai pour s'assurer que la carte s'affiche correctement
          setTimeout(() => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.invalidateSize()
            }
          }, 100)
        } catch (error) {
          console.error("Erreur lors de l'initialisation de la carte Leaflet:", error)
          // En cas d'erreur, réinitialiser les états
          setMapLoaded(false)
          mapInstanceRef.current = null
        }
      }

      // Démarrer l'initialisation
      initializeMap()
    }

    // Nettoyer la carte lors du démontage du composant
    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove()
        } catch (error) {
          console.warn("Erreur lors de la suppression de la carte:", error)
        } finally {
          mapInstanceRef.current = null
          setMapLoaded(false)
        }
      }
    }
  }, [isVisible, leafletLoaded, latitude, longitude, zoom, address, detailedAddress, mapId])

  // Fonction appelée lorsque le script Leaflet est chargé
  const handleLeafletLoad = () => {
    setLeafletLoaded(true)
  }

  return (
    <div ref={mapRef} className={`relative overflow-hidden rounded-lg ${className}`} style={{ height, width }}>
      {!mapLoaded && (
        <div className="absolute inset-0 z-10">
          <Skeleton className="h-full w-full" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <MapPin className="h-12 w-12 text-slate-400 mb-4" />
            <h3 className="text-lg font-bold mb-2 text-slate-600">{address}</h3>
            <p className="text-sm text-gray-500 mb-4">Chargement de la carte...</p>
          </div>
        </div>
      )}

      {isVisible && (
        <>
          <div
            id={mapId}
            style={{
              height: "100%",
              width: "100%",
              position: "relative",
              zIndex: 1,
            }}
            className="leaflet-container"
          />
          <Script
            src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
            integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
            crossOrigin="anonymous"
            onLoad={handleLeafletLoad}
            strategy="lazyOnload"
          />
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
            integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
            crossOrigin="anonymous"
          />
        </>
      )}

      {/* Panneau d'information flottant */}
      <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-72 bg-white p-4 rounded-lg shadow-md z-20 border border-gray-200">
        <div className="flex items-start">
          <MapPin className="h-5 w-5 text-red-500 mt-1 mr-2 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-base">{address}</h3>
            <p className="text-sm text-gray-600 mt-1">{detailedAddress}</p>
            <div className="flex items-center mt-3 text-xs text-blue-600">
              <Navigation className="h-4 w-4 mr-1" />
              <a
                href={`https://www.openstreetmap.org/directions?from=&to=${latitude}%2C${longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Obtenir l'itinéraire
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
