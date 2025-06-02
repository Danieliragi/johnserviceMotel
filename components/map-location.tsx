"use client"

import { useState, useEffect } from "react"
import { MapPin } from "lucide-react"
import LeafletMap from "./leaflet-map"

export default function MapLocation() {
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    // Set a timeout to simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-full bg-gray-100 overflow-hidden rounded-lg">
      {/* Fallback content that doesn't rely on external resources */}
      {!mapLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <MapPin className="h-12 w-12 text-slate-800 mb-4" />
          <h3 className="text-lg font-bold mb-2">JohnService Motel</h3>
          <p className="text-sm text-gray-600 mb-4">123 Avenue Principale, Goma</p>
          <p className="text-xs text-gray-500">Coordonnées: -1.6777, 29.2285</p>
        </div>
      )}

      {/* Leaflet Map with improved address display */}
      <LeafletMap
        address="JohnService Motel"
        detailedAddress="Quartier: Le volcan, AV. Le messager, N° 13B, Goma, RDC"
        latitude={-1.6777}
        longitude={29.2285}
        zoom={15}
        height="100%"
        width="100%"
      />
    </div>
  )
}
