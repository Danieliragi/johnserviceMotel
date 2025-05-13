"use client"

import { useState, useEffect } from "react"
import { MapPin } from "lucide-react"

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
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
        <MapPin className="h-12 w-12 text-slate-800 mb-4" />
        <h3 className="text-lg font-bold mb-2">JohnService Motel</h3>
        <p className="text-sm text-gray-600 mb-4">123 Avenue Principale, Goma</p>
        <p className="text-xs text-gray-500">Coordonnées: -1.6777, 29.2285</p>
      </div>

      {/* Static map image as background */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${mapLoaded ? "opacity-100" : "opacity-0"}`}
        style={{
          backgroundImage: `url('https://maps.googleapis.com/maps/api/staticmap?center=-1.6777,29.2285&zoom=14&size=600x400&markers=color:red|-1.6777,29.2285&key=YOUR_GOOGLE_MAPS_API_KEY')`,
          filter: "grayscale(30%)",
        }}
      />

      {/* Map pin overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative">
          <MapPin className="h-8 w-8 text-red-500" />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-red-500 rounded-full animate-ping opacity-75"></div>
        </div>
      </div>
    </div>
  )
}
