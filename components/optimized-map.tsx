"use client"

import LeafletMap from "./leaflet-map"

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
  latitude = -1.6777,
  longitude = 29.2285,
  zoom = 15,
  height = "400px",
  width = "100%",
  className = "",
}: OptimizedMapProps) {
  return (
    <LeafletMap
      address={address}
      latitude={latitude}
      longitude={longitude}
      zoom={zoom}
      height={height}
      width={width}
      className={className}
    />
  )
}
