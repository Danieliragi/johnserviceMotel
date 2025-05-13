"use client"

import { useState, useEffect, useRef } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import ScriptLoader from "./script-loader"

interface OptimizedMapProps {
  address?: string
  latitude?: number
  longitude?: number
  zoom?: number
  height?: string
  width?: string
  className?: string
}

export default function OptimizedMap({
  address = "John Services Motel",
  latitude = 48.8566,
  longitude = 2.3522,
  zoom = 15,
  height = "400px",
  width = "100%",
  className = "",
}: OptimizedMapProps) {
  const [mapLoaded, setMapLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
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

  const initMap = () => {
    if (window.google && window.google.maps && mapRef.current) {
      const mapOptions = {
        center: { lat: latitude, lng: longitude },
        zoom: zoom,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
      }

      const map = new window.google.maps.Map(document.getElementById(mapId), mapOptions)

      const marker = new window.google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: address,
        animation: window.google.maps.Animation.DROP,
      })

      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div style="padding: 8px; max-width: 200px;"><strong>${address}</strong></div>`,
      })

      marker.addListener("click", () => {
        infoWindow.open(map, marker)
      })

      setMapLoaded(true)
    }
  }

  return (
    <div ref={mapRef} className={`relative overflow-hidden rounded-lg ${className}`} style={{ height, width }}>
      {!mapLoaded && <Skeleton className="absolute inset-0 z-10" />}

      {isVisible && (
        <>
          <div id={mapId} style={{ height: "100%", width: "100%" }}></div>
          <ScriptLoader
            src={`https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=Function.prototype`}
            strategy="lazyOnload"
            onLoad={initMap}
          />
        </>
      )}
    </div>
  )
}
