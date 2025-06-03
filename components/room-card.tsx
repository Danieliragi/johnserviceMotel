"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarIcon } from "lucide-react"
import React from "react"

interface RoomCardProps {
  name: string
  description: string
  price: number
  image: string
  rating: number
  type: "standard" | "deluxe" | "vip"
  capacity: number
  features: string[]
  slug: string
  popular?: boolean
}

export default function RoomCard({
  name,
  description,
  price,
  image,
  rating,
  type,
  capacity,
  features,
  slug,
  popular = false,
}: RoomCardProps) {
  const imagePath = React.useMemo(() => {
    // Vérifier si l'image existe dans notre liste d'images connues
    if (!image) return "/placeholder.svg"

    // Si l'image est un chemin relatif sans extension, essayons de la corriger
    if (image.startsWith("/standard") && !image.includes("-room-")) {
      // Convertir /standard7.jpeg en /standard-room-7.jpeg
      const match = image.match(/\/standard(\d+)\.jpeg/)
      if (match && match[1]) {
        return `/standard-room-${match[1]}.jpeg`
      }
    }

    // De même pour les autres types de chambres
    if (image.startsWith("/deluxe") && !image.includes("-room-")) {
      const match = image.match(/\/deluxe(\d+)\.jpeg/)
      if (match && match[1]) {
        return `/deluxe-room-${match[1]}.jpeg`
      }
    }

    if (image.startsWith("/vip") && !image.includes("-")) {
      const match = image.match(/\/vip(\d+)\.jpeg/)
      if (match && match[1]) {
        return `/vip${match[1]}.jpeg`
      }
    }

    return image
  }, [image])
  return (
    <Card className="overflow-hidden card-hover border-gray-200">
      <div className="relative h-64 overflow-hidden group">
        {/* Ajout d'un état de chargement */}
        <img
          src={imagePath || "/placeholder.svg?height=256&width=400&text=Room+Image"}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onLoad={(e) => {
            const target = e.target as HTMLImageElement
            target.style.opacity = "1"
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement
            // Try fallback images based on room type
            if (type === "standard" && !target.src.includes("standard-room-1")) {
              target.src = "/standard-room-1.jpeg"
            } else if (type === "deluxe" && !target.src.includes("deluxe-room-1")) {
              target.src = "/deluxe-room-1.jpeg"
            } else if (type === "vip" && !target.src.includes("vip1")) {
              target.src = "/vip1.jpeg"
            } else {
              target.src = `/placeholder.svg?height=256&width=400&text=${encodeURIComponent(name)}`
            }
          }}
          style={{ opacity: 0, transition: "opacity 0.3s ease-in-out" }}
        />
        {popular && <Badge className="absolute top-3 right-3 bg-amber-500">Populaire</Badge>}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full">
            <Link href={`/chambres/${slug}`}>
              <Button className="w-full">Voir les détails</Button>
            </Link>
          </div>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="font-bold text-slate-800">${price}</p>
        </div>
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`h-4 w-4 ${i < rating ? "text-amber-500 fill-amber-500" : "text-gray-300 fill-gray-300"}`}
            />
          ))}
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <ul className="mb-4 text-gray-600 space-y-2">
          {features.slice(0, 4).map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
              {feature}
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <Link href="/chambres#booking-section" className="w-full">
            <Button className="w-full btn-primary">Réserver</Button>
          </Link>
          <Link href={`/chambres/${slug}`} className="w-full">
            <Button
              variant="outline"
              className="w-full border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white"
            >
              Détails
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
