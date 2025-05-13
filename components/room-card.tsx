import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarIcon, BedDouble, Users } from "lucide-react"

interface RoomCardProps {
  name: string
  description: string
  price: number
  image: string
  rating: number
  type: "standard" | "family" | "premium"
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
  return (
    <Card className="overflow-hidden card-hover border-gray-200">
      <div className="relative h-64 overflow-hidden group">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
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
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <BedDouble className="h-4 w-4 text-slate-800" />
            {type === "standard" && "Lit Queen Size"}
            {type === "family" && "1 Lit Queen + 2 Lits Simples"}
            {type === "premium" && "Lit King Size"}
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Users className="h-4 w-4 text-slate-800" />
            {capacity} {capacity === 1 ? "personne" : "personnes"}
          </div>
        </div>
        <ul className="mb-4 text-gray-600 space-y-2">
          {features.slice(0, 4).map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
              {feature}
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <Button className="w-full btn-primary">Réserver</Button>
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
